import { jsx as l, jsxs as y, Fragment as ce } from "react/jsx-runtime";
import { useState as L, useRef as de, useEffect as U, useCallback as ie, useMemo as Cn } from "react";
function Tn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var re = {}, Ce, st;
function En() {
  return st || (st = 1, Ce = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), Ce;
}
var Te = {}, K = {}, ct;
function ee() {
  if (ct) return K;
  ct = 1;
  let e;
  const i = [
    0,
    // Not used
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
  ];
  return K.getSymbolSize = function(o) {
    if (!o) throw new Error('"version" cannot be null or undefined');
    if (o < 1 || o > 40) throw new Error('"version" should be in range from 1 to 40');
    return o * 4 + 17;
  }, K.getSymbolTotalCodewords = function(o) {
    return i[o];
  }, K.getBCHDigit = function(a) {
    let o = 0;
    for (; a !== 0; )
      o++, a >>>= 1;
    return o;
  }, K.setToSJISFunction = function(o) {
    if (typeof o != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    e = o;
  }, K.isKanjiModeEnabled = function() {
    return typeof e < "u";
  }, K.toSJIS = function(o) {
    return e(o);
  }, K;
}
var Ee = {}, dt;
function rt() {
  return dt || (dt = 1, (function(e) {
    e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
    function i(a) {
      if (typeof a != "string")
        throw new Error("Param is not a string");
      switch (a.toLowerCase()) {
        case "l":
        case "low":
          return e.L;
        case "m":
        case "medium":
          return e.M;
        case "q":
        case "quartile":
          return e.Q;
        case "h":
        case "high":
          return e.H;
        default:
          throw new Error("Unknown EC Level: " + a);
      }
    }
    e.isValid = function(o) {
      return o && typeof o.bit < "u" && o.bit >= 0 && o.bit < 4;
    }, e.from = function(o, r) {
      if (e.isValid(o))
        return o;
      try {
        return i(o);
      } catch {
        return r;
      }
    };
  })(Ee)), Ee;
}
var Be, ut;
function Bn() {
  if (ut) return Be;
  ut = 1;
  function e() {
    this.buffer = [], this.length = 0;
  }
  return e.prototype = {
    get: function(i) {
      const a = Math.floor(i / 8);
      return (this.buffer[a] >>> 7 - i % 8 & 1) === 1;
    },
    put: function(i, a) {
      for (let o = 0; o < a; o++)
        this.putBit((i >>> a - o - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(i) {
      const a = Math.floor(this.length / 8);
      this.buffer.length <= a && this.buffer.push(0), i && (this.buffer[a] |= 128 >>> this.length % 8), this.length++;
    }
  }, Be = e, Be;
}
var _e, gt;
function _n() {
  if (gt) return _e;
  gt = 1;
  function e(i) {
    if (!i || i < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = i, this.data = new Uint8Array(i * i), this.reservedBit = new Uint8Array(i * i);
  }
  return e.prototype.set = function(i, a, o, r) {
    const n = i * this.size + a;
    this.data[n] = o, r && (this.reservedBit[n] = !0);
  }, e.prototype.get = function(i, a) {
    return this.data[i * this.size + a];
  }, e.prototype.xor = function(i, a, o) {
    this.data[i * this.size + a] ^= o;
  }, e.prototype.isReserved = function(i, a) {
    return this.reservedBit[i * this.size + a];
  }, _e = e, _e;
}
var Re = {}, ht;
function Rn() {
  return ht || (ht = 1, (function(e) {
    const i = ee().getSymbolSize;
    e.getRowColCoords = function(o) {
      if (o === 1) return [];
      const r = Math.floor(o / 7) + 2, n = i(o), c = n === 145 ? 26 : Math.ceil((n - 13) / (2 * r - 2)) * 2, d = [n - 7];
      for (let s = 1; s < r - 1; s++)
        d[s] = d[s - 1] - c;
      return d.push(6), d.reverse();
    }, e.getPositions = function(o) {
      const r = [], n = e.getRowColCoords(o), c = n.length;
      for (let d = 0; d < c; d++)
        for (let s = 0; s < c; s++)
          d === 0 && s === 0 || // top-left
          d === 0 && s === c - 1 || // bottom-left
          d === c - 1 && s === 0 || r.push([n[d], n[s]]);
      return r;
    };
  })(Re)), Re;
}
var Ie = {}, ft;
function In() {
  if (ft) return Ie;
  ft = 1;
  const e = ee().getSymbolSize, i = 7;
  return Ie.getPositions = function(o) {
    const r = e(o);
    return [
      // top-left
      [0, 0],
      // top-right
      [r - i, 0],
      // bottom-left
      [0, r - i]
    ];
  }, Ie;
}
var Pe = {}, pt;
function Pn() {
  return pt || (pt = 1, (function(e) {
    e.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const i = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    e.isValid = function(r) {
      return r != null && r !== "" && !isNaN(r) && r >= 0 && r <= 7;
    }, e.from = function(r) {
      return e.isValid(r) ? parseInt(r, 10) : void 0;
    }, e.getPenaltyN1 = function(r) {
      const n = r.size;
      let c = 0, d = 0, s = 0, h = null, u = null;
      for (let p = 0; p < n; p++) {
        d = s = 0, h = u = null;
        for (let x = 0; x < n; x++) {
          let w = r.get(p, x);
          w === h ? d++ : (d >= 5 && (c += i.N1 + (d - 5)), h = w, d = 1), w = r.get(x, p), w === u ? s++ : (s >= 5 && (c += i.N1 + (s - 5)), u = w, s = 1);
        }
        d >= 5 && (c += i.N1 + (d - 5)), s >= 5 && (c += i.N1 + (s - 5));
      }
      return c;
    }, e.getPenaltyN2 = function(r) {
      const n = r.size;
      let c = 0;
      for (let d = 0; d < n - 1; d++)
        for (let s = 0; s < n - 1; s++) {
          const h = r.get(d, s) + r.get(d, s + 1) + r.get(d + 1, s) + r.get(d + 1, s + 1);
          (h === 4 || h === 0) && c++;
        }
      return c * i.N2;
    }, e.getPenaltyN3 = function(r) {
      const n = r.size;
      let c = 0, d = 0, s = 0;
      for (let h = 0; h < n; h++) {
        d = s = 0;
        for (let u = 0; u < n; u++)
          d = d << 1 & 2047 | r.get(h, u), u >= 10 && (d === 1488 || d === 93) && c++, s = s << 1 & 2047 | r.get(u, h), u >= 10 && (s === 1488 || s === 93) && c++;
      }
      return c * i.N3;
    }, e.getPenaltyN4 = function(r) {
      let n = 0;
      const c = r.data.length;
      for (let s = 0; s < c; s++) n += r.data[s];
      return Math.abs(Math.ceil(n * 100 / c / 5) - 10) * i.N4;
    };
    function a(o, r, n) {
      switch (o) {
        case e.Patterns.PATTERN000:
          return (r + n) % 2 === 0;
        case e.Patterns.PATTERN001:
          return r % 2 === 0;
        case e.Patterns.PATTERN010:
          return n % 3 === 0;
        case e.Patterns.PATTERN011:
          return (r + n) % 3 === 0;
        case e.Patterns.PATTERN100:
          return (Math.floor(r / 2) + Math.floor(n / 3)) % 2 === 0;
        case e.Patterns.PATTERN101:
          return r * n % 2 + r * n % 3 === 0;
        case e.Patterns.PATTERN110:
          return (r * n % 2 + r * n % 3) % 2 === 0;
        case e.Patterns.PATTERN111:
          return (r * n % 3 + (r + n) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + o);
      }
    }
    e.applyMask = function(r, n) {
      const c = n.size;
      for (let d = 0; d < c; d++)
        for (let s = 0; s < c; s++)
          n.isReserved(s, d) || n.xor(s, d, a(r, s, d));
    }, e.getBestMask = function(r, n) {
      const c = Object.keys(e.Patterns).length;
      let d = 0, s = 1 / 0;
      for (let h = 0; h < c; h++) {
        n(h), e.applyMask(h, r);
        const u = e.getPenaltyN1(r) + e.getPenaltyN2(r) + e.getPenaltyN3(r) + e.getPenaltyN4(r);
        e.applyMask(h, r), u < s && (s = u, d = h);
      }
      return d;
    };
  })(Pe)), Pe;
}
var ge = {}, yt;
function tn() {
  if (yt) return ge;
  yt = 1;
  const e = rt(), i = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
  ], a = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
  ];
  return ge.getBlocksCount = function(r, n) {
    switch (n) {
      case e.L:
        return i[(r - 1) * 4 + 0];
      case e.M:
        return i[(r - 1) * 4 + 1];
      case e.Q:
        return i[(r - 1) * 4 + 2];
      case e.H:
        return i[(r - 1) * 4 + 3];
      default:
        return;
    }
  }, ge.getTotalCodewordsCount = function(r, n) {
    switch (n) {
      case e.L:
        return a[(r - 1) * 4 + 0];
      case e.M:
        return a[(r - 1) * 4 + 1];
      case e.Q:
        return a[(r - 1) * 4 + 2];
      case e.H:
        return a[(r - 1) * 4 + 3];
      default:
        return;
    }
  }, ge;
}
var Me = {}, ae = {}, mt;
function Mn() {
  if (mt) return ae;
  mt = 1;
  const e = new Uint8Array(512), i = new Uint8Array(256);
  return (function() {
    let o = 1;
    for (let r = 0; r < 255; r++)
      e[r] = o, i[o] = r, o <<= 1, o & 256 && (o ^= 285);
    for (let r = 255; r < 512; r++)
      e[r] = e[r - 255];
  })(), ae.log = function(o) {
    if (o < 1) throw new Error("log(" + o + ")");
    return i[o];
  }, ae.exp = function(o) {
    return e[o];
  }, ae.mul = function(o, r) {
    return o === 0 || r === 0 ? 0 : e[i[o] + i[r]];
  }, ae;
}
var bt;
function An() {
  return bt || (bt = 1, (function(e) {
    const i = Mn();
    e.mul = function(o, r) {
      const n = new Uint8Array(o.length + r.length - 1);
      for (let c = 0; c < o.length; c++)
        for (let d = 0; d < r.length; d++)
          n[c + d] ^= i.mul(o[c], r[d]);
      return n;
    }, e.mod = function(o, r) {
      let n = new Uint8Array(o);
      for (; n.length - r.length >= 0; ) {
        const c = n[0];
        for (let s = 0; s < r.length; s++)
          n[s] ^= i.mul(r[s], c);
        let d = 0;
        for (; d < n.length && n[d] === 0; ) d++;
        n = n.slice(d);
      }
      return n;
    }, e.generateECPolynomial = function(o) {
      let r = new Uint8Array([1]);
      for (let n = 0; n < o; n++)
        r = e.mul(r, new Uint8Array([1, i.exp(n)]));
      return r;
    };
  })(Me)), Me;
}
var Ae, St;
function zn() {
  if (St) return Ae;
  St = 1;
  const e = An();
  function i(a) {
    this.genPoly = void 0, this.degree = a, this.degree && this.initialize(this.degree);
  }
  return i.prototype.initialize = function(o) {
    this.degree = o, this.genPoly = e.generateECPolynomial(this.degree);
  }, i.prototype.encode = function(o) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const r = new Uint8Array(o.length + this.degree);
    r.set(o);
    const n = e.mod(r, this.genPoly), c = this.degree - n.length;
    if (c > 0) {
      const d = new Uint8Array(this.degree);
      return d.set(n, c), d;
    }
    return n;
  }, Ae = i, Ae;
}
var ze = {}, Le = {}, Ne = {}, xt;
function nn() {
  return xt || (xt = 1, Ne.isValid = function(i) {
    return !isNaN(i) && i >= 1 && i <= 40;
  }), Ne;
}
var j = {}, wt;
function rn() {
  if (wt) return j;
  wt = 1;
  const e = "[0-9]+", i = "[A-Z $%*+\\-./:]+";
  let a = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  a = a.replace(/u/g, "\\u");
  const o = "(?:(?![A-Z0-9 $%*+\\-./:]|" + a + `)(?:.|[\r
]))+`;
  j.KANJI = new RegExp(a, "g"), j.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), j.BYTE = new RegExp(o, "g"), j.NUMERIC = new RegExp(e, "g"), j.ALPHANUMERIC = new RegExp(i, "g");
  const r = new RegExp("^" + a + "$"), n = new RegExp("^" + e + "$"), c = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return j.testKanji = function(s) {
    return r.test(s);
  }, j.testNumeric = function(s) {
    return n.test(s);
  }, j.testAlphanumeric = function(s) {
    return c.test(s);
  }, j;
}
var vt;
function te() {
  return vt || (vt = 1, (function(e) {
    const i = nn(), a = rn();
    e.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, e.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, e.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, e.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, e.MIXED = {
      bit: -1
    }, e.getCharCountIndicator = function(n, c) {
      if (!n.ccBits) throw new Error("Invalid mode: " + n);
      if (!i.isValid(c))
        throw new Error("Invalid version: " + c);
      return c >= 1 && c < 10 ? n.ccBits[0] : c < 27 ? n.ccBits[1] : n.ccBits[2];
    }, e.getBestModeForData = function(n) {
      return a.testNumeric(n) ? e.NUMERIC : a.testAlphanumeric(n) ? e.ALPHANUMERIC : a.testKanji(n) ? e.KANJI : e.BYTE;
    }, e.toString = function(n) {
      if (n && n.id) return n.id;
      throw new Error("Invalid mode");
    }, e.isValid = function(n) {
      return n && n.bit && n.ccBits;
    };
    function o(r) {
      if (typeof r != "string")
        throw new Error("Param is not a string");
      switch (r.toLowerCase()) {
        case "numeric":
          return e.NUMERIC;
        case "alphanumeric":
          return e.ALPHANUMERIC;
        case "kanji":
          return e.KANJI;
        case "byte":
          return e.BYTE;
        default:
          throw new Error("Unknown mode: " + r);
      }
    }
    e.from = function(n, c) {
      if (e.isValid(n))
        return n;
      try {
        return o(n);
      } catch {
        return c;
      }
    };
  })(Le)), Le;
}
var kt;
function Ln() {
  return kt || (kt = 1, (function(e) {
    const i = ee(), a = tn(), o = rt(), r = te(), n = nn(), c = 7973, d = i.getBCHDigit(c);
    function s(x, w, C) {
      for (let P = 1; P <= 40; P++)
        if (w <= e.getCapacity(P, C, x))
          return P;
    }
    function h(x, w) {
      return r.getCharCountIndicator(x, w) + 4;
    }
    function u(x, w) {
      let C = 0;
      return x.forEach(function(P) {
        const m = h(P.mode, w);
        C += m + P.getBitsLength();
      }), C;
    }
    function p(x, w) {
      for (let C = 1; C <= 40; C++)
        if (u(x, C) <= e.getCapacity(C, w, r.MIXED))
          return C;
    }
    e.from = function(w, C) {
      return n.isValid(w) ? parseInt(w, 10) : C;
    }, e.getCapacity = function(w, C, P) {
      if (!n.isValid(w))
        throw new Error("Invalid QR Code version");
      typeof P > "u" && (P = r.BYTE);
      const m = i.getSymbolTotalCodewords(w), f = a.getTotalCodewordsCount(w, C), R = (m - f) * 8;
      if (P === r.MIXED) return R;
      const I = R - h(P, w);
      switch (P) {
        case r.NUMERIC:
          return Math.floor(I / 10 * 3);
        case r.ALPHANUMERIC:
          return Math.floor(I / 11 * 2);
        case r.KANJI:
          return Math.floor(I / 13);
        case r.BYTE:
        default:
          return Math.floor(I / 8);
      }
    }, e.getBestVersionForData = function(w, C) {
      let P;
      const m = o.from(C, o.M);
      if (Array.isArray(w)) {
        if (w.length > 1)
          return p(w, m);
        if (w.length === 0)
          return 1;
        P = w[0];
      } else
        P = w;
      return s(P.mode, P.getLength(), m);
    }, e.getEncodedBits = function(w) {
      if (!n.isValid(w) || w < 7)
        throw new Error("Invalid QR Code version");
      let C = w << 12;
      for (; i.getBCHDigit(C) - d >= 0; )
        C ^= c << i.getBCHDigit(C) - d;
      return w << 12 | C;
    };
  })(ze)), ze;
}
var $e = {}, Ct;
function Nn() {
  if (Ct) return $e;
  Ct = 1;
  const e = ee(), i = 1335, a = 21522, o = e.getBCHDigit(i);
  return $e.getEncodedBits = function(n, c) {
    const d = n.bit << 3 | c;
    let s = d << 10;
    for (; e.getBCHDigit(s) - o >= 0; )
      s ^= i << e.getBCHDigit(s) - o;
    return (d << 10 | s) ^ a;
  }, $e;
}
var De = {}, Fe, Tt;
function $n() {
  if (Tt) return Fe;
  Tt = 1;
  const e = te();
  function i(a) {
    this.mode = e.NUMERIC, this.data = a.toString();
  }
  return i.getBitsLength = function(o) {
    return 10 * Math.floor(o / 3) + (o % 3 ? o % 3 * 3 + 1 : 0);
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(o) {
    let r, n, c;
    for (r = 0; r + 3 <= this.data.length; r += 3)
      n = this.data.substr(r, 3), c = parseInt(n, 10), o.put(c, 10);
    const d = this.data.length - r;
    d > 0 && (n = this.data.substr(r), c = parseInt(n, 10), o.put(c, d * 3 + 1));
  }, Fe = i, Fe;
}
var Ue, Et;
function Dn() {
  if (Et) return Ue;
  Et = 1;
  const e = te(), i = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":"
  ];
  function a(o) {
    this.mode = e.ALPHANUMERIC, this.data = o;
  }
  return a.getBitsLength = function(r) {
    return 11 * Math.floor(r / 2) + 6 * (r % 2);
  }, a.prototype.getLength = function() {
    return this.data.length;
  }, a.prototype.getBitsLength = function() {
    return a.getBitsLength(this.data.length);
  }, a.prototype.write = function(r) {
    let n;
    for (n = 0; n + 2 <= this.data.length; n += 2) {
      let c = i.indexOf(this.data[n]) * 45;
      c += i.indexOf(this.data[n + 1]), r.put(c, 11);
    }
    this.data.length % 2 && r.put(i.indexOf(this.data[n]), 6);
  }, Ue = a, Ue;
}
var qe, Bt;
function Fn() {
  if (Bt) return qe;
  Bt = 1;
  const e = te();
  function i(a) {
    this.mode = e.BYTE, typeof a == "string" ? this.data = new TextEncoder().encode(a) : this.data = new Uint8Array(a);
  }
  return i.getBitsLength = function(o) {
    return o * 8;
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(a) {
    for (let o = 0, r = this.data.length; o < r; o++)
      a.put(this.data[o], 8);
  }, qe = i, qe;
}
var We, _t;
function Un() {
  if (_t) return We;
  _t = 1;
  const e = te(), i = ee();
  function a(o) {
    this.mode = e.KANJI, this.data = o;
  }
  return a.getBitsLength = function(r) {
    return r * 13;
  }, a.prototype.getLength = function() {
    return this.data.length;
  }, a.prototype.getBitsLength = function() {
    return a.getBitsLength(this.data.length);
  }, a.prototype.write = function(o) {
    let r;
    for (r = 0; r < this.data.length; r++) {
      let n = i.toSJIS(this.data[r]);
      if (n >= 33088 && n <= 40956)
        n -= 33088;
      else if (n >= 57408 && n <= 60351)
        n -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[r] + `
Make sure your charset is UTF-8`
        );
      n = (n >>> 8 & 255) * 192 + (n & 255), o.put(n, 13);
    }
  }, We = a, We;
}
var Oe = { exports: {} }, Rt;
function qn() {
  return Rt || (Rt = 1, (function(e) {
    var i = {
      single_source_shortest_paths: function(a, o, r) {
        var n = {}, c = {};
        c[o] = 0;
        var d = i.PriorityQueue.make();
        d.push(o, 0);
        for (var s, h, u, p, x, w, C, P, m; !d.empty(); ) {
          s = d.pop(), h = s.value, p = s.cost, x = a[h] || {};
          for (u in x)
            x.hasOwnProperty(u) && (w = x[u], C = p + w, P = c[u], m = typeof c[u] > "u", (m || P > C) && (c[u] = C, d.push(u, C), n[u] = h));
        }
        if (typeof r < "u" && typeof c[r] > "u") {
          var f = ["Could not find a path from ", o, " to ", r, "."].join("");
          throw new Error(f);
        }
        return n;
      },
      extract_shortest_path_from_predecessor_list: function(a, o) {
        for (var r = [], n = o; n; )
          r.push(n), a[n], n = a[n];
        return r.reverse(), r;
      },
      find_path: function(a, o, r) {
        var n = i.single_source_shortest_paths(a, o, r);
        return i.extract_shortest_path_from_predecessor_list(
          n,
          r
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(a) {
          var o = i.PriorityQueue, r = {}, n;
          a = a || {};
          for (n in o)
            o.hasOwnProperty(n) && (r[n] = o[n]);
          return r.queue = [], r.sorter = a.sorter || o.default_sorter, r;
        },
        default_sorter: function(a, o) {
          return a.cost - o.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(a, o) {
          var r = { value: a, cost: o };
          this.queue.push(r), this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    e.exports = i;
  })(Oe)), Oe.exports;
}
var It;
function Wn() {
  return It || (It = 1, (function(e) {
    const i = te(), a = $n(), o = Dn(), r = Fn(), n = Un(), c = rn(), d = ee(), s = qn();
    function h(f) {
      return unescape(encodeURIComponent(f)).length;
    }
    function u(f, R, I) {
      const g = [];
      let N;
      for (; (N = f.exec(I)) !== null; )
        g.push({
          data: N[0],
          index: N.index,
          mode: R,
          length: N[0].length
        });
      return g;
    }
    function p(f) {
      const R = u(c.NUMERIC, i.NUMERIC, f), I = u(c.ALPHANUMERIC, i.ALPHANUMERIC, f);
      let g, N;
      return d.isKanjiModeEnabled() ? (g = u(c.BYTE, i.BYTE, f), N = u(c.KANJI, i.KANJI, f)) : (g = u(c.BYTE_KANJI, i.BYTE, f), N = []), R.concat(I, g, N).sort(function(b, E) {
        return b.index - E.index;
      }).map(function(b) {
        return {
          data: b.data,
          mode: b.mode,
          length: b.length
        };
      });
    }
    function x(f, R) {
      switch (R) {
        case i.NUMERIC:
          return a.getBitsLength(f);
        case i.ALPHANUMERIC:
          return o.getBitsLength(f);
        case i.KANJI:
          return n.getBitsLength(f);
        case i.BYTE:
          return r.getBitsLength(f);
      }
    }
    function w(f) {
      return f.reduce(function(R, I) {
        const g = R.length - 1 >= 0 ? R[R.length - 1] : null;
        return g && g.mode === I.mode ? (R[R.length - 1].data += I.data, R) : (R.push(I), R);
      }, []);
    }
    function C(f) {
      const R = [];
      for (let I = 0; I < f.length; I++) {
        const g = f[I];
        switch (g.mode) {
          case i.NUMERIC:
            R.push([
              g,
              { data: g.data, mode: i.ALPHANUMERIC, length: g.length },
              { data: g.data, mode: i.BYTE, length: g.length }
            ]);
            break;
          case i.ALPHANUMERIC:
            R.push([
              g,
              { data: g.data, mode: i.BYTE, length: g.length }
            ]);
            break;
          case i.KANJI:
            R.push([
              g,
              { data: g.data, mode: i.BYTE, length: h(g.data) }
            ]);
            break;
          case i.BYTE:
            R.push([
              { data: g.data, mode: i.BYTE, length: h(g.data) }
            ]);
        }
      }
      return R;
    }
    function P(f, R) {
      const I = {}, g = { start: {} };
      let N = ["start"];
      for (let v = 0; v < f.length; v++) {
        const b = f[v], E = [];
        for (let T = 0; T < b.length; T++) {
          const M = b[T], B = "" + v + T;
          E.push(B), I[B] = { node: M, lastCount: 0 }, g[B] = {};
          for (let A = 0; A < N.length; A++) {
            const _ = N[A];
            I[_] && I[_].node.mode === M.mode ? (g[_][B] = x(I[_].lastCount + M.length, M.mode) - x(I[_].lastCount, M.mode), I[_].lastCount += M.length) : (I[_] && (I[_].lastCount = M.length), g[_][B] = x(M.length, M.mode) + 4 + i.getCharCountIndicator(M.mode, R));
          }
        }
        N = E;
      }
      for (let v = 0; v < N.length; v++)
        g[N[v]].end = 0;
      return { map: g, table: I };
    }
    function m(f, R) {
      let I;
      const g = i.getBestModeForData(f);
      if (I = i.from(R, g), I !== i.BYTE && I.bit < g.bit)
        throw new Error('"' + f + '" cannot be encoded with mode ' + i.toString(I) + `.
 Suggested mode is: ` + i.toString(g));
      switch (I === i.KANJI && !d.isKanjiModeEnabled() && (I = i.BYTE), I) {
        case i.NUMERIC:
          return new a(f);
        case i.ALPHANUMERIC:
          return new o(f);
        case i.KANJI:
          return new n(f);
        case i.BYTE:
          return new r(f);
      }
    }
    e.fromArray = function(R) {
      return R.reduce(function(I, g) {
        return typeof g == "string" ? I.push(m(g, null)) : g.data && I.push(m(g.data, g.mode)), I;
      }, []);
    }, e.fromString = function(R, I) {
      const g = p(R, d.isKanjiModeEnabled()), N = C(g), v = P(N, I), b = s.find_path(v.map, "start", "end"), E = [];
      for (let T = 1; T < b.length - 1; T++)
        E.push(v.table[b[T]].node);
      return e.fromArray(w(E));
    }, e.rawSplit = function(R) {
      return e.fromArray(
        p(R, d.isKanjiModeEnabled())
      );
    };
  })(De)), De;
}
var Pt;
function On() {
  if (Pt) return Te;
  Pt = 1;
  const e = ee(), i = rt(), a = Bn(), o = _n(), r = Rn(), n = In(), c = Pn(), d = tn(), s = zn(), h = Ln(), u = Nn(), p = te(), x = Wn();
  function w(v, b) {
    const E = v.size, T = n.getPositions(b);
    for (let M = 0; M < T.length; M++) {
      const B = T[M][0], A = T[M][1];
      for (let _ = -1; _ <= 7; _++)
        if (!(B + _ <= -1 || E <= B + _))
          for (let z = -1; z <= 7; z++)
            A + z <= -1 || E <= A + z || (_ >= 0 && _ <= 6 && (z === 0 || z === 6) || z >= 0 && z <= 6 && (_ === 0 || _ === 6) || _ >= 2 && _ <= 4 && z >= 2 && z <= 4 ? v.set(B + _, A + z, !0, !0) : v.set(B + _, A + z, !1, !0));
    }
  }
  function C(v) {
    const b = v.size;
    for (let E = 8; E < b - 8; E++) {
      const T = E % 2 === 0;
      v.set(E, 6, T, !0), v.set(6, E, T, !0);
    }
  }
  function P(v, b) {
    const E = r.getPositions(b);
    for (let T = 0; T < E.length; T++) {
      const M = E[T][0], B = E[T][1];
      for (let A = -2; A <= 2; A++)
        for (let _ = -2; _ <= 2; _++)
          A === -2 || A === 2 || _ === -2 || _ === 2 || A === 0 && _ === 0 ? v.set(M + A, B + _, !0, !0) : v.set(M + A, B + _, !1, !0);
    }
  }
  function m(v, b) {
    const E = v.size, T = h.getEncodedBits(b);
    let M, B, A;
    for (let _ = 0; _ < 18; _++)
      M = Math.floor(_ / 3), B = _ % 3 + E - 8 - 3, A = (T >> _ & 1) === 1, v.set(M, B, A, !0), v.set(B, M, A, !0);
  }
  function f(v, b, E) {
    const T = v.size, M = u.getEncodedBits(b, E);
    let B, A;
    for (B = 0; B < 15; B++)
      A = (M >> B & 1) === 1, B < 6 ? v.set(B, 8, A, !0) : B < 8 ? v.set(B + 1, 8, A, !0) : v.set(T - 15 + B, 8, A, !0), B < 8 ? v.set(8, T - B - 1, A, !0) : B < 9 ? v.set(8, 15 - B - 1 + 1, A, !0) : v.set(8, 15 - B - 1, A, !0);
    v.set(T - 8, 8, 1, !0);
  }
  function R(v, b) {
    const E = v.size;
    let T = -1, M = E - 1, B = 7, A = 0;
    for (let _ = E - 1; _ > 0; _ -= 2)
      for (_ === 6 && _--; ; ) {
        for (let z = 0; z < 2; z++)
          if (!v.isReserved(M, _ - z)) {
            let W = !1;
            A < b.length && (W = (b[A] >>> B & 1) === 1), v.set(M, _ - z, W), B--, B === -1 && (A++, B = 7);
          }
        if (M += T, M < 0 || E <= M) {
          M -= T, T = -T;
          break;
        }
      }
  }
  function I(v, b, E) {
    const T = new a();
    E.forEach(function(z) {
      T.put(z.mode.bit, 4), T.put(z.getLength(), p.getCharCountIndicator(z.mode, v)), z.write(T);
    });
    const M = e.getSymbolTotalCodewords(v), B = d.getTotalCodewordsCount(v, b), A = (M - B) * 8;
    for (T.getLengthInBits() + 4 <= A && T.put(0, 4); T.getLengthInBits() % 8 !== 0; )
      T.putBit(0);
    const _ = (A - T.getLengthInBits()) / 8;
    for (let z = 0; z < _; z++)
      T.put(z % 2 ? 17 : 236, 8);
    return g(T, v, b);
  }
  function g(v, b, E) {
    const T = e.getSymbolTotalCodewords(b), M = d.getTotalCodewordsCount(b, E), B = T - M, A = d.getBlocksCount(b, E), _ = T % A, z = A - _, W = Math.floor(T / A), k = Math.floor(B / A), $ = k + 1, O = W - k, vn = new s(O);
    let xe = 0;
    const ue = new Array(A), at = new Array(A);
    let we = 0;
    const kn = new Uint8Array(v.buffer);
    for (let ne = 0; ne < A; ne++) {
      const ke = ne < z ? k : $;
      ue[ne] = kn.slice(xe, xe + ke), at[ne] = vn.encode(ue[ne]), xe += ke, we = Math.max(we, ke);
    }
    const ve = new Uint8Array(T);
    let lt = 0, H, V;
    for (H = 0; H < we; H++)
      for (V = 0; V < A; V++)
        H < ue[V].length && (ve[lt++] = ue[V][H]);
    for (H = 0; H < O; H++)
      for (V = 0; V < A; V++)
        ve[lt++] = at[V][H];
    return ve;
  }
  function N(v, b, E, T) {
    let M;
    if (Array.isArray(v))
      M = x.fromArray(v);
    else if (typeof v == "string") {
      let W = b;
      if (!W) {
        const k = x.rawSplit(v);
        W = h.getBestVersionForData(k, E);
      }
      M = x.fromString(v, W || 40);
    } else
      throw new Error("Invalid data");
    const B = h.getBestVersionForData(M, E);
    if (!B)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!b)
      b = B;
    else if (b < B)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + B + `.
`
      );
    const A = I(b, E, M), _ = e.getSymbolSize(b), z = new o(_);
    return w(z, b), C(z), P(z, b), f(z, E, 0), b >= 7 && m(z, b), R(z, A), isNaN(T) && (T = c.getBestMask(
      z,
      f.bind(null, z, E)
    )), c.applyMask(T, z), f(z, E, T), {
      modules: z,
      version: b,
      errorCorrectionLevel: E,
      maskPattern: T,
      segments: M
    };
  }
  return Te.create = function(b, E) {
    if (typeof b > "u" || b === "")
      throw new Error("No input text");
    let T = i.M, M, B;
    return typeof E < "u" && (T = i.from(E.errorCorrectionLevel, i.M), M = h.from(E.version), B = c.from(E.maskPattern), E.toSJISFunc && e.setToSJISFunction(E.toSJISFunc)), N(b, M, T, B);
  }, Te;
}
var je = {}, He = {}, Mt;
function on() {
  return Mt || (Mt = 1, (function(e) {
    function i(a) {
      if (typeof a == "number" && (a = a.toString()), typeof a != "string")
        throw new Error("Color should be defined as hex string");
      let o = a.slice().replace("#", "").split("");
      if (o.length < 3 || o.length === 5 || o.length > 8)
        throw new Error("Invalid hex color: " + a);
      (o.length === 3 || o.length === 4) && (o = Array.prototype.concat.apply([], o.map(function(n) {
        return [n, n];
      }))), o.length === 6 && o.push("F", "F");
      const r = parseInt(o.join(""), 16);
      return {
        r: r >> 24 & 255,
        g: r >> 16 & 255,
        b: r >> 8 & 255,
        a: r & 255,
        hex: "#" + o.slice(0, 6).join("")
      };
    }
    e.getOptions = function(o) {
      o || (o = {}), o.color || (o.color = {});
      const r = typeof o.margin > "u" || o.margin === null || o.margin < 0 ? 4 : o.margin, n = o.width && o.width >= 21 ? o.width : void 0, c = o.scale || 4;
      return {
        width: n,
        scale: n ? 4 : c,
        margin: r,
        color: {
          dark: i(o.color.dark || "#000000ff"),
          light: i(o.color.light || "#ffffffff")
        },
        type: o.type,
        rendererOpts: o.rendererOpts || {}
      };
    }, e.getScale = function(o, r) {
      return r.width && r.width >= o + r.margin * 2 ? r.width / (o + r.margin * 2) : r.scale;
    }, e.getImageWidth = function(o, r) {
      const n = e.getScale(o, r);
      return Math.floor((o + r.margin * 2) * n);
    }, e.qrToImageData = function(o, r, n) {
      const c = r.modules.size, d = r.modules.data, s = e.getScale(c, n), h = Math.floor((c + n.margin * 2) * s), u = n.margin * s, p = [n.color.light, n.color.dark];
      for (let x = 0; x < h; x++)
        for (let w = 0; w < h; w++) {
          let C = (x * h + w) * 4, P = n.color.light;
          if (x >= u && w >= u && x < h - u && w < h - u) {
            const m = Math.floor((x - u) / s), f = Math.floor((w - u) / s);
            P = p[d[m * c + f] ? 1 : 0];
          }
          o[C++] = P.r, o[C++] = P.g, o[C++] = P.b, o[C] = P.a;
        }
    };
  })(He)), He;
}
var At;
function jn() {
  return At || (At = 1, (function(e) {
    const i = on();
    function a(r, n, c) {
      r.clearRect(0, 0, n.width, n.height), n.style || (n.style = {}), n.height = c, n.width = c, n.style.height = c + "px", n.style.width = c + "px";
    }
    function o() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    e.render = function(n, c, d) {
      let s = d, h = c;
      typeof s > "u" && (!c || !c.getContext) && (s = c, c = void 0), c || (h = o()), s = i.getOptions(s);
      const u = i.getImageWidth(n.modules.size, s), p = h.getContext("2d"), x = p.createImageData(u, u);
      return i.qrToImageData(x.data, n, s), a(p, h, u), p.putImageData(x, 0, 0), h;
    }, e.renderToDataURL = function(n, c, d) {
      let s = d;
      typeof s > "u" && (!c || !c.getContext) && (s = c, c = void 0), s || (s = {});
      const h = e.render(n, c, s), u = s.type || "image/png", p = s.rendererOpts || {};
      return h.toDataURL(u, p.quality);
    };
  })(je)), je;
}
var Ve = {}, zt;
function Hn() {
  if (zt) return Ve;
  zt = 1;
  const e = on();
  function i(r, n) {
    const c = r.a / 255, d = n + '="' + r.hex + '"';
    return c < 1 ? d + " " + n + '-opacity="' + c.toFixed(2).slice(1) + '"' : d;
  }
  function a(r, n, c) {
    let d = r + n;
    return typeof c < "u" && (d += " " + c), d;
  }
  function o(r, n, c) {
    let d = "", s = 0, h = !1, u = 0;
    for (let p = 0; p < r.length; p++) {
      const x = Math.floor(p % n), w = Math.floor(p / n);
      !x && !h && (h = !0), r[p] ? (u++, p > 0 && x > 0 && r[p - 1] || (d += h ? a("M", x + c, 0.5 + w + c) : a("m", s, 0), s = 0, h = !1), x + 1 < n && r[p + 1] || (d += a("h", u), u = 0)) : s++;
    }
    return d;
  }
  return Ve.render = function(n, c, d) {
    const s = e.getOptions(c), h = n.modules.size, u = n.modules.data, p = h + s.margin * 2, x = s.color.light.a ? "<path " + i(s.color.light, "fill") + ' d="M0 0h' + p + "v" + p + 'H0z"/>' : "", w = "<path " + i(s.color.dark, "stroke") + ' d="' + o(u, h, s.margin) + '"/>', C = 'viewBox="0 0 ' + p + " " + p + '"', m = '<svg xmlns="http://www.w3.org/2000/svg" ' + (s.width ? 'width="' + s.width + '" height="' + s.width + '" ' : "") + C + ' shape-rendering="crispEdges">' + x + w + `</svg>
`;
    return typeof d == "function" && d(null, m), m;
  }, Ve;
}
var Lt;
function Vn() {
  if (Lt) return re;
  Lt = 1;
  const e = En(), i = On(), a = jn(), o = Hn();
  function r(n, c, d, s, h) {
    const u = [].slice.call(arguments, 1), p = u.length, x = typeof u[p - 1] == "function";
    if (!x && !e())
      throw new Error("Callback required as last argument");
    if (x) {
      if (p < 2)
        throw new Error("Too few arguments provided");
      p === 2 ? (h = d, d = c, c = s = void 0) : p === 3 && (c.getContext && typeof h > "u" ? (h = s, s = void 0) : (h = s, s = d, d = c, c = void 0));
    } else {
      if (p < 1)
        throw new Error("Too few arguments provided");
      return p === 1 ? (d = c, c = s = void 0) : p === 2 && !c.getContext && (s = d, d = c, c = void 0), new Promise(function(w, C) {
        try {
          const P = i.create(d, s);
          w(n(P, c, s));
        } catch (P) {
          C(P);
        }
      });
    }
    try {
      const w = i.create(d, s);
      h(null, n(w, c, s));
    } catch (w) {
      h(w);
    }
  }
  return re.create = i.create, re.toCanvas = r.bind(null, a.render), re.toDataURL = r.bind(null, a.renderToDataURL), re.toString = r.bind(null, function(n, c, d) {
    return o.render(n, d);
  }), re;
}
var Kn = Vn();
const an = /* @__PURE__ */ Tn(Kn), ln = {
  primary: "oklch(0.9848 0 0)",
  primaryForeground: "oklch(15% 0.0000 0.00)",
  primaryHover: "color-mix(in oklab, oklch(0.9848 0 0) 88%, oklch(15% 0.0000 0.00) 12%)",
  primarySubtle: "color-mix(in oklab, oklch(0.9848 0 0) 14%, transparent)",
  primaryGlow: "color-mix(in oklab, oklch(0.9848 0 0) 22%, transparent)",
  success: "oklch(73.29% 0.1935 120.35)",
  successForeground: "oklch(21.03% 0.0059 120.35)",
  successSubtle: "color-mix(in oklab, oklch(73.29% 0.1935 120.35) 15%, transparent)",
  warning: "oklch(0.8803 0.1348 86.06)",
  warningForeground: "oklch(15% 0.0404 86.06)",
  warningSubtle: "color-mix(in oklab, oklch(0.8803 0.1348 86.06) 15%, transparent)",
  danger: "oklch(0.7044 0.1872 23.19)",
  dangerForeground: "oklch(15% 0.0500 23.19)",
  dangerSubtle: "color-mix(in oklab, oklch(0.7044 0.1872 23.19) 15%, transparent)",
  info: "oklch(0.9848 0 0)",
  infoSubtle: "color-mix(in oklab, oklch(0.9848 0 0) 14%, transparent)",
  defaultBg: "oklch(27.40% 0.0000 0.00)",
  defaultForeground: "oklch(99.11% 0 0)",
  fieldBackground: "oklch(21.03% 0.0000 0.00)",
  fieldForeground: "oklch(99.11% 0.0000 0.00)",
  fieldPlaceholder: "oklch(70.50% 0.0000 0.00)",
  muted: "oklch(70.50% 0.0000 0.00)",
  overlay: "oklch(21.03% 0.0000 0.00)",
  overlayForeground: "oklch(99.11% 0.0000 0.00)",
  scrollbar: "oklch(70.50% 0.0000 0.00)",
  segment: "oklch(39.64% 0.0000 0.00)",
  segmentForeground: "oklch(99.11% 0.0000 0.00)",
  surface: "oklch(21.03% 0.0000 0.00)",
  surfaceForeground: "oklch(99.11% 0.0000 0.00)",
  surfaceSecondary: "oklch(25.70% 0.0000 0.00)",
  surfaceSecondaryForeground: "oklch(99.11% 0.0000 0.00)",
  surfaceTertiary: "oklch(27.21% 0.0000 0.00)",
  surfaceTertiaryForeground: "oklch(99.11% 0.0000 0.00)",
  bgDeep: "oklch(12.00% 0.0000 0.00)",
  bg: "oklch(12.00% 0.0000 0.00)",
  bgElevated: "oklch(21.03% 0.0000 0.00)",
  bgSurface: "oklch(21.03% 0.0000 0.00)",
  bgHover: "oklch(25.70% 0.0000 0.00)",
  bgActive: "oklch(27.21% 0.0000 0.00)",
  border: "oklch(28.00% 0.0000 0.00)",
  borderSubtle: "oklch(25.00% 0.0000 0.00)",
  borderFocus: "oklch(0.9848 0 0)",
  text: "oklch(99.11% 0.0000 0.00)",
  textSecondary: "oklch(70.50% 0.0000 0.00)",
  textTertiary: "oklch(70.50% 0.0000 0.00)",
  textInverse: "oklch(15% 0.0000 0.00)",
  glass: "color-mix(in oklab, oklch(21.03% 0.0000 0.00) 92%, transparent)",
  glassBorder: "oklch(28.00% 0.0000 0.00)",
  shadowSm: "0 0 0 0 transparent inset",
  shadowMd: "0 0 0 0 transparent inset",
  shadowLg: "0 0 1px 0 #ffffff4d inset",
  shadowGlow: "0 0 0 1px color-mix(in oklab, oklch(0.9848 0 0) 18%, transparent)"
}, Gn = {
  radiusSm: "0.25rem",
  radiusMd: "0.25rem",
  radiusLg: "0.25rem",
  radiusXl: "0.25rem",
  fieldRadius: "0.5rem",
  fontSans: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'Geist Mono', 'SF Mono', 'Cascadia Code', monospace",
  transition: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  transitionSlow: "400ms cubic-bezier(0.4, 0, 0.2, 1)"
}, Yn = {
  sidebarWidth: "260px",
  sidebarCollapsed: "72px",
  topbarHeight: "64px"
}, ot = {
  ...Gn,
  ...Yn
}, sn = {
  dark: ln
};
function Jn(e) {
  return e.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase());
}
function cn(e = "ag") {
  return e.trim() || "ag";
}
function Se(e, i) {
  return `--${e}-${Jn(i)}`;
}
Object.keys(sn.dark).reduce((e, i) => (e[i] = Se("ag", i), e), {});
Object.keys(ot).reduce((e, i) => (e[i] = Se("ag", i), e), {});
function dn(e = {}) {
  const i = cn(e.prefix);
  return Object.keys(sn.dark).reduce((a, o) => (a[o] = Se(i, o), a), {});
}
function un(e = {}) {
  const i = cn(e.prefix);
  return Object.keys(ot).reduce((a, o) => (a[o] = Se(i, o), a), {});
}
const Qn = dn(), Zn = un();
function t(e, i = {}) {
  const a = i.prefix ? dn(i) : Qn, o = i.prefix ? un(i) : Zn;
  if (e in a) {
    const n = e;
    return `var(${a[n]}, ${ln[n]})`;
  }
  const r = e;
  return `var(${o[r]}, ${ot[r]})`;
}
const Xn = "/api/v1/ext-user/payment-epay", er = "/api/v1/ext/payment-epay";
async function q(e, i, a, o) {
  const r = {};
  a !== void 0 && (r["Content-Type"] = "application/json");
  const n = localStorage.getItem("token");
  n && (r.Authorization = `Bearer ${n}`);
  const c = o != null && o.admin ? er : Xn, d = await fetch(c + i, {
    method: e,
    headers: r,
    body: a ? JSON.stringify(a) : void 0
  }), s = await d.text();
  let h = null;
  try {
    h = s ? JSON.parse(s) : null;
  } catch {
  }
  if (!d.ok) {
    const p = h, x = (p == null ? void 0 : p.message) || (h == null ? void 0 : h.error) || `HTTP ${d.status}`;
    throw d.status === 401 && (localStorage.removeItem("token"), window.location.href = "/login"), new Error(x);
  }
  const u = h;
  if (u && typeof u == "object" && "code" in u && "data" in u) {
    if (u.code !== 0)
      throw new Error(u.message || "请求失败");
    return u.data;
  }
  return h;
}
const F = {
  // ============ User ============
  /** 列出当前可用的支付方式（PayMethod，不是 Provider） */
  methods: () => q("GET", "/user/methods"),
  createOrder: (e) => q("POST", "/user/orders", e),
  /** 启用中的充值套餐（"充100送15"按钮数据源）；未配置套餐时返回空列表 */
  packages: () => q("GET", "/user/packages"),
  listOrders: (e = 50) => q("GET", `/user/orders?limit=${e}`),
  getOrder: (e) => q("GET", `/user/orders/${encodeURIComponent(e)}`),
  // ============ Admin: 订单 ============
  // email 为子串过滤（后端走 ILIKE %x%）；status='all' 或留空表示不过滤
  adminListOrders: (e = {}) => {
    const i = new URLSearchParams();
    return i.set("page", String(e.page ?? 1)), i.set("page_size", String(e.pageSize ?? 20)), e.email && e.email.trim() && i.set("email", e.email.trim()), e.status && e.status !== "all" && i.set("status", e.status), q("GET", `/admin/orders?${i.toString()}`, void 0, { admin: !0 });
  },
  // ============ Admin: Provider 配置 ============
  adminListProviders: () => q("GET", "/admin/providers", void 0, { admin: !0 }),
  adminUpsertProvider: (e) => q("POST", "/admin/providers", e, { admin: !0 }),
  adminDeleteProvider: (e) => q("DELETE", `/admin/providers/${encodeURIComponent(e)}`, void 0, { admin: !0 }),
  adminReloadProviders: () => q("POST", "/admin/providers/reload", {}, { admin: !0 }),
  // ============ Admin: 充值套餐 ============
  adminListPackages: () => q("GET", "/admin/packages", void 0, { admin: !0 }),
  /** id=0 表示新增，>0 表示编辑 */
  adminUpsertPackage: (e) => q("POST", "/admin/packages", e, { admin: !0 }),
  adminDeletePackage: (e) => q("DELETE", `/admin/packages/${e}`, void 0, { admin: !0 })
};
let he = null;
function tr() {
  return he || (he = (async () => {
    var r;
    const i = await (await fetch("/api/v1/settings/public")).json(), a = (i == null ? void 0 : i.data) || {};
    let o = "";
    try {
      const n = window.localStorage.getItem("ag_origin_site") || "";
      if (n && a.sites_branding) {
        const c = JSON.parse(a.sites_branding);
        o = ((r = c == null ? void 0 : c[n]) == null ? void 0 : r.name) || "";
      }
    } catch {
    }
    return o || a.site_name || "";
  })().catch(() => (he = null, ""))), he;
}
async function nr(e, i) {
  const a = new URLSearchParams();
  a.set("start_time", new Date(e.paid_at).toISOString()), i && a.set("end_time", new Date(i).toISOString()), a.set("order_no", e.out_trade_no);
  try {
    a.set("tz", Intl.DateTimeFormat().resolvedOptions().timeZone || "");
  } catch {
  }
  const o = {}, r = localStorage.getItem("token");
  r && (o.Authorization = `Bearer ${r}`);
  const n = await fetch(`/api/v1/usage/export?${a.toString()}`, { headers: o });
  if (!n.ok) {
    if (n.status === 401) {
      localStorage.removeItem("token"), window.location.href = "/login";
      return;
    }
    let u = `HTTP ${n.status}`;
    try {
      const p = await n.json();
      u = (p == null ? void 0 : p.message) || u;
    } catch {
    }
    throw new Error(u);
  }
  if (!(n.headers.get("content-type") || "").includes("text/csv"))
    throw new Error("导出功能暂不可用，请稍后再试（服务端版本过旧）");
  const d = await n.blob(), s = URL.createObjectURL(d), h = document.createElement("a");
  h.href = s, h.download = `usage-${e.out_trade_no}.csv`, document.body.appendChild(h), h.click(), h.remove(), setTimeout(() => URL.revokeObjectURL(s), 6e4);
}
function D(e, i = {}) {
  const a = e.toFixed(2);
  return i.compact ? `$${e}` : `$${a}`;
}
const rr = /* @__PURE__ */ new Set(["zh", "zh-HK", "en", "ja"]);
function Nt(e) {
  return e && rr.has(e) ? e : null;
}
function or() {
  if (typeof navigator > "u") return "en";
  const e = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const i of e) {
    const a = (i || "").toLowerCase();
    if (a) {
      if (a === "zh-hk" || a === "zh-tw" || a === "zh-mo" || a.includes("hant")) return "zh-HK";
      if (a.startsWith("zh")) return "zh";
      if (a.startsWith("ja")) return "ja";
      if (a.startsWith("en")) return "en";
    }
  }
  return "en";
}
function ir() {
  if (typeof document < "u") {
    const e = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/), i = e ? Nt(decodeURIComponent(e[1] ?? "")) : null;
    if (i) return i;
  }
  try {
    const e = Nt(window.localStorage.getItem("lang"));
    if (e) return e;
  } catch {
  }
  return or();
}
const ar = {
  "加载中...": "載入中...",
  "加载失败: ": "載入失敗: ",
  "加载支付方式失败: ": "載入支付方式失敗: ",
  "充值功能暂未开放，请联系管理员。": "增值功能暫未開放，請聯絡管理員。",
  账户充值: "帳戶增值",
  "充值比例：": "增值比例：",
  充值成功: "增值成功",
  再次充值: "再次增值",
  订单: "訂單",
  "已支付，金额": "已支付，金額",
  已入账: "已入賬",
  "，套餐赠送": "，套餐贈送",
  已同步到账: "已同步到賬",
  "。": "。",
  扫码付款: "掃碼付款",
  付款二维码: "付款二維碼",
  "生成二维码中...": "生成二維碼中...",
  支付成功后另赠: "支付成功後另贈",
  请使用: "請使用",
  扫码完成付款: "掃碼完成付款",
  "订单号：": "訂單號：",
  "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）": "支付完成後本頁將自動跳轉到結果頁（每 3 秒檢查一次）",
  "离开或刷新本页也没关系，支付结果会在你回来时自动恢复。": "離開或重新整理本頁也沒關係，付款結果會在你回來時自動恢復。",
  "支付完成后将自动刷新（每 3 秒检查一次）": "支付完成後將自動重新整理（每 3 秒檢查一次）",
  "扫码不便？": "掃碼不便？",
  "点此在新窗口打开付款页 →": "點此在新視窗開啟付款頁 →",
  取消: "取消",
  关闭: "關閉",
  订单已: "訂單已",
  订单已过期: "訂單已過期",
  订单已失败: "訂單已失敗",
  订单已取消: "訂單已取消",
  订单已退款: "訂單已退款",
  "该订单无法继续支付，请重新发起充值。": "該訂單無法繼續支付，請重新發起增值。",
  重新发起: "重新發起",
  选择套餐: "選擇套餐",
  选择金额: "選擇金額",
  送: "送",
  自定义金额: "自訂金額",
  "（不参与套餐赠送）": "（不參與套餐贈送）",
  选择支付方式: "選擇支付方式",
  "处理中...": "處理中...",
  立即支付: "立即支付",
  请选择支付方式: "請選擇支付方式",
  请输入有效金额: "請輸入有效金額",
  最低充值金额为: "最低增值金額為",
  单笔充值金额不能超过: "單筆增值金額不能超過",
  支付宝: "支付寶",
  微信支付: "微信支付",
  支付成功: "支付成功",
  暂无充值记录: "暫無增值記錄",
  订单号: "訂單號",
  金额: "金額",
  支付方式: "支付方式",
  状态: "狀態",
  创建时间: "建立時間",
  支付时间: "支付時間",
  操作: "操作",
  继续支付: "繼續支付",
  导出明细: "匯出明細",
  "导出中...": "匯出中...",
  "导出失败: ": "匯出失敗: ",
  待支付: "待支付",
  已支付: "已支付",
  已过期: "已過期",
  失败: "失敗",
  已取消: "已取消",
  已退款: "已退款"
}, lr = {
  "加载中...": "Loading...",
  "加载失败: ": "Failed to load: ",
  "加载支付方式失败: ": "Failed to load payment methods: ",
  "充值功能暂未开放，请联系管理员。": "Top-up is not available yet. Please contact the administrator.",
  账户充值: "Top Up",
  "充值比例：": "Top-up rate: ",
  充值成功: "Top Up Successful",
  再次充值: "Top Up Again",
  订单: "Order",
  "已支付，金额": "has been paid; amount",
  已入账: "credited",
  "，套餐赠送": ", package bonus",
  已同步到账: "also credited",
  "。": ".",
  扫码付款: "Scan to Pay",
  付款二维码: "Payment QR code",
  "生成二维码中...": "Generating QR code...",
  支付成功后另赠: "Bonus after payment:",
  请使用: "Please use",
  扫码完成付款: "to scan and complete the payment",
  "订单号：": "Order No.: ",
  "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）": "This page will redirect automatically once payment completes (checked every 3 seconds).",
  "离开或刷新本页也没关系，支付结果会在你回来时自动恢复。": "It's fine to leave or refresh this page — the payment result will be restored automatically when you come back.",
  "支付完成后将自动刷新（每 3 秒检查一次）": "Refreshes automatically after payment (checked every 3 seconds).",
  "扫码不便？": "Can't scan the code?",
  "点此在新窗口打开付款页 →": "Open the payment page in a new window →",
  取消: "Cancel",
  关闭: "Close",
  订单已: "Order ",
  订单已过期: "Order Expired",
  订单已失败: "Order Failed",
  订单已取消: "Order Cancelled",
  订单已退款: "Order Refunded",
  "该订单无法继续支付，请重新发起充值。": "This order can no longer be paid. Please start a new top-up.",
  重新发起: "Try Again",
  选择套餐: "Select Package",
  选择金额: "Select Amount",
  送: "Bonus",
  自定义金额: "Custom amount",
  "（不参与套餐赠送）": " (no package bonus)",
  选择支付方式: "Select Payment Method",
  "处理中...": "Processing...",
  立即支付: "Pay Now",
  请选择支付方式: "Please select a payment method",
  请输入有效金额: "Please enter a valid amount",
  最低充值金额为: "Minimum top-up amount:",
  单笔充值金额不能超过: "Maximum top-up amount:",
  支付宝: "Alipay",
  微信支付: "WeChat Pay",
  支付成功: "Payment Successful",
  暂无充值记录: "No top-up records yet",
  订单号: "Order No.",
  金额: "Amount",
  支付方式: "Payment Method",
  状态: "Status",
  创建时间: "Created At",
  支付时间: "Paid At",
  操作: "Actions",
  继续支付: "Continue Payment",
  导出明细: "Export Usage",
  "导出中...": "Exporting...",
  "导出失败: ": "Export failed: ",
  待支付: "Pending",
  已支付: "Paid",
  已过期: "Expired",
  失败: "Failed",
  已取消: "Cancelled",
  已退款: "Refunded"
}, sr = {
  "加载中...": "読み込み中...",
  "加载失败: ": "読み込みに失敗しました: ",
  "加载支付方式失败: ": "支払い方法の読み込みに失敗しました: ",
  "充值功能暂未开放，请联系管理员。": "チャージ機能は現在ご利用いただけません。管理者にお問い合わせください。",
  账户充值: "アカウントチャージ",
  "充值比例：": "チャージレート：",
  充值成功: "チャージ完了",
  再次充值: "もう一度チャージ",
  订单: "注文",
  "已支付，金额": "は支払済み、金額",
  已入账: "が入金されました",
  "，套餐赠送": "、パッケージ特典",
  已同步到账: "も入金されました",
  "。": "。",
  扫码付款: "QRコードで支払う",
  付款二维码: "支払い用QRコード",
  "生成二维码中...": "QRコードを生成中...",
  支付成功后另赠: "支払い後の特典:",
  请使用: "お支払いは",
  扫码完成付款: "でスキャンしてください",
  "订单号：": "注文番号：",
  "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）": "支払い完了後、自動的に結果ページへ移動します（3秒ごとに確認）",
  "离开或刷新本页也没关系，支付结果会在你回来时自动恢复。": "このページを離れたり更新しても大丈夫です。戻ってきたときに支払い結果が自動的に復元されます。",
  "支付完成后将自动刷新（每 3 秒检查一次）": "支払い完了後、自動的に更新されます（3秒ごとに確認）",
  "扫码不便？": "スキャンできない場合は",
  "点此在新窗口打开付款页 →": "新しいウィンドウで支払いページを開く →",
  取消: "キャンセル",
  关闭: "閉じる",
  订单已: "注文は",
  订单已过期: "注文は期限切れです",
  订单已失败: "注文は失敗しました",
  订单已取消: "注文はキャンセルされました",
  订单已退款: "注文は返金されました",
  "该订单无法继续支付，请重新发起充值。": "この注文は支払いを続行できません。もう一度チャージしてください。",
  重新发起: "やり直す",
  选择套餐: "パッケージを選択",
  选择金额: "金額を選択",
  送: "特典",
  自定义金额: "カスタム金額",
  "（不参与套餐赠送）": "（パッケージ特典対象外）",
  选择支付方式: "支払い方法を選択",
  "处理中...": "処理中...",
  立即支付: "今すぐ支払う",
  请选择支付方式: "支払い方法を選択してください",
  请输入有效金额: "有効な金額を入力してください",
  最低充值金额为: "最低チャージ金額：",
  单笔充值金额不能超过: "1回のチャージ上限：",
  支付宝: "Alipay",
  微信支付: "WeChat Pay",
  支付成功: "支払い完了",
  暂无充值记录: "チャージ履歴はありません",
  订单号: "注文番号",
  金额: "金額",
  支付方式: "支払い方法",
  状态: "ステータス",
  创建时间: "作成日時",
  支付时间: "支払日時",
  操作: "操作",
  继续支付: "支払いを続ける",
  导出明细: "明細をエクスポート",
  "导出中...": "エクスポート中...",
  "导出失败: ": "エクスポート失敗: ",
  待支付: "未払い",
  已支付: "支払済み",
  已过期: "期限切れ",
  失败: "失敗",
  已取消: "キャンセル済み",
  已退款: "返金済み"
}, cr = {
  "zh-HK": ar,
  en: lr,
  ja: sr
};
function S(e) {
  const i = ir();
  if (i === "zh") return e;
  const a = cr[i];
  return a && a[e] || e;
}
const fe = "epay_last_order", $t = [10, 30, 50, 100, 200, 500];
function Dt(e, i) {
  const a = $t.filter((o) => o >= e && o <= i);
  return e > $t[0] && e <= i && !a.includes(e) && a.unshift(e), !a.length && e <= i && a.push(e), a;
}
function dr() {
  const [e, i] = L([]), [a, o] = L(!0), [r, n] = L(null), [c, d] = L(1), [s, h] = L(1e4), [u, p] = L(30), [x, w] = L(""), [C, P] = L(!1), [m, f] = L(null), [R, I] = L([]), [g, N] = L(null), v = de(!1), [b, E] = L(null), [T, M] = L(null), B = de(null);
  U(() => {
    let k;
    try {
      k = localStorage.getItem(fe);
    } catch {
      return;
    }
    k && F.getOrder(k).then(($) => {
      if ($.status === "pending") {
        E($);
        return;
      }
      if ($.status === "paid") {
        const O = $.paid_at ? Date.parse($.paid_at) : NaN;
        if (!Number.isFinite(O) || Date.now() - O < 24 * 3600 * 1e3) {
          E($);
          return;
        }
      }
      try {
        localStorage.removeItem(fe);
      } catch {
      }
    }).catch(() => {
    });
  }, []), U(() => {
    F.methods().then((k) => {
      var $;
      i(k.methods || []), d(k.min_amount > 0 ? k.min_amount : 1), h(k.max_amount > 0 ? k.max_amount : 1e4), ($ = k.methods) != null && $.length && w(k.methods[0].key);
    }).catch((k) => n(String((k == null ? void 0 : k.message) || k))).finally(() => o(!1)), F.packages().then((k) => {
      I(k.list || []);
    }).catch(() => I([]));
  }, []), U(() => {
    if (v.current) return;
    const k = R.find((O) => O.amount >= c && O.amount <= s);
    if (k) {
      N(k.id), p(k.amount);
      return;
    }
    N(null);
    const [$] = Dt(c, s);
    $ !== void 0 && p($);
  }, [R, c, s]), U(() => {
    if (!b || b.status !== "pending") {
      B.current && (window.clearInterval(B.current), B.current = null);
      return;
    }
    const k = async () => {
      try {
        const $ = await F.getOrder(b.out_trade_no);
        E($);
      } catch {
      }
    };
    return B.current = window.setInterval(k, 3e3), () => {
      B.current && (window.clearInterval(B.current), B.current = null);
    };
  }, [b == null ? void 0 : b.out_trade_no, b == null ? void 0 : b.status]), U(() => {
    if (!b) {
      M(null);
      return;
    }
    const k = b.qr_code_content || b.payment_url;
    if (!k) {
      M(null);
      return;
    }
    let $ = !1;
    return an.toDataURL(k, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((O) => {
      $ || M(O);
    }).catch(() => {
      $ || M(null);
    }), () => {
      $ = !0;
    };
  }, [b == null ? void 0 : b.payment_url, b == null ? void 0 : b.qr_code_content]);
  const A = async () => {
    if (f(null), !x) {
      f(S("请选择支付方式"));
      return;
    }
    if (!Number.isFinite(u)) {
      f(S("请输入有效金额"));
      return;
    }
    if (!u || u < c) {
      f(`${S("最低充值金额为")} ${D(c)}`);
      return;
    }
    if (u > s) {
      f(`${S("单笔充值金额不能超过")} ${D(s)}`);
      return;
    }
    P(!0);
    try {
      const k = await tr(), $ = await F.createOrder({
        amount: u,
        method: x,
        subject: k ? `${k} 余额充值` : "余额充值",
        ...g !== null ? { package_id: g } : {}
      });
      E($);
      try {
        localStorage.setItem(fe, $.out_trade_no);
      } catch {
      }
    } catch (k) {
      f(String(k.message || k));
    } finally {
      P(!1);
    }
  }, _ = () => {
    E(null), f(null);
    try {
      localStorage.removeItem(fe);
    } catch {
    }
  };
  if (a)
    return /* @__PURE__ */ l("div", { style: Q, children: /* @__PURE__ */ l("div", { style: Ft, children: S("加载中...") }) });
  if (r)
    return /* @__PURE__ */ l("div", { style: Q, children: /* @__PURE__ */ y("div", { style: { ...Ft, color: t("danger") }, children: [
      S("加载支付方式失败: "),
      r
    ] }) });
  if (e.length === 0)
    return /* @__PURE__ */ l("div", { style: Q, children: /* @__PURE__ */ l("div", { style: ye, children: /* @__PURE__ */ l("p", { style: { color: t("textSecondary"), margin: 0, textAlign: "center" }, children: S("充值功能暂未开放，请联系管理员。") }) }) });
  if (b)
    return b.status === "paid" ? /* @__PURE__ */ y("div", { style: Q, children: [
      /* @__PURE__ */ l("h2", { style: pe, children: S("充值成功") }),
      /* @__PURE__ */ y("div", { style: ye, children: [
        /* @__PURE__ */ y("p", { style: { margin: 0, color: t("text") }, children: [
          S("订单"),
          " ",
          /* @__PURE__ */ l("code", { style: Ge, children: b.out_trade_no }),
          " ",
          S("已支付，金额"),
          " ",
          /* @__PURE__ */ l("strong", { style: { color: t("success") }, children: D(b.amount) }),
          " ",
          S("已入账"),
          (b.bonus_amount ?? 0) > 0 && /* @__PURE__ */ y(ce, { children: [
            S("，套餐赠送"),
            " ",
            /* @__PURE__ */ l("strong", { style: { color: t("success") }, children: D(b.bonus_amount) }),
            " ",
            S("已同步到账")
          ] }),
          S("。")
        ] }),
        /* @__PURE__ */ l("button", { style: { ...Ke, marginTop: 20 }, onClick: _, children: S("再次充值") })
      ] })
    ] }) : b.status === "pending" ? /* @__PURE__ */ y("div", { style: Q, children: [
      /* @__PURE__ */ l("h2", { style: pe, children: S("扫码付款") }),
      /* @__PURE__ */ y("div", { style: wr, children: [
        T ? /* @__PURE__ */ l("img", { src: T, alt: S("付款二维码"), style: qt }) : /* @__PURE__ */ l("div", { style: { ...qt, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary") }, children: S("生成二维码中...") }),
        /* @__PURE__ */ l("div", { style: vr, children: D(b.amount) }),
        (b.bonus_amount ?? 0) > 0 && /* @__PURE__ */ y("div", { style: { color: t("success"), fontSize: 13, marginTop: 2 }, children: [
          S("支付成功后另赠"),
          " ",
          D(b.bonus_amount)
        ] }),
        /* @__PURE__ */ y("div", { style: { color: t("textSecondary"), fontSize: 13 }, children: [
          S("请使用"),
          " ",
          ur(b.method),
          " ",
          S("扫码完成付款")
        ] }),
        /* @__PURE__ */ y("div", { style: { marginTop: 8, color: t("textTertiary"), fontSize: 12 }, children: [
          S("订单号："),
          /* @__PURE__ */ l("code", { style: Ge, children: b.out_trade_no })
        ] }),
        /* @__PURE__ */ l("p", { style: { textAlign: "center", color: t("textTertiary"), fontSize: 13, marginTop: 20, marginBottom: 0 }, children: S("支付完成后本页将自动跳转到结果页（每 3 秒检查一次）") }),
        /* @__PURE__ */ l("p", { style: { textAlign: "center", color: t("textTertiary"), fontSize: 12, marginTop: 6, marginBottom: 0 }, children: S("离开或刷新本页也没关系，支付结果会在你回来时自动恢复。") }),
        b.payment_url && /* @__PURE__ */ y("p", { style: { textAlign: "center", fontSize: 12, marginTop: 8, marginBottom: 0 }, children: [
          S("扫码不便？"),
          " ",
          /* @__PURE__ */ l("a", { href: b.payment_url, target: "_blank", rel: "noreferrer", style: { color: t("primary"), textDecoration: "none" }, children: S("点此在新窗口打开付款页 →") })
        ] }),
        /* @__PURE__ */ l("button", { style: { ...xr, marginTop: 20 }, onClick: _, children: S("取消") })
      ] })
    ] }) : /* @__PURE__ */ y("div", { style: Q, children: [
      /* @__PURE__ */ l("h2", { style: pe, children: gr(b.status) }),
      /* @__PURE__ */ y("div", { style: ye, children: [
        /* @__PURE__ */ y("p", { style: { margin: 0, color: t("textSecondary") }, children: [
          S("订单号："),
          /* @__PURE__ */ l("code", { style: Ge, children: b.out_trade_no })
        ] }),
        /* @__PURE__ */ l("button", { style: { ...Ke, marginTop: 20 }, onClick: _, children: S("重新发起") })
      ] })
    ] });
  const z = R.filter((k) => k.amount >= c && k.amount <= s), W = Dt(c, s);
  return /* @__PURE__ */ y("div", { style: Q, children: [
    /* @__PURE__ */ l("h2", { style: pe, children: S("账户充值") }),
    /* @__PURE__ */ y("div", { style: ye, children: [
      /* @__PURE__ */ y("p", { style: fr, children: [
        S("充值比例："),
        /* @__PURE__ */ l("strong", { style: { color: t("text") }, children: "1 CNY = $1" })
      ] }),
      /* @__PURE__ */ y("section", { children: [
        /* @__PURE__ */ l("h3", { style: Ut, children: z.length ? S("选择套餐") : S("选择金额") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 }, children: z.length ? z.map((k) => /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            onClick: () => {
              v.current = !0, N(k.id), p(k.amount);
            },
            style: g === k.id ? yr : gn,
            title: k.title || void 0,
            children: [
              /* @__PURE__ */ l("span", { style: { fontSize: 16, fontWeight: 600 }, children: D(k.amount, { compact: !0 }) }),
              k.bonus_amount > 0 && /* @__PURE__ */ y("span", { style: g === k.id ? mr : hn, children: [
                S("送"),
                " ",
                D(k.bonus_amount, { compact: !0 })
              ] })
            ]
          },
          k.id
        )) : W.map((k) => /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => {
              v.current = !0, N(null), p(k);
            },
            style: u === k ? pr : it,
            children: D(k, { compact: !0 })
          },
          k
        )) }),
        /* @__PURE__ */ y("div", { style: { marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: t("textSecondary"), fontSize: 13 }, children: [
          /* @__PURE__ */ y("span", { children: [
            S("自定义金额"),
            z.length ? S("（不参与套餐赠送）") : ""
          ] }),
          /* @__PURE__ */ l(
            "input",
            {
              type: "number",
              min: c,
              max: s,
              step: 1,
              value: u,
              onChange: (k) => {
                v.current = !0, N(null), p(Number(k.target.value));
              },
              style: Sr
            }
          ),
          /* @__PURE__ */ l("span", { children: "$" })
        ] })
      ] }),
      /* @__PURE__ */ y("section", { style: hr, children: [
        /* @__PURE__ */ l("h3", { style: Ut, children: S("选择支付方式") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: e.map((k) => /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => w(k.key),
            style: x === k.key ? br : fn,
            title: k.description,
            children: S(k.label)
          },
          k.key
        )) })
      ] }),
      m && /* @__PURE__ */ l("p", { style: { color: t("danger"), marginTop: 16, fontSize: 13 }, children: m }),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: A,
          disabled: C,
          style: { ...Ke, marginTop: 24, width: "100%", opacity: C ? 0.6 : 1 },
          children: S(C ? "处理中..." : "立即支付")
        }
      )
    ] })
  ] });
}
function ur(e) {
  switch (e) {
    case "alipay":
      return S("支付宝");
    case "wxpay":
      return S("微信支付");
    default:
      return e;
  }
}
function gr(e) {
  switch (e) {
    case "expired":
      return S("订单已过期");
    case "failed":
      return S("订单已失败");
    case "cancelled":
      return S("订单已取消");
    case "refunded":
      return S("订单已退款");
    default:
      return S("订单已") + e;
  }
}
const Q = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, pe = {
  margin: "0 0 20px",
  fontSize: 22,
  fontWeight: 600,
  color: t("text"),
  letterSpacing: "-0.01em"
}, Ft = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, ye = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "24px"
}, hr = {
  marginTop: 28
}, fr = {
  margin: "0 0 20px",
  padding: "10px 12px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("textSecondary"),
  fontSize: 13,
  lineHeight: 1.6
}, Ut = {
  margin: "0 0 12px",
  fontSize: 13,
  fontWeight: 600,
  color: t("textSecondary"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, it = {
  minWidth: 88,
  padding: "12px 18px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bg"),
  color: t("text"),
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  transition: t("transition")
}, pr = {
  ...it,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, gn = {
  ...it,
  minWidth: 104,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4
}, yr = {
  ...gn,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary")
}, hn = {
  fontSize: 11,
  fontWeight: 600,
  padding: "1px 8px",
  borderRadius: 999,
  background: t("bgElevated"),
  color: t("success"),
  border: `1px solid ${t("glassBorder")}`
}, mr = {
  ...hn,
  background: t("primary"),
  color: t("textInverse"),
  border: "none"
}, fn = {
  minWidth: 140,
  padding: "16px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  transition: t("transition")
}, br = {
  ...fn,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, Sr = {
  padding: "8px 12px",
  width: 140,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 14,
  outline: "none"
}, Ke = {
  padding: "12px 28px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: t("transition")
}, xr = {
  padding: "10px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, wr = {
  padding: "28px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: t("bgSurface")
}, qt = {
  width: 240,
  height: 240,
  background: t("bgElevated"),
  padding: 8,
  borderRadius: t("radiusMd")
}, vr = {
  marginTop: 20,
  fontSize: 32,
  fontWeight: 700,
  color: t("text"),
  fontFamily: t("fontMono"),
  letterSpacing: "-0.02em"
}, Ge = {
  fontFamily: t("fontMono"),
  fontSize: "0.9em",
  padding: "1px 6px",
  borderRadius: 4,
  background: t("bg"),
  color: t("textSecondary")
};
function kr() {
  const [e, i] = L([]), [a, o] = L(!0), [r, n] = L(null), [c, d] = L(null), [s, h] = L(null), [u, p] = L(null), [x, w] = L(null), C = de(null), P = () => {
    o(!0), F.listOrders(100).then((g) => i(g.list || [])).catch((g) => n(String((g == null ? void 0 : g.message) || g))).finally(() => o(!1));
  };
  U(P, []), U(() => {
    if (!u) {
      w(null);
      return;
    }
    const g = u.qr_code_content || u.payment_url;
    if (!g) {
      w(null);
      return;
    }
    let N = !1;
    return an.toDataURL(g, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((v) => {
      N || w(v);
    }).catch(() => {
      N || w(null);
    }), () => {
      N = !0;
    };
  }, [u == null ? void 0 : u.payment_url, u == null ? void 0 : u.qr_code_content]), U(() => {
    if (!u || u.status !== "pending") {
      C.current && (window.clearInterval(C.current), C.current = null);
      return;
    }
    return C.current = window.setInterval(async () => {
      try {
        const g = await F.getOrder(u.out_trade_no);
        p(g), g.status !== "pending" && P();
      } catch {
      }
    }, 3e3), () => {
      C.current && (window.clearInterval(C.current), C.current = null);
    };
  }, [u == null ? void 0 : u.out_trade_no, u == null ? void 0 : u.status]);
  const m = (g) => {
    p(g);
  }, f = (g) => {
    if (!g.paid_at) return;
    const N = new Date(g.paid_at).getTime();
    let v;
    for (const b of e) {
      if (b.status !== "paid" || !b.paid_at || b.id === g.id) continue;
      const E = new Date(b.paid_at).getTime();
      E > N && (v === void 0 || E < v) && (v = E);
    }
    return v === void 0 ? void 0 : new Date(v).toISOString();
  }, R = async (g) => {
    d(g.id), h(null);
    try {
      await nr(g, f(g));
    } catch (N) {
      h(`${g.out_trade_no}: ${String((N == null ? void 0 : N.message) || N)}`);
    } finally {
      d((N) => N === g.id ? null : N);
    }
  }, I = () => {
    p(null), w(null);
  };
  return a ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ l("div", { style: Ht, children: S("加载中...") }) }) : r ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ y("div", { style: { ...Ht, color: t("danger") }, children: [
    S("加载失败: "),
    r
  ] }) }) : /* @__PURE__ */ y("div", { style: Ye, children: [
    u && /* @__PURE__ */ l("div", { style: Rr, onClick: I, children: /* @__PURE__ */ l("div", { style: Ir, onClick: (g) => g.stopPropagation(), children: u.status === "paid" ? /* @__PURE__ */ y(ce, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("success") }, children: S("支付成功") }),
      /* @__PURE__ */ y("p", { style: { margin: 0, color: t("text"), fontSize: 14 }, children: [
        S("订单"),
        " ",
        /* @__PURE__ */ l("code", { style: Je, children: u.out_trade_no }),
        " ",
        S("已支付"),
        " ",
        /* @__PURE__ */ l("strong", { children: D(u.amount) })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...Vt, marginTop: 16 }, onClick: I, children: S("关闭") })
    ] }) : u.status === "pending" ? /* @__PURE__ */ y(ce, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("text") }, children: S("扫码付款") }),
      x ? /* @__PURE__ */ l("img", { src: x, alt: S("付款二维码"), style: { width: 240, height: 240, borderRadius: 8 } }) : /* @__PURE__ */ l("div", { style: { width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary"), border: `1px solid ${t("glassBorder")}`, borderRadius: 8 }, children: S("生成二维码中...") }),
      /* @__PURE__ */ l("div", { style: { marginTop: 12, fontWeight: 600, fontSize: 20, color: t("text") }, children: D(u.amount) }),
      /* @__PURE__ */ y("div", { style: { color: t("textSecondary"), fontSize: 13, marginTop: 4 }, children: [
        S("请使用"),
        " ",
        Wt(u.method),
        " ",
        S("扫码完成付款")
      ] }),
      /* @__PURE__ */ y("div", { style: { marginTop: 6, color: t("textTertiary"), fontSize: 12 }, children: [
        S("订单号："),
        /* @__PURE__ */ l("code", { style: Je, children: u.out_trade_no })
      ] }),
      /* @__PURE__ */ l("p", { style: { color: t("textTertiary"), fontSize: 12, marginTop: 12, marginBottom: 0 }, children: S("支付完成后将自动刷新（每 3 秒检查一次）") }),
      u.payment_url && /* @__PURE__ */ y("p", { style: { fontSize: 12, marginTop: 6, marginBottom: 0 }, children: [
        S("扫码不便？"),
        " ",
        /* @__PURE__ */ l("a", { href: u.payment_url, target: "_blank", rel: "noreferrer", style: { color: t("primary"), textDecoration: "none" }, children: S("点此在新窗口打开付款页 →") })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...Pr, marginTop: 16 }, onClick: I, children: S("取消") })
    ] }) : /* @__PURE__ */ y(ce, { children: [
      /* @__PURE__ */ y("h3", { style: { margin: "0 0 12px", color: t("textSecondary") }, children: [
        S("订单已"),
        Ot(u.status)
      ] }),
      /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), fontSize: 14 }, children: S("该订单无法继续支付，请重新发起充值。") }),
      /* @__PURE__ */ l("button", { style: { ...Vt, marginTop: 16 }, onClick: I, children: S("关闭") })
    ] }) }) }),
    s && /* @__PURE__ */ y("div", { style: Mr, children: [
      S("导出失败: "),
      s
    ] }),
    /* @__PURE__ */ l("div", { style: Tr, children: e.length === 0 ? /* @__PURE__ */ l("p", { style: Er, children: S("暂无充值记录") }) : /* @__PURE__ */ l("div", { style: Br, children: /* @__PURE__ */ y("table", { style: _r, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("th", { style: Z, children: S("订单号") }),
        /* @__PURE__ */ l("th", { style: Z, children: S("金额") }),
        /* @__PURE__ */ l("th", { style: Z, children: S("支付方式") }),
        /* @__PURE__ */ l("th", { style: Z, children: S("状态") }),
        /* @__PURE__ */ l("th", { style: Z, children: S("创建时间") }),
        /* @__PURE__ */ l("th", { style: Z, children: S("支付时间") }),
        /* @__PURE__ */ l("th", { style: Z, children: S("操作") })
      ] }) }),
      /* @__PURE__ */ l("tbody", { children: e.map((g) => /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("td", { style: X, children: /* @__PURE__ */ l("code", { style: Je, children: g.out_trade_no }) }),
        /* @__PURE__ */ l("td", { style: { ...X, fontWeight: 600 }, children: D(g.amount) }),
        /* @__PURE__ */ l("td", { style: X, children: Wt(g.method) }),
        /* @__PURE__ */ l("td", { style: { ...X, color: Cr(g.status), fontWeight: 600 }, children: Ot(g.status) }),
        /* @__PURE__ */ l("td", { style: { ...X, color: t("textSecondary") }, children: jt(g.created_at) }),
        /* @__PURE__ */ l("td", { style: { ...X, color: t("textSecondary") }, children: g.paid_at ? jt(g.paid_at) : "-" }),
        /* @__PURE__ */ l("td", { style: X, children: g.status === "pending" && (g.qr_code_content || g.payment_url) ? /* @__PURE__ */ l("button", { style: zr, onClick: () => m(g), children: S("继续支付") }) : g.status === "paid" && g.paid_at ? (
          // 单槽位状态：任一导出进行中时全部按钮禁用，避免并发触发互相干扰
          /* @__PURE__ */ l(
            "button",
            {
              style: c !== null ? Ar : pn,
              disabled: c !== null,
              onClick: () => R(g),
              children: c === g.id ? S("导出中...") : S("导出明细")
            }
          )
        ) : null })
      ] }, g.id)) })
    ] }) }) })
  ] });
}
function Wt(e) {
  return { alipay: S("支付宝"), wxpay: S("微信支付") }[e] || e || "-";
}
function Ot(e) {
  return {
    pending: S("待支付"),
    paid: S("已支付"),
    expired: S("已过期"),
    failed: S("失败"),
    cancelled: S("已取消"),
    refunded: S("已退款")
  }[e] || e;
}
function Cr(e) {
  return {
    pending: t("warning"),
    paid: t("success"),
    expired: t("textTertiary"),
    failed: t("danger"),
    cancelled: t("textTertiary"),
    refunded: t("textTertiary")
  }[e] || "inherit";
}
function jt(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
const Ye = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Ht = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, Tr = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgElevated"),
  padding: "8px 0",
  overflow: "hidden"
}, Er = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, Br = {
  overflowX: "auto"
}, _r = {
  width: "100%",
  borderCollapse: "collapse"
}, Z = {
  textAlign: "left",
  padding: "10px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  background: t("bgSurface"),
  color: t("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, X = {
  padding: "12px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  fontSize: 13,
  color: t("text"),
  whiteSpace: "nowrap"
}, Je = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, Rr = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1e3
}, Ir = {
  background: t("bgElevated"),
  borderRadius: t("radiusLg"),
  padding: "32px",
  textAlign: "center",
  minWidth: 320,
  maxWidth: 400,
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
}, Vt = {
  padding: "8px 24px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: "#fff",
  fontSize: 14,
  cursor: "pointer"
}, Pr = {
  padding: "8px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("textSecondary"),
  fontSize: 14,
  cursor: "pointer"
}, Mr = {
  marginBottom: 12,
  padding: "10px 14px",
  borderRadius: t("radiusMd"),
  border: `1px solid ${t("glassBorder")}`,
  background: t("bgElevated"),
  color: t("danger"),
  fontSize: 13
}, pn = {
  padding: "4px 12px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("textSecondary"),
  fontSize: 12,
  cursor: "pointer",
  whiteSpace: "nowrap"
}, Ar = {
  ...pn,
  cursor: "default",
  color: t("textTertiary")
}, zr = {
  padding: "4px 12px",
  border: `1px solid ${t("primary")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("primary"),
  fontSize: 12,
  cursor: "pointer",
  whiteSpace: "nowrap"
}, Kt = {
  total: 0,
  paid: 0,
  pending: 0,
  expired: 0,
  failed: 0,
  cancelled: 0,
  refunded: 0,
  total_amount_paid: 0,
  today_amount_paid: 0
}, Lr = [10, 20, 50, 100], Nr = [
  { value: "all", label: "全部状态" },
  { value: "pending", label: "待支付" },
  { value: "paid", label: "已支付" },
  { value: "expired", label: "已过期" },
  { value: "failed", label: "失败" },
  { value: "cancelled", label: "已取消" },
  { value: "refunded", label: "已退款" }
];
function $r() {
  const [e, i] = L([]), [a, o] = L(0), [r, n] = L(Kt), [c, d] = L(!0), [s, h] = L(null), [u, p] = L("all"), [x, w] = L(""), [C, P] = L(1), [m, f] = L(20), R = ie(() => {
    d(!0), h(null), F.adminListOrders({ page: C, pageSize: m, email: x, status: u }).then((g) => {
      i(g.list || []), o(g.total || 0), n(g.stats || Kt);
    }).catch((g) => h(String((g == null ? void 0 : g.message) || g))).finally(() => d(!1));
  }, [C, m, x, u]);
  U(() => {
    const N = setTimeout(R, x ? 300 : 0);
    return () => clearTimeout(N);
  }, [R, x]), U(() => {
    P(1);
  }, [u, x, m]);
  const I = Math.max(1, Math.ceil(a / m));
  return /* @__PURE__ */ y("div", { style: jr, children: [
    /* @__PURE__ */ y("div", { style: Hr, children: [
      /* @__PURE__ */ l(oe, { label: "总订单数", value: r.total }),
      /* @__PURE__ */ l(oe, { label: "已支付", value: r.paid, accent: t("success") }),
      /* @__PURE__ */ l(oe, { label: "待支付", value: r.pending, accent: t("warning") }),
      /* @__PURE__ */ l(oe, { label: "已过期", value: r.expired }),
      /* @__PURE__ */ l(oe, { label: "累计收款", value: D(r.total_amount_paid), accent: t("success") }),
      /* @__PURE__ */ l(oe, { label: "今日收款", value: D(r.today_amount_paid), accent: t("success") })
    ] }),
    /* @__PURE__ */ y("div", { style: Yr, children: [
      /* @__PURE__ */ y("div", { style: Jr, children: [
        /* @__PURE__ */ l(
          yn,
          {
            value: u,
            onChange: p,
            options: Nr,
            style: Qr
          }
        ),
        /* @__PURE__ */ l(
          "input",
          {
            type: "text",
            value: x,
            onChange: (g) => w(g.target.value),
            placeholder: "搜索用户邮箱",
            style: { ...ao, width: 240 }
          }
        ),
        /* @__PURE__ */ l(qr, { onClick: R, loading: c })
      ] }),
      s ? /* @__PURE__ */ y("p", { style: { ...Qe, color: t("danger") }, children: [
        "加载失败: ",
        s
      ] }) : c && e.length === 0 ? /* @__PURE__ */ l("p", { style: Qe, children: "加载中..." }) : e.length === 0 ? /* @__PURE__ */ l("p", { style: Qe, children: "暂无订单" }) : /* @__PURE__ */ l("div", { style: lo, children: /* @__PURE__ */ y("table", { style: so, children: [
        /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ y("tr", { children: [
          /* @__PURE__ */ l("th", { style: G, children: "订单号" }),
          /* @__PURE__ */ l("th", { style: G, children: "用户邮箱" }),
          /* @__PURE__ */ l("th", { style: G, children: "金额" }),
          /* @__PURE__ */ l("th", { style: G, children: "支付方式" }),
          /* @__PURE__ */ l("th", { style: G, children: "服务商" }),
          /* @__PURE__ */ l("th", { style: G, children: "状态" }),
          /* @__PURE__ */ l("th", { style: G, children: "创建时间" }),
          /* @__PURE__ */ l("th", { style: G, children: "支付时间" })
        ] }) }),
        /* @__PURE__ */ l("tbody", { children: e.map((g) => /* @__PURE__ */ y("tr", { children: [
          /* @__PURE__ */ l("td", { style: Y, children: /* @__PURE__ */ l("code", { style: co, children: g.out_trade_no }) }),
          /* @__PURE__ */ l("td", { style: Y, children: g.user_email ? /* @__PURE__ */ l("span", { style: { color: t("text") }, children: g.user_email }) : /* @__PURE__ */ y("span", { style: { color: t("textTertiary") }, children: [
            "#",
            g.user_id
          ] }) }),
          /* @__PURE__ */ l("td", { style: { ...Y, fontWeight: 600 }, children: D(g.amount) }),
          /* @__PURE__ */ l("td", { style: Y, children: Dr(g.method) }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: g.provider_id || "-" }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: Ur(g.status), fontWeight: 600 }, children: Fr(g.status) }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: Gt(g.created_at) }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: g.paid_at ? Gt(g.paid_at) : "-" })
        ] }, g.id)) })
      ] }) }),
      /* @__PURE__ */ l(
        Wr,
        {
          page: C,
          pageSize: m,
          total: a,
          totalPages: I,
          onPageChange: P,
          onPageSizeChange: f
        }
      )
    ] })
  ] });
}
function oe({ label: e, value: i, accent: a }) {
  return /* @__PURE__ */ y("div", { style: Vr, children: [
    /* @__PURE__ */ l("div", { style: Kr, children: e }),
    /* @__PURE__ */ l("div", { style: { ...Gr, color: a || t("text") }, children: i })
  ] });
}
function Dr(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function Fr(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function Ur(e) {
  return {
    pending: t("warning"),
    paid: t("success"),
    expired: t("textTertiary"),
    failed: t("danger"),
    cancelled: t("textTertiary"),
    refunded: t("textTertiary")
  }[e] || "inherit";
}
function Gt(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
function qr({ onClick: e, loading: i }) {
  const [a, o] = L(!1);
  return /* @__PURE__ */ y(ce, { children: [
    /* @__PURE__ */ l("style", { children: "@keyframes ag-epay-spin { to { transform: rotate(360deg); } }" }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "刷新",
        onClick: e,
        disabled: i,
        onMouseEnter: () => o(!0),
        onMouseLeave: () => o(!1),
        style: {
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          border: `1px solid ${t("glassBorder")}`,
          borderRadius: 10,
          background: a ? t("bgHover") : "transparent",
          color: t(a ? "textSecondary" : "textTertiary"),
          cursor: i ? "not-allowed" : "pointer",
          opacity: i ? 0.6 : 1,
          transition: t("transition"),
          padding: 0
        },
        children: /* @__PURE__ */ y(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: {
              animation: i ? "ag-epay-spin 1s linear infinite" : void 0
            },
            children: [
              /* @__PURE__ */ l("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
              /* @__PURE__ */ l("path", { d: "M21 3v5h-5" }),
              /* @__PURE__ */ l("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
              /* @__PURE__ */ l("path", { d: "M8 16H3v5" })
            ]
          }
        )
      }
    )
  ] });
}
function yn({
  value: e,
  options: i,
  onChange: a,
  style: o
}) {
  const [r, n] = L(!1), c = de(null), d = i.find((s) => s.value === e);
  return U(() => {
    if (!r) return;
    const s = (h) => {
      c.current && !c.current.contains(h.target) && n(!1);
    };
    return document.addEventListener("mousedown", s), () => document.removeEventListener("mousedown", s);
  }, [r]), /* @__PURE__ */ y("div", { ref: c, style: Zr, children: [
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        style: { ...o, ...Xr, ...r ? eo : null },
        "aria-haspopup": "listbox",
        "aria-expanded": r,
        onClick: () => n((s) => !s),
        children: [
          /* @__PURE__ */ l("span", { style: to, children: (d == null ? void 0 : d.label) ?? "" }),
          /* @__PURE__ */ l("span", { "aria-hidden": "true", style: no, children: "v" })
        ]
      }
    ),
    r && /* @__PURE__ */ l("div", { role: "listbox", style: ro, children: i.map((s) => {
      const h = s.value === e;
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": h,
          style: { ...oo, ...h ? io : null },
          onClick: () => {
            a(s.value), n(!1);
          },
          children: s.label
        },
        s.value
      );
    }) })
  ] });
}
function Wr({ page: e, pageSize: i, total: a, totalPages: o, onPageChange: r, onPageSizeChange: n }) {
  const c = Or(e, o);
  return /* @__PURE__ */ y("div", { style: uo, children: [
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ y("span", { style: go, children: [
        "共 ",
        a,
        " 条 · 第 ",
        e,
        "/",
        o,
        " 页"
      ] }),
      /* @__PURE__ */ l(
        yn,
        {
          value: String(i),
          onChange: (d) => n(Number(d)),
          options: Lr.map((d) => ({ value: String(d), label: `${d} 条/页` })),
          style: ho
        }
      )
    ] }),
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-label": "上一页",
          style: Yt(e <= 1),
          disabled: e <= 1,
          onClick: () => r(e - 1),
          children: "‹"
        }
      ),
      c.map(
        (d, s) => d === "..." ? /* @__PURE__ */ l("span", { style: po, children: "···" }, `e-${s}`) : /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            style: d === e ? fo : mn,
            onClick: () => r(d),
            children: d
          },
          d
        )
      ),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-label": "下一页",
          style: Yt(e >= o),
          disabled: e >= o,
          onClick: () => r(e + 1),
          children: "›"
        }
      )
    ] })
  ] });
}
function Or(e, i) {
  if (i <= 7) return Array.from({ length: i }, (o, r) => r + 1);
  const a = [1];
  e > 3 && a.push("...");
  for (let o = Math.max(2, e - 1); o <= Math.min(i - 1, e + 1); o++)
    a.push(o);
  return e < i - 2 && a.push("..."), a.push(i), a;
}
const jr = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Hr = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 12,
  marginBottom: 20
}, Vr = {
  padding: "18px 20px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface")
}, Kr = {
  fontSize: 12,
  color: t("textSecondary"),
  fontWeight: 500,
  letterSpacing: "0.02em"
}, Gr = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 8,
  letterSpacing: "-0.02em"
}, Yr = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 20px 8px"
}, Jr = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap"
}, Qr = {
  padding: "8px 12px",
  minWidth: 140,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13
}, Zr = {
  position: "relative",
  display: "inline-block"
}, Xr = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  fontFamily: "inherit",
  cursor: "pointer",
  outline: "none"
}, eo = {
  borderColor: t("primary"),
  boxShadow: `0 0 0 3px ${t("primarySubtle")}`
}, to = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, no = {
  flexShrink: 0,
  color: t("textTertiary"),
  fontSize: 10,
  lineHeight: 1
}, ro = {
  position: "absolute",
  left: 0,
  top: "calc(100% + 6px)",
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  minWidth: "100%",
  width: "max-content",
  maxHeight: 260,
  padding: 6,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgSurface"),
  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.28)",
  overflowY: "auto"
}, oo = {
  display: "block",
  width: "100%",
  padding: "8px 10px",
  border: "none",
  borderRadius: 8,
  background: "transparent",
  color: t("textSecondary"),
  fontFamily: "inherit",
  fontSize: 13,
  lineHeight: 1.35,
  textAlign: "left",
  whiteSpace: "nowrap",
  cursor: "pointer"
}, io = {
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, ao = {
  padding: "8px 12px",
  width: 200,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  outline: "none"
}, Qe = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, lo = {
  overflowX: "auto",
  margin: "0 -20px"
}, so = {
  width: "100%",
  borderCollapse: "collapse"
}, G = {
  textAlign: "left",
  padding: "10px 16px",
  borderTop: `1px solid ${t("glassBorder")}`,
  borderBottom: `1px solid ${t("glassBorder")}`,
  background: t("bgSurface"),
  color: t("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, Y = {
  padding: "12px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  fontSize: 13,
  color: t("text"),
  whiteSpace: "nowrap"
}, co = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, uo = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 4px 6px",
  flexWrap: "wrap",
  gap: 12
}, go = {
  fontSize: 12,
  color: t("textTertiary"),
  fontFamily: t("fontMono")
}, ho = {
  fontSize: 12,
  color: t("textSecondary"),
  background: "transparent",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: 6,
  padding: "2px 8px",
  cursor: "pointer",
  outline: "none"
}, mn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: 6,
  border: "none",
  background: "transparent",
  color: t("textSecondary"),
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, fo = {
  ...mn,
  background: t("primary"),
  color: t("textInverse"),
  fontWeight: 600
};
function Yt(e) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: t("textSecondary"),
    fontSize: 18,
    lineHeight: 1,
    cursor: e ? "not-allowed" : "pointer",
    opacity: e ? 0.3 : 1,
    transition: t("transition")
  };
}
const po = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  color: t("textTertiary"),
  fontSize: 12
};
let yo = 0;
function bn() {
  const [e, i] = L([]), a = de(i);
  a.current = i;
  const o = ie((d) => {
    a.current((s) => s.filter((h) => h.id !== d));
  }, []), r = ie((d, s) => {
    const h = yo++;
    a.current((u) => [...u, { id: h, type: d, text: s }]), setTimeout(() => o(h), 4e3);
  }, [o]), n = ie((d) => r("success", d), [r]), c = ie((d) => r("error", d), [r]);
  return {
    toast: { success: n, error: c },
    Toaster: /* @__PURE__ */ l(mo, { messages: e, onClose: o })
  };
}
function mo({
  messages: e,
  onClose: i
}) {
  return U(() => {
    const a = "airgate-epay-toast-keyframes";
    if (document.getElementById(a)) return;
    const o = document.createElement("style");
    o.id = a, o.textContent = `
@keyframes airgate-epay-toast-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}`, document.head.appendChild(o);
  }, []), e.length === 0 ? null : /* @__PURE__ */ l("div", { style: So, children: e.map((a) => /* @__PURE__ */ l(bo, { message: a, onClose: () => i(a.id) }, a.id)) });
}
function bo({
  message: e,
  onClose: i
}) {
  const a = e.type === "success", o = t(a ? "success" : "danger"), r = t(a ? "success" : "danger");
  return /* @__PURE__ */ y(
    "div",
    {
      style: {
        ...xo,
        borderColor: r
      },
      children: [
        /* @__PURE__ */ l("span", { style: { ...wo, color: o }, children: a ? "✓" : "✕" }),
        /* @__PURE__ */ l("span", { style: { ...vo, color: t("text") }, children: e.text }),
        /* @__PURE__ */ l("button", { onClick: i, style: ko, "aria-label": S("关闭"), children: "×" })
      ]
    }
  );
}
const So = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 1e4,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none"
}, xo = {
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 260,
  maxWidth: 400,
  padding: "12px 14px",
  borderRadius: t("radiusLg"),
  border: "1px solid",
  background: t("bgElevated"),
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  animation: "airgate-epay-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
}, wo = {
  fontSize: 16,
  fontWeight: 700,
  width: 18,
  textAlign: "center",
  flexShrink: 0
}, vo = {
  flex: 1,
  fontSize: 13,
  lineHeight: 1.4
}, ko = {
  flexShrink: 0,
  background: "transparent",
  border: "none",
  color: t("textTertiary"),
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  padding: 0,
  width: 18,
  height: 18
};
function Sn(e, i) {
  var o;
  const a = window;
  return (o = a.airgate) != null && o.confirm ? a.airgate.confirm(e, i) : Promise.resolve(window.confirm(e));
}
function Co() {
  const [e, i] = L([]), [a, o] = L([]), [r, n] = L(!0), [c, d] = L(null), [s, h] = L(null), { toast: u, Toaster: p } = bn(), x = ie(() => {
    n(!0), d(null), F.adminListProviders().then((f) => {
      i(f.providers || []), o(f.kinds || []);
    }).catch((f) => d(String((f == null ? void 0 : f.message) || f))).finally(() => n(!1));
  }, []);
  U(x, [x]);
  const w = (f) => {
    h({
      mode: "create",
      id: "",
      kind: f.kind,
      enabled: !0,
      config: Bo(f)
    });
  }, C = (f) => {
    h({
      mode: "edit",
      id: f.id,
      originalId: f.id,
      kind: f.kind,
      enabled: f.enabled,
      config: { ...f.config }
    });
  }, P = async (f) => {
    if (await Sn(`确认删除服务商 ${f}？此操作无法撤销。`, { title: "删除服务商", danger: !0 }))
      try {
        await F.adminDeleteProvider(f), u.success(`已删除 ${f}`), x();
      } catch (R) {
        u.error("删除失败: " + R.message);
      }
  }, m = async (f) => {
    try {
      await F.adminUpsertProvider({
        id: f.id,
        kind: f.kind,
        enabled: !f.enabled,
        config: f.config
      }), u.success(`${f.id} 已${f.enabled ? "禁用" : "启用"}`), x();
    } catch (R) {
      u.error("操作失败: " + R.message);
    }
  };
  return r ? /* @__PURE__ */ l("div", { style: Xe, children: /* @__PURE__ */ l("div", { style: Jt, children: "加载中..." }) }) : c ? /* @__PURE__ */ l("div", { style: Xe, children: /* @__PURE__ */ y("div", { style: { ...Jt, color: t("danger") }, children: [
    "加载失败: ",
    c
  ] }) }) : /* @__PURE__ */ y("div", { style: Xe, children: [
    p,
    /* @__PURE__ */ y("div", { style: Zt, children: [
      /* @__PURE__ */ l("h3", { style: Qt, children: "添加服务商" }),
      /* @__PURE__ */ l("p", { style: _o, children: "每种类型的服务商可以创建多个实例（例如 xunhu_main / xunhu_backup），便于多商户号或主备切换。" }),
      /* @__PURE__ */ l("div", { style: Ro, children: a.map((f) => /* @__PURE__ */ y("div", { style: Io, children: [
        /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: f.name }),
        /* @__PURE__ */ l("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 6 }, children: f.description }),
        /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 8 }, children: [
          "支持: ",
          f.supported_methods.map(nt).join(" / ")
        ] }),
        /* @__PURE__ */ l("button", { style: { ...wn, marginTop: 12, width: "100%" }, onClick: () => w(f), children: "+ 添加" })
      ] }, f.kind)) })
    ] }),
    /* @__PURE__ */ y("div", { style: Zt, children: [
      /* @__PURE__ */ l("h3", { style: Qt, children: "已配置的服务商实例" }),
      e.length === 0 ? /* @__PURE__ */ l("p", { style: Ao, children: "暂未配置任何服务商。请在上方点「+ 添加」选择类型。" }) : /* @__PURE__ */ l("div", { style: Po, children: e.map((f) => /* @__PURE__ */ y("div", { style: Mo, children: [
        /* @__PURE__ */ y("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ y("div", { children: [
            /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: f.name || f.id }),
            /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 4, fontFamily: t("fontMono") }, children: [
              f.id,
              " · ",
              f.kind
            ] })
          ] }),
          /* @__PURE__ */ l("span", { style: f.is_running ? xn : zo, children: f.is_running ? "运行中" : f.enabled ? "已启用未就绪" : "已禁用" })
        ] }),
        /* @__PURE__ */ y("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 12 }, children: [
          "支持: ",
          f.supported_methods.map(nt).join(" / ")
        ] }),
        /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8, marginTop: 16 }, children: [
          /* @__PURE__ */ l("button", { style: be, onClick: () => C(f), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: be, onClick: () => m(f), children: f.enabled ? "禁用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...be, color: t("danger") }, onClick: () => P(f.id), children: "删除" })
        ] })
      ] }, f.id)) })
    ] }),
    s && /* @__PURE__ */ l(
      To,
      {
        editing: s,
        kinds: a,
        onCancel: () => h(null),
        onSaved: (f) => {
          h(null), u.success(f), x();
        },
        onError: (f) => u.error(f)
      }
    )
  ] });
}
function To({
  editing: e,
  kinds: i,
  onCancel: a,
  onSaved: o,
  onError: r
}) {
  const [n, c] = L(e), [d, s] = L(!1), h = Cn(() => i.find((p) => p.kind === n.kind), [i, n.kind]), u = async () => {
    if (!h) {
      r("未知的服务商类型");
      return;
    }
    for (const p of h.field_descriptors)
      if (p.required && !n.config[p.key]) {
        r(`「${p.label}」必填`);
        return;
      }
    if (!(n.mode === "edit" && n.originalId && n.id.trim() !== n.originalId && !await Sn(
      `确认将实例 ID 从「${n.originalId}」重命名为「${n.id.trim()}」？

所有历史订单的 provider_id 引用会在事务里同步更新；如果该商户号在第三方支付平台已经下过单，
已发出去的回调地址（含原 ID）会失效——平台未来回调请求会路由不到本服务。`,
      { title: "重命名服务商 ID", danger: !0 }
    ))) {
      s(!0);
      try {
        const x = (await F.adminUpsertProvider({
          id: n.id.trim(),
          original_id: n.originalId,
          kind: n.kind,
          enabled: n.enabled,
          config: n.config
        })).id || n.id.trim();
        o(n.mode === "create" ? `已创建 ${x}` : `已更新 ${x}`);
      } catch (p) {
        r("保存失败: " + p.message);
      } finally {
        s(!1);
      }
    }
  };
  return /* @__PURE__ */ l("div", { style: $o, onClick: a, children: /* @__PURE__ */ y("div", { style: Do, onClick: (p) => p.stopPropagation(), children: [
    /* @__PURE__ */ y("div", { style: Fo, children: [
      /* @__PURE__ */ y("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600 }, children: [
        n.mode === "create" ? "添加" : "编辑",
        "服务商 - ",
        (h == null ? void 0 : h.name) || n.kind
      ] }),
      /* @__PURE__ */ l("button", { style: Uo, onClick: a, children: "×" })
    ] }),
    /* @__PURE__ */ y("div", { style: qo, children: [
      /* @__PURE__ */ l(
        Ze,
        {
          label: "实例 ID",
          description: n.mode === "edit" ? "可修改。改名时后端会在事务里同步更新所有历史订单的 provider_id 引用，回调路径也会立即指向新名字。" : "可选。留空则自动生成 epay_xunhu_1 之类的序号；也可以填一个有意义的名字如 xunhu_main / xunhu_backup 便于多商户号区分。",
          children: /* @__PURE__ */ l(
            "input",
            {
              type: "text",
              value: n.id,
              onChange: (p) => c({ ...n, id: p.target.value }),
              placeholder: n.mode === "create" ? "留空自动生成" : "",
              style: { ...et, fontFamily: t("fontMono"), fontSize: 12 }
            }
          )
        }
      ),
      /* @__PURE__ */ l(Ze, { label: "启用", children: /* @__PURE__ */ y("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: [
        /* @__PURE__ */ l(
          "input",
          {
            type: "checkbox",
            checked: n.enabled,
            onChange: (p) => c({ ...n, enabled: p.target.checked })
          }
        ),
        /* @__PURE__ */ l("span", { style: { fontSize: 13, color: t("textSecondary") }, children: "勾选后该服务商参与支付路由" })
      ] }) }),
      h == null ? void 0 : h.field_descriptors.map((p) => /* @__PURE__ */ l(Ze, { label: p.label, description: p.description, required: p.required, children: p.type === "textarea" ? /* @__PURE__ */ l(
        "textarea",
        {
          value: n.config[p.key] || "",
          onChange: (x) => c({ ...n, config: { ...n.config, [p.key]: x.target.value } }),
          placeholder: p.placeholder,
          style: { ...et, minHeight: 120, fontFamily: t("fontMono"), fontSize: 12 }
        }
      ) : p.type === "bool" ? /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: /* @__PURE__ */ l(
        "input",
        {
          type: "checkbox",
          checked: n.config[p.key] === "true",
          onChange: (x) => c({ ...n, config: { ...n.config, [p.key]: x.target.checked ? "true" : "false" } })
        }
      ) }) : p.type === "method-multi" ? /* @__PURE__ */ l(
        Eo,
        {
          candidates: h.supported_methods,
          value: n.config[p.key] || "",
          onChange: (x) => c({ ...n, config: { ...n.config, [p.key]: x } })
        }
      ) : /* @__PURE__ */ l(
        "input",
        {
          type: p.type === "password" ? "password" : p.type === "number" ? "number" : "text",
          value: n.config[p.key] || "",
          onChange: (x) => c({ ...n, config: { ...n.config, [p.key]: x.target.value } }),
          placeholder: p.placeholder,
          style: et
        }
      ) }, p.key))
    ] }),
    /* @__PURE__ */ y("div", { style: Wo, children: [
      /* @__PURE__ */ l("button", { style: be, onClick: a, disabled: d, children: "取消" }),
      /* @__PURE__ */ l("button", { style: wn, onClick: u, disabled: d, children: d ? "保存中..." : "保存" })
    ] })
  ] }) });
}
function Eo({
  candidates: e,
  value: i,
  onChange: a
}) {
  const o = new Set(i.split(",").map((n) => n.trim()).filter(Boolean)), r = (n) => {
    o.has(n) ? o.delete(n) : o.add(n);
    const c = e.filter((d) => o.has(d)).join(",");
    a(c);
  };
  return /* @__PURE__ */ y("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: [
    e.map((n) => {
      const c = o.has(n);
      return /* @__PURE__ */ y(
        "label",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            border: `1px solid ${t(c ? "primary" : "glassBorder")}`,
            borderRadius: t("radiusMd"),
            background: t(c ? "primarySubtle" : "bg"),
            color: t(c ? "primary" : "text"),
            cursor: "pointer",
            fontSize: 13,
            fontWeight: c ? 600 : 400,
            transition: "all 0.15s"
          },
          children: [
            /* @__PURE__ */ l(
              "input",
              {
                type: "checkbox",
                checked: c,
                onChange: () => r(n),
                style: { margin: 0 }
              }
            ),
            nt(n)
          ]
        },
        n
      );
    }),
    e.length === 0 && /* @__PURE__ */ l("span", { style: { fontSize: 12, color: t("textTertiary") }, children: "该协议没有可选的支付方式" })
  ] });
}
function Ze({
  label: e,
  description: i,
  required: a,
  children: o
}) {
  return /* @__PURE__ */ y("div", { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ y("label", { style: Lo, children: [
      e,
      a && /* @__PURE__ */ l("span", { style: { color: t("danger"), marginLeft: 4 }, children: "*" })
    ] }),
    o,
    i && /* @__PURE__ */ l("div", { style: No, children: i })
  ] });
}
function nt(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e;
}
function Bo(e) {
  const i = {};
  for (const a of e.field_descriptors)
    a.type === "bool" ? i[a.key] = "false" : i[a.key] = "";
  return i;
}
const Xe = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Jt = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, _o = {
  margin: "4px 0 16px",
  fontSize: 13,
  color: t("textSecondary")
}, Qt = {
  margin: "0 0 12px",
  fontSize: 14,
  fontWeight: 600,
  color: t("text"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, Zt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: 20,
  marginBottom: 20
}, Ro = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12
}, Io = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, Po = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 12
}, Mo = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, Ao = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "24px 0",
  fontSize: 14
}, xn = {
  padding: "2px 8px",
  borderRadius: 4,
  background: t("successSubtle"),
  color: t("success"),
  fontSize: 11,
  fontWeight: 600
}, zo = {
  ...xn,
  background: t("warningSubtle"),
  color: t("warning")
}, be = {
  padding: "6px 14px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("text"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500
}, wn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600
}, et = {
  width: "100%",
  padding: "8px 12px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  boxSizing: "border-box"
}, Lo = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: t("textSecondary"),
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.03em"
}, No = {
  marginTop: 6,
  fontSize: 11,
  color: t("textTertiary")
}, $o = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1e3
}, Do = {
  width: 600,
  maxWidth: "92vw",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  background: t("bgSurface"),
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  overflow: "hidden"
}, Fo = {
  padding: "16px 20px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}, Uo = {
  background: "transparent",
  border: "none",
  color: t("textSecondary"),
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1
}, qo = {
  padding: 20,
  overflowY: "auto",
  flex: 1
}, Wo = {
  padding: "12px 20px",
  borderTop: `1px solid ${t("glassBorder")}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8
};
function Oo() {
  const { toast: e, Toaster: i } = bn(), [a, o] = L([]), [r, n] = L(!0), [c, d] = L(!1), [s, h] = L(null), u = () => {
    n(!0), F.adminListPackages().then((m) => o(m.list || [])).catch((m) => e.error(`加载套餐失败: ${String(m.message || m)}`)).finally(() => n(!1));
  };
  U(u, []);
  const p = () => h({ id: 0, amount: "100", bonus: "15", title: "", sort: String(a.length * 10), enabled: !0 }), x = (m) => h({
    id: m.id,
    amount: String(m.amount),
    bonus: String(m.bonus_amount),
    title: m.title,
    sort: String(m.sort_order),
    enabled: m.enabled
  }), w = async () => {
    if (!s) return;
    const m = Number(s.amount), f = Number(s.bonus);
    if (!m || m <= 0) {
      e.error("套餐金额必须大于 0");
      return;
    }
    if (f < 0 || Number.isNaN(f)) {
      e.error("赠送额度不能为负数");
      return;
    }
    d(!0);
    try {
      await F.adminUpsertPackage({
        id: s.id,
        amount: m,
        bonus_amount: f,
        title: s.title.trim(),
        enabled: s.enabled,
        sort_order: Number(s.sort) || 0
      }), e.success(s.id ? "套餐已更新" : "套餐已创建"), h(null), u();
    } catch (R) {
      e.error(String(R.message || R));
    } finally {
      d(!1);
    }
  }, C = async (m) => {
    try {
      await F.adminUpsertPackage({
        id: m.id,
        amount: m.amount,
        bonus_amount: m.bonus_amount,
        title: m.title,
        enabled: !m.enabled,
        sort_order: m.sort_order
      }), e.success(m.enabled ? "套餐已停用" : "套餐已启用"), u();
    } catch (f) {
      e.error(String(f.message || f));
    }
  }, P = async (m) => {
    if (window.confirm(`确认删除套餐「充 ${m.amount} 送 ${m.bonus_amount}」？历史订单的赠送不受影响。`))
      try {
        await F.adminDeletePackage(m.id), e.success("套餐已删除"), u();
      } catch (f) {
        e.error(String(f.message || f));
      }
  };
  return /* @__PURE__ */ y("div", { style: jo, children: [
    i,
    /* @__PURE__ */ y("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, children: [
      /* @__PURE__ */ y("div", { children: [
        /* @__PURE__ */ l("h2", { style: Ho, children: "充值套餐" }),
        /* @__PURE__ */ l("p", { style: { margin: "4px 0 0", color: t("textSecondary"), fontSize: 13 }, children: "用户点选套餐档才享赠送；自定义金额充值不参与。赠送在支付成功后以独立流水入账。" })
      ] }),
      /* @__PURE__ */ l("button", { style: en, onClick: p, children: "新增套餐" })
    ] }),
    s && /* @__PURE__ */ y("div", { style: { ...Xt, marginBottom: 20 }, children: [
      /* @__PURE__ */ l("h3", { style: Vo, children: s.id ? `编辑套餐 #${s.id}` : "新增套餐" }),
      /* @__PURE__ */ y("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }, children: [
        /* @__PURE__ */ y("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "充值金额（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 1, value: s.amount, onChange: (m) => h({ ...s, amount: m.target.value }), style: me })
        ] }),
        /* @__PURE__ */ y("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "赠送额度（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 0, value: s.bonus, onChange: (m) => h({ ...s, bonus: m.target.value }), style: me })
        ] }),
        /* @__PURE__ */ y("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "标题（可选，按钮悬浮提示）" }),
          /* @__PURE__ */ l("input", { type: "text", maxLength: 64, value: s.title, placeholder: "如：限时特惠", onChange: (m) => h({ ...s, title: m.target.value }), style: { ...me, width: 200 } })
        ] }),
        /* @__PURE__ */ y("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "排序（小在前）" }),
          /* @__PURE__ */ l("input", { type: "number", value: s.sort, onChange: (m) => h({ ...s, sort: m.target.value }), style: { ...me, width: 90 } })
        ] }),
        /* @__PURE__ */ y("label", { style: { ...le, flexDirection: "row", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ l("input", { type: "checkbox", checked: s.enabled, onChange: (m) => h({ ...s, enabled: m.target.checked }) }),
          /* @__PURE__ */ l("span", { style: se, children: "启用" })
        ] }),
        /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: { ...en, opacity: c ? 0.6 : 1 }, disabled: c, onClick: w, children: c ? "保存中..." : "保存" }),
          /* @__PURE__ */ l("button", { style: Ko, onClick: () => h(null), children: "取消" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ l("div", { style: Xt, children: r ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "加载中..." }) : a.length === 0 ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "暂无套餐。点击右上角「新增套餐」创建第一个优惠档（用户端在配置前显示默认金额档）。" }) : /* @__PURE__ */ y("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: ["ID", "充值金额", "赠送", "用户实得", "标题", "排序", "状态", "操作"].map((m) => /* @__PURE__ */ l("th", { style: Go, children: m }, m)) }) }),
      /* @__PURE__ */ l("tbody", { children: a.map((m) => /* @__PURE__ */ y("tr", { children: [
        /* @__PURE__ */ l("td", { style: J, children: m.id }),
        /* @__PURE__ */ l("td", { style: { ...J, fontWeight: 600 }, children: D(m.amount) }),
        /* @__PURE__ */ l("td", { style: { ...J, color: m.bonus_amount > 0 ? t("success") : t("textTertiary") }, children: m.bonus_amount > 0 ? `+${D(m.bonus_amount)}` : "—" }),
        /* @__PURE__ */ l("td", { style: J, children: D(m.amount + m.bonus_amount) }),
        /* @__PURE__ */ l("td", { style: { ...J, color: t("textSecondary") }, children: m.title || "—" }),
        /* @__PURE__ */ l("td", { style: J, children: m.sort_order }),
        /* @__PURE__ */ l("td", { style: J, children: /* @__PURE__ */ l("span", { style: m.enabled ? Yo : Jo, children: m.enabled ? "启用中" : "已停用" }) }),
        /* @__PURE__ */ l("td", { style: J, children: /* @__PURE__ */ y("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: tt, onClick: () => x(m), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: tt, onClick: () => C(m), children: m.enabled ? "停用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...tt, color: t("danger") }, onClick: () => P(m), children: "删除" })
        ] }) })
      ] }, m.id)) })
    ] }) })
  ] });
}
const jo = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Ho = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "-0.01em"
}, Xt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 24px"
}, Vo = {
  margin: "0 0 16px",
  fontSize: 13,
  fontWeight: 600,
  color: t("textSecondary"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, le = {
  display: "flex",
  flexDirection: "column",
  gap: 6
}, se = {
  fontSize: 12,
  color: t("textSecondary")
}, me = {
  padding: "8px 12px",
  width: 130,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 14,
  outline: "none"
}, en = {
  padding: "10px 20px",
  border: "none",
  borderRadius: t("radiusMd"),
  background: t("primary"),
  color: t("textInverse"),
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  transition: t("transition")
}, Ko = {
  padding: "10px 20px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, tt = {
  padding: 0,
  border: "none",
  background: "none",
  color: t("primary"),
  fontSize: 13,
  cursor: "pointer"
}, Go = {
  textAlign: "left",
  padding: "8px 10px",
  color: t("textTertiary"),
  fontWeight: 500,
  fontSize: 12,
  borderBottom: `1px solid ${t("glassBorder")}`
}, J = {
  padding: "10px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  verticalAlign: "middle"
}, Yo = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("primarySubtle"),
  color: t("primary")
}, Jo = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("bgElevated"),
  color: t("textTertiary")
}, Xo = {
  routes: [
    { path: "/recharge", component: dr },
    { path: "/orders", component: kr },
    { path: "/admin/orders", component: $r },
    { path: "/admin/providers", component: Co },
    { path: "/admin/packages", component: Oo }
  ]
};
export {
  Xo as default
};
