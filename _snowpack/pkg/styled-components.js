import { r as react } from './common/index-5ea63421.js';
import './common/_commonjsHelpers-eb5a497e.js';

/* SNOWPACK PROCESS POLYFILL (based on https://github.com/calvinmetcalf/node-process-es6) */
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== 'undefined') {
    globalContext = window;
} else if (typeof self !== 'undefined') {
    globalContext = self;
} else {
    globalContext = {};
}
if (typeof globalContext.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = globalContext.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: {"NODE_ENV":"production"},
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var e = "-ms-";
var r = "-moz-";
var a = "-webkit-";
var n = "comm";
var c = "rule";
var s = "decl";
var i = "@import";
var h = "@keyframes";
var g = "@layer";
var k = Math.abs;
var $ = String.fromCharCode;
var m = Object.assign;
function x(e2, r2) {
  return O(e2, 0) ^ 45 ? (((r2 << 2 ^ O(e2, 0)) << 2 ^ O(e2, 1)) << 2 ^ O(e2, 2)) << 2 ^ O(e2, 3) : 0;
}
function y(e2) {
  return e2.trim();
}
function j(e2, r2) {
  return (e2 = r2.exec(e2)) ? e2[0] : e2;
}
function z(e2, r2, a2) {
  return e2.replace(r2, a2);
}
function C(e2, r2) {
  return e2.indexOf(r2);
}
function O(e2, r2) {
  return e2.charCodeAt(r2) | 0;
}
function A(e2, r2, a2) {
  return e2.slice(r2, a2);
}
function M(e2) {
  return e2.length;
}
function S(e2) {
  return e2.length;
}
function q(e2, r2) {
  return r2.push(e2), e2;
}
function B(e2, r2) {
  return e2.map(r2).join("");
}
function D(e2, r2) {
  return e2.filter(function(e3) {
    return !j(e3, r2);
  });
}
var E = 1;
var F = 1;
var G = 0;
var H = 0;
var I = 0;
var J = "";
function K(e2, r2, a2, n2, c2, s2, t2, u2) {
  return {value: e2, root: r2, parent: a2, type: n2, props: c2, children: s2, line: E, column: F, length: t2, return: "", siblings: u2};
}
function L(e2, r2) {
  return m(K("", null, null, "", null, null, 0, e2.siblings), e2, {length: -e2.length}, r2);
}
function N(e2) {
  while (e2.root)
    e2 = L(e2.root, {children: [e2]});
  q(e2, e2.siblings);
}
function P() {
  return I;
}
function Q() {
  I = H > 0 ? O(J, --H) : 0;
  if (F--, I === 10)
    F = 1, E--;
  return I;
}
function R() {
  I = H < G ? O(J, H++) : 0;
  if (F++, I === 10)
    F = 1, E++;
  return I;
}
function T() {
  return O(J, H);
}
function U() {
  return H;
}
function V(e2, r2) {
  return A(J, e2, r2);
}
function W(e2) {
  switch (e2) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function X(e2) {
  return E = F = 1, G = M(J = e2), H = 0, [];
}
function Y(e2) {
  return J = "", e2;
}
function Z(e2) {
  return y(V(H - 1, ne(e2 === 91 ? e2 + 2 : e2 === 40 ? e2 + 1 : e2)));
}
function ee(e2) {
  while (I = T())
    if (I < 33)
      R();
    else
      break;
  return W(e2) > 2 || W(I) > 3 ? "" : " ";
}
function ae(e2, r2) {
  while (--r2 && R())
    if (I < 48 || I > 102 || I > 57 && I < 65 || I > 70 && I < 97)
      break;
  return V(e2, U() + (r2 < 6 && T() == 32 && R() == 32));
}
function ne(e2) {
  while (R())
    switch (I) {
      case e2:
        return H;
      case 34:
      case 39:
        if (e2 !== 34 && e2 !== 39)
          ne(I);
        break;
      case 40:
        if (e2 === 41)
          ne(e2);
        break;
      case 92:
        R();
        break;
    }
  return H;
}
function ce(e2, r2) {
  while (R())
    if (e2 + I === 47 + 10)
      break;
    else if (e2 + I === 42 + 42 && T() === 47)
      break;
  return "/*" + V(r2, H - 1) + "*" + $(e2 === 47 ? e2 : R());
}
function se(e2) {
  while (!W(T()))
    R();
  return V(e2, H);
}
function te(e2) {
  return Y(ue("", null, null, null, [""], e2 = X(e2), 0, [0], e2));
}
function ue(e2, r2, a2, n2, c2, s2, t2, u2, i2) {
  var f2 = 0;
  var o2 = 0;
  var l2 = t2;
  var v2 = 0;
  var p2 = 0;
  var h2 = 0;
  var b2 = 1;
  var w2 = 1;
  var d2 = 1;
  var g2 = 0;
  var k2 = "";
  var m2 = c2;
  var x2 = s2;
  var y2 = n2;
  var j2 = k2;
  while (w2)
    switch (h2 = g2, g2 = R()) {
      case 40:
        if (h2 != 108 && O(j2, l2 - 1) == 58) {
          if (C(j2 += z(Z(g2), "&", "&\f"), "&\f") != -1)
            d2 = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        j2 += Z(g2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        j2 += ee(h2);
        break;
      case 92:
        j2 += ae(U() - 1, 7);
        continue;
      case 47:
        switch (T()) {
          case 42:
          case 47:
            q(fe(ce(R(), U()), r2, a2, i2), i2);
            break;
          default:
            j2 += "/";
        }
        break;
      case 123 * b2:
        u2[f2++] = M(j2) * d2;
      case 125 * b2:
      case 59:
      case 0:
        switch (g2) {
          case 0:
          case 125:
            w2 = 0;
          case 59 + o2:
            if (d2 == -1)
              j2 = z(j2, /\f/g, "");
            if (p2 > 0 && M(j2) - l2)
              q(p2 > 32 ? oe(j2 + ";", n2, a2, l2 - 1, i2) : oe(z(j2, " ", "") + ";", n2, a2, l2 - 2, i2), i2);
            break;
          case 59:
            j2 += ";";
          default:
            q(y2 = ie(j2, r2, a2, f2, o2, c2, u2, k2, m2 = [], x2 = [], l2, s2), s2);
            if (g2 === 123)
              if (o2 === 0)
                ue(j2, r2, y2, y2, m2, s2, l2, u2, x2);
              else
                switch (v2 === 99 && O(j2, 3) === 110 ? 100 : v2) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    ue(e2, y2, y2, n2 && q(ie(e2, y2, y2, 0, 0, c2, u2, k2, c2, m2 = [], l2, x2), x2), c2, x2, l2, u2, n2 ? m2 : x2);
                    break;
                  default:
                    ue(j2, y2, y2, y2, [""], x2, 0, u2, x2);
                }
        }
        f2 = o2 = p2 = 0, b2 = d2 = 1, k2 = j2 = "", l2 = t2;
        break;
      case 58:
        l2 = 1 + M(j2), p2 = h2;
      default:
        if (b2 < 1) {
          if (g2 == 123)
            --b2;
          else if (g2 == 125 && b2++ == 0 && Q() == 125)
            continue;
        }
        switch (j2 += $(g2), g2 * b2) {
          case 38:
            d2 = o2 > 0 ? 1 : (j2 += "\f", -1);
            break;
          case 44:
            u2[f2++] = (M(j2) - 1) * d2, d2 = 1;
            break;
          case 64:
            if (T() === 45)
              j2 += Z(R());
            v2 = T(), o2 = l2 = M(k2 = j2 += se(U())), g2++;
            break;
          case 45:
            if (h2 === 45 && M(j2) == 2)
              b2 = 0;
        }
    }
  return s2;
}
function ie(e2, r2, a2, n2, s2, t2, u2, i2, f2, o2, l2, v2) {
  var p2 = s2 - 1;
  var h2 = s2 === 0 ? t2 : [""];
  var b2 = S(h2);
  for (var w2 = 0, d2 = 0, g2 = 0; w2 < n2; ++w2)
    for (var $2 = 0, m2 = A(e2, p2 + 1, p2 = k(d2 = u2[w2])), x2 = e2; $2 < b2; ++$2)
      if (x2 = y(d2 > 0 ? h2[$2] + " " + m2 : z(m2, /&\f/g, h2[$2])))
        f2[g2++] = x2;
  return K(e2, r2, a2, s2 === 0 ? c : i2, f2, o2, l2, v2);
}
function fe(e2, r2, a2, c2) {
  return K(e2, r2, a2, n, $(P()), A(e2, 2, -2), 0, c2);
}
function oe(e2, r2, a2, n2, c2) {
  return K(e2, r2, a2, s, A(e2, 0, n2), A(e2, n2 + 1, -1), n2, c2);
}
function le(n2, c2, s2) {
  switch (x(n2, c2)) {
    case 5103:
      return a + "print-" + n2 + n2;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return a + n2 + n2;
    case 4789:
      return r + n2 + n2;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a + n2 + r + n2 + e + n2 + n2;
    case 5936:
      switch (O(n2, c2 + 11)) {
        case 114:
          return a + n2 + e + z(n2, /[svh]\w+-[tblr]{2}/, "tb") + n2;
        case 108:
          return a + n2 + e + z(n2, /[svh]\w+-[tblr]{2}/, "tb-rl") + n2;
        case 45:
          return a + n2 + e + z(n2, /[svh]\w+-[tblr]{2}/, "lr") + n2;
      }
    case 6828:
    case 4268:
    case 2903:
      return a + n2 + e + n2 + n2;
    case 6165:
      return a + n2 + e + "flex-" + n2 + n2;
    case 5187:
      return a + n2 + z(n2, /(\w+).+(:[^]+)/, a + "box-$1$2" + e + "flex-$1$2") + n2;
    case 5443:
      return a + n2 + e + "flex-item-" + z(n2, /flex-|-self/g, "") + (!j(n2, /flex-|baseline/) ? e + "grid-row-" + z(n2, /flex-|-self/g, "") : "") + n2;
    case 4675:
      return a + n2 + e + "flex-line-pack" + z(n2, /align-content|flex-|-self/g, "") + n2;
    case 5548:
      return a + n2 + e + z(n2, "shrink", "negative") + n2;
    case 5292:
      return a + n2 + e + z(n2, "basis", "preferred-size") + n2;
    case 6060:
      return a + "box-" + z(n2, "-grow", "") + a + n2 + e + z(n2, "grow", "positive") + n2;
    case 4554:
      return a + z(n2, /([^-])(transform)/g, "$1" + a + "$2") + n2;
    case 6187:
      return z(z(z(n2, /(zoom-|grab)/, a + "$1"), /(image-set)/, a + "$1"), n2, "") + n2;
    case 5495:
    case 3959:
      return z(n2, /(image-set\([^]*)/, a + "$1$`$1");
    case 4968:
      return z(z(n2, /(.+:)(flex-)?(.*)/, a + "box-pack:$3" + e + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a + n2 + n2;
    case 4200:
      if (!j(n2, /flex-|baseline/))
        return e + "grid-column-align" + A(n2, c2) + n2;
      break;
    case 2592:
    case 3360:
      return e + z(n2, "template-", "") + n2;
    case 4384:
    case 3616:
      if (s2 && s2.some(function(e2, r2) {
        return c2 = r2, j(e2.props, /grid-\w+-end/);
      })) {
        return ~C(n2 + (s2 = s2[c2].value), "span") ? n2 : e + z(n2, "-start", "") + n2 + e + "grid-row-span:" + (~C(s2, "span") ? j(s2, /\d+/) : +j(s2, /\d+/) - +j(n2, /\d+/)) + ";";
      }
      return e + z(n2, "-start", "") + n2;
    case 4896:
    case 4128:
      return s2 && s2.some(function(e2) {
        return j(e2.props, /grid-\w+-start/);
      }) ? n2 : e + z(z(n2, "-end", "-span"), "span ", "") + n2;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return z(n2, /(.+)-inline(.+)/, a + "$1$2") + n2;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (M(n2) - 1 - c2 > 6)
        switch (O(n2, c2 + 1)) {
          case 109:
            if (O(n2, c2 + 4) !== 45)
              break;
          case 102:
            return z(n2, /(.+:)(.+)-([^]+)/, "$1" + a + "$2-$3$1" + r + (O(n2, c2 + 3) == 108 ? "$3" : "$2-$3")) + n2;
          case 115:
            return ~C(n2, "stretch") ? le(z(n2, "stretch", "fill-available"), c2, s2) + n2 : n2;
        }
      break;
    case 5152:
    case 5920:
      return z(n2, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r2, a2, c3, s3, t2, u2, i2) {
        return e + a2 + ":" + c3 + i2 + (s3 ? e + a2 + "-span:" + (t2 ? u2 : +u2 - +c3) + i2 : "") + n2;
      });
    case 4949:
      if (O(n2, c2 + 6) === 121)
        return z(n2, ":", ":" + a) + n2;
      break;
    case 6444:
      switch (O(n2, O(n2, 14) === 45 ? 18 : 11)) {
        case 120:
          return z(n2, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + a + (O(n2, 14) === 45 ? "inline-" : "") + "box$3$1" + a + "$2$3$1" + e + "$2box$3") + n2;
        case 100:
          return z(n2, ":", ":" + e) + n2;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return z(n2, "scroll-", "scroll-snap-") + n2;
  }
  return n2;
}
function ve(e2, r2) {
  var a2 = "";
  for (var n2 = 0; n2 < e2.length; n2++)
    a2 += r2(e2[n2], n2, e2, r2) || "";
  return a2;
}
function pe(e2, r2, a2, t2) {
  switch (e2.type) {
    case g:
      if (e2.children.length)
        break;
    case i:
    case s:
      return e2.return = e2.return || e2.value;
    case n:
      return "";
    case h:
      return e2.return = e2.value + "{" + ve(e2.children, t2) + "}";
    case c:
      if (!M(e2.value = e2.props.join(",")))
        return "";
  }
  return M(a2 = ve(e2.children, t2)) ? e2.return = e2.value + "{" + a2 + "}" : "";
}
function he(e2) {
  var r2 = S(e2);
  return function(a2, n2, c2, s2) {
    var t2 = "";
    for (var u2 = 0; u2 < r2; u2++)
      t2 += e2[u2](a2, n2, c2, s2) || "";
    return t2;
  };
}
function be(e2) {
  return function(r2) {
    if (!r2.root) {
      if (r2 = r2.return)
        e2(r2);
    }
  };
}
function we(n2, t2, u2, i2) {
  if (n2.length > -1) {
    if (!n2.return)
      switch (n2.type) {
        case s:
          n2.return = le(n2.value, n2.length, u2);
          return;
        case h:
          return ve([L(n2, {value: z(n2.value, "@", "@" + a)})], i2);
        case c:
          if (n2.length)
            return B(u2 = n2.props, function(c2) {
              switch (j(c2, i2 = /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  N(L(n2, {props: [z(c2, /:(read-\w+)/, ":" + r + "$1")]}));
                  N(L(n2, {props: [c2]}));
                  m(n2, {props: D(u2, i2)});
                  break;
                case "::placeholder":
                  N(L(n2, {props: [z(c2, /:(plac\w+)/, ":" + a + "input-$1")]}));
                  N(L(n2, {props: [z(c2, /:(plac\w+)/, ":" + r + "$1")]}));
                  N(L(n2, {props: [z(c2, /:(plac\w+)/, e + "input-$1")]}));
                  N(L(n2, {props: [c2]}));
                  m(n2, {props: D(u2, i2)});
                  break;
              }
              return "";
            });
      }
  }
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var f="undefined"!=typeof process&&void 0!==process.env&&(process.env.SC_ATTR)||"data-styled",y$1="undefined"!=typeof window&&"HTMLElement"in window,v=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?process.env.SC_DISABLE_SPEEDY:"production"!=="production"),b=Object.freeze([]),N$1=Object.freeze({});function P$1(e,t,n){return void 0===n&&(n=N$1),e.theme!==n.theme&&e.theme||t||n.theme}var _=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),C$1=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,I$1=/(^-|-$)/g;function A$1(e){return e.replace(C$1,"-").replace(I$1,"")}var O$1=/(a)(d)/gi,D$1=function(e){return String.fromCharCode(e+(e>25?39:97))};function R$1(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=D$1(t%52)+n;return (D$1(t%52)+n).replace(O$1,"$1-$2")}var T$1,k$1=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},j$1=function(e){return k$1(5381,e)};function x$1(e){return R$1(j$1(e)>>>0)}function V$1(e){return e.displayName||e.name||"Component"}function M$1(e){return "string"==typeof e&&("production"==="production")}var F$1="function"==typeof Symbol&&Symbol.for,$$1=F$1?Symbol.for("react.memo"):60115,z$1=F$1?Symbol.for("react.forward_ref"):60112,B$1={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},L$1={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},G$1={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Y$1=((T$1={})[z$1]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},T$1[$$1]=G$1,T$1);function W$1(e){return ("type"in(t=e)&&t.type.$$typeof)===$$1?G$1:"$$typeof"in e?Y$1[e.$$typeof]:B$1;var t;}var q$1=Object.defineProperty,H$1=Object.getOwnPropertyNames,U$1=Object.getOwnPropertySymbols,J$1=Object.getOwnPropertyDescriptor,X$1=Object.getPrototypeOf,Z$1=Object.prototype;function K$1(e,t,n){if("string"!=typeof t){if(Z$1){var o=X$1(t);o&&o!==Z$1&&K$1(e,o,n);}var r=H$1(t);U$1&&(r=r.concat(U$1(t)));for(var s=W$1(e),i=W$1(t),a=0;a<r.length;++a){var c=r[a];if(!(c in L$1||n&&n[c]||i&&c in i||s&&c in s)){var l=J$1(t,c);try{q$1(e,c,l);}catch(e){}}}}return e}function Q$1(e){return "function"==typeof e}function ee$1(e){return "object"==typeof e&&"styledComponentId"in e}function te$1(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ne$1(e,t){if(0===e.length)return "";for(var n=e[0],o=1;o<e.length;o++)n+=t?t+e[o]:e[o];return n}function oe$1(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function re(e,t,n){if(void 0===n&&(n=!1),!n&&!oe$1(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=re(e[o],t[o]);else if(oe$1(t))for(var o in t)e[o]=re(e[o],t[o]);return e}function se$1(e,t){Object.defineProperty(e,"toString",{value:t});}function ce$1(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t," for more information.").concat(n.length>0?" Args: ".concat(n.join(", ")):""))}var le$1=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,r=o;e>=r;)if((r<<=1)<0)throw ce$1(16,"".concat(e));this.groupSizes=new Uint32Array(r),this.groupSizes.set(n),this.length=r;for(var s=o;s<r;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=(s=0,t.length);s<a;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++);},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),o=n+t;this.groupSizes[e]=0;for(var r=n;r<o;r++)this.tag.deleteRule(n);}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],o=this.indexOfGroup(e),r=o+n,s=o;s<r;s++)t+="".concat(this.tag.getRule(s)).concat("/*!sc*/\n");return t},e}(),ue$1=new Map,pe$1=new Map,de=1,he$1=function(e){if(ue$1.has(e))return ue$1.get(e);for(;pe$1.has(de);)de++;var t=de++;return ue$1.set(e,t),pe$1.set(t,e),t},fe$1=function(e,t){ue$1.set(e,t),pe$1.set(t,e);},me="style[".concat(f,"][").concat("data-styled-version",'="').concat("6.0.4",'"]'),ye=new RegExp("^".concat(f,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ve$1=function(e,t,n){for(var o,r=n.split(","),s=0,i=r.length;s<i;s++)(o=r[s])&&e.registerName(t,o);},ge=function(e,t){for(var n,o=(null!==(n=t.textContent)&&void 0!==n?n:"").split("/*!sc*/\n"),r=[],s=0,i=o.length;s<i;s++){var a=o[s].trim();if(a){var c=a.match(ye);if(c){var l=0|parseInt(c[1],10),u=c[2];0!==l&&(fe$1(u,l),ve$1(e,u,c[3]),e.getTag().insertRules(l,r)),r.length=0;}else r.push(a);}}};function Se(){return "undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null}var we$1=function(e){var t=document.head,n=e||t,o=document.createElement("style"),r=function(e){var t=Array.from(e.querySelectorAll("style[".concat(f,"]")));return t[t.length-1]}(n),s=void 0!==r?r.nextSibling:null;o.setAttribute(f,"active"),o.setAttribute("data-styled-version","6.0.4");var i=Se();return i&&o.setAttribute("nonce",i),n.insertBefore(o,s),o},Ee=function(){function e(e){this.element=we$1(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,o=t.length;n<o;n++){var r=t[n];if(r.ownerNode===e)return r}throw ce$1(17)}(this.element),this.length=0;}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return !1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),be$1=function(){function e(e){this.element=we$1(e),this.nodes=this.element.childNodes,this.length=0;}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return !1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ne=function(){function e(e){this.rules=[],this.length=0;}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Pe=y$1,_e={isServer:!y$1,useCSSOMInjection:!v},Ce=function(){function e(e,n,o){void 0===e&&(e=N$1),void 0===n&&(n={});var r=this;this.options=__assign(__assign({},_e),e),this.gs=n,this.names=new Map(o),this.server=!!e.isServer,!this.server&&y$1&&Pe&&(Pe=!1,function(e){for(var t=document.querySelectorAll(me),n=0,o=t.length;n<o;n++){var r=t[n];r&&"active"!==r.getAttribute(f)&&(ge(e,r),r.parentNode&&r.parentNode.removeChild(r));}}(this)),se$1(this,function(){return function(e){for(var t=e.getTag(),n=t.length,o="",r=function(n){var r=function(e){return pe$1.get(e)}(n);if(void 0===r)return "continue";var s=e.names.get(r),i=t.getGroup(n);if(void 0===s||0===i.length)return "continue";var a="".concat(f,".g").concat(n,'[id="').concat(r,'"]'),c="";void 0!==s&&s.forEach(function(e){e.length>0&&(c+="".concat(e,","));}),o+="".concat(i).concat(a,'{content:"').concat(c,'"}').concat("/*!sc*/\n");},s=0;s<n;s++)r(s);return o}(r)});}return e.registerId=function(e){return he$1(e)},e.prototype.reconstructWithOptions=function(n,o){return void 0===o&&(o=!0),new e(__assign(__assign({},this.options),n),this.gs,o&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Ne(n):t?new Ee(n):new be$1(n)}(this.options),new le$1(e)));var e;},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(he$1(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(he$1(e),n);},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},e.prototype.clearRules=function(e){this.getTag().clearGroup(he$1(e)),this.clearNames(e);},e.prototype.clearTag=function(){this.tag=void 0;},e}(),Ie=/&/g,Ae=/^\s*\/\/.*$/gm;function Oe(e,t){return e.map(function(e){return "rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return "".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Oe(e.children,t)),e})}function De(e){var t,n,o,r=void 0===e?N$1:e,s=r.options,i=void 0===s?N$1:s,a=r.plugins,c$1=void 0===a?b:a,l=function(e,o,r){return r===n||r.startsWith(n)&&r.endsWith(n)&&r.replaceAll(n,"").length>0?".".concat(t):e},u=c$1.slice();u.push(function(e){e.type===c&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Ie,n).replace(o,l));}),i.prefix&&u.push(we),u.push(pe);var p=function(e,r,s,a){void 0===r&&(r=""),void 0===s&&(s=""),void 0===a&&(a="&"),t=a,n=r,o=new RegExp("\\".concat(n,"\\b"),"g");var c=e.replace(Ae,""),l=te(s||r?"".concat(s," ").concat(r," { ").concat(c," }"):c);i.namespace&&(l=Oe(l,i.namespace));var p=[];return ve(l,he(u.concat(be(function(e){return p.push(e)})))),p};return p.hash=c$1.length?c$1.reduce(function(e,t){return t.name||ce$1(15),k$1(e,t.name)},5381).toString():"",p}var Re=new Ce,Te=De(),ke=react.createContext({shouldForwardProp:void 0,styleSheet:Re,stylis:Te}),je=ke.Consumer,xe=react.createContext(void 0);function Ve(){return react.useContext(ke)}var Fe=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Te);var o=n.name+t.hash;e.hasNameForId(n.id,o)||e.insertRules(n.id,o,t(n.rules,o,"@keyframes"));},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,se$1(this,function(){throw ce$1(12,String(n.name))});}return e.prototype.getName=function(e){return void 0===e&&(e=Te),this.name+e.hash},e}(),$e=function(e){return e>="A"&&e<="Z"};function ze(e){for(var t="",n=0;n<e.length;n++){var o=e[n];if(1===n&&"-"===o&&"-"===e[0])return e;$e(o)?t+="-"+o.toLowerCase():t+=o;}return t.startsWith("ms-")?"-"+t:t}var Be=function(e){return null==e||!1===e||""===e},Le=function(t){var n,o,r=[];for(var s in t){var i=t[s];t.hasOwnProperty(s)&&!Be(i)&&(Array.isArray(i)&&i.isCss||Q$1(i)?r.push("".concat(ze(s),":"),i,";"):oe$1(i)?r.push.apply(r,__spreadArray(__spreadArray(["".concat(s," {")],Le(i),!1),["}"],!1)):r.push("".concat(ze(s),": ").concat((n=s,null==(o=i)||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||n in unitlessKeys||n.startsWith("--")?String(o).trim():"".concat(o,"px")),";")));}return r};function Ge(e,t,n,o){if(Be(e))return [];if(ee$1(e))return [".".concat(e.styledComponentId)];if(Q$1(e)){if(!Q$1(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return [e];var r=e(t);return Ge(r,t,n,o)}var s;return e instanceof Fe?n?(e.inject(n,o),[e.getName(o)]):[e]:oe$1(e)?Le(e):Array.isArray(e)?Array.prototype.concat.apply(b,e.map(function(e){return Ge(e,t,n,o)})):[e.toString()]}function Ye(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Q$1(n)&&!ee$1(n))return !1}return !0}var We=j$1("6.0.4"),qe=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&Ye(e),this.componentId=t,this.baseHash=k$1(We,t),this.baseStyle=n,Ce.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))o=te$1(o,this.staticRulesId);else {var r=ne$1(Ge(this.rules,e,t,n)),s=R$1(k$1(this.baseHash,r)>>>0);if(!t.hasNameForId(this.componentId,s)){var i=n(r,".".concat(s),void 0,this.componentId);t.insertRules(this.componentId,s,i);}o=te$1(o,s),this.staticRulesId=s;}else {for(var a=k$1(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var u=this.rules[l];if("string"==typeof u)c+=u,"production"!=="production";else if(u){var p=ne$1(Ge(u,e,t,n));a=k$1(a,p),c+=p;}}if(c){var d=R$1(a>>>0);t.hasNameForId(this.componentId,d)||t.insertRules(this.componentId,d,n(c,".".concat(d),void 0,this.componentId)),o=te$1(o,d);}}return o},e}(),He=react.createContext(void 0),Ue=He.Consumer;var Ze={},Ke=new Set;function Qe(e,r,s){var i=ee$1(e),a=e,c=!M$1(e),p=r.attrs,d=void 0===p?b:p,h=r.componentId,f=void 0===h?function(e,t){var n="string"!=typeof e?"sc":A$1(e);Ze[n]=(Ze[n]||0)+1;var o="".concat(n,"-").concat(x$1("6.0.4"+n+Ze[n]));return t?"".concat(t,"-").concat(o):o}(r.displayName,r.parentComponentId):h,m=r.displayName,y=void 0===m?function(e){return M$1(e)?"styled.".concat(e):"Styled(".concat(V$1(e),")")}(e):m,v=r.displayName&&r.componentId?"".concat(A$1(r.displayName),"-").concat(r.componentId):r.componentId||f,g=i&&a.attrs?a.attrs.concat(d).filter(Boolean):d,S=r.shouldForwardProp;if(i&&a.shouldForwardProp){var w=a.shouldForwardProp;if(r.shouldForwardProp){var C=r.shouldForwardProp;S=function(e,t){return w(e,t)&&C(e,t)};}else S=w;}var I=new qe(s,v,i?a.componentStyle:void 0);function O(e,r){return function(e,r,s){var i=e.attrs,a=e.componentStyle,c=e.defaultProps,p=e.foldedComponentIds,d=e.styledComponentId,h=e.target,f=react.useContext(He),m=Ve(),y=e.shouldForwardProp||m.shouldForwardProp;var v=function(e,n,o){for(var r,s=__assign(__assign({},n),{className:void 0,theme:o}),i=0;i<e.length;i+=1){var a=Q$1(r=e[i])?r(s):r;for(var c in a)s[c]="className"===c?te$1(s[c],a[c]):"style"===c?__assign(__assign({},s[c]),a[c]):a[c];}return n.className&&(s.className=te$1(s.className,n.className)),s}(i,r,P$1(r,f,c)||N$1),g=v.as||h,S={};for(var w in v)void 0===v[w]||"$"===w[0]||"as"===w||"theme"===w||("forwardedAs"===w?S.as=v.forwardedAs:y&&!y(w,g)||(S[w]=v[w],y||"development"!=="production"||isPropValid(w)||Ke.has(w)||!_.has(g)||(Ke.add(w),console.warn('styled-components: it looks like an unknown prop "'.concat(w,'" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));var E=function(e,t){var n=Ve(),o=e.generateAndInjectStyles(t,n.styleSheet,n.stylis);return o}(a,v);var b=te$1(p,d);return E&&(b+=" "+E),v.className&&(b+=" "+v.className),S[M$1(g)&&!_.has(g)?"class":"className"]=b,S.ref=s,react.createElement(g,S)}(D,e,r)}var D=react.forwardRef(O);return D.attrs=g,D.componentStyle=I,D.shouldForwardProp=S,D.foldedComponentIds=i?te$1(a.foldedComponentIds,a.styledComponentId):"",D.styledComponentId=v,D.target=i?a.target:e,Object.defineProperty(D,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var o=0,r=t;o<r.length;o++)re(e,r[o],!0);return e}({},a.defaultProps,e):e;}}),se$1(D,function(){return ".".concat(D.styledComponentId)}),c&&K$1(D,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),D}function et(e,t){for(var n=[e[0]],o=0,r=t.length;o<r;o+=1)n.push(t[o],e[o+1]);return n}var tt=function(e){return Object.assign(e,{isCss:!0})};function nt(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];if(Q$1(t)||oe$1(t)){var r=t;return tt(Ge(et(b,__spreadArray([r],n,!0))))}var s=t;return 0===n.length&&1===s.length&&"string"==typeof s[0]?Ge(s):tt(Ge(et(s,n)))}function ot(n,o,r){if(void 0===r&&(r=N$1),!o)throw ce$1(1,o);var s=function(t){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return n(o,r,nt.apply(void 0,__spreadArray([t],s,!1)))};return s.attrs=function(e){return ot(n,o,__assign(__assign({},r),{attrs:Array.prototype.concat(r.attrs,e).filter(Boolean)}))},s.withConfig=function(e){return ot(n,o,__assign(__assign({},r),e))},s}var rt=function(e){return ot(Qe,e)},st=rt;_.forEach(function(e){st[e]=rt(e);});

export default st;
