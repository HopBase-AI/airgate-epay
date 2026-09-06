import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { cssVar } from '@doudou-start/airgate-theme';
import { api, getSiteName, type Order, type MethodInfo, type PackageItem } from './api';
import { formatRechargeCredit } from './money';
import { t } from './i18n';

// 进行中订单的恢复锚点(localStorage):值为 out_trade_no
const RESUME_ORDER_KEY = 'epay_last_order';
const DEFAULT_AMOUNTS = [10, 30, 50, 100, 200, 500];

/**
 * 归一化自定义金额输入：只留数字与一个小数点，去掉前导零，小数最多两位。
 * 允许空串——用户要能清空重输，空串在提交时按「请输入有效金额」拦下，而不是被当成 0。
 */
export function normalizeAmountInput(raw: string): string {
  const digitsOnly = raw.replace(/[^\d.]/g, '');
  const [intPart = '', ...rest] = digitsOnly.split('.');
  const trimmedInt = intPart.replace(/^0+(?=\d)/, '');
  if (!rest.length) return trimmedInt;
  return `${trimmedInt || '0'}.${rest.join('').slice(0, 2)}`;
}

function availablePresetAmounts(minAmount: number, maxAmount: number): number[] {
  const amounts = DEFAULT_AMOUNTS.filter((value) => value >= minAmount && value <= maxAmount);
  if (minAmount > DEFAULT_AMOUNTS[0] && minAmount <= maxAmount && !amounts.includes(minAmount)) {
    amounts.unshift(minAmount);
  }
  if (!amounts.length && minAmount <= maxAmount) {
    amounts.push(minAmount);
  }
  return amounts;
}

/**
 * RechargePage 充值页面（用户级独立页面）
 *
 * 流程：
 *   1. 加载时拉取可用支付方式（PayMethod，对用户友好的"支付宝/微信/QQ"按钮）
 *   2. 用户选择金额（预设按钮 / 自定义输入） + 选择支付方式 → 「立即支付」
 *   3. 后端 service 通过 Router 自动选一个能服务此 method 的 Provider 实例
 *   4. 创建订单成功 → 渲染收款二维码并轮询订单状态
 *   5. 状态变 paid → 切换到成功页面，提示「余额已到账」
 *   6. 用户可点「再次充值」回到第 1 步
 */
export default function RechargePage() {
  const [methods, setMethods] = useState<MethodInfo[]>([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsErr, setMethodsErr] = useState<string | null>(null);
  const [minAmount, setMinAmount] = useState(1);
  const [maxAmount, setMaxAmount] = useState(10000);

  // 金额输入框保存用户敲进去的原文，数值由它派生。
  //
  // 不能写成 value={number} + setAmount(Number(e.target.value))：数值没变时 React 会跳过
  // 重渲染，输入框里的文字就和状态脱节。实测两条路径都能复现出「01000000」：
  //   a) 清空输入框 → Number('') 得 0 → 回弹成 "0"，光标停在它后面，接着敲就变成 "01000000"；
  //   b) 已是 1000000 时在最前面插一个 0 → 数值仍是 1000000 → 不重渲染，前导零留在框里。
  const [amountText, setAmountText] = useState('30');
  const setAmount = (value: number) => setAmountText(String(value));
  const amount = amountText.trim() === '' ? Number.NaN : Number(amountText);
  const [method, setMethod] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 后台配置的充值套餐；选中套餐才享赠送，自定义金额无赠送
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  // methodsLoading 只等 api.methods()；api.packages() 可能更慢地在表单已可交互后才返回。
  // 用户若在这个窗口内已经点了金额/套餐或输入了自定义金额，套餐拉取回来时不应覆盖掉。
  const userChoseAmountRef = useRef(false);

  const [order, setOrder] = useState<Order | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);

  // 0) 恢复进行中的订单。订单态原本只在组件内存里:移动端跳支付宝再切回
  // (页面被系统回收重载)或手滑刷新后,用户只能对着空表单猜结果、去订单页手查。
  // 创建订单时把单号落 localStorage,挂载时捡回补拉状态:
  //   pending → 恢复二维码+轮询;paid(24h 内) → 直接呈现成功卡;
  //   其余终态或已超时 → 静默清除,不打扰。
  useEffect(() => {
    let saved: string | null;
    try {
      saved = localStorage.getItem(RESUME_ORDER_KEY);
    } catch {
      return;
    }
    if (!saved) return;
    api.getOrder(saved)
      .then((o) => {
        if (o.status === 'pending') {
          setOrder(o);
          return;
        }
        if (o.status === 'paid') {
          const paidAt = o.paid_at ? Date.parse(o.paid_at) : NaN;
          if (!Number.isFinite(paidAt) || Date.now() - paidAt < 24 * 3600 * 1000) {
            setOrder(o);
            return;
          }
        }
        try { localStorage.removeItem(RESUME_ORDER_KEY); } catch { /* ignore */ }
      })
      .catch(() => { /* 拉不到就保持初始表单,下次挂载再试 */ });
  }, []);

  // 1) 拉可用支付方式 + 充值套餐（套餐失败静默回退到预设金额档）
  useEffect(() => {
    api.methods()
      .then((res) => {
        setMethods(res.methods || []);
        setMinAmount(res.min_amount > 0 ? res.min_amount : 1);
        setMaxAmount(res.max_amount > 0 ? res.max_amount : 10000);
        if (res.methods?.length) setMethod(res.methods[0].key);
      })
      .catch((e) => setMethodsErr(String(e?.message || e)))
      .finally(() => setMethodsLoading(false));
    api.packages()
      .then((res) => {
        setPackages(res.list || []);
      })
      .catch(() => setPackages([]));
  }, []);

  // 配置或套餐任一先返回都没关系：只在用户尚未操作时，选择当前限额内的首个合法档位。
  useEffect(() => {
    if (userChoseAmountRef.current) return;
    const firstPackage = packages.find((item) => item.amount >= minAmount && item.amount <= maxAmount);
    if (firstPackage) {
      setSelectedPackageId(firstPackage.id);
      setAmount(firstPackage.amount);
      return;
    }
    setSelectedPackageId(null);
    const [firstPreset] = availablePresetAmounts(minAmount, maxAmount);
    if (firstPreset !== undefined) setAmount(firstPreset);
  }, [packages, minAmount, maxAmount]);

  // 2) 订单状态轮询
  useEffect(() => {
    if (!order || order.status !== 'pending') {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }
    const tick = async () => {
      try {
        const next = await api.getOrder(order.out_trade_no);
        setOrder(next);
      } catch {
        /* 静默失败，下次重试 */
      }
    };
    pollRef.current = window.setInterval(tick, 3000);
    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [order?.out_trade_no, order?.status]);

  // 3) 订单创建后把付款链接渲染成二维码（dataURL，可直接 <img src=...>）
  // 优先使用渠道返回的 qr_code_content（虎皮椒/微信原生二维码 schema），没有则用 payment_url
  useEffect(() => {
    if (!order) {
      setQrDataUrl(null);
      return;
    }
    const target = order.qr_code_content || order.payment_url;
    if (!target) {
      setQrDataUrl(null);
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(target, { width: 240, margin: 2, errorCorrectionLevel: 'M' })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [order?.payment_url, order?.qr_code_content]);

  const handleSubmit = async () => {
    setError(null);
    if (!method) {
      setError(t('请选择支付方式'));
      return;
    }
    if (!Number.isFinite(amount)) {
      setError(t('请输入有效金额'));
      return;
    }
    if (!amount || amount < minAmount) {
      setError(`${t('最低充值金额为')} ${formatRechargeCredit(minAmount)}`);
      return;
    }
    if (amount > maxAmount) {
      setError(`${t('单笔充值金额不能超过')} ${formatRechargeCredit(maxAmount)}`);
      return;
    }
    setSubmitting(true);
    try {
      // subject 展示在支付平台商户账单上，固定用简体、动态带站点名（ToB/ToC 品牌不同）
      const siteName = await getSiteName();
      const o = await api.createOrder({
        amount,
        method,
        subject: siteName ? `${siteName} 余额充值` : '余额充值',
        ...(selectedPackageId !== null ? { package_id: selectedPackageId } : {}),
      });
      setOrder(o);
      try { localStorage.setItem(RESUME_ORDER_KEY, o.out_trade_no); } catch { /* 隐私模式下放弃恢复能力 */ }
      // 不再 window.open 跳转新窗口；二维码会由上面的 useEffect 自动渲染到当前页
    } catch (e) {
      setError(String((e as Error).message || e));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setOrder(null);
    setError(null);
    try { localStorage.removeItem(RESUME_ORDER_KEY); } catch { /* ignore */ }
  };

  // ========== 渲染 ==========

  if (methodsLoading) {
    return <div style={containerStyle}><div style={hintStyle}>{t('加载中...')}</div></div>;
  }
  if (methodsErr) {
    return <div style={containerStyle}><div style={{ ...hintStyle, color: cssVar('danger') }}>{t('加载支付方式失败: ')}{methodsErr}</div></div>;
  }
  if (methods.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={panelStyle}>
          <p style={{ color: cssVar('textSecondary'), margin: 0, textAlign: 'center' }}>
            {t('充值功能暂未开放，请联系管理员。')}
          </p>
        </div>
      </div>
    );
  }

  // 已创建订单：付款引导态
  if (order) {
    if (order.status === 'paid') {
      return (
        <div style={containerStyle}>
          <h2 style={titleStyle}>{t('充值成功')}</h2>
          <div style={panelStyle}>
            <p style={{ margin: 0, color: cssVar('text') }}>
              {t('订单')} <code style={inlineCodeStyle}>{order.out_trade_no}</code> {t('已支付，金额')}{' '}
              <strong style={{ color: cssVar('success') }}>{formatRechargeCredit(order.amount)}</strong> {t('已入账')}
              {(order.bonus_amount ?? 0) > 0 && (
                <>{t('，套餐赠送')} <strong style={{ color: cssVar('success') }}>{formatRechargeCredit(order.bonus_amount!)}</strong> {t('已同步到账')}</>
              )}{t('。')}
            </p>
            <button style={{ ...primaryBtnStyle, marginTop: 20 }} onClick={handleReset}>{t('再次充值')}</button>
          </div>
        </div>
      );
    }
    if (order.status === 'pending') {
      return (
        <div style={containerStyle}>
          <h2 style={titleStyle}>{t('扫码付款')}</h2>
          <div style={qrPanelStyle}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt={t('付款二维码')} style={qrImageStyle} />
            ) : (
              <div style={{ ...qrImageStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVar('textTertiary') }}>
                {t('生成二维码中...')}
              </div>
            )}
            <div style={qrAmountStyle}>{formatRechargeCredit(order.amount)}</div>
            {(order.bonus_amount ?? 0) > 0 && (
              <div style={{ color: cssVar('success'), fontSize: 13, marginTop: 2 }}>
                {t('支付成功后另赠')} {formatRechargeCredit(order.bonus_amount!)}
              </div>
            )}
            <div style={{ color: cssVar('textSecondary'), fontSize: 13 }}>
              {t('请使用')} {methodLabel(order.method)} {t('扫码完成付款')}
            </div>
            <div style={{ marginTop: 8, color: cssVar('textTertiary'), fontSize: 12 }}>
              {t('订单号：')}<code style={inlineCodeStyle}>{order.out_trade_no}</code>
            </div>
            <p style={{ textAlign: 'center', color: cssVar('textTertiary'), fontSize: 13, marginTop: 20, marginBottom: 0 }}>
              {t('支付完成后本页将自动跳转到结果页（每 3 秒检查一次）')}
            </p>
            <p style={{ textAlign: 'center', color: cssVar('textTertiary'), fontSize: 12, marginTop: 6, marginBottom: 0 }}>
              {t('离开或刷新本页也没关系，支付结果会在你回来时自动恢复。')}
            </p>
            {order.payment_url && (
              <p style={{ textAlign: 'center', fontSize: 12, marginTop: 8, marginBottom: 0 }}>
                {t('扫码不便？')}{' '}
                <a href={order.payment_url} target="_blank" rel="noreferrer" style={{ color: cssVar('primary'), textDecoration: 'none' }}>
                  {t('点此在新窗口打开付款页 →')}
                </a>
              </p>
            )}
            <button style={{ ...secondaryBtnStyle, marginTop: 20 }} onClick={handleReset}>{t('取消')}</button>
          </div>
        </div>
      );
    }
    // expired / failed / cancelled
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>{closedOrderTitle(order.status)}</h2>
        <div style={panelStyle}>
          <p style={{ margin: 0, color: cssVar('textSecondary') }}>
            {t('订单号：')}<code style={inlineCodeStyle}>{order.out_trade_no}</code>
          </p>
          <button style={{ ...primaryBtnStyle, marginTop: 20 }} onClick={handleReset}>{t('重新发起')}</button>
        </div>
      </div>
    );
  }

  // 默认态:左列套餐 / 金额 + 支付方式,右列订单确认 + 去支付
  const availablePackages = packages.filter((item) => item.amount >= minAmount && item.amount <= maxAmount);
  const presetAmounts = availablePresetAmounts(minAmount, maxAmount);
  const selectedPackage = availablePackages.find((item) => item.id === selectedPackageId) ?? null;
  const bonus = selectedPackage && selectedPackage.bonus_amount > 0 ? selectedPackage.bonus_amount : 0;
  return (
    <div style={containerStyle}>
      <div style={pageHeadStyle}>
        <h2 style={titleStyle}>{t('账户充值')}</h2>
        <span style={rateBadgeStyle}>
          {t('充值比例：')}<strong style={{ color: cssVar('text'), fontWeight: 600 }}>1 CNY = $1</strong>
        </span>
      </div>

      <div style={layoutStyle}>
        <div style={{ flex: '1 1 400px', minWidth: 0, maxWidth: 560 }}>
          <section>
            <h3 style={sectionTitleStyle}>{availablePackages.length ? t('选择套餐') : t('选择金额')}</h3>
            <div style={packageGridStyle}>
              {availablePackages.length
                ? availablePackages.map((p) => {
                  const active = selectedPackageId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => { userChoseAmountRef.current = true; setSelectedPackageId(p.id); setAmount(p.amount); }}
                      style={active ? packageCardActive : packageCard}
                      aria-pressed={active}
                      title={p.title || undefined}
                    >
                      <span style={packageLabelStyle}>{p.title || t('套餐')}</span>
                      <span style={packageAmountStyle}>{formatRechargeCredit(p.amount, { compact: true })}</span>
                      <span style={packageSubStyle}>
                        {t('到账')} {formatRechargeCredit(p.amount + (p.bonus_amount > 0 ? p.bonus_amount : 0), { compact: true })}
                        {p.bonus_amount > 0 ? ` · ${t('送')} ${formatRechargeCredit(p.bonus_amount, { compact: true })}` : ''}
                      </span>
                    </button>
                  );
                })
                : presetAmounts.map((v) => {
                  const active = selectedPackageId === null && amount === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => { userChoseAmountRef.current = true; setSelectedPackageId(null); setAmount(v); }}
                      style={active ? packageCardActive : packageCard}
                      aria-pressed={active}
                    >
                      <span style={packageAmountStyle}>{formatRechargeCredit(v, { compact: true })}</span>
                      <span style={packageSubStyle}>{t('到账')} {formatRechargeCredit(v, { compact: true })}</span>
                    </button>
                  );
                })}
              <div style={customCardStyle}>
                <span style={packageLabelStyle}>{t('自定义金额')}{availablePackages.length ? t('（不参与套餐赠送）') : ''}</span>
                <div style={customInputRowStyle}>
                  <span style={{ color: cssVar('textTertiary'), fontSize: 13 }}>$</span>
                  <span style={{ color: cssVar('textTertiary'), fontSize: 11, order: 2, whiteSpace: 'nowrap' }}>{t('最低')} {formatRechargeCredit(minAmount, { compact: true })}</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amountText}
                    onChange={(e) => {
                      userChoseAmountRef.current = true;
                      setSelectedPackageId(null);
                      setAmountText(normalizeAmountInput(e.target.value));
                    }}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={sectionTitleStyle}>{t('选择支付方式')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
              {methods.map((m) => {
                const active = method === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMethod(m.key)}
                    style={active ? channelRowActive : channelRow}
                    aria-pressed={active}
                    title={m.description}
                  >
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left', minWidth: 0 }}>
                      {/* label 来自后端支付方式配置(多为简体),已知名称经 t() 本地化,未知原样展示 */}
                      <strong style={{ fontSize: 13, fontWeight: 600 }}>{t(m.label)}</strong>
                      {m.description ? <span style={{ fontSize: 11, color: cssVar('textTertiary') }}>{m.description}</span> : null}
                    </span>
                    <span aria-hidden="true" style={active ? radioOnStyle : radioStyle} />
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <aside style={orderPanelStyle}>
          <h3 style={sectionTitleStyle}>{t('订单确认')}</h3>
          <div style={orderRowStyle}>
            <span>{t('充值金额')}</span>
            <span style={monoStyle}>{formatRechargeCredit(amount)}</span>
          </div>
          <div style={orderRowStyle}>
            <span>{t('支付方式')}</span>
            <span style={{ color: cssVar('text') }}>{methods.find((m) => m.key === method) ? t(methods.find((m) => m.key === method)!.label) : '—'}</span>
          </div>
          <div style={{ ...orderRowStyle, borderBottom: 'none', paddingTop: 12 }}>
            <span>{t('到账余额')}</span>
            <span style={{ ...monoStyle, fontSize: 18, fontWeight: 600 }}>{formatRechargeCredit(amount + bonus)}</span>
          </div>
          {error && <p style={{ color: cssVar('danger'), margin: '8px 0 0', fontSize: 13 }}>{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{ ...primaryBtnStyle, marginTop: 12, width: '100%', height: 40, padding: '0 16px', fontSize: 13, opacity: submitting ? 0.6 : 1 }}
          >
            {submitting ? t('处理中...') : `${t('去支付')} ${formatRechargeCredit(amount)}`}
          </button>
          <p style={orderHintStyle}>{t('余额 1:1 抵扣，不设赠送；若后台配置了套餐赠送，卡片上会标出赠送额。')}</p>
        </aside>
      </div>
    </div>
  );
}

function methodLabel(m: string): string {
  switch (m) {
    case 'alipay': return t('支付宝');
    case 'wxpay': return t('微信支付');
    default: return m;
  }
}

// 终态订单标题。zh 输出与原「订单已 + 状态」拼接完全一致；
// 用整句作 key 是为了避开「取消」（按钮 Cancel）与「已取消」（状态 Cancelled）的译文冲突。
function closedOrderTitle(s: string): string {
  switch (s) {
    case 'expired': return t('订单已过期');
    case 'failed': return t('订单已失败');
    case 'cancelled': return t('订单已取消');
    case 'refunded': return t('订单已退款');
    default: return t('订单已') + s;
  }
}

// ========== 样式 ==========
// 使用 SDK 的设计 token，对齐 openai 插件的视觉风格：
//   - 卡片：bgSurface + glassBorder + radiusLg
//   - 输入：bg 背景 + glassBorder + radiusMd
//   - 文字：text / textSecondary / textTertiary 三级层次

const containerStyle: React.CSSProperties = {
  maxWidth: 920,
  margin: '0 auto',
  padding: '24px 24px 48px',
  color: cssVar('text'),
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: 22,
  fontWeight: 600,
  color: cssVar('text'),
  letterSpacing: '-0.01em',
};

const hintStyle: React.CSSProperties = {
  padding: '40px 0',
  textAlign: 'center',
  color: cssVar('textSecondary'),
};

const panelStyle: React.CSSProperties = {
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  background: cssVar('bgSurface'),
  padding: '24px',
};

const sectionStyle: React.CSSProperties = {
  marginTop: 28,
};


const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: cssVar('textSecondary'),
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};









const inputStyle: React.CSSProperties = {
  padding: '6px 10px',
  width: 140,
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  fontSize: 14,
  outline: 'none',
};

const primaryBtnStyle: React.CSSProperties = {
  padding: '12px 28px',
  border: 'none',
  borderRadius: cssVar('radiusMd'),
  background: cssVar('primary'),
  color: cssVar('textInverse'),
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: cssVar('transition'),
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: '10px 24px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: cssVar('transition'),
};

const qrPanelStyle: React.CSSProperties = {
  padding: '28px 24px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: cssVar('bgSurface'),
};

const qrImageStyle: React.CSSProperties = {
  width: 240,
  height: 240,
  background: cssVar('bgElevated'),
  padding: 8,
  borderRadius: cssVar('radiusMd'),
};

const qrAmountStyle: React.CSSProperties = {
  marginTop: 20,
  fontSize: 32,
  fontWeight: 700,
  color: cssVar('text'),
  fontFamily: cssVar('fontMono'),
  letterSpacing: '-0.02em',
};

const inlineCodeStyle: React.CSSProperties = {
  fontFamily: cssVar('fontMono'),
  fontSize: '0.9em',
  padding: '1px 6px',
  borderRadius: 4,
  background: cssVar('bg'),
  color: cssVar('textSecondary'),
};

// ---- 默认态(套餐 / 支付方式 / 订单确认)的样式:发丝线、4-6px 圆角、零投影,选中态 = 墨色描边 + 橙色下划线 ----
const pageHeadStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 18,
};

const rateBadgeStyle: React.CSSProperties = {
  color: cssVar('textSecondary'),
  fontSize: 12,
  whiteSpace: 'nowrap',
};

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: 20,
};

const packageGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(118px, 1fr))',
  gap: 8,
};

const packageCard: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
  padding: '10px 12px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgSurface'),
  color: cssVar('text'),
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'border-color 0.12s',
};

const packageCardActive: React.CSSProperties = {
  ...packageCard,
  borderColor: cssVar('text'),
  boxShadow: 'inset 0 -2px 0 var(--ag-accent, var(--ag-primary))',
};

const customCardStyle: React.CSSProperties = {
  ...packageCard,
  gridColumn: 'span 2',
  cursor: 'default',
  gap: 6,
};

const packageLabelStyle: React.CSSProperties = {
  color: cssVar('textTertiary'),
  fontSize: 11,
  letterSpacing: '0.04em',
};

const packageAmountStyle: React.CSSProperties = {
  fontFamily: cssVar('fontMono'),
  fontSize: 16,
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
};

const packageSubStyle: React.CSSProperties = {
  color: cssVar('textTertiary'),
  fontSize: 11,
};

const customInputRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  width: '100%',
};

const channelRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  width: '100%',
  padding: '10px 12px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgSurface'),
  color: cssVar('text'),
  font: 'inherit',
  cursor: 'pointer',
  transition: 'border-color 0.12s',
};

const channelRowActive: React.CSSProperties = {
  ...channelRow,
  borderColor: cssVar('text'),
  background: cssVar('bgElevated'),
};

const radioStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 14,
  height: 14,
  borderRadius: 999,
  border: `1px solid ${cssVar('glassBorder')}`,
  background: cssVar('bgSurface'),
};

const radioOnStyle: React.CSSProperties = {
  ...radioStyle,
  border: `4px solid ${cssVar('text')}`,
};

const orderPanelStyle: React.CSSProperties = {
  flex: '0 1 300px',
  minWidth: 240,
  padding: '14px 16px 16px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgSurface'),
};

const orderRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 12,
  padding: '8px 0',
  borderBottom: `1px solid ${cssVar('glassBorder')}`,
  color: cssVar('textSecondary'),
  fontSize: 13,
};

const monoStyle: React.CSSProperties = {
  fontFamily: cssVar('fontMono'),
  color: cssVar('text'),
  fontVariantNumeric: 'tabular-nums',
};

const orderHintStyle: React.CSSProperties = {
  margin: '10px 0 0',
  color: cssVar('textTertiary'),
  fontSize: 12,
  lineHeight: 1.5,
};
