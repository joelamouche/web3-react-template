import $ from 'jquery';

$(document).ready(function(){
  $('.metamask-button').unwrap('.ant-menu-title-content');
  $('.status-menu-item').unwrap('.ant-menu-title-content');
  $('.account-menu-item').unwrap('.ant-menu-title-content');
  $('.chain-menu-item').unwrap('.ant-menu-title-content');
}); 

setInterval(function() {
  $(window).on("scroll", function() {
      if($(window).scrollTop() > 50) {
          $(".menu-container").css({'background-color': 'rgba(0, 0, 0, 0.8)', 'backdrop-filter': 'blur(5px)'});
      } else {
         $(".menu-container").css({'background-color': 'transparent'});
         $(".menu-container").css({'backdrop-filter': 'none'});
      }
  });
}, 200);