/* --------------------------------------------------
 * © Copyright 2022 - Gigaland by Designesia
 * --------------------------------------------------*/
(function ($) {
  const rtl_mode = 'off'; // on - for enable RTL, off - for deactive RTL

  /* predefined vars begin */
  let mobile_menu_show = 0;
  let v_count = '0';
  let mb;
  const instances = [];
  const $window = $(window);
  let $tmp_h = '90';
  let $op_header_autoshow = 0;
  const grid_size = 10;
  /* predefined vars end */

  if ($('header').hasClass('has-topbar')) {
    $tmp_h = '125px';
  }

  $('#de-submenu-profile').hide();
  $('#de-submenu-notification').hide();

  /* color scheme */
  function dark_scheme() {
    $('.ss_dark').hide();
    $('.ss_light').show();
    $('body').addClass('dark-scheme');
    $('header').removeClass('header-light');
    $('header').removeClass('scroll-light');
    $('html').css('background', '#010203');
    custom_bg();
    $.cookie('c_mod', 1, { expires: 1000 }, '/');
  }
  function light_scheme() {
    $('.ss_light').hide();
    $('.ss_dark').show();
    $('body').removeClass('dark-scheme');
    $('header').addClass('header-light');
    $('header').addClass('scroll-light');
    custom_bg();
    $.cookie('c_mod', 2, { expires: 1000 }, '/');
  }

  if ($('body').hasClass('switch-scheme')) {
    var c_mod = $.cookie('c_mod');

    if (c_mod == 1) {
      dark_scheme();
    }

    if (c_mod == 2) {
      light_scheme();
    }
  }
  /* --------------------------------------------------
     * header | sticky
     * --------------------------------------------------*/
  function header_sticky() {
    jQuery('header').addClass('clone', 1000, 'easeOutBounce');
    const $document = $(document);
    let vscroll = 0;
    const header = jQuery('header.autoshow');
    if ($document.scrollTop() >= 50 && vscroll == 0) {
      header.removeClass('scrollOff');
      header.addClass('scrollOn');
      header.css('height', 'auto');
      vscroll = 1;
    } else {
      header.removeClass('scrollOn');
      header.addClass('scrollOff');
      vscroll = 0;
    }
  }
  /* --------------------------------------------------
     * plugin | magnificPopup
     * --------------------------------------------------*/
  function load_magnificPopup() {
    jQuery('.simple-ajax-popup-align-top').magnificPopup({
      type: 'ajax',
      alignTop: true,
      overflowY: 'scroll',
    });
    jQuery('.simple-ajax-popup').magnificPopup({
      type: 'ajax',
    });
    // zoom gallery
    jQuery('.zoom-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc(item) {
          return item.el.attr('title');
          // return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
        },
      },
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener(element) {
          return element.find('img');
        },
      },
    });
    // popup youtube, video, gmaps
    jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
    // Initialize popup as usual
    $('.image-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below

      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        },
      },

    });
    $('.image-popup-vertical-fit').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      mainClass: 'mfp-img-mobile',
      image: {
        verticalFit: true,
      },
    });
    $('.image-popup-fit-width').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      image: {
        verticalFit: false,
      },
    });
    $('.image-popup-no-margins').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
      image: {
        verticalFit: true,
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
      },
    });
    $('.image-popup-gallery').magnificPopup({
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc(item) {
          return item.el.attr('title');
          // return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
        },
      },
      gallery: {
        enabled: true,
      },
    });
    $('.images-group').each(function () { // the containers for all your galleries
      $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled: true,
        },
      });
    });

    $('.images-popup').magnificPopup({
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'image',
      // other options
    });
  }
  /* --------------------------------------------------
     * plugin | enquire.js
     * --------------------------------------------------*/
  function init_resize() {
    enquire.register('screen and (min-width: 993px)', {
      match() {
        mobile_menu_show = 1;
      },
      unmatch() {
        mobile_menu_show = 0;
        jQuery('#menu-btn').show();
      },
    });
    enquire.register('screen and (max-width: 993px)', {
      match() {
        $('header').addClass('header-mobile');
        const body = jQuery('body');
        if (body.hasClass('side-content')) {
          body.removeClass('side-layout');
        }
      },
      unmatch() {
        $('header').removeClass('header-mobile');
        jQuery('header').css('height', $tmp_h);
        const body = jQuery('body');
        if (body.hasClass('side-content')) {
          body.addClass('side-layout');
        }
      },
    });
    init();
    init_de();
    video_autosize();

    const header = $('header');
    header.removeClass('smaller');
    header.removeClass('logo-smaller');
    header.removeClass('clone');

    const mx = window.matchMedia('(max-width: 992px)');
    const osw = jQuery('.owl-slide-wrapper');
    if (mx.matches) {
      osw.find('img').css('height', $(window).innerHeight());
      osw.find('img').css('width', 'auto');
      if ($op_header_autoshow == 1) {
        header.removeClass('autoshow');
      }
    } else {
      osw.find('img').css('width', '100%');
      osw.find('img').css('height', 'auto');
      if ($op_header_autoshow == 1) {
        header.addClass('autoshow');
      }
    }
  }
  /* --------------------------------------------------
     * plugin | owl carousel
     * --------------------------------------------------*/
  function load_owl() {
    jQuery('#items-carousel').owlCarousel({
      center: false,
      items: 4,
      rewind: true,
      margin: 25,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      dots: false,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#items-carousel-s2').owlCarousel({
      center: false,
      items: 4,
      rewind: true,
      margin: 20,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      dots: false,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#collection-carousel').owlCarousel({
      center: false,
      items: 4,
      loop: true,
      margin: 25,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      dots: false,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#items-carousel-big').owlCarousel({
      center: false,
      animateOut: 'fadeOut',
      animateIn: 'flipInY',
      items: 1,
      loop: true,
      margin: 0,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      dots: false,
    });

    jQuery('#items-carousel-5-cols').owlCarousel({
      center: false,
      items: 5,
      rewind: true,
      margin: 25,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      dots: false,
      responsive: {
        1000: {
          items: 5,
        },
        800: {
          items: 3,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#collection-carousel-5-cols').owlCarousel({
      center: false,
      items: 5,
      loop: true,
      margin: 25,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      dots: false,
      responsive: {
        1000: {
          items: 5,
        },
        800: {
          items: 3,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#collection-carousel-alt').owlCarousel({
      center: false,
      items: 5,
      loop: true,
      margin: 25,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      dots: false,
      responsive: {
        1000: {
          items: 5,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#item-carousel-big').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: false,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#item-carousel-big-type-3').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: false,
      responsive: {
        1000: {
          items: 2,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#item-carousel-big-type-2').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 25,
      nav: false,
      dots: false,
      responsive: {
        1000: {
          items: 1,
        },
        600: {
          items: 1,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#item-carousel-big-type-4').owlCarousel({
      center: true,
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 2,
        },
        0: {
          items: 2,
        },
      },
    });

    const owl = $('#item-carousel-big,#item-carousel-big-type-4');
    owl.owlCarousel();
    $('.d-carousel .d-arrow-right').click(() => {
      owl.trigger('next.owl.carousel');
    });
    $('.d-carousel .d-arrow-left').click(() => {
      owl.trigger('prev.owl.carousel');
    });

    const owl_2 = $('#item-carousel-big-type-2');
    owl_2.owlCarousel();
    $('.d-carousel .d-arrow-right').click(() => {
      owl_2.trigger('next.owl.carousel');
    });
    $('.d-carousel .d-arrow-left').click(() => {
      owl_2.trigger('prev.owl.carousel');
    });

    const owl_3 = $('#item-carousel-big-type-3');
    owl_3.owlCarousel();
    $('.d-carousel .d-arrow-right').click(() => {
      owl_3.trigger('next.owl.carousel');
    });
    $('.d-carousel .d-arrow-left').click(() => {
      owl_3.trigger('prev.owl.carousel');
    });

    jQuery('#event-carousel').owlCarousel({
      center: false,
      items: 3,
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 3,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#crypto-carousel').owlCarousel({
      center: false,
      items: 4,
      loop: true,
      margin: 25,
      nav: false,
      dots: false,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 3,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#ss-carousel').owlCarousel({
      center: true,
      items: 4,
      loop: true,
      margin: 60,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 3,
        },
        0: {
          items: 2,
        },
      },
    });

    jQuery('.rtl #testimonial-carousel').owlCarousel({
      center: false,
      loop: true,
      margin: 25,
      rtl: true,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 1,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#testimonial-carousel').owlCarousel({
      center: false,
      loop: true,
      margin: 25,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 1,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#blog-carousel').owlCarousel({
      center: false,
      items: 3,
      loop: true,
      margin: 25,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#blog-carousel-3').owlCarousel({
      center: true,
      items: 5,
      loop: true,
      margin: 20,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#owl-logo').owlCarousel({
      center: false,
      items: 6,
      loop: true,
      dots: false,
      margin: 25,
      autoplay: true,
      autoplayTimeout: 2000,
      responsive: {
        1000: {
          items: 6,
        },
        600: {
          items: 4,
        },
        0: {
          items: 2,
        },
      },
    });

    jQuery('.project-carousel-4-nav').owlCarousel({
      center: true,
      items: 4,
      loop: true,
      margin: 15,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 3,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery('#owl-features').owlCarousel({
      center: true,
      items: 4,
      loop: true,
      dots: true,
      margin: 25,
      autoplay: false,
      autoplayTimeout: 0,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    // Custom Navigation owlCarousel
    $('.next').on('click', function () {
      $(this).parent().parent().find('.blog-slide')
        .trigger('owl.next');
    });
    $('.prev').on('click', function () {
      $(this).parent().parent().find('.blog-slide')
        .trigger('owl.prev');
    });

    jQuery('.owl-custom-nav').each(function () {
      const owl = $('.owl-custom-nav').next();
      const ow = parseInt(owl.css('height'), 10);
      $(this).css('margin-top', (ow / 2) - 25);
      owl.owlCarousel();
      // Custom Navigation Events
      $('.btn-next').on('click', () => {
        owl.trigger('owl.next');
      });
      $('.btn-prev').on('click', () => {
        owl.trigger('owl.prev');
      });
    });

    // custom navigation for slider
    const ows = $('#custom-owl-slider');
    const arr = $('.owl-slider-nav');
    const doc_height = $(window).innerHeight();
    arr.css('top', (doc_height / 2) - 25);
    ows.owlCarousel();
    // Custom Navigation Events
    arr.find('.next').on('click', () => {
      ows.trigger('owl.next');
    });
    arr.find('.prev').on('click', () => {
      ows.trigger('owl.prev');
    });

    jQuery('.owl-slide-wrapper').on('mouseenter', () => {
      arr.find('.next').css('right', '40px');
      arr.find('.prev').css('left', '40px');
    }).on('mouseleave', () => {
      arr.find('.next').css('right', '-50px');
      arr.find('.prev').css('left', '-50px');
    });
  }
  /* --------------------------------------------------
     * plugin | isotope
     * --------------------------------------------------*/
  function filter_gallery() {
    const $container = jQuery('#gallery');
    $container.isotope({
      itemSelector: '.item',
      filter: '*',
    });
    const $nft_items = jQuery('.masonry');
    $nft_items.isotope({
      itemSelector: '.item',
      filter: '*',
    });
    jQuery('#filters a').on('click', function () {
      const $this = jQuery(this);
      if ($this.hasClass('selected')) {
        return false;
      }
      const $optionSet = $this.parents();
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');
      const selector = jQuery(this).attr('data-filter');
      $container.isotope({
        filter: selector,
      });
      return false;
    });
  }

  function masonry() {
    const $container = jQuery('.row-masonry');
    $container.isotope({
      itemSelector: '.item',
    });
    jQuery('#filters a').on('click', function () {
      const $this = jQuery(this);
      if ($this.hasClass('selected')) {
        return false;
      }
      const $optionSet = $this.parents();
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');
      const selector = jQuery(this).attr('data-filter');
      $container.isotope({
        filter: selector,
      });
      return false;
    });
  }
  /* --------------------------------------------------
     * plugin | fitvids
     * --------------------------------------------------*/
  /*!
     * FitVids 1.0
     *
     * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
     * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
     * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
     *
     * Date: Thu Sept 01 18:00:00 2011 -0500
     */
  !(function (a) {
    a.fn.fitVids = function (b) {
      const c = {
        customSelector: null,
      };
      const d = document.createElement('div');
      const e = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
      return d.className = 'fit-vids-style', d.innerHTML = '&shy;<style> .fluid-width-video-wrapper { width: 100%; position: relative; padding: 0; } .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>', e.parentNode.insertBefore(d, e), b && a.extend(c, b), this.each(function () {
        const b = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.kickstarter.com']", 'object', 'embed'];
        c.customSelector && b.push(c.customSelector);
        const d = a(this).find(b.join(','));
        d.each(function () {
          const b = a(this);
          if (!(this.tagName.toLowerCase() == 'embed' && b.parent('object').length || b.parent('.fluid-width-video-wrapper').length)) {
            const c = this.tagName.toLowerCase() == 'object' || b.attr('height') ? b.attr('height') : b.height();
            const d = b.attr('width') ? b.attr('width') : b.width();
            const e = c / d;
            if (!b.attr('id')) {
              const f = `fitvid${Math.floor(999999 * Math.random())}`;
              b.attr('id', f);
            }
            b.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', `${100 * e}%`), b.removeAttr('height').removeAttr('width');
          }
        });
      });
    };
  }(jQuery));
  /* --------------------------------------------------
     * back to top
     * --------------------------------------------------*/
  const scrollTrigger = 500; // px
  let t = 0;

  function backToTop() {
    const scrollTop = $(window).scrollTop();
    if (scrollTop > scrollTrigger) {
      $('#back-to-top').addClass('show');
      $('#back-to-top').removeClass('hide');
      t = 1;
    }

    if (scrollTop < scrollTrigger && t == 1) {
      $('#back-to-top').addClass('hide');
    }

    $('#back-to-top').on('click', (e) => {
      e.preventDefault();
      $('html,body').stop(true).animate({
        scrollTop: 0,
      }, 700);
    });
  }
  /* --------------------------------------------------
     * plugin | scroll to
     * --------------------------------------------------*/
  /*!
     * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
     * Scroll smooth to any element in your DOM.
     *
     * Copyright (c) 2012 Yannick Albert (http://yckart.com)
     * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
     * 2013/02/17
     * */
  $.scrollTo = $.fn.scrollTo = function (x, y, options) {
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
      gap: {
        x: 0,
        y: 0,
      },
      animation: {
        easing: 'easeInOutExpo',
        duration: 600,
        complete: $.noop,
        step: $.noop,
      },
    }, options);

    return this.each(function () {
      if (!jQuery('body').hasClass('side-layout')) {
        if ($(window).innerWidth() < 992) {
          var h = 20;
        } else {
          var h = 110;
        }
      } else {
        var h = 0;
      }

      const elem = $(this);
      elem.stop().animate({
        scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
        scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - h, // *edited
      }, options.animation);
    });
  };
  /* --------------------------------------------------
     * counting number
     * --------------------------------------------------*/
  function de_counter() {
    jQuery('.timer').each(function () {
      const imagePos = jQuery(this).offset().top;
      const topOfWindow = jQuery(window).scrollTop();
      if (imagePos < topOfWindow + jQuery(window).height() && v_count == '0') {
        jQuery(($) => {
          // start all the timers
          jQuery('.timer').each(count);

          function count(options) {
            v_count = '1';
            const $this = jQuery(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
          }
        });
      }
    });
  }
  /* --------------------------------------------------
     * progress bar
     * --------------------------------------------------*/

  function text_rotate() {
    const quotes = $('.text-rotate-wrap .text-item');
    let quoteIndex = -1;

    function showNextQuote() {
      ++quoteIndex;
      quotes.eq(quoteIndex % quotes.length)
        .fadeIn(1)
        .delay(1500)
        .fadeOut(1, showNextQuote);
    }

    showNextQuote();
  }
  /* --------------------------------------------------
     * custom background
     * --------------------------------------------------*/
  function custom_bg() {
    $('body,div,section,span').css('background-color', function () {
      return jQuery(this).data('bgcolor');
    });
    $('body,div,section').css('background', function () {
      return jQuery(this).data('bgimage');
    });
    $('body.dark-scheme,.dark-scheme div,.dark-scheme section').css('background', function () {
      return jQuery(this).data('bgimage-alt');
    });
    $('.rtl div,.rtl section').css('background', function () {
      return jQuery(this).data('bgimage_rtl');
    });
    $('body,div,section').css('background-size', () => 'cover');
  }
  /* --------------------------------------------------
     * custom elements
     * --------------------------------------------------*/
  function custom_elements() {
    // --------------------------------------------------
    // tabs
    // --------------------------------------------------
    jQuery('.de_tab').find('.de_tab_content > div').hide();
    jQuery('.de_tab').find('.de_tab_content > div:first').show();
    jQuery('li').find('.v-border').fadeTo(150, 0);
    jQuery('li.active').find('.v-border').fadeTo(150, 1);
    jQuery('.de_nav li').on('click', function () {
      jQuery(this).parent().find('li').removeClass('active');
      jQuery(this).addClass('active');
      jQuery(this).parent().parent().find('.v-border')
        .fadeTo(150, 0);
      jQuery(this).parent().parent().find('.de_tab_content > div')
        .hide();
      const indexer = jQuery(this).index(); // gets the current index of (this) which is #nav li
      jQuery(this).parent().parent().find(`.de_tab_content > div:eq(${indexer})`)
        .fadeIn(); // uses whatever index the link has to open the corresponding box
      jQuery(this).find('.v-border').fadeTo(150, 1);
    });
    // request quote function
    const rq_step = 1;
    jQuery('#request_form .btn-right').on('click', () => {
      const rq_name = $('#rq_name').val();
      const rq_email = $('#rq_email').val();
      const rq_phone = $('#rq_phone').val();
      if (rq_step == 1) {
        if (rq_name.length == 0) {
          $('#rq_name').addClass('error_input');
        } else {
          $('#rq_name').removeClass('error_input');
        }
        if (rq_email.length == 0) {
          $('#rq_email').addClass('error_input');
        } else {
          $('#rq_email').removeClass('error_input');
        }
        if (rq_phone.length == 0) {
          $('#rq_phone').addClass('error_input');
        } else {
          $('#rq_phone').removeClass('error_input');
        }
      }
      if (rq_name.length != 0 && rq_email.length != 0 && rq_phone.length != 0) {
        jQuery('#rq_step_1').hide();
        jQuery('#rq_step_2').fadeIn();
      }
    });
    // --------------------------------------------------
    // tabs
    // --------------------------------------------------
    jQuery('.de_review').find('.de_tab_content > div').hide();
    jQuery('.de_review').find('.de_tab_content > div:first').show();
    // jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
    jQuery('.de_review').find('.de_nav li:first').fadeTo(150, 1);
    jQuery('.de_nav li').on('click', function () {
      de_size();
      jQuery(this).parent().find('li').removeClass('active');
      // jQuery(this).parent().find('li').fadeTo(150,.5);
      jQuery(this).addClass('active');
      jQuery(this).fadeTo(150, 1);
      jQuery(this).parent().parent().find('.de_tab_content > div')
        .hide();
      const indexer = jQuery(this).index(); // gets the current index of (this) which is #nav li
      jQuery(this).parent().parent().find(`.de_tab_content > div:eq(${indexer})`)
        .show(); // uses whatever index the link has to open the corresponding box
    });
    // --------------------------------------------------
    // toggle
    // --------------------------------------------------
    jQuery('.toggle-list h2').addClass('acc_active');
    jQuery('.toggle-list h2').toggle(function () {
      jQuery(this).addClass('acc_noactive');
      jQuery(this).next('.ac-content').slideToggle(200);
    }, function () {
      jQuery(this).removeClass('acc_noactive').addClass('acc_active');
      jQuery(this).next('.ac-content').slideToggle(200);
    });
    // --------------------------------------------------
    // toggle
    // --------------------------------------------------
    jQuery('.expand-custom .toggle').click(function () {
      jQuery(this).stop().toggleClass('clicked');
      jQuery(this).stop().parent().parent()
        .parent()
        .find('.details')
        .slideToggle(500);
    });
  }
  /* --------------------------------------------------
     * video autosize
     * --------------------------------------------------*/
  function video_autosize() {
    jQuery('.de-video-container').each(function () {
      const height_1 = jQuery(this).css('height');
      const height_2 = jQuery(this).find('.de-video-content').css('height');
      const newheight = (height_1.substring(0, height_1.length - 2) - height_2.substring(0, height_2.length - 2)) / 2;
      jQuery(this).find('.de-video-overlay').css('height', height_1);
      jQuery(this).find('.de-video-content').animate({
        'margin-top': newheight,
      }, 'fast');
    });
  }
  /* --------------------------------------------------
     * center x and y
     * --------------------------------------------------*/
  function center_xy() {
    jQuery('.center-xy').each(function () {
      jQuery(this).parent().find('img').on('load', function () {
        const w = parseInt(jQuery(this).parent().find('.center-xy').css('width'), 10);
        const h = parseInt(jQuery(this).parent().find('.center-xy').css('height'), 10);
        const pic_w = jQuery(this).css('width');
        const pic_h = jQuery(this).css('height');
        const tp = jQuery(this).parent();
        tp.find('.center-xy').css('left', parseInt(pic_w, 10) / 2 - w / 2);
        tp.find('.center-xy').css('top', parseInt(pic_h, 10) / 2 - h / 2);
        tp.find('.bg-overlay').css('width', pic_w);
        tp.find('.bg-overlay').css('height', pic_h);
      })
        .each(function () {
          if (this.complete) $(this).load();
        });
    });
  }
  /* --------------------------------------------------
     * add arrow for mobile menu
     * --------------------------------------------------*/
  function menu_arrow() {
    // mainmenu create span
    jQuery('#mainmenu li a').each(function () {
      if ($(this).next('ul').length > 0) {
        $('<span></span>').insertAfter($(this));
      }
    });
    // mainmenu arrow click
    jQuery('#mainmenu > li > span').on('click', function () {
      let iteration = $(this).data('iteration') || 1;
      switch (iteration) {
        case 1:
          $(this).addClass('active');
          $(this).parent().find('ul:first').css('height', 'auto');
          var curHeight = $(this).parent().find('ul:first').height();
          $(this).parent().find('ul:first').css('height', '0');
          $(this).parent().find('ul:first').animate({
            height: curHeight,
          }, 300, 'easeOutQuint');
          $('header').css('height', $('#mainmenu')[0].scrollHeight + curHeight + (parseInt($tmp_h) * 2));
          break;
        case 2:
          var curHeight = $(this).parent().find('ul:first').height();
          $(this).removeClass('active');
          $(this).parent().find('ul:first').animate({
            height: '0',
          }, 300, 'easeOutQuint');
          $('header').css('height', $('#mainmenu')[0].scrollHeight - curHeight + (parseInt($tmp_h) * 2));
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });
    jQuery('#mainmenu > li > ul > li > span').on('click', function () {
      let iteration = $(this).data('iteration') || 1;
      switch (iteration) {
        case 1:
          $(this).addClass('active');
          $(this).parent().find('ul:first').css('height', 'auto');
          $(this).parent().parent().parent()
            .find('ul:first')
            .css('height', 'auto');
          var curHeight = $(this).parent().find('ul:first').height();
          $(this).parent().find('ul:first').css('height', '0');
          $(this).parent().find('ul:first').animate({
            height: curHeight,
          }, 400, 'easeInOutQuint');
          break;
        case 2:
          $(this).removeClass('active');
          $(this).parent().find('ul:first').animate({
            height: '0',
          }, 400, 'easeInOutQuint');
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });

    jQuery('.nft__item_click').on('click', function () {
      let iteration = $(this).data('iteration') || 1;

      switch (iteration) {
        case 1:
          var cover = jQuery(this).parent().parent().find('.nft__item_extra');
          cover.css('visibility', 'visible');
          cover.css('opacity', '1');
          break;
        case 2:
          var cover = jQuery(this).parent().parent().find('.nft__item_extra');
          cover.css('visibility', 'hidden');
          cover.css('opacity', '0');
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });

    $('.nft__item').mouseleave(function () {
      const cover = jQuery(this).find('.nft__item_extra');
      cover.css('visibility', 'hidden');
      cover.css('opacity', '0');
      jQuery(this).find('.nft__item_click').data('iteration', 1);
    });

    jQuery('.nft__item_like').on('click', function () {
      let iteration = $(this).data('iteration') || 1;

      switch (iteration) {
        case 1:
          $(this).find('i').addClass('active');
          var val = parseInt($(this).find('span').text()) + 1;
          $(this).find('span').text(val);
          break;
        case 2:
          $(this).find('i').removeClass('active');
          var val = parseInt($(this).find('span').text()) - 1;
          $(this).find('span').text(val);
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });

    jQuery('.play-pause').on('click', function () {
      let iteration = $(this).data('iteration') || 1;
      const track = $(this).parent().parent().find('.track');
      const circle = $(this).parent().parent().parent()
        .find('.circle-ripple');

      switch (iteration) {
        case 1:
          track[0].play();
          $(this).addClass('pause');
          $(this).removeClass('play');
          circle.fadeIn();
          break;
        case 2:
          track[0].pause();
          $(this).addClass('play');
          $(this).removeClass('pause');
          circle.fadeOut();
          break;
      }

      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });

    jQuery('#de-click-menu-profile').on('click', function () {
      let iteration = $(this).data('iteration') || 1;

      switch (iteration) {
        case 1:
          $('#de-submenu-profile').show();
          $('#de-submenu-profile').addClass('open');
          $('#de-submenu-notification').removeClass('open');
          $('#de-submenu-notification').hide();
          $('#de-click-menu-notification').data('iteration', 1);
          break;
        case 2:
          $('#de-submenu-profile').removeClass('open');
          $('#de-submenu-profile').hide();
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });

    jQuery('#de-click-menu-notification').on('click', function () {
      let iteration = $(this).data('iteration') || 1;

      switch (iteration) {
        case 1:
          $('#de-submenu-notification').show();
          $('#de-submenu-notification').addClass('open');
          $('#de-submenu-profile').removeClass('open');
          $('#de-submenu-profile').hide();
          $('#de-click-menu-profile').data('iteration', 1);
          break;
        case 2:
          $('#de-submenu-notification').removeClass('open');
          $('#de-submenu-notification').hide();
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });
  }
  /* --------------------------------------------------
     * show gallery item sequence
     * --------------------------------------------------*/
  function sequence() {
    const sq = jQuery('.sequence > .gallery-item .picframe');
    const count = sq.length;
    sq.addClass('fadeIn');
    sq.find('img').addClass('slideInUp');
    for (let i = 0; i <= count; i++) {
      const sqx = jQuery(`.sequence > .gallery-item:eq(${i}) .picframe`);
      sqx.attr('data-wow-delay', `${i / 8}s`);
      sqx.find('img').attr('data-wow-delay', `${i / 16}s`);
    }
  }
  /* --------------------------------------------------
     * show gallery item sequence
     * --------------------------------------------------*/
  function sequence_a() {
    const sq = jQuery('.sequence').find('.sq-item');
    const count = sq.length;
    sq.addClass('fadeInUp');
    for (let i = 0; i <= count; i++) {
      const sqx = jQuery('.sequence').find(`.sq-item:eq(${i})`);
      sqx.attr('data-wow-delay', `${i / 8}s`);
      sqx.attr('data-wow-speed', '1s');
    }
  }
  /* --------------------------------------------------
     * custom scroll
     * --------------------------------------------------*/
  $.fn.moveIt = function () {
    $(this).each(function () {
      instances.push(new moveItItem($(this)));
    });
  };

  function moveItItemNow() {
    const scrollTop = $window.scrollTop();
    instances.forEach((inst) => {
      inst.update(scrollTop);
    });
  }

  function moveItItem(el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
  }
  moveItItem.prototype.update = function (scrollTop) {
    const pos = scrollTop / this.speed;
    this.el.css('transform', `translateY(${pos}px)`);
  };
  $(() => {
    $('[data-scroll-speed]').moveIt();
  });
  /* --------------------------------------------------
     * multiple function
     * --------------------------------------------------*/
  function init() {
    const sh = jQuery('#de-sidebar').css('height');
    const dh = jQuery(window).innerHeight();
    const h = parseInt(sh) - parseInt(dh);

    function scrolling() {
      const mq = window.matchMedia('(min-width: 993px)');
      const ms = window.matchMedia('(min-width: 768px)');
      if (mq.matches) {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop;
        const shrinkOn = 0;
        const header = jQuery('header');
        if (distanceY > shrinkOn) {
          header.addClass('smaller');
        } else if (header.hasClass('smaller')) {
          header.removeClass('smaller');
        }
      }
      if (mq.matches) {
        if (jQuery('header').hasClass('side-header')) {
          if (jQuery(document).scrollTop() >= h) {
            jQuery('#de-sidebar').css('position', 'fixed');
            if (parseInt(sh) > parseInt(dh)) {
              jQuery('#de-sidebar').css('top', -h);
            }
            jQuery('#main').addClass('col-md-offset-3');
            jQuery('h1#logo img').css('padding-left', '7px');
            jQuery('header .h-content').css('padding-left', '7px');
            jQuery('#mainmenu li').css('width', '103%');
          } else {
            jQuery('#de-sidebar').css('position', 'relative');
            if (parseInt(sh) > parseInt(dh)) {
              jQuery('#de-sidebar').css('top', 0);
            }
            jQuery('#main').removeClass('col-md-offset-3');
            jQuery('h1#logo img').css('padding-left', '0px');
            jQuery('header .h-content').css('padding-left', '0px');
            jQuery('#mainmenu li').css('width', '100%');
          }
        }
      }
    }

    scrolling();

    jQuery('.activity-filter > li').on('click', function () {
      let iteration = $(this).data('iteration') || 1;
      switch (iteration) {
        case 1:
          jQuery('.activity-list > li').hide();
          if (jQuery(this).hasClass('filter_by_followings')) {
            jQuery('li.act_follow').show();
          } else if (jQuery(this).hasClass('filter_by_sales')) {
            jQuery('li.act_sale').show();
          } else if (jQuery(this).hasClass('filter_by_offers')) {
            jQuery('li.act_offer').show();
          } else if (jQuery(this).hasClass('filter_by_likes')) {
            jQuery('li.act_like').show();
          }
          jQuery('.activity-filter > li').removeClass('active');
          jQuery(this).addClass('active');
          break;
        case 2:

          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });

    jQuery('.filter__r').on('click', () => {
      jQuery('.activity-filter > li').removeClass('active');
      jQuery('.activity-list > li').show();
    });

    jQuery('.btn-close').on('click', function () {
      let iteration = $(this).data('iteration') || 1;
      switch (iteration) {
        case 1:
          jQuery('#popup-box').addClass('popup-hide');
          jQuery('#popup-box').removeClass('popup-show');
          break;
        case 2:

          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });

    $('#sw-1').click(function () {
      if ($(this).is(':checked')) {
        $('.opt-1').css('display', 'none');
        $('.opt-2').css('display', 'inline-block');
      } else {
        $('.opt-2').css('display', 'none');
        $('.opt-1').css('display', 'inline-block');
      }
    });
  }
  // init_de begin //
  function init_de() {
    jQuery('.de-team-list').each(function () {
      jQuery(this).find('img').on('load', function () {
        const w = jQuery(this).css('width');
        const h = jQuery(this).css('height');
        const tpp = jQuery(this).parent().parent();
        tpp.find('.team-pic').css('height', h);
        tpp.find('.team-desc').css('width', w);
        tpp.find('.team-desc').css('height', h);
        tpp.find('.team-desc').css('top', h);
      }).each(function () {
        if (this.complete) $(this).load();
      });
    });
    jQuery('.de-team-list').on('mouseenter', function () {
      let h;
      h = jQuery(this).find('img').css('height');
      jQuery(this).find('.team-desc').stop(true).animate({
        top: '0px',
      }, 350, 'easeOutQuad');
      jQuery(this).find('img').stop(true).animate({
        'margin-top': '-100px',
      }, 400, 'easeOutQuad');
    }).on('mouseleave', function () {
      let h;
      h = jQuery(this).find('img').css('height');
      jQuery(this).find('.team-desc').stop(true).animate({
        top: h,
      }, 350, 'easeOutQuad');
      jQuery(this).find('img').stop(true).animate({
        'margin-top': '0px',
      }, 400, 'easeOutQuad');
    });
    // portfolio
    jQuery('.item .picframe').each(function () {
      const img = jQuery(this).find('img');
      img.css('width', '100%');
      img.css('height', 'auto');
      img.on('load', function () {
        const w = jQuery(this).css('width');
        const h = jQuery(this).css('height');
        // nh = (h.substring(0, h.length - 2)/2)-48;
        jQuery(this).parent().css('height', h);
      }).each(function () {
        if (this.complete) $(this).load();
      });
    });
    // --------------------------------------------------
    // portfolio hover
    // --------------------------------------------------
    jQuery('.overlay').fadeTo(1, 0);
    // gallery hover
    jQuery('.item .picframe').on('mouseenter', function () {
      const ov = jQuery(this).parent().find('.overlay');
      ov.width(jQuery(this).find('img').css('width'));
      ov.height(jQuery(this).find('img').css('height'));
      ov.stop(true).fadeTo(200, 1);
      const picheight = jQuery(this).find('img').css('height');
      let newheight;
      newheight = (picheight.substring(0, picheight.length - 2) / 2) - 10;
      // alert(newheight);
      // jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight},200,'easeOutCubic');
      jQuery(this).parent().find('.pf_text').css('margin-top', newheight);
      jQuery(this).parent().find('.pf_text').stop(true)
        .animate({
          opacity: '1',
        }, 1000, 'easeOutCubic');
      var w = jQuery(this).find('img').css('width');
      var h = jQuery(this).find('img').css('height');
      var w = parseInt(w, 10);
      var h = parseInt(h, 10);
      const $scale = 1;
      // alert(w);
      jQuery(this).find('img').stop(true).animate({
        width: w * $scale,
        height: h * $scale,
        'margin-left': -w * ($scale - 1) / 2,
        'margin-top': -h * ($scale - 1) / 2,
      }, 400, 'easeOutCubic');
    }).on('mouseleave', function () {
      let newheight;
      const picheight = jQuery(this).find('img').css('height');
      newheight = (picheight.substring(0, picheight.length - 2) / 2) - 10;
      // jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight - 30},200,'easeOutCubic');
      jQuery(this).parent().find('.pf_text').stop(true)
        .animate({
          opacity: '0',
        }, 400, 'easeOutCubic');
      jQuery(this).parent().find('.overlay').stop(true)
        .fadeTo(200, 0);
      jQuery(this).find('img').stop(true).animate({
        width: '100%',
        height: '100%',
        'margin-left': 0,
        'margin-top': 0,
      }, 400, 'easeOutQuad');
    });
    jQuery('.overlay').fadeTo(1, 0);

    const preloader_pos = parseInt(jQuery(window).innerHeight() / 2) - 30;
    $('.preloader1').css('top', preloader_pos);

    jQuery('.grid.border').css('padding-top', grid_size);
    jQuery('.grid.border').css('padding-left', grid_size);

    jQuery('#selector .opt.tc1').addClass('active');

    jQuery('#selector .opt').on('click', function () {
      jQuery('#selector .opt').removeClass('active');
      const color = jQuery(this).data('color');
      jQuery('#colors').attr('href', `css/colors/${color}.css`);
      jQuery(this).addClass('active');
    });

    // rtl begin //
    if (rtl_mode == 'on') {
      jQuery('body').addClass('rtl');
      jQuery('#bootstrap').attr('href', 'css/bootstrap.rtl.min.css');
      jQuery('#bootstrap-grid').attr('href', 'css/bootstrap-grid.rtl.min.css');
      jQuery('#bootstrap-reboot').attr('href', 'css/bootstrap-reboot.rtl.min.css');
      jQuery('#mdb').attr('href', 'css/mdb.rtl.min.css');
      jQuery('html').attr('dir', 'rtl');
    }
    // rtl end //
  }
  // de_init end //

  function f_rtl() {
    jQuery('#selector #demo-rtl').on('click', function () {
      let iteration = $(this).data('iteration') || 1;
      switch (iteration) {
        case 1:
          jQuery('body').addClass('rtl');
          jQuery('#bootstrap').attr('href', 'css/bootstrap.rtl.min.css');
          jQuery('#bootstrap-grid').attr('href', 'css/bootstrap-grid.rtl.min.css');
          jQuery('#bootstrap-reboot').attr('href', 'css/bootstrap-reboot.rtl.min.css');
          jQuery('#mdb').attr('href', 'css/mdb.rtl.min.css');
          jQuery('html').attr('dir', 'rtl');
          jQuery(this).find('.sc-val').text('Click to Disable');
          $('.rtl div,.rtl section').css('background', function () {
            return jQuery(this).data('bgimage_rtl');
          });
          $('body,div,section').css('background-size', () => 'cover');
          break;
        case 2:
          jQuery('body').removeClass('rtl');
          jQuery('#bootstrap').attr('href', 'css/bootstrap.min.css');
          jQuery('#bootstrap-grid').attr('href', 'css/bootstrap-grid.min.css');
          jQuery('#bootstrap-reboot').attr('href', 'css/bootstrap-reboot.min.css');
          jQuery('#mdb').attr('href', 'css/mdb.min.css');
          jQuery('html').attr('dir', 'ltr');
          jQuery(this).find('.sc-val').text('Click to Enable');
          $('body,div,section').css('background', function () {
            return jQuery(this).data('bgimage');
          });
          $('body,div,section').css('background-size', () => 'cover');
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });
  }

  jQuery('#dark-mode').on('click', () => {
    if (jQuery('body').hasClass('dark-scheme')) {
      window.location.href = 'https://gigaland.io/index.html';
    } else {
      window.location.href = 'https://gigaland.io/02_dark-index.html';
    }
  });

  function grid_gallery() {
    jQuery('.grid-item').each(function () {
      const this_col = Number(jQuery(this).parent().attr('data-col'));
      const this_gridspace = Number(jQuery(this).parent().attr('data-gridspace'));
      const this_ratio = eval($(this).parent().attr('data-ratio'));
      jQuery(this).parent().css('padding-left', this_gridspace);
      const w = (($(document).width() - (this_gridspace * this_col + 1)) / this_col) - (this_gridspace / this_col);
      const gi = $(this);
      const h = w * this_ratio;
      gi.css('width', w);
      gi.css('height', h);
      gi.find('.pf_title').css('margin-top', (h / 2) - 10);
      gi.css('margin-right', this_gridspace);
      gi.css('margin-bottom', this_gridspace);
      $(this).parent().css('padding-top', this_gridspace);
      if (gi.hasClass('large')) {
        $(this).css('width', (w * 2) + this_gridspace);
        $(this).css('height', (h * 2) + this_gridspace);
      }
      if (gi.hasClass('large-width')) {
        $(this).css('width', (w * 2) + this_gridspace);
        $(this).css('height', h);
      }
      if (gi.hasClass('large-height')) {
        $(this).css('height', (h * 2) + this_gridspace);
        gi.find('.pf_title').css('margin-top', (h) - 20);
      }
    });
  }

  /* --------------------------------------------------
     * center-y
     * --------------------------------------------------*/
  function centerY() {
    jQuery('.full-height').each(function () {
      const dh = jQuery(window).innerHeight();
      jQuery(this).css('min-height', dh);
    });
  }

  /* --------------------------------------------------
     * progress bar
     * --------------------------------------------------*/
  function de_progress() {
    jQuery('.de-progress').each(function () {
      const pos_y = jQuery(this).offset().top;
      const value = jQuery(this).find('.progress-bar').attr('data-value');
      const topOfWindow = jQuery(window).scrollTop();
      if (pos_y < topOfWindow + 550) {
        jQuery(this).find('.progress-bar').css({
          width: value,
        }, 'slow');
      }

      jQuery(this).find('.value').text(jQuery(this).find('.progress-bar').attr('data-value'));
    });
  }

  function de_size() {
    let w;
    jQuery('.nft__item_wrap').each(function () {
      w = jQuery(this).css('width');
      jQuery(this).css('height', w);
    });

    $('img.nft__item_preview').one('load', function () {
      $(this).parent().find('.d-placeholder').hide();
      $(this).show();
      const width = $(this).width(); // jQuery width method
      const height = $(this).height(); // jQuery height method

      if (width < height) {
        $(this).addClass('portrait');
        $(this).parent().addClass('portrait');
      }
    });

    $('img.nft__item_preview').on('load', () => {
    }).each(function () {
      if (this.complete) {
        $(this).parent().find('.d-placeholder').hide();
        $(this).show();
        const width = $(this).width(); // jQuery width method
        const height = $(this).height(); // jQuery height method

        if (width < height) {
          $(this).addClass('portrait');
          $(this).parent().addClass('portrait');
        }
      }
    });
  }

  function de_countdown() {
    $('.de_countdown').each(function () {
      const y = $(this).data('year');
      const m = $(this).data('month');
      const d = $(this).data('day');
      const h = $(this).data('hour');
      $(this).countdown({ until: new Date(y, m - 1, d, h) });
    });
  }

  // --------------------------------------------------
  // preloader
  // --------------------------------------------------

  function copyText(element) {
    const $copyText = jQuery(element).text();
    const button = jQuery('#btn_copy');
    navigator.clipboard.writeText($copyText).then(() => {
      const originalText = button.text();
      button.html('Copied!');
      button.addClass('clicked');
      setTimeout(() => {
        button.html(originalText);
        button.removeClass('clicked');
      }, 750);
    }, () => {
      button.html('Error');
    });
  }

  // --------------------------------------------------
  // custom dropdown
  // --------------------------------------------------
  function dropdown(e) {
    const obj = $(`${e}.dropdown`);
    const btn = obj.find('.btn-selector');
    const dd = obj.find('ul');
    const opt = dd.find('li');

    obj.on('mouseenter', function () {
      dd.show();
      $(this).css('z-index', 1000);
    }).on('mouseleave', function () {
      dd.hide();
      $(this).css('z-index', 'auto');
    });

    opt.on('click', function () {
      dd.hide();
      const txt = $(this).text();
      opt.removeClass('active');
      $(this).addClass('active');
      btn.text(txt);
    });
  }

  // --------------------------------------------------
  // image preview
  // --------------------------------------------------
  function image_preview() {
    const pw = parseInt($('.image-autosize').parent().css('width'));
    $('.image-autosize').css('max-width', pw);
  }

  /* --------------------------------------------------

     * document ready
     * --------------------------------------------------*/
  function onLoadFun() {
    $('.de-preloader').delay(500).fadeOut(500);
    'use strict';
    f_rtl();
    load_magnificPopup();
    center_xy();
    init_de();
    grid_gallery();
    init_resize();
    de_progress();
    de_countdown();
    dropdown('#item_category');
    dropdown('#item_collection');
    dropdown('#buy_category');
    dropdown('#items_type');
    dropdown('#filter_by_duration');
    dropdown('#filter_by_category');
    dropdown('#select_lang');
    dropdown('#select_scheme');
    dropdown('#top_sellers_filter');
    dropdown('#top_collections_filter');
    image_preview();
    load_owl();
    $('.jarallax').jarallax();
    $(() => {
      $('.lazy').lazy();
    });

    // --------------------------------------------------
    // custom positiion
    // --------------------------------------------------
    const $doc_height = jQuery(window).innerHeight();
    jQuery('#homepage #content.content-overlay').css('margin-top', $doc_height);
    // jQuery('.full-height').css("height", $doc_height);
    // var picheight = jQuery('.center-y').css("height");
    // picheight = parseInt(picheight, 10);
    // jQuery('.center-y').css('margin-top', (($doc_height - picheight) / 2)-100);
    jQuery('.full-height .de-video-container').css('min-height', $doc_height);

    if (jQuery('header').hasClass('autoshow')) {
      $op_header_autoshow = 1;
    }

    jQuery('#btn_copy').on('click', () => {
      copyText('#wallet');
    });

    $('#mainmenu > li:has(ul)').addClass('menu-item-has-children');

    $('.d-item').slice(0, 8).show();
    $('#loadmore').on('click', (e) => {
      e.preventDefault();
      $('.d-item:hidden').slice(0, 4).slideDown();
      if ($('.d-item:hidden').length == 0) {
        // $("#loadmore").text("No Content").addClass("noContent");
        $('#loadmore').hide();
      }
      de_size();
    });

    $('.cols-5 .d-item').slice(0, 10).show();
    $('#loadmore').on('click', (e) => {
      e.preventDefault();
      $('.d-item:hidden').slice(0, 5).slideDown();
      if ($('.d-item:hidden').length == 0) {
        // $("#loadmore").text("No Content").addClass("noContent");
        $('#loadmore').hide();
      }
      de_size();
    });

    centerY();

    $('#mainmenu li:has(ul)').addClass('has-child');

    // bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

    // close bootstrap

    // --------------------------------------------------
    // blog list hover
    // --------------------------------------------------
    jQuery('.blog-list').on('mouseenter', function () {
      const v_height = jQuery(this).find('.blog-slide').css('height');
      const v_width = jQuery(this).find('.blog-slide').css('width');
      const newheight = (v_height.substring(0, v_height.length - 2) / 2) - 40;
      const owa = jQuery(this).find('.owl-arrow');
      owa.css('margin-top', newheight);
      owa.css('width', v_width);
      owa.fadeTo(150, 1);
      // alert(v_height);
    }).on('mouseleave', function () {
      jQuery(this).find('.owl-arrow').fadeTo(150, 0);
    });
    //  logo carousel hover
    jQuery('#logo-carousel img').on('mouseenter', function () {
      jQuery(this).fadeTo(150, 0.5);
    }).on('mouseleave', function () {
      jQuery(this).fadeTo(150, 1);
    });
    if ($('#back-to-top').length) {
      backToTop();
    }
    jQuery('.nav-exit').on('click', () => {
      $.magnificPopup.close();
    });
    // switch scheme
    jQuery('#switch_scheme').on('click', function () {
      if (c_mod != 1) {
        var iteration = $(this).data('iteration') || 1;
      } else {
        var iteration = $(this).data('iteration') || 2;
      }

      switch (iteration) {
        case 1:
          dark_scheme();
          break;
        case 2:
          light_scheme();
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data('iteration', iteration);
    });
    // carousel hover
    jQuery('.d-carousel').on('mouseenter', () => {
      jQuery('.d-arrow-left').fadeTo(50, 1);
      jQuery('.d-arrow-right').fadeTo(50, 1);
    }).on('mouseleave', () => {
      jQuery('.d-arrow-left').fadeTo(50, 0);
      jQuery('.d-arrow-right').fadeTo(50, 0);
    });
    // --------------------------------------------------
    // navigation for mobile
    // --------------------------------------------------
    jQuery('#menu-btn').on('click', () => {
      $('#de-submenu-profile').removeClass('open');
      $('#de-submenu-profile').hide();
      $('#de-click-menu-profile').data('iteration', 1);
      $('#de-submenu-notification').removeClass('open');
      $('#de-submenu-notification').hide();
      $('#de-click-menu-notification').data('iteration', 1);

      const h = jQuery('header')[0].scrollHeight;

      if (mobile_menu_show == 0) {
        jQuery('header.header-mobile').stop(true).animate({
          height: h,
        }, 200, 'easeOutCubic');
        mobile_menu_show = 1;
      } else {
        jQuery('header.header-mobile').stop(true).animate({
          height: $tmp_h,
        }, 200, 'easeOutCubic');
        mobile_menu_show = 0;
      }
    });
    jQuery('a.btn').on('click', function (evn) {
      if (this.href.indexOf('#') != -1) {
        evn.preventDefault();
        jQuery('html,body').scrollTo(this.hash, this.hash);
      }
    });
    jQuery('a.smooth-scroll').on('click', function (evn) {
      if (this.href.indexOf('#') != -1) {
        evn.preventDefault();
        jQuery('html,body').scrollTo(this.hash, this.hash);
      }
    });
    jQuery('.de-gallery .item .icon-info').on('click', function () {
      jQuery('.page-overlay').show();
      url = jQuery(this).attr('data-value');
      jQuery('#loader-area .project-load').load(url, () => {
        jQuery('#loader-area').slideDown(500, () => {
          jQuery('.page-overlay').hide();
          jQuery('html, body').animate({
            scrollTop: jQuery('#loader-area').offset().top - 70,
          }, 500, 'easeOutCubic');
          //
          jQuery('.image-slider').owlCarousel({
            items: 1,
            singleItem: true,
            navigation: false,
            pagination: true,
            autoPlay: false,
          });
          jQuery('.container').fitVids();
          jQuery('#btn-close-x').on('click', () => {
            jQuery('#loader-area').slideUp(500, () => {
              jQuery('html, body').animate({
                scrollTop: jQuery('#section-portfolio').offset().top - 70,
              }, 500, 'easeOutCirc');
            });
            return false;
          });
        });
      });
    });
    jQuery('.de-gallery .item').on('click', () => {
      $('#navigation').show();
    });
    // btn arrow up
    jQuery('.arrow-up').on('click', () => {
      jQuery('.coming-soon .coming-soon-content').fadeOut('medium', () => {
        jQuery('#hide-content').fadeIn(600, () => {
          jQuery('.arrow-up').animate({
            bottom: '-40px',
          }, 'slow');
          jQuery('.arrow-down').animate({
            top: '0',
          }, 'slow');
        });
      });
    });
    // btn arrow down
    jQuery('.arrow-down').on('click', () => {
      jQuery('#hide-content').fadeOut('slow', () => {
        jQuery('.coming-soon .coming-soon-content').fadeIn(800, () => {
          jQuery('.arrow-up').animate({
            bottom: '0px',
          }, 'slow');
          jQuery('.arrow-down').animate({
            top: '-40',
          }, 'slow');
        });
      });
    });

    // --------------------------------------------------
    // looping background
    // --------------------------------------------------
    $(() => {
      let x = 0;
      setInterval(() => {
        x -= 1;
        $('.bg-loop').css('background-position', `${x}px 0`);
      }, 50);
    });

    /* --------------------------------------------------
         after window load
         * --------------------------------------------------*/

    setTimeout(() => {
      $('#cookieConsent').fadeIn(400);
    }, 2000);
    $('#closeCookieConsent, .cookieConsentOK').click(() => {
      $('#cookieConsent').fadeOut(400);
    });

    $('.switch-with-title .checkbox').change(function () {
      if (this.checked) {
        jQuery(this).parent().parent().find('.hide-content')
          .show();
      } else {
        jQuery(this).parent().parent().find('.hide-content')
          .hide();
      }
    });

    video_autosize();
    masonry();
    custom_bg();
    menu_arrow();
    filter_gallery();
    custom_elements();
    init();

    de_size();
    new WOW().init();

    // one page navigation
    /**
         * This part causes smooth scrolling using scrollto.js
         * We target all a tags inside the nav, and apply the scrollto.js to it.
         */
    $('#homepage nav a, .scroll-to').on('click', function (evn) {
      if (this.href.indexOf('#') != -1) {
        evn.preventDefault();
        jQuery('html,body').scrollTo(this.hash, this.hash);
      }
    });
    sequence();
    sequence_a();

    $('.accordion-section-title').click(function (e) {
      const currentAttrvalue = $(this).data('tab');
      if ($(e.target).is('.active')) {
        $(this).removeClass('active');
        $('.accordion-section-content:visible').slideUp(300);
      } else {
        $('.accordion-section-title').removeClass('active').filter(this).addClass('active');
        $('.accordion-section-content').slideUp(300).filter(currentAttrvalue).slideDown(300);
      }
    });

    $('#get_file,#get_file_2').click(() => {
      $('#upload_file').click();
    });

    $('#click_profile_img').click(() => {
      $('#upload_profile_img').click();
    });

    $('#click_banner_img').click(() => {
      $('#upload_banner_img').click();
    });

    $('#upload_file').change(function () {
      const file = $(this).val();
      const filename = file.replace(/^.*\\/, '');
      $('#file_name').text(filename);
    });

    jQuery.each(jQuery('textarea[data-autoresize]'), function () {
      const offset = this.offsetHeight - this.clientHeight;

      const resizeTextarea = function (el) {
        jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
      };
      jQuery(this).on('keyup input', function () { resizeTextarea(this); }).removeAttr('data-autoresize');
    });

    /* --------------------------------------------------
         * window | on resize
         * --------------------------------------------------*/
    $(window).resize(() => {
      init_resize();
      centerY();
      grid_gallery();
      de_size();
      image_preview();
      setTimeout(() => { filter_gallery(); }, 1000);
    });

    $(window).on('load', () => {
      filter_gallery();
      window.dispatchEvent(new Event('resize'));

      $('.grid').isotope({
        itemSelector: '.grid-item',
      });
      grid_gallery();
      image_preview();
    });

    /* --------------------------------------------------
         * window | on scroll
         * --------------------------------------------------*/
    jQuery(window).on('scroll', () => {
      /* functions */
      header_sticky();
      de_counter();
      de_progress();
      init();
      backToTop();
      moveItItemNow();

      /* fade base scroll position */
      const target = $('.fadeScroll');
      const targetHeight = target.outerHeight();
      const scrollPercent = (targetHeight - window.scrollY) / targetHeight;
      if (scrollPercent >= 0) {
        target.css('opacity', scrollPercent);
      } else {
        target.css('opacity', 0);
      }
      /* custom page with background on side
            jQuery('.side-bg').each(function() {
                jQuery(this).find(".image-container").css("height", jQuery(this).find(".image-container").parent().css("height"));
            }); */
      /* go to anchor */
      //  jQuery('#mainmenu li a').each(function() {
      //      var cur = jQuery(this);
      //      if (this.href.indexOf('#') != -1) {
      //          var href = jQuery(this).attr('href');
      // 		if (location.hash!=="") {
      // 			 if (jQuery(window).scrollTop() > jQuery(href).offset().top - 140) {
      // 				 clearTimeout($.data(this, "scrollCheck"));
      // 				 $.data(this, "scrollCheck", setTimeout(function() {
      // 					 jQuery('#mainmenu li a').removeClass('active');
      // 					 cur.addClass('active');
      // 				 }, 250));

      // 			 }
      // 		 }
      //      }
      //  });

      // acc
      $('.toggle').click(function (e) {
        e.preventDefault();

        const $this = $(this);

        if ($this.next().hasClass('show')) {
          $this.next().removeClass('show');
          $this.next().slideUp(350);
        } else {
          $this.parent().parent().find('li .inner').removeClass('show');
          $this.parent().parent().find('li .inner').slideUp(350);
          $this.next().toggleClass('show');
          $this.next().slideToggle(350);
        }
      });
    });
    $(() => {
      let x = 0;
      setInterval(() => {
        x -= 1;
        $('.bg-loop').css('background-position', `${x}px 0`);
      }, 50);
    });
  }
  window.onLoadFun = onLoadFun;
  jQuery(document).ready(onLoadFun);
}(jQuery));
