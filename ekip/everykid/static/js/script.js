$(function () {
  'use strict';

  function emailValidation(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }


  // mobile nav
  $('.mobile-menu .menu-button').click(function() {

    $('#curtain').fadeIn();
    $('.mobile-menu .menu').fadeIn();

  });

  $('.mobile-menu .close').click(function() {

    $('#curtain').fadeOut();
    $('.mobile-menu .menu').fadeOut();

  });


  $('.lets-go, .educator-begin, .lets-get-going, .about-more, .parents-more').click(function(e) {

    e.preventDefault();

    $('html, body').animate({
        scrollTop: $(".content-inner").offset().top
     }, 1000);

    $(this).addClass('active');

    $('.animate-line').fadeIn(1200);

  });

  // toggle agency descriptions
  $('#about .participating li h4').click(function(e) {

    e.preventDefault();

    $(this).parent().find('.description').fadeToggle();

    $(this).parent().toggleClass('open').toggleClass('closed');

    $('.closed .expand').html('click to expand');
    $('.open .expand').html('click to collapse');

  });

  $('#about .participating li h4').hover(function() {

    $(this).next().stop(true).fadeIn();

  }, function () {

    $(this).next().stop(true).fadeOut();

  });


  // scroll down to park sites on screens larger than tablet
  if($('#plan-your-trip .sites').length) {

    if($(window).width() > 1024) {
      $('html, body').animate({
        scrollTop: $(".sites-container").offset().top
     }, 1200);
    }

  }


  // educator form error checking
  $('#educators .pass-form button[type="submit"]').click(function(e) {

    e.preventDefault();

    var formErrors = false;

    // check text fields
    $('#educators input[type="text"]').each(function() {

      if($(this).val() == '' && $(this).attr('id') !== 'formtools_address_line_2') {

        $(this).parent().addClass('error');

        formErrors = true;
      }
      else {
        $(this).parent().removeClass('error');
      }
    });


    // validate email
    if(!emailValidation($('#formtools_work_email').val())) {

      $('.work_email').addClass('error');

      formErrors = true;
    }
    else {
      $('.work_email').removeClass('error');
    }


    // check radio inputs
    if(!$('#formtools_org_or_school_0').is(':checked') && !$('#formtools_org_or_school_1').is(':checked')) {

      $('.org_or_school').addClass('error');

      formErrors = true;
    }
    else {
      $('.org_or_school').removeClass('error');
    }


    // check dropdown
    if(!$("select option:selected").val()) {
      $('.state').addClass('error');

      formErrors = true;
    }
    else {
      $('.state').removeClass('error');
    }

    // check number input
    if(!$('#educators input[type="number"]').val() || $('#educators input[type="number"]').val() > 50 || $('#educators input[type="number"]').val() < 1) {
      $('.num_students, .pass-limit-text').addClass('error');

      formErrors = true;
    }
    else {

      $('.num_students, .pass-limit-text').removeClass('error');
    }

    if(formErrors) {

      $('.errors').remove();

      $('.pass-form').prepend('<div class="errors">Please correctly fill out the highlighted fields below:</div>');
    }
    else {
      $('#educators form').submit();
    }

  });


  // educator form (back to edit)
  $('#educators .back').click(function() {

    history.go(-1);

  });


}());
