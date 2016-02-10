$(document).foundation();

(function ($) {
  $(document).ready(function() {

    // Extending jQuery functions.
    $.fn.extend({
      deBounce: function debounce(func, wait, immediate) {
        // Delay function calls.
        var timeout;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      }
    });

    // Velocity Transitions.
    var animateOnLoad = jQuery().deBounce(function () {
      $('.content').velocity("transition.slideDownIn");
    }, 500);

    animateOnLoad();

  });
})(jQuery);