$(document).ready(function() {
  $.localScroll();

  $('#navigation').waypoint('sticky', { offset: 0 });

  $('body > section').waypoint(function(dir) {
    if ($(this).hasClass('bg-red')) {
      if (dir == 'down') {
        $('#navigation').removeClass('bg-dark').addClass('bg-light');
      } else {
        $('#navigation').removeClass('bg-light').addClass('bg-dark');
      }
    } else {
      if (dir == 'down') {
        $('#navigation').removeClass('bg-light').addClass('bg-dark');
      } else {
        $('#navigation').removeClass('bg-dark').addClass('bg-light');
      }
    }
    
    $('#navigation a').removeClass('active');
    if (dir == 'down') {
      $('#navigation a[href=#' + $(this).attr('id') + ']').addClass('active');
    } else {
      $('#navigation a[href=#' + $(this).attr('id') + ']').prev().addClass('active');
    }
  }, { offset: 50 });

  // $('#videos').waypoint(changeNavBg, { offset: 50 });
});
