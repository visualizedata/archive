var __defProp = Object.defineProperty,
  __defProps = Object.defineProperties,
  __getOwnPropDescs = Object.getOwnPropertyDescriptors,
  __getOwnPropSymbols = Object.getOwnPropertySymbols,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __propIsEnum = Object.prototype.propertyIsEnumerable,
  __defNormalProp = (e, t, r) =>
    t in e
      ? __defProp(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: r,
        })
      : (e[t] = r),
  __spreadValues = (e, t) => {
    for (var r in t || (t = {}))
      __hasOwnProp.call(t, r) && __defNormalProp(e, r, t[r])
    if (__getOwnPropSymbols)
      for (var r of __getOwnPropSymbols(t))
        __propIsEnum.call(t, r) && __defNormalProp(e, r, t[r])
    return e
  },
  __spreadProps = (e, t) => __defProps(e, __getOwnPropDescs(t)),
  __objRest = (e, t) => {
    var r = {}
    for (var n in e)
      __hasOwnProp.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n])
    if (null != e && __getOwnPropSymbols)
      for (var n of __getOwnPropSymbols(e))
        t.indexOf(n) < 0 && __propIsEnum.call(e, n) && (r[n] = e[n])
    return r
  },
  __async = (e, t, r) =>
    new Promise((n, i) => {
      var o = (e) => {
          try {
            l(r.next(e))
          } catch (t) {
            i(t)
          }
        },
        a = (e) => {
          try {
            l(r.throw(e))
          } catch (t) {
            i(t)
          }
        },
        l = (e) =>
          e.done ? n(e.value) : Promise.resolve(e.value).then(o, a)
      l((r = r.apply(e, t)).next())
    })
!(function () {
  'use strict'
  const e = (e, t = ['userway']) => {
      const r = __spreadProps(__spreadValues({}, e), { isUserWay: !0 })
      t.forEach((e) => {
        let t = window.frames[e]
        if (!t || 'function' != typeof t.postMessage)
          try {
            ;(t = document.querySelector(`iframe[name=${e}]`)),
              (t = t ? t.contentWindow : null)
          } catch (n) {
            console.error(n)
          }
        t && t.postMessage(r, '*')
      })
    },
    t = (e, t) => {
      if (e === document) return !0
      const r = e,
        n = getComputedStyle(r),
        i = r.getBoundingClientRect(),
        o = ((e) =>
          e.top >= 0 &&
          e.left >= 0 &&
          e.bottom <=
            (window.innerHeight ||
              document.documentElement.clientHeight) &&
          e.right <=
            (window.innerWidth || document.documentElement.clientWidth))(
          i
        ),
        a = 0 === i.width || 0 === i.height,
        l =
          '0' !== n.opacity &&
          'hidden' !== n.visibility &&
          'none' !== n.display &&
          'collapse' !== n.visibility
      return (
        (r.offsetWidth > 0 ||
          r.offsetHeight > 0 ||
          r.getClientRects().length > 0) &&
        (!t.shouldBeInViewport || o) &&
        !a &&
        l
      )
    },
    r = (e) => {
      if (['#text', '#comment'].includes(e.nodeName)) return !1
      let t = e.getAttribute('aria-hidden'),
        r = e.getAttribute('hidden')
      return (
        ((e) => 'none' === window.getComputedStyle(e).display)(e) ||
        'true' === t ||
        (null !== r && '' !== r)
      )
    },
    n = ['NOSCRIPT', 'SCRIPT', 'style'],
    i = (e, t) => {
      var o
      for (let a = 0; a < e.length; a++) {
        let l = e[a]
        switch (l.nodeType) {
          case Node.TEXT_NODE:
            t +=
              ' ' +
              (null == (o = l.textContent)
                ? void 0
                : o.trim().replace(/(\n|\r\n)/g, ''))
            break
          case Node.ELEMENT_NODE:
            if (n.includes(l.tagName) || r(l)) break
            const e = l.getAttribute('aria-hidden'),
              a = l.getAttribute('alt'),
              s = l.getAttribute('aria-label')
            if (!e || 'false' === e) {
              if (s) {
                t += ' ' + s
                break
              }
              a && (t += a + ' '),
                'IMG' !== l.tagName && (t = i(l.childNodes, t))
            }
        }
      }
      return t
    },
    o = (e, t = '') => {
      let r = t
      return (t = i(e.childNodes, r)).replace(/\s+/g, ' ').trim()
    },
    a = (e) => {
      let t = e.split(' '),
        r = ''
      for (let n = 0; n < t.length; n++) {
        let e = document.getElementById(t[n])
        e && (r = o(e, r))
      }
      return r
    },
    l = (e) => {
      var t, r, n
      let i =
        null !=
        (r =
          null == (t = e.getAttribute('aria-label')) ? void 0 : t.trim())
          ? r
          : ''
      const o = e.getAttribute('aria-describedby')
      if (((i += o ? u(o) : ''), i)) return i.toLowerCase()
      const a = e.getAttribute('aria-labelledby')
      if ((a && (i += u(a)), i.trim())) return i.toLowerCase()
      if (((i = null != (n = e.textContent) ? n : ''), i.trim()))
        return i.toLowerCase()
      const l = e
      if (
        ((i = l.value || ''),
        i.trim() &&
          l.type &&
          ['button', 'submit', 'reset'].includes(l.type.toLowerCase()))
      )
        return i.toLowerCase()
      if (!e.hasChildNodes()) return null
      let c = e.querySelector('img, *[role="img"]')
      return c && ((i = s(c) || ''), i.trim()) ? i.toLowerCase() : null
    },
    s = (e) => {
      const t = e.alt
      if (t && t.trim()) return t.trim()
      const r = e.getAttribute('aria-label')
      if (r && r.trim()) return r.trim()
      const n = e.getAttribute('aria-describedby')
      if (n) {
        const e = u(n)
        if (e) return e
      }
      const i = e.getAttribute('aria-labelledby')
      if (i) {
        let e = u(i)
        if (e) return e
      }
      return null
    },
    u = (e) =>
      e.split(' ').reduce((e, t) => {
        var r
        const n = document.getElementById(t.trim())
        return (
          e + (null != (r = null == n ? void 0 : n.textContent) ? r : '')
        )
      }, ''),
    c = () => 'uw' + (~~(1e8 * Math.random())).toString(16),
    d = (e, t = 0) => {
      let r = 3735928559 ^ t,
        n = 1103547991 ^ t
      for (let i, o = 0; o < e.length; o++)
        (i = e.charCodeAt(o)),
          (r = Math.imul(r ^ i, 2654435761)),
          (n = Math.imul(n ^ i, 1597334677))
      return (
        (r =
          Math.imul(r ^ (r >>> 16), 2246822507) ^
          Math.imul(n ^ (n >>> 13), 3266489909)),
        (n =
          Math.imul(n ^ (n >>> 16), 2246822507) ^
          Math.imul(r ^ (r >>> 13), 3266489909)),
        4294967296 * (2097151 & n) + (r >>> 0)
      )
    },
    p = (e, t = !1) => {
      var r
      if ('html' === e.nodeName.toLowerCase()) return '/HTML'
      if ('body' === e.nodeName.toLowerCase()) return '/HTML/BODY'
      if ('head' === e.nodeName.toLowerCase()) return '/HTML/HEAD'
      let n = 0
      const i = null == (r = e.parentElement) ? void 0 : r.children
      if (!i) return ''
      for (let o = 0; o < i.length; o++) {
        let r = i[o]
        if (r === e)
          return (
            p(e.parentElement, !0) +
            `/${e.tagName}[${n + 1}]` +
            (t ? '' : m(e))
          )
        r.tagName === e.tagName && n++
      }
      return ''
    }
  function m(e) {
    const t = { s: 'src', h: 'href' },
      r = e.innerText ? d(e.innerText) : ''
    return Object.keys(t).reduce((r, n) => {
      const i = t[n],
        o = e.getAttribute(i) || ''
      return e.hasAttribute && e.hasAttribute(i) && '' !== o
        ? r + ';' + n + ':' + d(o)
        : r
    }, '|' + r)
  }
  const f = new RegExp('^(data:)'),
    g = new RegExp('(.)(gif|jpe?g|tiff?|png|webp|bmp)', 'i'),
    b = (e) => {
      if (f.test(e)) return e
      e &&
        (e = e.replace(/^(http|https)(:\/\/)/, '').replace(/^(www\.)/, ''))
      const t = e.match(g)
      return (null == t ? void 0 : t.index) &&
        (null == t ? void 0 : t.length)
        ? e.substring(0, t.index + t[0].length)
        : e.split('?')[0]
    },
    h = (e, t, r = !1) =>
      e
        .reduce((e, n) => {
          const i =
            r && n.position ? ':nth-of-type(' + n.position + ')' : ''
          return (e += n.tag + i + (n.idx >= t ? '>' : ' '))
        }, '')
        .slice(0, -1),
    A = (e, t) => {
      if (null === t) return !0
      const r = e.innerText ? d(e.innerText).toString() : ''
      if (t.innerText.toString() !== r) return !1
      const n = e.hasAttribute('href')
        ? d(e.getAttribute('href')).toString()
        : ''
      if (t.href && t.href !== n) return !1
      const i = e.hasAttribute('src')
        ? d(e.getAttribute('src')).toString()
        : ''
      return !t.src || t.src === i
    },
    E = (e, t = null, r) => {
      const n = ((i = e), [].slice.call(document.querySelectorAll(i)))
      var i
      if (1 === n.length) {
        if (null == r.params) return n[0]
        if (A(n[0], t)) return n[0]
      }
      if (n.length > 1) {
        if (null == r.params) return null
        const e = n.filter((e) => A(e, t))
        if (1 === e.length) return e[0]
      }
      return null
    }
  var y = ((e) => (
    (e[(e.Strict = 0)] = 'Strict'),
    (e[(e.Medium = 1)] = 'Medium'),
    (e[(e.Loose = 2)] = 'Loose'),
    e
  ))(y || {})
  const v = { i: 'innerText', s: 'src', h: 'href' },
    T = (e) => {
      const [t, r] = e.split('|')
      let n = { innerText: '' }
      if (r) {
        const [e, ...t] = r.split(';')
        ;(n.innerText = e),
          t.forEach((e) => {
            const [t, r] = e.split(':')
            n[v[t]] = r
          })
      }
      return { xpath: t, params: n }
    },
    N = (e) => {
      const { xpath: t, params: r } = T(e),
        n = ((e, t) => {
          const r = ('/' === e[0] ? e.slice(1) : e).split('/')
          return r.map((e, n) => {
            const i = e.toLowerCase(),
              [, o, a] = i.match(/(\S+)\[(\S+)?\]/) || [, i],
              l = r.length - 1 === n,
              s = { idx: n, tag: o }
            return a && (s.position = +a), l && t && (s.params = t), s
          })
        })(t, r)
      return ((e, t = 4) => {
        let r = e.length - 2 - t
        const n = e[e.length - 1]
        let i
        const o = n.params
        if (r < 0) {
          i = h(e, 0, !0)
          return E(i, o, n) || ((i = h(e, 0)), E(i, o, n))
        }
        const a = (a) => {
            for (r = e.length - 2 - t; r >= 0; r--) {
              i =
                a === y.Loose
                  ? h(
                      e.slice(0, 2).concat(...e.slice(-r - t)),
                      e.length - t
                    )
                  : h(e, e.length - t - r - 1, a === y.Strict)
              const l = E(i, o, n)
              if (l) return l
            }
          },
          l = [y.Strict, y.Medium, y.Loose]
        for (let s = 0; s < l.length; s++) {
          const e = a(l[s])
          if (e) return e
        }
        return null
      })(n)
    },
    w = (e) => {
      const { xpath: t, params: r } = T(e),
        n = document.evaluate(
          t,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue
      return n && A(n, r) ? n : null
    },
    _ = (e) => {
      let t = e.closest('label'),
        r = ''
      if (t) {
        for (let e of t.childNodes)
          e.nodeType === Node.TEXT_NODE && (r += e.textContent)
        if (r.trim()) return r.trim()
      }
      if (e.id) {
        let t = ((e) => {
          const t = document.querySelectorAll('LABEL')
          for (let r = 0; r < t.length; r++)
            if (t[r].htmlFor === e) return t[r]
          return null
        })(e.id)
        if (t) return o(t, '')
      }
      const n = e.getAttribute('aria-label'),
        i = e.getAttribute('aria-labelledby')
      if (n) return n
      if (i) return a(i)
      const l = e.getAttribute('title')
      if (l) return l
      return o(e, '') || ''
    },
    x = [
      'script',
      'noscript',
      'style',
      'meta',
      'link',
      'path',
      'circle',
      'rect',
      'ellipse',
      'line',
      'polygon',
      'polyline',
      'g',
    ],
    L = ['.uwy', '.uwy *', '.uw-sl *'],
    I = ['data-uw-ignore', 'data-uw-rm-ignore'],
    R = (e) =>
      e
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;'),
    O = (e) => {
      try {
        const t = new URL(e)
        return ['http:', 'https:'].includes(t.protocol)
      } catch (t) {
        return !1
      }
    },
    S = (e) =>
      !(e instanceof HTMLElement) ||
      I.some((t) => e.hasAttribute(t)) ||
      L.some((t) => e.classList.contains(t)) ||
      x.includes(e.nodeName.toLowerCase()),
    C = (e, t) => {
      try {
        if ('childList' === t) {
          const t = [...e.addedNodes].reduce((e, t) => {
            if (t instanceof HTMLElement) {
              const r = [...t.getElementsByTagName('*')]
              return [...e, ...r]
            }
            return e
          }, [])
          return [].filter.call([...e.addedNodes, ...t], (e) => !S(e))
        }
        return 'attributes' === t ? (S(e.target) ? [] : [e.target]) : []
      } catch (r) {
        return []
      }
    },
    M = (e) =>
      __async(this, null, function* () {
        const t = yield fetch(e)
        return yield t.json()
      }),
    D = {
      AriaEditorValues: [],
      BrokenLink: [],
      Contrast: [],
      EmptyControls: [],
      ExternalLink: [],
      Forms: [],
      Headings: [],
      Language: [],
      MissingAlts: [],
      Pdfs: [],
      VagueLinks: [],
    },
    k = UserWayWidgetApp.ContextHolder.config.remediation,
    P = UserWayWidgetApp.ContextHolder.config.tunings,
    B = UserWayWidgetApp.ContextHolder.config.services,
    W = UserWayWidgetApp.ContextHolder.config.imageAlt,
    { isMobile: U, language: j } = UserWayWidgetApp.ContextHolder.config
  let H = {}
  function $(e) {
    H = __spreadValues({}, e)
  }
  function V() {
    return H
  }
  const F = () =>
      __async(this, null, function* () {
        if (null == k ? void 0 : k.consolidated) {
          const e = yield M(k.consolidated)
          return e.MissingAlts.reverse(), void $(e)
        }
        $(D)
      }),
    X = 'https://api.userway.org/api/'
  var q = ((e) => (
      (e.Remediation = 'remediation'), (e.AriaEditor = 'aria-editor'), e
    ))(q || {}),
    G = ((e) => ((e.KeyboardNavEnabled = 'app-key-nav-enabled'), e))(
      G || {}
    )
  const K = (e) => {
      const t = UserWayWidgetApp.getLib('util'),
        { registerPostMessageListener: r } = t
      return r((t) => {
        var r
        ;(null == (r = null == t ? void 0 : t.data)
          ? void 0
          : r.isUserWay) && e(t)
      })
    },
    Z = document.documentElement,
    z = {
      attributes: !0,
      attributeFilter: ['aria-label', 'alt'],
      childList: !0,
      subtree: !0,
    },
    Y = new Set(),
    Q = (e) => {
      Y.add(e)
    },
    J = new MutationObserver((e) => {
      const t = ((e) => {
        const t = []
        for (const r of e) t.push(...C(r, r.type))
        return t
      })(e)
      t.length && Y.forEach((e) => e(t))
    }),
    ee = [
      { src: 'wave.min.js', name: 'Wave' },
      { src: 'axe.min.js', name: 'BrowserStack' },
    ],
    te = [{ url: 'wave.webaim.org', name: 'Wave' }],
    re = (e, t) => {
      try {
        const r = []
        return (
          'childList' === t &&
            e.addedNodes.length &&
            e.addedNodes.forEach((e) => {
              const t = ((e) => {
                if ('script' === e.nodeName.toLowerCase()) {
                  const t = ee.find((t) => e.src.includes(t.src))
                  if (t) return t
                }
                return 'iframe' === e.nodeName.toLowerCase() &&
                  e.title.toLowerCase().includes('equalweb')
                  ? { name: 'EqualWeb' }
                  : null
              })(e)
              t && r.push(t)
            }),
          r
        )
      } catch (r) {
        return []
      }
    },
    ne = (e, t) =>
      __async(this, null, function* () {
        const { account: r } = UserWayWidgetApp.ContextHolder.config,
          n = {
            date: new Date().toISOString(),
            url: window.location.href,
            scannerName: e,
            a11yScore: t,
          }
        yield fetch(`${X}scaner-activity/${r}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(n),
        }).catch((e) => {
          console.log(e)
        })
      }),
    ie = (e) => {
      try {
        UserWayWidgetApp.getLib('scan_manager')
          .accessibilityScore()
          .then((t) => {
            ne(e, t)
          })
      } catch (t) {
        console.log(t)
      }
    },
    oe = document.documentElement,
    ae = { childList: !0, subtree: !0 },
    le = new MutationObserver((e) => {
      const t = ((e) => {
        const t = []
        for (const r of e) t.push(...re(r, r.type))
        return t
      })(e)[0]
      t && ie(t.name)
    })
  const se =
    'object' == typeof global &&
    global &&
    global.Object === Object &&
    global
  var ue =
    'object' == typeof self && self && self.Object === Object && self
  const ce = se || ue || Function('return this')()
  const de = ce.Symbol
  var pe = Object.prototype,
    me = pe.hasOwnProperty,
    fe = pe.toString,
    ge = de ? de.toStringTag : void 0
  var be = Object.prototype.toString
  var he = '[object Null]',
    Ae = '[object Undefined]',
    Ee = de ? de.toStringTag : void 0
  function ye(e) {
    return null == e
      ? void 0 === e
        ? Ae
        : he
      : Ee && Ee in Object(e)
      ? (function (e) {
          var t = me.call(e, ge),
            r = e[ge]
          try {
            e[ge] = void 0
            var n = !0
          } catch (o) {}
          var i = fe.call(e)
          return n && (t ? (e[ge] = r) : delete e[ge]), i
        })(e)
      : (function (e) {
          return be.call(e)
        })(e)
  }
  var ve = '[object Symbol]'
  var Te = /\s/
  var Ne = /^\s+/
  function we(e) {
    return e
      ? e
          .slice(
            0,
            (function (e) {
              for (var t = e.length; t-- && Te.test(e.charAt(t)); );
              return t
            })(e) + 1
          )
          .replace(Ne, '')
      : e
  }
  function _e(e) {
    var t = typeof e
    return null != e && ('object' == t || 'function' == t)
  }
  var xe = NaN,
    Le = /^[-+]0x[0-9a-f]+$/i,
    Ie = /^0b[01]+$/i,
    Re = /^0o[0-7]+$/i,
    Oe = parseInt
  function Se(e) {
    if ('number' == typeof e) return e
    if (
      (function (e) {
        return (
          'symbol' == typeof e ||
          ((function (e) {
            return null != e && 'object' == typeof e
          })(e) &&
            ye(e) == ve)
        )
      })(e)
    )
      return xe
    if (_e(e)) {
      var t = 'function' == typeof e.valueOf ? e.valueOf() : e
      e = _e(t) ? t + '' : t
    }
    if ('string' != typeof e) return 0 === e ? e : +e
    e = we(e)
    var r = Ie.test(e)
    return r || Re.test(e)
      ? Oe(e.slice(2), r ? 2 : 8)
      : Le.test(e)
      ? xe
      : +e
  }
  const Ce = function () {
    return ce.Date.now()
  }
  var Me = 'Expected a function',
    De = Math.max,
    ke = Math.min
  function Pe(e, t, r) {
    var n,
      i,
      o,
      a,
      l,
      s,
      u = 0,
      c = !1,
      d = !1,
      p = !0
    if ('function' != typeof e) throw new TypeError(Me)
    function m(t) {
      var r = n,
        o = i
      return (n = i = void 0), (u = t), (a = e.apply(o, r))
    }
    function f(e) {
      var r = e - s
      return void 0 === s || r >= t || r < 0 || (d && e - u >= o)
    }
    function g() {
      var e = Ce()
      if (f(e)) return b(e)
      l = setTimeout(
        g,
        (function (e) {
          var r = t - (e - s)
          return d ? ke(r, o - (e - u)) : r
        })(e)
      )
    }
    function b(e) {
      return (l = void 0), p && n ? m(e) : ((n = i = void 0), a)
    }
    function h() {
      var e = Ce(),
        r = f(e)
      if (((n = arguments), (i = this), (s = e), r)) {
        if (void 0 === l)
          return (function (e) {
            return (u = e), (l = setTimeout(g, t)), c ? m(e) : a
          })(s)
        if (d) return clearTimeout(l), (l = setTimeout(g, t)), m(s)
      }
      return void 0 === l && (l = setTimeout(g, t)), a
    }
    return (
      (t = Se(t) || 0),
      _e(r) &&
        ((c = !!r.leading),
        (o = (d = 'maxWait' in r) ? De(Se(r.maxWait) || 0, t) : o),
        (p = 'trailing' in r ? !!r.trailing : p)),
      (h.cancel = function () {
        void 0 !== l && clearTimeout(l), (u = 0), (n = s = i = l = void 0)
      }),
      (h.flush = function () {
        return void 0 === l ? a : b(Ce())
      }),
      h
    )
  }
  function Be(e, t, r) {
    var n = !0,
      i = !0
    if ('function' != typeof e) throw new TypeError('Expected a function')
    return (
      _e(r) &&
        ((n = 'leading' in r ? !!r.leading : n),
        (i = 'trailing' in r ? !!r.trailing : i)),
      Pe(e, t, { leading: n, maxWait: t, trailing: i })
    )
  }
  const We = 'AUTO'
  let Ue = !0
  var je = ((e) => (
      (e.TABINDEX = 'tabindex'),
      (e.ROLE = 'role'),
      (e.TYPE = 'type'),
      (e.SRC = 'src'),
      (e.ARIA_LEVEL = 'ariaLevel'),
      (e.ORIGINAL_ALT = 'originalAlt'),
      e
    ))(je || {}),
    He = ((e) => (
      (e.UNKNOWN = 'UNKNOWN'),
      (e.NOT_ALLOWED = 'NOT_ALLOWED'),
      (e.TEXT_NODE = 'TEXT_NODE'),
      (e.LANDMARK = 'LANDMARK'),
      (e.CONTROL = 'CONTROL'),
      (e.HEADING = 'HEADING'),
      (e.HAS_ALT_DESCRIPTION = 'HAS_ALT_DESCRIPTION'),
      (e.COMPOSED_TEXT_NODES = 'COMPOSED_TEXT_NODES'),
      (e.IFRAME = 'IFRAME'),
      (e.HIDDEN_FOR_READER = 'HIDDEN_FOR_READER'),
      e
    ))(He || {}),
    $e = ((e) => (
      (e.UNKNOWN = 'unknown'),
      (e.TEXT = 'text'),
      (e.IMAGE = 'image'),
      (e.HEADING = 'heading'),
      (e.FOOTER = 'footer'),
      (e.HEADER = 'header'),
      (e.NAV = 'nav'),
      (e.MAIN = 'main'),
      (e.FORM = 'form'),
      (e.LANDMARK = 'landmark'),
      (e.LINK = 'link'),
      (e.BUTTON = 'button'),
      (e.CHECKBOX = 'checkbox'),
      (e.RADIOBUTTON = 'radiobutton'),
      (e.INPUT = 'input'),
      (e.TEXTAREA = 'textarea'),
      (e.SELECT = 'select'),
      (e.ABBR = 'abbr'),
      (e.LIST_ITEM = 'list item'),
      e
    ))($e || {})
  const Ve = 'accessibility-tree-observer',
    Fe = ['uw-sl', 'uwy', 'uw-s10-reading-guide', 'uw-s12-tooltip'],
    Xe = (e, t) =>
      t.ariaLabel
        ? t.ariaLabel
        : t.ariaLabelledBy
        ? a(t.ariaLabelledBy)
        : o(e, ''),
    qe = {},
    Ge = UserWayWidgetApp.getLib('accessibility_tree_walker')
  let Ke,
    Ze = [],
    ze = 1
  const Ye = (e, t) => {
      var r
      if (
        ((Ze = []),
        ((e) => {
          const t = 3 === e.nodeType
          return (
            Fe.some((t) => !!e.closest && e.closest(`.${t}`)) ||
            (!t && e.hasAttribute('data-uw-rm-ignore'))
          )
        })(e) && !t)
      )
        return null
      const n = { node: e, type: Ge.identifyElementType(e) },
        i = ((e) => {
          if (!e || !e.type) return {}
          const { node: t } = e
          return [He.UNKNOWN, He.NOT_ALLOWED, He.TEXT_NODE].includes(
            e.type
          )
            ? { uwAtoId: t.uwAtoId }
            : {
                tagName: t.tagName,
                tabindex: t.getAttribute('tabindex') || '',
                role: t.getAttribute('role') || '',
                ariaLevel: t.getAttribute('aria-level') || '',
                ariaLabel: t.getAttribute('aria-label') || '',
                ariaLabelledBy: t.getAttribute('aria-labelledby') || '',
                type: t.getAttribute('type') || '',
                uwAtoId: t.uwAtoId,
              }
        })(n)
      Ke = Ge.identifyElementType(e)
      const l = Ke === He.HIDDEN_FOR_READER
      let s, u
      switch (
        ((Ze = ((e) => (
          e.tabindex && Ze.push({ name: je.TABINDEX, value: e.tabindex }),
          e.role && Ze.push({ name: je.ROLE, value: e.role }),
          e.type && Ze.push({ name: je.TYPE, value: e.type }),
          e.ariaLevel &&
            Ze.push({ name: je.ARIA_LEVEL, value: e.ariaLevel }),
          Ze
        ))(i)),
        l &&
          ((e, t) => {
            const r = e.cloneNode(!0)
            r.removeAttribute('aria-hidden'),
              (Ke = Ge.identifyElementType(r)),
              Ke !== He.UNKNOWN ||
                ('IMG' !== t.tagName && 'img' !== t.role) ||
                (Ke = He.HAS_ALT_DESCRIPTION)
          })(e, i),
        Ke)
      ) {
        case He.TEXT_NODE:
          ;(s = ((e) => {
            const t = $e.TEXT
            let r = ''
            e.textContent &&
              (r = e.textContent
                .trim()
                .replace(/(\n|\r\n)/g, '')
                .replace(/\s+/g, ' '))
            const n = {}
            return (
              e.parentElement && (n.parentXpath = p(e.parentElement)),
              { semanticType: t, textToRead: r, additionalParams: n }
            )
          })(e)),
            (qe.parentXpath =
              null == (r = s.additionalParams) ? void 0 : r.parentXpath)
          break
        case He.COMPOSED_TEXT_NODES:
          s = ((e, t) => ({
            semanticType: 'LI' === t.tagName ? $e.LIST_ITEM : $e.TEXT,
            textToRead: t.ariaLabel || o(e, ''),
          }))(e, i)
          break
        case He.HIDDEN_FOR_READER:
          s = { semanticType: $e.UNKNOWN, textToRead: '' }
          break
        case He.HEADING:
          s = ((e, t) => ({
            semanticType: $e.HEADING,
            textToRead: t.ariaLabel || o(e, ''),
          }))(e, i)
          break
        case He.LANDMARK:
          s = ((e) => {
            let t,
              r = ''
            e.ariaLabel
              ? (r = e.ariaLabel)
              : e.ariaLabelledBy && (r = a(e.ariaLabelledBy))
            const { tagName: n } = e,
              { role: i } = e
            return (
              (t =
                'FOOTER' === n || 'contentinfo' === i
                  ? $e.FOOTER
                  : 'HEADER' === n || 'banner' === i
                  ? $e.HEADER
                  : 'FORM' === n || 'form' === i
                  ? $e.FORM
                  : 'MAIN' === n || 'main' === i
                  ? $e.MAIN
                  : 'NAV' === n || 'navigation' === i
                  ? $e.NAV
                  : $e.LANDMARK),
              { semanticType: t, textToRead: r }
            )
          })(i)
          break
        case He.CONTROL:
          s = ((e, t) => {
            const {
              tagName: r,
              role: n,
              type: i,
              ariaLabel: o,
              ariaLabelledBy: l,
            } = t
            let s = !1,
              u = '',
              c = $e.TEXT
            return (
              'menuitem' === n || 'option' === n
                ? ((u = Xe(e, t)), (s = !0))
                : 'link' === n || ('A' === r && !n)
                ? ((c = $e.LINK), (u = Xe(e, t)), (s = !0))
                : 'button' === n || 'BUTTON' === r
                ? ((c = $e.BUTTON), (u = Xe(e, t)), (s = !0))
                : 'INPUT' !== r ||
                  ('button' !== i && 'submit' !== i && 'reset' !== i) ||
                  ((c = $e.BUTTON),
                  o ? (u = o) : l && (u = a(l)),
                  (s = !0)),
              s ||
                ((u = _(e)),
                'checkbox' === n || ('INPUT' === r && 'checkbox' === i)
                  ? (c = $e.CHECKBOX)
                  : 'radio' === n || ('INPUT' === r && 'radio' === i)
                  ? (c = $e.RADIOBUTTON)
                  : 'INPUT' === r && (c = $e.INPUT),
                'TEXTAREA' === r && (c = $e.TEXTAREA),
                'SELECT' === r && (c = $e.SELECT)),
              { semanticType: c, textToRead: u }
            )
          })(e, i)
          break
        case He.HAS_ALT_DESCRIPTION:
          ;(s = ((e, t, r) => {
            const { tagName: n, role: i, ariaLabel: o } = t,
              a = e.getAttribute('alt') || '',
              l = e.getAttribute('title') || '',
              s = e.getAttribute('data-uw-rm-ima-original') || ''
            let u = '',
              c = $e.TEXT
            const d = r
            return (
              ('IMG' !== n && 'img' !== i) ||
                ((c = $e.IMAGE),
                d.push({ name: je.SRC, value: e.src }),
                d.push({ name: je.ORIGINAL_ALT, value: s }),
                (u = o || a || s || u)),
              'ABBR' === n && ((c = $e.ABBR), (u = l)),
              { semanticType: c, textToRead: u, attributesToReturn: d }
            )
          })(e, i, Ze)),
            s.attributesToReturn && (Ze = s.attributesToReturn)
          break
        case He.UNKNOWN:
          s = ((e, t) => {
            let r = $e.TEXT
            return (
              'DIV' !== t.tagName || e.innerHTML || (r = $e.LANDMARK),
              { semanticType: r, textToRead: '' }
            )
          })(e, i)
          break
        default:
          s = { textToRead: '', semanticType: $e.TEXT }
      }
      return (
        i.uwAtoId
          ? (u = i.uwAtoId)
          : ((u = ze), (ze += 1), (n.node.uwAtoId = u)),
        __spreadValues(
          {
            id: u,
            xpath: p(e),
            label: s.textToRead.replace(/\|/g, '').trim(),
            tagName: i.tagName || '',
            type: s.semanticType,
            hidden: l,
            attributes: Ze,
            el: n.node,
          },
          qe
        )
      )
    },
    Qe = UserWayWidgetApp.getLib('accessibility_tree_walker')
  let Je = []
  const et = () => {
      let t = null
      Je = []
      do {
        const e = Qe.getNextAccessibilityTreeNode(t)
        if (!e) break
        const r = Ye(e.node)
        r && Je.push(r), (t = e.node)
      } while (t)
      ;(Je = Je.map((e) => {
        const t = e,
          { el: r } = t
        return __objRest(t, ['el'])
      })),
        e(
          {
            action: Ve,
            type: 'userway:ato-output:get',
            data: { nodes: Je, version: Date.now() },
          },
          ['uwAccessibilityEditor']
        )
    },
    tt = () => Je,
    rt = { enabled: !1 },
    nt = {
      'userway:ato-input:enable': () => {
        rt.enabled || ((rt.enabled = !0), Q(et), et())
      },
      'userway:ato-input:disable': () => {
        var e
        rt.enabled && ((rt.enabled = !1), (e = et), Y.delete(e))
      },
      'userway:ato-input:get': et,
    },
    it = {
      'automaticcoupons': /automaticcoupons/,
      'shopping.yahoo': /shopping\.yahoo/,
      'shopperapproved': /shopperapproved/,
      'rakuten': /rakuten/,
      'translate.google': /translate\.google/,
      'maps.googleapis.com': /maps\.googleapis\.com/,
      's.w.org': /s\.w\.org/,
      'avatar': /avatar/,
      'companylogos': /companylogos/,
      'favicon': /favicon/,
      'activecampaign': /lt\.php(.*)?l=open/,
      'aweber': /openrate\.aweber\.com/,
      'bananatag': /bl-1\.com/,
      'boomerang': /mailstat\.us\/tr/,
      'campaign monitor': /cmail(\d+)\.com\/t\//,
      'cirrus insight': /tracking\.cirrusinsight\.com/,
      'close': /close\.com\/email_opened/,
      'constant contact': /rs6\.net\/on\.jsp/,
      'contactmonkey': /contactmonkey\.com\/api\/v1\/tracker/,
      'convertkit': /convertkit-mail\.com\/o/,
      'critical impact': /portal\.criticalimpact\.com\/c2\//,
      'emarsys': /emarsys\.com\/e2t\/o/,
      'gem': /zen\.sr\/o/,
      'getnotify': /email81\.com\/case/,
      'getresponse': /getresponse\.com\/open\.html/,
      'growthdot': /growthdot\.com\/api\/mail-tracking/,
      'front': /app\.frontapp\.com\/(.*)?\/seen/,
      'hubspot':
        /t\.(hubspotemail|hubspotfree|signaux|senal|sidekickopen|sigopn)/,
      'icontact': /click\.icptrack\.com\/icp/,
      'intercom': /(via\.intercom\.io\/o)|(intercom-mail\.com\/via\/o)/,
      'litmus': /emltrk\.com/,
      'mailchimp': /list-manage\.com\/track/,
      'mailgun': /email\.(mailgun|mg)(.*)?\/o/,
      'mailjet': /mjt\.lu\/oo/,
      'mailspring': /getmailspring\.com\/open/,
      'mailtrack': /(mailtrack\.io\/trace)|(mltrk\.io\/pixel)/,
      'mandrill': /mandrillapp\.com\/track/,
      'marketo': /resources\.marketo\.com\/trk/,
      'mixmax': /(email|track)\.mixmax\.com/,
      'mixpanel': /api\.mixpanel\.com\/track/,
      'nethunt': /nethunt\.co(.*)?\/pixel\.gif/,
      'newton': /tr\.cloudmagic\.com/,
      'outreach': /api\/mailings\/opened/,
      'phplist': /phplist\.com\/lists\/ut\.php/,
      'polymail': /polymail\.io/,
      'postmark': /pstmrk\.it\/open/,
      'return path': /returnpath\.net\/pixel\.gif/,
      'sailthru': /sailthru\.com\/trk/,
      'salesforce': /nova\.collect\.igodigital\.com/,
      'sendgrid': /wf\/open\?upn/,
      'sendy': /sendy\/t\//,
      'streak': /mailfoogae\.appspot\.com/,
      'superhuman': /r\.superhuman\.com/,
      'thunderhead': /na5\.thunderhead\.com/,
      'tinyletter': /tinyletterapp\.com.*open\.gif/,
      'yamm': /yamm-track\.appspot/,
      'yesware': /t\.yesware\.com/,
      'zendesk sell': /futuresimple\.com\/api\/v1\/sprite\.png/,
    },
    ot = ['icon', 'cart', 'logo'],
    at = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'span',
      'a',
      'p',
      'figcaption',
      'caption',
      'div',
    ],
    lt = ['heading'],
    st = new RegExp('^(data:)'),
    ut = new RegExp(/^.+\.svg$/)
  var ct = ((e) => (
    (e.EXCLUDED_SRC = 'EXCLUDED_SRC'),
    (e.HIDDEN_FROM_SCREEN_READER = 'HIDDEN_FROM_SCREEN_READER'),
    (e.BASE64 = 'BASE64'),
    (e.SVG = 'SVG'),
    (e.SMALL_SIZE = 'SMALL_SIZE'),
    (e.MICRO_SIZE = 'MICRO_SIZE'),
    (e.WRONG_SRC = 'WRONG_SRC'),
    (e.ASPECT_RATIO = 'ASPECT_RATIO'),
    e
  ))(ct || {})
  const dt = ['SVG', 'SMALL_SIZE', 'HIDDEN_FROM_SCREEN_READER'],
    pt = 'data-uw-rm-alt-original',
    mt = 'REMEDIATION_IMAGE_MISSING_ALT',
    ft = 'data-uw-rm-alt',
    gt = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'bmp',
      'tiff',
      'tif',
      'svg',
      'webp',
      'ico',
      'apng',
      'heif',
      'heic',
      'avif',
      'eps',
      'raw',
      'cr2',
      'nef',
      'orf',
      'sr2',
    ]
  var bt = ((e) => (
    (e.CorrectAlt = 'ALT'),
    (e.Reverted = 'RT'),
    (e.Backend = 'BE'),
    (e.Excluded = 'EX'),
    (e.Hidden = 'HD'),
    (e.Base64 = 'BS64'),
    (e.Svg = 'SVG'),
    (e.Small = 'SM'),
    (e.Micro = 'MC'),
    (e.InvalidSrc = 'SRC'),
    (e.AspectRatio = 'AR'),
    (e.AI = 'AI'),
    (e.AIQuotaExceed = 'QU'),
    (e.ClosestText = 'CT'),
    (e.NotLoaded = 'NL'),
    e
  ))(bt || {})
  const ht = 'uwAccessibilityEditor',
    At = B.editorBuildUrl,
    Et = 'aria-editor',
    yt = 'data-uw-rm-ae',
    vt = 'aria-editor',
    Tt = 'REMEDIATION_EMPTY_CONTROLS',
    Nt = 'data-uw-rm-empty-ctrl',
    wt = [
      'facebook',
      'youtube',
      'whatsapp',
      'instagram',
      'twitter',
      'reddit',
      'linkedin',
      'viber',
      'pinterest',
      'telegram',
      'search',
      'cart',
      'home',
    ],
    _t = {
      prev: 'Get previous item',
      next: 'Get next item',
      scroll: 'Activate for scroll',
      top: 'Move to top',
      bottom: 'Move to bottom',
      expand: 'Expand this block',
      collapse: 'Collapse this block',
      close: 'Close this option',
    },
    xt = [{ re: /(fa-)(.+)/, replacer: '$2' }],
    Lt = 'REMEDIATION_FORM_LABEL',
    It = 'data-uw-rm-form',
    Rt = ['INPUT', 'TEXTAREA', 'SELECT'],
    Ot = ['facebook', 'google'],
    St = 'data-uw-hidden-control',
    Ct = 'hidden-control-element',
    Mt = {
      text: 'Text field',
      radio: 'Radio button',
      checkbox: 'Checkbox field',
      email: 'Please enter email address',
      url: 'Please enter url',
      tel: 'Please enter a phone number',
      password: 'Password field',
      search: 'Search field',
      date: 'Date field',
      time: 'Time field',
      image: 'Image field',
      file: 'File field',
      number: 'Number',
      range: 'Select range',
      submit: 'Submit button',
      color: 'Select color',
    },
    Dt = new Map([
      ['Name', /(name)/],
      ['Age', /(age)/],
      ['Search', /(search|srch)/],
      ['Quantity', /(qua|qty|quantity)/],
      ['Count', /(count|cnt)/],
    ]),
    kt = new Map([
      ['Search', /(search|srch)/],
      ['Select name', /(name)/],
    ]),
    Pt = 'REMEDIATION_BROKEN_LINK',
    Bt = 'data-uw-rm-brl',
    Wt = 'data-uw-original-href'
  var Ut = ((e) => (
    (e.Processed = 'PR'),
    (e.BackEndContributed = 'BE'),
    (e.Fixed = 'FX'),
    (e.FixedByCorrection = 'CR'),
    e
  ))(Ut || {})
  const jt = ['localhost', 'userway.dev', 'linkedin.com', 'youtube.com'],
    Ht = 'REMEDIATION_META_VIEWPORT',
    $t = 'uw-rm-meta-viewport',
    Vt =
      'meta[name="viewport"][content*="maximum-scale"], meta[name="viewport"][content*="user-scalable=0"], meta[name="viewport"][content*="user-scalable=no"]',
    Ft = (e) =>
      e.filter((e) => {
        var t, r
        const n = ((e) => {
          switch (e) {
            case mt:
              return 'alt'
            case Et:
              return 'ariaEditor'
            case Tt:
              return 'emptyControls'
            case Lt:
              return 'forms'
            case Pt:
              return 'brokenLinks'
            case Ht:
              return 'metaViewport'
            default:
              return null
          }
        })(e.ruleId)
        if (!n || !B.paidAi) return !0
        const i = k[n]
        if (!i) return !0
        const o =
          !1 !==
          (null == (r = null == (t = i.config) ? void 0 : t.mobile)
            ? void 0
            : r.enabled)
        return i.enabled && (!U || o)
      }),
    Xt = (() => {
      let e = !1,
        t = [],
        r = []
      const { run: n } = ((e) => {
          setTimeout(() => {
            Ue = !1
          }, 2e3)
          const t = Be((t) => e(t), 300, { leading: !0, trailing: !0 }),
            r = Pe((t) => e(t), 500, {
              maxWait: 2e3,
              leading: !0,
              trailing: !0,
            })
          return { run: (e) => (Ue ? t(e) : r(e)) }
        })((n) => {
          e ||
            ((e = !0),
            t.forEach((e) => {
              e.run(n)
            }),
            (e = !1),
            (r = []))
        }),
        i = (e) => {
          r.push(...e), n(r)
        },
        o = () => {
          const e = (() => {
            const e = x.join(','),
              t = I.map((e) => `[${e}]`).join(','),
              r = `${e},${t}`
            return [...document.body.querySelectorAll(`*:not(${r})`)]
              .filter((e) => !e.closest(t))
              .map((e) => e)
          })()
          n([...e]),
            K((e) => {
              if (!e.data) return
              const {
                data: { action: t, type: r },
              } = e
              t === Ve && nt[r] && nt[r]()
            }),
            Q(i)
        }
      return {
        run: n,
        init: () =>
          __async(this, null, function* () {
            if (
              (() => {
                var e
                if (
                  (null == (e = window.location)
                    ? void 0
                    : e.pathname.indexOf('wp-admin')) > -1
                )
                  return !0
                if (!(null == k ? void 0 : k.commonSettings)) return !1
                const { mobile: t, disabledPages: r } =
                  k.commonSettings.config
                return (
                  !(!U || !t || t.enabled) ||
                  !!(null == r
                    ? void 0
                    : r.some((e) => {
                        var t
                        return (
                          (null == (t = window.location)
                            ? void 0
                            : t.href.indexOf(e)) > -1
                        )
                      }))
                )
              })()
            )
              return
            const e = yield Promise.resolve().then(() => mi)
            ;(t = Ft(e.RulesList)), P.tech_rem_on_tab || o()
            const r = K((e) => {
              var t
              ;(null == (t = null == e ? void 0 : e.data)
                ? void 0
                : t.type) === G.KeyboardNavEnabled && (o(), r())
            })
          }),
        onDomUpdates: i,
      }
    })()
  ;(() => {
    __async(this, null, function* () {
      var e
      yield F()
      const t = null != (e = P.tech_rem_in_throttle_ms) ? e : 500
      setTimeout(() => {
        Xt.init(),
          ((e = Z, t = z) => {
            P.tech_rem_on_tab || J.observe(e, t)
            const r = K((n) => {
              var i
              ;(null == (i = null == n ? void 0 : n.data)
                ? void 0
                : i.type) === G.KeyboardNavEnabled &&
                (J.observe(e, t), r())
            })
          })()
      }, t)
    })
  })(),
    le.observe(oe, ae),
    (() => {
      const e = te.find((e) => e.url.includes(window.location.origin))
      e && ie(e.name)
    })()
  const qt = ({
      ruleId: e,
      isTargetElement: t,
      rule: r,
      postMessageApi: n,
      forceRun: i,
    }) => (
      n &&
        K((e) => {
          const t = null == e ? void 0 : e.data
          if (!t) return
          const { type: r, action: i } = t
          ;(i !== q.Remediation && i !== q.AriaEditor) ||
            (n[r] && n[r](t.data ? t.data : t))
        }),
      {
        run: (n) => {
          try {
            if (!t) return void r({ context: { elements: n } })
            const o = n.filter(
              (r) => !r.hasAttribute(`uw-ignore-${e}`) && t(r)
            )
            if (!o.length)
              return void (i && r({ context: { elements: [] } }))
            r({ context: { elements: o } })
          } catch (o) {
            console.warn(o)
          }
        },
        stop: () => {},
        rerun: () => {},
        ruleId: e,
      }
    ),
    Gt = (e) => {
      if (!e) return null
      const t = e.split('|')[0]
      return document.evaluate(
        t,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue
    },
    Kt = (e) =>
      !!['input', 'select', 'button', 'textarea', 'a'].includes(
        e.tagName.toLowerCase()
      ) ||
      ['button', 'checkbox', 'link', 'option'].includes(
        (e.getAttribute('role') || '').toLowerCase()
      ),
    Zt = (e) => {
      const t = e.getAttribute('tabindex')
      if (null !== t) {
        const e = parseInt(t, 10)
        if (!Number.isNaN(e)) return e
      }
    },
    zt = (e) => {
      if (Kt(e)) return !0
      const t = Zt(e)
      return void 0 !== t && !Number.isNaN(t) && t >= 0
    },
    Yt = (e) => !!x.includes(e.toLowerCase()),
    Qt = (e, t) =>
      ('img' === e
        ? t.getAttribute('alt')
        : t.getAttribute('aria-label')) || null,
    Jt = (e) => e.getAttribute('role') || null,
    er = (e) => e.getAttribute('aria-level') || null,
    tr = (e, t) => ('img' === e ? t.getAttribute('src') : null),
    rr = (e) => {
      if (null == e ? void 0 : e.nextElementSibling) {
        const t = e.nextElementSibling
        return Yt(t.tagName) ? rr(t) : t
      }
      return null
    },
    nr = (e) => {
      if (null == e ? void 0 : e.previousElementSibling) {
        const t = e.previousElementSibling
        return Yt(t.tagName) ? nr(t) : t
      }
      return null
    },
    ir = (e) => {
      var t
      return null != (t = e.uwAtoId) ? t : null
    },
    or = (e) => {
      if (!e.parentElement) return null
      const { parentElement: t } = e,
        r = p(t)
      return tt().find((e) => e.xpath === r) ? r : or(t)
    },
    ar = (e) => {
      const t = Array.from(e.childNodes).find((e) => e.uwAtoId)
      if (t) {
        const e = p(t)
        return tt().find((t) => t.xpath === e) ? e : null
      }
      return null
    },
    lr = (e, t) => {
      if (!e) return
      const r = e,
        { tabindex: n, el: i } = r,
        o = __objRest(r, ['tabindex', 'el']),
        a = e.el ? [...e.el.children] : [],
        l = t.filter((e) => a.includes(e.el))
      if (l.length) {
        const e = l.map((e) => lr(e, t))
        return __spreadProps(__spreadValues({}, o), { children: e })
      }
      return o
    },
    sr = (t, r = '') => {
      const n = [t]
      t.parentElement && n.push(t.parentElement)
      let i = 0
      const o = (null == t ? void 0 : t.children)
        ? [...t.children].filter((e) => !Yt(e.tagName)).reverse()
        : []
      o.length && (n.unshift(...o), (i += o.length))
      const a = rr(t)
      a && !n.includes(a) && (n.splice(i, 0, a), (i += 1))
      const l = nr(t)
      l && !n.includes(l) && n.splice(i + 1, 0, l)
      const s = n
        .map((e) => {
          const r = e.tagName.toLowerCase(),
            n = Ye(e, !0)
          if (!n) return null
          const { type: i, label: o, id: a } = n,
            l =
              'function' == typeof e.getAttribute
                ? {
                    label: Qt(r, e),
                    isHidden:
                      ((s = e),
                      'true' === s.getAttribute('aria-hidden') ||
                        'presentation' === s.getAttribute('role')),
                    role: Jt(e),
                    ariaLevel: er(e),
                    src: tr(r, e),
                    isControl: Kt(e),
                    focusable: zt(e),
                    tabindex: Zt(e),
                  }
                : {}
          var s
          return __spreadValues(
            {
              tagName: r,
              text: [...e.childNodes]
                .filter((e) => e.nodeType === Node.TEXT_NODE)
                .map((e) => {
                  var t
                  return null == (t = e.textContent) ? void 0 : t.trim()
                })
                .join(' ')
                .trim(),
              id: a,
              xpath: p(e),
              selected: e === t,
              el: e,
              semanticType: i,
              textToRead: o,
              uwAtoId: ir(e),
              accessibleParentXpath: or(e),
              accessibleChildXpath: ar(e),
            },
            l
          )
        })
        .filter(Boolean)
        .reverse()
      if (s) {
        const t = lr(s[0], s)
        t &&
          e(
            {
              action: vt,
              type: 'elements-selected',
              data: { tree: t, source: r },
            },
            [ht]
          )
      }
    }
  let ur, cr
  let dr
  const pr = (e, t) => {
      const r = 'img' === (null == e ? void 0 : e.tagName.toLowerCase())
      t && !r && e.setAttribute('aria-label', t)
    },
    mr = (e, t) => {
      const { tabindex: r, role: n, ariaLevel: i } = t
      r && e.setAttribute('tabindex', r),
        n && 'no role' !== n
          ? e.setAttribute('role', n)
          : (n && 'no role' !== n) || e.removeAttribute('role'),
        i && e.setAttribute('aria-level', i)
    },
    fr = qt({
      ruleId: Et,
      rule: () => {
        if (
          k.ariaEditor.enabled &&
          ((dr = (() => {
            let e = V().AriaEditorValues
            const t = `${d(window.location.pathname)}`
            return (
              (e = e
                .filter((e) => !e.page || e.page === t)
                .sort((e) => (e.page ? -1 : 1))),
              e
            )
          })()),
          dr)
        )
          for (const e of dr) {
            const t = Gt(e.xpath)
            if (!t) continue
            const r = t.nodeType === Node.ELEMENT_NODE,
              n = t.hasAttribute(yt) && e.processed
            if (!r || n) continue
            const { hidden: i, correction: o } = e
            i && t.setAttribute('aria-hidden', 'true'),
              pr(t, o),
              mr(t, e),
              t.setAttribute(yt, ''),
              (e.processed = !0)
          }
      },
      postMessageApi: {
        'add-aria-editor': () => {
          ;(cr = document.querySelector(`iframe[name=${ht}]`)),
            cr ||
              (ur = new Promise((e) => {
                const t = {
                  class: 'userway_iframe_aria_editor',
                  name: 'uwAccessibilityEditor',
                  title: 'Aria Editor',
                  style:
                    '\n            z-index: 2147483647;\n            position: fixed;\n            left: 0;\n            top: 0;\n            width: 100%!important;\n            max-width: 100%!important;\n            height: 100%!important;\n            max-height: 100%!important;\n            visibility: hidden;\n            opacity: 0!important;\n            border: none;\n          ',
                  src: At,
                }
                ;(cr = document.createElement('iframe')),
                  Object.entries(t).forEach(([e, t]) => {
                    null == cr || cr.setAttribute(e, t)
                  }),
                  (cr.onload = () => {
                    e()
                  }),
                  cr && document.body.appendChild(cr)
              }))
        },
        'open-aria-editor': () => {
          ur.then(() => {
            window.parent.postMessage({ action: 'close', isUserWay: !0 }),
              window.parent.postMessage({
                action: 'manageIconVisibility',
                isUserWay: !0,
                type: 'hidden',
              }),
              cr &&
                ((cr.style.visibility = 'visible'),
                (cr.style.opacity = '1')),
              e({ action: vt, type: 'aria-editor-open-request' }, [ht])
          })
        },
        'close-aria-editor': () => {
          window.parent.postMessage({ action: 'open', isUserWay: !0 }),
            window.parent.postMessage({
              action: 'manageIconVisibility',
              isUserWay: !0,
              type: 'visible',
            }),
            cr &&
              ((cr.style.visibility = 'hidden'), (cr.style.opacity = '0')),
            e({ action: vt, type: 'aria-editor-closed' }, [ht])
        },
        'editor-init': () => {
          const t = B,
            r = !(!t || (!t.CUSTOM_BRANDING && !t.WHITE_LABEL))
          e(
            {
              action: vt,
              type: 'open-aria-editor',
              data: {
                siteId: B.siteId,
                showTutorial: !0,
                whiteLabel: r,
                hash: d(window.location.pathname),
              },
            },
            [ht]
          )
        },
        'update-aria-hidden': (e) => {
          const { xpath: t, hidden: r } = e
          if (!t) return
          const n = w(t)
          ;(null == n ? void 0 : n.nodeType) === Node.ELEMENT_NODE &&
            (r
              ? n.setAttribute('aria-hidden', 'true')
              : n.removeAttribute('aria-hidden'),
            n.setAttribute(yt, ''))
        },
        'update-tabindex': (e) => {
          const { xpath: t, focusable: r, isControl: n } = e
          if (!t) return
          const i = w(t)
          ;(null == i ? void 0 : i.nodeType) === Node.ELEMENT_NODE &&
            (n
              ? i[r ? 'removeAttribute' : 'setAttribute']('tabindex', '-1')
              : i[r ? 'setAttribute' : 'removeAttribute']('tabindex', '0'),
            i.setAttribute(yt, ''))
        },
        'update-aria-label': (e) => {
          const { xpath: t, label: r } = e
          if (!t || null == r) return
          const n = w(t)
          ;(null == n ? void 0 : n.nodeType) === Node.ELEMENT_NODE &&
            (n.setAttribute('aria-label', e.label), n.setAttribute(yt, ''))
        },
        'update-aria-level': (e) => {
          const { xpath: t, ariaLevel: r } = e
          if (!t) return
          const n = w(t)
          ;(null == n ? void 0 : n.nodeType) === Node.ELEMENT_NODE &&
            (r
              ? n.setAttribute('aria-level', r)
              : n.removeAttribute('aria-level'),
            n.setAttribute(yt, ''))
        },
        'update-role': (e) => {
          const { xpath: t, role: r } = e
          if (!t) return
          const n = w(t)
          if ((null == n ? void 0 : n.nodeType) === Node.ELEMENT_NODE) {
            r && 'no role' !== r
              ? n.setAttribute('role', r)
              : n.removeAttribute('role'),
              n.setAttribute(yt, '')
          }
        },
        'select-elements-by-xpath': (e) => {
          const { xpath: t, source: r } = e
          if (!t) return
          const n = w(t)
          n && sr(n, r)
        },
        'select-elements-at-point': (e) => {
          const {
            position: { x: t, y: r },
          } = e
          let n = document.elementsFromPoint(t, r)
          const i = n.findIndex((e) => e.getAttribute('name') === ht)
          ;-1 !== i && n.splice(i, 1),
            (n = n
              .filter((e) => !['HTML', 'BODY'].includes(e.tagName))
              .slice(0, 2)),
            n.length && sr(n[0])
        },
        'update-aria-editor-config': (e) => {
          const { page: t = '', xpath: r = '' } = e,
            n = V().AriaEditorValues.findIndex(
              (e) => e.page === t && e.xpath === r
            ),
            i = V().AriaEditorValues[n],
            o = __spreadValues(
              __spreadValues({}, i),
              ((e) =>
                __spreadProps(__spreadValues({}, e), {
                  hidden: e.isHidden,
                }))(e)
            )
          ;-1 !== n
            ? (V().AriaEditorValues[n] = o)
            : V().AriaEditorValues.push(o)
        },
      },
    }),
    gr = ({ currentSrc: e, src: t }) => e || t,
    br = (e, t) => {
      try {
        const { width: r, height: n } = window.getComputedStyle(e)
        return parseInt(r, 10) > t && parseInt(n, 10) > t
      } catch (r) {
        return !1
      }
    },
    hr = (
      e,
      { decorative: t, approved: r, fixedByUserWay: n, loadingFromMS: i }
    ) => {
      var o
      return {
        src: gr(e),
        alt: e.alt,
        originalAlt: null != (o = e.getAttribute(pt)) ? o : '',
        decorative: t,
        approved: r,
        fixedByUserWay: n,
        loadingFromMS: i,
      }
    },
    Ar = (e) => {
      e.setAttribute('role', 'presentation'),
        e.removeAttribute('aria-hidden'),
        e.setAttribute('alt', '')
    },
    Er = (e) => {
      if (!e) return ''
      try {
        const { hostname: t } = new URL(e)
        return t
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\.[a-zA-Z0-9]*$/, '')
      } catch (t) {
        return ''
      }
    },
    yr = (e) => {
      const t = gr(e)
      return st.test(t)
    },
    vr = (e) => {
      const t = e.trim(),
        r = new RegExp(`\\.(${gt.join('|')})$`, 'i').test(t),
        n = t.length > 500,
        i = !t,
        o = t.split(/\s+/).length,
        a = /[0-9]{5,}/.test(t) && 1 === o,
        l = new RegExp(
          /^[!@#$%^&*()_+{}[\]`:;<>,.?~\\|\-="'/]+$/,
          'u'
        ).test(t)
      return a || r || n || i || l
    },
    Tr = (e, t) => {
      const r = t.alt.trim(),
        n = gr(t),
        i = e.find((e) => b(e.src).toLowerCase() === b(n).toLowerCase())
      if (!i || null === i.alt) return null
      const { decorative: o, alt: a, approved: l, reverted: s } = i
      if (s && !o)
        return (
          t.setAttribute(ft, bt.Reverted),
          hr(t, {
            approved: !0,
            decorative: !r,
            fixedByUserWay: !1,
            loadingFromMS: !1,
          })
        )
      const u = !(!k || 'AUTO' === k.strategy) && !l
      o && !u && Ar(t)
      const c = l || !r || vr(r)
      a && !u && c && !o && t.setAttribute('alt', a),
        t.setAttribute(ft, bt.Backend)
      const d = hr(t, {
        approved: l,
        decorative: o,
        fixedByUserWay: !0,
        loadingFromMS: !1,
      })
      return u && (d.alt = a), d
    },
    Nr = (e) => {
      const { width: t, height: r } = window.getComputedStyle(e)
      try {
        if (0 === parseFloat(t) && 0 === parseFloat(r)) return !1
      } catch (a) {
        return !1
      }
      const n = /^\d*px?/i,
        i = n.test(t),
        o = n.test(r)
      return !(!i || !o)
    },
    wr = (e) => {
      const t = gr(e),
        r = vr(e.alt),
        n = Nr(e)
      var i
      if (
        !(i = t) ||
        (!i.match(st) &&
          ![
            /^https?:\/\/.{1,256}\.[a-z]{2,6}\/.+$/gim,
            /^https?:\/\/[^:\/\s]{1,256}:\d{1,5}\/.+$/gim,
          ].some((e) => e.test(i)))
      )
        return ct.WRONG_SRC
      const o = ((e) => {
        if ('string' != typeof e) return !1
        for (const t of Object.values(it)) {
          const r = new RegExp(t, 'i')
          if (e.match(r)) return !0
        }
        return !1
      })(t)
      if (o) return ct.EXCLUDED_SRC
      if (!!n && !br(e, 15)) return ct.MICRO_SIZE
      if (
        !!n &&
        ((e) => {
          try {
            const { width: t, height: r } = window.getComputedStyle(e),
              n = parseInt(t, 10),
              i = parseInt(r, 10)
            return !!((n <= 20 && i >= 10 * n) || (i <= 20 && n >= 10 * i))
          } catch (t) {
            return !1
          }
        })(e)
      )
        return ct.ASPECT_RATIO
      if (yr(e) && r) return ct.BASE64
      if (
        'true' === e.getAttribute('aria-hidden') ||
        'presentation' === e.getAttribute('role') ||
        'none' === e.getAttribute('role')
      )
        return ct.HIDDEN_FROM_SCREEN_READER
      if (ut.test(t) && r) return ct.SVG
      return !(!n || br(e, 50)) && r ? ct.SMALL_SIZE : null
    },
    _r = (e) => {
      switch (e) {
        case ct.ASPECT_RATIO:
          return bt.AspectRatio
        case ct.BASE64:
          return bt.Base64
        case ct.EXCLUDED_SRC:
          return bt.Excluded
        case ct.SVG:
          return bt.Svg
        case ct.MICRO_SIZE:
          return bt.Micro
        case ct.SMALL_SIZE:
          return bt.Small
        case ct.WRONG_SRC:
          return bt.InvalidSrc
        case ct.HIDDEN_FROM_SCREEN_READER:
        default:
          return bt.Hidden
      }
    },
    xr = (e, t, r, n) => {
      const i = UserWayWidgetApp.getLib('remediation_manager'),
        o = UserWayWidgetApp.getLib('remediation_helper_outcome')
      if (!o.of) return
      const a = o.of(e, { items: t }, null, r, n)
      i.HelperCallbackAggregator.onHelperRemediationCompleted(a)
    },
    Lr = new Map(),
    Ir = (e, t) => {
      const r = p(e)
      Lr.set(r, t)
    },
    Rr = (e) => {
      const t = p(e)
      return Lr.get(t) || null
    },
    Or = (e) =>
      xr(
        mt,
        e,
        e.filter((e) => e.fixedByUserWay).length,
        e.filter((e) => !e.approved).length
      ),
    Sr = (e) => {
      e.hasAttribute(pt) || e.setAttribute(pt, e.alt)
    },
    Cr = (e, t = []) => {
      if (0 === e.length) return
      const { paidAi: r } = B,
        n = []
      for (const i of e) {
        const e = i,
          o = vr(e.alt),
          a = gr(e),
          l = Rr(e)
        Sr(e), ut.test(a) && r && e.setAttribute('role', 'img')
        const s = Tr(t, e)
        if (s) {
          n.push(s)
          continue
        }
        if (!r) continue
        const u = null == l ? void 0 : l.shouldBeDecorativeReason
        if (!o && !u) {
          e.setAttribute(ft, bt.CorrectAlt),
            n.push(
              hr(e, { approved: !0, decorative: !1, fixedByUserWay: !1 })
            )
          continue
        }
        if (void 0 !== u) {
          Ar(e),
            e.setAttribute(ft, _r(u)),
            u &&
              dt.includes(u) &&
              n.push(
                hr(e, { approved: !1, decorative: !0, fixedByUserWay: !0 })
              )
          continue
        }
        const c = null == l ? void 0 : l.relevantText
        if (c) {
          e.setAttribute('alt', c),
            e.setAttribute(ft, bt.ClosestText),
            n.push(
              hr(e, { approved: !1, decorative: !1, fixedByUserWay: !0 })
            )
          continue
        }
        const { quota: d, usage: p } = W
        p >= d
          ? (e.setAttribute(ft, bt.AIQuotaExceed),
            n.push(
              hr(e, { approved: !1, decorative: !1, fixedByUserWay: !0 })
            ))
          : (e.setAttribute(ft, bt.AI),
            n.push(
              hr(e, {
                approved: !1,
                decorative: !1,
                fixedByUserWay: !0,
                loadingFromMS: !0,
              })
            ))
      }
      Or(n)
    },
    Mr = (e) => {
      const t = e.replace(/^https?:\/\//, '')
      return document.querySelectorAll(
        `img[src*="${t}" i],img[srcset*="${t}" i]`
      )
    },
    Dr = (e) =>
      __async(this, null, function* () {
        const { account: t } = UserWayWidgetApp.ContextHolder.config,
          { siteId: r } = B,
          { resourceHash: n } = W,
          i = encodeURIComponent(e),
          o = yield fetch(
            `https://cdn77.api.userway.org/api/img-dscr/v2/${t}/${r}/${n}/alts.json?dto=${i}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            }
          )
        return (yield o.json()).payload
      }),
    kr = (e) => {
      const t = `(.*\\.(${gt.join('|')}))\\?.*$`,
        r = new RegExp(t),
        n = e.match(r)
      if (!n) {
        const t = new URL(e),
          r = []
        let n = !1
        return (
          t.searchParams.forEach((e, t) => {
            gt.some((t) => e.endsWith(t)) ? (n = !0) : r.push(t)
          }),
          n && r.forEach((e) => t.searchParams.delete(e)),
          n ? t.toString() : e
        )
      }
      return n && n[1] ? n[1] : e
    }
  var Pr = ((e) => ((e.RO = 'RO'), e))(Pr || {})
  const Br = (e, t) => e.src.localeCompare(t.src),
    Wr = (e, t = 1) => {
      if (t >= 15) return console.warn('Max split level exceed'), []
      const r = ((e, t) => {
          const r = Math.ceil(e.length / t),
            n = []
          for (let i = 0; i < e.length; i += r) n.push(e.slice(i, i + r))
          return n
        })(e, t),
        n = []
      for (const i of r) {
        const r = { sorted: i, tier: W.tier },
          o = JSON.stringify(r)
        if (encodeURIComponent(o).length / 1024 > 8) return Wr(e, t + 1)
        n.push(o)
      }
      return n
    },
    Ur = (e) =>
      e ? e.replace(/\n/g, '').replace(/ {2,}/g, ' ').trim() : '',
    jr = (e, t) => {
      if (!e) return null
      const r = 'next' === t.type ? e.nextSibling : e.previousSibling
      if ((null == r ? void 0 : r.nodeType) === Node.TEXT_NODE) {
        if (!Ur(r.nodeValue)) return jr(r, { type: t.type })
      }
      return r
    },
    Hr = (e) => {
      const t = e.nodeType === Node.ELEMENT_NODE,
        r =
          e instanceof Element &&
          'hide' === e.getAttribute('data-uw-rm-heading')
      if (e.nodeType === Node.TEXT_NODE) return !0
      if (t && !r) {
        const t = at.some((t) => t === e.nodeName.toLowerCase()),
          r = lt.some((t) => {
            var r
            return (
              t ===
              (null == (r = e.getAttribute('role'))
                ? void 0
                : r.toLowerCase())
            )
          })
        return t || r
      }
      return !1
    },
    $r = Array.from(
      new Set([...at, 'a', 'span', 'strong', 'em', 'b', 'i', 'q', 'mark'])
    ),
    Vr = (e) => {
      if ((null == e ? void 0 : e.nodeType) === Node.TEXT_NODE) {
        const t = Ur(e.nodeValue)
        if (t && !vr(t)) return t
      }
      if (
        (null == e ? void 0 : e.nodeType) === Node.ELEMENT_NODE &&
        $r.includes(e.tagName.toLowerCase())
      )
        for (const t of e.childNodes) {
          const e = Vr(t)
          if (e) return e
        }
      return null
    },
    Fr = (e) => {
      const t = e.nodeType === Node.ELEMENT_NODE,
        r = e.nodeType === Node.TEXT_NODE
      if (!r && !t) return !1
      if (t && 'img' === e.nodeName.toLowerCase()) return !0
      if (r) return !!Ur(e.textContent)
      const n = at.some((t) => t === e.nodeName.toLowerCase()),
        i = lt.some((t) => {
          var r
          return (
            t ===
            (null == (r = e.getAttribute('role'))
              ? void 0
              : r.toLowerCase())
          )
        })
      return n || i
    }
  let Xr = 0
  const qr = (e) => {
      const t = e.parentElement
      if (!t) return null
      if (t.getElementsByTagName('img').length > 1) return (Xr = 0), null
      if (1 === [].slice.call(t.childNodes).filter(Fr).length) return qr(t)
      const r = ((e) => {
        let t = jr(e, { type: 'next' }),
          r = jr(e, { type: 'prev' }),
          n = null,
          i = null
        for (; t || r; ) {
          t && Hr(t) && (n = Vr(t)), r && Hr(r) && (i = Vr(r))
          const e = n || i
          if (e) return e
          ;(t = jr(t, { type: 'next' })), (r = jr(r, { type: 'prev' }))
        }
        return null
      })(e)
      return r
        ? ((Xr = 0), r)
        : ((Xr += 1),
          'body' === t.tagName.toLowerCase()
            ? ((Xr = 0), null)
            : Xr < 2
            ? qr(t)
            : ((Xr = 0), null))
    },
    Gr = (e) => {
      const t = e.closest('figure')
      if (t) {
        const e = Array.from(t.children).find(
          (e) => 'figcaption' === e.tagName.toLowerCase()
        )
        if (e) {
          const t = Ur(e.textContent)
          if (t && !vr(t)) return t
        }
      }
      const r = [].slice.call(e.classList).join(' '),
        n = e.id || '',
        i = ((o = r + n).trim() && ot.find((e) => o.includes(e))) || null
      var o
      if (i) return i
      const a = qr(e)
      return a || null
    },
    Kr = (e, t) => {
      if (!Nr(e)) return !1
      const r = gr(e)
      return Er(r) !== t && !br(e, 20)
    },
    Zr = (e, t, r) => {
      e.addEventListener('load', () => {
        t()
      }),
        e.addEventListener('error', () => {
          Ar(e), e.setAttribute(ft, bt.NotLoaded), r()
        })
    },
    zr = (e) =>
      e.map(
        (e) =>
          new Promise(
            ((e) => (t, r) => {
              if (((e) => e.complete && 0 !== e.naturalHeight)(e))
                return void t(e)
              if ('lazy' === e.loading)
                return void Zr(
                  e,
                  () => t(e),
                  () => r(e)
                )
              const n = new Image()
              Zr(
                n,
                () => t(e),
                () => r(e)
              ),
                (n.src = e.src)
            })(e)
          )
      ),
    Yr = [],
    Qr = (e) => {
      if (!W) return
      const { state: t } = W
      if ('ALTS_OFF' === t) return
      const r = ((e) => {
          var t, r
          const n = []
          for (const i of e) {
            const e = gr(i),
              t = Er(e)
            if (t) {
              let e = n.find((e) => e.name === t)
              e || ((e = { name: t, weight: 0 }), n.push(e)),
                (e.weight += 1)
            }
          }
          return null !=
            (r =
              null ==
              (t = n.sort((e, t) => (e.weight < t.weight ? 1 : -1))[0])
                ? void 0
                : t.name)
            ? r
            : ''
        })(e),
        n = [],
        i = []
      for (const a of e) {
        const e = a,
          t = Kr(e, r),
          o = wr(e),
          l = vr(e.alt),
          s = (o && !dt.includes(o)) || t || yr(e),
          u = {}
        if ((o && (u.shouldBeDecorativeReason = o), s)) i.push(e)
        else {
          if (l) {
            const t = Gr(e)
            t && (u.relevantText = t)
          }
          n.push(e)
        }
        Object.keys(u).length && Ir(e, u)
      }
      try {
        const e = ((e) => {
            const t = e,
              r = t
                .filter(
                  (e, r) => r === t.findIndex((t) => gr(e) === gr(t))
                )
                .map((e) => {
                  const t = e,
                    r = t.alt.trim(),
                    n = r && !vr(r),
                    i = gr(t),
                    o = Rr(t)
                  return {
                    src: kr(i),
                    alt: t.alt.trim(),
                    dir:
                      n || wr(t) || (null == o ? void 0 : o.relevantText)
                        ? Pr.RO
                        : void 0,
                  }
                })
            return r.sort(Br), r
          })(n),
          t = Wr(e)
        if (t.length)
          for (const r of t)
            Dr(r).then((e) => {
              if (!e) return
              const { missingAlts: t } = e,
                r = n.filter((e) => t.find((t) => b(t.src) === b(gr(e))))
              Cr(r, t)
            })
      } catch (o) {
        console.error(o)
      }
      Cr(i), (Yr.length = 0)
    },
    Jr = Pe((e) => Qr(e), 1e3, {
      maxWait: 2e3,
      leading: !0,
      trailing: !0,
    }),
    en = qt({
      ruleId: mt,
      rule: ({ context: { elements: e } }) => {
        zr(e).forEach((e) => {
          e.then((e) => {
            Yr.push(e), Jr(Yr)
          }).catch(() => {})
        })
      },
      isTargetElement: (e) => {
        const t = 'img' === e.tagName.toLowerCase(),
          r = e.hasAttribute(ft)
        if (!t || r) return !1
        const n = e.getAttribute('src'),
          i = e.getAttribute('srcset')
        return !!(null != n ? n : i) || !!e.closest('picture')
      },
      postMessageApi: {
        'image-alt-update': ({
          src: e,
          decorative: t,
          alt: r,
          role: n,
        }) => {
          const i = Mr(e)
          if (i.length) {
            for (const e of i)
              e.setAttribute('alt', null != r ? r : ''),
                t
                  ? Ar(e)
                  : (('presentation' !== e.getAttribute('role') &&
                      'none' !== e.getAttribute('role')) ||
                      e.removeAttribute('role'),
                    e.hasAttribute('aria-hidden') &&
                      e.removeAttribute('aria-hidden')),
                ['link', 'button', 'heading'].includes(n) &&
                  e.setAttribute('aria-label', r)
            Or([
              hr(i[0], {
                approved: !0,
                decorative: t,
                fixedByUserWay: !1,
              }),
            ])
          }
        },
        'image-alt-revert': ({ src: e }) => {
          const t = Mr(e)
          for (const r of t) {
            const e = r.getAttribute(pt)
            null !== e && r.setAttribute('alt', e)
          }
        },
      },
    }),
    tn = (e) => {
      const { tagName: t } = e
      return 'SELECT' === t || 'TEXTAREA' === t ? t.toLowerCase() : 'text'
    },
    rn = (e) => {
      const t = e.getAttribute('id')
      if (!t) return null
      try {
        return document.querySelector(`label[for='${t}']`)
      } catch (r) {
        return null
      }
    },
    nn = (e) => {
      const t = 'string' == typeof e ? e : e.textContent
      return (
        t &&
        t
          .replace(/\r\n|\r|\n|\t/g, ' ')
          .replace(/( )+/g, ' ')
          .trim()
      )
    },
    on = (e, t) => {
      for (const [r, n] of t) if (n.test(e)) return r
      return ''
    },
    an = (e) => {
      let t = ''
      const r = e.getAttribute('placeholder'),
        n = e.getAttribute('title')
      if (r && r.trim()) return r
      if (n && n.trim()) return n
      const { classList: i, name: o, tagName: a, type: l } = e,
        s = `${[...i].join(' ') || ''} ${o || ''}`.trim()
      return (
        'text' === l && (t = on(s, Dt)),
        'SELECT' === a && (t = on(s, kt)),
        t ||
          ((e) => {
            const { tagName: t, type: r } = e
            return 'SELECT' === t
              ? 'select-multiple' === r
                ? 'Multiple select'
                : 'Single select'
              : 'TEXTAREA' === t
              ? 'Text area'
              : 'INPUT' === t && r && Mt[r]
              ? Mt[r]
              : ''
          })(e)
      )
    },
    ln = (e) => {
      if (e.parentElement) {
        const t = [...e.parentElement.querySelectorAll('label')]
        if (
          1 === t.length &&
          ((e) => {
            const t = 'LABEL' === e.tagName,
              r = e.getAttribute('for')
            return (
              t &&
              (!(null == r ? void 0 : r.trim()) ||
                !document.getElementById(r))
            )
          })(t[0])
        )
          return t[0].textContent
      }
      return null
    },
    sn = (e) => {
      const t = e.previousElementSibling
      return t &&
        ((e) => {
          var t
          return (
            ['DIV', 'SPAN', 'P'].includes(e.tagName) &&
            Boolean(null == (t = e.textContent) ? void 0 : t.trim())
          )
        })(t)
        ? (k.strategy === We &&
            ((e, t) => {
              const r = t.getAttribute('id') || c()
              t.setAttribute('id', r), e.setAttribute('aria-labelledby', r)
            })(e, t),
          t.textContent)
        : null
    },
    un = (e, t, r = !0) => {
      if (!r) return
      const n = e.closest('label'),
        i = rn(e),
        o = n || i
      if (o) {
        const e = o.querySelector('span[data-uw-reader-element]')
        if (e) e.textContent = t
        else {
          const e = ((e, t = '') => {
            const r = document.createElement('span')
            return (
              (r.textContent = e),
              r.setAttribute(
                'style',
                'color: #ffffff!important;background: #000000!important;clip: rect(1px, 1px, 1px, 1px)!important;clip-path: inset(50%)!important;height: 1px!important;width: 1px!important;margin: -1px!important;overflow: hidden!important;padding: 0!important;position: absolute!important;'
              ),
              r.setAttribute('class', t),
              r.setAttribute('data-uw-reader-element', ''),
              r.setAttribute('data-uw-rm-ignore', ''),
              r
            )
          })(t)
          o.appendChild(e)
        }
      } else
        e.hasAttribute('aria-labelledby') ||
          e.setAttribute('aria-label', t)
    },
    cn = (e) => {
      const t = e.closest('label')
      if (t) {
        const e = nn(t)
        if (e) return e
      }
      const r = rn(e)
      if (r) {
        const e = nn(r)
        if (e) return e
      }
      const n = e.getAttribute('aria-label')
      if (n) {
        const e = nn(n)
        if (e) return e
      }
      const i = e.getAttribute('aria-labelledby')
      if (i) {
        const e = ((e) => {
          var t
          const r = e.split(' '),
            n = []
          for (const i of r) {
            const e =
              null == (t = document.getElementById(i))
                ? void 0
                : t.textContent
            e && n.push(e)
          }
          return n.join(' ')
        })(i)
        if (e) {
          const t = nn(e)
          if (t) return t
        }
      }
      return null
    },
    dn = (e, t, r, n) => {
      const { Forms: i } = V(),
        o = cn(e),
        a = i.find(({ xpath: e, approved: t }) => t && +e === d(r))
      return a
        ? (un(e, a.correction, !0),
          {
            type: a.type,
            xpath: r,
            required: a.required,
            correction: a.correction,
            approved: a.approved,
            xpathHash: d(r),
            label: o,
          })
        : o
        ? (e.setAttribute(It, 'nfx'),
          {
            type: t,
            xpath: r,
            correction: o,
            approved: !0,
            xpathHash: d(r),
            label: o,
            required: n,
          })
        : null
    },
    pn = (e) => {
      ;((e, r = {}) => {
        var n, i
        const o = {
          skipParentCheck: null != (n = r.skipParentCheck) && n,
          shouldBeInViewport: null == (i = r.shouldBeInViewport) || i,
        }
        let a = e,
          l = t(a, o)
        if (!o.skipParentCheck)
          for (; l && a.parentNode && a.parentNode !== document; )
            t(a.parentNode, { shouldBeInViewport: !1 })
              ? (a = a.parentNode)
              : (l = !1)
        return l
      })(e, { shouldBeInViewport: !1 }) ||
        (e.setAttribute('aria-label', Ct),
        e.setAttribute(St, Ct),
        ((e, t) => {
          new IntersectionObserver((r, n) => {
            for (const i of r)
              i.intersectionRatio > 0 && (t(e), n.disconnect())
          }).observe(e)
        })(e, () => {
          e.hasAttribute(St) &&
            e.hasAttribute('aria-label') &&
            e.getAttribute(St) === e.getAttribute('aria-label') &&
            (e.removeAttribute(St), e.removeAttribute('aria-label'))
        }))
      const r = ln(e)
      if (r) return r
      const n = sn(e)
      if (n) return n
      const i = an(e)
      return i || null
    },
    mn = Object.keys(Mt),
    fn = qt({
      ruleId: Lt,
      rule: ({ context: { elements: e } }) => {
        const t = []
        for (const r of e) {
          r.setAttribute(It, 'fx')
          const e = r.hasAttribute('required'),
            n = k.strategy === We,
            i = p(r),
            o = tn(r),
            a = dn(r, o, i, e)
          if (a) {
            t.push(a)
            continue
          }
          const l = pn(r)
          l
            ? (un(r, l, n),
              t.push({
                type: o,
                xpath: i,
                correction: l,
                approved: !1,
                xpathHash: d(i),
                label: null,
                required: e,
              }))
            : t.push({
                type: o,
                xpath: i,
                correction: null,
                approved: !1,
                xpathHash: d(i),
                label: null,
                required: e,
              })
        }
        xr(
          Lt,
          t,
          t.filter((e) => e.approved).length,
          t.filter((e) => !e.approved).length
        )
      },
      isTargetElement: (e) => {
        const t = Rt.includes(e.tagName)
        if (e.hasAttribute(It) || !t) return !1
        const r = e.getAttribute('type')
        if (
          !(
            'SELECT' === e.tagName ||
            'TEXTAREA' === e.tagName ||
            ('INPUT' === e.tagName && !!r && mn.includes(r.toLowerCase()))
          )
        )
          return !1
        const n = e.closest('form')
        return (
          !Ot.some((e) => {
            var t
            const r =
              n &&
              (null == (t = n.getAttribute('action'))
                ? void 0
                : t.toLowerCase())
            return null == r ? void 0 : r.includes(e)
          }) || (e.setAttribute(It, 'excluded'), !1)
        )
      },
      postMessageApi: {
        'form-label-update': ({ correction: e, xpath: t }) => {
          const r = w(t.toString())
          r &&
            e &&
            (r.setAttribute('aria-label', e),
            r.removeAttribute('aria-labelledby'))
        },
      },
    }),
    gn = (e) => {
      const t = e.tagName.toLowerCase(),
        r = null == e ? void 0 : e.type,
        n = e.getAttribute('role')
      return ['a', 'button'].includes(t)
        ? 'a' === t
          ? '<link>'
          : '<button>'
        : 'input' === t && ['button', 'submit', 'reset'].includes(r)
        ? '<input>'
        : 'link' === n
        ? '<link> (role)'
        : '<button> (role)'
    },
    bn = [],
    hn = (e, t, r = !1) => {
      const n = !(null == k ? void 0 : k.strategy) || 'AUTO' === k.strategy
      var i
      return (
        (r || n) && e.setAttribute('aria-label', t),
        e.setAttribute(Nt, ''),
        (i = { correction: t, approved: r, xpath: p(e), name: gn(e) }),
        bn.push(i),
        !0
      )
    },
    An = (e, t) => {
      var r
      const n = t || e,
        i = wt.find(
          (e) => 'a' === n.tagName.toLowerCase() && n.href.includes(e)
        )
      if (i) return hn(e, i)
      const o = ((e) => {
        const t = Array.from(e.children)
        t.push(e)
        let r = []
        for (const n of t)
          r = r.concat(Array.from(n.classList).map((e) => e.toLowerCase()))
        return r
      })(n)
      let a = wt.find((e) => o.find((t) => t.includes(e)))
      if (
        (a ||
          xt.find((e) =>
            o.find((t) => {
              const r = e.re.test(t) && t.replace(e.re, e.replacer)
              return !!r && ((a = r), !0)
            })
          ),
        a)
      )
        return hn(e, a)
      const l =
          null == (r = window.getComputedStyle(n).backgroundImage)
            ? void 0
            : r.toLowerCase(),
        s = wt.find((e) => l.includes(e))
      if (s) return hn(e, s)
      const u = Object.keys(_t).find((e) => o.find((t) => t.includes(e))),
        c = u ? _t[u] : null
      return !!c && hn(e, c)
    },
    En = (e) => {
      if (!e.hasAttribute('href')) return null
      const t = e
        .getAttribute('href')
        .toLowerCase()
        .match(/^https?:\/\/(?:www\.)?([^/?#]+)/)
      return t ? t[1] : null
    },
    yn = {},
    vn = (e) => {
      __spreadValues({}, yn)[d(e.xpath)] = e
      const t = N(e.xpath)
      t && hn(t, e.correction)
    },
    Tn = qt({
      ruleId: Tt,
      rule: ({ context: { elements: e } }) => {
        const { EmptyControls: t } = V(),
          r = ((e) => {
            if (!(null == e ? void 0 : e.length)) return null
            for (const t of e) {
              const e = d(t.xpath),
                r = yn[e],
                n = t.page
              ;(!r || (r && n)) && (yn[e] = t)
            }
            return __spreadValues({}, yn)
          })(t)
        for (const i of e) {
          const e = i.getAttribute('href')
          if (
            (('a' === i.tagName.toLowerCase() ||
              'link' === i.getAttribute('role')) &&
              '' === e &&
              i.setAttribute('href', '#'),
            r)
          ) {
            const e = r[d(p(i))]
            if (e) {
              hn(i, e.correction, !0)
              continue
            }
          }
          if (!An(i)) {
            const e = i.getAttribute('role'),
              t = i.tagName.toLowerCase(),
              r = i.getAttribute('type'),
              n = i.getAttribute('alt'),
              o = i.getAttribute(pt)
            if (Array.from(i.children).find((e) => An(i, e))) continue
            const a = En(i)
            if (a) {
              hn(i, a)
              continue
            }
            if (
              (n || o) &&
              'img' === t &&
              e &&
              ['link', 'button'].includes(e)
            ) {
              hn(i, n || o)
              continue
            }
            if (
              'button' === t ||
              'button' === e ||
              ('input' === t && 'button' === r)
            ) {
              hn(i, 'button')
              continue
            }
            if ('input' === t && 'submit' === r) {
              hn(i, 'submit')
              continue
            }
            if ('input' === t && 'reset' === r) {
              hn(i, 'reset')
              continue
            }
            hn(i, 'Open this option')
          }
        }
        const n = [].slice.call(bn)
        xr(
          'REMEDIATION_EMPTY_CONTROLS',
          n,
          n.length,
          n.filter((e) => !e.approved).length
        ),
          (bn.length = 0)
      },
      isTargetElement: (e) => {
        if (e.hasAttribute(Nt)) return !1
        const t = e.tagName.toLowerCase(),
          r = e.getAttribute('role'),
          n = null == e ? void 0 : e.type,
          i = 'a' === t || 'button' === t,
          o = 'link' === r || 'button' === r,
          a = 'input' === t && ['button', 'submit', 'reset'].includes(n)
        return !(
          !(i || o || a) ||
          ((e) => {
            const t = e.querySelector('img')
            return br(t, 50)
          })(e) ||
          l(e)
        )
      },
      postMessageApi: {
        'empty-controls-update': ({ data: e }) => {
          var t
          ;(null != (t = null == e ? void 0 : e.xpath)
            ? t
            : null == e
            ? void 0
            : e.correction) && vn(e)
        },
      },
    }),
    Nn = () => {
      const { hostname: e, pathname: t } = window.location,
        r = e.replace('www.', '').split('.'),
        n = ((i = r), i.length > 1 ? i.slice(0, -1) : i).join('-')
      var i
      const o = t
        .split('/')
        .filter((e) => e)
        .join(' ')
        .replace(/^\d+|\s\d+/g, '')
        .trim()
      return (o + (o ? ' - ' : ' ') + n).trim()
    },
    wn = 'data-uw-rm-title',
    _n = 'un',
    xn = 'gn',
    Ln = (e, t) => {
      e.setAttribute(wn, t ? xn : _n)
    },
    In = qt({
      ruleId: 'header-title',
      rule: ({ context: { elements: e } }) => {
        var t, r
        if (
          e.length &&
          (null == (t = e[0].innerHTML) ? void 0 : t.trim())
        ) {
          const e = document.querySelector(`title[${wn}]`)
          return void (null == e || e.remove())
        }
        const n = document.getElementsByTagName('title')[0]
        try {
          if (n) {
            if (
              !(null == (r = n.innerHTML) ? void 0 : r.trim()) &&
              !n.hasAttribute(wn)
            ) {
              const e = Nn()
              ;(n.innerHTML = e), Ln(n, e)
            }
          } else {
            const e = document.createElement('title'),
              t = Nn()
            ;(e.innerHTML = t), Ln(e, t), document.head.appendChild(e)
          }
        } catch (i) {
          i instanceof Error && console.error(i)
        }
      },
      isTargetElement: (e) => {
        const t = 'title' === e.tagName.toLowerCase(),
          r = e.hasAttribute(wn)
        return t && !r
      },
      forceRun: !0,
    }),
    Rn = 'data-uw-rm-error-associate',
    On = [
      `div[class*="error" i]:not([${Rn}])`,
      `div[class*="message" i]:not([${Rn}])`,
      `span[class*="error" i]:not([${Rn}])`,
      `span[class*="message" i]:not([${Rn}])`,
      `p[class*="error" i]:not([${Rn}])`,
      `p[class*="message" i]:not([${Rn}])`,
    ],
    Sn = [
      `input:not([${Rn}])`,
      `select:not([${Rn}])`,
      `textarea:not([${Rn}])`,
    ],
    Cn = ['error', 'message'],
    Mn = (e) => {
      const t = e.nextElementSibling
      if (t)
        for (const i of Cn)
          if ([...t.classList].join(' ').includes(i)) return t
      const r = e.parentElement
      if (!r) return null
      if (1 !== r.querySelectorAll(Sn.join(',')).length) return null
      const n = r.querySelectorAll(On.join(','))
      return 1 !== n.length ? null : n[0]
    },
    Dn = (e, t) => {
      if (e.getAttribute('aria-describedby'))
        return void e.setAttribute(Rn, 'nfx')
      const r = t.getAttribute('id')
      if (r)
        return (
          e.setAttribute('aria-describedby', r),
          e.setAttribute(Rn, 'fx'),
          void t.setAttribute(Rn, 'fx')
        )
      const n = c()
      t.setAttribute('id', n),
        t.setAttribute(Rn, 'fx'),
        e.setAttribute('aria-describedby', n),
        e.setAttribute(Rn, 'fx')
    },
    kn = (e) => {
      for (const t of e) {
        const e = Mn(t)
        e && Dn(t, e)
      }
    },
    Pn = (e, t) => {
      const r = e.getBoundingClientRect()
      let n = 1 / 0,
        i = null
      for (const o of t) {
        const e = o.getBoundingClientRect(),
          t = e.left - r.left,
          a = e.bottom - r.top,
          l = Math.abs(a),
          s = Math.sqrt(t * t + a * a)
        l <= 100 && s < n && ((n = s), (i = o))
      }
      return i
    },
    Bn = (e, t) => {
      for (const r of t) {
        const t = Pn(r, e)
        t && Dn(t, r)
      }
    },
    Wn = (e) => {
      const t = new MutationObserver((t) => {
        const r = e.querySelectorAll(Sn.join(',')),
          n = e.querySelectorAll(On.join(','))
        for (const e of t)
          'childList' === e.type && (kn([...r]), Bn([...r], [...n]))
      })
      t.observe(e, { childList: !0, subtree: !0 }),
        setTimeout(() => {
          t.disconnect()
        }, 15e3)
    },
    Un = qt({
      ruleId: 'REMEDIATION_CONTROL_ERROR_ASSOCIATE',
      rule: ({ context: { elements: e } }) => {
        if (k.strategy === We)
          for (const t of e)
            t.addEventListener('submit', () => {
              const e = [...t.querySelectorAll(Sn.join(','))],
                r = t.querySelectorAll(On.join(','))
              kn(e), Bn(e, [...r]), Wn(t)
            })
      },
      isTargetElement: (e) =>
        'FORM' === e.tagName &&
        !e.hasAttribute('data-uw-rm-error-associate-ignore'),
    }),
    jn = (e) => {
      const t = e.match(/user-scalable=(0|no)/)
      return t ? e.replace(t[0], '') : e
    },
    Hn = (e) =>
      e
        .replace(/\s/g, '')
        .replace(/,+|;+/g, ', ')
        .replace(/\s+$/g, '')
        .replace(/^(,\s*)/, '')
        .replace(/(,\s*)$/, ''),
    $n = (e) => {
      const t = e.match(/maximum-scale(?:=([0-9]+(?:\.[0-9]+)?))?/),
        r = e.match(/\bmaximum-scale\b(?!=)/)
      if (t) {
        const n = parseFloat(t[1])
        if ((!Number.isNaN(n) && n < 5) || r)
          return e.replace(t[0], 'maximum-scale=5.0')
      }
      return e
    },
    Vn = qt({
      ruleId: Ht,
      rule: () => {
        const e = document.head.querySelectorAll(Vt)
        for (const t of e) {
          let e = t.getAttribute('content') || ''
          ;(e = [$n, jn, Hn].reduce((e, t) => t(e), e)),
            t.setAttribute('content', e),
            t.setAttribute($t, '')
        }
      },
      isTargetElement: (e) => !e.hasAttribute($t) && e.matches(Vt),
      forceRun: !0,
    }),
    Fn = 'REMEDIATION_EXTERNAL_LINK_TARGETS',
    Xn = 'data-uw-rm-ext-link',
    qn = (e, t) => `${e}$${t}`.toLowerCase().replace(/ /g, ''),
    Gn = (e) => {
      const t = e.getAttribute('aria-label'),
        r = e.getAttribute('aria-labelledby')
      return t || (r ? a(r) : o(e))
    },
    Kn = qt({
      ruleId: Fn,
      rule: ({ context: { elements: e } }) => {
        var t
        const r =
            null == (t = UserWayWidgetApp.getLib('localization_manager'))
              ? void 0
              : t.translate,
          { ExternalLink: n } = V(),
          i = ((e) => {
            const t = {}
            for (const r of e) t[qn(r.href, r.term)] = r
            return t
          })(n),
          o = []
        for (const a of e) {
          const e = Gn(a),
            t = qn(a.href, e)
          let n
          if (!e || e.includes('new window') || e.includes('new tab'))
            a.setAttribute(Xn, 'na')
          else {
            if (i[t])
              (n = i[t].correction), o.push(Object.assign(i[t], { id: t }))
            else {
              const i = ` - ${r(j, 'widget.new_tab')}`
              ;(n =
                (a.hasAttribute('aria-label')
                  ? a.getAttribute('aria-label')
                  : e) + i),
                o.push({ href: a.href, term: e, correction: n, id: t })
            }
            a.setAttribute('aria-label', n),
              a.setAttribute(Xn, ''),
              a.setAttribute('uw-rm-external-link-id', t)
          }
        }
        xr(Fn, o, o.length, 0)
      },
      isTargetElement: (e) => {
        if ('a' !== e.tagName.toLowerCase()) return !1
        const t = e
        if (t.hasAttribute(Xn)) return !1
        const { href: r, target: n } = t,
          i = /^(http|https):/.test(r)
        return !!(
          (null == r ? void 0 : r.trim()) &&
          i &&
          n &&
          '_blank' === n
        )
      },
    }),
    Zn = (e) => {
      const t = e.trim()
      return t.length ? t.split('?')[0].split('#')[0] : ''
    }
  var zn = ((e) => ((e.PRESENT = 'PRESENT'), (e.MISSING = 'MISSING'), e))(
    zn || {}
  )
  const Yn = () =>
      __async(this, null, function* () {
        const { siteId: e } = B
        try {
          const t = yield fetch(`${X}br-links/v0/contribute/${e}`, {
            method: 'GET',
          })
          return (yield t.json()).payload
        } catch (t) {
          return zn.PRESENT
        }
      }),
    Qn = (e, t) =>
      __async(this, null, function* () {
        const { siteId: r, userId: n } = B,
          i = {
            userId: n,
            siteId: r,
            links: e,
            page: window.location.pathname,
            fullPage: window.location.href,
          }
        yield fetch(`${X}br-links/v0/contribute/${r}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(i),
          signal: t,
        }).catch(() => {})
      }),
    Jn = () =>
      __async(this, null, function* () {
        const { siteId: e } = B
        try {
          const t = yield fetch(`${X}br-links/v0/links/${e}`, {
            method: 'GET',
          })
          return yield t.json()
        } catch (t) {
          return {
            thisPageItems: [],
            totalNumber: 0,
            lastPageIndex: 0,
            pageItemType: 'BrokenLinkHref',
          }
        }
      }),
    ei = (e) => {
      var t
      const r =
          null == (t = UserWayWidgetApp.getLib('localization_manager'))
            ? void 0
            : t.translate,
        n = e.getAttribute('aria-label'),
        i = l(e),
        o = null != n ? n : i,
        a = `${r(j, 'widget.broken_links.target_site_not_available')}`,
        s = o ? `${o} - ${a}` : a
      return (
        e.setAttribute('aria-label', s),
        e.setAttribute(Bt, Ut.Fixed),
        e.setAttribute(Xn, ''),
        s
      )
    },
    ti = (e) => {
      var t
      return {
        originalHref: e.getAttribute(Wt) || '',
        href: Zn(e.href),
        text: null != (t = e.getAttribute('aria-label')) ? t : '',
        pageHash: d(window.location.pathname),
        page: window.location.pathname,
        siteId: B.siteId,
      }
    },
    ri = new AbortController(),
    ni = Be(
      (e) =>
        ((e) => {
          e.length &&
            Yn()
              .then((t) => {
                try {
                  if (t === zn.PRESENT) return void ri.abort()
                  if (t === zn.MISSING) {
                    const t = e.map(
                        (e) => (
                          e.setAttribute(Bt, Ut.BackEndContributed),
                          Zn(e.href)
                        )
                      ),
                      r = [...new Set(t)]
                    Qn(r, ri.signal)
                  }
                } catch (r) {}
              })
              .catch((e) => {})
        })(e),
      3500,
      { leading: !0, trailing: !0 }
    ),
    ii = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    ),
    oi = qt({
      ruleId: Pt,
      rule: ({ context: { elements: e } }) => {
        const t = []
        for (const n of e)
          n.setAttribute(Bt, Ut.Processed), n.setAttribute(Wt, n.href)
        const r = e.filter((e) => {
          const r = e,
            n = ((e) => {
              const { BrokenLink: t } = V(),
                r = t.find((t) => t.href === e.href)
              if (!r) return !1
              const { href_correction: n, text_correction: i } = r
              if (n && O(n)) {
                const t = R(n)
                e.setAttribute('href', t)
              }
              return (
                i && e.setAttribute('aria-label', i),
                e.setAttribute(Bt, Ut.FixedByCorrection),
                !0
              )
            })(r)
          n && t.push(ti(r))
          const i = ii.test(null == r ? void 0 : r.href)
          return n || i || (ei(e), t.push(ti(r))), i && !n
        })
        ni(r),
          Jn()
            .then(({ thisPageItems: e }) => {
              for (const n of e) {
                const e = r.find((e) => Zn(e.href) === n.href)
                if (e) {
                  ei(e)
                  const r = ti(e)
                  t.push(r)
                }
              }
            })
            .catch((e) => {
              console.log(e)
            })
            .finally(() => {
              xr(Pt, t, t.length, t.length)
            })
      },
      isTargetElement: (e) => {
        if ('a' !== e.tagName.toLowerCase()) return !1
        const t = e
        if (t.hasAttribute(Bt)) return !1
        const { href: r, hostname: n } = t
        if (!(null == r ? void 0 : r.trim())) return !1
        return (
          ![
            /\.pdf/,
            /wp-admin/,
            /javascript:void/,
            /^(tel:|mailto:|sms:|ftp:|file:|geo:|news:|irc:|skype:|spotify:|whatsapp:|market:|steam:|git:|svn:|ed2k:|magnet:|gopher:|dict:)/,
          ].some((e) => e.test(r)) &&
          !jt.some((e) => (null == n ? void 0 : n.includes(e)))
        )
      },
      postMessageApi: {
        'update-broken-link': ({
          correctionHref: e,
          originalHref: t,
          label: r,
        }) => {
          const n = document.querySelectorAll(`a[${Wt}*="${t}" i]`)
          for (const i of n)
            if ((r && i.setAttribute('aria-label', r), e && O(e))) {
              const t = R(e)
              i.setAttribute('href', t)
            }
        },
      },
    }),
    ai = 'REMEDIATION_AUTO_PLAY_VIDEO',
    li = 'data-uw-rm-av',
    si = ['IFRAME', 'VIDEO'],
    ui = ['youtube.com', 'vimeo.com'],
    ci = ['autoplay=1', 'autoplay=true'],
    di = ['mute=1', 'mute=true'],
    pi = [
      In,
      en,
      fn,
      fr,
      Tn,
      Un,
      Vn,
      Kn,
      oi,
      qt({
        ruleId: ai,
        rule: ({ context: { elements: e } }) => {
          for (const t of e)
            'IFRAME' === t.nodeName
              ? t.setAttribute(li, 'if')
              : 'VIDEO' === t.nodeName && t.setAttribute(li, 'vi')
          xr(ai, [], e.length, 0)
        },
        isTargetElement: (e) => {
          if (!si.includes(e.nodeName) || e.hasAttribute(li)) return !1
          if ('IFRAME' === e.nodeName) {
            const t = e.getAttribute('src')
            if (
              !(
                t &&
                ui.some((e) => t.includes(e)) &&
                ci.some((e) => t.includes(e)) &&
                di.some((e) => t.includes(e))
              )
            )
              return !1
          }
          const t = e.hasAttribute('autoplay'),
            r = e.hasAttribute('muted')
          return !!('VIDEO' !== e.nodeName || (t && r))
        },
      }),
    ],
    mi = Object.freeze(
      Object.defineProperty(
        { __proto__: null, RulesList: pi },
        Symbol.toStringTag,
        { value: 'Module' }
      )
    )
})()
