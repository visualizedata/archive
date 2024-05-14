var JSCookies = {
  getItem: function (sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    )
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey))
      return !1
    var sExpires = ''
    if (vEnd)
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === 1 / 0
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
      }
    return (
      (document.cookie =
        encodeURIComponent(sKey) +
        '=' +
        encodeURIComponent(sValue) +
        sExpires +
        (sDomain ? '; domain=' + sDomain : '') +
        (sPath ? '; path=' + sPath : '') +
        (bSecure ? '; secure' : '')),
      !0
    )
  },
  removeItem: function (sKey, sPath, sDomain) {
    return (
      !(!sKey || !this.hasItem(sKey)) &&
      ((document.cookie =
        encodeURIComponent(sKey) +
        '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
        (sDomain ? '; domain=' + sDomain : '') +
        (sPath ? '; path=' + sPath : '')),
      !0)
    )
  },
  hasItem: function (sKey) {
    return new RegExp(
      '(?:^|;\\s*)' +
        encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
        '\\s*\\='
    ).test(document.cookie)
  },
  keys: function () {
    for (
      var aKeys = document.cookie
          .replace(
            /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,
            ''
          )
          .split(/\s*(?:\=[^;]*)?;\s*/),
        nIdx = 0;
      nIdx < aKeys.length;
      nIdx++
    )
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    return aKeys
  },
}
function stripos(f_haystack, f_needle, f_offset) {
  var index,
    haystack = (f_haystack + '').toLowerCase(),
    needle = (f_needle + '').toLowerCase()
  return -1 !== (index = haystack.indexOf(needle, f_offset)) && index
}
function addCommas(nStr) {
  ;(x = (nStr += '').split('.')),
    (x1 = x[0]),
    (x2 = 1 < x.length ? '.' + x[1] : '')
  for (var rgx = /(\d+)(\d{3})/; rgx.test(x1); )
    x1 = x1.replace(rgx, '$1,$2')
  return x1.replace(/\$-/, '-$') + x2
}
function pad(number, length) {
  for (var str = '' + number; str.length < length; ) str = '0' + str
  return str
}
function handleAjaxErrorResponse(response) {
  response.responseText && 'unauthorized' == response.responseText
    ? window.location.reload(!0)
    : $('#inline_login').val(window.location)
}
!(function ($) {
  $.fn.splashCurrency = function (options) {
    var settings = $.extend({ url: '/api_currency' }, options),
      elems = []
    if (
      (this.each(function (idx) {
        var elem = {},
          $elem = $(this)
        if ($elem.hasClass('progress')) return !0
        ;(elem.code = $elem.data('currency') || 'USD'),
          (elem.amount = $elem.html().replace(/[^0-9]/g, '')),
          (elem.id = idx),
          elems.push(elem),
          $elem
            .html('')
            .attr('data-currency-id', elem.id)
            .addClass('splash-progress small')
      }),
      elems.length < 1)
    )
      return !1
    $.ajax({
      global: !1,
      complete: function () {
        $('[data-currency]').removeClass('splash-progress small')
      },
      url: settings.url,
      method: 'POST',
      data: { elems: elems },
      dataType: 'JSON',
      success: function (data) {
        for (var i in data.elems)
          if ({}.hasOwnProperty.call(data.elems, i)) {
            var elem = data.elems[i]
            $("[data-currency-id='" + elem.id + "']").html(elem.amount)
          }
        void 0 !== settings.callback && settings.callback()
      },
    })
  }
})(jQuery),
  (splash = window.splash || {}),
  (function ($) {
    var submittable = function (canSubmit) {
      ;($form = $('#rsvp-real-form.realForm')),
        ($submitButton = $('#rsvp-submit', $form)),
        canSubmit
          ? ($submitButton.prop('disabled', !1).css('opacity', 1),
            $submitButton.siblings('.processing-img').hide())
          : ($submitButton.prop('disabled', !0).css('opacity', 0.1),
            $submitButton.siblings('.processing-img').show())
    }
    splash.customFileUpload = function (input, opts) {
      var $input = $(input),
        $container = opts.$container,
        file = $input[0].files[0],
        fileExtension = !1,
        uploadImgId = opts.uploadImgId,
        $placeholder = opts.$placeholder,
        $hiddenInput = opts.$hiddenInput,
        $clone = $('<input />', {
          type: 'file',
          class: $input.attr('class'),
          id: $input.attr('id'),
          name: $input.attr('name'),
        })
          .attr('data-customfield-img', $input.data('customfield-img'))
          .attr('num', $input.attr('num'))
          .attr('data-content', 'Click to upload a file.'),
        isImage =
          'image/jpg' === file.type ||
          'image/jpeg' === file.type ||
          'image/png' === file.type ||
          'image/gif' === file.type,
        splitFilename = file.name.split('.')
      1 < splitFilename.length && (fileExtension = splitFilename.pop())
      var afterUpload = opts.afterUpload
      if ($placeholder && isImage) {
        submittable(!1),
          $placeholder.removeClass('has-img').find('img').remove()
        var maxImgWidth = 2e3,
          maxImgHeight = 2e3
        void 0 !== _event.metadata.growth_machine &&
          '1' == _event.metadata.growth_machine &&
          (maxImgHeight = maxImgWidth = 1200)
        var is_required = !1
        $clone.hasClass('required') && (is_required = !0),
          canvasResize(file, {
            width: maxImgWidth,
            height: maxImgHeight,
            crop: !1,
            quality: 80,
            rotate: 0,
            callback: function (dataUrl) {
              var blob = (function (dataURI, type) {
                for (
                  var byteString = atob(dataURI.split(',')[1]),
                    ab = new ArrayBuffer(byteString.length),
                    ia = new Uint8Array(ab),
                    i = 0;
                  i < byteString.length;
                  i++
                )
                  ia[i] = byteString.charCodeAt(i)
                return new Blob([ab], { type: type })
              })(dataUrl)
              if (dataUrl && blob) {
                $input.replaceWith($clone),
                  is_required && $clone.removeClass('required'),
                  $container.find('.rsvp-form-uploaded-pic').remove()
                var $imgHtml = $('<img>')
                  .addClass('rsvp-form-uploaded-pic')
                  .attr('src', dataUrl)
                $container
                  .addClass('has-img loading')
                  .remove('img')
                  .append($imgHtml),
                  $container.find('.nu-loader').addClass('loading').show()
                var ajaxBlob = new FormData()
                ajaxBlob.append('custom_field_' + uploadImgId, blob),
                  ajaxBlob.append('action', 'upload-custom-rsvp-file'),
                  ajaxBlob.append('file_extension', fileExtension),
                  $.ajax({
                    url: window.location.pathname,
                    type: 'POST',
                    data: ajaxBlob,
                    dataType: 'json',
                    processData: !1,
                    contentType: !1,
                  })
                    .done(function (response) {
                      $hiddenInput.val(response[uploadImgId].path),
                        $hiddenInput.attr('name').match(/custom_field/) &&
                          $hiddenInput.attr(
                            'name',
                            'custom_field_imgdata[' + uploadImgId + ']'
                          ),
                        $container
                          .removeClass('loading')
                          .find('.nu-loader')
                          .fadeOut(),
                        'function' == typeof afterUpload &&
                          afterUpload(response[uploadImgId].path)
                    })
                    .fail(function (xhr, textStatus, errorThrown) {
                      $placeholder.fadeOut(),
                        is_required && $clone.addClass('required'),
                        $container.removeClass('has-img'),
                        $container
                          .find('.rsvp-form-uploaded-pic')
                          .remove(),
                        $clone.removeClass('uploaded'),
                        $clone.attr(
                          'data-content',
                          'Error uploading. Please try again.'
                        )
                    })
                    .always(function () {
                      $container.removeClass('loading'), submittable(!0)
                    })
              } else
                submittable(!0), is_required && $clone.addClass('required')
            },
          })
      } else $placeholder.removeClass('has-img').find('img').remove()
    }
  })(jQuery)
var current_text,
  _gaq = _gaq || []
function gaEvent(category, action, userType) {
  _gaq.push(['_trackEvent', category, action, userType])
}
function doneTypingDomain(params) {
  if (
    !(
      window.splash &&
      window.splash.server &&
      window.splash.server.hideChangeDomainName
    )
  ) {
    var obj_input = !0,
      bad_chars = !1,
      domain_changes = !1,
      $inputObj =
        void 0 !== (params = params || {}).inputObj
          ? params.inputObj
          : null,
      $settingsModal = void 0 !== params.modal ? params.modal : null,
      createPage = $('body').hasClass('createPage')
    if (createPage)
      var $domainInput = $('#event-domain'),
        $domainValid = $('#valid-domain'),
        $domainText = $('#event-domain-field'),
        $domainCheck = $('#domain-check'),
        $domainContainer = $('#domain-input'),
        $eventTitle = $('#event-title'),
        $eventHashtag = $('#event-hashtag')
    else if (null != $settingsModal && $settingsModal.length)
      ($domainInput = $settingsModal.find('.settings-domain-input')),
        ($domainValid = $settingsModal.find('.settings-domain-valid')),
        ($domainText = $settingsModal.find('.settings-domain-text')),
        ($domainCheck = $settingsModal.find('.settings-domain-check')),
        ($domainContainer = $settingsModal.find(
          '.settings-domain-container'
        )),
        ($eventTitle = $()),
        ($eventHashtag = $())
    else {
      if (!(0 < $('#dupe-event-domain').length))
        return console.log('Error, unknown case'), !1
      ;($domainInput = $('#dupe-event-domain')),
        ($domainText = $()),
        ($domainCheck = $('#domain-check')),
        ($domainContainer = $()),
        ($domainValid = $()),
        ($eventTitle = $('#dupe-event-title')),
        ($eventHashtag = $())
    }
    if ($domainInput.hasClass('skipThis'))
      return $domainValid.length && $domainValid.val('1'), !1
    if (null != $inputObj)
      ((domain_val = ($obj = $inputObj).val()).match(/^www\./) ||
        domain_val.match(/\./g) ||
        domain_val.match(/ /g) ||
        domain_val.match(/^https?:\/\//)) &&
        (bad_chars = !0),
        (domain_name = $.trim(
          $obj
            .val()
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .replace(/\./g, '')
            .replace(/ /g, '')
        )) != $obj.val() && $obj.val(domain_name)
    else if (0 < $domainText.length) {
      var domain_val,
        $obj = $domainText,
        domain_name = $.trim(
          $obj
            .text()
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .replace(/\./g, '')
            .replace(/ /g, '')
        )
      ;((domain_val = $domainText.text()).match(/^www\./) ||
        domain_val.match(/\./g) ||
        domain_val.match(/ /g) ||
        domain_val.match(/^https?:\/\//)) &&
        (bad_chars = !0),
        domain_val != $domainInput.val()
          ? (bad_chars && $obj.text(domain_name),
            (obj_input = !1),
            $domainInput.val(domain_name),
            void 0 !== domain_changes && (domain_changes = !0))
          : bad_chars &&
            ((obj_input = !1),
            $domainInput.val(domain_name),
            void 0 !== domain_changes && (domain_changes = !0)),
        void 0 !== domain_changes &&
          domain_changes &&
          $domainInput.trigger('change')
    } else {
      $obj = $domainInput
      ;(domain_name = $.trim(
        $obj
          .val()
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\./g, '')
          .replace(/ /g, '')
      )) != $obj.val() &&
        (bad_chars && $obj.val(domain_name),
        void 0 !== domain_changes && (domain_changes = !0))
    }
    if ('' == domain_name)
      return (
        (error_msg = '&#10006; 3 character minimum.'),
        $domainCheck
          .removeClass('success')
          .addClass('error')
          .hide()
          .html(error_msg)
          .fadeIn(100),
        $domainValid.length && $domainValid.val(0),
        $domainContainer.removeClass('success').addClass('error'),
        $eventTitle.length &&
          $eventHashtag.length &&
          ($eventTitle.removeClass('error').removeClass('success'),
          $eventHashtag.removeClass('error').removeClass('success')),
        $('.bottom-wrap .createIt')
          .addClass('error')
          .removeClass('success'),
        $('#splashCreateButton').prop('disabled', !0),
        $('#splashCreateButtonFake').hasClass('disabled') ||
          $('#splashCreateButtonFake').addClass('disabled'),
        !1
      )
    ;(domain_name = domain_name.toLowerCase()), $obj.val(domain_name)
    if (!/^([a-z0-9])([a-z0-9-])+([a-z0-9])$/i.test(domain_name)) {
      $obj.addClass('error-border')
      var error_msg = '&#10006;  Not a valid domain.'
      return (
        obj_input
          ? $obj.val().length < 3 &&
            (error_msg = '&#10006; 3 character minimum.')
          : $obj.text().length < 3 &&
            (error_msg = '&#10006; 3 character minimum.'),
        null != $inputObj
          ? ($inputObj
              .addClass('error')
              .parents('.simple-modal:first')
              .removeClass('success domainTaken')
              .addClass('error'),
            0 < $('#dupe-event-domain').length &&
              $domainCheck
                .removeClass('success')
                .addClass('error')
                .hide()
                .html(error_msg)
                .fadeIn(100))
          : (createPage
              ? ($domainCheck
                  .removeClass('success')
                  .addClass('error')
                  .hide()
                  .html(error_msg)
                  .fadeIn(100),
                $domainContainer.removeClass('success').addClass('error'),
                $eventTitle.removeClass('success').addClass('error'),
                $eventHashtag.removeClass('success').addClass('error'),
                $('.bottom-wrap .createIt')
                  .addClass('error')
                  .removeClass('success'),
                $('#splashCreateButton').prop('disabled', !0),
                $('#splashCreateButtonFake').hasClass('disabled') ||
                  $('#splashCreateButtonFake').addClass('disabled'))
              : 0 < $('#dupe-event-domain').length
              ? $domainCheck
                  .removeClass('success')
                  .addClass('error')
                  .hide()
                  .html(error_msg)
                  .fadeIn(100)
              : ($domainCheck
                  .removeClass('success')
                  .addClass('error')
                  .hide()
                  .html('')
                  .fadeIn(100),
                $domainContainer.addClass('error'),
                $domainCheck.append(
                  '<div id="domainStateText" class="hide">3 character minimum.</div>'
                )),
            $domainValid.length && $domainValid.val(0)),
        (current_text = domain_name),
        !1
      )
    }
    domain_name != current_text &&
      $.ajax({
        url: '/splash/checkDomainAvailability',
        type: 'POST',
        data: {
          domain: domain_name,
          event_id: splash.server.constants.event_id,
        },
        success: function (response) {
          if (JSON.parse(response).taken)
            return (
              $domainInput.addClass('error-border'),
              null != $inputObj
                ? ($inputObj
                    .removeClass('success')
                    .addClass('error')
                    .parents('.simple-modal:first')
                    .removeClass('success')
                    .addClass('error domainTaken'),
                  0 < $('#dupe-event-domain').length &&
                    $domainCheck
                      .removeClass('success')
                      .addClass('error')
                      .hide()
                      .html(
                        '<span class="icon-f-rte-delete"></span> Domain not available.'
                      )
                      .fadeIn(100))
                : createPage
                ? ($domainCheck
                    .removeClass('success')
                    .addClass('error')
                    .hide()
                    .html(
                      '<span class="icon-f-rte-delete"></span> Domain not available.'
                    )
                    .fadeIn(100),
                  $domainContainer
                    .removeClass('success')
                    .addClass('error'),
                  $eventTitle.removeClass('success').addClass('error'),
                  $eventHashtag.removeClass('success').addClass('error'),
                  $('.bottom-wrap .createIt')
                    .addClass('error')
                    .removeClass('success'),
                  $('#splashCreateButton').prop('disabled', !0),
                  $('#splashCreateButtonFake').hasClass('disabled') ||
                    $('#splashCreateButtonFake').addClass('disabled'))
                : 0 < $('#dupe-event-domain').length
                ? $domainCheck
                    .removeClass('success')
                    .addClass('error')
                    .hide()
                    .html(
                      '<span class="icon-f-rte-delete"></span> Domain not available.'
                    )
                    .fadeIn(100)
                : ($domainCheck
                    .removeClass('success')
                    .addClass('error')
                    .hide()
                    .html('')
                    .fadeIn(100),
                  $domainContainer.addClass('error'),
                  $domainCheck.append(
                    '<div id="domainStateText" class="hide">Domain not</br> available.</div>'
                  )),
              $('#splashDomainLink').length &&
                ($('#splashDomainLink').hide(),
                $('#splashDomainManual').show()),
              $domainValid.length && $domainValid.val(0),
              !1
            )
          null != $inputObj
            ? ($inputObj
                .removeClass('error')
                .addClass('success')
                .parents('.simple-modal:first')
                .removeClass('error domainTaken')
                .addClass('success'),
              0 < $('#dupe-event-domain').length &&
                $domainCheck
                  .removeClass('error')
                  .addClass('success')
                  .hide()
                  .html(
                    '<span class="icon-f-tb-save"></span> Great domain!'
                  )
                  .fadeIn(100))
            : ($obj.removeClass('error-border'),
              createPage
                ? ($domainCheck
                    .removeClass('error')
                    .addClass('success')
                    .hide()
                    .html(
                      '<span class="icon-f-tb-save"></span> Great domain!'
                    )
                    .fadeIn(100),
                  $domainContainer
                    .removeClass('error')
                    .addClass('success'),
                  $eventTitle.removeClass('error').addClass('success'),
                  $eventHashtag.removeClass('error').addClass('success'),
                  $('.bottom-wrap .createIt')
                    .removeClass('error')
                    .addClass('success'),
                  $('#splashCreateButton').prop('disabled', !1),
                  $('#splashTypeWrap')
                    .find('.form-inactive')
                    .removeClass('form-inactive'),
                  $('#splashCreateButtonFake').removeClass('disabled'))
                : 0 < $('#dupe-event-domain').length
                ? $domainCheck
                    .removeClass('error')
                    .addClass('success')
                    .hide()
                    .html(
                      '<span class="icon-f-tb-save"></span> Great domain!'
                    )
                    .fadeIn(100)
                : ($domainCheck
                    .removeClass('error')
                    .addClass('success')
                    .hide()
                    .html('&#10003;')
                    .fadeIn(100),
                  $domainContainer.removeClass('error'),
                  $domainCheck.append(
                    '<div id="domainStateText" class="hide"><span class="icon-f-tb-save"></span> Great Domain!</div>'
                  ))),
            $domainValid.length && $domainValid.val('1'),
            (current_text = domain_name),
            $obj.addClass('changes-made')
        },
      })
  }
}
function doneTypingVanityURL(params) {
  var $settingsModal = params.modal,
    $vanityURLCheck = $settingsModal.find('.settings-vanity-url-check'),
    $vanityURLContainer = $settingsModal.find('.vanity-url-container')
  $vanityURLCheck.removeClass('error').removeClass('success').html(null),
    $vanityURLContainer.removeClass('error'),
    $.ajax({
      url: '/splash/checkVanityURLAvailability',
      type: 'POST',
      data: { vanity_url: params.value },
      success: function (response) {
        var vanityResponse = JSON.parse(response),
          $vanityURLValid =
            ($settingsModal.find('.settings-vanity-url-input'),
            $settingsModal.find('.settings-vanity-url-valid'))
        if (!vanityResponse.available)
          return (
            $vanityURLCheck
              .removeClass('success')
              .addClass('error')
              .hide()
              .html('')
              .fadeIn(100),
            $vanityURLContainer.addClass('error'),
            $vanityURLCheck.append(
              '<div id="vanityURLStateText">Vanity URL not available.</div>'
            ),
            !1
          )
        $vanityURLCheck
          .removeClass('error')
          .addClass('success')
          .hide()
          .html('&#10003;')
          .fadeIn(100),
          $vanityURLContainer.removeClass('error'),
          $vanityURLCheck.append(
            '<div id="vanityURLStateText" class="hide"><span class="icon-f-tb-save"></span></div>'
          ),
          $vanityURLValid.length && $vanityURLValid.val('1')
      },
    })
}
function getHash() {
  var href = window.location.href.split('#'),
    hash = ''
  return href.length && (hash = $.trim(href.pop())), hash
}
var doneTypingInterval = 600
function convertAMPMto24Hour(time, format) {
  try {
    var matches = time.match(/^(\d+):(\d+):{0,1}(\d{0,2})/),
      hours = Number(matches[1]),
      minutes = Number(matches[2])
    ;/PM/i.test(time) && hours < 12 && (hours += 12),
      /AM/i.test(time) && 12 == hours && (hours -= 12)
    var sHours = hours.toString(),
      sMinutes = minutes.toString()
    return (
      hours < 10 && (sHours = '0' + sHours),
      minutes < 10 && (sMinutes = '0' + sMinutes),
      'format-simple' == format
        ? sHours + sMinutes
        : sHours +
          ':' +
          sMinutes +
          ('' != matches[3] ? ':' + matches[3] : ':00')
    )
  } catch (error) {
    throw new Error(error.message + '. time=' + time + ' format=' + format)
  }
}
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(
    location.search
  )
  return null === results
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
var splash = window.splash || {}
function killFlashTabs() {
  $('#nuTool').find('.toolBtn').removeClass('fvFlash')
}
$(document).on('mousedown', '.nu-dropdown', function () {
  bindSplashDropdown($(this), !0)
}),
  $(document).on('mouseover', '.nu-tiptip', function () {
    var $this = $(this)
    !0 !== $this.data('splash-tip') &&
      ($this.data('splash-tip', !0), bindSplashTip($this))
  }),
  $(document).on('click', '.nu-checkbox', function (e) {
    void 0 !== e && e.preventDefault && e.preventDefault()
    var $this = $(this)
    !0 !== $this.data('splash-check') &&
      ($this.data('splash-check', !0), bindSplashCheck($this))
  }),
  $(document).on('click', '.nu-radio', function (ev) {
    var $this = $(this)
    !0 !== $this.data('splash-radio') &&
      ($this.data('splash-radio', !0), bindSplashRadio($this, ev))
  }),
  $(document).on('click', 'a', function (event) {
    '#' == $(this).attr('href') && event.preventDefault()
  }),
  $(document)
    .unbind('mousemove.activity')
    .on(
      'mousemove.activity',
      'body',
      window.debounce(function (e) {
        window.splash &&
          window.splash.server &&
          window.splash.server._user &&
          (void 0 !== parent.parent && 'object' == typeof parent.parent
            ? parent.parent.postMessage('userNotIdleAction', '*')
            : parent.postMessage('userNotIdleAction', '*'))
      }, 1e4)
    ),
  $(function () {
    $('#firstViewCloseWrap').on('click', '.viewCloseBtn', function () {
      $('body').removeClass('firstViewOpen')
    }),
      0 < $('#flashMessage').length &&
        setTimeout(function () {
          $('#flashMessage').fadeOut()
        }, 7e3),
      $('i.close-flash-message').click(function () {
        $('#flashMessage').fadeOut(500)
      }),
      addBrowserAndDeviceClassesToBody()
    var $input_short_date,
      $input_address_autocomplete = $('input.address-autocomplete')
    $input_address_autocomplete.length &&
      setAddressAutocomplete($input_address_autocomplete),
      ($input_short_date = $('input.input-type-short-date')).datepicker({
        dateFormat: 'mm/dd/yy',
      }),
      ($input_short_date = $('input.input-type-time')).length &&
        (0 < $input_short_date.closest('#rsvp-form-inner').length
          ? $input_short_date.timepicker({ appendTo: '#rsvp-form-inner' })
          : 0 < $input_short_date.closest('#cc-form').length
          ? $input_short_date.timepicker({ appendTo: '#cc-form' })
          : $input_short_date.timepicker()),
      $('.simple-modal-closing-layer').on('click', function (event) {
        0 <
          window.splash.modal
            .getCurrent()
            .find('#custom-style-editor-header').length ||
          (event.preventDefault(), window.closeSimpleModal())
      }),
      $('html').keyup(function (e) {
        if (
          27 == e.which &&
          !splash.finetune &&
          splash.modal.stack.getCurrent()
        ) {
          if (
            document.body.classList.contains(
              'is-event-card-workspace-open'
            )
          )
            return
          closeSimpleModal()
        }
      })
  })
var typingTimer,
  domain_focus = !1
doneTypingInterval = 750
function addBrowserAndDeviceClassesToBody() {
  var classes = [],
    browser = $.browser
  $.each(browser, function (feature, value) {
    'boolean' == typeof value && value && classes.push(feature)
  }),
    $('body').addClass(classes.join(' '))
}
function bindSplashDropdown($dropdown, open, forceBound) {
  if (!0 !== $dropdown.data('splash-dropdown') || forceBound) {
    if (
      ($dropdown.data('splash-dropdown', !0),
      (open = open || !1) &&
        ($dropdown.addClass('open'),
        0 < $dropdown.parents('#nav-embed').length))
    ) {
      var $last_option = $dropdown.find('.option:last'),
        top_position = $last_option.offset().top + $last_option.height()
      setTimeout(function () {
        $('#nav-embed .content').scrollTop(top_position)
      }, 1)
    }
    var drpclr,
      $current = $dropdown.find('.current:first')
    $current.unbind('mousedown').mousedown(function () {
      $dropdown.hasClass('open')
        ? $current.hasClass('no-close') || $dropdown.removeClass('open')
        : $dropdown.addClass('open')
    }),
      $dropdown.on('click', '.options:first > div', function () {
        var $opt = $(this),
          value = $opt.attr('value')
        if (!$current.hasClass('external-link')) {
          if ($(this).hasClass('edit-fonts')) return !1
          $opt.addClass('active').siblings().removeClass('active'),
            void 0 === value && (value = $opt.html()),
            $current.hasClass('locked') ||
              $opt.hasClass('locked') ||
              $current.html($opt.html()),
            $current.hasClass('no-close') ||
              $opt.hasClass('no-close') ||
              $dropdown.removeClass('open').trigger('change'),
            $current.hasClass('no-val-change') ||
              $opt.hasClass('no-val-change') ||
              $dropdown.find('input:first').val(value).trigger('change')
        }
      }),
      $dropdown.unbind('mouseover').mouseover(function () {
        clearTimeout(drpclr)
      }),
      $dropdown.unbind('mouseout').mouseout(function () {
        clearTimeout(drpclr),
          (drpclr = setTimeout(function () {
            $current.hasClass('no-close') || $dropdown.removeClass('open'),
              $dropdown.hasClass('unit-dropdown') &&
                $dropdown.parents('.bx:first').removeClass('dd-open')
          }, 750))
      })
  }
}
function bindSplashTip($tip) {
  var w = $tip.attr('open-width') || 300
  $tip
    .addClass('bound')
    .find('> span:first')
    .css({ width: w + 'px', marginLeft: w / -2 + 'px' })
}
function bindSplashCheck($check) {
  var clickNuCheckbox = function () {
    var c = 'checked'
    if (void 0 !== $check.attr('vals'))
      var vals = $check.attr('vals').split(',')
    var thisVal = $check.find("input[type='hidden']:first").attr('use-val')
    if (
      ('include_other_opt' == thisVal && (thisVal = void 0),
      $check.hasClass(c))
    ) {
      var v = void 0 !== vals ? vals[0] : 0
      void 0 !== $check.attr('rev') && (v = 1),
        void 0 !== thisVal && (v = thisVal),
        $check
          .removeClass(c)
          .find("input[type='hidden']:first")
          .val(v)
          .trigger('change')
    } else {
      v = void 0 !== vals ? vals[1] : 1
      $check.attr('rev') && (v = 0),
        void 0 !== thisVal && (v = thisVal),
        $check
          .addClass(c)
          .find("input[type='hidden']:first")
          .val(v)
          .trigger('change')
    }
  }
  $check.unbind('click').click(clickNuCheckbox), clickNuCheckbox()
}
function flipDropDown(
  $dd,
  newVal,
  triggerChange,
  forceResetAfterSelection
) {
  $dd.hasClass('nu-dropdown') || ($dd = $dd.parents('.nu-dropdown:first')),
    null != triggerChange && 1 == triggerChange
      ? $dd.find('input:first').val(newVal).trigger('change')
      : $dd.find('input:first').val(newVal)
  var $opt = $dd
    .find('div.options')
    .find('div[value="' + newVal + '"]:first')
  $opt.length < 1 &&
    void 0 !== newVal &&
    ($opt = $dd
      .find('div.options')
      .find('div[value="' + capitalizeFirstLetter(newVal) + '"]:first')),
    0 < $opt.length
      ? ($opt.addClass('active').siblings().removeClass('active'),
        $dd.find('.current').html($opt.html()))
      : ($dd.find('div.options').removeClass('active'),
        $dd.find('.current').html('')),
    (!0 !== (forceResetAfterSelection = forceResetAfterSelection || !1) &&
      'string' != typeof forceResetAfterSelection) ||
      ('string' == typeof forceResetAfterSelection
        ? $dd.find('.current').html(forceResetAfterSelection)
        : $dd.find('.current').html('Select'),
      $opt.removeClass('active'))
}
function capitalizeFirstLetter(string) {
  if (void 0 !== string && null != string)
    return ('' + string).charAt(0).toUpperCase() + ('' + string).slice(1)
}
function bindSplashRadio($radio, skipFirstClick) {
  skipFirstClick = skipFirstClick || !1
  var myClick = function (e) {
    var c = 'select',
      name = $radio.attr('name')
    $radio.hasClass(c)
      ? $radio
          .removeClass(c)
          .find("input[type='hidden']:first")
          .val(0)
          .prop('checked', !1)
          .trigger('change')
      : ($radio
          .parents('.nu-radio-contain:first')
          .find(".nu-radio[name='" + name + "']")
          .each(function () {
            $(this)
              .find("input[type='hidden']:first")
              .val(0)
              .prop('checked', !1)
              .trigger('change')
              .end()
              .removeClass('select')
          }),
        $radio
          .addClass(c)
          .find("input[type='hidden']:first")
          .val(1)
          .prop('checked', !0)
          .trigger('change')),
      e && e.stopPropagation()
  }
  $radio.unbind('click').click(myClick), skipFirstClick || myClick()
}
function setCheck($obj, value, forceTrigger) {
  $obj.hasClass('nu-checkbox') && ($obj = $obj.find('input:first')),
    '1' == value || 'true' == value
      ? $obj.val(1).parent().addClass('checked')
      : $obj.val(0).parent().removeClass('checked'),
    null != forceTrigger && 1 == forceTrigger && $obj.trigger('change')
}
function getChangedInputsArray($changed_inputs) {
  var postData = {}
  return (
    $changed_inputs.each(function () {
      '' != this.name &&
        ('checkbox' == this.type
          ? $(this).hasClass('rsvp-field')
            ? 1 == this.checked
              ? (postData[
                  'data[EventSetting][rsvp_fields][' + this.value + ']'
                ] = 1)
              : (postData[
                  'data[EventSetting][rsvp_fields][' + this.value + ']'
                ] = 0)
            : 1 == this.checked
            ? (postData[this.name] = 1)
            : (postData[this.name] = 0)
          : 'radio' == this.type
          ? 1 == this.checked && (postData[this.name] = this.value)
          : void 0 !== postData[this.name]
          ? $.isArray(postData[this.name])
            ? postData[this.name].push(this.value)
            : (postData[this.name] = [postData[this.name], this.value])
          : (postData[this.name] = this.value))
    }),
    postData
  )
}
function saveTags(tags, _callBack, _errorCallBack) {
  tags &&
    0 != tags.length &&
    $.ajax({
      url: '/events/saveTags',
      type: 'post',
      data: { tags: tags },
      dataType: 'json',
    })
      .done(function (response) {
        'function' == typeof _callBack && _callBack()
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        'function' == typeof _errorCallBack && _errorCallBack()
      })
}
function isValidEmail(val) {
  return /^[^@]+@[^.]+\.[^\s@,]+$/.test($.trim(val))
}
function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    clearTimeout(timeout),
      (timeout = setTimeout(function () {
        ;(timeout = null), immediate || func.apply(context, args)
      }, wait)),
      immediate && !timeout && func.apply(context, args)
  }
}
function escapeHtml(text) {
  return 'string' != typeof text
    ? text
    : text
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;')
}
$(document).on('click', '.simple-reveal', function () {
  fireAjaxModal($(this))
}),
  $(document).on(
    'click',
    '.closeSimpleModal, a.close-modal-link, .close-modal, .simple-modal .close-simple-modal',
    function (event) {
      event.preventDefault(),
        $(this).hasClass('close-persistent')
          ? closeSimpleModal({ persistent: !0 })
          : closeSimpleModal()
    }
  ),
  $(document).on('click', '.sleeker .sections-nav .section', function () {
    var $self = $(this),
      $modal = $self.parents('.simple-modal:first'),
      section = $self.attr('data-opt')
    return (
      section &&
        $modal
          .find('.content-container')
          .removeClass('active')
          .addClass('hide')
          .end()
          .find('.content-container[data-opt="' + section + '"]')
          .addClass('active')
          .removeClass('hide'),
      $modal.find('.sections-nav .section').removeClass('active'),
      $self.addClass('active'),
      !1
    )
  }),
  (splash.modal = (function ($) {
    return {
      getCurrent: function () {
        var current = splash.modal.stack.getCurrent()
        if (current && current.id) {
          var id = current.id
          return $('#' + id)
        }
        return $()
      },
    }
  })(jQuery)),
  (splash.modal.stack = (function ($) {
    var stack = [],
      currentModal = null
    return {
      pop: function () {
        return (currentModal = stack.pop())
      },
      put: function (modal, persistent) {
        'string' == typeof modal && (modal = { id: modal }),
          persistent && 1 == persistent && (modal.persistent = 1),
          stack.push(currentModal),
          (currentModal = modal)
      },
      getCurrent: function () {
        return currentModal
      },
      editCurrent: function (modalId, params) {
        currentModal = { id: modalId, params: params }
      },
      getStack: function () {
        return stack
      },
      clear: function () {
        stack = []
      },
      isOpen: function (modalId) {
        if (currentModal && currentModal.id == modalId) return !0
        for (var i in stack)
          if (stack[i] && stack[i].id == modalId) return !0
        return !1
      },
    }
  })(jQuery))
var SplashUI = (function () {
  var $alertHolder = null,
    isModalOpen = !1
  return (
    $(function () {
      if (!$alertHolder) {
        var $existingGrowlHolder = $('#growl-holder')
        $alertHolder = $existingGrowlHolder.length
          ? $existingGrowlHolder
          : $('<div />', { id: 'growl-holder' }).appendTo('body')
      }
    }),
    {
      confirm: function (callback, message, params) {
        ;(params = params || {}), isModalOpen && this.hideGrowl()
        var btnText =
            'string' == typeof params.button && '' !== params.button
              ? params.button
              : 'Confirm',
          label = params && params.label ? params.label : 'Heads Up:',
          customClass =
            'string' == typeof params.customClass
              ? params.customClass
              : '',
          buttonConfirmClasses = 'nu-btn nu-btn-sleek splashui-confirm-btn'
        window._.isUndefined(params.buttonConfirmClass) ||
          window._.isEmpty(params.buttonConfirmClass) ||
          (buttonConfirmClasses += ' ' + params.buttonConfirmClass)
        var buttonCancelClasses = 'nu-btn nu-btn-sleek plain'
        window._.isUndefined(params.buttonCancelClass) ||
          window._.isEmpty(params.buttonCancelClass) ||
          (buttonCancelClasses += ' ' + params.buttonCancelClass)
        var escapeHtmlOptional = function (value) {
            return params.dangerouslyAllowHtml ? value : escapeHtml(value)
          },
          html =
            '<div class="splashui-inner ' +
            escapeHtml(customClass) +
            '"><p class="splashui-title">' +
            escapeHtmlOptional(label) +
            '</p><p>' +
            escapeHtmlOptional(message) +
            '</p><button data-confirm-response="1" class="' +
            escapeHtml(buttonConfirmClasses) +
            '">' +
            escapeHtmlOptional(btnText) +
            '</button><button data-confirm-response="0" class="' +
            escapeHtml(buttonCancelClasses) +
            '">Cancel</button></div>',
          $modal = $('<div />', { html: html, class: 'splashui-confirm' })
        $modal.appendTo('body')
        var handleResponse = function (response) {
          response ? callback.call(null, !0) : callback.call(null, !1),
            (params.dontClose && 0 != response) ||
              (this.hideGrowl(), $(document).off('keyup.closeConfirm')),
            (isModalOpen = !1)
        }.bind(this)
        $modal.find('input[type=text]:first').length
          ? $modal.find('input[type=text]:first').focus()
          : $modal.find('button[data-confirm-response="1"]').focus(),
          $modal.find('[data-confirm-response]').on('click', function () {
            handleResponse('1' == $(this).data('confirm-response'))
          }),
          $modal.on('click', function (e) {
            e.stopPropagation()
          }),
          $(document).on('keyup.closeConfirm', function (e) {
            27 === e.keyCode && handleResponse(!1)
          }),
          (isModalOpen = !0)
      },
      notify: function (message, modalClass, stickDuration, options) {
        this.hideGrowl(),
          (modalClass = modalClass
            ? modalClass + ' splashui-growl'
            : 'splashui-growl plain')
        var confirmationButtonMessage =
            'string' ==
            typeof (options = options || {}).confirmationButtonMessage
              ? options.confirmationButtonMessage
              : 'OK',
          confirmationButtonClass =
            'string' == typeof options.confirmationButtonClass
              ? options.confirmationButtonClass
              : '',
          hideConfirmationButton =
            'boolean' == typeof options.hideConfirmationButton &&
            options.hideConfirmationButton,
          escapeHtmlOptional = function (value) {
            return options.dangerouslyAllowHtml ? value : escapeHtml(value)
          },
          html =
            '<div class="splashui-inner"><p>' +
            escapeHtmlOptional(message) +
            '</p>' +
            (hideConfirmationButton
              ? ''
              : '<button data-dismiss="1" class="nu-btn nu-btn-sleek splashui-confirm-btn ' +
                escapeHtml(confirmationButtonClass) +
                '">' +
                escapeHtmlOptional(confirmationButtonMessage) +
                '</button>') +
            '</div>',
          $modal = $('<div />', { html: html, class: modalClass })
        $modal.appendTo($alertHolder)
        var timer = null,
          closeModal = function () {
            this.hideGrowl(), clearTimeout(timer)
          }.bind(this)
        !1 !== stickDuration &&
          (timer = setTimeout(function () {
            closeModal()
          }, stickDuration || 4e3)),
          $modal.on('click', function (e) {
            e.stopPropagation()
          }),
          $modal.find('[data-dismiss]').on('click', function () {
            closeModal()
          }),
          (isModalOpen = !0)
      },
      ask: function (
        callback,
        message,
        confirmBtnText,
        stickDuration,
        options
      ) {
        ;(options = options || {}),
          (confirmBtnText = confirmBtnText || 'Confirm')
        var escapeHtmlOptional = function (value) {
            return options.dangerouslyAllowHtml ? value : escapeHtml(value)
          },
          html =
            '<div class="splashui-inner"><p class="splashui-title">Heads Up:</p><p>' +
            escapeHtmlOptional(message) +
            '</p><button data-confirm-response="1" class="nu-btn nu-btn-sleek splashui-confirm-btn">' +
            escapeHtmlOptional(confirmBtnText) +
            '</button><button data-confirm-response="0" class="nu-btn nu-btn-sleek link x-close"></button></div>',
          $modal = $('<div />', {
            html: html,
            class: 'splashui-growl ask',
          }),
          handleResponse = function (response) {
            callback.call(null, !!response),
              this.hideGrowl(),
              $(document).off('keyup.closeGrowl')
          }.bind(this),
          timer = null,
          closeModal = function () {
            this.hideGrowl(), clearTimeout(timer)
          }.bind(this)
        !1 !== stickDuration &&
          (timer = setTimeout(function () {
            closeModal()
          }, stickDuration || 5e3)),
          $alertHolder && $alertHolder.html($modal),
          $modal.on('click', function (e) {
            e.stopPropagation()
          }),
          $modal.find('button[data-confirm-response="1"]').focus(),
          $modal.find('[data-confirm-response]').on('click', function () {
            handleResponse('1' == $(this).data('confirm-response'))
          }),
          $modal.on('click', function (e) {
            e.stopPropagation()
          }),
          (isModalOpen = !0)
      },
      hideGrowl: function () {
        $alertHolder.empty(),
          $('.splashui-confirm, splashui-inner').fadeOut(300, function () {
            $('.splashui-confirm, splashui-inner').remove()
          }),
          (isModalOpen = !1)
      },
      isModalOpen: function () {
        return isModalOpen
      },
    }
  )
})()
function scrollToBlock($block, options) {
  if (splash.server.constants.onCmsWorkspace)
    splash.page.scrollToBlock($block, options)
  else {
    if (
      (void 0 === (options = options || {}).force && (options.force = !1),
      void 0 === options.pulse && (options.pulse = !0),
      void 0 === options.offset && (options.offset = 0),
      void 0 === options.percentageOffset &&
        (options.percentageOffset = 0),
      void 0 === options.toBlockTop && (options.toBlockTop = !1),
      options.pulse && pulseBlock($block),
      void 0 === $block ||
        1 == splash.server.constants.prevent_scroll ||
        $('body').hasClass('is-viewing-modal') ||
        0 == $block.length ||
        (!$block.is(':visible') && !$block.hasClass('nav-jump')))
    )
      return !1
    1 < $block.length && ($block = $block.first())
    var clientHeight = document.documentElement.clientHeight,
      percentageOffset =
        Math.abs(options.percentageOffset) < 1
          ? options.percentageOffset
          : options.percentageOffset / 100
    if (options.toBlockTop) var insideBlockOffset = 0
    else insideBlockOffset = $block.height() / 2
    ;(!options.force && isBlockInViewport($block)) ||
      $('html, body').animate(
        {
          scrollTop:
            $block.offset().top +
            insideBlockOffset -
            clientHeight / 2 +
            clientHeight * percentageOffset +
            options.offset,
        },
        300
      )
  }
}
function pulseBlock($block) {
  if (splash.server.constants.onCmsWorkspace)
    splash.page.pulseBlock($block)
  else {
    if (
      ($block.addClass('pulse'),
      setTimeout(function () {
        $block.removeClass('pulse')
      }, 1e3),
      splash.finetune &&
        splash.finetune.workspace.isPseudoActive() &&
        $block.closest('.dope-repeatable-master').length)
    ) {
      var $linkedRepeatableElements =
        splash.finetune.repeatableElement.getRepeatedElements($block)
      $linkedRepeatableElements.length &&
        ($linkedRepeatableElements.addClass('pulse'),
        setTimeout(function () {
          $linkedRepeatableElements.removeClass('pulse')
        }, 2e3))
    }
  }
}
function isBlockInViewport($block) {
  var viewportHeight = jQuery(window).height(),
    documentScrollTop = jQuery(document).scrollTop(),
    minTop = documentScrollTop,
    maxTop = documentScrollTop + viewportHeight,
    elementOffset = $block.offset()
  return elementOffset.top > minTop && elementOffset.top < maxTop
}
function setAddressAutocomplete($input, options) {
  if ('undefined' == typeof google || !1 === google) return !1
  ;(options = options || {}),
    (autocomplete_options = {}),
    options.only_cities && (autocomplete_options.types = ['geocode']),
    options.only_cities_2 && (autocomplete_options.types = ['(cities)'])
  var autocomplete = new google.maps.places.Autocomplete(
      $input[0],
      autocomplete_options
    ),
    listener = google.maps.event.addListener(
      autocomplete,
      'place_changed',
      function (e) {
        var place = autocomplete.getPlace(),
          address_fields = {
            name: place.name,
            street_number: '',
            address: '',
            city: '',
            state: '',
            zip: '',
          }
        if (place.address_components)
          for (var i in place.address_components)
            'postal_code' == place.address_components[i].types[0]
              ? (address_fields.zip =
                  place.address_components[i].long_name)
              : 'street_number' == place.address_components[i].types[0]
              ? (address_fields.street_number =
                  place.address_components[i].long_name)
              : 'route' == place.address_components[i].types[0]
              ? (address_fields.address =
                  place.address_components[i].long_name)
              : 'locality' == place.address_components[i].types[0]
              ? (address_fields.city =
                  place.address_components[i].long_name)
              : 'administrative_area_level_1' ==
                place.address_components[i].types[0]
              ? (address_fields.state =
                  place.address_components[i].short_name)
              : 'country' == place.address_components[i].types[0] &&
                (address_fields.country =
                  place.address_components[i].long_name)
        if (
          ((address_fields.address =
            address_fields.street_number + ' ' + address_fields.address),
          $input.addClass('autocompleted'),
          $input.closest('.venue-search-container').length)
        ) {
          var $container = $input.closest('.venue-search-container')
          if (
            ($container
              .find('.venue-search-name')
              .val(address_fields.name)
              .end()
              .find('.venue-search-city')
              .val(address_fields.city)
              .end()
              .find('.venue-search-state')
              .val(address_fields.state)
              .end()
              .find('.venue-search-country')
              .val(address_fields.country)
              .end()
              .find('.venue-search-address')
              .val(address_fields.address)
              .end()
              .find('.venue-search-zip-code')
              .val(address_fields.zip),
            void 0 !== place.geometry &&
              $container
                .find('.venue-search-lat')
                .val(place.geometry.location.lat())
                .end()
                .find('.venue-search-lng')
                .val(place.geometry.location.lng()),
            setCheck($container.find('.venue-search-tbd-input'), 0),
            'venue-search' == $input.prop('id'))
          ) {
            var $maps_on_page = $('#splash-container').find(
              'div.map.sf:visible'
            )
            1 == $maps_on_page.length &&
              'undefined' != typeof getGoogleMapImg &&
              getGoogleMapImg(function (data) {
                var address_string = createNewMapString(address_fields),
                  sfid = $maps_on_page.prop('id').replace('sfid-', '')
                $maps_on_page
                  .find('div.embed')
                  .find('img:first')
                  .prop('src', data.image),
                  $maps_on_page.find('div.body').html(address_string),
                  splash.finetune.addToEditedFields(
                    'data[SplashFeed][' + sfid + '][embed_code]',
                    '<img src="' + data.image + '" />'
                  ),
                  splash.finetune.addToEditedFields(
                    'data[SplashFeed][' + sfid + '][body]',
                    address_string
                  ),
                  splash.PubSub.publish('page-changes-made', 'layout')
              }, $container)
          }
        }
        if (
          $input
            .closest('.address-holder')
            .find('.address-autocomplete-field').length
        ) {
          var $holder = $input.closest('.address-holder')
          $holder
            .find('.address-autocomplete-field[growth-machine=venue_name]')
            .val(address_fields.name)
            .end()
            .find('.address-autocomplete-field[growth-machine=city]')
            .val(address_fields.city)
            .end()
            .find('.address-autocomplete-field[growth-machine=state]')
            .val(address_fields.state)
            .end()
            .find('.address-autocomplete-field[growth-machine=country]')
            .val(address_fields.country)
            .end()
            .find('.address-autocomplete-field[growth-machine=address]')
            .val(address_fields.address)
            .end()
            .find('.address-autocomplete-field[growth-machine=zipcode]')
            .val(address_fields.zip)
            .end(),
            void 0 !== place.geometry &&
              $holder
                .find('.address-autocomplete-field[growth-machine=lat]')
                .val(place.geometry.location.lat())
                .end()
                .find('.address-autocomplete-field[growth-machine=lng]')
                .val(place.geometry.location.lng())
        }
        $input.closest('#rsvp-form-inner').length &&
          (($rsvp_form = $input.closest('#rsvp-form-inner')),
          $rsvp_form.find('.auto-country').length &&
            void 0 !== address_fields.country &&
            $rsvp_form
              .find('.auto-country input')
              .val(address_fields.country),
          $rsvp_form.find('.auto-state').length &&
            void 0 !== address_fields.state &&
            $rsvp_form.find('.auto-state input').val(address_fields.state),
          $rsvp_form.find('.auto-city').length &&
            void 0 !== address_fields.city &&
            $rsvp_form.find('.auto-city input').val(address_fields.city),
          $rsvp_form.find('.auto-address').length &&
            void 0 !== address_fields.address &&
            $rsvp_form
              .find('.auto-address input')
              .val(address_fields.address),
          $rsvp_form.find('.auto-zipcode').length &&
            void 0 !== address_fields.zip &&
            $rsvp_form.find('.auto-zipcode input').val(address_fields.zip),
          $rsvp_form.find('.auto-venue').length &&
            void 0 !== address_fields.name &&
            $rsvp_form.find('.auto-venue input').val(address_fields.name),
          $rsvp_form.find('.auto-address').length &&
            void 0 !== address_fields.address &&
            $rsvp_form
              .find('.auto-address input')
              .val(address_fields.address),
          void 0 !== place.geometry &&
            $rsvp_form.find('.auto-latitude').length &&
            $rsvp_form
              .find('.auto-latitude input')
              .val(place.geometry.location.lat()),
          void 0 !== place.geometry &&
            $rsvp_form.find('.auto-longitude').length &&
            $rsvp_form
              .find('.auto-longitude input')
              .val(place.geometry.location.lng())),
          'function' == typeof options.done &&
            options.done(place, address_fields)
      }
    )
  $input.data({
    googleAutocompleteListener: listener,
    googleAutocomplete: autocomplete,
  })
}
function removeAddressAutocomplete($input) {
  var listener = $input.data('googleAutocompleteListener'),
    autocomplete = $input.data('googleAutocomplete')
  void 0 !== autocomplete &&
    google.maps.event.clearInstanceListeners(autocomplete),
    void 0 !== listener && google.maps.event.removeListener(listener),
    $('.pac-container').remove()
}
function closeSimpleModal(options) {
  null == options && (options = {})
  var $addNewSection = $('#add-new-element')
  0 < $addNewSection.length &&
    $addNewSection.is(':visible') &&
    $addNewSection
      .removeClass('set')
      .find('.active')
      .removeClass('active'),
    'undefined' != typeof cropImageJcrop &&
      cropImageJcrop.destroy &&
      cropImageJcrop.destroy()
  var currentModal = splash.modal.stack.getCurrent()
  if (
    !currentModal ||
    !currentModal.persistent ||
    1 != currentModal.persistent ||
    options.persistent
  ) {
    void 0 !== options.closeAll &&
      options.closeAll &&
      splash.modal.stack.clear()
    for (
      var previousModal = splash.modal.stack.pop();
      currentModal &&
      previousModal &&
      currentModal.id &&
      previousModal.id &&
      currentModal.id == previousModal.id;

    )
      previousModal = splash.modal.stack.pop()
    var $wrap = $('#simple-modal-wrap')
    if (
      (currentModal &&
        ('video-embed' == currentModal.id
          ? splash.finetune.videoElement.stopVideoPlay()
          : 'audio-embed' == currentModal.id
          ? splash.finetune.audioElement.stopAudioPlay()
          : 'rsvp-modal' == currentModal.id &&
            splash.finetune &&
            'function' == typeof splash.finetune.hideNoPayoutHeader &&
            splash.finetune.hideNoPayoutHeader()),
      previousModal && 0 < $wrap.find('#' + previousModal.id).length)
    )
      return (
        (fireSimpleModalOpts = { fromStack: !0 }),
        void 0 !== previousModal.params &&
          (fireSimpleModalOpts.settings = previousModal.params),
        $wrap
          .find('#' + previousModal.id)
          .fireSimpleModal(fireSimpleModalOpts),
        !1
      )
    $wrap
      .find(
        '.simple-modal-flow-control > .simple-modal, #simple-modal-ajax'
      )
      .removeClass('is-open')
      .hide(),
      $wrap
        .find('.simple-modal-flow-control')
        .removeClass('disable-vertical-center'),
      $('#simple-modal-ajax').removeClass('email-send').empty()
    var classesToRemove = 'showSimple'
    $('#planning-tools').hasClass('expanded') ||
      $('body').hasClass('is-viewing-modal') ||
      (classesToRemove += ' lockItUp'),
      $('body').removeClass(classesToRemove),
      $('#galleryWrap').hide().data({ gallerySfid: '', galleryGid: '' })
  }
}
function isPageSameOriginAsParent() {
  var sameOrigin
  try {
    sameOrigin =
      -1 !==
      window.parent.parent.location.host.indexOf(window.location.host)
  } catch (e) {
    sameOrigin = !1
  }
  return sameOrigin
}
function fireAjaxModal($link, params, callback, errorCallback) {
  ;(params = params || {}), ($link = $link || $())
  var loading_content = '',
    ajaxUrl = params.href || $link.attr('reveal-href'),
    cacheId = params.cacheId || $link.attr('cache-modal'),
    xtraAttr = params.xtraAttr || $link.attr('xtra-attr'),
    xtraClasses = params.xtraClasses || $link.attr('xtra-classes')
  if (void 0 === ajaxUrl) {
    if (void 0 === params.href) return
    ajaxUrl = params.href
  }
  if (
    (void 0 === params.event_id &&
      void 0 !== splash &&
      void 0 !== splash.server &&
      void 0 !== splash.server.constants &&
      void 0 !== splash.server.constants.event_id &&
      (params.event_id = splash.server.constants.event_id),
    void 0 === xtraAttr &&
      void 0 !== params.xtraAttr &&
      (xtraAttr = params.xtraAttr),
    void 0 === xtraClasses &&
      (xtraClasses =
        void 0 !== params.xtraClasses ? params.xtraClasses : ''),
    void 0 !== cacheId)
  ) {
    var $cachedModal = $('#' + cacheId)
    if (0 < $cachedModal.length)
      return (
        $cachedModal.fireSimpleModal(),
        'undefined' != typeof SUI && SUI.initComponents($cachedModal),
        void ('function' == typeof callback && callback($ajaxModal, !0))
      )
  }
  $link.length &&
    void 0 !== $link.attr('section-title') &&
    (loading_content += '<h3>' + $link.attr('section-title') + '</h3>')
  loading_content += '<div class="cube-loader modal loading"></div>'
  var $ajaxModal = $('#simple-modal-ajax')
  $ajaxModal
    .removeAttr('xtra-attr event-id')
    .fireSimpleModal(params)
    .html(loading_content),
    'dev-tools-btn' === $link.attr('id')
      ? $ajaxModal.addClass('code-sleeker').css('overflow-y', 'hidden')
      : $ajaxModal.addClass('code-sleeker').css('overflow-y', ''),
    $.ajax({ url: ajaxUrl, data: params, type: 'POST', dataType: 'html' })
      .done(function (responseText) {
        xtraAttr && $ajaxModal.attr('xtra-attr', xtraAttr),
          cacheId
            ? ($('#simple-modal-wrap')
                .find('.simple-modal-flow-control')
                .append(
                  '<div id="' +
                    cacheId +
                    '" class="simple-modal hide">' +
                    responseText +
                    '</div>'
                ),
              closeSimpleModal(),
              ($ajaxModal = $('#' + cacheId)).fireSimpleModal())
            : ($ajaxModal.html(responseText),
              $ajaxModal.children().hasClass('simple-modal')
                ? $ajaxModal
                    .removeClass('simple-modal sleeker full-sleeker')
                    .children('.simple-modal')
                    .show()
                    .css('display', 'inline-block')
                    .addClass(xtraClasses)
                : $ajaxModal.addClass(
                    'simple-modal sleeker full-sleeker ' + xtraClasses
                  )),
          'undefined' != typeof SUI && SUI.initComponents($ajaxModal),
          'function' == typeof callback && callback($ajaxModal, !1)
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        var error =
          jqXHR.responseJSON && jqXHR.responseJSON.error
            ? jqXHR.responseJSON.error.code
            : null
        closeSimpleModal(),
          'function' == typeof errorCallback && errorCallback(error)
      })
}
if (
  ((splash.eventIndex = (function ($) {
    return {
      eventCard: function (eventData, event_cards_view) {
        if (void 0 === eventData) return !1
        var themeStyles, eventCardImages, eventCardImg
        try {
          'object' ==
            typeof (themeStyles = JSON.parse(
              eventData.EventSetting.theme_styles
            )) &&
            null !== themeStyles &&
            ('string' == typeof themeStyles.event_card_img
              ? (eventCardImages = JSON.parse(themeStyles.event_card_img))
              : 'object' == typeof themeStyles.event_card_img &&
                (eventCardImages = themeStyles.event_card_img))
        } catch (err) {
          setTimeout(function () {
            throw new Error(err.stack)
          }, 0)
        }
        ;(eventCardImg =
          !(!eventCardImages || !eventCardImages.x1) &&
          eventCardImages.x1),
          (new RegExp(
            'https://s3.amazonaws.com/s3.clients.splashthat.com/img/events/splash/[0-9]{1,3}.png'
          ).test(eventCardImg) ||
            new RegExp(
              'https://d24wuq6o951i2g.cloudfront.net/img/events/splash/[0-9]{1,3}.png'
            ).test(eventCardImg)) &&
            (eventCardImg = !1)
        var title = eventData.Event.title,
          event_id = eventData.Event.id,
          extra_classes = { card: '', chkbox: '' },
          venue_name = '',
          venue_city = '',
          imgUrl = eventData.image,
          themeVersion = eventData.SplashTheme
            ? eventData.SplashTheme.version
            : void 0,
          organization = eventData.Event.organization_id
        '' != eventData.Event.venue_name &&
        null != eventData.Event.venue_name
          ? (venue_name = eventData.Event.venue_name)
          : '' != eventData.Event.address &&
            null != eventData.Event.address &&
            (venue_name = eventData.Event.address),
          '' != eventData.Event.city &&
            null != eventData.Event.city &&
            ((venue_city = eventData.Event.city),
            '' != eventData.Event.state &&
              null != eventData.Event.state &&
              (venue_city += ', ' + eventData.Event.state)),
          void 0 !== eventData.date_tbd &&
            ((eventData.start_day = 'Date'),
            (eventData.start_month = 'TBD')),
          1 == eventData.EventSetting.venue_tbd
            ? ((venue_name = 'Venue TBD'),
              (venue_city = ''),
              (extra_classes.card += ' venue-tbd '))
            : '' == venue_name &&
              '' == venue_city &&
              (extra_classes.card += ' no-venue '),
          'undefined' != typeof massSelect &&
            massSelect &&
            ((extra_classes.card += 'selected'),
            (extra_classes.chkbox += 'checked')),
          void 0 !== eventData.EventContact &&
            '0' == eventData.EventContact.confirmed &&
            (extra_classes.card += 'joinEvent')
        var $eventCard = $('#template-dashboard-hub-card')
          .find('.event-card')
          .clone()
        if (
          (void 0 !== eventData.Event.hub_listing &&
            0 < eventData.Event.hub_listing &&
            ((extra_classes.card += ' in-hub '),
            $eventCard
              .find('.event-card-hub-icon')
              .removeClass('hide')
              .addClass('inHubIcon')
              .find('.iconText')
              .text('In Hub')),
          2 == eventData.Event.hub &&
            ((extra_classes.card += ' hub '),
            $eventCard
              .find('.event-card-hub-icon')
              .removeClass('hide')
              .addClass('hubIcon')
              .find('.iconText')
              .text('Hub Page')),
          '1' == eventData.Event.external &&
            ((extra_classes.card += ' external hide '),
            $eventCard
              .find('.event-card-external-icon')
              .removeClass('hide')
              .addClass('externalIcon'),
            (imgUrl =
              'https://d24wuq6o951i2g.cloudfront.net/images/event-profile-image-index.jpg')),
          void 0 !== eventData.stats.counts)
        ) {
          var rsvpCount = eventData.stats.counts
            ? addCommas(eventData.stats.counts)
            : 0
          if (
            ($eventCard
              .find('.rsvp-count')
              .removeClass('hide')
              .find('.value')
              .text(rsvpCount),
            eventData.stats.is_converted_to_tickets_from_rsvp &&
              'tickets' == eventData.EventSetting.rsvp_method)
          )
            var numeral = 'Attendees'
          else if ('collect' == eventData.EventSetting.rsvp_method)
            numeral = 'Attendees'
          else numeral = 'Tickets Sold'
          1 == rsvpCount &&
            (numeral = numeral
              .replace('Attendees', 'Attendee')
              .replace('Tickets', 'Ticket')),
            $eventCard.find('.rsvp-count .text').text(numeral)
        }
        if (
          void 0 !== eventData.Statistic &&
          void 0 !== eventData.Statistic.hits &&
          null != eventData.Statistic.hits
        ) {
          var viewCount = eventData.Statistic.hits
            ? addCommas(eventData.Statistic.hits)
            : 0
          $eventCard.find('.page-views .value').text(viewCount),
            1 == viewCount
              ? $eventCard.find('.page-views .text').text('View')
              : $eventCard.find('.page-views .text').text('Views')
        }
        return (
          void 0 !== eventData.block_event_domain &&
            !0 == !!eventData.block_event_domain &&
            $eventCard.data('blockEventDomain', !0),
          void 0 !== eventData.domain && '' != eventData.domain
            ? ($eventCard.addClass('pointer'),
              $eventCard.data('domain', eventData.domain))
            : $eventCard.removeClass('pointer'),
          void 0 !== eventData.editUrl &&
            '' != eventData.editUrl &&
            $eventCard.data('editUrl', eventData.editUrl),
          themeVersion &&
            $eventCard.attr('data-theme-version', themeVersion),
          organization &&
            '0' != organization &&
            $eventCard.attr('data-organization', ''),
          $eventCard
            .attr('event-id', event_id)
            .addClass(extra_classes.card)
            .find('label.nu-checkbox')
            .addClass(extra_classes.chkbox)
            .find('input')
            .attr('id', 'event-checkbox-' + event_id)
            .end()
            .end()
            .find('.short-date span')
            .text(eventData.start_month.substring(4))
            .end()
            .find('.short-date small')
            .text(
              eventData.start_month.substr(
                0,
                eventData.start_month.length - 3
              )
            )
            .end()
            .find('.view-contact-nu')
            .attr('id', 'event-' + event_id)
            .find('.name')
            .text(title)
            .end()
            .find('.venueName')
            .text(venue_name)
            .end()
            .find('.venueCityState')
            .text(venue_city)
            .end()
            .find('.dow')
            .text(eventData.start_day)
            .end()
            .find('.monthDay')
            .text(eventData.start_month)
            .end(),
          eventCardImg
            ? $eventCard
                .find('.dashboard-event-card__screencap')
                .attr('src', eventCardImg)
                .end()
                .find('.event-card-bg')
                .remove()
                .end()
                .find('.venue')
                .remove()
                .end()
                .find('.name')
                .remove()
            : $eventCard
                .find('.event-card-bg')
                .attr('event-id', event_id)
                .find('.the-image')
                .css('background', "url('" + imgUrl + "')"),
          void 0 !== event_cards_view &&
            'hub_modal' == event_cards_view &&
            $eventCard
              .find(
                '.quick-utils, .viewPageSettings, .viewPageLink, .nu-checkbox'
              )
              .remove(),
          void 0 !== eventData.surveys
            ? ($eventCard
                .find('.go-to-survey')
                .find('.survey-completed')
                .text(eventData.surveys_completed)
                .end()
                .find('.survey-total')
                .text(eventData.surveys.length),
              0 < eventData.surveys.length &&
                eventData.surveys.length == eventData.surveys_completed &&
                $eventCard
                  .find('.go-to-survey')
                  .addClass('surveys-all-complete'))
            : $eventCard.find('.go-to-survey').addClass('hide'),
          $eventCard
            .find('.edit-event-page')
            .attr({
              href:
                '//' +
                ($eventCard.data('editUrl') || $eventCard.data('domain')),
            }),
          $eventCard
        )
      },
      eventRow: function (eventData) {
        if (void 0 === eventData) return !1
        eventData.Event.title
        var event_id = eventData.Event.id,
          extra_classes = { card: '', chkbox: '' },
          venue_name = '',
          venue_city = '',
          themeVersion = eventData.SplashTheme
            ? eventData.SplashTheme.version
            : void 0,
          organization = eventData.Event.organization_id
        '' != eventData.Event.venue_name &&
        null != eventData.Event.venue_name
          ? (venue_name = eventData.Event.venue_name)
          : '' != eventData.Event.address &&
            null != eventData.Event.address &&
            (venue_name = eventData.Event.address),
          '' != eventData.Event.city &&
            null != eventData.Event.city &&
            ((venue_city = eventData.Event.city),
            '' != eventData.Event.state &&
              null != eventData.Event.state &&
              (venue_city += ', ' + eventData.Event.state)),
          void 0 !== eventData.date_tbd &&
            ((eventData.start_day = 'Date'),
            (eventData.start_month = 'TBD')),
          1 == eventData.EventSetting.venue_tbd
            ? ((venue_name = 'Venue TBD'),
              (venue_city = ''),
              (extra_classes.card += ' venue-tbd '))
            : '' == venue_name &&
              '' == venue_city &&
              (extra_classes.card += ' no-venue '),
          '1' == eventData.Event.hub && (extra_classes.card += ' hub '),
          void 0 !== eventData.Event.hub_listing &&
            0 < eventData.Event.hub_listing &&
            (extra_classes.card += ' in-hub '),
          'present' == eventData.status &&
            (eventData.status = 'in progress'),
          (extra_classes.card += ' ' + eventData.status + ' '),
          void 0 !== eventData.EventContact &&
            '0' == eventData.EventContact.confirmed &&
            (extra_classes.card += 'joinEvent')
        var uniqueRecipientCount =
            void 0 !== eventData.stats.unique_recipient_count
              ? eventData.stats.unique_recipient_count
              : '-',
          themeVersionattr = themeVersion
            ? ' data-theme-version="' + themeVersion + '"'
            : '',
          organizationAttr =
            organization && '0' != organization
              ? ' data-organization'
              : '',
          extra_rows = ''
        if (void 0 !== eventData.surveys) {
          var extra_survey_classes = ''
          0 < eventData.surveys.length &&
            eventData.surveys.length == eventData.surveys_completed &&
            (extra_survey_classes += ' surveys-all-complete '),
            (extra_rows +=
              '<td class="surveys ' +
              extra_survey_classes +
              '"><a class="fill-out-survey" href="#"><b class="survey-completed">' +
              eventData.surveys_completed +
              '</b>/<b class="survey-total">' +
              eventData.surveys.length +
              '</b></a></td>')
        } else
          splash.server.constants.has_survey_permissions &&
            (extra_rows += '<td class="surveys">-</td>')
        return (
          '<tr event-id="' +
          event_id +
          '" class="event-card ' +
          extra_classes.card +
          '"' +
          themeVersionattr +
          organizationAttr +
          '><td class="event-input"><label class="nu-checkbox selector"><input type="hidden"></label></td><td class="event-title">' +
          eventData.Event.title +
          '</td><td class="event-date">' +
          eventData.shorter_date +
          '</td><td class="event-status">' +
          eventData.status +
          '</td><td class="event-uniques">' +
          eventData.stats.uniques +
          '</td><td class="event-hits">' +
          eventData.stats.pageviews +
          '</td><td class="event-invites">' +
          uniqueRecipientCount +
          '</td><td class="rsvps-number">' +
          eventData.stats.rsvps +
          '</td><td class="rsvps-attending">' +
          eventData.stats.rsvp_attending +
          '</td><td class="rsvps-capacity">' +
          eventData.stats.rsvp_capacity +
          '</td><td class="rsvps-waitlist">' +
          eventData.stats.rsvp_waitlist +
          '</td><td class="checkin-number">' +
          eventData.stats.checkins +
          '</td><td class="checkin-percent">' +
          eventData.stats.checked_in_percentage +
          '</td>' +
          extra_rows +
          '</tr>'
        )
      },
    }
  })(jQuery)),
  (splash.scrollToBlock = scrollToBlock),
  (splash.pulseBlock = pulseBlock),
  (window.timezoneDetector = (function ($) {
    return {
      getTimezone: function (lat, lng, callbacks) {
        var timestamp = Math.round(new Date().getTime() / 1e3).toString(),
          apiKey =
            window.splash &&
            window.splash.server &&
            window.splash.server.constants
              ? window.splash.server.constants.googleMapsKey
              : ''
        $.ajax({
          url:
            'https://maps.googleapis.com/maps/api/timezone/json?location=' +
            lat +
            ',' +
            lng +
            '&timestamp=' +
            timestamp +
            '&sensor=false&key=' +
            apiKey,
          dataType: 'json',
        })
          .done(function (response) {
            'object' != typeof response || 'OK' !== response.status
              ? callbacks.error && callbacks.error(response)
              : callbacks.success && callbacks.success(response)
          })
          .fail(function (xhr, options, error) {
            callbacks.error && callbacks.error()
          })
      },
    }
  })(jQuery)),
  ($.fn.fireSimpleModal = function (args) {
    var $modal = $(this)
    if ($modal.length) {
      $('body').addClass('lockItUp showSimple')
      var $wrap = $('#simple-modal-wrap')
      ;(args = args || {}),
        'edit-settings' == $modal.attr('id') &&
          splash.modal.settings.prepare($modal, args),
        void 0 !== args.mode
          ? $modal.attr('mode', args.mode)
          : $modal.removeAttr('mode')
      var currentModal = splash.modal.stack.getCurrent()
      if (currentModal && 'edit-settings' == currentModal.id) {
        var currentTab = splash.modal.settings.getActiveSettingsTab()
        splash.modal.stack.editCurrent('edit-settings', {
          tab: currentTab,
        })
      }
      var persistent = args.persistent ? args.persistent : 0
      if (void 0 === args.fromStack || !args.fromStack) {
        $modal.attr('id') && $modal.attr('id')
        splash.modal.stack.put($modal.attr('id'), persistent)
      }
      return (
        $wrap
          .show()
          .find(
            '.simple-modal-flow-control > .simple-modal, #simple-modal-ajax'
          )
          .hide()
          .removeClass('is-open'),
        $modal.show().addClass('is-open').css('display', 'inline-block'),
        $modal
      )
    }
    console.warn('Tried to open a modal, but no object was passed')
  }),
  (splash.module = {}),
  (splash.module.tags = (function ($) {
    var _removedTags = []
    return {
      compile: function ($tagsInput, params) {
        var eventId,
          tagsArray = $tagsInput.tagit('assignedTags'),
          tags = []
        params = params || {}
        for (var i in (params.forced_event_id
          ? (eventId = params.forced_event_id)
          : splash.server &&
            splash.server._event &&
            (eventId = splash.server._event.id),
        tagsArray)) {
          var thisTag = { name: tagsArray[i] }
          void 0 !== eventId && (thisTag.event_id = eventId),
            tags.push(thisTag)
        }
        for (var i in _removedTags) {
          thisTag = { name: _removedTags[i], deleted: 1 }
          void 0 !== eventId && (thisTag.event_id = eventId),
            tags.push(thisTag)
        }
        return (_removedTags = []), tags
      },
      clearAll: function ($tagsInput) {
        $tagsInput.tagit('removeAll')
      },
      addTag: function ($tagsInput, tagName) {
        $tagsInput.tagit('createTag', tagName)
      },
      init: function ($tagsInput) {
        if (void 0 !== $.fn.tagit)
          return (
            $tagsInput instanceof $ || ($tagsInput = $($tagsInput)),
            (_removedTags = []),
            $tagsInput
              .tagit({
                placeholderText: 'Type name of tag and press enter',
                removeConfirmation: !0,
                allowSpaces: !0,
                afterTagRemoved: function (event, ui) {
                  var tagName
                  ;(tagName = ui.tagLabel), _removedTags.push(tagName)
                },
              })
              .on('change', function () {
                $tagsInput.addClass('changes-made')
              }),
            $tagsInput
          )
      },
      clearDeletedTags: function () {
        _removedTags = []
      },
      getDeletedTags: function () {
        return _removedTags
      },
    }
  })(jQuery)),
  !jQuery.browser)
) {
  ;(jQuery.browser = {}),
    (jQuery.browser.mozilla = !1),
    (jQuery.browser.webkit = !1),
    (jQuery.browser.opera = !1),
    (jQuery.browser.safari = !1),
    (jQuery.browser.chrome = !1),
    (jQuery.browser.msie = !1),
    (jQuery.browser.android = !1),
    (jQuery.browser.blackberry = !1),
    (jQuery.browser.ios = !1),
    (jQuery.browser.operaMobile = !1),
    (jQuery.browser.windowsMobile = !1),
    (jQuery.browser.mobile = !1),
    (jQuery.browser.device = !1)
  var nameOffset,
    verOffset,
    ix,
    mobileDevices = [
      'android',
      'ios',
      'blackberry',
      'operaMobile',
      'windowsMobile',
    ],
    nAgt = navigator.userAgent
  if (
    ((jQuery.browser.ua = nAgt),
    (jQuery.browser.name = navigator.appName),
    (jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion)),
    (jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)),
    -1 != (verOffset = nAgt.indexOf('Opera')))
  )
    (jQuery.browser.opera = !0),
      (jQuery.browser.name = 'Opera'),
      (jQuery.browser.fullVersion = nAgt.substring(verOffset + 6)),
      -1 != (verOffset = nAgt.indexOf('Version')) &&
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))
  else if (-1 != (verOffset = nAgt.indexOf('MSIE')))
    (jQuery.browser.msie = !0),
      (jQuery.browser.name = 'Microsoft Internet Explorer'),
      (jQuery.browser.fullVersion = nAgt.substring(verOffset + 5))
  else if (-1 != nAgt.indexOf('Trident')) {
    ;(jQuery.browser.msie = !0),
      (jQuery.browser.name = 'Microsoft Internet Explorer')
    var start = nAgt.indexOf('rv:') + 3,
      end = start + 4
    jQuery.browser.fullVersion = nAgt.substring(start, end)
  } else
    -1 != (verOffset = nAgt.indexOf('Chrome'))
      ? ((jQuery.browser.webkit = !0),
        (jQuery.browser.chrome = !0),
        (jQuery.browser.name = 'Chrome'),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)))
      : -1 != (verOffset = nAgt.indexOf('Safari'))
      ? ((jQuery.browser.webkit = !0),
        (jQuery.browser.safari = !0),
        (jQuery.browser.name = 'Safari'),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)),
        -1 != (verOffset = nAgt.indexOf('Version')) &&
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
      : -1 != (verOffset = nAgt.indexOf('AppleWebkit'))
      ? ((jQuery.browser.webkit = !0),
        (jQuery.browser.name = 'Safari'),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)),
        -1 != (verOffset = nAgt.indexOf('Version')) &&
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
      : -1 != (verOffset = nAgt.indexOf('Firefox'))
      ? ((jQuery.browser.mozilla = !0),
        (jQuery.browser.name = 'Firefox'),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
      : (nameOffset = nAgt.lastIndexOf(' ') + 1) <
          (verOffset = nAgt.lastIndexOf('/')) &&
        ((jQuery.browser.name = nAgt.substring(nameOffset, verOffset)),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 1)),
        jQuery.browser.name.toLowerCase() ==
          jQuery.browser.name.toUpperCase() &&
          (jQuery.browser.name = navigator.appName))
  if (
    ((jQuery.browser.android = /Android/i.test(nAgt)),
    (jQuery.browser.blackberry = /BlackBerry/i.test(nAgt)),
    (jQuery.browser.ios = /iPhone|iPad|iPod/i.test(nAgt)),
    (jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt)),
    (jQuery.browser.windowsMobile = /IEMobile/i.test(nAgt)),
    (jQuery.browser.mobile =
      jQuery.browser.android ||
      jQuery.browser.blackberry ||
      jQuery.browser.ios ||
      jQuery.browser.windowsMobile ||
      jQuery.browser.operaMobile),
    mobileDevices.forEach(function (el, i) {
      jQuery.browser[el] && (jQuery.browser.device = el)
    }),
    -1 != (ix = jQuery.browser.fullVersion.indexOf(';')) &&
      (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(
        0,
        ix
      )),
    -1 != (ix = jQuery.browser.fullVersion.indexOf(' ')) &&
      (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(
        0,
        ix
      )),
    (jQuery.browser.majorVersion = parseInt(
      '' + jQuery.browser.fullVersion,
      10
    )),
    isNaN(jQuery.browser.majorVersion) &&
      ((jQuery.browser.fullVersion =
        '' + parseFloat(navigator.appVersion)),
      (jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10))),
    (jQuery.browser.version = jQuery.browser.majorVersion),
    null != navigator.plugins && 0 < navigator.plugins.length)
  )
    jQuery.browser.flash = navigator.plugins['Shockwave Flash'] && !0
  else if (~navigator.userAgent.toLowerCase().indexOf('webtv'))
    jQuery.browser.flash = !0
  else if (
    ~navigator.appVersion.indexOf('MSIE') &&
    !~navigator.userAgent.indexOf('Opera')
  )
    try {
      jQuery.browser.flash =
        new ActiveXObject('ShockwaveFlash.ShockwaveFlash') && !0
    } catch (e) {}
  ;(void 0 !== jQuery.browser.flash && jQuery.browser.flash) ||
    (jQuery.browser.flash = !1)
}
function addListener(element, type, expression, bubbling) {
  return (
    (bubbling = bubbling || !1),
    window.addEventListener
      ? (element.addEventListener(type, expression, bubbling), !0)
      : !!window.attachEvent &&
        (element.attachEvent('on' + type, expression), !0)
  )
}
var ImageLoader = function (url) {
  ;(this.url = url), (this.image = null), (this.loadEvent = null)
}
;(ImageLoader.prototype = {
  load: function () {
    this.image = document.createElement('img')
    var url = this.url
    if ('' != url) {
      var image = this.image,
        loadEvent = this.loadEvent
      addListener(
        this.image,
        'load',
        function (e) {
          null != loadEvent && loadEvent(url, image)
        },
        !1
      ),
        (this.image.src = this.url)
    }
  },
  getImage: function () {
    return this.image
  },
}),
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    var userFormSubmitToken =
      window.splash && window.splash.server && window.splash.server._user
        ? window.splash.server._user.userFormSubmitToken
        : void 0
    void 0 !== userFormSubmitToken &&
      !1 === options.crossDomain &&
      jqXHR.setRequestHeader('X-UserFormSubmitToken', userFormSubmitToken)
  }),
  $(document).on('submit', 'form', function () {
    void 0 !== window.userFormSubmitToken &&
      $(this).find('input[name="userFormSubmitToken"]').length < 1 &&
      $(this)
        .find('input[type="submit"]')
        .before(
          '<input type="hidden" name="userFormSubmitToken" value="' +
            window.userFormSubmitToken +
            '" />'
        )
  })
