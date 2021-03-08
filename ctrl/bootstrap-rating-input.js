(function ($) {

  $.fn.rating = function () {

    var caption_list;
    var element;

    // A private function to highlight a star corresponding to a given value
    function _paintValue(ratingInput, value) {
      var selectedStar = $(ratingInput).find('[data-value=' + value + ']');
      selectedStar.removeClass('empty-star').addClass('full-star');
      selectedStar.prevAll('[data-value]').removeClass('empty-star').addClass('full-star');
      selectedStar.nextAll('[data-value]').removeClass('full-star').addClass('empty-star');
    }

    // A private function to remove the highlight for a selected rating
    function _clearValue(ratingInput) {
      var self = $(ratingInput);
      self.find('[data-value]').removeClass('full-star').addClass('empty-star');
    }

    // A private function to change the actual value to the hidden field
    function _updateValue(input, val) {
      input.val(val).trigger('change');
      if (val === input.data('empty-value')) {
        input.siblings('.rating-clear').hide();
      }
      else {
        input.siblings('.rating-clear').show();
      }
    }

    // Iterate and transform all selected inputs
    for (element = this.length - 1; element >= 0; element--) {

      var el, i,
        originalInput = $(this[element]),
        max = originalInput.data('max') || 5,
        min = originalInput.data('min') || 0,
        clearable = originalInput.data('clearable') || null,
        caption = originalInput.data('caption') || null,//是否启用评分说明
        stars = '';

      // HTML element construction
      for (i = min; i <= max; i++) {
        // Create <max> empty stars
        stars += ['<span class="empty-star" data-value="', i, '"></span>'].join('');
      }
      // Add a clear link if clearable option is set
      if (clearable) {
        stars += [
          ' <a class="rating-clear" style="display:none;" href="javascript:void">',
          '<span class="glyphicon glyphicon-remove"></span> ',
          clearable,
          '</a>'].join('');
      }

      // 如果启用分值说明，则添加相应的元素
      if (caption) {
        stars += [
          '<span class="rating-caption"></span> '].join('');
          caption_list = eval('('+caption+')');
      }

      // Clone with data and events the original input to preserve any additional data and event bindings.
      var newInput = originalInput.clone(true)
        .attr('type', 'hidden')
        .data('max', max)
        .data('min', min);

      // Rating widget is wrapped inside a div
      el = [
        '<div class="rating-input">',
        stars,
        '</div>'].join('');

      // Replace original inputs HTML with the new one
      originalInput.replaceWith($(el).append(newInput));
    }

    // Give live to the newly generated widgets
    $('.rating-input')
      // Highlight stars on hovering
      .on('mouseenter', '[data-value]', function () {
        var self = $(this),
          input = self.siblings('input'),
          min = input.data('min'),
          max = input.data('max');
        _paintValue(self.closest('.rating-input'), self.data('value'));
        var index = Math.round(self.data('value') / (max - min + 1) * (caption_list.length - 1));
        $('.rating-caption').text(caption_list[index]);
      })
      // View current value while mouse is out
      .on('mouseleave', '[data-value]', function () {
        var self = $(this),
          input = self.siblings('input'),
          val = input.val(),
          min = input.data('min'),
          max = input.data('max');
        if (val >= min && val <= max) {
          _paintValue(self.closest('.rating-input'), val);
          // 鼠标离开时，将分值说明修改为当前选择的值
          var index = Math.round(val / (max - min + 1) * (caption_list.length - 1));
          $('.rating-caption').text(caption_list[index]);
        } else {
          _clearValue(self.closest('.rating-input'));
          $('.rating-caption').text('');
        }
      })
      // Set the selected value to the hidden field
      .on('click', '[data-value]', function (e) {
        var self = $(this),
          val = self.data('value'),
          input = self.siblings('input');
        _updateValue(input,val);
        e.preventDefault();
        return false;
      })
      // Remove value on clear
      .on('click', '.rating-clear', function (e) {
        var self = $(this),
          input = self.siblings('input');
        _updateValue(input, input.data('empty-value'));
        _clearValue(self.closest('.rating-input'));
        e.preventDefault();
        return false;
      })
      // Initialize view with default value
      .each(function () {
        var input = $(this).find('input'),
          val = input.val(),
          min = input.data('min'),
          max = input.data('max');
        if (val !== "" && +val >= min && +val <= max) {
          _paintValue(this, val);
          //根据初始值设置评分说明
          var index = Math.round(val / (max - min + 1) * (caption_list.length - 1));
          $('.rating-caption').text(caption_list[index]);
          $(this).find('.rating-clear').show();
        }
        else {
          input.val(input.data('empty-value'));
          _clearValue(this);
        }
      });

  };

  // Auto apply conversion of number fields with class 'rating' into rating-fields
  $(function () {
    if ($('input.rating[type=number]').length > 0) {
      $('input.rating[type=number]').rating();
    }
  });

}(jQuery));
