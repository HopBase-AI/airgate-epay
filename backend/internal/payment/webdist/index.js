import { jsx as l, jsxs as p, Fragment as ce } from "react/jsx-runtime";
import { useState as L, useRef as de, useEffect as U, useCallback as ie, useMemo as kn } from "react";
function Cn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var re = {}, Ce, st;
function Tn() {
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
var Be = {}, dt;
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
  })(Be)), Be;
}
var Ee, ut;
function Bn() {
  if (ut) return Ee;
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
  }, Ee = e, Ee;
}
var Re, gt;
function En() {
  if (gt) return Re;
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
  }, Re = e, Re;
}
var _e = {}, ht;
function Rn() {
  return ht || (ht = 1, (function(e) {
    const i = ee().getSymbolSize;
    e.getRowColCoords = function(o) {
      if (o === 1) return [];
      const r = Math.floor(o / 7) + 2, n = i(o), s = n === 145 ? 26 : Math.ceil((n - 13) / (2 * r - 2)) * 2, d = [n - 7];
      for (let c = 1; c < r - 1; c++)
        d[c] = d[c - 1] - s;
      return d.push(6), d.reverse();
    }, e.getPositions = function(o) {
      const r = [], n = e.getRowColCoords(o), s = n.length;
      for (let d = 0; d < s; d++)
        for (let c = 0; c < s; c++)
          d === 0 && c === 0 || // top-left
          d === 0 && c === s - 1 || // bottom-left
          d === s - 1 && c === 0 || r.push([n[d], n[c]]);
      return r;
    };
  })(_e)), _e;
}
var Ie = {}, ft;
function _n() {
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
function In() {
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
      let s = 0, d = 0, c = 0, u = null, h = null;
      for (let f = 0; f < n; f++) {
        d = c = 0, u = h = null;
        for (let b = 0; b < n; b++) {
          let v = r.get(f, b);
          v === u ? d++ : (d >= 5 && (s += i.N1 + (d - 5)), u = v, d = 1), v = r.get(b, f), v === h ? c++ : (c >= 5 && (s += i.N1 + (c - 5)), h = v, c = 1);
        }
        d >= 5 && (s += i.N1 + (d - 5)), c >= 5 && (s += i.N1 + (c - 5));
      }
      return s;
    }, e.getPenaltyN2 = function(r) {
      const n = r.size;
      let s = 0;
      for (let d = 0; d < n - 1; d++)
        for (let c = 0; c < n - 1; c++) {
          const u = r.get(d, c) + r.get(d, c + 1) + r.get(d + 1, c) + r.get(d + 1, c + 1);
          (u === 4 || u === 0) && s++;
        }
      return s * i.N2;
    }, e.getPenaltyN3 = function(r) {
      const n = r.size;
      let s = 0, d = 0, c = 0;
      for (let u = 0; u < n; u++) {
        d = c = 0;
        for (let h = 0; h < n; h++)
          d = d << 1 & 2047 | r.get(u, h), h >= 10 && (d === 1488 || d === 93) && s++, c = c << 1 & 2047 | r.get(h, u), h >= 10 && (c === 1488 || c === 93) && s++;
      }
      return s * i.N3;
    }, e.getPenaltyN4 = function(r) {
      let n = 0;
      const s = r.data.length;
      for (let c = 0; c < s; c++) n += r.data[c];
      return Math.abs(Math.ceil(n * 100 / s / 5) - 10) * i.N4;
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
      const s = n.size;
      for (let d = 0; d < s; d++)
        for (let c = 0; c < s; c++)
          n.isReserved(c, d) || n.xor(c, d, a(r, c, d));
    }, e.getBestMask = function(r, n) {
      const s = Object.keys(e.Patterns).length;
      let d = 0, c = 1 / 0;
      for (let u = 0; u < s; u++) {
        n(u), e.applyMask(u, r);
        const h = e.getPenaltyN1(r) + e.getPenaltyN2(r) + e.getPenaltyN3(r) + e.getPenaltyN4(r);
        e.applyMask(u, r), h < c && (c = h, d = u);
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
function Pn() {
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
function Mn() {
  return bt || (bt = 1, (function(e) {
    const i = Pn();
    e.mul = function(o, r) {
      const n = new Uint8Array(o.length + r.length - 1);
      for (let s = 0; s < o.length; s++)
        for (let d = 0; d < r.length; d++)
          n[s + d] ^= i.mul(o[s], r[d]);
      return n;
    }, e.mod = function(o, r) {
      let n = new Uint8Array(o);
      for (; n.length - r.length >= 0; ) {
        const s = n[0];
        for (let c = 0; c < r.length; c++)
          n[c] ^= i.mul(r[c], s);
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
function An() {
  if (St) return Ae;
  St = 1;
  const e = Mn();
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
    const n = e.mod(r, this.genPoly), s = this.degree - n.length;
    if (s > 0) {
      const d = new Uint8Array(this.degree);
      return d.set(n, s), d;
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
  const r = new RegExp("^" + a + "$"), n = new RegExp("^" + e + "$"), s = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return j.testKanji = function(c) {
    return r.test(c);
  }, j.testNumeric = function(c) {
    return n.test(c);
  }, j.testAlphanumeric = function(c) {
    return s.test(c);
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
    }, e.getCharCountIndicator = function(n, s) {
      if (!n.ccBits) throw new Error("Invalid mode: " + n);
      if (!i.isValid(s))
        throw new Error("Invalid version: " + s);
      return s >= 1 && s < 10 ? n.ccBits[0] : s < 27 ? n.ccBits[1] : n.ccBits[2];
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
    e.from = function(n, s) {
      if (e.isValid(n))
        return n;
      try {
        return o(n);
      } catch {
        return s;
      }
    };
  })(Le)), Le;
}
var kt;
function zn() {
  return kt || (kt = 1, (function(e) {
    const i = ee(), a = tn(), o = rt(), r = te(), n = nn(), s = 7973, d = i.getBCHDigit(s);
    function c(b, v, S) {
      for (let _ = 1; _ <= 40; _++)
        if (v <= e.getCapacity(_, S, b))
          return _;
    }
    function u(b, v) {
      return r.getCharCountIndicator(b, v) + 4;
    }
    function h(b, v) {
      let S = 0;
      return b.forEach(function(_) {
        const y = u(_.mode, v);
        S += y + _.getBitsLength();
      }), S;
    }
    function f(b, v) {
      for (let S = 1; S <= 40; S++)
        if (h(b, S) <= e.getCapacity(S, v, r.MIXED))
          return S;
    }
    e.from = function(v, S) {
      return n.isValid(v) ? parseInt(v, 10) : S;
    }, e.getCapacity = function(v, S, _) {
      if (!n.isValid(v))
        throw new Error("Invalid QR Code version");
      typeof _ > "u" && (_ = r.BYTE);
      const y = i.getSymbolTotalCodewords(v), g = a.getTotalCodewordsCount(v, S), I = (y - g) * 8;
      if (_ === r.MIXED) return I;
      const A = I - u(_, v);
      switch (_) {
        case r.NUMERIC:
          return Math.floor(A / 10 * 3);
        case r.ALPHANUMERIC:
          return Math.floor(A / 11 * 2);
        case r.KANJI:
          return Math.floor(A / 13);
        case r.BYTE:
        default:
          return Math.floor(A / 8);
      }
    }, e.getBestVersionForData = function(v, S) {
      let _;
      const y = o.from(S, o.M);
      if (Array.isArray(v)) {
        if (v.length > 1)
          return f(v, y);
        if (v.length === 0)
          return 1;
        _ = v[0];
      } else
        _ = v;
      return c(_.mode, _.getLength(), y);
    }, e.getEncodedBits = function(v) {
      if (!n.isValid(v) || v < 7)
        throw new Error("Invalid QR Code version");
      let S = v << 12;
      for (; i.getBCHDigit(S) - d >= 0; )
        S ^= s << i.getBCHDigit(S) - d;
      return v << 12 | S;
    };
  })(ze)), ze;
}
var $e = {}, Ct;
function Ln() {
  if (Ct) return $e;
  Ct = 1;
  const e = ee(), i = 1335, a = 21522, o = e.getBCHDigit(i);
  return $e.getEncodedBits = function(n, s) {
    const d = n.bit << 3 | s;
    let c = d << 10;
    for (; e.getBCHDigit(c) - o >= 0; )
      c ^= i << e.getBCHDigit(c) - o;
    return (d << 10 | c) ^ a;
  }, $e;
}
var De = {}, Fe, Tt;
function Nn() {
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
    let r, n, s;
    for (r = 0; r + 3 <= this.data.length; r += 3)
      n = this.data.substr(r, 3), s = parseInt(n, 10), o.put(s, 10);
    const d = this.data.length - r;
    d > 0 && (n = this.data.substr(r), s = parseInt(n, 10), o.put(s, d * 3 + 1));
  }, Fe = i, Fe;
}
var Ue, Bt;
function $n() {
  if (Bt) return Ue;
  Bt = 1;
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
      let s = i.indexOf(this.data[n]) * 45;
      s += i.indexOf(this.data[n + 1]), r.put(s, 11);
    }
    this.data.length % 2 && r.put(i.indexOf(this.data[n]), 6);
  }, Ue = a, Ue;
}
var qe, Et;
function Dn() {
  if (Et) return qe;
  Et = 1;
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
var We, Rt;
function Fn() {
  if (Rt) return We;
  Rt = 1;
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
var Oe = { exports: {} }, _t;
function Un() {
  return _t || (_t = 1, (function(e) {
    var i = {
      single_source_shortest_paths: function(a, o, r) {
        var n = {}, s = {};
        s[o] = 0;
        var d = i.PriorityQueue.make();
        d.push(o, 0);
        for (var c, u, h, f, b, v, S, _, y; !d.empty(); ) {
          c = d.pop(), u = c.value, f = c.cost, b = a[u] || {};
          for (h in b)
            b.hasOwnProperty(h) && (v = b[h], S = f + v, _ = s[h], y = typeof s[h] > "u", (y || _ > S) && (s[h] = S, d.push(h, S), n[h] = u));
        }
        if (typeof r < "u" && typeof s[r] > "u") {
          var g = ["Could not find a path from ", o, " to ", r, "."].join("");
          throw new Error(g);
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
function qn() {
  return It || (It = 1, (function(e) {
    const i = te(), a = Nn(), o = $n(), r = Dn(), n = Fn(), s = rn(), d = ee(), c = Un();
    function u(g) {
      return unescape(encodeURIComponent(g)).length;
    }
    function h(g, I, A) {
      const w = [];
      let N;
      for (; (N = g.exec(A)) !== null; )
        w.push({
          data: N[0],
          index: N.index,
          mode: I,
          length: N[0].length
        });
      return w;
    }
    function f(g) {
      const I = h(s.NUMERIC, i.NUMERIC, g), A = h(s.ALPHANUMERIC, i.ALPHANUMERIC, g);
      let w, N;
      return d.isKanjiModeEnabled() ? (w = h(s.BYTE, i.BYTE, g), N = h(s.KANJI, i.KANJI, g)) : (w = h(s.BYTE_KANJI, i.BYTE, g), N = []), I.concat(A, w, N).sort(function(x, E) {
        return x.index - E.index;
      }).map(function(x) {
        return {
          data: x.data,
          mode: x.mode,
          length: x.length
        };
      });
    }
    function b(g, I) {
      switch (I) {
        case i.NUMERIC:
          return a.getBitsLength(g);
        case i.ALPHANUMERIC:
          return o.getBitsLength(g);
        case i.KANJI:
          return n.getBitsLength(g);
        case i.BYTE:
          return r.getBitsLength(g);
      }
    }
    function v(g) {
      return g.reduce(function(I, A) {
        const w = I.length - 1 >= 0 ? I[I.length - 1] : null;
        return w && w.mode === A.mode ? (I[I.length - 1].data += A.data, I) : (I.push(A), I);
      }, []);
    }
    function S(g) {
      const I = [];
      for (let A = 0; A < g.length; A++) {
        const w = g[A];
        switch (w.mode) {
          case i.NUMERIC:
            I.push([
              w,
              { data: w.data, mode: i.ALPHANUMERIC, length: w.length },
              { data: w.data, mode: i.BYTE, length: w.length }
            ]);
            break;
          case i.ALPHANUMERIC:
            I.push([
              w,
              { data: w.data, mode: i.BYTE, length: w.length }
            ]);
            break;
          case i.KANJI:
            I.push([
              w,
              { data: w.data, mode: i.BYTE, length: u(w.data) }
            ]);
            break;
          case i.BYTE:
            I.push([
              { data: w.data, mode: i.BYTE, length: u(w.data) }
            ]);
        }
      }
      return I;
    }
    function _(g, I) {
      const A = {}, w = { start: {} };
      let N = ["start"];
      for (let C = 0; C < g.length; C++) {
        const x = g[C], E = [];
        for (let T = 0; T < x.length; T++) {
          const P = x[T], B = "" + C + T;
          E.push(B), A[B] = { node: P, lastCount: 0 }, w[B] = {};
          for (let M = 0; M < N.length; M++) {
            const R = N[M];
            A[R] && A[R].node.mode === P.mode ? (w[R][B] = b(A[R].lastCount + P.length, P.mode) - b(A[R].lastCount, P.mode), A[R].lastCount += P.length) : (A[R] && (A[R].lastCount = P.length), w[R][B] = b(P.length, P.mode) + 4 + i.getCharCountIndicator(P.mode, I));
          }
        }
        N = E;
      }
      for (let C = 0; C < N.length; C++)
        w[N[C]].end = 0;
      return { map: w, table: A };
    }
    function y(g, I) {
      let A;
      const w = i.getBestModeForData(g);
      if (A = i.from(I, w), A !== i.BYTE && A.bit < w.bit)
        throw new Error('"' + g + '" cannot be encoded with mode ' + i.toString(A) + `.
 Suggested mode is: ` + i.toString(w));
      switch (A === i.KANJI && !d.isKanjiModeEnabled() && (A = i.BYTE), A) {
        case i.NUMERIC:
          return new a(g);
        case i.ALPHANUMERIC:
          return new o(g);
        case i.KANJI:
          return new n(g);
        case i.BYTE:
          return new r(g);
      }
    }
    e.fromArray = function(I) {
      return I.reduce(function(A, w) {
        return typeof w == "string" ? A.push(y(w, null)) : w.data && A.push(y(w.data, w.mode)), A;
      }, []);
    }, e.fromString = function(I, A) {
      const w = f(I, d.isKanjiModeEnabled()), N = S(w), C = _(N, A), x = c.find_path(C.map, "start", "end"), E = [];
      for (let T = 1; T < x.length - 1; T++)
        E.push(C.table[x[T]].node);
      return e.fromArray(v(E));
    }, e.rawSplit = function(I) {
      return e.fromArray(
        f(I, d.isKanjiModeEnabled())
      );
    };
  })(De)), De;
}
var Pt;
function Wn() {
  if (Pt) return Te;
  Pt = 1;
  const e = ee(), i = rt(), a = Bn(), o = En(), r = Rn(), n = _n(), s = In(), d = tn(), c = An(), u = zn(), h = Ln(), f = te(), b = qn();
  function v(C, x) {
    const E = C.size, T = n.getPositions(x);
    for (let P = 0; P < T.length; P++) {
      const B = T[P][0], M = T[P][1];
      for (let R = -1; R <= 7; R++)
        if (!(B + R <= -1 || E <= B + R))
          for (let z = -1; z <= 7; z++)
            M + z <= -1 || E <= M + z || (R >= 0 && R <= 6 && (z === 0 || z === 6) || z >= 0 && z <= 6 && (R === 0 || R === 6) || R >= 2 && R <= 4 && z >= 2 && z <= 4 ? C.set(B + R, M + z, !0, !0) : C.set(B + R, M + z, !1, !0));
    }
  }
  function S(C) {
    const x = C.size;
    for (let E = 8; E < x - 8; E++) {
      const T = E % 2 === 0;
      C.set(E, 6, T, !0), C.set(6, E, T, !0);
    }
  }
  function _(C, x) {
    const E = r.getPositions(x);
    for (let T = 0; T < E.length; T++) {
      const P = E[T][0], B = E[T][1];
      for (let M = -2; M <= 2; M++)
        for (let R = -2; R <= 2; R++)
          M === -2 || M === 2 || R === -2 || R === 2 || M === 0 && R === 0 ? C.set(P + M, B + R, !0, !0) : C.set(P + M, B + R, !1, !0);
    }
  }
  function y(C, x) {
    const E = C.size, T = u.getEncodedBits(x);
    let P, B, M;
    for (let R = 0; R < 18; R++)
      P = Math.floor(R / 3), B = R % 3 + E - 8 - 3, M = (T >> R & 1) === 1, C.set(P, B, M, !0), C.set(B, P, M, !0);
  }
  function g(C, x, E) {
    const T = C.size, P = h.getEncodedBits(x, E);
    let B, M;
    for (B = 0; B < 15; B++)
      M = (P >> B & 1) === 1, B < 6 ? C.set(B, 8, M, !0) : B < 8 ? C.set(B + 1, 8, M, !0) : C.set(T - 15 + B, 8, M, !0), B < 8 ? C.set(8, T - B - 1, M, !0) : B < 9 ? C.set(8, 15 - B - 1 + 1, M, !0) : C.set(8, 15 - B - 1, M, !0);
    C.set(T - 8, 8, 1, !0);
  }
  function I(C, x) {
    const E = C.size;
    let T = -1, P = E - 1, B = 7, M = 0;
    for (let R = E - 1; R > 0; R -= 2)
      for (R === 6 && R--; ; ) {
        for (let z = 0; z < 2; z++)
          if (!C.isReserved(P, R - z)) {
            let W = !1;
            M < x.length && (W = (x[M] >>> B & 1) === 1), C.set(P, R - z, W), B--, B === -1 && (M++, B = 7);
          }
        if (P += T, P < 0 || E <= P) {
          P -= T, T = -T;
          break;
        }
      }
  }
  function A(C, x, E) {
    const T = new a();
    E.forEach(function(z) {
      T.put(z.mode.bit, 4), T.put(z.getLength(), f.getCharCountIndicator(z.mode, C)), z.write(T);
    });
    const P = e.getSymbolTotalCodewords(C), B = d.getTotalCodewordsCount(C, x), M = (P - B) * 8;
    for (T.getLengthInBits() + 4 <= M && T.put(0, 4); T.getLengthInBits() % 8 !== 0; )
      T.putBit(0);
    const R = (M - T.getLengthInBits()) / 8;
    for (let z = 0; z < R; z++)
      T.put(z % 2 ? 17 : 236, 8);
    return w(T, C, x);
  }
  function w(C, x, E) {
    const T = e.getSymbolTotalCodewords(x), P = d.getTotalCodewordsCount(x, E), B = T - P, M = d.getBlocksCount(x, E), R = T % M, z = M - R, W = Math.floor(T / M), k = Math.floor(B / M), $ = k + 1, O = W - k, wn = new c(O);
    let xe = 0;
    const ue = new Array(M), at = new Array(M);
    let we = 0;
    const vn = new Uint8Array(C.buffer);
    for (let ne = 0; ne < M; ne++) {
      const ke = ne < z ? k : $;
      ue[ne] = vn.slice(xe, xe + ke), at[ne] = wn.encode(ue[ne]), xe += ke, we = Math.max(we, ke);
    }
    const ve = new Uint8Array(T);
    let lt = 0, H, V;
    for (H = 0; H < we; H++)
      for (V = 0; V < M; V++)
        H < ue[V].length && (ve[lt++] = ue[V][H]);
    for (H = 0; H < O; H++)
      for (V = 0; V < M; V++)
        ve[lt++] = at[V][H];
    return ve;
  }
  function N(C, x, E, T) {
    let P;
    if (Array.isArray(C))
      P = b.fromArray(C);
    else if (typeof C == "string") {
      let W = x;
      if (!W) {
        const k = b.rawSplit(C);
        W = u.getBestVersionForData(k, E);
      }
      P = b.fromString(C, W || 40);
    } else
      throw new Error("Invalid data");
    const B = u.getBestVersionForData(P, E);
    if (!B)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!x)
      x = B;
    else if (x < B)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + B + `.
`
      );
    const M = A(x, E, P), R = e.getSymbolSize(x), z = new o(R);
    return v(z, x), S(z), _(z, x), g(z, E, 0), x >= 7 && y(z, x), I(z, M), isNaN(T) && (T = s.getBestMask(
      z,
      g.bind(null, z, E)
    )), s.applyMask(T, z), g(z, E, T), {
      modules: z,
      version: x,
      errorCorrectionLevel: E,
      maskPattern: T,
      segments: P
    };
  }
  return Te.create = function(x, E) {
    if (typeof x > "u" || x === "")
      throw new Error("No input text");
    let T = i.M, P, B;
    return typeof E < "u" && (T = i.from(E.errorCorrectionLevel, i.M), P = u.from(E.version), B = s.from(E.maskPattern), E.toSJISFunc && e.setToSJISFunction(E.toSJISFunc)), N(x, P, T, B);
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
      const r = typeof o.margin > "u" || o.margin === null || o.margin < 0 ? 4 : o.margin, n = o.width && o.width >= 21 ? o.width : void 0, s = o.scale || 4;
      return {
        width: n,
        scale: n ? 4 : s,
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
      const s = r.modules.size, d = r.modules.data, c = e.getScale(s, n), u = Math.floor((s + n.margin * 2) * c), h = n.margin * c, f = [n.color.light, n.color.dark];
      for (let b = 0; b < u; b++)
        for (let v = 0; v < u; v++) {
          let S = (b * u + v) * 4, _ = n.color.light;
          if (b >= h && v >= h && b < u - h && v < u - h) {
            const y = Math.floor((b - h) / c), g = Math.floor((v - h) / c);
            _ = f[d[y * s + g] ? 1 : 0];
          }
          o[S++] = _.r, o[S++] = _.g, o[S++] = _.b, o[S] = _.a;
        }
    };
  })(He)), He;
}
var At;
function On() {
  return At || (At = 1, (function(e) {
    const i = on();
    function a(r, n, s) {
      r.clearRect(0, 0, n.width, n.height), n.style || (n.style = {}), n.height = s, n.width = s, n.style.height = s + "px", n.style.width = s + "px";
    }
    function o() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    e.render = function(n, s, d) {
      let c = d, u = s;
      typeof c > "u" && (!s || !s.getContext) && (c = s, s = void 0), s || (u = o()), c = i.getOptions(c);
      const h = i.getImageWidth(n.modules.size, c), f = u.getContext("2d"), b = f.createImageData(h, h);
      return i.qrToImageData(b.data, n, c), a(f, u, h), f.putImageData(b, 0, 0), u;
    }, e.renderToDataURL = function(n, s, d) {
      let c = d;
      typeof c > "u" && (!s || !s.getContext) && (c = s, s = void 0), c || (c = {});
      const u = e.render(n, s, c), h = c.type || "image/png", f = c.rendererOpts || {};
      return u.toDataURL(h, f.quality);
    };
  })(je)), je;
}
var Ve = {}, zt;
function jn() {
  if (zt) return Ve;
  zt = 1;
  const e = on();
  function i(r, n) {
    const s = r.a / 255, d = n + '="' + r.hex + '"';
    return s < 1 ? d + " " + n + '-opacity="' + s.toFixed(2).slice(1) + '"' : d;
  }
  function a(r, n, s) {
    let d = r + n;
    return typeof s < "u" && (d += " " + s), d;
  }
  function o(r, n, s) {
    let d = "", c = 0, u = !1, h = 0;
    for (let f = 0; f < r.length; f++) {
      const b = Math.floor(f % n), v = Math.floor(f / n);
      !b && !u && (u = !0), r[f] ? (h++, f > 0 && b > 0 && r[f - 1] || (d += u ? a("M", b + s, 0.5 + v + s) : a("m", c, 0), c = 0, u = !1), b + 1 < n && r[f + 1] || (d += a("h", h), h = 0)) : c++;
    }
    return d;
  }
  return Ve.render = function(n, s, d) {
    const c = e.getOptions(s), u = n.modules.size, h = n.modules.data, f = u + c.margin * 2, b = c.color.light.a ? "<path " + i(c.color.light, "fill") + ' d="M0 0h' + f + "v" + f + 'H0z"/>' : "", v = "<path " + i(c.color.dark, "stroke") + ' d="' + o(h, u, c.margin) + '"/>', S = 'viewBox="0 0 ' + f + " " + f + '"', y = '<svg xmlns="http://www.w3.org/2000/svg" ' + (c.width ? 'width="' + c.width + '" height="' + c.width + '" ' : "") + S + ' shape-rendering="crispEdges">' + b + v + `</svg>
`;
    return typeof d == "function" && d(null, y), y;
  }, Ve;
}
var Lt;
function Hn() {
  if (Lt) return re;
  Lt = 1;
  const e = Tn(), i = Wn(), a = On(), o = jn();
  function r(n, s, d, c, u) {
    const h = [].slice.call(arguments, 1), f = h.length, b = typeof h[f - 1] == "function";
    if (!b && !e())
      throw new Error("Callback required as last argument");
    if (b) {
      if (f < 2)
        throw new Error("Too few arguments provided");
      f === 2 ? (u = d, d = s, s = c = void 0) : f === 3 && (s.getContext && typeof u > "u" ? (u = c, c = void 0) : (u = c, c = d, d = s, s = void 0));
    } else {
      if (f < 1)
        throw new Error("Too few arguments provided");
      return f === 1 ? (d = s, s = c = void 0) : f === 2 && !s.getContext && (c = d, d = s, s = void 0), new Promise(function(v, S) {
        try {
          const _ = i.create(d, c);
          v(n(_, s, c));
        } catch (_) {
          S(_);
        }
      });
    }
    try {
      const v = i.create(d, c);
      u(null, n(v, s, c));
    } catch (v) {
      u(v);
    }
  }
  return re.create = i.create, re.toCanvas = r.bind(null, a.render), re.toDataURL = r.bind(null, a.renderToDataURL), re.toString = r.bind(null, function(n, s, d) {
    return o.render(n, d);
  }), re;
}
var Vn = Hn();
const an = /* @__PURE__ */ Cn(Vn), ln = {
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
}, Kn = {
  radiusSm: "0.25rem",
  radiusMd: "0.25rem",
  radiusLg: "0.25rem",
  radiusXl: "0.25rem",
  fieldRadius: "0.5rem",
  fontSans: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'Geist Mono', 'SF Mono', 'Cascadia Code', monospace",
  transition: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  transitionSlow: "400ms cubic-bezier(0.4, 0, 0.2, 1)"
}, Gn = {
  sidebarWidth: "260px",
  sidebarCollapsed: "72px",
  topbarHeight: "64px"
}, ot = {
  ...Kn,
  ...Gn
}, sn = {
  dark: ln
};
function Yn(e) {
  return e.replace(/[A-Z]/g, (i) => "-" + i.toLowerCase());
}
function cn(e = "ag") {
  return e.trim() || "ag";
}
function Se(e, i) {
  return `--${e}-${Yn(i)}`;
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
const Jn = dn(), Qn = un();
function t(e, i = {}) {
  const a = i.prefix ? dn(i) : Jn, o = i.prefix ? un(i) : Qn;
  if (e in a) {
    const n = e;
    return `var(${a[n]}, ${ln[n]})`;
  }
  const r = e;
  return `var(${o[r]}, ${ot[r]})`;
}
const Xn = "/api/v1/ext-user/payment-epay", Zn = "/api/v1/ext/payment-epay";
async function q(e, i, a, o) {
  const r = {};
  a !== void 0 && (r["Content-Type"] = "application/json");
  const n = localStorage.getItem("token");
  n && (r.Authorization = `Bearer ${n}`);
  const s = o != null && o.admin ? Zn : Xn, d = await fetch(s + i, {
    method: e,
    headers: r,
    body: a ? JSON.stringify(a) : void 0
  }), c = await d.text();
  let u = null;
  try {
    u = c ? JSON.parse(c) : null;
  } catch {
  }
  if (!d.ok) {
    const f = u, b = (f == null ? void 0 : f.message) || (u == null ? void 0 : u.error) || `HTTP ${d.status}`;
    throw d.status === 401 && (localStorage.removeItem("token"), window.location.href = "/login"), new Error(b);
  }
  const h = u;
  if (h && typeof h == "object" && "code" in h && "data" in h) {
    if (h.code !== 0)
      throw new Error(h.message || "请求失败");
    return h.data;
  }
  return u;
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
function er() {
  return he || (he = (async () => {
    var r;
    const i = await (await fetch("/api/v1/settings/public")).json(), a = (i == null ? void 0 : i.data) || {};
    let o = "";
    try {
      const n = window.localStorage.getItem("ag_origin_site") || "";
      if (n && a.sites_branding) {
        const s = JSON.parse(a.sites_branding);
        o = ((r = s == null ? void 0 : s[n]) == null ? void 0 : r.name) || "";
      }
    } catch {
    }
    return o || a.site_name || "";
  })().catch(() => (he = null, ""))), he;
}
function D(e, i = {}) {
  const a = e.toFixed(2);
  return i.compact ? `$${e}` : `$${a}`;
}
const tr = /* @__PURE__ */ new Set(["zh", "zh-HK", "en", "ja"]);
function Nt(e) {
  return e && tr.has(e) ? e : null;
}
function nr() {
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
function rr() {
  if (typeof document < "u") {
    const e = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/), i = e ? Nt(decodeURIComponent(e[1] ?? "")) : null;
    if (i) return i;
  }
  try {
    const e = Nt(window.localStorage.getItem("lang"));
    if (e) return e;
  } catch {
  }
  return nr();
}
const or = {
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
  待支付: "待支付",
  已支付: "已支付",
  已过期: "已過期",
  失败: "失敗",
  已取消: "已取消",
  已退款: "已退款"
}, ir = {
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
  待支付: "Pending",
  已支付: "Paid",
  已过期: "Expired",
  失败: "Failed",
  已取消: "Cancelled",
  已退款: "Refunded"
}, ar = {
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
  待支付: "未払い",
  已支付: "支払済み",
  已过期: "期限切れ",
  失败: "失敗",
  已取消: "キャンセル済み",
  已退款: "返金済み"
}, lr = {
  "zh-HK": or,
  en: ir,
  ja: ar
};
function m(e) {
  const i = rr();
  if (i === "zh") return e;
  const a = lr[i];
  return a && a[e] || e;
}
const fe = "epay_last_order", $t = [10, 30, 50, 100, 200, 500];
function Dt(e, i) {
  const a = $t.filter((o) => o >= e && o <= i);
  return e > $t[0] && e <= i && !a.includes(e) && a.unshift(e), !a.length && e <= i && a.push(e), a;
}
function sr() {
  const [e, i] = L([]), [a, o] = L(!0), [r, n] = L(null), [s, d] = L(1), [c, u] = L(1e4), [h, f] = L(30), [b, v] = L(""), [S, _] = L(!1), [y, g] = L(null), [I, A] = L([]), [w, N] = L(null), C = de(!1), [x, E] = L(null), [T, P] = L(null), B = de(null);
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
      i(k.methods || []), d(k.min_amount > 0 ? k.min_amount : 1), u(k.max_amount > 0 ? k.max_amount : 1e4), ($ = k.methods) != null && $.length && v(k.methods[0].key);
    }).catch((k) => n(String((k == null ? void 0 : k.message) || k))).finally(() => o(!1)), F.packages().then((k) => {
      A(k.list || []);
    }).catch(() => A([]));
  }, []), U(() => {
    if (C.current) return;
    const k = I.find((O) => O.amount >= s && O.amount <= c);
    if (k) {
      N(k.id), f(k.amount);
      return;
    }
    N(null);
    const [$] = Dt(s, c);
    $ !== void 0 && f($);
  }, [I, s, c]), U(() => {
    if (!x || x.status !== "pending") {
      B.current && (window.clearInterval(B.current), B.current = null);
      return;
    }
    const k = async () => {
      try {
        const $ = await F.getOrder(x.out_trade_no);
        E($);
      } catch {
      }
    };
    return B.current = window.setInterval(k, 3e3), () => {
      B.current && (window.clearInterval(B.current), B.current = null);
    };
  }, [x == null ? void 0 : x.out_trade_no, x == null ? void 0 : x.status]), U(() => {
    if (!x) {
      P(null);
      return;
    }
    const k = x.qr_code_content || x.payment_url;
    if (!k) {
      P(null);
      return;
    }
    let $ = !1;
    return an.toDataURL(k, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((O) => {
      $ || P(O);
    }).catch(() => {
      $ || P(null);
    }), () => {
      $ = !0;
    };
  }, [x == null ? void 0 : x.payment_url, x == null ? void 0 : x.qr_code_content]);
  const M = async () => {
    if (g(null), !b) {
      g(m("请选择支付方式"));
      return;
    }
    if (!Number.isFinite(h)) {
      g(m("请输入有效金额"));
      return;
    }
    if (!h || h < s) {
      g(`${m("最低充值金额为")} ${D(s)}`);
      return;
    }
    if (h > c) {
      g(`${m("单笔充值金额不能超过")} ${D(c)}`);
      return;
    }
    _(!0);
    try {
      const k = await er(), $ = await F.createOrder({
        amount: h,
        method: b,
        subject: k ? `${k} 余额充值` : "余额充值",
        ...w !== null ? { package_id: w } : {}
      });
      E($);
      try {
        localStorage.setItem(fe, $.out_trade_no);
      } catch {
      }
    } catch (k) {
      g(String(k.message || k));
    } finally {
      _(!1);
    }
  }, R = () => {
    E(null), g(null);
    try {
      localStorage.removeItem(fe);
    } catch {
    }
  };
  if (a)
    return /* @__PURE__ */ l("div", { style: Q, children: /* @__PURE__ */ l("div", { style: Ft, children: m("加载中...") }) });
  if (r)
    return /* @__PURE__ */ l("div", { style: Q, children: /* @__PURE__ */ p("div", { style: { ...Ft, color: t("danger") }, children: [
      m("加载支付方式失败: "),
      r
    ] }) });
  if (e.length === 0)
    return /* @__PURE__ */ l("div", { style: Q, children: /* @__PURE__ */ l("div", { style: ye, children: /* @__PURE__ */ l("p", { style: { color: t("textSecondary"), margin: 0, textAlign: "center" }, children: m("充值功能暂未开放，请联系管理员。") }) }) });
  if (x)
    return x.status === "paid" ? /* @__PURE__ */ p("div", { style: Q, children: [
      /* @__PURE__ */ l("h2", { style: pe, children: m("充值成功") }),
      /* @__PURE__ */ p("div", { style: ye, children: [
        /* @__PURE__ */ p("p", { style: { margin: 0, color: t("text") }, children: [
          m("订单"),
          " ",
          /* @__PURE__ */ l("code", { style: Ge, children: x.out_trade_no }),
          " ",
          m("已支付，金额"),
          " ",
          /* @__PURE__ */ l("strong", { style: { color: t("success") }, children: D(x.amount) }),
          " ",
          m("已入账"),
          (x.bonus_amount ?? 0) > 0 && /* @__PURE__ */ p(ce, { children: [
            m("，套餐赠送"),
            " ",
            /* @__PURE__ */ l("strong", { style: { color: t("success") }, children: D(x.bonus_amount) }),
            " ",
            m("已同步到账")
          ] }),
          m("。")
        ] }),
        /* @__PURE__ */ l("button", { style: { ...Ke, marginTop: 20 }, onClick: R, children: m("再次充值") })
      ] })
    ] }) : x.status === "pending" ? /* @__PURE__ */ p("div", { style: Q, children: [
      /* @__PURE__ */ l("h2", { style: pe, children: m("扫码付款") }),
      /* @__PURE__ */ p("div", { style: Sr, children: [
        T ? /* @__PURE__ */ l("img", { src: T, alt: m("付款二维码"), style: qt }) : /* @__PURE__ */ l("div", { style: { ...qt, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary") }, children: m("生成二维码中...") }),
        /* @__PURE__ */ l("div", { style: xr, children: D(x.amount) }),
        (x.bonus_amount ?? 0) > 0 && /* @__PURE__ */ p("div", { style: { color: t("success"), fontSize: 13, marginTop: 2 }, children: [
          m("支付成功后另赠"),
          " ",
          D(x.bonus_amount)
        ] }),
        /* @__PURE__ */ p("div", { style: { color: t("textSecondary"), fontSize: 13 }, children: [
          m("请使用"),
          " ",
          cr(x.method),
          " ",
          m("扫码完成付款")
        ] }),
        /* @__PURE__ */ p("div", { style: { marginTop: 8, color: t("textTertiary"), fontSize: 12 }, children: [
          m("订单号："),
          /* @__PURE__ */ l("code", { style: Ge, children: x.out_trade_no })
        ] }),
        /* @__PURE__ */ l("p", { style: { textAlign: "center", color: t("textTertiary"), fontSize: 13, marginTop: 20, marginBottom: 0 }, children: m("支付完成后本页将自动跳转到结果页（每 3 秒检查一次）") }),
        /* @__PURE__ */ l("p", { style: { textAlign: "center", color: t("textTertiary"), fontSize: 12, marginTop: 6, marginBottom: 0 }, children: m("离开或刷新本页也没关系，支付结果会在你回来时自动恢复。") }),
        x.payment_url && /* @__PURE__ */ p("p", { style: { textAlign: "center", fontSize: 12, marginTop: 8, marginBottom: 0 }, children: [
          m("扫码不便？"),
          " ",
          /* @__PURE__ */ l("a", { href: x.payment_url, target: "_blank", rel: "noreferrer", style: { color: t("primary"), textDecoration: "none" }, children: m("点此在新窗口打开付款页 →") })
        ] }),
        /* @__PURE__ */ l("button", { style: { ...br, marginTop: 20 }, onClick: R, children: m("取消") })
      ] })
    ] }) : /* @__PURE__ */ p("div", { style: Q, children: [
      /* @__PURE__ */ l("h2", { style: pe, children: dr(x.status) }),
      /* @__PURE__ */ p("div", { style: ye, children: [
        /* @__PURE__ */ p("p", { style: { margin: 0, color: t("textSecondary") }, children: [
          m("订单号："),
          /* @__PURE__ */ l("code", { style: Ge, children: x.out_trade_no })
        ] }),
        /* @__PURE__ */ l("button", { style: { ...Ke, marginTop: 20 }, onClick: R, children: m("重新发起") })
      ] })
    ] });
  const z = I.filter((k) => k.amount >= s && k.amount <= c), W = Dt(s, c);
  return /* @__PURE__ */ p("div", { style: Q, children: [
    /* @__PURE__ */ l("h2", { style: pe, children: m("账户充值") }),
    /* @__PURE__ */ p("div", { style: ye, children: [
      /* @__PURE__ */ p("p", { style: gr, children: [
        m("充值比例："),
        /* @__PURE__ */ l("strong", { style: { color: t("text") }, children: "1 CNY = $1" })
      ] }),
      /* @__PURE__ */ p("section", { children: [
        /* @__PURE__ */ l("h3", { style: Ut, children: z.length ? m("选择套餐") : m("选择金额") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 }, children: z.length ? z.map((k) => /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            onClick: () => {
              C.current = !0, N(k.id), f(k.amount);
            },
            style: w === k.id ? fr : gn,
            title: k.title || void 0,
            children: [
              /* @__PURE__ */ l("span", { style: { fontSize: 16, fontWeight: 600 }, children: D(k.amount, { compact: !0 }) }),
              k.bonus_amount > 0 && /* @__PURE__ */ p("span", { style: w === k.id ? pr : hn, children: [
                m("送"),
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
              C.current = !0, N(null), f(k);
            },
            style: h === k ? hr : it,
            children: D(k, { compact: !0 })
          },
          k
        )) }),
        /* @__PURE__ */ p("div", { style: { marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: t("textSecondary"), fontSize: 13 }, children: [
          /* @__PURE__ */ p("span", { children: [
            m("自定义金额"),
            z.length ? m("（不参与套餐赠送）") : ""
          ] }),
          /* @__PURE__ */ l(
            "input",
            {
              type: "number",
              min: s,
              max: c,
              step: 1,
              value: h,
              onChange: (k) => {
                C.current = !0, N(null), f(Number(k.target.value));
              },
              style: mr
            }
          ),
          /* @__PURE__ */ l("span", { children: "$" })
        ] })
      ] }),
      /* @__PURE__ */ p("section", { style: ur, children: [
        /* @__PURE__ */ l("h3", { style: Ut, children: m("选择支付方式") }),
        /* @__PURE__ */ l("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: e.map((k) => /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => v(k.key),
            style: b === k.key ? yr : fn,
            title: k.description,
            children: m(k.label)
          },
          k.key
        )) })
      ] }),
      y && /* @__PURE__ */ l("p", { style: { color: t("danger"), marginTop: 16, fontSize: 13 }, children: y }),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: M,
          disabled: S,
          style: { ...Ke, marginTop: 24, width: "100%", opacity: S ? 0.6 : 1 },
          children: m(S ? "处理中..." : "立即支付")
        }
      )
    ] })
  ] });
}
function cr(e) {
  switch (e) {
    case "alipay":
      return m("支付宝");
    case "wxpay":
      return m("微信支付");
    default:
      return e;
  }
}
function dr(e) {
  switch (e) {
    case "expired":
      return m("订单已过期");
    case "failed":
      return m("订单已失败");
    case "cancelled":
      return m("订单已取消");
    case "refunded":
      return m("订单已退款");
    default:
      return m("订单已") + e;
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
}, ur = {
  marginTop: 28
}, gr = {
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
}, hr = {
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
}, fr = {
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
}, pr = {
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
}, yr = {
  ...fn,
  borderColor: t("primary"),
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, mr = {
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
}, br = {
  padding: "10px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: t("transition")
}, Sr = {
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
}, xr = {
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
function wr() {
  const [e, i] = L([]), [a, o] = L(!0), [r, n] = L(null), [s, d] = L(null), [c, u] = L(null), h = de(null), f = () => {
    o(!0), F.listOrders(100).then((S) => i(S.list || [])).catch((S) => n(String((S == null ? void 0 : S.message) || S))).finally(() => o(!1));
  };
  U(f, []), U(() => {
    if (!s) {
      u(null);
      return;
    }
    const S = s.qr_code_content || s.payment_url;
    if (!S) {
      u(null);
      return;
    }
    let _ = !1;
    return an.toDataURL(S, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((y) => {
      _ || u(y);
    }).catch(() => {
      _ || u(null);
    }), () => {
      _ = !0;
    };
  }, [s == null ? void 0 : s.payment_url, s == null ? void 0 : s.qr_code_content]), U(() => {
    if (!s || s.status !== "pending") {
      h.current && (window.clearInterval(h.current), h.current = null);
      return;
    }
    return h.current = window.setInterval(async () => {
      try {
        const S = await F.getOrder(s.out_trade_no);
        d(S), S.status !== "pending" && f();
      } catch {
      }
    }, 3e3), () => {
      h.current && (window.clearInterval(h.current), h.current = null);
    };
  }, [s == null ? void 0 : s.out_trade_no, s == null ? void 0 : s.status]);
  const b = (S) => {
    d(S);
  }, v = () => {
    d(null), u(null);
  };
  return a ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ l("div", { style: Ht, children: m("加载中...") }) }) : r ? /* @__PURE__ */ l("div", { style: Ye, children: /* @__PURE__ */ p("div", { style: { ...Ht, color: t("danger") }, children: [
    m("加载失败: "),
    r
  ] }) }) : /* @__PURE__ */ p("div", { style: Ye, children: [
    s && /* @__PURE__ */ l("div", { style: Er, onClick: v, children: /* @__PURE__ */ l("div", { style: Rr, onClick: (S) => S.stopPropagation(), children: s.status === "paid" ? /* @__PURE__ */ p(ce, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("success") }, children: m("支付成功") }),
      /* @__PURE__ */ p("p", { style: { margin: 0, color: t("text"), fontSize: 14 }, children: [
        m("订单"),
        " ",
        /* @__PURE__ */ l("code", { style: Je, children: s.out_trade_no }),
        " ",
        m("已支付"),
        " ",
        /* @__PURE__ */ l("strong", { children: D(s.amount) })
      ] }),
      /* @__PURE__ */ l("button", { style: { ...Vt, marginTop: 16 }, onClick: v, children: m("关闭") })
    ] }) : s.status === "pending" ? /* @__PURE__ */ p(ce, { children: [
      /* @__PURE__ */ l("h3", { style: { margin: "0 0 12px", color: t("text") }, children: m("扫码付款") }),
      c ? /* @__PURE__ */ l("img", { src: c, alt: m("付款二维码"), style: { width: 240, height: 240, borderRadius: 8 } }) : /* @__PURE__ */ l("div", { style: { width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: t("textTertiary"), border: `1px solid ${t("glassBorder")}`, borderRadius: 8 }, children: m("生成二维码中...") }),
      /* @__PURE__ */ l("div", { style: { marginTop: 12, fontWeight: 600, fontSize: 20, color: t("text") }, children: D(s.amount) }),
      /* @__PURE__ */ p("div", { style: { color: t("textSecondary"), fontSize: 13, marginTop: 4 }, children: [
        m("请使用"),
        " ",
        Wt(s.method),
        " ",
        m("扫码完成付款")
      ] }),
      /* @__PURE__ */ p("div", { style: { marginTop: 6, color: t("textTertiary"), fontSize: 12 }, children: [
        m("订单号："),
        /* @__PURE__ */ l("code", { style: Je, children: s.out_trade_no })
      ] }),
      /* @__PURE__ */ l("p", { style: { color: t("textTertiary"), fontSize: 12, marginTop: 12, marginBottom: 0 }, children: m("支付完成后将自动刷新（每 3 秒检查一次）") }),
      s.payment_url && /* @__PURE__ */ p("p", { style: { fontSize: 12, marginTop: 6, marginBottom: 0 }, children: [
        m("扫码不便？"),
        " ",
        /* @__PURE__ */ l("a", { href: s.payment_url, target: "_blank", rel: "noreferrer", style: { color: t("primary"), textDecoration: "none" }, children: m("点此在新窗口打开付款页 →") })
      ] }),
      /* @__PURE__ */ l("button", { style: { ..._r, marginTop: 16 }, onClick: v, children: m("取消") })
    ] }) : /* @__PURE__ */ p(ce, { children: [
      /* @__PURE__ */ p("h3", { style: { margin: "0 0 12px", color: t("textSecondary") }, children: [
        m("订单已"),
        Ot(s.status)
      ] }),
      /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), fontSize: 14 }, children: m("该订单无法继续支付，请重新发起充值。") }),
      /* @__PURE__ */ l("button", { style: { ...Vt, marginTop: 16 }, onClick: v, children: m("关闭") })
    ] }) }) }),
    /* @__PURE__ */ l("div", { style: kr, children: e.length === 0 ? /* @__PURE__ */ l("p", { style: Cr, children: m("暂无充值记录") }) : /* @__PURE__ */ l("div", { style: Tr, children: /* @__PURE__ */ p("table", { style: Br, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ p("tr", { children: [
        /* @__PURE__ */ l("th", { style: X, children: m("订单号") }),
        /* @__PURE__ */ l("th", { style: X, children: m("金额") }),
        /* @__PURE__ */ l("th", { style: X, children: m("支付方式") }),
        /* @__PURE__ */ l("th", { style: X, children: m("状态") }),
        /* @__PURE__ */ l("th", { style: X, children: m("创建时间") }),
        /* @__PURE__ */ l("th", { style: X, children: m("支付时间") }),
        /* @__PURE__ */ l("th", { style: X, children: m("操作") })
      ] }) }),
      /* @__PURE__ */ l("tbody", { children: e.map((S) => /* @__PURE__ */ p("tr", { children: [
        /* @__PURE__ */ l("td", { style: Z, children: /* @__PURE__ */ l("code", { style: Je, children: S.out_trade_no }) }),
        /* @__PURE__ */ l("td", { style: { ...Z, fontWeight: 600 }, children: D(S.amount) }),
        /* @__PURE__ */ l("td", { style: Z, children: Wt(S.method) }),
        /* @__PURE__ */ l("td", { style: { ...Z, color: vr(S.status), fontWeight: 600 }, children: Ot(S.status) }),
        /* @__PURE__ */ l("td", { style: { ...Z, color: t("textSecondary") }, children: jt(S.created_at) }),
        /* @__PURE__ */ l("td", { style: { ...Z, color: t("textSecondary") }, children: S.paid_at ? jt(S.paid_at) : "-" }),
        /* @__PURE__ */ l("td", { style: Z, children: S.status === "pending" && (S.qr_code_content || S.payment_url) ? /* @__PURE__ */ l("button", { style: Ir, onClick: () => b(S), children: m("继续支付") }) : null })
      ] }, S.id)) })
    ] }) }) })
  ] });
}
function Wt(e) {
  return { alipay: m("支付宝"), wxpay: m("微信支付") }[e] || e || "-";
}
function Ot(e) {
  return {
    pending: m("待支付"),
    paid: m("已支付"),
    expired: m("已过期"),
    failed: m("失败"),
    cancelled: m("已取消"),
    refunded: m("已退款")
  }[e] || e;
}
function vr(e) {
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
}, kr = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgElevated"),
  padding: "8px 0",
  overflow: "hidden"
}, Cr = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, Tr = {
  overflowX: "auto"
}, Br = {
  width: "100%",
  borderCollapse: "collapse"
}, X = {
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
}, Z = {
  padding: "12px 16px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  fontSize: 13,
  color: t("text"),
  whiteSpace: "nowrap"
}, Je = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, Er = {
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
}, Rr = {
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
}, _r = {
  padding: "8px 24px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: "transparent",
  color: t("textSecondary"),
  fontSize: 14,
  cursor: "pointer"
}, Ir = {
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
}, Pr = [10, 20, 50, 100], Mr = [
  { value: "all", label: "全部状态" },
  { value: "pending", label: "待支付" },
  { value: "paid", label: "已支付" },
  { value: "expired", label: "已过期" },
  { value: "failed", label: "失败" },
  { value: "cancelled", label: "已取消" },
  { value: "refunded", label: "已退款" }
];
function Ar() {
  const [e, i] = L([]), [a, o] = L(0), [r, n] = L(Kt), [s, d] = L(!0), [c, u] = L(null), [h, f] = L("all"), [b, v] = L(""), [S, _] = L(1), [y, g] = L(20), I = ie(() => {
    d(!0), u(null), F.adminListOrders({ page: S, pageSize: y, email: b, status: h }).then((w) => {
      i(w.list || []), o(w.total || 0), n(w.stats || Kt);
    }).catch((w) => u(String((w == null ? void 0 : w.message) || w))).finally(() => d(!1));
  }, [S, y, b, h]);
  U(() => {
    const N = setTimeout(I, b ? 300 : 0);
    return () => clearTimeout(N);
  }, [I, b]), U(() => {
    _(1);
  }, [h, b, y]);
  const A = Math.max(1, Math.ceil(a / y));
  return /* @__PURE__ */ p("div", { style: Ur, children: [
    /* @__PURE__ */ p("div", { style: qr, children: [
      /* @__PURE__ */ l(oe, { label: "总订单数", value: r.total }),
      /* @__PURE__ */ l(oe, { label: "已支付", value: r.paid, accent: t("success") }),
      /* @__PURE__ */ l(oe, { label: "待支付", value: r.pending, accent: t("warning") }),
      /* @__PURE__ */ l(oe, { label: "已过期", value: r.expired }),
      /* @__PURE__ */ l(oe, { label: "累计收款", value: D(r.total_amount_paid), accent: t("success") }),
      /* @__PURE__ */ l(oe, { label: "今日收款", value: D(r.today_amount_paid), accent: t("success") })
    ] }),
    /* @__PURE__ */ p("div", { style: Hr, children: [
      /* @__PURE__ */ p("div", { style: Vr, children: [
        /* @__PURE__ */ l(
          pn,
          {
            value: h,
            onChange: f,
            options: Mr,
            style: Kr
          }
        ),
        /* @__PURE__ */ l(
          "input",
          {
            type: "text",
            value: b,
            onChange: (w) => v(w.target.value),
            placeholder: "搜索用户邮箱",
            style: { ...no, width: 240 }
          }
        ),
        /* @__PURE__ */ l($r, { onClick: I, loading: s })
      ] }),
      c ? /* @__PURE__ */ p("p", { style: { ...Qe, color: t("danger") }, children: [
        "加载失败: ",
        c
      ] }) : s && e.length === 0 ? /* @__PURE__ */ l("p", { style: Qe, children: "加载中..." }) : e.length === 0 ? /* @__PURE__ */ l("p", { style: Qe, children: "暂无订单" }) : /* @__PURE__ */ l("div", { style: ro, children: /* @__PURE__ */ p("table", { style: oo, children: [
        /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ p("tr", { children: [
          /* @__PURE__ */ l("th", { style: G, children: "订单号" }),
          /* @__PURE__ */ l("th", { style: G, children: "用户邮箱" }),
          /* @__PURE__ */ l("th", { style: G, children: "金额" }),
          /* @__PURE__ */ l("th", { style: G, children: "支付方式" }),
          /* @__PURE__ */ l("th", { style: G, children: "服务商" }),
          /* @__PURE__ */ l("th", { style: G, children: "状态" }),
          /* @__PURE__ */ l("th", { style: G, children: "创建时间" }),
          /* @__PURE__ */ l("th", { style: G, children: "支付时间" })
        ] }) }),
        /* @__PURE__ */ l("tbody", { children: e.map((w) => /* @__PURE__ */ p("tr", { children: [
          /* @__PURE__ */ l("td", { style: Y, children: /* @__PURE__ */ l("code", { style: io, children: w.out_trade_no }) }),
          /* @__PURE__ */ l("td", { style: Y, children: w.user_email ? /* @__PURE__ */ l("span", { style: { color: t("text") }, children: w.user_email }) : /* @__PURE__ */ p("span", { style: { color: t("textTertiary") }, children: [
            "#",
            w.user_id
          ] }) }),
          /* @__PURE__ */ l("td", { style: { ...Y, fontWeight: 600 }, children: D(w.amount) }),
          /* @__PURE__ */ l("td", { style: Y, children: zr(w.method) }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: w.provider_id || "-" }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: Nr(w.status), fontWeight: 600 }, children: Lr(w.status) }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: Gt(w.created_at) }),
          /* @__PURE__ */ l("td", { style: { ...Y, color: t("textSecondary") }, children: w.paid_at ? Gt(w.paid_at) : "-" })
        ] }, w.id)) })
      ] }) }),
      /* @__PURE__ */ l(
        Dr,
        {
          page: S,
          pageSize: y,
          total: a,
          totalPages: A,
          onPageChange: _,
          onPageSizeChange: g
        }
      )
    ] })
  ] });
}
function oe({ label: e, value: i, accent: a }) {
  return /* @__PURE__ */ p("div", { style: Wr, children: [
    /* @__PURE__ */ l("div", { style: Or, children: e }),
    /* @__PURE__ */ l("div", { style: { ...jr, color: a || t("text") }, children: i })
  ] });
}
function zr(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function Lr(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function Nr(e) {
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
function $r({ onClick: e, loading: i }) {
  const [a, o] = L(!1);
  return /* @__PURE__ */ p(ce, { children: [
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
        children: /* @__PURE__ */ p(
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
function pn({
  value: e,
  options: i,
  onChange: a,
  style: o
}) {
  const [r, n] = L(!1), s = de(null), d = i.find((c) => c.value === e);
  return U(() => {
    if (!r) return;
    const c = (u) => {
      s.current && !s.current.contains(u.target) && n(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, [r]), /* @__PURE__ */ p("div", { ref: s, style: Gr, children: [
    /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        style: { ...o, ...Yr, ...r ? Jr : null },
        "aria-haspopup": "listbox",
        "aria-expanded": r,
        onClick: () => n((c) => !c),
        children: [
          /* @__PURE__ */ l("span", { style: Qr, children: (d == null ? void 0 : d.label) ?? "" }),
          /* @__PURE__ */ l("span", { "aria-hidden": "true", style: Xr, children: "v" })
        ]
      }
    ),
    r && /* @__PURE__ */ l("div", { role: "listbox", style: Zr, children: i.map((c) => {
      const u = c.value === e;
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": u,
          style: { ...eo, ...u ? to : null },
          onClick: () => {
            a(c.value), n(!1);
          },
          children: c.label
        },
        c.value
      );
    }) })
  ] });
}
function Dr({ page: e, pageSize: i, total: a, totalPages: o, onPageChange: r, onPageSizeChange: n }) {
  const s = Fr(e, o);
  return /* @__PURE__ */ p("div", { style: ao, children: [
    /* @__PURE__ */ p("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ p("span", { style: lo, children: [
        "共 ",
        a,
        " 条 · 第 ",
        e,
        "/",
        o,
        " 页"
      ] }),
      /* @__PURE__ */ l(
        pn,
        {
          value: String(i),
          onChange: (d) => n(Number(d)),
          options: Pr.map((d) => ({ value: String(d), label: `${d} 条/页` })),
          style: so
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
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
      s.map(
        (d, c) => d === "..." ? /* @__PURE__ */ l("span", { style: uo, children: "···" }, `e-${c}`) : /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            style: d === e ? co : yn,
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
function Fr(e, i) {
  if (i <= 7) return Array.from({ length: i }, (o, r) => r + 1);
  const a = [1];
  e > 3 && a.push("...");
  for (let o = Math.max(2, e - 1); o <= Math.min(i - 1, e + 1); o++)
    a.push(o);
  return e < i - 2 && a.push("..."), a.push(i), a;
}
const Ur = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, qr = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 12,
  marginBottom: 20
}, Wr = {
  padding: "18px 20px",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface")
}, Or = {
  fontSize: 12,
  color: t("textSecondary"),
  fontWeight: 500,
  letterSpacing: "0.02em"
}, jr = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 8,
  letterSpacing: "-0.02em"
}, Hr = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 20px 8px"
}, Vr = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap"
}, Kr = {
  padding: "8px 12px",
  minWidth: 140,
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  background: t("bgElevated"),
  color: t("text"),
  fontSize: 13
}, Gr = {
  position: "relative",
  display: "inline-block"
}, Yr = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  fontFamily: "inherit",
  cursor: "pointer",
  outline: "none"
}, Jr = {
  borderColor: t("primary"),
  boxShadow: `0 0 0 3px ${t("primarySubtle")}`
}, Qr = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, Xr = {
  flexShrink: 0,
  color: t("textTertiary"),
  fontSize: 10,
  lineHeight: 1
}, Zr = {
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
}, eo = {
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
}, to = {
  background: t("primarySubtle"),
  color: t("primary"),
  fontWeight: 600
}, no = {
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
}, ro = {
  overflowX: "auto",
  margin: "0 -20px"
}, oo = {
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
}, io = {
  fontSize: 12,
  fontFamily: t("fontMono"),
  color: t("textSecondary")
}, ao = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 4px 6px",
  flexWrap: "wrap",
  gap: 12
}, lo = {
  fontSize: 12,
  color: t("textTertiary"),
  fontFamily: t("fontMono")
}, so = {
  fontSize: 12,
  color: t("textSecondary"),
  background: "transparent",
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: 6,
  padding: "2px 8px",
  cursor: "pointer",
  outline: "none"
}, yn = {
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
}, co = {
  ...yn,
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
const uo = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  color: t("textTertiary"),
  fontSize: 12
};
let go = 0;
function mn() {
  const [e, i] = L([]), a = de(i);
  a.current = i;
  const o = ie((d) => {
    a.current((c) => c.filter((u) => u.id !== d));
  }, []), r = ie((d, c) => {
    const u = go++;
    a.current((h) => [...h, { id: u, type: d, text: c }]), setTimeout(() => o(u), 4e3);
  }, [o]), n = ie((d) => r("success", d), [r]), s = ie((d) => r("error", d), [r]);
  return {
    toast: { success: n, error: s },
    Toaster: /* @__PURE__ */ l(ho, { messages: e, onClose: o })
  };
}
function ho({
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
  }, []), e.length === 0 ? null : /* @__PURE__ */ l("div", { style: po, children: e.map((a) => /* @__PURE__ */ l(fo, { message: a, onClose: () => i(a.id) }, a.id)) });
}
function fo({
  message: e,
  onClose: i
}) {
  const a = e.type === "success", o = t(a ? "success" : "danger"), r = t(a ? "success" : "danger");
  return /* @__PURE__ */ p(
    "div",
    {
      style: {
        ...yo,
        borderColor: r
      },
      children: [
        /* @__PURE__ */ l("span", { style: { ...mo, color: o }, children: a ? "✓" : "✕" }),
        /* @__PURE__ */ l("span", { style: { ...bo, color: t("text") }, children: e.text }),
        /* @__PURE__ */ l("button", { onClick: i, style: So, "aria-label": m("关闭"), children: "×" })
      ]
    }
  );
}
const po = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 1e4,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none"
}, yo = {
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
}, mo = {
  fontSize: 16,
  fontWeight: 700,
  width: 18,
  textAlign: "center",
  flexShrink: 0
}, bo = {
  flex: 1,
  fontSize: 13,
  lineHeight: 1.4
}, So = {
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
function bn(e, i) {
  var o;
  const a = window;
  return (o = a.airgate) != null && o.confirm ? a.airgate.confirm(e, i) : Promise.resolve(window.confirm(e));
}
function xo() {
  const [e, i] = L([]), [a, o] = L([]), [r, n] = L(!0), [s, d] = L(null), [c, u] = L(null), { toast: h, Toaster: f } = mn(), b = ie(() => {
    n(!0), d(null), F.adminListProviders().then((g) => {
      i(g.providers || []), o(g.kinds || []);
    }).catch((g) => d(String((g == null ? void 0 : g.message) || g))).finally(() => n(!1));
  }, []);
  U(b, [b]);
  const v = (g) => {
    u({
      mode: "create",
      id: "",
      kind: g.kind,
      enabled: !0,
      config: ko(g)
    });
  }, S = (g) => {
    u({
      mode: "edit",
      id: g.id,
      originalId: g.id,
      kind: g.kind,
      enabled: g.enabled,
      config: { ...g.config }
    });
  }, _ = async (g) => {
    if (await bn(`确认删除服务商 ${g}？此操作无法撤销。`, { title: "删除服务商", danger: !0 }))
      try {
        await F.adminDeleteProvider(g), h.success(`已删除 ${g}`), b();
      } catch (I) {
        h.error("删除失败: " + I.message);
      }
  }, y = async (g) => {
    try {
      await F.adminUpsertProvider({
        id: g.id,
        kind: g.kind,
        enabled: !g.enabled,
        config: g.config
      }), h.success(`${g.id} 已${g.enabled ? "禁用" : "启用"}`), b();
    } catch (I) {
      h.error("操作失败: " + I.message);
    }
  };
  return r ? /* @__PURE__ */ l("div", { style: Ze, children: /* @__PURE__ */ l("div", { style: Jt, children: "加载中..." }) }) : s ? /* @__PURE__ */ l("div", { style: Ze, children: /* @__PURE__ */ p("div", { style: { ...Jt, color: t("danger") }, children: [
    "加载失败: ",
    s
  ] }) }) : /* @__PURE__ */ p("div", { style: Ze, children: [
    f,
    /* @__PURE__ */ p("div", { style: Xt, children: [
      /* @__PURE__ */ l("h3", { style: Qt, children: "添加服务商" }),
      /* @__PURE__ */ l("p", { style: Co, children: "每种类型的服务商可以创建多个实例（例如 xunhu_main / xunhu_backup），便于多商户号或主备切换。" }),
      /* @__PURE__ */ l("div", { style: To, children: a.map((g) => /* @__PURE__ */ p("div", { style: Bo, children: [
        /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: g.name }),
        /* @__PURE__ */ l("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 6 }, children: g.description }),
        /* @__PURE__ */ p("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 8 }, children: [
          "支持: ",
          g.supported_methods.map(nt).join(" / ")
        ] }),
        /* @__PURE__ */ l("button", { style: { ...xn, marginTop: 12, width: "100%" }, onClick: () => v(g), children: "+ 添加" })
      ] }, g.kind)) })
    ] }),
    /* @__PURE__ */ p("div", { style: Xt, children: [
      /* @__PURE__ */ l("h3", { style: Qt, children: "已配置的服务商实例" }),
      e.length === 0 ? /* @__PURE__ */ l("p", { style: _o, children: "暂未配置任何服务商。请在上方点「+ 添加」选择类型。" }) : /* @__PURE__ */ l("div", { style: Eo, children: e.map((g) => /* @__PURE__ */ p("div", { style: Ro, children: [
        /* @__PURE__ */ p("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ p("div", { children: [
            /* @__PURE__ */ l("div", { style: { fontWeight: 600, color: t("text"), fontSize: 15 }, children: g.name || g.id }),
            /* @__PURE__ */ p("div", { style: { fontSize: 12, color: t("textTertiary"), marginTop: 4, fontFamily: t("fontMono") }, children: [
              g.id,
              " · ",
              g.kind
            ] })
          ] }),
          /* @__PURE__ */ l("span", { style: g.is_running ? Sn : Io, children: g.is_running ? "运行中" : g.enabled ? "已启用未就绪" : "已禁用" })
        ] }),
        /* @__PURE__ */ p("div", { style: { fontSize: 12, color: t("textSecondary"), marginTop: 12 }, children: [
          "支持: ",
          g.supported_methods.map(nt).join(" / ")
        ] }),
        /* @__PURE__ */ p("div", { style: { display: "flex", gap: 8, marginTop: 16 }, children: [
          /* @__PURE__ */ l("button", { style: be, onClick: () => S(g), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: be, onClick: () => y(g), children: g.enabled ? "禁用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...be, color: t("danger") }, onClick: () => _(g.id), children: "删除" })
        ] })
      ] }, g.id)) })
    ] }),
    c && /* @__PURE__ */ l(
      wo,
      {
        editing: c,
        kinds: a,
        onCancel: () => u(null),
        onSaved: (g) => {
          u(null), h.success(g), b();
        },
        onError: (g) => h.error(g)
      }
    )
  ] });
}
function wo({
  editing: e,
  kinds: i,
  onCancel: a,
  onSaved: o,
  onError: r
}) {
  const [n, s] = L(e), [d, c] = L(!1), u = kn(() => i.find((f) => f.kind === n.kind), [i, n.kind]), h = async () => {
    if (!u) {
      r("未知的服务商类型");
      return;
    }
    for (const f of u.field_descriptors)
      if (f.required && !n.config[f.key]) {
        r(`「${f.label}」必填`);
        return;
      }
    if (!(n.mode === "edit" && n.originalId && n.id.trim() !== n.originalId && !await bn(
      `确认将实例 ID 从「${n.originalId}」重命名为「${n.id.trim()}」？

所有历史订单的 provider_id 引用会在事务里同步更新；如果该商户号在第三方支付平台已经下过单，
已发出去的回调地址（含原 ID）会失效——平台未来回调请求会路由不到本服务。`,
      { title: "重命名服务商 ID", danger: !0 }
    ))) {
      c(!0);
      try {
        const b = (await F.adminUpsertProvider({
          id: n.id.trim(),
          original_id: n.originalId,
          kind: n.kind,
          enabled: n.enabled,
          config: n.config
        })).id || n.id.trim();
        o(n.mode === "create" ? `已创建 ${b}` : `已更新 ${b}`);
      } catch (f) {
        r("保存失败: " + f.message);
      } finally {
        c(!1);
      }
    }
  };
  return /* @__PURE__ */ l("div", { style: Ao, onClick: a, children: /* @__PURE__ */ p("div", { style: zo, onClick: (f) => f.stopPropagation(), children: [
    /* @__PURE__ */ p("div", { style: Lo, children: [
      /* @__PURE__ */ p("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600 }, children: [
        n.mode === "create" ? "添加" : "编辑",
        "服务商 - ",
        (u == null ? void 0 : u.name) || n.kind
      ] }),
      /* @__PURE__ */ l("button", { style: No, onClick: a, children: "×" })
    ] }),
    /* @__PURE__ */ p("div", { style: $o, children: [
      /* @__PURE__ */ l(
        Xe,
        {
          label: "实例 ID",
          description: n.mode === "edit" ? "可修改。改名时后端会在事务里同步更新所有历史订单的 provider_id 引用，回调路径也会立即指向新名字。" : "可选。留空则自动生成 epay_xunhu_1 之类的序号；也可以填一个有意义的名字如 xunhu_main / xunhu_backup 便于多商户号区分。",
          children: /* @__PURE__ */ l(
            "input",
            {
              type: "text",
              value: n.id,
              onChange: (f) => s({ ...n, id: f.target.value }),
              placeholder: n.mode === "create" ? "留空自动生成" : "",
              style: { ...et, fontFamily: t("fontMono"), fontSize: 12 }
            }
          )
        }
      ),
      /* @__PURE__ */ l(Xe, { label: "启用", children: /* @__PURE__ */ p("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: [
        /* @__PURE__ */ l(
          "input",
          {
            type: "checkbox",
            checked: n.enabled,
            onChange: (f) => s({ ...n, enabled: f.target.checked })
          }
        ),
        /* @__PURE__ */ l("span", { style: { fontSize: 13, color: t("textSecondary") }, children: "勾选后该服务商参与支付路由" })
      ] }) }),
      u == null ? void 0 : u.field_descriptors.map((f) => /* @__PURE__ */ l(Xe, { label: f.label, description: f.description, required: f.required, children: f.type === "textarea" ? /* @__PURE__ */ l(
        "textarea",
        {
          value: n.config[f.key] || "",
          onChange: (b) => s({ ...n, config: { ...n.config, [f.key]: b.target.value } }),
          placeholder: f.placeholder,
          style: { ...et, minHeight: 120, fontFamily: t("fontMono"), fontSize: 12 }
        }
      ) : f.type === "bool" ? /* @__PURE__ */ l("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: /* @__PURE__ */ l(
        "input",
        {
          type: "checkbox",
          checked: n.config[f.key] === "true",
          onChange: (b) => s({ ...n, config: { ...n.config, [f.key]: b.target.checked ? "true" : "false" } })
        }
      ) }) : f.type === "method-multi" ? /* @__PURE__ */ l(
        vo,
        {
          candidates: u.supported_methods,
          value: n.config[f.key] || "",
          onChange: (b) => s({ ...n, config: { ...n.config, [f.key]: b } })
        }
      ) : /* @__PURE__ */ l(
        "input",
        {
          type: f.type === "password" ? "password" : f.type === "number" ? "number" : "text",
          value: n.config[f.key] || "",
          onChange: (b) => s({ ...n, config: { ...n.config, [f.key]: b.target.value } }),
          placeholder: f.placeholder,
          style: et
        }
      ) }, f.key))
    ] }),
    /* @__PURE__ */ p("div", { style: Do, children: [
      /* @__PURE__ */ l("button", { style: be, onClick: a, disabled: d, children: "取消" }),
      /* @__PURE__ */ l("button", { style: xn, onClick: h, disabled: d, children: d ? "保存中..." : "保存" })
    ] })
  ] }) });
}
function vo({
  candidates: e,
  value: i,
  onChange: a
}) {
  const o = new Set(i.split(",").map((n) => n.trim()).filter(Boolean)), r = (n) => {
    o.has(n) ? o.delete(n) : o.add(n);
    const s = e.filter((d) => o.has(d)).join(",");
    a(s);
  };
  return /* @__PURE__ */ p("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: [
    e.map((n) => {
      const s = o.has(n);
      return /* @__PURE__ */ p(
        "label",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            border: `1px solid ${t(s ? "primary" : "glassBorder")}`,
            borderRadius: t("radiusMd"),
            background: t(s ? "primarySubtle" : "bg"),
            color: t(s ? "primary" : "text"),
            cursor: "pointer",
            fontSize: 13,
            fontWeight: s ? 600 : 400,
            transition: "all 0.15s"
          },
          children: [
            /* @__PURE__ */ l(
              "input",
              {
                type: "checkbox",
                checked: s,
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
function Xe({
  label: e,
  description: i,
  required: a,
  children: o
}) {
  return /* @__PURE__ */ p("div", { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ p("label", { style: Po, children: [
      e,
      a && /* @__PURE__ */ l("span", { style: { color: t("danger"), marginLeft: 4 }, children: "*" })
    ] }),
    o,
    i && /* @__PURE__ */ l("div", { style: Mo, children: i })
  ] });
}
function nt(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e;
}
function ko(e) {
  const i = {};
  for (const a of e.field_descriptors)
    a.type === "bool" ? i[a.key] = "false" : i[a.key] = "";
  return i;
}
const Ze = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, Jt = {
  padding: "40px 0",
  textAlign: "center",
  color: t("textSecondary")
}, Co = {
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
}, Xt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: 20,
  marginBottom: 20
}, To = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12
}, Bo = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, Eo = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 12
}, Ro = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusMd"),
  padding: 16,
  background: t("bgElevated")
}, _o = {
  color: t("textTertiary"),
  textAlign: "center",
  padding: "24px 0",
  fontSize: 14
}, Sn = {
  padding: "2px 8px",
  borderRadius: 4,
  background: t("successSubtle"),
  color: t("success"),
  fontSize: 11,
  fontWeight: 600
}, Io = {
  ...Sn,
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
}, xn = {
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
}, Po = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: t("textSecondary"),
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.03em"
}, Mo = {
  marginTop: 6,
  fontSize: 11,
  color: t("textTertiary")
}, Ao = {
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
}, zo = {
  width: 600,
  maxWidth: "92vw",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  background: t("bgSurface"),
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  overflow: "hidden"
}, Lo = {
  padding: "16px 20px",
  borderBottom: `1px solid ${t("glassBorder")}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}, No = {
  background: "transparent",
  border: "none",
  color: t("textSecondary"),
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1
}, $o = {
  padding: 20,
  overflowY: "auto",
  flex: 1
}, Do = {
  padding: "12px 20px",
  borderTop: `1px solid ${t("glassBorder")}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8
};
function Fo() {
  const { toast: e, Toaster: i } = mn(), [a, o] = L([]), [r, n] = L(!0), [s, d] = L(!1), [c, u] = L(null), h = () => {
    n(!0), F.adminListPackages().then((y) => o(y.list || [])).catch((y) => e.error(`加载套餐失败: ${String(y.message || y)}`)).finally(() => n(!1));
  };
  U(h, []);
  const f = () => u({ id: 0, amount: "100", bonus: "15", title: "", sort: String(a.length * 10), enabled: !0 }), b = (y) => u({
    id: y.id,
    amount: String(y.amount),
    bonus: String(y.bonus_amount),
    title: y.title,
    sort: String(y.sort_order),
    enabled: y.enabled
  }), v = async () => {
    if (!c) return;
    const y = Number(c.amount), g = Number(c.bonus);
    if (!y || y <= 0) {
      e.error("套餐金额必须大于 0");
      return;
    }
    if (g < 0 || Number.isNaN(g)) {
      e.error("赠送额度不能为负数");
      return;
    }
    d(!0);
    try {
      await F.adminUpsertPackage({
        id: c.id,
        amount: y,
        bonus_amount: g,
        title: c.title.trim(),
        enabled: c.enabled,
        sort_order: Number(c.sort) || 0
      }), e.success(c.id ? "套餐已更新" : "套餐已创建"), u(null), h();
    } catch (I) {
      e.error(String(I.message || I));
    } finally {
      d(!1);
    }
  }, S = async (y) => {
    try {
      await F.adminUpsertPackage({
        id: y.id,
        amount: y.amount,
        bonus_amount: y.bonus_amount,
        title: y.title,
        enabled: !y.enabled,
        sort_order: y.sort_order
      }), e.success(y.enabled ? "套餐已停用" : "套餐已启用"), h();
    } catch (g) {
      e.error(String(g.message || g));
    }
  }, _ = async (y) => {
    if (window.confirm(`确认删除套餐「充 ${y.amount} 送 ${y.bonus_amount}」？历史订单的赠送不受影响。`))
      try {
        await F.adminDeletePackage(y.id), e.success("套餐已删除"), h();
      } catch (g) {
        e.error(String(g.message || g));
      }
  };
  return /* @__PURE__ */ p("div", { style: Uo, children: [
    i,
    /* @__PURE__ */ p("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, children: [
      /* @__PURE__ */ p("div", { children: [
        /* @__PURE__ */ l("h2", { style: qo, children: "充值套餐" }),
        /* @__PURE__ */ l("p", { style: { margin: "4px 0 0", color: t("textSecondary"), fontSize: 13 }, children: "用户点选套餐档才享赠送；自定义金额充值不参与。赠送在支付成功后以独立流水入账。" })
      ] }),
      /* @__PURE__ */ l("button", { style: en, onClick: f, children: "新增套餐" })
    ] }),
    c && /* @__PURE__ */ p("div", { style: { ...Zt, marginBottom: 20 }, children: [
      /* @__PURE__ */ l("h3", { style: Wo, children: c.id ? `编辑套餐 #${c.id}` : "新增套餐" }),
      /* @__PURE__ */ p("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }, children: [
        /* @__PURE__ */ p("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "充值金额（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 1, value: c.amount, onChange: (y) => u({ ...c, amount: y.target.value }), style: me })
        ] }),
        /* @__PURE__ */ p("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "赠送额度（$）" }),
          /* @__PURE__ */ l("input", { type: "number", min: 0, value: c.bonus, onChange: (y) => u({ ...c, bonus: y.target.value }), style: me })
        ] }),
        /* @__PURE__ */ p("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "标题（可选，按钮悬浮提示）" }),
          /* @__PURE__ */ l("input", { type: "text", maxLength: 64, value: c.title, placeholder: "如：限时特惠", onChange: (y) => u({ ...c, title: y.target.value }), style: { ...me, width: 200 } })
        ] }),
        /* @__PURE__ */ p("label", { style: le, children: [
          /* @__PURE__ */ l("span", { style: se, children: "排序（小在前）" }),
          /* @__PURE__ */ l("input", { type: "number", value: c.sort, onChange: (y) => u({ ...c, sort: y.target.value }), style: { ...me, width: 90 } })
        ] }),
        /* @__PURE__ */ p("label", { style: { ...le, flexDirection: "row", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ l("input", { type: "checkbox", checked: c.enabled, onChange: (y) => u({ ...c, enabled: y.target.checked }) }),
          /* @__PURE__ */ l("span", { style: se, children: "启用" })
        ] }),
        /* @__PURE__ */ p("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: { ...en, opacity: s ? 0.6 : 1 }, disabled: s, onClick: v, children: s ? "保存中..." : "保存" }),
          /* @__PURE__ */ l("button", { style: Oo, onClick: () => u(null), children: "取消" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ l("div", { style: Zt, children: r ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "加载中..." }) : a.length === 0 ? /* @__PURE__ */ l("p", { style: { margin: 0, color: t("textSecondary"), textAlign: "center", padding: "24px 0" }, children: "暂无套餐。点击右上角「新增套餐」创建第一个优惠档（用户端在配置前显示默认金额档）。" }) : /* @__PURE__ */ p("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
      /* @__PURE__ */ l("thead", { children: /* @__PURE__ */ l("tr", { children: ["ID", "充值金额", "赠送", "用户实得", "标题", "排序", "状态", "操作"].map((y) => /* @__PURE__ */ l("th", { style: jo, children: y }, y)) }) }),
      /* @__PURE__ */ l("tbody", { children: a.map((y) => /* @__PURE__ */ p("tr", { children: [
        /* @__PURE__ */ l("td", { style: J, children: y.id }),
        /* @__PURE__ */ l("td", { style: { ...J, fontWeight: 600 }, children: D(y.amount) }),
        /* @__PURE__ */ l("td", { style: { ...J, color: y.bonus_amount > 0 ? t("success") : t("textTertiary") }, children: y.bonus_amount > 0 ? `+${D(y.bonus_amount)}` : "—" }),
        /* @__PURE__ */ l("td", { style: J, children: D(y.amount + y.bonus_amount) }),
        /* @__PURE__ */ l("td", { style: { ...J, color: t("textSecondary") }, children: y.title || "—" }),
        /* @__PURE__ */ l("td", { style: J, children: y.sort_order }),
        /* @__PURE__ */ l("td", { style: J, children: /* @__PURE__ */ l("span", { style: y.enabled ? Ho : Vo, children: y.enabled ? "启用中" : "已停用" }) }),
        /* @__PURE__ */ l("td", { style: J, children: /* @__PURE__ */ p("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ l("button", { style: tt, onClick: () => b(y), children: "编辑" }),
          /* @__PURE__ */ l("button", { style: tt, onClick: () => S(y), children: y.enabled ? "停用" : "启用" }),
          /* @__PURE__ */ l("button", { style: { ...tt, color: t("danger") }, onClick: () => _(y), children: "删除" })
        ] }) })
      ] }, y.id)) })
    ] }) })
  ] });
}
const Uo = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: t("text")
}, qo = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "-0.01em"
}, Zt = {
  border: `1px solid ${t("glassBorder")}`,
  borderRadius: t("radiusLg"),
  background: t("bgSurface"),
  padding: "20px 24px"
}, Wo = {
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
}, Oo = {
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
}, jo = {
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
}, Ho = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("primarySubtle"),
  color: t("primary")
}, Vo = {
  fontSize: 12,
  fontWeight: 600,
  padding: "2px 10px",
  borderRadius: 999,
  background: t("bgElevated"),
  color: t("textTertiary")
}, Yo = {
  routes: [
    { path: "/recharge", component: sr },
    { path: "/orders", component: wr },
    { path: "/admin/orders", component: Ar },
    { path: "/admin/providers", component: xo },
    { path: "/admin/packages", component: Fo }
  ]
};
export {
  Yo as default
};
