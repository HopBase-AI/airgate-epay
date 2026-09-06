// 轻量 i18n：简体中文原文即 key，t() 按当前语言查表返回译文。
//
// 设计约束：
//   - 不引入 i18next 等任何三方依赖 —— vite external 只有 react 系，
//     引入依赖会被重复打进插件 bundle。
//   - 语言检测与 core 控制台一致（core web/src/i18n/index.ts）：
//     cookie `lang=` → localStorage('lang') → navigator.languages 推断 → 默认 en。
//   - 每次 t() 调用即时读取语言，无需响应式：控制台切语言会重新挂载插件页面。
//   - zh（简体）直接返回原文；查不到的 key 兜底返回原文。
//
// 注意：Admin*.tsx 管理页保持中文，不接入本模块。

type Lang = 'zh' | 'zh-HK' | 'en' | 'ja' | 'es';

const SUPPORTED = new Set<string>(['zh', 'zh-HK', 'en', 'ja', 'es']);

function normalize(lang: string | null | undefined): Lang | null {
  return lang && SUPPORTED.has(lang) ? (lang as Lang) : null;
}

// 与 core 的 detectBrowserLanguage 保持一致：
// zh-hk / zh-tw / zh-mo / *hant* → zh-HK；其余 zh*（含 hans）→ zh；ja* → ja；en* → en；
// 单个候选不认识则看下一个，全部不认识兜底 en。
function detectBrowserLanguage(): Lang {
  if (typeof navigator === 'undefined') return 'en';
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const raw of candidates) {
    const lang = (raw || '').toLowerCase();
    if (!lang) continue;
    if (lang === 'zh-hk' || lang === 'zh-tw' || lang === 'zh-mo' || lang.includes('hant')) return 'zh-HK';
    if (lang.startsWith('zh')) return 'zh';
    if (lang.startsWith('ja')) return 'ja';
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('en')) return 'en';
  }
  return 'en';
}

function currentLang(): Lang {
  if (typeof document !== 'undefined') {
    const m = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
    const cookieLang = m ? normalize(decodeURIComponent(m[1] ?? '')) : null;
    if (cookieLang) return cookieLang;
  }
  try {
    const localLang = normalize(window.localStorage.getItem('lang'));
    if (localLang) return localLang;
  } catch {
    /* localStorage 在受限浏览器模式下可能不可用 */
  }
  return detectBrowserLanguage();
}

// ============ 译文表（key = 简体原文） ============
// zh-HK 用香港用语：充值→增值、支付宝→支付寶、二维码→二維碼、扫码→掃碼。

const zhHK: Record<string, string> = {
  '最低': '最低',
  '到账': '到帳',
  '套餐': '套餐',
  '订单确认': '訂單確認',
  '充值金额': '儲值金額',
  '到账余额': '到帳餘額',
  '去支付': '去支付',
  '余额 1:1 抵扣，不设赠送；若后台配置了套餐赠送，卡片上会标出赠送额。': '餘額 1:1 抵扣，不設贈送；若後台配置了套餐贈送，卡片上會標出贈送額。',
  '加载中...': '載入中...',
  '加载失败: ': '載入失敗: ',
  '加载支付方式失败: ': '載入支付方式失敗: ',
  '充值功能暂未开放，请联系管理员。': '增值功能暫未開放，請聯絡管理員。',
  '账户充值': '帳戶增值',
  '充值比例：': '增值比例：',
  '充值成功': '增值成功',
  '再次充值': '再次增值',
  '订单': '訂單',
  '已支付，金额': '已支付，金額',
  '已入账': '已入賬',
  '，套餐赠送': '，套餐贈送',
  '已同步到账': '已同步到賬',
  '。': '。',
  '扫码付款': '掃碼付款',
  '付款二维码': '付款二維碼',
  '生成二维码中...': '生成二維碼中...',
  '支付成功后另赠': '支付成功後另贈',
  '请使用': '請使用',
  '扫码完成付款': '掃碼完成付款',
  '订单号：': '訂單號：',
  '支付完成后本页将自动跳转到结果页（每 3 秒检查一次）': '支付完成後本頁將自動跳轉到結果頁（每 3 秒檢查一次）',
  '离开或刷新本页也没关系，支付结果会在你回来时自动恢复。': '離開或重新整理本頁也沒關係，付款結果會在你回來時自動恢復。',
  '支付完成后将自动刷新（每 3 秒检查一次）': '支付完成後將自動重新整理（每 3 秒檢查一次）',
  '扫码不便？': '掃碼不便？',
  '点此在新窗口打开付款页 →': '點此在新視窗開啟付款頁 →',
  '取消': '取消',
  '关闭': '關閉',
  '订单已': '訂單已',
  '订单已过期': '訂單已過期',
  '订单已失败': '訂單已失敗',
  '订单已取消': '訂單已取消',
  '订单已退款': '訂單已退款',
  '该订单无法继续支付，请重新发起充值。': '該訂單無法繼續支付，請重新發起增值。',
  '重新发起': '重新發起',
  '选择套餐': '選擇套餐',
  '选择金额': '選擇金額',
  '送': '送',
  '自定义金额': '自訂金額',
  '（不参与套餐赠送）': '（不參與套餐贈送）',
  '选择支付方式': '選擇支付方式',
  '处理中...': '處理中...',
  '立即支付': '立即支付',
  '请选择支付方式': '請選擇支付方式',
  '请输入有效金额': '請輸入有效金額',
  '最低充值金额为': '最低增值金額為',
  '单笔充值金额不能超过': '單筆增值金額不能超過',
  '支付宝': '支付寶',
  '微信支付': '微信支付',
  '支付成功': '支付成功',
  '暂无充值记录': '暫無增值記錄',
  '订单号': '訂單號',
  '金额': '金額',
  '支付方式': '支付方式',
  '状态': '狀態',
  '创建时间': '建立時間',
  '支付时间': '支付時間',
  '操作': '操作',
  '继续支付': '繼續支付',
  '导出明细': '匯出明細',
  '导出中...': '匯出中...',
  '导出失败: ': '匯出失敗: ',
  '待支付': '待支付',
  '已支付': '已支付',
  '已过期': '已過期',
  '失败': '失敗',
  '已取消': '已取消',
  '已退款': '已退款',
};

const en: Record<string, string> = {
  '最低': 'Min',
  '到账': 'Credited',
  '套餐': 'Package',
  '订单确认': 'Order summary',
  '充值金额': 'Top-up amount',
  '到账余额': 'Credited balance',
  '去支付': 'Pay',
  '余额 1:1 抵扣，不设赠送；若后台配置了套餐赠送，卡片上会标出赠送额。': 'Balance is credited 1:1 with no bonus; if a package bonus is configured, it is shown on the card.',
  '加载中...': 'Loading...',
  '加载失败: ': 'Failed to load: ',
  '加载支付方式失败: ': 'Failed to load payment methods: ',
  '充值功能暂未开放，请联系管理员。': 'Top-up is not available yet. Please contact the administrator.',
  '账户充值': 'Top Up',
  '充值比例：': 'Top-up rate: ',
  '充值成功': 'Top Up Successful',
  '再次充值': 'Top Up Again',
  '订单': 'Order',
  '已支付，金额': 'has been paid; amount',
  '已入账': 'credited',
  '，套餐赠送': ', package bonus',
  '已同步到账': 'also credited',
  '。': '.',
  '扫码付款': 'Scan to Pay',
  '付款二维码': 'Payment QR code',
  '生成二维码中...': 'Generating QR code...',
  '支付成功后另赠': 'Bonus after payment:',
  '请使用': 'Please use',
  '扫码完成付款': 'to scan and complete the payment',
  '订单号：': 'Order No.: ',
  '支付完成后本页将自动跳转到结果页（每 3 秒检查一次）': 'This page will redirect automatically once payment completes (checked every 3 seconds).',
  '离开或刷新本页也没关系，支付结果会在你回来时自动恢复。': "It's fine to leave or refresh this page — the payment result will be restored automatically when you come back.",
  '支付完成后将自动刷新（每 3 秒检查一次）': 'Refreshes automatically after payment (checked every 3 seconds).',
  '扫码不便？': "Can't scan the code?",
  '点此在新窗口打开付款页 →': 'Open the payment page in a new window →',
  '取消': 'Cancel',
  '关闭': 'Close',
  '订单已': 'Order ',
  '订单已过期': 'Order Expired',
  '订单已失败': 'Order Failed',
  '订单已取消': 'Order Cancelled',
  '订单已退款': 'Order Refunded',
  '该订单无法继续支付，请重新发起充值。': 'This order can no longer be paid. Please start a new top-up.',
  '重新发起': 'Try Again',
  '选择套餐': 'Select Package',
  '选择金额': 'Select Amount',
  '送': 'Bonus',
  '自定义金额': 'Custom amount',
  '（不参与套餐赠送）': ' (no package bonus)',
  '选择支付方式': 'Select Payment Method',
  '处理中...': 'Processing...',
  '立即支付': 'Pay Now',
  '请选择支付方式': 'Please select a payment method',
  '请输入有效金额': 'Please enter a valid amount',
  '最低充值金额为': 'Minimum top-up amount:',
  '单笔充值金额不能超过': 'Maximum top-up amount:',
  '支付宝': 'Alipay',
  '微信支付': 'WeChat Pay',
  '支付成功': 'Payment Successful',
  '暂无充值记录': 'No top-up records yet',
  '订单号': 'Order No.',
  '金额': 'Amount',
  '支付方式': 'Payment Method',
  '状态': 'Status',
  '创建时间': 'Created At',
  '支付时间': 'Paid At',
  '操作': 'Actions',
  '继续支付': 'Continue Payment',
  '导出明细': 'Export Usage',
  '导出中...': 'Exporting...',
  '导出失败: ': 'Export failed: ',
  '待支付': 'Pending',
  '已支付': 'Paid',
  '已过期': 'Expired',
  '失败': 'Failed',
  '已取消': 'Cancelled',
  '已退款': 'Refunded',
};

const ja: Record<string, string> = {
  '最低': '最低',
  '到账': '入金',
  '套餐': 'プラン',
  '订单确认': '注文確認',
  '充值金额': 'チャージ金額',
  '到账余额': '入金後残高',
  '去支付': '支払う',
  '余额 1:1 抵扣，不设赠送；若后台配置了套餐赠送，卡片上会标出赠送额。': '残高は 1:1 で入金され、ボーナスはありません。プランにボーナスが設定されている場合はカードに表示されます。',
  '加载中...': '読み込み中...',
  '加载失败: ': '読み込みに失敗しました: ',
  '加载支付方式失败: ': '支払い方法の読み込みに失敗しました: ',
  '充值功能暂未开放，请联系管理员。': 'チャージ機能は現在ご利用いただけません。管理者にお問い合わせください。',
  '账户充值': 'アカウントチャージ',
  '充值比例：': 'チャージレート：',
  '充值成功': 'チャージ完了',
  '再次充值': 'もう一度チャージ',
  '订单': '注文',
  '已支付，金额': 'は支払済み、金額',
  '已入账': 'が入金されました',
  '，套餐赠送': '、パッケージ特典',
  '已同步到账': 'も入金されました',
  '。': '。',
  '扫码付款': 'QRコードで支払う',
  '付款二维码': '支払い用QRコード',
  '生成二维码中...': 'QRコードを生成中...',
  '支付成功后另赠': '支払い後の特典:',
  '请使用': 'お支払いは',
  '扫码完成付款': 'でスキャンしてください',
  '订单号：': '注文番号：',
  '支付完成后本页将自动跳转到结果页（每 3 秒检查一次）': '支払い完了後、自動的に結果ページへ移動します（3秒ごとに確認）',
  '离开或刷新本页也没关系，支付结果会在你回来时自动恢复。': 'このページを離れたり更新しても大丈夫です。戻ってきたときに支払い結果が自動的に復元されます。',
  '支付完成后将自动刷新（每 3 秒检查一次）': '支払い完了後、自動的に更新されます（3秒ごとに確認）',
  '扫码不便？': 'スキャンできない場合は',
  '点此在新窗口打开付款页 →': '新しいウィンドウで支払いページを開く →',
  '取消': 'キャンセル',
  '关闭': '閉じる',
  '订单已': '注文は',
  '订单已过期': '注文は期限切れです',
  '订单已失败': '注文は失敗しました',
  '订单已取消': '注文はキャンセルされました',
  '订单已退款': '注文は返金されました',
  '该订单无法继续支付，请重新发起充值。': 'この注文は支払いを続行できません。もう一度チャージしてください。',
  '重新发起': 'やり直す',
  '选择套餐': 'パッケージを選択',
  '选择金额': '金額を選択',
  '送': '特典',
  '自定义金额': 'カスタム金額',
  '（不参与套餐赠送）': '（パッケージ特典対象外）',
  '选择支付方式': '支払い方法を選択',
  '处理中...': '処理中...',
  '立即支付': '今すぐ支払う',
  '请选择支付方式': '支払い方法を選択してください',
  '请输入有效金额': '有効な金額を入力してください',
  '最低充值金额为': '最低チャージ金額：',
  '单笔充值金额不能超过': '1回のチャージ上限：',
  '支付宝': 'Alipay',
  '微信支付': 'WeChat Pay',
  '支付成功': '支払い完了',
  '暂无充值记录': 'チャージ履歴はありません',
  '订单号': '注文番号',
  '金额': '金額',
  '支付方式': '支払い方法',
  '状态': 'ステータス',
  '创建时间': '作成日時',
  '支付时间': '支払日時',
  '操作': '操作',
  '继续支付': '支払いを続ける',
  '导出明细': '明細をエクスポート',
  '导出中...': 'エクスポート中...',
  '导出失败: ': 'エクスポート失敗: ',
  '待支付': '未払い',
  '已支付': '支払済み',
  '已过期': '期限切れ',
  '失败': '失敗',
  '已取消': 'キャンセル済み',
  '已退款': '返金済み',
};

const es: Record<string, string> = {
  '最低': 'Mín.',
  '到账': 'Acreditado',
  '套餐': 'Paquete',
  '订单确认': 'Resumen del pedido',
  '充值金额': 'Importe de recarga',
  '到账余额': 'Saldo acreditado',
  '去支付': 'Pagar',
  '余额 1:1 抵扣，不设赠送；若后台配置了套餐赠送，卡片上会标出赠送额。': 'El saldo se acredita 1:1 sin bonificación; si un paquete incluye bonificación, se muestra en la tarjeta.',
  '加载中...': 'Cargando...',
  '加载失败: ': 'Error al cargar: ',
  '加载支付方式失败: ': 'Error al cargar los métodos de pago: ',
  '充值功能暂未开放，请联系管理员。': 'La función de recarga aún no está disponible. Póngase en contacto con el administrador.',
  '账户充值': 'Recargar cuenta',
  '充值比例：': 'Tasa de recarga: ',
  '充值成功': 'Recarga exitosa',
  '再次充值': 'Recargar de nuevo',
  '订单': 'Pedido',
  '已支付，金额': 'ha sido pagado; importe',
  '已入账': 'acreditado',
  '，套餐赠送': ', bono del paquete',
  '已同步到账': 'también acreditado',
  '。': '.',
  '扫码付款': 'Escanear para pagar',
  '付款二维码': 'Código QR de pago',
  '生成二维码中...': 'Generando código QR...',
  '支付成功后另赠': 'Bono tras el pago:',
  '请使用': 'Use',
  '扫码完成付款': 'para escanear y completar el pago',
  '订单号：': 'N.º de pedido: ',
  '支付完成后本页将自动跳转到结果页（每 3 秒检查一次）': 'Esta página se redirigirá automáticamente en cuanto se complete el pago (se comprueba cada 3 segundos).',
  '离开或刷新本页也没关系，支付结果会在你回来时自动恢复。': 'No pasa nada si sale o actualiza esta página: el resultado del pago se restaurará automáticamente cuando regrese.',
  '支付完成后将自动刷新（每 3 秒检查一次）': 'Se actualiza automáticamente tras el pago (se comprueba cada 3 segundos).',
  '扫码不便？': '¿No puede escanear el código?',
  '点此在新窗口打开付款页 →': 'Abrir la página de pago en una ventana nueva →',
  '取消': 'Cancelar',
  '关闭': 'Cerrar',
  '订单已': 'Pedido ',
  '订单已过期': 'Pedido vencido',
  '订单已失败': 'Pedido fallido',
  '订单已取消': 'Pedido cancelado',
  '订单已退款': 'Pedido reembolsado',
  '该订单无法继续支付，请重新发起充值。': 'Este pedido ya no se puede pagar. Inicie una nueva recarga.',
  '重新发起': 'Intentar de nuevo',
  '选择套餐': 'Seleccionar paquete',
  '选择金额': 'Seleccionar importe',
  '送': 'Bono',
  '自定义金额': 'Importe personalizado',
  '（不参与套餐赠送）': ' (no incluye bono del paquete)',
  '选择支付方式': 'Seleccionar método de pago',
  '处理中...': 'Procesando...',
  '立即支付': 'Pagar ahora',
  '请选择支付方式': 'Seleccione un método de pago',
  '请输入有效金额': 'Introduzca un importe válido',
  '最低充值金额为': 'Importe mínimo de recarga:',
  '单笔充值金额不能超过': 'Importe máximo de recarga:',
  '支付宝': 'Alipay',
  '微信支付': 'WeChat Pay',
  '支付成功': 'Pago exitoso',
  '暂无充值记录': 'Aún no hay registros de recarga',
  '订单号': 'N.º de pedido',
  '金额': 'Importe',
  '支付方式': 'Método de pago',
  '状态': 'Estado',
  '创建时间': 'Fecha de creación',
  '支付时间': 'Fecha de pago',
  '操作': 'Acciones',
  '继续支付': 'Continuar pago',
  '待支付': 'Pendiente',
  '已支付': 'Pagado',
  '已过期': 'Vencido',
  '失败': 'Fallido',
  '已取消': 'Cancelado',
  '已退款': 'Reembolsado',
};

const TABLES: Partial<Record<Lang, Record<string, string>>> = {
  'zh-HK': zhHK,
  en,
  ja,
  es,
};

/** 翻译：简体原文即 key；zh 直接返回原文，其余语言查表，缺 key 兜底原文。 */
export function t(s: string): string {
  const lang = currentLang();
  if (lang === 'zh') return s;
  const table = TABLES[lang];
  return (table && table[s]) || s;
}
