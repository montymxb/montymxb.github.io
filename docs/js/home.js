(() => {
  // <stdin>
  $.fn.scrollView = function() {
    return this.each(function() {
      $("html, body").animate({
        scrollTop: $(this).offset().top
      }, 450);
    });
  };
  $(function() {
    var $elems = $(".animateblock");
    var winheight = $(window).height();
    var fullheight = $(document).height();
    $(window).scroll(function() {
      animate_elems("#breaker", "opaque_breaker", 0.25);
      animate_elems("#dev_pic", "dev_pic_viewing", 0.4);
    });
    function animate_elems(idName, className, margin) {
      wintop = $(window).scrollTop();
      $elm = $(idName);
      topcoords = $elm.offset().top;
      if (wintop > topcoords - winheight * margin) {
        $elm.addClass(className);
      } else {
        $elm.removeClass(className);
      }
    }
  });
})();
