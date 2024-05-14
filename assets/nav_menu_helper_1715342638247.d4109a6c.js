var __values =
  (this && this.__values) ||
  function (e) {
    var n = 'function' == typeof Symbol && Symbol.iterator,
      t = n && e[n],
      a = 0
    if (t) return t.call(e)
    if (e && 'number' == typeof e.length)
      return {
        next: function () {
          return (
            e && a >= e.length && (e = void 0),
            { value: e && e[a++], done: !e }
          )
        },
      }
    throw new TypeError(
      n ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
    )
  }
!(function () {
  function e(e) {
    var n, t
    e = e || {}
    var r = document.querySelector(e.mainNavSelector)
    if (!r) {
      var l = document.querySelectorAll('nav')
      r = Array.from(l).find(function (e) {
        return a.isElementVisible(e, { shouldBeInViewport: !1 })
      })
    }
    if ((r || (r = document.querySelector('[role="navigation"]')), !r))
      return console.log('Navigation menu was not found!')
    if (
      (!e.ignoreAriaAttributes &&
        0 !==
          r.querySelectorAll('[aria-expanded], [aria-haspopup]').length) ||
      r.querySelector('[data-uw-rm-mega-nav]')
    )
      return console.log('Navigation menu already remediated!')
    r.setAttribute('role', 'navigation'),
      a.injectStylesheet(
        '.userway__menu--show { display: block !important; opacity: 1 !important; visibility: visible !important; transition: none !important; max-height: none !important; } .userway__menu--hide { display: none !important; opacity: 0 !important; visibility: hidden !important; transition: none !important; }'
      ),
      a.injectStylesheet(
        '.userway__menu--show > * { display: block !important; opacity: 1 !important; visibility: visible !important; transition: none !important; max-height: none !important; }'
      ),
      a.injectStylesheet(
        '.userway__menu--active { display: block !important; opacity: 1 !important; visibility: visible !important; transition: none !important; max-height: none !important; } .userway__menu--inactive { display: none !important; opacity: 0 !important; visibility: hidden !important; transition: none !important; }'
      ),
      a.injectStylesheet(
        '.userway__menu--active > * { display: block !important; opacity: 1 !important; visibility: visible !important; transition: none !important; max-height: none !important; }'
      ),
      a.injectStylesheet(
        '\n      .userway__nav-menu-tooltip {\n        white-space: nowrap;\n        text-transform: none;\n        transition: opacity 300ms linear;\n        opacity: 0;\n        display: none;\n        position: fixed;\n        z-index: 100000;\n        box-sizing: border-box;\n        border: 2px solid rgba(255, 255, 255, 0.29);\n        background: #000;\n        width: 180px;\n        margin: 0;\n        padding: 6px 11px;\n        border-radius: 5px;\n        align-items: center;\n        text-align: center;\n        user-select: none;\n        letter-spacing: normal;\n    }\n    .userway__nav-menu-tooltip-title {\n        box-sizing: border-box;\n        padding-right: 7px;\n        color: #fff;\n        font-size: 12px;\n        line-height: 14px;\n        font-family: Arial, sans-serif;\n        margin: auto;\n    }\n    .userway__nav-menu-tooltip-icon {\n      box-sizing: border-box;\n      font-family: Arial, sans-serif;\n      color: #fff;\n      height: 18px;\n      padding: 2px;\n      border-radius: 3px;\n      background: #333333;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n    .userway__nav-menu-tooltip-icon-separator {\n        box-sizing: border-box;\n        font-family: Arial, sans-serif;\n        color: #fff;\n        padding-left: 5px;\n        padding-right: 5px;\n        margin-top: -2px;\n        font-size: 12px;\n    }\n    '
      ),
      a.injectStylesheet(
        '\n        .userway__nav-menu-tooltip-2 {\n          text-transform: none;\n          transition: opacity 300ms linear;\n          opacity: 0;\n          z-index: 10000;\n          box-sizing: border-box;\n          position: fixed;\n          display: none;\n          border-radius: 5px;\n          text-align: center;\n          box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);\n          letter-spacing: normal;\n      }\n      .userway__nav-menu-tooltip-2-container {\n          box-sizing: border-box;\n          border: 2px solid rgba(255, 255, 255, 0.29);\n          background: #000;\n          width: 100%;\n          margin: 0;\n          padding: 6px 11px;\n          border-radius: 5px;\n          display: flex;\n          align-items: center;\n          text-align: center;\n          text-transform: none !important;\n          user-select: none;\n          height: 34px;\n      }\n      .userway__nav-menu-tooltip-2-title {\n          box-sizing: border-box;\n          padding-right: 7px;\n          color: #fff;\n          font-size: 12px;\n          line-height: 14px;\n          font-family: Arial, sans-serif;\n          margin: auto;\n      }\n      .userway__nav-menu-tooltip-2-icon {\n        box-sizing: border-box;\n        color: #fff;\n        padding: 2px;\n        width: 18px;\n        height: 18px;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        border-radius: 3px;\n        background: #333333;\n      }\n      .userway__nav-menu-tooltip-2-separator {\n          box-sizing: border-box;\n          font-family: Arial, sans-serif;\n          color: #fff;\n          padding-left: 3px;\n          padding-right: 3px;\n          margin-top: -2px;\n          font-size: 12px;\n      }\n    '
      ),
      e.customCss && a.injectStylesheet(e.customCss)
    var s,
      u = [],
      c =
        r.querySelector(e.topLevelMenuItemSelector) ||
        r.querySelector('li')
    if (c) {
      var m = c.parentNode.children
      try {
        for (var d = __values(m), p = d.next(); !p.done; p = d.next()) {
          var v = p.value
          if (
            a.isElementVisible(v, {
              shouldBeInViewport: !1,
              skipParentCheck: !0,
            })
          ) {
            var f =
              ('A' === v.nodeName ? v : null) ||
              ('BUTTON' === v.nodeName ? v : null) ||
              v.querySelector(e.topLevelMenuItemTriggerSelector) ||
              a.getFocusableElement('next', v, { childrenOnly: !0 }) ||
              v.querySelector('a') ||
              v.querySelector('button')
            if (f) {
              f.setAttribute('tabindex', '0')
              var b = { link: f },
                y =
                  v.querySelector(e.subMenuSelector) ||
                  v.querySelector('ul')
              y && (b.ul = y),
                y ||
                  v != f ||
                  (y =
                    v.parentNode.querySelector(e.subMenuSelector) ||
                    v.parentNode.querySelector('ul')),
                u.push(b)
            }
          }
        }
      } catch (e) {
        n = { error: e }
      } finally {
        try {
          p && !p.done && (t = d.return) && t.call(d)
        } finally {
          if (n) throw n.error
        }
      }
      if (0 !== Object.keys(u).length) {
        var g = u[0].link,
          h = u[u.length - 1].link
        r.insertAdjacentHTML(
          'beforeend',
          '\n      <div class="userway__nav-menu-tooltip" aria-hidden="true" aria-label="Navigate with left &amp; right arrow keys">\n        <span class="userway__nav-menu-tooltip-title">NAVIGATE WITH</span>\n        <span class="userway__nav-menu-tooltip-icon">\n          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">\n            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>\n          </svg>\n        </span>\n        <span class="userway__nav-menu-tooltip-icon-separator"></span>\n        <span class="userway__nav-menu-tooltip-icon">\n          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">\n            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>\n          </svg>\n        </span>\n      </div>\n      '
        ),
          r.insertAdjacentHTML(
            'beforeend',
            '\n      <div class="userway__nav-menu-tooltip-2" aria-hidden="true">\n          <div aria-label="Navigate with left &amp; right arrow keys" class="userway__nav-menu-tooltip-2-container">\n              <span class="userway__nav-menu-tooltip-2-title">USE</span>\n              <span class="userway__nav-menu-tooltip-2-icon">\n                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">\n                      <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />\n                  </svg>\n              </span>\n              <span class="userway__nav-menu-tooltip-2-separator"></span>\n              <span class="userway__nav-menu-tooltip-2-icon">\n                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">\n                      <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />\n                  </svg>\n              </span>\n          </div>\n      </div>\n  \n      '
          )
        var x = function () {
            var e = a.getElementPosition(m[0]),
              n = r.querySelector('.userway__nav-menu-tooltip')
            clearTimeout(void 0),
              (n.style.display = 'flex'),
              setTimeout(function () {
                n.style.opacity = 1
              }, 10),
              (n.style.left = e.x - 185 + 'px'),
              (n.style.top = e.y + 2 + 'px')
          },
          w = function () {
            var e = r.querySelector('.userway__nav-menu-tooltip')
            ;(e.style.opacity = 0), (e.style.display = 'none')
            var n = r.querySelector('.userway__nav-menu-tooltip-2')
            ;(n.style.opacity = 0), (n.style.display = 'none')
          }
        m[0].addEventListener('focus', x),
          m[0].addEventListener('blur', w),
          g.addEventListener('focus', x),
          g.addEventListener('blur', w),
          window.addEventListener('scroll', w),
          g.addEventListener('blur', function (e) {
            setTimeout(function () {
              r.contains(document.activeElement) || S(s)
            })
          })
        var _ = h,
          N = u[u.length - 1].ul
        N &&
          (_ = Array.from(
            N.querySelectorAll(a.focusableElementsSelector)
          ).pop()),
          _.addEventListener('blur', function (e) {
            setTimeout(function () {
              r.contains(document.activeElement) || S(s)
            })
          })
        for (
          var S = function (e) {
              var n, t
              if (e) {
                e.classList.add('userway__menu--inactive'),
                  e.classList.remove('userway__menu--active')
                var a = u.find(function (n) {
                    return n.listWrapper === e
                  }),
                  i = Array.from(
                    a.ul.querySelectorAll('.userway__menu--show')
                  )
                try {
                  for (
                    var o = __values(i), r = o.next();
                    !r.done;
                    r = o.next()
                  ) {
                    r.value.classList.remove('userway__menu--show')
                  }
                } catch (e) {
                  n = { error: e }
                } finally {
                  try {
                    r && !r.done && (t = o.return) && t.call(o)
                  } finally {
                    if (n) throw n.error
                  }
                }
                a.link.setAttribute('aria-expanded', !1)
              }
            },
            L = function (e) {
              if (e) {
                var n = u.find(function (n) {
                  return n.listWrapper === e || n.ul === e
                })
                n.link.setAttribute('aria-expanded', !0)
                var t = n.listWrapper
                ;(s = t),
                  t.classList.add('userway__menu--active'),
                  t.classList.remove('userway__menu--inactive')
                ;(t.getBoundingClientRect().width / t.offsetWidth == 0 ||
                  t.getBoundingClientRect().height / t.offsetHeight ==
                    0) &&
                  (t.style.transform = 'scale(1)')
              }
            },
            W = function (e, n) {
              if (a.keys.isTab(n) && e && !o) {
                n.preventDefault(), L(e)
                a.getFocusableElement('next', e, {
                  childrenOnly: !0,
                  canBeHidden: !0,
                }).focus()
              }
            },
            A = function (e, n) {
              n.preventDefault(),
                n.stopPropagation(),
                n.stopImmediatePropagation(),
                S(s),
                e &&
                  (a.isElementVisible(e, { shouldBeInViewport: !1 }) ||
                    L(e))
            },
            Y = function () {
              S(s)
            },
            k = function (e) {
              var n = r.querySelector('.userway__nav-menu-tooltip-2'),
                t = a.getElementPosition(e)
              ;(n.style.display = 'flex'),
                setTimeout(function () {
                  n.style.opacity = 1
                }, 10),
                (n.style.top = t.y + e.offsetHeight + 5 + 'px'),
                (n.style.left = t.x + 'px')
            },
            X = function () {
              var e = r.querySelector('.userway__nav-menu-tooltip-2')
              ;(e.style.opacity = 0), (e.style.display = 'none')
            },
            Z = 0;
          Z < u.length;
          Z++
        ) {
          var E = u[Z],
            P = E.link,
            V = E.ul
          if (V) {
            P.setAttribute('aria-expanded', !1)
            for (
              var G, M = V;
              !a.isElementVisible(M, {
                shouldBeInViewport: !1,
                skipParentCheck: !0,
              }) ||
              0 === M.offsetWidth ||
              0 === M.offsetHeight;

            )
              (G = M), (M = M.parentNode)
            ;(E.listWrapper = G || V),
              E.listWrapper.classList.add('userway__menu--inactive'),
              E.listWrapper.setAttribute('aria-haspopup', !0),
              P.addEventListener('focus', k.bind(this, P)),
              P.addEventListener('blur', X.bind(this))
          }
          P.addEventListener('keydown', W.bind(this, V)),
            P.addEventListener('focus', Y.bind(this)),
            P.parentNode.addEventListener('mouseenter', A.bind(this, V))
        }
        var O = function (e, n, t) {
          var i, l
          if (n && !a.isElementVisible(t, { skipParentCheck: !0 })) {
            for (
              var s = t;
              !a.isElementVisible(s, { skipParentCheck: !0 });

            )
              s = s.parentNode
            var u = Array.from(s.children).filter(function (e) {
              return r.contains(e)
            })
            try {
              for (
                var c = __values(u), m = c.next();
                !m.done;
                m = c.next()
              ) {
                var d = m.value
                if (
                  !d.classList.contains('userway__nav-menu-tooltip') &&
                  !d.classList.contains('userway__nav-menu-tooltip-2') &&
                  !a.isElementVisible(d, { skipParentCheck: !0 })
                ) {
                  d.classList.add('userway__menu--show')
                  var p = Array.from(
                    d.querySelectorAll(a.focusableElementsSelector)
                  ).pop()
                  p &&
                    p.addEventListener(
                      'blur',
                      function () {
                        o || d.classList.remove('userway__menu--show')
                      },
                      { once: !0 }
                    )
                }
              }
            } catch (e) {
              i = { error: e }
            } finally {
              try {
                m && !m.done && (l = c.return) && l.call(c)
              } finally {
                if (i) throw i.error
              }
            }
            u.length &&
              (e.preventDefault(),
              setTimeout(function () {
                t.focus()
              }, 100))
          }
        }
        r.addEventListener('keydown', function (n) {
          var t,
            r,
            l,
            c,
            m,
            d,
            p = u.find(function (e) {
              return n.target === e.link
            })
          if (!p) {
            var v =
              (null === (l = n.target) || void 0 === l
                ? void 0
                : l.closest(e.subMenuSelector)) ||
              (null === (c = n.target) || void 0 === c
                ? void 0
                : c.closest('.userway__menu--active')) ||
              (null === (m = n.target) || void 0 === m
                ? void 0
                : m.closest('ul'))
            v &&
              (d = u.find(function (e) {
                return (
                  v === e.ul ||
                  v === e.listWrapper ||
                  Array.from(v.parentNode.children).find(function (n) {
                    return n === e.ul || n === e.listWrapper
                  })
                )
              }))
          }
          if (a.keys.isArrowRight(n) && !i.isEnabled())
            if ((n.preventDefault(), p))
              if (p.link === h) g.focus()
              else {
                var f = a.getFocusableElement('next', p.link)
                f.focus()
              }
            else if ((S(s), d))
              if (d.link === h) g.focus()
              else {
                var f = a.getFocusableElement('next', d.link)
                f.focus()
              }
          if (a.keys.isArrowLeft(n) && !i.isEnabled())
            if ((n.preventDefault(), p))
              if (p.link === g) h.focus()
              else {
                var b = a.getFocusableElement('prev', p.link)
                b.focus()
              }
            else if ((S(s), d))
              if (d.link === g) h.focus()
              else {
                var b = a.getFocusableElement('prev', d.link)
                b.focus()
              }
          if (a.keys.isArrowUp(n))
            if ((n.preventDefault(), p)) {
              if (p.ul) {
                L(p.ul)
                for (
                  var y = p.listWrapper.querySelectorAll(
                      a.focusableElementsSelector
                    ),
                    x = y.length - 1,
                    w = y[x];
                  !a.isElementVisible(w);

                ) {
                  if (x < 0) {
                    w = y[y.length - 1]
                    break
                  }
                  w = y[--x]
                }
                w && w.focus()
              }
            } else {
              var _ = d.listWrapper.querySelectorAll(
                '.userway__menu--show'
              )
              if (_.length) {
                n.preventDefault()
                try {
                  for (
                    var N = __values(_), W = N.next();
                    !W.done;
                    W = N.next()
                  ) {
                    var A = W.value
                    A.classList.remove('userway__menu--show')
                  }
                } catch (e) {
                  t = { error: e }
                } finally {
                  try {
                    W && !W.done && (r = N.return) && r.call(N)
                  } finally {
                    if (t) throw t.error
                  }
                }
                var Y = a.getFocusableElement('prev', _[0])
                return void Y.focus()
              }
              for (
                var y = Array.from(
                    d.listWrapper.querySelectorAll(
                      a.focusableElementsSelector
                    )
                  ),
                  k = y[0],
                  X = y.length - 1,
                  Z = y[X];
                !a.isElementVisible(Z);

              ) {
                if (X < 0) {
                  Z = y[y.length - 1]
                  break
                }
                Z = y[--X]
              }
              if (n.target === k) Z.focus()
              else {
                var E = a.getFocusableElement('prev', n.target, {
                  canBeHidden: !0,
                })
                E.focus()
              }
            }
          if (a.keys.isArrowDown(n))
            if ((n.preventDefault(), p)) {
              if (p.ul) {
                L(p.ul)
                var y = p.listWrapper.querySelectorAll(
                  a.focusableElementsSelector
                )
                y[0].focus()
              }
            } else {
              var y = Array.from(
                  d
                    ? d.listWrapper.querySelectorAll(
                        a.focusableElementsSelector
                      )
                    : []
                ),
                k = y[0],
                Z = y[y.length - 1]
              if (n.target === Z) k.focus()
              else {
                var P = y.findIndex(function (e) {
                    return e === n.target
                  }),
                  V = y[P + 1]
                !d || a.isElementVisible(V, { skipParentCheck: !0 }) || o
                  ? V && V.focus()
                  : O(n, d, V)
              }
            }
          if (a.keys.isTab(n) && !o) {
            var V = a.getFocusableElement('next', n.target, {
              canBeHidden: !0,
            })
            O(n, d, V)
          }
          a.keys.isEsc(n) &&
            (p || (n.preventDefault(), S(s), d && d.link.focus()))
        }),
          r.addEventListener('mouseleave', function () {
            S(s)
          })
      }
    }
  }
  var n = UserWayWidgetApp.addLib('REMEDIATION_NAVIGATION_MENU'),
    t = UserWayWidgetApp.getLib('remediationConfig').navigationMenu,
    a = UserWayWidgetApp.getLib('remediation_util'),
    i = UserWayWidgetApp.getLib('screen-reader-t'),
    o = !1
  ;(n.apply = function (n, i) {
    var o, r
    if (
      (void 0 === i && (i = {}),
      !(null === t || void 0 === t ? void 0 : t.enabled))
    )
      return void (
        n.debugMode &&
        console.log(
          'Remediation Nav: skipped, Nav remediation is disabled for this site'
        )
      )
    if (
      document.body &&
      document.body.hasAttribute('data-uw-rm-complex-nav')
    )
      return void (
        n.debugMode &&
        console.log('Remediation Nav: skipped, already processed')
      )
    document.body &&
      document.body.setAttribute('data-uw-rm-complex-nav', '')
    var l = [
        {
          mainNavSelector: void 0,
          topLevelMenuItemSelector: '.folder, .collection',
          topLevelMenuItemTriggerSelector:
            ".folder-toggle, [role='link'], a",
          subMenuSelector: '.subnav',
          customCss: void 0,
        },
      ],
      s = document.querySelectorAll('.Header-nav-inner')
    s.length &&
      (l = Array.from(s).map(function (e) {
        return {
          mainNavSelector: a.getCssPath(e),
          topLevelMenuItemSelector: '.Header-nav-item',
          topLevelMenuItemTriggerSelector:
            'a.Header-nav-folder-title, a.Header-nav-item',
          subMenuSelector: '.Header-nav-folder',
          customCss:
            '.Header-nav-folder.userway__menu--active { left: auto !important; }',
        }
      })),
      a.execOnPage(
        atob(
          'c2NodWxlcmJhdWVyLmNvbXxjb3N0ZWxsb3JlaS5jb218c21hcnRkZW52ZXJob21lc2VhcmNoLmNvbXxiYXJrZXJoZWRnZXMuY29tfGFtYW5kYWhvd2FyZC5jb20='
        ),
        function () {
          l = [{ mainNavSelector: '.navbar .nav' }]
        }
      ),
      a.execOnPage(atob('aG9tZXNpbmxvdWlzdmlsbGUuY29t'), function () {
        l = [{ mainNavSelector: '#dynamic-nav' }]
      }),
      a.execOnPage(atob('amVmZmNvb2tyZWFsZXN0YXRlLmNvbQ=='), function () {
        l = [{ mainNavSelector: '#navbar' }]
      }),
      a.execOnPage(atob('ZmN0dWNrZXJlbWdlLmNvbQ=='), function () {
        l = [{ mainNavSelector: '.main-menu' }]
      }),
      a.execOnPage(atob('YXRjaGxleXJlYWx0eS5jb20='), function () {
        l = [{ mainNavSelector: '.nav' }]
      }),
      a.execOnPage(atob('dHJlZy5jb20='), function () {
        l = [{ mainNavSelector: '#dynamic-nav' }]
      }),
      a.execOnPage(
        atob('bmF0dXJlc2VhbC5jb218YWdyaWNvYXQuY28udWs='),
        function () {
          l = [{ mainNavSelector: '.topnav' }]
        }
      ),
      a.execOnPage(atob('Y3JhYnMuY29t'), function () {
        l = [
          {
            mainNavSelector:
              '.sticky-header-menu #main-navigation-wrapper',
            ignoreAriaAttributes: !0,
          },
          {
            mainNavSelector:
              '.main-navigation-wrapper-main #main-navigation-wrapper',
            ignoreAriaAttributes: !0,
          },
        ]
      }),
      a.execOnPage(
        atob(
          'bmF0aW9uc2VydmVrZW5uZXdpY2suY29tfG5hdGlvbnNlcnZlc3Bva2FuZS5jb218bmF0aW9uc2VydmVob3VzdG9uLmNvbXxuYXRpb25zZXJ2ZWFrcm9uLmNvbXxuYXRpb25zZXJ2ZXJhbGVpZ2guY29tfG5hdGlvbnNlcnZlY2hhcmxvdHRlLmNvbXxuYXRpb25zZXJ2ZWFsYnVxdWVycXVlLmNvbXxuYXRpb25zZXJ2ZW1pc3NvdWxhLmNvbXxuYXRpb25zZXJ2ZXF1YWRjaXRpZXMuY29tfG5hdGlvbnNlcnZlcGVvcmlhLmNvbXxuYXRpb25zZXJ2ZWxld2lzdG9uLmNvbXxuYXRpb25zZXJ2ZWNvbG9yYWRvc3ByaW5ncy5jb218bmF0aW9uc2VydmV0dWNzb24uY29tfG5hdGlvbnNlcnZldGVtcGUuY29tfG5hdGlvbnNlcnZldGVtcGUuY29tfG5hdGlvbnNlcnZlLmNvbQ=='
        ),
        function () {
          l = [{ mainNavSelector: '#menu-main' }]
        }
      ),
      a.execOnPage(atob('dGhlLXBpdC5sYQ=='), function () {
        l = [
          {
            mainNavSelector: '.main-nav:not(.mobileNav)',
            topLevelMenuItemSelector:
              '.main-nav:not(.mobileNav) .page-collection',
            topLevelMenuItemTriggerSelector:
              '.main-nav:not(.mobileNav) .page-collection a',
            customCss:
              '#topNav nav .folder-collection .subnav { height: auto !important; }',
          },
        ]
      }),
      a.execOnPage(
        atob(
          'b3JnYW5pc2F0aW9uYWxpbXByb3ZlbWVudC5ncm93dGhjby51a3xidXNpbmVzc2ZpbmFuY2UuZ3Jvd3RoY28udWs='
        ),
        function () {
          l = [{ ignoreAriaAttributes: !0 }]
        }
      ),
      a.execOnPage(
        atob('bGlmZXN0eWxlc2luMzYwdmlydHVhbG1hcmtldHBsYWNlLmNvbQ=='),
        function () {
          l = [
            {
              mainNavSelector: '#top-menu',
              customCss:
                '#main-header #top-menu > li > a { color: rgba(0,0,0,.6) !important; }',
            },
          ]
        }
      ),
      a.execOnPage(atob('c2hvcC5hdnZ3aW5lLmNvbQ=='), function () {
        l = [{ mainNavSelector: '#main-menu' }]
      }),
      a.execOnPage(atob('eWllbGRzdHJlZXQuY29t'), function () {
        l = [
          {
            mainNavSelector: '[class*="styles__MenuItemsContainer"]',
            topLevelMenuItemSelector: '[class*="HeaderItem__MenuItem-"]',
            topLevelMenuItemTriggerSelector: 'a',
          },
        ]
      }),
      a.execOnPage(
        atob('YXRsYW50aWNvY2VhbmZyb250bW90ZWwuY29t'),
        function () {
          l = [
            {
              ignoreAriaAttributes: !0,
              customCss:
                'ul.sub-menu.userway__menu--active { left: auto !important; }',
            },
          ]
        }
      ),
      a.execOnPage(atob('b3NrYWJyaWdodC5vcmc='), function () {
        l = [
          {
            ignoreAriaAttributes: !0,
            customCss:
              '#topNav nav ul li.folder-collection .subnav { height: auto !important; }',
          },
        ]
      }),
      a.execOnPage(atob('c2ZzdHJlc3MuY29t'), function () {
        l = [
          {
            mainNavSelector: '.Header-nav--secondary',
            topLevelMenuItemSelector: '.Header-nav-item',
            subMenuSelector: '.Header-nav-folder',
            customCss:
              '.Header-nav-folder.userway__menu--active { left: auto !important; }',
          },
        ]
      }),
      a.execOnPage(atob('dGhlcWlzcG90LmNvbQ=='), function () {
        l = [
          {
            ignoreAriaAttributes: !0,
            mainNavSelector: '.main-nav:not(.mobileNav)',
            topLevelMenuItemSelector:
              '.folder-collection, .splash-page-collection',
            topLevelMenuItemTriggerSelector:
              '.folder-collection > a, .splash-page-collection > a',
            subMenuSelector: '.subnav',
            customCss: '.userway__menu--active {height: auto !important;}',
          },
        ]
      }),
      a.execOnPage(atob('YXRiYXR0LmNvbQ=='), function () {
        l = [
          {
            mainNavSelector:
              '.main-nav-container .navPages > div.navPages-list .custom-pages-nav .navPages-list',
          },
        ]
      }),
      a.execOnPage(atob('dG9ueXJvYmJpbnMuY29t'), function () {
        l = [{ mainNavSelector: '.main-nav-wrapper' }]
      }),
      a.execOnPage(atob('bGlmZmUuc2k='), function () {
        l = [{ mainNavSelector: '.sp-megamenu-parent' }]
      }),
      a.execOnPage(atob('ZXNhaGVhdGFjLmNvbQ=='), function () {
        l = [
          {
            mainNavSelector: '#menu-primary',
            topLevelMenuItemSelector: '.menu-item',
            subMenuSelector: '.sub-menu',
          },
        ]
      }),
      a.execOnPage(
        atob('c2FudGFmZXJlYWxlc3RhdGVleHBlcnRzLmNvbQ=='),
        function () {
          l = [
            {
              mainNavSelector: '.nav-container > .head-menu',
              topLevelMenuItemSelector: '.menu-item',
              subMenuSelector: '.submenu',
              customCss:
                '.userway__menu--active { top: 50% !important; margin-top: 24px !important; }',
            },
          ]
        }
      ),
      a.execOnPage(atob('YWJpbnRyYS5ncg=='), function () {
        l = [
          {
            subMenuSelector: '.childcontent',
            customCss:
              '.userway__menu--active { opacity: 1 !important; visibility: visible !important; height: auto !important; overflow: visible !important; display: block !important; margin-left: 0px !important; transform: translate(-30%) !important; } .userway__menu--active > .childcontent-inner > .gkcol { height: auto !important; }',
          },
        ]
      }),
      a.execOnPage(atob('cmttaWxlcy5jb20='), function () {
        l = [{ mainNavSelector: '#menu-header-menu-desktop' }]
      }),
      a.execOnPage(atob('Ymx1ZXNreW1kLmNvbQ=='), function () {
        l = [
          {
            mainNavSelector: '.nav.top-bar-nav',
            ignoreAriaAttributes: !0,
            customCss:
              '.userway__menu--active { left: -15px !important; }',
          },
        ]
      }),
      a.execOnPage(atob('Z2VhcnRpbWUuY28='), function () {
        l = [{ mainNavSelector: '.main-nav', ignoreAriaAttributes: !0 }]
      }),
      a.execOnPage(
        atob('Y29uc3VsdGluZ2NhcmRpb2xvZ2lzdHMuY29t'),
        function () {
          l = [
            {
              mainNavSelector: '#menu-main-menu',
              ignoreAriaAttributes: !0,
            },
          ]
        }
      ),
      a.execOnPage(atob('bnVkdXJhLmNvbQ=='), function () {
        l = [
          {
            mainNavSelector: '.largerTopMenu > ul',
            customCss:
              '.userway__menu--show { left: 225px !important; background: #fff !important; }',
          },
        ]
      }),
      a.execOnPage(atob('Y3Bob3N0YWNjZXNzLmNvbQ=='), function () {
        l = [
          {
            mainNavSelector: '.menu-wrapper .main-nav',
            customCss:
              '.userway__menu--active { background: #fff !important; }',
          },
        ]
      }),
      a.execOnPage(
        atob('Y2hhcmxlc3RvbmhhcmJvcnJlc29ydC5jb20='),
        function () {
          l = [{ mainNavSelector: '#mainNavLinks' }]
        }
      ),
      a.execOnPage(atob('a292ZWxzLmNvbQ=='), function () {
        l = [
          {
            mainNavSelector: '#menu-main-menu',
            customCss:
              '.userway__menu--active { display: flex !important; }',
          },
        ]
      }),
      a.execOnPage(atob('Ym90dGxlcm9ja25hcGF2YWxsZXkuY29t'), function () {
        l = [{ mainNavSelector: '#menu-header-menu' }]
      }),
      a.execOnPage(atob('Y2hhdGVhdWxham9sbGFpbm4uY29t'), function () {
        l = [
          {
            mainNavSelector: 'nav.fusion-main-menu',
            ignoreAriaAttributes: !0,
          },
        ]
      }),
      a.execOnPage(atob('YmVhcm1hdHRyZXNzLmNvbQ=='), function () {
        l = [{ mainNavSelector: 'nav.header-nav' }]
      }),
      a.execOnPage(atob('Y29hc3RhbHZpc2lvbm1lZGljYWwuY29t'), function () {
        l = [
          {
            mainNavSelector: 'ul.nav-menu.ry-nav',
            ignoreAriaAttributes: !0,
            customCss:
              '.userway__menu--active { top: 28px !important; } .userway__menu--active > li { left: 0 !important; } .ry-menu .ry-nav li .third-level-container .third-level-dropdown.userway__menu--show { display: block !important;}  .ry-menu .ry-nav li .third-level-container .third-level-dropdown.userway__menu--show > li { left: 0 !important; opacity: 1 !important; }',
          },
        ]
      }),
      a.execOnPage(atob('YmVyZy1ncm91cC5jb20='), function () {
        l = [
          {
            mainNavSelector: 'ul#menu-header-menu',
            ignoreAriaAttributes: !0,
          },
        ]
      }),
      a.execOnPage(
        new RegExp(
          atob(
            'XHBlcnJ5ZWxsaXMuY29tXC8oXGQrKStbXC9dY2hlY2tvdXQ/Lw=='
          ).slice(1, -1),
          'g'
        ),
        function () {
          l = []
        }
      ),
      a.execOnPage(
        atob('Y29ycG9yYXRlLnRoZXJtb2Zpc2hlci5jb20='),
        function () {
          l = []
        }
      )
    try {
      for (var u = __values(l), c = u.next(); !c.done; c = u.next()) {
        var m = c.value
        e(Object.assign({}, m, i))
      }
    } catch (e) {
      o = { error: e }
    } finally {
      try {
        c && !c.done && (r = u.return) && r.call(u)
      } finally {
        if (o) throw o.error
      }
    }
  }),
    window.addEventListener('keydown', function (e) {
      a.keys.isLeftShift(e) && (o = !0)
    }),
    window.addEventListener('keyup', function (e) {
      a.keys.isLeftShift(e) && (o = !1)
    }),
    (window.runMenuRemediationScript = function () {
      throw 'Unsupported!'
    })
})()
