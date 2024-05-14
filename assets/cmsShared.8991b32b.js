function galleryExistsOnPage() {
  var $gall = $('#gallery-container, #pulling-gallery')
  return 0 < $gall.length && 0 < $gall.parents('#splash-container').length
}
function socialInboxPageDocumentReady() {}
;(window.splash.navElement = (function ($) {
  return {
    initAll: function () {
      $.each($('.sf.nav'), function () {
        window.splash.navElement.renderAdaptiveNav($(this)),
          window.splash.navElement.updateNavDropdownSelectedLabel($(this)),
          $(this).removeClass('hide')
      }),
        window.splash.navElement.bind()
    },
    populateDynamicSplashGoToLinks: function () {
      window.splash.server.constants.finetune ||
        (window.splash.navElement.populateAgendaGotoLink(),
        window.splash.navElement.populateVirtualGotoLink())
    },
    populateAgendaGotoLink: function () {
      var agendaLink = window.splash.navElement.getAgendaLink()
      $('a[href="#go-to-agenda-page"]').each(function (_, el) {
        $(el).attr('href', agendaLink)
      }),
        $(
          '.linkable-ele[linked="true"][data-href="#go-to-agenda-page"]'
        ).each(function (_, el) {
          $(el).attr('data-href', agendaLink)
        })
    },
    getAgendaLink: function () {
      return (
        window.location.origin +
        (window.location.pathname || '').replace(/\/$/, '') +
        '/agenda' +
        window.location.search
      )
    },
    populateVirtualGotoLink: function (guestAccessHash) {
      var virtualGoToLink =
          window.splash.navElement.getVirtualGoToLink(guestAccessHash),
        $goToVirtualNavLinks = $(
          'a.nav-item-link.nav-jump[href="#go-to-virtual-event-page"]'
        )
      virtualGoToLink
        ? $goToVirtualNavLinks.attr('href', virtualGoToLink).show()
        : $goToVirtualNavLinks.hide()
    },
    getVirtualGoToLink: function (guestAccessHash) {
      var pathnameWithStrippedEndSlash = (
          window.location.pathname || ''
        ).replace(/\/$/, ''),
        origin = window.location.origin,
        search = window.location.search,
        regexResults = /guest-access-hash\=\w+/.exec(search)
      return guestAccessHash
        ? origin +
            pathnameWithStrippedEndSlash +
            '/virtual?guest-access-hash=' +
            guestAccessHash
        : regexResults
        ? origin + pathnameWithStrippedEndSlash + '/virtual' + search
        : ''
    },
    toggleMobileMenu: function ($sf, $selected_link) {
      var $children = $sf.children('.children'),
        $dropdown = $sf.find('.nav-dropdown-selected')
      void 0 !== $selected_link &&
        $selected_link.is('a') &&
        $children.hasClass('open') &&
        $sf
          .find('.nav-dropdown-selected .body')
          .html($selected_link.html()),
        $children.hasClass('open')
          ? ($children.removeClass('open'),
            $dropdown.removeClass('open'),
            $sf.attr('aria-expanded', !1),
            window.splash.PubSub.publish(
              'nav-element-mobile-menu-closed',
              $sf
            ))
          : ($children.addClass('open'),
            $dropdown.addClass('open'),
            $sf.attr('aria-expanded', !0),
            window.splash.PubSub.publish(
              'nav-element-mobile-menu-open',
              $sf
            ))
    },
    linkableContainerAction: function ($container, event) {
      window.jumpToNavBlock($container, event)
    },
    updateNavDropdownSelectedLabel: function ($nav) {
      $nav
        .find('.nav-dropdown-selected>div')
        .html($nav.find('.nav-item:first a').html())
    },
    renderAdaptiveNav: function ($nav) {
      var isAdaptiveNavType =
        $nav.hasClass('horizontal-hamburger-left-v2') ||
        $nav.hasClass('horizontal-dropdown-v2')
      if (!$('body').hasClass('finetune') && isAdaptiveNavType) {
        var isDesktop =
            !$('body').hasClass('is-responsive-phone') &&
            !$('body').hasClass('is-responsive-tablet'),
          isNavAlreadyOpen = $nav.children('.children').hasClass('open')
        isDesktop &&
          isNavAlreadyOpen &&
          $nav
            .children('.children')
            .removeClass('open')
            .end()
            .find('.nav-dropdown-selected')
            .removeClass('open')
        var isAriaExpanded =
          isDesktop || $nav.children('.children').hasClass('open')
        $nav.attr('aria-expanded', isAriaExpanded)
      }
    },
    bind: function () {
      window.splash.navElement.bindNavs(),
        window.splash.navElement.bindLinkableContainers(),
        window.splash.navElement.populateDynamicSplashGoToLinks(),
        $(window).on(
          'resize',
          window.debounce(function () {
            $.each($('.sf.nav'), function () {
              window.splash.navElement.renderAdaptiveNav($(this))
            })
          }, 350)
        ),
        window.splash.PubSub.subscribe('rsvp-completed', {
          context: this,
          eventHandler: function (e) {
            var guestAccessHash =
              e && e.serverResponse && e.serverResponse.guestAccessHash
            guestAccessHash &&
              window.splash.navElement.populateVirtualGotoLink(
                guestAccessHash
              )
          },
        })
    },
    bindLinkableContainers: function () {
      window.splash.server.constants.finetune ||
        $('.linkable-ele[linked="true"]')
          .off()
          .on(
            'click keydown',
            window.debounce(function (e) {
              ;('click' === e.type ||
                ('keydown' === e.type && 13 === e.which)) &&
                window.splash.navElement.linkableContainerAction(
                  $(this),
                  e
                )
            }, 50)
          )
    },
    bindNavs: function ($nav_elements) {
      void 0 === $nav_elements &&
        ($nav_elements = $('#splash-container').find('.sf.nav')),
        $nav_elements.on(
          'click',
          '.nav-dropdown-selected, .nav-hamburger',
          window.debounce(function () {
            window.splash.navElement.toggleMobileMenu(
              $(this).closest('.nav.sf')
            )
          }, 50)
        ),
        $('body').hasClass('finetune') ||
          $nav_elements.on(
            'click',
            '.open .nav-item a',
            window.debounce(function () {
              window.splash.navElement.toggleMobileMenu(
                $(this).closest('.nav.sf'),
                $(this)
              )
            }, 50)
          )
    },
  }
})(jQuery)),
  (window.NavElement = {
    toggleMobileMenu: function ($sf, a) {
      window.splash.navElement.toggleMobileMenu($sf, a)
    },
  }),
  (window.splash.repeatableElement = (function ($) {
    return {
      getRepeatableContainerLayoutGrp: function ($layoutGrp) {
        var repeatableId = $layoutGrp.attr('data-repeatable-id')
        return $('#splash-container').find(
          '.dope-repeatable-container[data-repeatable-id="' +
            repeatableId +
            '"]'
        )
      },
      getRepeatableMasterLayoutGrp: function ($layoutGrp) {
        var repeatableId = $layoutGrp.attr('data-repeatable-id')
        return $('#splash-container').find(
          '.dope-repeatable-master[data-repeatable-id="' +
            repeatableId +
            '"]'
        )
      },
      isInsideLockedRepeatableContainer: function ($layoutGrp) {
        return !(
          (!$layoutGrp.hasClass('dope-repeatable-child') &&
            !$layoutGrp.closest('.dope-repeatable-child').length) ||
          !$layoutGrp.closest('.dope-repeatable-locked').length
        )
      },
      isInsideRepeatableItem: function ($layoutGrp) {
        return (
          $layoutGrp.closest('.dope-repeatable-child') &&
          !$layoutGrp.hasClass('dope-repeatable-child')
        )
      },
    }
  })(jQuery)),
  (window.splash.socialLinksElement = (function ($) {
    return {
      initAll: function () {
        window.splash.socialLinksElement.bind()
      },
      bind: function () {
        $('#splash-container, #rsvp-modal').on(
          'click',
          '.sf.social-links-v2 .social-btn',
          function () {
            var splashFeedOptions = $(this)
              .closest('.sf.social-links-item')
              .data('splashFeedOptions')
            ;(splashFeedOptions && splashFeedOptions.action) ||
              (splashFeedOptions = { action: '' }),
              'twitter-tweet' == splashFeedOptions.action
                ? window.splash.socialActions.fireTweet(
                    splashFeedOptions.body
                  )
                : 'facebook-share' == splashFeedOptions.action
                ? window.splash.socialActions.fireFacebookShare(
                    splashFeedOptions.name,
                    splashFeedOptions.description,
                    splashFeedOptions.picture
                  )
                : 'linkedin-share' == splashFeedOptions.action
                ? window.splash.socialActions.fireLinkedInShare(
                    splashFeedOptions.title,
                    splashFeedOptions.description
                  )
                : 'email-send' == splashFeedOptions.action &&
                  window.splash.socialActions.fireEmailSend(
                    splashFeedOptions.subject,
                    splashFeedOptions.body
                  )
          }
        )
      },
    }
  })(jQuery)),
  (window.splash.countdownElement = (function (splash, $) {
    return {
      initAll: function () {
        $('#splash-container .sf.countdown').each(function () {
          splash.countdownElement.init($(this))
        })
      },
      init: function ($sf) {
        var date
        if (splash.server._event && !splash.server._event.date.tbd)
          date = splash.server._event.date.start_timestamp
        else if (!splash.server._event) {
          var today = new Date(),
            nextWeek = new Date()
          nextWeek.setDate(today.getDate() + 7),
            nextWeek.setHours(19),
            nextWeek.setMinutes(0),
            nextWeek.setSeconds(0),
            (date = nextWeek.getTime())
        }
        var countdown = new splash.Countdown({
          date: date,
          onUpdate: function (data) {
            splash.countdownElement.render(data, $sf)
          },
        })
        splash.server._event && splash.server._event.date.tbd
          ? $sf
              .find('.countdown-date-tbd')
              .show()
              .end()
              .find('.countdown-body')
              .hide()
          : splash.Countdown
          ? $sf.data('countdown', countdown)
          : setTimeout(function () {
              throw new Error(
                'Countdown element error, no countdown module.'
              )
            }, 0)
      },
      render: function (data, $sf) {
        $sf
          .find('.countdown-plain .days')
          .text(data.days + 365 * data.years),
          $sf.find('.countdown-plain .hours').text(data.hours),
          $sf.find('.countdown-plain .minutes').text(data.min)
        var sec = 10 <= data.sec ? data.sec : '0' + data.sec
        $sf.find('.countdown-plain .seconds').text(sec)
      },
      updateAll: function () {
        if (splash.server._event.date.tbd)
          $('#splash-container .sf.countdown .countdown-date-tbd').show(),
            $('#splash-container .sf.countdown .countdown-body').hide(),
            $('#splash-container .sf.countdown').each(function () {
              var countdown = $(this).data('countdown')
              countdown && countdown.stop()
            })
        else {
          var newTime = new Date(splash.server._event.date.start)
          $('#splash-container .sf.countdown').each(function () {
            if (void 0 === $(this).data('countdown'))
              splash.countdownElement.init($(this))
            else {
              var countdown = $(this).data('countdown')
              countdown && countdown.update(newTime).start()
            }
          }),
            $(
              '#splash-container .sf.countdown .countdown-date-tbd'
            ).hide(),
            $('#splash-container .sf.countdown .countdown-body').show()
        }
      },
    }
  })(window.splash, window.jQuery)),
  (window.splash.galleryExistsOnPage = galleryExistsOnPage),
  (window.splash.galleryElement = {
    galleryMasonryVars: { itemSelector: '.sort' },
  })
var ticket_id = {}
function eventSiteDocumentReady() {
  var $body = $('body'),
    $document = $(document),
    $window = $(window),
    $mainCanvas = $('#main-canvas'),
    $splashContainer = $('#splash-container'),
    $rsvpModal = $('#rsvp-modal'),
    $rsvpFormInner = $('#rsvp-form-inner'),
    $footer = $('#footer'),
    hash = window.location.hash
  if (1 < hash.length && void 0 === window.splash.server._user.id) {
    hash = hash.substring(1)
    var url =
      document.location.protocol +
      '//' +
      window.splash.server.constants.ocbDomain +
      '/hashlogin?redirect='
    window.splash.server._event &&
      window.splash.server._event.domain &&
      (url += encodeURIComponent(
        document.location.protocol +
          '//' +
          window.splash.server._event.domain.edit +
          '#' +
          hash
      )),
      window._.each(
        window.splash.finetuneRoutes,
        function (func, hashMatch) {
          new RegExp(
            hashMatch.replace(')', '){0,1}').replace(/:[a-z]+/, '([a-z]+)')
          ).exec(hash) && (window.location = url)
        }
      )
  }
  var windowHeight = $window.height()
  window.windowHeight = windowHeight
  var isMobile = /iPhone|iPod|iPad|Android|BlackBerry|Tablet/.test(
    navigator.userAgent
  )
  if (
    (isMobile && $body.addClass('isMobile'),
    $body.hasClass('finetune') ||
      0 !== $('#gallery-thumbs').find('.photo-thumb').length ||
      1 !== $('.element-gallery').length ||
      $('.element-gallery').remove(),
    $body.removeClass('loading'),
    isMobile)
  ) {
    $('#simple-modal-wrap')
      .find('.simple-modal-flow-control')
      .css('min-height', windowHeight + 'px')
    var modalHeight = $rsvpModal.outerHeight()
    if (modalHeight + 30 < windowHeight) {
      var thisOffset = (windowHeight - modalHeight) / 2
      $rsvpModal.addClass('isShort').css('top', thisOffset + 'px')
    }
    ;/iPhone|iPod|iPad/.test(navigator.userAgent) &&
      $body.find('[href="#rsvp"].button-link').each(function () {
        $(this)
          .parents('.cms-button-element')
          .on('click', function () {
            var scrollTop = $window.scrollTop()
            setTimeout(function () {
              $window.scrollTop(scrollTop)
            }),
              $('body')
                .find(
                  '.cms-modal-container-container, .simple-modal-wrap, .closeSimpleModal'
                )
                .on('click', function () {
                  setTimeout(function () {
                    $window.scrollTop(scrollTop)
                  })
                })
          })
      })
  }
  $document.on('keypress', '[role="button"]', function (event) {
    32 === event.which &&
      (event.preventDefault(), $(this).trigger('click'))
  }),
    $footer.on('click', '#footerCalendarBtn', function () {
      var $footerCalendarBtn = $(this)
      $footerCalendarBtn.hasClass('active')
        ? $footerCalendarBtn
            .add($('#footerCalendarLinksWrap'))
            .removeClass('active')
        : ($footerCalendarBtn
            .add($('#footerCalendarLinksWrap'))
            .addClass('active'),
          $.browser.android &&
            $footerCalendarBtn.find('.gmail-link').addClass('is-hidden'))
    }),
    sizePageContainerSoThatFooterIsAtTheBottom()
  var navPos,
    $navWrap = $mainCanvas.find('.navWrap:first')
  void 0 !== $navWrap &&
    void 0 !== $navWrap.position() &&
    null !== $navWrap.position() &&
    (navPos = $navWrap.position().top),
    void 0 !== navPos &&
      !1 !== navPos &&
      $window.scroll(
        window.debounce(function () {
          $(this).scrollTop() > navPos
            ? $navWrap.addClass('fixed')
            : $navWrap.removeClass('fixed')
        }),
        100
      ),
    void 0 === navPos ||
      !1 === navPos ||
      $('body').hasClass('finetune') ||
      $mainCanvas.find('.nav-item').click(function () {
        return $(this).find('a.nav-jump').trigger('click'), !1
      }),
    $('#ticketForm').on('click', '.more-info', function () {
      var $desc = $(this).siblings('.description')
      $desc.hasClass('hide')
        ? $desc.removeClass('hide')
        : $desc.addClass('hide')
    }),
    $rsvpFormInner.on('click', '#add-message', function (event) {
      event.preventDefault(),
        $(this).hide(),
        $('#rsvp-message').removeClass('hide').focus().width()
    }),
    $rsvpFormInner.on('keyup', '.form-field', function (e) {
      if (13 == e.which) {
        var $this = $(this)
        if (!$this.hasClass('textarea')) {
          if (
            $this.parent().hasClass('radio') &&
            ($this.trigger('click'), $this.hasClass('attending-toggle'))
          )
            return window.splash.pageAction.submitRsvpForm(), !1
          var $n = $this.next('.form-field')
          if (0 < $n.length) $n.focus()
          else {
            var input_index = 1 * $this.index(),
              next = input_index,
              $next_input = $rsvpFormInner.find(
                '.form-field:eq(' + next + ')'
              )
            0 < $next_input.length
              ? $next_input.focus()
              : ((next = input_index + 1),
                0 <
                  ($next_input = $rsvpFormInner.find(
                    '.form-field:eq(' + next + ')'
                  )).length && $next_input.focus())
          }
        }
      }
    }),
    $rsvpFormInner.on('change', '.date-select', function () {
      var $this = $(this),
        $parent = $this.parents('.date-holder')
      if ($this.hasClass('month'))
        if (-1 < $.inArray($this.val(), ['02', '04', '06', '09', '11']))
          if (
            ($parent
              .find('.day:first')
              .find(
                ".option[value='29'],.option[value='30'],.option[value='31']"
              )
              .hide(),
            '02' == $this.val())
          ) {
            var yearValue = $parent.find('.year').val()
            if ('' != yearValue)
              1 == new Date(yearValue, 1, 29).getMonth() &&
                $parent
                  .find('.day:first')
                  .find(".option[value='29']")
                  .show()
          } else
            $parent
              .find('.day:first')
              .find('.option')
              .show()
              .end()
              .find(".option[value='31']")
              .hide()
        else $parent.find('.day:first').find('.option').show()
      else if ($this.hasClass('year')) {
        var year = $this.val()
        if ('02' == $parent.find('.month').val())
          1 == new Date(year, 1, 29).getMonth()
            ? $parent.find('.day:first').find(".option[value='29']").show()
            : $parent.find('.day:first').find(".option[value='29']").hide()
      }
      var p_year = $parent.find('.year').val(),
        p_month = $parent.find('.month').val(),
        p_day = $parent.find('.day').val()
      $this
        .parents('.date-holder')
        .find('input.custom')
        .val(p_year + '-' + p_month + '-' + p_day)
    }),
    $('#sendANote, #contactOrgFtr').click(function (event) {
      return event.preventDefault(), openContactOrganizerModal(), !1
    }),
    $rsvpModal.on('change', '#attendee_count', function () {
      var attendeeCount = parseInt($(this).val(), 10),
        $guestInfoWraps = $('.guest-info-wrap')
      $('.guest-info-wrap').addClass('is-hidden')
      for (var i = 0; i < attendeeCount - 1; i++)
        $guestInfoWraps.eq(i).removeClass('is-hidden')
    }),
    $rsvpModal.on(
      {
        click: function () {
          var $this = $(this)
          $this.prop('checked')
            ? $this
                .parents('.options')
                .find('input.other-input-field')
                .fadeIn(300, function () {
                  $(this).focus()
                })
            : $this
                .parents('.options')
                .find('input.other-input-field')
                .val('')
                .hide()
        },
      },
      'input[value="include_other_opt"]'
    ),
    $rsvpModal.on(
      {
        click: function () {
          'include_other_opt' !== $(this).val() &&
            $(this)
              .parents('.options')
              .find('input.other-input-field')
              .val('')
              .hide()
        },
      },
      '.radio input'
    ),
    $document.on(
      {
        change: function () {
          var $this = $(this)
          1 == $this.val()
            ? $this
                .parents('.options')
                .find('input.other-input-field')
                .fadeIn(300, function () {
                  $(this).focus()
                })
            : $this
                .parents('.options')
                .find('input.other-input-field')
                .val('')
                .hide()
        },
      },
      'input[field="include_other_opt"], input[use-val="include_other_opt"]'
    ),
    $document.on('change', 'select, input.dropdown', function () {
      var $t = $(this),
        $input = $t
          .parents('.select-holder:first')
          .find('input.other-input-field')
      0 < $input.length &&
        ('include_other_opt' == $t.val()
          ? $input.fadeIn().focus()
          : $input.hide().val(''))
    }),
    $document.on('click', '.plus-one-wrap label', function (e) {
      var isChecked =
          'checkbox' === $('#rsvp-plus-1').attr('type')
            ? $('#rsvp-plus-1').is(':checked')
            : parseInt($('#rsvp-plus-1').val(), 10),
        $plusOneInputs = $(e.currentTarget)
          .parents('.plus-one-wrap')
          .find('input')
      isChecked
        ? $plusOneInputs.removeClass('is-hidden')
        : $plusOneInputs.addClass('is-hidden').val('')
    }),
    $document.on('click', '.attending-wrap', function () {
      $('.cantMakeIt').find('input').is(':checked') ||
        ($rsvpFormInner.find('.attending-wrap').removeClass('selected'),
        $(this).addClass('selected'))
    }),
    $document.on('change', 'input[type="file"]', function () {
      var filename = $(this)
        .val()
        .replace(/C:\\fakepath\\/i, '')
      $(this)
        .attr('data-content', 'Uploaded: ' + filename)
        .addClass('uploaded')
    }),
    $document.on(
      'click',
      '#rsvp-submit',
      window.debounce(function () {
        window.splash.pageAction.submitRsvpForm()
      }, 100)
    ),
    galleryInit(),
    $document.on('click', '#afterRsvpMessage .close', function () {
      window.closeSimpleModal()
    })
  var openTicketCalcTimer,
    closingSimple = !1,
    closeSimpleWithDelay = function () {
      $body.removeClass('showSimple'),
        clearTimeout(closingSimple),
        (closingSimple = setTimeout(function () {
          window.closeSimpleModal()
        }, 300))
    }
  if (
    ($('#simple-modal-wrap').on('click', function (event) {
      if (
        'none' !== $rsvpModal.css('display') &&
        $(event.target).hasClass('simple-modal-flow-control')
      )
        return (
          event.preventDefault(),
          'none' !== $('#rsvp-modal').css('display') &&
            closeSimpleWithDelay(),
          !1
        )
    }),
    $rsvpModal.on('click', '.close-form', function (event) {
      return event.preventDefault(), closeSimpleWithDelay(), !1
    }),
    $document.on('click', '#purchase-button', function () {
      return window.splash.pageAction.submitTicketForm(), !1
    }),
    $document.on(
      {
        keyup: function () {
          var $this = $(this)
          clearTimeout(openTicketCalcTimer)
          var inc = 0
          'text' === $this.prop('type') && (inc = 1250),
            (openTicketCalcTimer = setTimeout(function () {
              openPriceValidationCheck($this)
            }, inc))
        },
        blur: function () {
          var $this = $(this)
          clearTimeout(openTicketCalcTimer),
            (openTicketCalcTimer = setTimeout(function () {
              openPriceValidationCheck($this)
            }, 0))
        },
      },
      'input.open_price_buy'
    ),
    void 0 !== window.splash.server.constants.rsvp_form_field_values)
  )
    for (var key in window.splash.server.constants.rsvp_form_field_values)
      if (
        {}.hasOwnProperty.call(
          window.splash.server.constants.rsvp_form_field_values,
          key
        )
      ) {
        var value = $.trim(
          window.splash.server.constants.rsvp_form_field_values[key]
        )
        if ('first_name' == key || 'last_name' == key || 'email' == key) {
          ;($input =
            window.splash.pageAction.getReservedInputWithFallback(
              key
            )).val(value)
        } else {
          var num = key.replace('custom_field_', '')
          if (
            1 ==
            ($input = $rsvpFormInner.find(
              'input[num="' + num + '"]:first'
            )).length
          ) {
            var type = $input.attr('type') || !1
            if ('radio' == type || 'checkbox' == type) {
              var set = !1
              if (
                ($rsvpFormInner
                  .find('input[num="' + num + '"]')
                  .each(function () {
                    var $this = $(this)
                    $this.attr('type') == type && $this.val() == value
                      ? ($this.prop('checked', !0), (set = !0))
                      : $this.prop('checked', !1)
                  }),
                0 == set)
              )
                1 ==
                  ($input = $rsvpFormInner.find(
                    'input[num="' + num + '"].other-input-field'
                  )).length &&
                  ($rsvpFormInner
                    .find(
                      'input[num="' + num + '",value="include_other_opt"]'
                    )
                    .prop('checked', !0),
                  $input.val(value))
            } else if ($input.parent().hasClass('nu-checkbox'))
              if ($input.hasClass('multi')) {
                var values = ('' + value).split('||'),
                  matchedValues = []
                if (
                  ($rsvpFormInner
                    .find('input[num="' + num + '"]')
                    .each(function () {
                      var $t = $(this)
                      ;-1 !== $.inArray($t.attr('value'), values) &&
                        ($t.parent().addClass('checked'),
                        matchedValues.push($t.attr('value')))
                    }),
                  values.length != matchedValues.length)
                ) {
                  var $otherInput = $rsvpFormInner.find(
                    'input.other-input-field[num="' + num + '"]:first'
                  )
                  if (1 == $otherInput.length) {
                    for (
                      var otherValue = '', i = 0;
                      i < values.length;
                      i++
                    )
                      -1 === $.inArray(values[i], matchedValues) &&
                        ('' != otherValue && (otherValue += ' '),
                        (otherValue += ('' + values[i]).replace(
                          'Other: ',
                          ''
                        )))
                    $otherInput
                      .prev('.nu-checkbox:first')
                      .addClass('checked'),
                      $otherInput.val(otherValue),
                      $otherInput.show()
                  }
                }
              } else '' != value && $input.parent().addClass('checked')
            else
              $input.parent().hasClass('nu-dropdown')
                ? ('' + value).match(/^Other: /)
                  ? (window.flipDropDown(
                      $input.parent(),
                      'include_other_opt',
                      !0
                    ),
                    $input
                      .parent()
                      .siblings('input.other-input-field:first')
                      .val(('' + value).replace(/^Other: /, ''))
                      .blur())
                  : window.flipDropDown($input.parent(), value, !0)
                : 'file' === $input.attr('type') ||
                  ($input[0].value = value)
          } else {
            var $input
            if (
              1 ==
              ($input = $rsvpFormInner.find(
                'textarea[num="' + num + '"]:first'
              )).length
            )
              $input.val(value)
            else if (
              1 ==
              ($input = $rsvpFormInner.find(
                'select[num="' + num + '"]:first'
              )).length
            )
              $input.val(value)
            else
              ($input = $(
                '<input id="custom-' +
                  num +
                  '" class="custom optional" num="' +
                  num +
                  '" name="custom_field_' +
                  num +
                  '" type="hidden" />'
              )).val(value),
                $rsvpFormInner.append($input)
          }
        }
      }
  if (
    ($splashContainer.on('click', 'a', function (event) {
      var $clickedLink = $(this)
      if (
        $clickedLink.hasClass('nav-jump') ||
        $clickedLink.hasClass('button-link')
      ) {
        var allowFinetuneButtonClicks =
            window.splash &&
            window.splash.server &&
            window.splash.server.constants &&
            window.splash.server.constants.finetuneHovers &&
            'hide' === window.splash.server.constants.finetuneHovers,
          isTargetSelf = '_self' === $clickedLink.prop('target'),
          isTargetBlank = '_blank' === $clickedLink.prop('target'),
          isCmsIFramedPreview = window.splash.server.constants.preview
        if (
          !window.splash.server.constants.finetune ||
          allowFinetuneButtonClicks
        ) {
          if (!isTargetSelf && !isTargetBlank) {
            if ($clickedLink.parents('.grp:first').hasClass('firstTiny'))
              return !1
            isCmsIFramedPreview &&
              takeLinkActionToTopLevelFrameIfNeeded($clickedLink, event),
              jumpToNavBlock($clickedLink, event)
          }
          isCmsIFramedPreview &&
            isTargetSelf &&
            takeLinkActionToTopLevelFrameIfNeeded($clickedLink, event)
        } else event.preventDefault()
      } else takeLinkActionToTopLevelFrameIfNeeded($clickedLink, event)
    }),
    $mainCanvas.find('.carousel').each(function () {
      $(this).activateCarousel()
    }),
    $rsvpModal.on('click', '.shareBox .sharing-provider', function (e) {
      var $this = $(this),
        providerType = $this.attr('method')
      'facebook' === providerType &&
        window.splash.socialActions.fireFacebookShare(),
        'twitter' === providerType &&
          window.splash.socialActions.fireTweet(),
        'linkedin' === providerType &&
          window.splash.socialActions.fireLinkedInShare(),
        'link' === providerType &&
          window.splash.socialActions.copyPageUrl($this)
    }),
    $rsvpModal.on('click', '.shareBox .closeShareBox', function (e) {
      var $shareBox = $(this).parents('.shareBox:first')
      $shareBox.animate({ width: '0px' }, 350, 'linear', function () {
        $shareBox.remove()
      })
    }),
    $rsvpModal.on('click', '.shareBox .share-with-friends', function (e) {
      e.preventDefault(),
        $(this).closest('.shareBox').addClass('sharingThePage')
    }),
    $rsvpModal.on('click', '.nu-checkbox > a', function (e) {
      return (
        e.preventDefault(),
        window.open($(this).attr('href'), '_blank', 'noopener,noreferrer'),
        !1
      )
    }),
    navigator.userAgent.match(/Trident\/7\./))
  ) {
    $body.addClass('isIE')
    var thisVer = ('' + $.browser.version).substring(0, 2).replace('.', '')
    $body.addClass('v' + thisVer)
  } else $body.removeClass('isIE')
  window.splash.server.constants.openRsvp &&
    window.splash.pageAction.showPageActionForm(),
    $('#rsvp-plus-1').click(function () {
      $('#guest-name').toggleClass('active')
    }),
    $document.on('change', '.custom-file-upload', function () {
      var $input = $(this),
        uploadImgId = $input.data('customfield-img'),
        $container = $input.closest('.custom-file-upload-holder')
      window.splash.customFileUpload($input, {
        $container: $container,
        $hiddenInput: $container.find('.custom-file-upload-url'),
        $placeholder: $('#customfield-img-' + uploadImgId),
        uploadImgId: uploadImgId,
      })
    }),
    window.splash.pageAction.bind(),
    window.splash.pageAction.detectIframe()
  try {
    window.splash.server._event &&
      window.splash.pageAction.evaluateConditions()
  } catch (error) {
    setTimeout(function () {
      throw new Error(error)
    }, 0)
  }
  setTimeout(function () {
    matchHeight()
  }, 500),
    window.splash.PubSub.subscribe('page-resize-rendered', function () {
      matchHeight()
    }),
    window.location &&
      '#contact-organizer' === window.location.hash &&
      openContactOrganizerModal(),
    $document.on(
      'click',
      '.social-auth-container[network="facebook"]',
      function (e) {
        e.preventDefault(),
          window.FB.getLoginStatus(function (response) {
            console.log(response),
              'connected' === response.status
                ? (getFacebookInfo(response.authResponse.signedRequest),
                  removeHighlightColor(),
                  $('.social-auth-container[network="facebook"]').addClass(
                    'selected-color'
                  ))
                : window.FB.login(
                    function (response) {
                      response.authResponse &&
                        (getFacebookInfo(
                          response.authResponse.signedRequest
                        ),
                        removeHighlightColor(),
                        $(
                          '.social-auth-container[network="facebook"]'
                        ).addClass('selected-color'))
                    },
                    { scope: 'public_profile, email' }
                  )
          })
      }
    ),
    $document.on(
      'click',
      '.social-auth-container[network="linkedin"]',
      function (e) {
        e.preventDefault()
        var url =
          ('https:' == document.location.protocol
            ? 'https://'
            : 'http://') +
          window.splash.server.constants.ocbDomain +
          '/events/remoteAuth/0/linkedin/?_callback=linkedinAuthed'
        window.open(url, 'LinkedInAuth', 'width=540,height=585')
      }
    ),
    $('.social-auth-fields input.form-field').on('change', function () {
      $(this)
        .closest('div')
        .removeClass('icon-f-facebook-rect icon-f-linkedin-squared')
    })
  var galleryPhotoId = window.getParameterByName('pid')
  if (
    (0 < galleryPhotoId && showTheGallery(galleryPhotoId),
    0 < window.getParameterByName('autoopen'))
  ) {
    var isTakingScreenshot = window.getParameterByName(
      'isTakingScreenshot'
    )
    if (
      (window.splash.pageAction.showPageActionForm(),
      0 < isTakingScreenshot)
    ) {
      var styleTag = document.createElement('style'),
        captureDiv = document.createElement('div')
      captureDiv.classList.add('say-cheese'),
        (styleTag.innerHTML =
          '#rsvp-modal { position: absolute; top: 0; left: 0; margin-top: 0 !important; }'),
        document.head.appendChild(styleTag),
        document.body.appendChild(captureDiv)
    }
  }
  if (
    (window.getParameterByName('showConfirmation') &&
      window.splash.PageActionManager &&
      window.splash.PageActionManager
        .flipToConfirmationModeForScreenshots &&
      window.splash.PageActionManager.flipToConfirmationModeForScreenshots(),
    setTimeout(function () {
      autoFontResize()
    }, 0),
    window.splash.server.captcha_enabled &&
      'collect' === window.splash.server._event.rsvp_method &&
      ('open' === window.splash.server._event.rsvp_status ||
        'waitlist' === window.splash.server._event.rsvp_status))
  ) {
    var $nodeToAttachCaptcha = $('#rsvp-modal').find('.btnWrap')
    if ($nodeToAttachCaptcha.length) {
      var captchaModal = window.splash.captchaFactory({
        attachTo: $nodeToAttachCaptcha,
        attachMethod: 'before',
        splashGlobal: window.splash,
      })
      captchaModal.attachCaptcha().then(function () {
        $('#rsvp-modal')
          .find('.g-recaptcha')
          .data('captcha-instance', captchaModal)
      })
    } else console.warn('DOM node to attach captcha not found')
  }
  $('.cms-block-type-content.linked-to-user-name')
    .find('.body')
    .text(window.splash.cmsUtils.getLoggedInUserDisplayName()),
    $document.on('click', '.urlShare', function (e) {
      e.preventDefault()
      var $this = $(this)
      if (0 == $this.find('input').length) {
        var $p = $('<input type="text" />')
        $p.css({
          width: '171px',
          fontFamily: 'Arial,sans-serif',
          fontSize: '12px',
          position: 'absolute',
          right: '108px',
          top: '52px',
          background: '#eeeeee',
          display: 'inline-block',
        }),
          $p.prop('disabled', !0),
          $p.val($this.attr('href')),
          $this.append($p),
          $p.select()
      } else $this.find('input').remove()
      return !1
    }),
    $document.on('click', 'a.backToTop', function (event) {
      return (
        event.preventDefault(),
        $('html, body').animate({ scrollTop: 0 }, 300),
        !1
      )
    }),
    $document.on('click', '#loadMoreThumbs', function () {
      checkViewportForThumbsToLoad()
    }),
    $(window).resize(window.debounce(window.onWindowResize, 250)),
    window.splash.PubSub.subscribe('rsvp-completed', {
      context: this,
      eventHandler: function (e) {
        var guestAccessHash =
            e && e.serverResponse && e.serverResponse.guestAccessHash,
          splashAttendeeApiClient =
            window.SPLASH && window.SPLASH.attendeeApiClient
        guestAccessHash &&
          splashAttendeeApiClient &&
          window.SPLASH.attendeeApiClient.setGuestAccessHash(
            e.serverResponse.guestAccessHash
          )
      },
    })
}
function getHighestParentWindow() {
  for (var windowParent = window; windowParent.parent !== windowParent; )
    windowParent = windowParent.parent
  return windowParent
}
function takeLinkActionToTopLevelFrameIfNeeded(link, event) {
  if (
    window.splash.server.constants.onCmsPage ||
    window.splash.server.constants.preview
  ) {
    var href,
      highestParentWindow = getHighestParentWindow()
    if ('string' == typeof link) href = link
    else {
      if (void 0 === link.jquery || '_blank' === link.attr('target'))
        return !1
      href = link.attr('href')
    }
    if (href && 0 !== href.indexOf('#'))
      return (
        event.preventDefault(), (highestParentWindow.location = href), !0
      )
  }
  return !1
}
function getFacebookInfo(signed_request) {
  window.FB.api(
    '/me',
    function (response) {
      var data = {}
      if (
        (void 0 !== response.email && (data.email = response.email),
        void 0 !== response.first_name &&
          (data.first_name = response.first_name),
        void 0 !== response.last_name &&
          (data.last_name = response.last_name),
        void 0 === data.first_name &&
          void 0 === data.last_name &&
          void 0 !== response.name)
      ) {
        var split_name = response.name.split(' ')
        2 == split_name.length &&
          ((data.first_name = split_name[0]),
          (data.last_name = split_name[1]))
      }
      if (
        (void 0 !== response.birthday &&
          (data.birth_date = response.birthday),
        void 0 !== response.gender && (data.gender = response.gender),
        void 0 !== response.location && void 0 !== response.location.name)
      ) {
        data.location = response.location.name
        var split_location = data.location.split(',')
        2 == split_location.length &&
          (data.state = split_location[1].trim())
      }
      void 0 !== response.website && (data.website = response.website),
        void 0 !== response.work &&
          0 < response.work.length &&
          (void 0 !== response.work[0].employer &&
            void 0 !== response.work[0].employer.name &&
            (data.company = response.work[0].employer.name),
          void 0 !== response.work[0].description &&
            (data.job_title = response.work[0].description)),
        fillRsvpForm(data, 'facebook')
      var encoded_response = JSON.stringify(response),
        $social_input = $('#rsvp-form-inner').find(
          'input[social-attr="splash_facebook_rsvp"]'
        )
      0 < $social_input.length && $social_input.val(encoded_response)
    },
    { fields: 'id,name,email,gender,birthday,location,website,work' }
  )
}
function fillRsvpForm(rsvp_data, social_network) {
  var $rsvp_form = $('.rsvp-form')
  void 0 !== rsvp_data.first_name &&
    ($rsvp_form.find('input[name="first_name"]').val(rsvp_data.first_name),
    socialIconInputUpdate('first-name', social_network)),
    void 0 !== rsvp_data.last_name &&
      ($rsvp_form.find('input[name="last_name"]').val(rsvp_data.last_name),
      socialIconInputUpdate('last-name', social_network)),
    void 0 !== rsvp_data.email &&
      ($rsvp_form.find('input[name="email"]').val(rsvp_data.email),
      socialIconInputUpdate('email', social_network))
  for (
    var custom_fields = window.splash.server._event.custom_rsvp_fields,
      i = 0;
    i < Object.keys(custom_fields).length;
    i++
  ) {
    var field = custom_fields[i],
      name = field.name
    ;(/^company/i.test(name) || /^organization/i.test(name)) &&
      void 0 !== rsvp_data.company &&
      fillValueByType(
        $rsvp_form,
        field,
        rsvp_data.company,
        social_network
      ),
      /^job ?title/i.test(name) &&
        void 0 !== rsvp_data.job_title &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.job_title,
          social_network
        ),
      /^address/i.test(name) &&
        void 0 !== rsvp_data.address &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.address,
          social_network
        ),
      /^city/i.test(name) &&
        void 0 !== rsvp_data.city &&
        fillValueByType($rsvp_form, field, rsvp_data.city, social_network),
      /^state/i.test(name) &&
        void 0 !== rsvp_data.state &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.state,
          social_network
        ),
      /^zip/i.test(name) &&
        void 0 !== rsvp_data.zip &&
        fillValueByType($rsvp_form, field, rsvp_data.zip, social_network),
      /^phone/i.test(name) &&
        void 0 !== rsvp_data.phone &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.phone,
          social_network
        ),
      /^website/i.test(name) &&
        void 0 !== rsvp_data.website &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.website,
          social_network
        ),
      (/^gender/i.test(name) || /^sex/i.test(name)) &&
        void 0 !== rsvp_data.gender &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.gender,
          social_network
        ),
      /^birth ?da(te|y)/i.test(name) &&
        void 0 !== rsvp_data.birth_date &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.birth_date,
          social_network
        ),
      /^instagram/i.test(name) &&
        void 0 !== rsvp_data.instagram &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.instagram,
          social_network
        ),
      /^twitter/i.test(name) &&
        void 0 !== rsvp_data.twitter &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.twitter,
          social_network
        ),
      /^pinterest/i.test(name) &&
        void 0 !== rsvp_data.pinterest &&
        fillValueByType(
          $rsvp_form,
          field,
          rsvp_data.pinterest,
          social_network
        )
  }
}
function fillValueByType($rsvp_form, field, value, social_network) {
  if ('text' == field.type) {
    var $rsvp_form_input = $rsvp_form.find(
        'input[name="' + field.column_name + '"]'
      ),
      $rsvp_form_input_parent = $rsvp_form_input.parent().closest('div')
    switch (
      ($rsvp_form_input.val(value),
      $rsvp_form_input_parent.removeClass(
        'icon-f-twitter icon-f-facebook-rect icon-f-linkedin-squared icon-f-googleplus-rect'
      ),
      social_network)
    ) {
      case 'facebook':
        $rsvp_form_input_parent.addClass(
          'kohtello-icon icon-f-facebook-rect'
        )
        break
      case 'twitter':
        $rsvp_form_input_parent.addClass('kohtello-icon icon-f-twitter')
        break
      case 'linkedin':
        $rsvp_form_input_parent.addClass(
          'kohtello-icon icon-f-linkedin-squared'
        )
        break
      case 'google_plus':
        $rsvp_form_input_parent.addClass(
          'kohtello-icon icon-f-googleplus-rect'
        )
    }
  } else if ('radio' == field.type) {
    var $radio_container = $rsvp_form
        .find('input[num="' + field.number + '"]')
        .parents('.radio-holder'),
      $options = $radio_container.find('input[type="radio"]')
    switch (
      ($.each($options, function (i, option) {
        var $option = $(option),
          option_value = $option.val()
        if (new RegExp('^' + value, 'i').test(option_value))
          return $option.trigger('click'), !1
      }),
      $radio_container.removeClass(
        'icon-f-twitter icon-f-facebook-rect icon-f-linkedin-squared icon-f-googleplus-rect'
      ),
      social_network)
    ) {
      case 'facebook':
        $radio_container.addClass('kohtello-icon icon-f-facebook-rect')
        break
      case 'twitter':
        $radio_container.addClass('kohtello-icon icon-f-twitter')
        break
      case 'linkedin':
        $radio_container.addClass('kohtello-icon icon-f-linkedin-squared')
    }
  } else if ('date' == field.type) {
    var split_date, month, day, year
    3 ==
    (split_date =
      -1 < value.indexOf('/')
        ? value.split('/')
        : -1 < value.indexOf('-')
        ? value.split('-')
        : value.split('/')).length
      ? ((month = split_date[0]),
        (day = split_date[1]),
        (year = split_date[2]))
      : 2 == split_date.length
      ? ((month = split_date[0]), (day = split_date[1]))
      : 1 == split_date.length && (year = split_date[0])
    var $dropdown,
      $date_container = $rsvp_form
        .find('input[name="' + field.column_name + '"]')
        .parents('.date-holder')
    switch (
      (void 0 !== day &&
        (($dropdown = $date_container.find('.nu-dropdown.day')),
        window.flipDropDown($dropdown, day, !0)),
      void 0 !== month &&
        (($dropdown = $date_container.find('.nu-dropdown.month')),
        window.flipDropDown($dropdown, month, !0)),
      void 0 !== year &&
        (($dropdown = $date_container.find('.nu-dropdown.year')),
        window.flipDropDown($dropdown, year, !0)),
      $date_container.removeClass(
        'icon-f-twitter icon-f-facebook-rect icon-f-linkedin-squared icon-f-googleplus-rect'
      ),
      social_network)
    ) {
      case 'facebook':
        $date_container.addClass('kohtello-icon icon-f-facebook-rect')
        break
      case 'twitter':
        $date_container.addClass('kohtello-icon icon-f-twitter')
        break
      case 'linkedin':
        $date_container.addClass('kohtello-icon icon-f-linkedin-squared')
    }
  }
}
function removeHighlightColor() {
  $('.social-auth-container').removeClass('selected-color')
}
function socialIconInputUpdate(input_field, social_network) {
  var $inputSocialField = $(
    '#rsvp-form-inner .social-auth-fields .rsvp-' +
      input_field +
      '.kohtello-icon'
  )
  switch (
    ($inputSocialField.removeClass(
      'icon-f-twitter icon-f-facebook-rect icon-f-linkedin-squared icon-f-googleplus-rect'
    ),
    social_network)
  ) {
    case 'facebook':
      $inputSocialField.addClass('icon-f-facebook-rect')
      break
    case 'twitter':
      $inputSocialField.addClass('icon-f-twitter')
      break
    case 'linkedin':
      $inputSocialField.addClass('icon-f-linkedin-squared')
  }
}
function getDOMNodeHeight($node) {
  return Element.prototype.getBoundingClientRect
    ? $node[0].getBoundingClientRect().height
    : $node.outerHeight()
}
function getMatchHeightContainers($el) {
  return (
    $el || ($el = $('#splash-container')),
    $el.find('.layoutGrp.match-height')
  )
}
function matchHeight(
  $layoutGrp,
  forcedMatchHeightMode,
  forceWithoutLayoutGroup,
  opts
) {
  ;(opts = 'object' == typeof opts ? opts : {}),
    null == $layoutGrp && ($layoutGrp = getMatchHeightContainers()),
    $layoutGrp.hasClass('layoutGrp') ||
      forceWithoutLayoutGroup ||
      ($layoutGrp = $layoutGrp.closest('.layoutGrp')),
    $layoutGrp.each(function () {
      var $thisLayoutGrp = $(this),
        matchMode =
          'string' == typeof forcedMatchHeightMode
            ? forcedMatchHeightMode
            : $thisLayoutGrp.attr('match-height'),
        childrenSelector = opts.childrenSelector || '.list-item'
      ;($layoutGrp.hasClass('container-ele') ||
        $layoutGrp.hasClass('dope-repeatable-container')) &&
        (childrenSelector = '> .grp'),
        'string' == typeof matchMode && 'section' === matchMode
          ? matchSectionsHeight($thisLayoutGrp, childrenSelector)
          : 'string' == typeof matchMode && 'none' === matchMode
          ? unmatchHeight($thisLayoutGrp)
          : matchChildrenHeight($thisLayoutGrp, childrenSelector)
    })
}
function matchChildrenHeight($layoutGrp, childrenSelector) {
  var thisHeight = 0
  $layoutGrp.find(childrenSelector).each(function () {
    var $child = $(this)
    $child.css('min-height', '')
    var childHeight = getDOMNodeHeight($child)
    thisHeight < childHeight && (thisHeight = childHeight)
  }),
    $layoutGrp
      .find(childrenSelector)
      .css('min-height', thisHeight + 'px')
      .addClass('match-height-affected')
}
function matchSectionsHeight($layoutGrp, childrenSelector) {
  var heights = {}
  for (var sectionClass in ($layoutGrp
    .find(childrenSelector)
    .each(function () {
      $(this)
        .find('.layoutGrp,.cardLayoutGrp')
        .each(function () {
          var $section = $(this)
          if (0 === $section.find('.layoutGrp,.cardLayoutGrp').length) {
            $section.css('min-height', '')
            var sectionHeight = getDOMNodeHeight($section),
              sectionClass = $section.attr('class').match(/ddh-[a-z0-9]+/)
            sectionClass ||
              (sectionClass = $section
                .attr('class')
                .match(/drill-rep-[a-z0-9]+/)),
              sectionClass &&
                (!heights[sectionClass] ||
                  sectionHeight > heights[sectionClass]) &&
                (heights[sectionClass] = sectionHeight)
          }
        })
    }),
  heights))
    ({}.hasOwnProperty.call(heights, sectionClass) &&
      $layoutGrp
        .find('.' + sectionClass)
        .css('min-height', heights[sectionClass] + 'px')
        .addClass('match-height-affected'))
}
function unmatchHeight($layoutGrp) {
  null == $layoutGrp &&
    ($layoutGrp = $('#splash-container').find('.layoutGrp.match-height')),
    $layoutGrp
      .find('.match-height-affected')
      .css('min-height', '')
      .removeClass('match-height-affected')
}
function openContactOrganizerModal() {
  window.splash &&
    window.splash.ContactFormManager &&
    window.splash.ContactFormManager.openModal &&
    window.splash.ContactFormManager.openModal()
}
function openPriceValidationCheck($price_input) {
  var inputted_price = $price_input.val()
  '' != inputted_price &&
    ((inputted_price = parseFloat(inputted_price)),
    isNaN(inputted_price) || inputted_price < 0
      ? (inputted_price = 0)
      : inputted_price < 1 && 0 < inputted_price && (inputted_price = 1),
    (inputted_price < parseFloat($price_input.data('min')) ||
      (0 < parseFloat($price_input.data('max')) &&
        inputted_price > parseFloat($price_input.data('max')))) &&
      $price_input
        .parents('.form-holder')
        .find('.required-fields')
        .html('Please ensure price falls between minimum and maximum.')
        .show(),
    (inputted_price = inputted_price.toFixed(2)),
    $price_input.val(inputted_price))
}
$(window).on('load', function () {
  autoFontResize()
}),
  window.addEventListener('message', function (event) {
    var response = event.data || {},
      type = (window.splash, response.type),
      callback = response.callback,
      data = response.data,
      origin = event.origin,
      allowOrigin = 'https://splashthat.com'
    window.splash.server &&
      window.splash.server.constants &&
      window.splash.server.constants.ocbDomain &&
      (allowOrigin =
        'https://' + window.splash.server.constants.ocbDomain),
      'X-SPLASH-REMOTE-AUTH' !== type ||
        (allowOrigin && origin !== allowOrigin) ||
        'function' != typeof window[callback] ||
        window[callback](data)
  }),
  (window.linkedinAuthed = function (data) {
    if ('error' == data)
      SplashUI.notify('There was an error with LinkedIn Integration.')
    else {
      var linkedinData = {}
      void 0 !== data &&
        (void 0 !== data.firstName &&
          (linkedinData.first_name = data.firstName),
        void 0 !== data.lastName &&
          (linkedinData.last_name = data.lastName),
        void 0 !== data.emailAddress &&
          (linkedinData.email = data.emailAddress),
        void 0 !== data.positions &&
          void 0 !== data.positions.values &&
          void 0 !== data.positions.values[0] &&
          void 0 !== data.positions.values[0].company &&
          void 0 !== data.positions.values[0].company.name &&
          (linkedinData.company = data.positions.values[0].company.name),
        fillRsvpForm(linkedinData, 'linkedin')),
        removeHighlightColor(),
        $('.social-auth-container[network="linkedin"]').addClass(
          'selected-color'
        )
      var encoded_response = JSON.stringify(data),
        $social_input = $('#rsvp-form-inner').find(
          'input[social-attr="splash_linkedin_rsvp"]'
        )
      0 < $social_input.length && $social_input.val(encoded_response)
    }
  }),
  (window.splash.matchHeight = matchHeight),
  (window.splash.unmatchHeight = unmatchHeight)
var gBlankHtml,
  galleryOpen = !(RegExp.escape = function (text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }),
  currentPhotoId = 0,
  galleryIframeUtils = {
    top: 0,
    switchOrigin: '',
    isActive: function () {
      return (
        window.location != window.parent.location &&
        $(window).height() > 2 * $(window).width()
      )
    },
  }
function galleryInit() {
  if (!($('#gallery-thumbs div.photo-thumb').length < 1)) {
    var $gBlank = $('#gallery').find('div.photo:first')
    for (var i in ($gBlank.detach(),
    (gBlankHtml =
      '<div photo-id=":id:" n=":i:" class="photo :type:">' +
      $gBlank.html() +
      '</div>'),
    window.galleryImages))
      ({}.hasOwnProperty.call(window.galleryImages, i) &&
        (galleryI[window.galleryImages[i].id] = parseInt(i, 10) + 1))
    $(document).on(
      {
        mouseenter: function () {
          $(this).addClass('activeLI')
        },
        mouseleave: function () {
          $(this).removeClass('activeLI')
        },
      },
      'div.photos div.photo'
    ),
      $('div.photos').click(function () {
        $('div.activeLI').length < 1 && hideTheGallery()
      }),
      'undefined' == typeof adminSort &&
        $(document).on('click', 'div.photo-thumb', function () {
          if ($('#finetune-block').length) return !1
          showTheGallery($(this).find('img.th').attr('photo-id'))
        }),
      setTimeout(function () {
        window.splash.galleryThumbFlow()
      }, 1e3),
      $('#gallery .mask-below, #gallery .actions .close').click(
        function () {
          hideTheGallery()
        }
      ),
      (currentPhotoId = $('#gallery div.photos div.photo:first').attr(
        'photo-id'
      )),
      $('#gallery .actions .next,#gallNext').click(function () {
        galleryNext()
      }),
      $('#gallery .photo-count .first').click(function () {
        showTheGallery(galleryI[0])
      }),
      $('#gallery .photo-count .last').click(function () {
        showTheGallery(galleryI[galleryI.length - 1])
      }),
      $('#gallery .actions .prev,#gallPrev').click(function () {
        galleryPrevious()
      }),
      $('#gallery .actions .playPause').click(function () {
        $(this).find('.play').hasClass('hide')
          ? ($(this).find('.play').removeClass('hide'),
            $(this).find('.pause').addClass('hide'),
            stopGallerySlideshow())
          : ($(this).find('.play').addClass('hide'),
            $(this).find('.pause').removeClass('hide'),
            startGallerySlideshow())
      }),
      $(document).keyup(function (e) {
        if (galleryOpen) {
          var keyCode = e.which
          37 == keyCode || 38 == keyCode
            ? galleryPrevious()
            : 39 == keyCode || 40 == keyCode
            ? galleryNext()
            : 27 == keyCode && hideTheGallery()
        }
      })
    var index,
      $_GET = getQueryParams(document.location.search)
    if (window.location.hash && window.location.hash.match(/^#p[0-9]+/))
      (index = parseInt(window.location.hash.replace(/^#p/, ''))) <=
        window.galleryImages.length &&
        setTimeout(function () {
          showTheGallery(1, index)
        }, 1e3)
    else if ($_GET.p && !isNaN(parseInt($_GET.p)) && isFinite($_GET.p))
      (index = parseInt($_GET.p)) <= window.galleryImages.length &&
        setTimeout(function () {
          showTheGallery(1, index)
        }, 1e3)
    else if ($_GET.i && !isNaN(parseInt($_GET.i)) && isFinite($_GET.i)) {
      var photoid = parseInt($_GET.i)
      ;(index = !1),
        galleryI[photoid] &&
          ((index = galleryI[photoid]),
          setTimeout(function () {
            showTheGallery(1, index)
          }, 1e3))
    }
    $_GET.d &&
      !isNaN(parseInt($_GET.d)) &&
      isFinite($_GET.d) &&
      ((photoLoadDelay = 1e3 * $_GET.d), (lzD = photoLoadDelay)),
      void 0 !== $_GET.expired &&
        ($('#rsvp-button').trigger('click'),
        $('.rsvp-form .required-fields')
          .css({ 'font-family': 'Helvetica', 'font-size': '12px' })
          .html('Your order expired')
          .show())
    var loggedOutScrollChecks = window.debounce(function () {
      ;(windowHeight = $(window).height()),
        (scrollTop = $(document).scrollTop()),
        (winBottom = Math.ceil(scrollTop + windowHeight)),
        checkViewportForThumbsToLoad()
    }, 500)
    $(document).scroll(loggedOutScrollChecks)
  }
}
function getQueryParams(qs) {
  qs = qs.split('+').join(' ')
  for (
    var tokens, params = {}, re = /[?&]?([^=&]+)=?([^&]*)?/g;
    (tokens = re.exec(qs));

  )
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
  return params
}
function hideTheGallery() {
  $('body').css('overflow', 'auto'),
    (galleryOpen = !1),
    $('#gallery').fadeOut(400, function () {
      $(this).find('div.photos').empty()
    }),
    (window.location.hash = ''),
    stopGallerySlideshow()
}
var gallerySliding = !1
function startGallerySlideshow() {
  ;(gallerySliding = !0), slideGallery()
}
function slideGallery() {
  gallerySliding &&
    (galleryNext(),
    setTimeout(function () {
      slideGallery()
    }, 5e3))
}
function stopGallerySlideshow() {
  gallerySliding = !1
}
var $gallery,
  galleryI = {}
function showTheGallery(photoId, n, action) {
  $('body').css('overflow', 'hidden'),
    ($gallery = $('#gallery')).find('div.photos').empty(),
    (galleryOpen = !0)
  var $ul = $gallery.find('div.photos')
  if (photoId) {
    if (((galleryIframeUtils.switchOrigin = 'thumbnail'), void 0 === n))
      n = galleryI[photoId]
    if (void 0 === n) return hideTheGallery(), !1
    var $main = newPhotoLi(n)
    $ul.append($main), loadPhoto(n, 0, $main), positionPhotoLi(n, 0)
    var np1 = n + 1
    np1 == window.galleryImages.length + 1 &&
      1 != window.galleryImages.length &&
      (np1 = 1)
    var $nPOne = newPhotoLi(np1)
    if (
      (!1 !== $nPOne &&
        ($ul.append($nPOne),
        loadPhoto(np1, 1, $nPOne),
        positionPhotoLi(np1, 1, $nPOne)),
      2 != window.galleryImages.length)
    ) {
      var nm1 = n - 1
      0 == nm1 &&
        1 != window.galleryImages.length &&
        (nm1 = window.galleryImages.length)
      var $nMOne = newPhotoLi(nm1)
      !1 !== $nMOne &&
        ($ul.append($nMOne),
        loadPhoto(nm1, -1, $nMOne),
        positionPhotoLi(nm1, -1, $nMOne))
    }
    $('#gallery .photo-count span.current').text(n)
  }
  $gallery.fadeIn()
}
function galleryNext() {
  galleryIframeUtils.switchOrigin = 'arrow'
  var p0 = parseInt($gallery.find('div.photo[p=0]').attr('n')),
    p1 = parseInt($gallery.find('div.photo[p=1]').attr('n'))
  if (isNaN(p1) || isNaN(p0)) return !1
  $('#gallery').find('div.photos div.photo[p=-1]').remove(),
    positionPhotoLi(p0, -1),
    positionPhotoLi(p1, 0)
  var newnp2 = p0 + 2
  if (
    (newnp2 == window.galleryImages.length + 1
      ? (newnp2 = 1)
      : newnp2 == window.galleryImages.length + 2 && (newnp2 = 2),
    2 != window.galleryImages.length)
  ) {
    var $nP = newPhotoLi(newnp2)
    $gallery.find('div.photos').append($nP),
      positionPhotoLi(newnp2, 1, $nP),
      loadPhoto(newnp2, 1, $nP)
  }
}
function galleryPrevious() {
  galleryIframeUtils.switchOrigin = 'arrow'
  var p0 = parseInt($gallery.find('div.photo[p=0]').attr('n')),
    pm1 = parseInt($gallery.find('div.photo[p=-1]').attr('n'))
  if (isNaN(pm1) || isNaN(p0)) return !1
  $('#gallery').find('div.photos div.photo[p=1]').remove(),
    positionPhotoLi(p0, 1),
    positionPhotoLi(pm1, 0)
  var newnm2 = p0 - 2
  if (
    (0 == newnm2
      ? (newnm2 = window.galleryImages.length)
      : -1 == newnm2 && (newnm2 = window.galleryImages.length - 1),
    2 != window.galleryImages.length)
  ) {
    var $nM = newPhotoLi(newnm2)
    $gallery.find('div.photos').append($nM),
      positionPhotoLi(newnm2, -1, $nM),
      loadPhoto(newnm2, -1, $nM)
  }
}
function newPhotoLi(n) {
  var newHtml = gBlankHtml.replace(/:i:/g, n)
  if (window.galleryImages[n - 1]) {
    for (var x in window.galleryImages[n - 1])
      if ('credit' == x) {
        var credit = window.galleryImages[n - 1][x]
        'twitter' == window.galleryImages[n - 1].otype
          ? (credit = '@' + credit + '<br>via Twitter')
          : 'instagram' == window.galleryImages[n - 1].otype
          ? (credit = '@' + credit + '<br>via Instagram')
          : 'facebook' == window.galleryImages[n - 1].otype &&
            (credit = '@' + credit + '<br>via Facebook'),
          '' != credit && (credit = 'By ' + credit),
          (newHtml = newHtml.replace(RegExp(':' + x + ':', 'g'), credit))
      } else
        newHtml = newHtml.replace(
          RegExp(':' + x + ':', 'g'),
          window.galleryImages[n - 1][x]
        )
    for (var gallVar in window.gallVars)
      ({}.hasOwnProperty.call(window.gallVars, gallVar) &&
        (newHtml = newHtml.replace(
          RegExp(':' + gallVar + ':', 'g'),
          window.gallVars[gallVar]
        )))
    var $n = $(newHtml)
    if ('' != window.galleryImages[n - 1]['video-url'])
      for (var element in window.videoUrlElements)
        if (
          window.galleryImages[n - 1]['video-url'].match(
            RegExp(window.videoUrlElements[element].reg)
          )
        ) {
          var ele = window.videoUrlElements[element].element.replace(
            /:video-url:/g,
            window.galleryImages[n - 1]['video-url']
          )
          $n.find('img.ph').after(ele)
          break
        }
    return (
      'undefined' != typeof FB &&
        window.FB.XFBML.parse($n.find('span.comment')[0]),
      $n
    )
  }
  return !1
}
function positionPhotoLi(n, p, $li) {
  if (
    (void 0 === $li &&
      ($li = $('#gallery').find('div.photos div.photo[n=' + n + ']')),
    void 0 === p && $li && (p = $li.attr('p')),
    window.galleryImages[n - 1])
  ) {
    if (0 < $li.length)
      if (($li.attr('p', p), 0 == p)) {
        if (
          ((window.galleryNP.n = n),
          'arrow' != galleryIframeUtils.switchOrigin &&
            galleryIframeUtils.isActive())
        ) {
          var $photoThumb = $(
              '#gallery-container .photo-thumb[event-photo-id=' +
                $li.attr('photo-id') +
                ']'
            ),
            thumbTopDistance =
              Math.round($photoThumb.offset().top) - $(window).scrollTop()
          ;(thumbTopDistance += Math.round(
            $photoThumb.find('.inner>img').height() / 2
          )),
            $li.css({
              top: thumbTopDistance + 'px',
              verticalAlign: 'top',
            }),
            $('#gallery-container .gall-ctrl').css({
              top: thumbTopDistance + 'px',
              verticalAlign: 'top',
            }),
            (galleryIframeUtils.top = thumbTopDistance)
        } else
          'arrow' == galleryIframeUtils.switchOrigin &&
            galleryIframeUtils.isActive() &&
            $li.css({
              top: galleryIframeUtils.top + 'px',
              verticalAlign: 'top',
            })
        $li.css({
          right: 'auto',
          left: 'auto',
          zIndex: 2,
          overflow: 'visible',
          position: 'relative',
        }),
          $li
            .siblings('div.photo')
            .removeClass('active')
            .find('span.share,span.credit,span.caption,.fb-wrap')
            .addClass('hide'),
          $li
            .addClass('active')
            .find('span.share,span.credit,span.caption')
            .removeClass('hide'),
          'arrow' != galleryIframeUtils.switchOrigin
            ? $('#gallery')
                .find('div.primary')
                .html(
                  '<img src="' + window.galleryImages[n - 1].src + '" />'
                )
            : 'arrow' == galleryIframeUtils.switchOrigin &&
              ($('#gallery')
                .find('div.secondary')
                .html(
                  '<img src="' + window.galleryImages[n - 1].src + '" />'
                ),
              $('#gallery')
                .find('div.mask.primary')
                .animate(
                  { opacity: 0 },
                  {
                    duration: 0,
                    complete: function () {
                      $('#gallery')
                        .find('div.secondary')
                        .removeClass('secondary')
                        .addClass('primary'),
                        $(this)
                          .addClass('secondary')
                          .removeClass('primary'),
                        $(this).css('opacity', 1)
                    },
                  }
                )),
          $('#gallery .photo-count span.current').text(n)
      } else if (1 == p) {
        window.galleryNP.np1 = n
        var newLeft = $(window).width() - 100
        $li.css({ right: 'auto', zIndex: 1, overflow: 'hidden' }),
          $li.animate(
            { left: newLeft },
            { duration: 0, complete: function () {} }
          )
      } else if (-1 == p) {
        window.galleryNP.nm1 = n
        var newRight = $(window).width() - 100
        $li.css({ left: 'auto', zIndex: 1, overflow: 'hidden' }),
          $li.animate(
            { right: newRight },
            { duration: 0, complete: function () {} }
          )
      } else
        2 == p
          ? ((window.galleryNP.np2 = n),
            $li.css('left', $(window).width() + 200))
          : -2 == p &&
            ((window.galleryNP.nm2 = n),
            $li.css('left', $(window).width() + 200))
  } else $li.css('left', $(window).width() + 200), $li.attr('p', p)
  setImageOrientation($li)
}
window.galleryNP = { n: 0, np1: 0, nm1: 0, np2: 0, nm2: 0 }
var photoLoadDelay = 0,
  loadedPhotos = []
function loadPhoto(n, p, $li) {
  if (
    (void 0 === $li &&
      ($li = $('#gallery').find('div.photos div.photo[n=' + n + ']')),
    window.galleryImages[n - 1] && -1 == $.inArray(n, loadedPhotos))
  ) {
    if ((loadedPhotos.push(n), !$li.hasClass('quote')))
      if ('' != window.galleryImages[n - 1].src) {
        var loader = new window.ImageLoader(
          window.galleryImages[n - 1].src
        )
        ;(loader.loadEvent = function (url, image) {
          setTimeout(function () {
            var $l = $('#gallery').find(
              'div.photos div.photo[n=' + n + ']'
            )
            $l.addClass('sized')
              .find('img.ph')
              .attr('src', url)
              .on('load', function () {
                positionPhotoLi(0), setImageOrientation($l)
              })
          }, photoLoadDelay)
        }),
          loader.load()
      } else
        $('#gallery')
          .find('div.photos div.photo[n=' + n + ']')
          .addClass('sized')
          .find('img.ph')
          .attr('src', '')
          .addClass('hide')
  } else
    window.galleryImages[n - 1] &&
      !$li.hasClass('quote') &&
      0 < $li.length &&
      ('' != window.galleryImages[n - 1]
        ? $li.find('img.ph').removeClass('hide')
        : $li.find('img.ph').addClass('hide'),
      $li
        .find('img.ph')
        .addClass('sized')
        .attr('src', window.galleryImages[n - 1].src)
        .on('load', function () {
          positionPhotoLi(n),
            setImageOrientation($(this).closest('.photo'))
        }))
}
function setImageOrientation($li) {
  var $image = $li.find('img.ph'),
    p = $li.attr('p')
  if (0 == p || -1 == p || 1 == p) {
    var diff = $image.height() - $image.width()
    if (1 == $image.length) {
      var licss = { 'max-width': 'none', 'max-height': 'none' },
        imagecss = {
          'height': 'auto',
          'width': 'auto',
          'max-width': 'none',
          'max-height': 'none',
        }
      if (
        ($li.hasClass('quote') || (licss.height = 'auto'),
        0 < diff
          ? ((licss.maxHeight = '90%'), (imagecss.maxHeight = '100%'))
          : (imagecss.maxWidth = ((licss.maxWidth = '90%'), '100%')),
        galleryIframeUtils.isActive() &&
          (licss.maxHeight = Math.round(0.9 * $(window).width()) + 'px'),
        $li.css(licss),
        $image.css(imagecss),
        0 == p && galleryIframeUtils.isActive())
      ) {
        $li.css({ 'margin-top': '0px' }),
          $('.gall-ctrl>span').css({ 'margin-top': '-40px' })
        var newMarginTop,
          marginTop = -Math.round($image.height() / 2),
          offsetTop = Math.round($image.offset().top)
        offsetTop + $image.height() + marginTop + 70 >
          $(document).height() &&
          ((newMarginTop =
            $(document).height() - (offsetTop + $image.height()) - 70),
          $('.gall-ctrl>span').css(
            'margin-top',
            newMarginTop - marginTop + 'px'
          ),
          (marginTop = newMarginTop)),
          offsetTop + marginTop + 70 < 0 &&
            ((newMarginTop = 70 - offsetTop),
            $('.gall-ctrl>span').css(
              'margin-top',
              newMarginTop - marginTop + 'px'
            ),
            (marginTop = newMarginTop)),
          $li.css({ 'margin-top': marginTop + 'px' })
      }
    }
  }
}
var cleared = !1
function galleryThumbFlow(force_cliff) {
  galleryOuterWidthReflow()
}
window.splash.galleryThumbFlow = galleryThumbFlow
var scrollTop,
  windowHeight,
  winBottom,
  doneLoadingThumbs = !1
function resizeGalleryCarousel() {
  $('#main-canvas')
    .find('.carousel')
    .each(function () {
      var $slides = $(this).find('.slides'),
        width = $slides.parent().width(),
        $imgs = $slides.find('.list-item')
      $imgs.css('width', width + 'px'),
        0 < $imgs.length &&
          $slides.css('width', width * ($imgs.length + 1) + 'px'),
        $(this).slideToCurrent()
    })
}
function onWindowResize() {
  ;(windowHeight = $(window).height()),
    (scrollTop = $(document).scrollTop()),
    (winBottom = Math.ceil(scrollTop + windowHeight)),
    setImageOrientation($('#gallery-container').find('div.photo.active')),
    window.splash.galleryExistsOnPage() && galleryOuterWidthReflow(),
    sizePageContainerSoThatFooterIsAtTheBottom(),
    window.splash.cmsUtils.applyAutoWindowSizesToComponents(),
    resizeGalleryCarousel(),
    autoFontResize(),
    window.splash.PubSub.publish('page-resized')
}
function checkViewportForThumbsToLoad(checkAll) {
  if (!1 === doneLoadingThumbs) {
    var $nextUnloadedThumb,
      $galleryThumbs = $('#gallery-thumbs')
    if (
      0 <
      ($nextUnloadedThumb = checkAll
        ? $galleryThumbs.find('img.unloaded:first')
        : $galleryThumbs.find('img.unloaded')).length
    )
      $nextUnloadedThumb.each(function () {
        if (
          !$(this).hasClass('loading-thumb') &&
          winBottom >= $(this).offset().top
        )
          return loadMoreThumbs(), !1
      })
    else if (
      void 0 !== window.unloadedGalleryThumbnails &&
      window.unloadedGalleryThumbnails &&
      0 < window.unloadedGalleryThumbnails.length &&
      winBottom >= $('#galleryThumbBottom').offset().top
    ) {
      var newToLoad = thumbsToLoad
      newToLoad > window.unloadedGalleryThumbnails.length &&
        (newToLoad = window.unloadedGalleryThumbnails.length)
      var $blank = $galleryThumbs.find('div.photo-thumb:first').clone()
      $blank
        .removeClass('photo-thumb clear video double triple')
        .find('.quote-table,.via')
        .remove()
        .end()
        .find('img.th')
        .remove()
        .end()
        .find('span.play')
        .remove()
      for (var x = 0; x < newToLoad; x++) {
        var $newBlank = $blank.clone(),
          n = window.unloadedGalleryThumbnails.shift()
        $newBlank.addClass(n['outer-class'])
        var $img = $newBlank.find('img.th')
        0 == $img.length &&
          (($img = $('<img />')),
          $newBlank.find('.inner:first').append($img),
          $img
            .addClass('th')
            .attr(
              'loading-src',
              'https://d24wuq6o951i2g.cloudfront.net/images/eventfeed/loading-4.png'
            )),
          $img
            .attr('data-src', n.src)
            .attr('src', $img.attr('loading-src'))
            .addClass('unloaded')
            .attr('photo-id', n['photo-id'])
            .attr('thumbnail-position', n.thumbnail_position),
          '' == n.src &&
            $img.css('display', 'none').removeClass('unloaded'),
          $newBlank.find('.body').html(n.caption),
          $newBlank.find('.author').html(n.credit),
          $newBlank.find('.created').html(n.created),
          ('quote' != n.type &&
            (('twitter' != n.type && 'facebook' != n.type) ||
              '' != n.src)) ||
            ($newBlank.find('.quote .inner span:first').html(n.caption),
            $newBlank
              .find('.meta .username .inner span:first')
              .html(n.credit),
            void 0 !== n.remote_screen_name
              ? $newBlank
                  .find('.meta .username .inner span:last')
                  .html('@' + n.remote_screen_name)
              : $newBlank
                  .find('.meta .username .inner span:last')
                  .html(''),
            void 0 !== n.meta_data &&
            'undefined' !== n.meta_data.remote_profile_img
              ? $newBlank
                  .find('.meta .thepoint img:first')
                  .attr('src', n.meta_data.remote_profile_img)
              : $newBlank.find('.meta .thepoint img:first').hide()),
          'twitter' == n.otype
            ? $newBlank
                .find('.inner:first')
                .append(
                  '<img src="https://d24wuq6o951i2g.cloudfront.net/images/eventfeed/share-twitter.png" alt="via Twitter" title="via Twitter" class="via">'
                )
            : 'instagram' == n.otype
            ? $newBlank
                .find('.inner:first')
                .append(
                  '<img src="https://d24wuq6o951i2g.cloudfront.net/images/eventfeed/share-instagram.png" alt="via Instagram" title="via Instagram" class="via">'
                )
            : 'facebook' == n.otype &&
              $newBlank
                .find('.inner:first')
                .append(
                  '<img src="https://d24wuq6o951i2g.cloudfront.net/images/eventfeed/share-fbook.png" alt="via Facebook" title="via Facebook" class="via">'
                ),
          $galleryThumbs.append($newBlank),
          window.unloadedGalleryThumbnails &&
            0 == window.unloadedGalleryThumbnails.length &&
            ((doneLoadingThumbs = !0), $('#loadMoreThumbs').hide())
      }
      $galleryThumbs.masonry('layout'), loadMoreThumbs()
    } else
      0 == $nextUnloadedThumb.length &&
        void 0 !== window.unloadedGalleryThumbnails &&
        window.unloadedGalleryThumbnails &&
        0 == window.unloadedGalleryThumbnails.length &&
        ((doneLoadingThumbs = !0), $('#loadMoreThumbs').hide())
  }
}
function positionThumbnail($img) {
  setTimeout(function () {
    var fullPosition = $img.attr('thumbnail-position')
    if (fullPosition) {
      var displayWidth,
        xyw = fullPosition.split(/;/)
      if ($img.attr('display-width'))
        displayWidth = $img.attr('display-width')
      else {
        var $parent = $img.parents('div.photo-thumb')
        $parent.hasClass('triple')
          ? $img.attr(
              'display-width',
              window.splash.server.constants.thumbSizes.triple.w
            )
          : $parent.hasClass('double')
          ? $img.attr(
              'display-width',
              window.splash.server.constants.thumbSizes.double.w
            )
          : $img.attr(
              'display-width',
              window.splash.server.constants.thumbSizes.single.w
            ),
          $img.attr('display-width', $parent.width()),
          (displayWidth = $img.attr('display-width'))
      }
      var displayTop = 0,
        displayLeft = 0
      3 == xyw.length &&
        ((displayWidth = Math.ceil(displayWidth / xyw[2])),
        (displayTop = Math.ceil(xyw[1] * displayWidth)),
        (displayLeft = Math.ceil(xyw[0] * displayWidth))),
        $img.css({
          'min-width': 'none',
          'max-width': 'none',
          'margin-top': '-' + displayTop + 'px',
          'margin-left': '-' + displayLeft + 'px',
          'width': displayWidth + 'px',
          'height': 'auto',
        })
    } else {
      var diff = $img.height() - $img.parent().height()
      diff < 0
        ? $img.css({
            'min-width': 'none',
            'max-width': 'none',
            'width': 'auto',
            'height': '100%',
          })
        : 0 < diff && $img.css({ height: 'auto' })
    }
  }, 200)
}
;(window.$gallery = $('#gallery-container')),
  (window.splash.positionThumbnail = positionThumbnail)
var thumbsToLoad = 30
function loadMoreThumbs() {
  var $thumbs = $('#gallery-thumbs img.unloaded')
  if (0 < $thumbs.length) {
    $thumbs.each(function () {
      0
      var $img = $(this)
      $img.removeClass('unloaded').addClass('loading-thumb')
      var loader = new window.ImageLoader($img.attr('data-src'))
      ;(loader.loadEvent = function (url, image) {
        setTimeout(function () {
          $img.attr('src', url),
            $img
              .removeClass('loading-thumb')
              .parents('.inner:first')
              .addClass('loaded')
              .find('.lazy.message')
              .hide(),
            window.splash.positionThumbnail($img)
        }, photoLoadDelay)
      }),
        loader.load()
    })
  }
  window.splash.galleryThumbFlow()
}
var galleryOuterWidthReflowTimer,
  keepScrolling = !1,
  keepScrollingRepeat = !1,
  $get_params = getQueryParams(window.location.search)
function galleryOuterWidthReflow() {
  clearTimeout(galleryOuterWidthReflowTimer),
    (galleryOuterWidthReflowTimer = setTimeout(function () {
      var $g = $('#gallery-container')
      $g.hasClass('noAutoWidthChange') && (w = $g.width())
      var $gt = $g.find('#gallery-thumbs'),
        cols = 5
      $g.hasClass('column4')
        ? (cols = 4)
        : $g.hasClass('column3')
        ? (cols = 3)
        : $g.hasClass('column2')
        ? (cols = 2)
        : $g.hasClass('column1') && (cols = 1),
        $(window).width() < 481 && (cols = 1)
      var w = $gt.width(),
        columnWidth = Math.floor(w / cols),
        rowHeight = Math.floor(0.75 * columnWidth),
        singleWidth = columnWidth - 8,
        singleHeight = rowHeight - 8,
        doubleWidth = 2 * singleWidth + 8,
        doubleHeight = 2 * singleHeight + 8,
        tripleWidth = 3 * singleWidth + 16,
        tripleHeight = 3 * singleHeight + 16,
        $thumbs = $gt.find('.photo-thumb')
      $thumbs.each(function () {
        var $this = $(this),
          width = singleWidth,
          height = singleHeight
        $this.hasClass('triple')
          ? 3 <= cols
            ? ((width = tripleWidth), (height = tripleHeight))
            : 2 == cols && ((width = doubleWidth), (height = doubleHeight))
          : $this.hasClass('double') &&
            2 <= cols &&
            ((width = doubleWidth), (height = doubleHeight))
        var css = { width: width + 'px', height: height + 'px' }
        $this.css(css), $this.find('>.inner:first').css(css)
      })
      var $p = $gt.parent()
      $p.css('height', $p.height() + 'px'),
        $gt.hasClass('masonry') && $gt.masonry('destroy'),
        void 0 !== window.splash.galleryElement.galleryMasonryVars &&
          0 < $thumbs.length &&
          ((window.splash.galleryElement.galleryMasonryVars.columnWidth =
            columnWidth),
          $gt.masonry(window.splash.galleryElement.galleryMasonryVars),
          $gt.addClass('masonry')),
        setTimeout(function () {
          $p.css('height', 'auto')
        }, 1e3)
    }, 100))
}
void 0 !== $get_params.fb
  ? setTimeout(function () {
      $('#fb-link').trigger('click')
    }, 2e3)
  : void 0 !== $get_params.tw &&
    setTimeout(function () {
      $('#twitter-link').trigger('click')
    }, 2e3),
  void 0 !== $get_params.closefb && window.close()
var lzD = 0,
  lazyLoader = function () {
    ;(this.q = []), (this.r = !1)
  }
lazyLoader.prototype = {
  load: function (image, _c) {
    image &&
      '' != image &&
      (this.q.push(image), 0 == this.r && this.go(_c))
  },
  go: function (_c) {
    if (0 < this.q.length) {
      this.r = !0
      var image = this.q.shift(),
        me = this,
        went = !1
      this.loadImage(image, function () {
        went || (me.go(), (went = !0)), void 0 !== _c && _c()
      }),
        setTimeout(function () {
          went || (me.go(), (went = !0))
        }, 200)
    } else this.r = !1
  },
  loadImage: function (i, _c) {
    var iL = new window.ImageLoader(i.getAttribute('lazy-src'))
    ;(iL.loadEvent = function (u) {
      i.setAttribute('src', u),
        i.removeAttribute('lazy-src'),
        $(i)
          .parents('.inner:first')
          .addClass('loaded')
          .find('.lazy.message')
          .hide(),
        void 0 !== _c && setTimeout(_c, lzD),
        window.splash.positionThumbnail($(i))
    }),
      iL.load()
  },
}
var myLazyLoader = new lazyLoader()
function lazyLoad(image, c) {
  myLazyLoader.load(image, c)
}
function sizePageContainerSoThatFooterIsAtTheBottom() {
  var $footer = $('#footer')
  if ($footer.is(':visible')) {
    var minHeight = $(window).height() - $footer.outerHeight(!0),
      $mainCanvas = $('#main-canvas'),
      $bodyPageGroup = $mainCanvas.find('.layoutGrp.event-body')
    ;($bodyPageGroup.length ? $bodyPageGroup : $mainCanvas).css(
      'min-height',
      minHeight
    )
  }
}
function jumpToNavBlock($t, event) {
  var jumpTo = $t.attr('href')
  if (void 0 === jumpTo) {
    if (void 0 === $t.data('href')) return !1
    jumpTo = $t.data('href')
  }
  var cmsComponent =
      window.splash.cmsComponentManager.getComponentInstance(
        $t.closest('.layoutGrp')
      ),
    componentInstance =
      window.splash.cmsComponentManager.getComponentInstance(cmsComponent)
  if (
    ('button' === cmsComponent.getType() &&
      cmsComponent.trigger('action-triggered'),
    jumpTo.match(/^#/))
  ) {
    if (
      ((jumpTo = jumpTo.replace('http://', '')),
      event && event.preventDefault && event.preventDefault(),
      '#' === jumpTo)
    )
      return
    var formGid,
      cmsFormComponent,
      $targetSection = $(jumpTo)
    if (
      ($t.hasClass('nav-item-link') &&
        $t
          .closest('.nav-item')
          .addClass('is-selected')
          .siblings()
          .removeClass('is-selected'),
      '#tobutton' === jumpTo || '#button' === jumpTo || '#rsvp' === jumpTo)
    ) {
      if (
        (($targetSection = $('#element-rsvp')),
        0 < $('#element-rsvp').length)
      )
        return !1
      window.splash &&
        window.splash.server._user &&
        void 0 !== window.splash.server._user.id &&
        window.gtag &&
        window.gtag('event', 'click_rsvp_button', {
          event_category: 'rsvp',
        }),
        window.splash.pageAction.showPageActionForm($t)
    } else {
      if ('#top' === jumpTo || '#totop' === jumpTo || '#event' === jumpTo)
        return (
          $('html, body').animate({ scrollTop: 0 }, 400),
          window.splash.cmsUtils.resetPageFocus(),
          !1
        )
      if (-1 < jumpTo.indexOf('modal-')) {
        $('body').addClass('is-viewing-modal')
        var $modal = $(
            '[modalid="' + jumpTo.replace(/(to|modal\-|#)/g, '') + '"]'
          ),
          cmsModal =
            window.splash.cmsComponentManager.getComponentInstance($modal)
        cmsModal && cmsModal.open()
      } else if (
        -1 <
        $.inArray(
          jumpTo.replace('#', ''),
          navFunctions.getLinkableSections()
        )
      )
        $targetSection = navFunctions.findSectionByHash(jumpTo)
      else if ('#page-submit' === jumpTo) {
        if (
          (cmsFormComponent =
            !!(formGid = $t.attr('data-linked-form')) &&
            window.splash.cmsComponentManager.getComponentInstance(
              formGid
            )) &&
          'function' == typeof cmsFormComponent.submit
        )
          return cmsFormComponent.submit(), !1
        window.splash.pageAction.showPageActionForm(),
          'tickets' === window.splash.server._event.rsvp_method
            ? window.splash.pageAction.submitTicketForm()
            : window.splash.pageAction.submitRsvpForm()
      } else if ('#survey-partial-save' === jumpTo) {
        if (
          !1 ===
          (cmsFormComponent =
            !!(formGid = $t.attr('data-linked-form')) &&
            window.splash.cmsComponentManager.getComponentInstance(
              formGid
            ))
        ) {
          var forms = cmsComponent.getParents({
            filterFunction: function (parent) {
              var parentType = parent.getType()
              return (
                'question-group' === parentType ||
                'ticket-group' === parentType
              )
            },
          })
          0 < forms.length && (cmsFormComponent = forms[0])
        }
        if (
          cmsFormComponent &&
          'function' == typeof cmsFormComponent.submit
        )
          return (
            cmsFormComponent.submit({
              skipFieldValidation: !0,
              extraData: { survey_response_incomplete: !0 },
            }),
            !1
          )
      } else {
        if ('#no-action' === jumpTo) return
        if ('#contact-organizer' === jumpTo)
          return openContactOrganizerModal(), !1
        if ('#cal' === jumpTo)
          return componentInstance.renderCalendarLinks(), !1
        if (-1 !== jumpTo.indexOf('hub-search')) {
          var searchMode = jumpTo.replace(/#hub-search-[0-9a-z]+-/, ''),
            hubId = jumpTo.replace(/#hub-search-([0-9a-z]+)-.*/, '$1'),
            hub =
              window.splash.cmsComponentManager.getComponentInstance(hubId)
          if (hub && 'hub' === hub.getType()) {
            var navLinksToHubFilterTypesWithSearchTerm = {
              search_terms: 'keywords',
              tags_filter: 'tags',
              event_type_filter: 'eventType',
            }
            if ('is_featured' === searchMode)
              hub
                .setTemporaryFilter(
                  { type: 'featured', options: 1 },
                  cmsComponent
                )
                .filterHub()
            else if (navLinksToHubFilterTypesWithSearchTerm[searchMode]) {
              var filterType =
                  navLinksToHubFilterTypesWithSearchTerm[searchMode],
                searchTerm =
                  'button' === cmsComponent.getType()
                    ? cmsComponent.getHubSearchTerm()
                    : $t.attr('data-search-terms') || ''
              hub
                .setTemporaryFilter(
                  { type: filterType, options: searchTerm },
                  cmsComponent
                )
                .filterHub()
            } else
              hub.removeTemporaryFilter(cmsComponent),
                hub.sortHub(searchMode, null)
            return !1
          }
          return !1
        }
        if ('#exit-custom-reg' === jumpTo)
          return alert('Would exit custom registration flow'), !1
        if ('#modify-registration' === jumpTo) {
          var modals =
            window.splash.cmsComponentManager.getComponentParents(
              cmsComponent,
              { componentType: 'modal' }
            )
          return (
            modals.length && modals[0].close(),
            void window.SPLASH.loadUpdateResponses()
          )
        }
        if ('#go-to-agenda-page' === jumpTo) {
          var agendaLink = window.splash.navElement.getAgendaLink()
          takeLinkActionToTopLevelFrameIfNeeded(agendaLink, event) ||
            (window.location = agendaLink)
        }
      }
    }
    if (0 < $targetSection.length)
      return (
        $t
          .parents('.nav-item:first')
          .addClass('active')
          .siblings()
          .removeClass('active'),
        setTimeout(function () {
          navigateToCmsComponent($targetSection)
        }, 100),
        !1
      )
  } else {
    var isLinkTag = $t.is('a')
    if (isLinkTag && 'undefined' === $t.attr('target'))
      window.open(jumpTo, void 0, 'noopener,noreferrer'),
        event.preventDefault()
    else if (isLinkTag || '_self' !== $t.attr('data-target'))
      if (isLinkTag || '_parent' !== $t.attr('data-target'))
        isLinkTag || window.open(jumpTo, void 0, 'noopener,noreferrer')
      else
        try {
          window.parent.location = jumpTo
        } catch (err) {
          window.open(jumpTo, void 0, 'noopener,noreferrer')
        }
    else {
      takeLinkActionToTopLevelFrameIfNeeded(jumpTo, event) ||
        (window.location = jumpTo)
    }
  }
}
function navigateToCmsComponent($target) {
  var target =
    window.splash.cmsComponentManager.getComponentInstance($target)
  if (target) {
    var openModal = window.splash.cmsComponentManager
      .getAllComponentInstancesByType('modal')
      .find(function (modal) {
        return modal.getIsOpen()
      })
    openModal &&
      -1 === target.getParents().indexOf(openModal) &&
      openModal.close()
  }
  var fixedNavBlockHeight = getFixedNavBlockHeight()
  window.scrollToBlock($target, {
    force: !0,
    percentageOffset: 50,
    offset: -fixedNavBlockHeight,
    toBlockTop: !0,
    pulse: !1,
  })
}
function getFixedNavBlockHeight() {
  var height = 0
  return (
    $('#splash-container')
      .find('.dope-section')
      .each(function (index, el) {
        if (el.style && 'fixed' === el.style.position) {
          var rect = el.getBoundingClientRect()
          0 === rect.top && (height += rect.height)
        }
      }),
    height
  )
}
function autoFontResize($container) {
  if (
    ($container || ($container = $('#main-canvas')),
    'function' == typeof $.fn.bigtext)
  ) {
    'function' != typeof $container.bigtext && ($container = $($container))
    var $paragraphResizes = $container
        .find('.splash-font-resizing[data-font-resizing-mode=paragraph]')
        .addBack(
          '.splash-font-resizing[data-font-resizing-mode=paragraph]'
        ),
      $lineResizes = $container
        .find('.splash-font-resizing[data-font-resizing-mode=line]')
        .addBack('.splash-font-resizing[data-font-resizing-mode=line]')
    $paragraphResizes.length &&
      $paragraphResizes
        .removeClass('no-op-children')
        .children('.element')
        .find('[data-mce-style]')
        .css({ 'font-size': '', 'line-height': '' })
        .end()
        .bigtext({ resize: !0 }),
      $lineResizes.length &&
        $lineResizes
          .removeClass('no-op-children')
          .find('.body:first,.title:first')
          .find('[data-mce-style]')
          .css({ 'font-size': '', 'line-height': '' })
          .end()
          .bigtext({ resize: !0 })
  }
}
function clearFontResizeClasses($container) {
  $container || ($container = $('#main-canvas')),
    $container
      .find('div,span,p')
      .addBack()
      .each(function () {
        var $this = $(this),
          id = $this.attr('id'),
          classes = $this.attr('class')
        ;/bigtext/.test(id) && $this.removeAttr('id'),
          classes &&
            ((classes = classes
              .replace(
                new RegExp(
                  '\\b' + window.BigText.LINE_CLASS_PREFIX + '\\d+\\b'
                ),
                ''
              )
              .replace(/\bbigtext\b/, '')),
            $this.attr('class', classes))
      })
}
;(window.splash.lazyLoad = lazyLoad),
  ($.fn.slideToCurrent = function () {
    var $carousel = $(this),
      $parent = $carousel.parents('.layoutGrp:first'),
      $slides = $carousel.find('.slides'),
      $left = $parent.find('.scrollLeftContain'),
      $right = $parent.find('.scrollRightContain'),
      $current = $carousel.find('.list-item.current:first')
    if ($current.length < 1) return !1
    var left = $current.position().left
    $slides.css('left', '-' + left + 'px')
    var current_index = $current.index()
    $parent.find('.progress .current').html(current_index + 1)
    var $currentImg = $current.find('img:first')
    $currentImg.hasClass('unloaded') &&
      window.splash.lazyLoad($currentImg[0], function () {
        $currentImg.removeClass('unloaded')
      }),
      0 < $current.prev().length ? $left.show() : $left.hide(),
      0 < $current.next().length ? $right.show() : $right.hide()
  }),
  ($.fn.activateCarousel = function (params) {
    var $carousel = $(this),
      $parent = $carousel.parents('.layoutGrp:first'),
      $left = $parent.find('.scrollLeftContain'),
      $right = $parent.find('.scrollRightContain'),
      $slides = $carousel.find('.slides'),
      imgCount = $carousel.find('.list-item').length
    '1' == imgCount && ($left.hide(), $right.hide()),
      $parent.find('.progress').find('.total').text(imgCount),
      $carousel.find('.carousel-lazy-load-image').each(function () {
        window.splash.lazyLoad(this)
      }),
      setTimeout(function () {
        var width = $slides.parent().width(),
          $imgs = $slides.find('.list-item')
        $imgs.css('width', width + 'px'),
          0 < $imgs.length &&
            $slides.css('width', width * ($imgs.length + 1) + 'px')
      }, 0),
      $left.unbind('click').click(function () {
        var $currentImg = $carousel.find('.list-item.current:first'),
          $prev = $currentImg.prev()
        $currentImg.removeClass('current'),
          $prev.addClass('current'),
          $carousel.slideToCurrent()
      }),
      $right.unbind('click').click(function () {
        var $currentImg = $carousel.find('.list-item.current:first')
        $currentImg.next().addClass('current'),
          $currentImg.removeClass('current'),
          $carousel.slideToCurrent(),
          (function () {
            var $next = $carousel.find('img.unloaded:first')
            1 == $next.length &&
              window.splash.lazyLoad($next[0], function () {
                $next.removeClass('unloaded')
              })
          })()
      })
  }),
  (window.splash.autoFontResize = autoFontResize),
  (window.splash.clearFontResizeClasses = clearFontResizeClasses)
var ticketForm = function (ticket_hierarchy) {
  var $form = null,
    getChildIds = function (parent_ttid) {
      var childIds = [],
        objectKey = 'parent_id_' + parent_ttid
      return (
        ticket_hierarchy.parent2children[objectKey] &&
          ticket_hierarchy.parent2children[objectKey] instanceof Array &&
          (childIds = ticket_hierarchy.parent2children[objectKey]),
        childIds
      )
    },
    getParentIds = function (child_ttid) {
      var parentIds = [],
        objectKey = 'child_id_' + child_ttid
      return (
        ticket_hierarchy.children2parents[objectKey] &&
          ticket_hierarchy.children2parents[objectKey] instanceof Array &&
          (parentIds = ticket_hierarchy.children2parents[objectKey]),
        parentIds
      )
    },
    hideChildrenIfNotNeeded = function (ticketTypeId) {
      for (
        var childIds = getChildIds(ticketTypeId), t = 0;
        t < childIds.length;
        t++
      ) {
        for (
          var parentIds = getParentIds(childIds[t]),
            neededByOtherParent = !1,
            p = 0;
          p < parentIds.length;
          p++
        ) {
          var otherParentQty = $(
            'select.quantity-select[data-ttid="' + parentIds[p] + '"]'
          ).val()
          if (otherParentQty && 0 < parseInt(otherParentQty)) {
            neededByOtherParent = !0
            break
          }
        }
        if (neededByOtherParent) return null
        var $child = $('#ticket-type-' + childIds[t], $form)
        $child.hide(),
          $child
            .find('input, select, textarea')
            .val(0)
            .prop('disabled', !0)
        for (var c = 0; c < childIds.length; c++)
          hideChildrenIfNotNeeded(childIds[c])
      }
    },
    selectQuantity = function () {
      var $dropdown = $(this),
        ticketTypeId = $dropdown.data('ttid'),
        quantity = $dropdown.val()
      quantity && 0 < parseInt(quantity)
        ? (!(function (ticketTypeId) {
            for (
              var childIds = getChildIds(ticketTypeId),
                t = childIds.length;
              0 <= t;
              t--
            ) {
              var $child = $('#ticket-type-' + childIds[t], $form),
                parentId = $child.data('parent-ticket-type-ids'),
                $parent = $('#ticket-type-' + parentId).closest(
                  '.ticket-container'
                )
              $child.hasClass('nested') &&
                !$child.hasClass('relocated') &&
                0 < $parent.length &&
                $child
                  .closest('.ticket-container')
                  .detach()
                  .insertAfter($parent)
                  .end()
                  .show()
                  .addClass('relocated'),
                $child
                  .show()
                  .find('input, select, textarea')
                  .prop('disabled', !1)
            }
          })(ticketTypeId),
          (ticket_id[ticketTypeId] = parseInt(quantity)))
        : (delete ticket_id[ticketTypeId],
          hideChildrenIfNotNeeded(ticketTypeId)),
        window.splash.server.constants.ltt &&
          (0 < parseInt(quantity)
            ? $('#ticketForm .quantity-select')
                .not($dropdown)
                .not(
                  $(
                    '#ticket-type-' +
                      $dropdown
                        .closest('.secondary-ticket')
                        .data('parent-ticket-type-ids')
                  ).find('input, select, textarea')
                )
                .not(
                  '.secondary-ticket select, .secondary-ticket input, .secondary-ticket textarea'
                )
                .prop('disabled', !0)
                .attr(
                  'title',
                  'Only one ticket type per attendee permitted for this event'
                )
            : $('#ticketForm .quantity-select')
                .prop('disabled', !1)
                .removeAttr('title')),
        $('.secondary-ticket:visible').not('.nested').length
          ? $('.addon-tickets', $form).addClass('applicable')
          : $('.addon-tickets', $form).removeClass('applicable')
    }
  $(function () {
    ;($form = $('#ticketForm'))
      .find('select.quantity-select')
      .on('change', selectQuantity)
  })
}
window.splash.socialActions = (function ($) {
  return {
    initTwitterShare: function () {
      void 0 !== window.twttr &&
        window.twttr.ready(function (twttr) {
          twttr.events.bind('tweet', function (ev) {
            'function' == typeof window.customAfterTwitterShare &&
              window.customAfterTwitterShare(ev)
          })
        })
    },
    fireTweet: function (body) {
      ;(null != body && '' != body.trim()) ||
        (body = window.splash.server._event.social.twitter.body),
        '' == (body = body.trim().replace('&amp;', '&')) &&
          void 0 !== window.splash.server._event.finetune &&
          (body =
            window.splash.server._event.finetune.social_defaults.twitter
              .body)
      var href =
        'https://twitter.com/intent/tweet?source=tweetbutton&text=' +
        encodeURIComponent(body)
      window.open(href, 'Twitter', 'width=400,height=350')
    },
    fireFacebookShare: function (name, description, picture) {
      var params = window.splash.socialActions.getFaceBookParams(
          name,
          description,
          picture
        ),
        href =
          'https://www.facebook.com/dialog/feed?display=popup&app_id=' +
          window.splash.server.constants.facebook_client_id +
          '&description=' +
          encodeURIComponent(params.description) +
          '&name=' +
          encodeURIComponent(params.name) +
          '&picture=' +
          encodeURIComponent(params.picture) +
          '&link=' +
          encodeURIComponent(params.domain) +
          '&redirect_uri=https://' +
          window.splash.server.constants.ocbDomain +
          '/?fbClose=1'
      window.open(href, 'Facebook', 'width=400,height=250')
    },
    fireLinkedInShare: function (title, description) {
      ;(null != title && '' != $.trim(title)) ||
        (title = window.splash.server._event.social.linkedin.name),
        (null != description && '' != $.trim(description)) ||
          (description =
            window.splash.server._event.social.linkedin.description),
        (title = $.trim(title)),
        (description = $.trim(description)),
        '' == title &&
          void 0 !== window.splash.server._event.finetune &&
          (title =
            window.splash.server._event.finetune.social_defaults.linkedin
              .name),
        '' == description &&
          void 0 !== window.splash.server._event.finetune &&
          (description =
            window.splash.server._event.finetune.social_defaults.linkedin
              .description)
      var href =
        'http://www.linkedin.com/shareArticle?mini=true&summary=' +
        encodeURIComponent(description.substr(0, 2e3)) +
        '&title=' +
        encodeURIComponent(title.substr(0, 200)) +
        '&url=' +
        encodeURIComponent(
          'http://' + window.splash.server._event.domain.effective
        )
      window.open(href, 'Linkedin', 'width=520,height=570')
    },
    fireEmailSend: function (subject, body) {
      null == subject && (subject = ''),
        null == body && (body = ''),
        '' == $.trim(subject) &&
          void 0 !== window.splash.server._event.finetune &&
          (subject =
            window.splash.server._event.finetune.social_defaults.email
              .subject),
        '' == $.trim(body) &&
          void 0 !== window.splash.server._event.finetune &&
          (body =
            window.splash.server._event.finetune.social_defaults.email
              .body)
      var href =
        'mailto:?subject=' +
        encodeURIComponent($.trim(subject)) +
        '&body=' +
        encodeURIComponent($.trim(body))
      window.location = href
    },
    getFaceBookParams: function (name, description, picture) {
      var params = {},
        eventCardImages = window.splash.server._event.eventCardImages
      return (
        (null != name && '' != $.trim(name)) ||
          (name = window.splash.server._event.social.facebook.name),
        (null != description && '' != $.trim(description)) ||
          (description =
            window.splash.server._event.social.facebook.description),
        (null != picture && '' != $.trim(picture)) ||
          (picture =
            window.splash.server._event.social.facebook.picture) ||
          (picture =
            eventCardImages && 'object' == typeof eventCardImages
              ? eventCardImages.x3
              : window.splash.server._event.image),
        (params.name = $.trim(name)),
        (params.description = $.trim(description)),
        (params.picture = $.trim(picture)),
        (params.domain = window.splash.server._event.domain.effective),
        '' == params.name &&
          void 0 !== window.splash.server._event.finetune &&
          (params.name =
            window.splash.server._event.finetune.social_defaults.facebook.name),
        '' == params.description &&
          void 0 !== window.splash.server._event.finetune &&
          (params.description =
            window.splash.server._event.finetune.social_defaults.facebook.description),
        '' == params.picture &&
          void 0 !== window.splash.server._event.finetune &&
          (params.picture =
            window.splash.server._event.finetune.social_defaults.facebook.picture),
        0 == params.picture.indexOf('//')
          ? (params.picture = 'http:' + params.picture)
          : 0 != params.picture.indexOf('http') &&
            (params.picture =
              'https://' +
              window.splash.server.constants.ocbDomain +
              params.picture),
        params
      )
    },
    copyPageUrl: function ($linkButton) {
      var pageUrl = $linkButton.find('input:first').val()
      navigator.clipboard.writeText(pageUrl).then(function () {
        var $linkText = $linkButton.find('span'),
          originalText = $linkText.text()
        $linkText.text('Copied!'),
          setTimeout(function () {
            $linkText.text(originalText)
          }, 750)
      })
    },
  }
})(jQuery)
var navFunctions = (function ($) {
  return {
    getLinkableSections: function () {
      return ['speakers', 'schedule', 'sponsors', 'map', 'video']
    },
    findSectionByHash: function (hash) {
      return (
        (hash = hash.replace('#', '').trim()),
        $('#splash-container').find('.sf.' + hash + ':first')
      )
    },
  }
})(jQuery)
