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
        '<div class="rating-input1">',
        stars,
        '</div>'].join('');

      // Replace original inputs HTML with the new one
      originalInput.replaceWith($(el).append(newInput));
    }












    // Give live to the newly generated widgets
    $('.rating-input1')
      // Highlight stars on hovering

      // View current value while mouse is out
      // Initialize view with default value
      .each(function () {
        var input = $(this).find('input'),
          val = input.val()
          _paintValue(this, val);
          //根据初始值设
      });


      // Initialize view with default value


  };





  // Auto apply conversion of number fields with class 'rating' into rating-fields
  $(function () {
    


      $('input.rating[type=number]').rating();
  });

}(jQuery));
