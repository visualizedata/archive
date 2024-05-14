var $allDropDowns = $('[sui-btn-mode~="dropdown"]')
$allDropDowns.on('click', function () {
  var $this = $(this)
  $this.hasClass('isOpen')
    ? ($this.removeClass('isOpen'), console.log('here'))
    : ($allDropDowns.removeClass('isOpen'),
      $this.addClass('isOpen'),
      console.log('here here'))
}),
  (function ($) {
    'use strict'
    var Modal = function (element, options) {
      ;(this.options = options),
        (this.$body = $(document.body)),
        (this.$element = $(element)),
        (this.$dialog = this.$element.find('.modal-dialog')),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        (this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'),
        this.options.remote &&
          this.$element.find('.modal-content').load(
            this.options.remote,
            $.proxy(function () {
              this.$element.trigger('loaded.bs.modal')
            }, this)
          )
    }
    function Plugin(option, _relatedTarget) {
      return this.each(function () {
        var $this = $(this),
          data = $this.data('bs.modal'),
          options = $.extend(
            {},
            Modal.DEFAULTS,
            $this.data(),
            'object' == typeof option && option
          )
        data || $this.data('bs.modal', (data = new Modal(this, options))),
          'string' == typeof option
            ? data[option](_relatedTarget)
            : options.show && data.show(_relatedTarget)
      })
    }
    ;(Modal.VERSION = '3.4.1'),
      (Modal.TRANSITION_DURATION = 300),
      (Modal.BACKDROP_TRANSITION_DURATION = 150),
      (Modal.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
      }),
      (Modal.prototype.show = function (_relatedTarget) {
        var that = this,
          e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
        this.$element.trigger(e),
          this.isShown ||
            e.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass('modal-open'),
            this.escape(),
            this.resize(),
            this.$element.on(
              'click.dismiss.bs.modal',
              '[data-dismiss="modal"]',
              $.proxy(this.hide, this)
            ),
            this.$dialog.on('mousedown.dismiss.bs.modal', function () {
              that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                $(e.target).is(that.$element) &&
                  (that.ignoreBackdropClick = !0)
              })
            }),
            this.backdrop(function () {
              var transition =
                $.support.transition && that.$element.hasClass('fade')
              that.$element.parent().length ||
                that.$element.appendTo(that.$body),
                that.$element.show().scrollTop(0),
                that.adjustDialog(),
                transition && that.$element[0].offsetWidth,
                that.$element.addClass('in'),
                that.enforceFocus()
              var e = $.Event('shown.bs.modal', {
                relatedTarget: _relatedTarget,
              })
              transition
                ? that.$dialog
                    .one('bsTransitionEnd', function () {
                      that.$element.trigger('focus').trigger(e)
                    })
                    .emulateTransitionEnd(Modal.TRANSITION_DURATION)
                : that.$element.trigger('focus').trigger(e)
            }))
      }),
      (Modal.prototype.hide = function (e) {
        e && e.preventDefault(),
          (e = $.Event('hide.bs.modal')),
          this.$element.trigger(e),
          this.isShown &&
            !e.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            $(document).off('focusin.bs.modal'),
            this.$element
              .removeClass('in')
              .off('click.dismiss.bs.modal')
              .off('mouseup.dismiss.bs.modal'),
            this.$dialog.off('mousedown.dismiss.bs.modal'),
            $.support.transition && this.$element.hasClass('fade')
              ? this.$element
                  .one('bsTransitionEnd', $.proxy(this.hideModal, this))
                  .emulateTransitionEnd(Modal.TRANSITION_DURATION)
              : this.hideModal())
      }),
      (Modal.prototype.enforceFocus = function () {
        $(document)
          .off('focusin.bs.modal')
          .on(
            'focusin.bs.modal',
            $.proxy(function (e) {
              document === e.target ||
                this.$element[0] === e.target ||
                this.$element.has(e.target).length ||
                this.$element.trigger('focus')
            }, this)
          )
      }),
      (Modal.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              'keydown.dismiss.bs.modal',
              $.proxy(function (e) {
                27 == e.which && this.hide()
              }, this)
            )
          : this.isShown || this.$element.off('keydown.dismiss.bs.modal')
      }),
      (Modal.prototype.resize = function () {
        this.isShown
          ? $(window).on(
              'resize.bs.modal',
              $.proxy(this.handleUpdate, this)
            )
          : $(window).off('resize.bs.modal')
      }),
      (Modal.prototype.hideModal = function () {
        var that = this
        this.$element.hide(),
          this.backdrop(function () {
            that.$body.removeClass('modal-open'),
              that.resetAdjustments(),
              that.resetScrollbar(),
              that.$element.trigger('hidden.bs.modal')
          })
      }),
      (Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null)
      }),
      (Modal.prototype.backdrop = function (callback) {
        var that = this,
          animate = this.$element.hasClass('fade') ? 'fade' : ''
        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate
          if (
            ((this.$backdrop = $(document.createElement('div'))
              .addClass('modal-backdrop ' + animate)
              .appendTo(this.$body)),
            this.$element.on(
              'click.dismiss.bs.modal',
              $.proxy(function (e) {
                this.ignoreBackdropClick
                  ? (this.ignoreBackdropClick = !1)
                  : e.target === e.currentTarget &&
                    ('static' == this.options.backdrop
                      ? this.$element[0].focus()
                      : this.hide())
              }, this)
            ),
            doAnimate && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass('in'),
            !callback)
          )
            return
          doAnimate
            ? this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION)
            : callback()
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')
          var callbackRemove = function () {
            that.removeBackdrop(), callback && callback()
          }
          $.support.transition && this.$element.hasClass('fade')
            ? this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION)
            : callbackRemove()
        } else callback && callback()
      }),
      (Modal.prototype.handleUpdate = function () {
        this.adjustDialog()
      }),
      (Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing =
          this.$element[0].scrollHeight >
          document.documentElement.clientHeight
        this.$element.css({
          paddingLeft:
            !this.bodyIsOverflowing && modalIsOverflowing
              ? this.scrollbarWidth
              : '',
          paddingRight:
            this.bodyIsOverflowing && !modalIsOverflowing
              ? this.scrollbarWidth
              : '',
        })
      }),
      (Modal.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: '', paddingRight: '' })
      }),
      (Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) {
          var documentElementRect =
            document.documentElement.getBoundingClientRect()
          fullWindowWidth =
            documentElementRect.right - Math.abs(documentElementRect.left)
        }
        ;(this.bodyIsOverflowing =
          document.body.clientWidth < fullWindowWidth),
          (this.scrollbarWidth = this.measureScrollbar())
      }),
      (Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        var scrollbarWidth = this.scrollbarWidth
        this.bodyIsOverflowing &&
          (this.$body.css('padding-right', bodyPad + scrollbarWidth),
          $(this.fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight,
              calculatedPadding = $(element).css('padding-right')
            $(element)
              .data('padding-right', actualPadding)
              .css(
                'padding-right',
                parseFloat(calculatedPadding) + scrollbarWidth + 'px'
              )
          }))
      }),
      (Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad),
          $(this.fixedContent).each(function (index, element) {
            var padding = $(element).data('padding-right')
            $(element).removeData('padding-right'),
              (element.style.paddingRight = padding || '')
          })
      }),
      (Modal.prototype.measureScrollbar = function () {
        var scrollDiv = document.createElement('div')
        ;(scrollDiv.className = 'modal-scrollbar-measure'),
          this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        return this.$body[0].removeChild(scrollDiv), scrollbarWidth
      })
    var old = $.fn.modal
    ;($.fn.modal = Plugin),
      ($.fn.modal.Constructor = Modal),
      ($.fn.modal.noConflict = function () {
        return ($.fn.modal = old), this
      }),
      $(document).on(
        'click.bs.modal.data-api',
        '[data-toggle="modal"]',
        function (e) {
          var $this = $(this),
            href = $this.attr('href'),
            target =
              $this.attr('data-target') ||
              (href && href.replace(/.*(?=#[^\s]+$)/, '')),
            $target = $(document).find(target),
            option = $target.data('bs.modal')
              ? 'toggle'
              : $.extend(
                  { remote: !/#/.test(href) && href },
                  $target.data(),
                  $this.data()
                )
          $this.is('a') && e.preventDefault(),
            $target.one('show.bs.modal', function (showEvent) {
              showEvent.isDefaultPrevented() ||
                $target.one('hidden.bs.modal', function () {
                  $this.is(':visible') && $this.trigger('focus')
                })
            }),
            Plugin.call($target, option, this)
        }
      )
  })(jQuery)
var _superBsModal = $.fn.modal,
  SuiModal = function (element, options) {
    _superBsModal.Constructor.apply(this, arguments)
  }
;(SuiModal.prototype = $.extend({}, _superBsModal.Constructor.prototype, {
  constructor: SuiModal,
  _superBsModal: function () {
    var args = $.makeArray(arguments)
    _superBsModal.Constructor.prototype[args.shift()].apply(this, args)
  },
  renderHBTemplate: function (source, context) {
    return Handlebars.compile(source)(context)
  },
  show: function () {
    0 === $('#' + this.options.modalId).length
      ? this._fetchTabContent()
      : this._superBsModal('show')
  },
  destroy: function () {
    var $instance = $('#' + this.options.modalId)
    0 < $instance.length && $instance.remove()
  },
  _fetchTabContent: function () {
    var that = this,
      contextDefaultTab = !1
    ;(window.paymentModalRendered = $.Deferred()),
      $.get(that.options.templateUrl, function (data) {
        var modalTemplate = data,
          tabContentGets = []
        that.options.tabs.forEach(function (el, i) {
          el.isDefault && (contextDefaultTab = i)
        })
        var context = $.extend(
          {},
          that._superBsModal.defaults,
          that.options || {}
        )
        ;(context.tabs = []),
          (contextDefaultTab =
            !1 === contextDefaultTab ? 0 : contextDefaultTab),
          that.options.tabs.forEach(function (el, i) {
            var isDefault = i === contextDefaultTab,
              tabIcon = void 0 !== el.tabIcon && el.tabIcon
            context.tabs.push({
              tabLabel: el.tabLabel,
              isDefault: isDefault,
              tabIcon: tabIcon,
            }),
              el.tabContentUrl
                ? tabContentGets.push(
                    $.ajax({
                      type: 'GET',
                      url: el.tabContentUrl,
                      success: function (data) {
                        el.tabContent = data
                      },
                    })
                  )
                : (el.tabContent = '')
          }),
          $.when.apply($, tabContentGets).then(function () {
            that.options.tabs.forEach(function (el, i) {
              var isDefault = i === contextDefaultTab
              ;(context.frames = context.frames || []),
                context.frames.push({
                  content: el.tabContent,
                  isDefault: isDefault,
                }),
                el.actions &&
                  el.actions.forEach(function (el, idx) {
                    ;(context.frames[i].actions =
                      context.frames[i].actions || []),
                      void 0 !== el.actionClasses
                        ? (el.actionClasses =
                            -1 === el.actionClasses.indexOf('f-l')
                              ? el.actionClasses + ' f-r'
                              : el.actionClasses)
                        : (el.actionClasses = 'f-r'),
                      (context.frames[i].actions[idx] = {
                        actionLabel: el.actionLabel || 'button',
                        actionClasses: el.actionClasses,
                        actionAttributes: el.actionAttributes,
                      })
                  })
              var $el = $(that.renderHBTemplate(modalTemplate, context))
              $el.attr('id', that.options.modalId),
                that.bind($el, contextDefaultTab),
                (that.$body = $(document.body)),
                (that.element = $el[0]),
                (that.$element = $(that.element)),
                paymentModalRendered.resolve(),
                that._superBsModal('show')
            })
          })
      })
  },
  bind: function ($el, contextDefaultTab) {
    var that = this
    $el.on('click', '.sui-btn-close', function () {
      void 0 !== that.options.closeFunctionality &&
        that.options.closeFunctionality.call(that),
        that._superBsModal('hide'),
        void 0 !== that.options.destroyOnClose &&
          !0 === that.options.destroyOnClose &&
          setTimeout(function () {
            that.destroy()
          }, 500)
    })
    var $suiContentFrames = $el.find('.sui-content-frames').children(),
      $suiContentTabsContainer = $el.find('.sui-nav'),
      $suiContentTabs = $suiContentTabsContainer.children()
    this.options.tabs.forEach(function (el, i) {
      var $thisTabFrame = $suiContentFrames
          .eq(i)
          .find('.sui-frame-content'),
        $thisTabActionsContainer = $suiContentFrames
          .eq(i)
          .find('.sui-actions'),
        $thisTabLink = $suiContentTabs.eq(i)
      el.tabFunctionality
        ? ($thisTabLink
            .data('suiCode', el.tabFunctionality)
            .data('suiTemplateRemoteContent', el.tabContent)
            .data('suiLoaded', !1),
          el.tabContentUrl &&
            $thisTabLink
              .data('suiTemplateRemote', el.tabContentUrl)
              .data('suiTemplate', el.tabContentUrl),
          'ajax' === el.tabMode
            ? $thisTabLink.data('suiRepeat', !1)
            : 'ajax-repeat' === el.tabMode
            ? $thisTabLink.data('suiRepeat', !0)
            : ('default' !== el.tabMode && void 0 !== el.tabMode) ||
              ($thisTabLink.data('suiRepeat', !1),
              el.tabFunctionality.call(
                that,
                $thisTabFrame,
                $thisTabActionsContainer
              )),
          'ajax' === el.tabMode
            ? $thisTabLink
                .data('suiCode', el.tabFunctionality)
                .data('suiLoaded', !1)
                .data('suiRepeat', !1)
            : 'ajax-repeat' === el.tabMode
            ? $thisTabLink
                .data('suiCode', el.tabFunctionality)
                .data('suiLoaded', !1)
                .data('suiRepeat', !0)
            : 'default' === el.tabMode || void 0 === el.tabMode
            ? $thisTabLink
                .data('suiCode', el.tabFunctionality)
                .data('suiLoaded', !1)
                .data('suiRepeat', !1)
            : console.log(
                'ERROR: Tab ' +
                  i +
                  " with mode '" +
                  el.tabMode +
                  "', is missing its 'tabTemplate' definition!"
              ))
        : ($thisTabLink.data('suiLoaded', !1).data('suiRepeat', !1),
          el.tabContentUrl &&
            $thisTabLink.data('suiTemplate', el.tabContentUrl))
    }),
      this.options.tabs.forEach(function (el, i) {
        $suiContentFrames.eq(i).find('.sui-frame-content'),
          $suiContentTabs.eq(i)
        if (el.actions) {
          var $thisTabActionsContainer = $suiContentFrames
              .eq(i)
              .find('.sui-actions'),
            $thisTabActions = $thisTabActionsContainer.children()
          el.actions.forEach(function (action, idx) {
            action.actionFunctionality
              ? $thisTabActions
                  .eq(idx)
                  .data('suiCode', action.actionFunctionality)
                  .addClass('has-suiCode')
              : console.log(
                  'ERROR: Tab ' +
                    i +
                    "'s action button " +
                    idx +
                    ' is missing actionFunctionality! Clicking it will do nothing. :('
                )
          }),
            $thisTabActionsContainer.on(
              'click',
              'button.has-suiCode',
              function (e) {
                var $action = $(this),
                  index = ($action.data(), $action.index()),
                  action = el.actions[index],
                  $frame = $suiContentFrames.filter('.active:first'),
                  $frameContent = $frame.find('.sui-frame-content'),
                  $frameActionsContainer = $frame.find('.sui-actions')
                action.actionFunctionality.call(
                  that,
                  $frameContent,
                  $frameActionsContainer
                )
              }
            )
        }
      }),
      $suiContentTabsContainer.on('click', 'li', function (e) {
        var $tab = $(this),
          tabData = $tab.data(),
          index = $tab.index(),
          $frame = $suiContentFrames.eq(index),
          $frameContent = $frame.find('.sui-frame-content'),
          $frameActionsContainer = $frame.find('.sui-actions')
        if (!$tab.hasClass('active')) {
          $old_tab = $suiContentTabsContainer.find('.active')
          var regex = new RegExp(/sui-tab-([0-9]{1,})/),
            tab_num = parseInt($old_tab.attr('class').match(regex)[1])
          void 0 !== that.options.tabs[tab_num].closeFunctionality &&
            that.options.tabs[tab_num].closeFunctionality.call(
              that,
              $suiContentFrames.eq(tab_num).find('.sui-frame-content'),
              $suiContentFrames.eq(tab_num).find('.sui-actions')
            )
        }
        if (
          ($suiContentFrames.removeClass('active'),
          $frame.addClass('active'),
          $suiContentTabs.removeClass('active'),
          $tab.addClass('active'),
          (!1 === tabData.suiLoaded || !0 === tabData.suiRepeat) &&
            tabData.suiCode &&
            tabData.suiTemplateRemote)
        )
          return (
            !0 === tabData.suiRepeat &&
              (console.log(
                "after tab is clicked, re-inject its html if mode is 'ajax-repeat'"
              ),
              $frameContent
                .empty()
                .html(tabData.suiTemplateRemoteContent)),
            !1 === tabData.suiLoaded &&
              $frameContent.empty().html(tabData.suiTemplateRemoteContent),
            (tabData.suiLoaded = !0),
            void tabData.suiCode.call(
              that,
              $frameContent,
              $frameActionsContainer
            )
          )
        ;(!1 !== tabData.suiLoaded && !0 !== tabData.suiRepeat) ||
          !tabData.suiCode ||
          ((tabData.suiLoaded = !0) === tabData.suiRepeat &&
            (console.log(
              "after tab is clicked, re-inject its html if mode is 'ajax-repeat'"
            ),
            $frameContent.empty().html(tabData.suiTemplate)),
          tabData.suiCode.call(
            that,
            $frameContent,
            $frameActionsContainer
          ))
      }),
      $suiContentTabs.eq(contextDefaultTab).data('suiCode') &&
        (window.elTabTemplateRendered
          ? elTabTemplateRendered.done(function () {
              $suiContentFrames
                .eq(contextDefaultTab)
                .find('.sui-frame-content')
                .html(
                  $suiContentTabs
                    .eq(contextDefaultTab)
                    .data('suiTemplateRemoteContent')
                ),
                $suiContentTabs
                  .eq(contextDefaultTab)
                  .data('suiLoaded', !0)
                  .data('suiCode')
                  .call(
                    that,
                    $suiContentFrames
                      .eq(contextDefaultTab)
                      .find('.sui-frame-content'),
                    $suiContentFrames
                      .eq(contextDefaultTab)
                      .find('.sui-actions')
                  )
            })
          : $suiContentTabs
              .eq(contextDefaultTab)
              .data('suiLoaded', !0)
              .data('suiCode')
              .call(
                that,
                $suiContentFrames
                  .eq(contextDefaultTab)
                  .find('.sui-frame-content'),
                $suiContentFrames
                  .eq(contextDefaultTab)
                  .find('.sui-actions')
              )),
      $el.addClass('active')
  },
})),
  ($.fn.SuiModal = $.extend(function (option) {
    var args = $.makeArray(arguments)
    option = args.shift()
    return (
      (_superBsModal.defaults = $.extend(_superBsModal.defaults, {
        backdrop: !0,
        keyboard: !0,
        fade: !1,
        showNav: !1,
        showHeader: !1,
        fixed: !1,
        destroyOnClose: !1,
        header: { h1: 'thanks', h2: 'for cheese' },
      })),
      this.each(function () {
        var $this = $(this),
          data = $this.data('modal'),
          options = $.extend(
            {},
            _superBsModal.defaults,
            $this.data(),
            'object' == typeof option && option
          )
        data || $this.data('modal', (data = new SuiModal(this, options))),
          'string' == typeof option
            ? data[option].apply(data, args)
            : options.show && data.show.apply(data, args)
      })
    )
  }, $.fn.SuiModal))
