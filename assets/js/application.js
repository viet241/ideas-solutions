$(function(){
	"use strict";

	$.fn.extend({
		scrollTo : function(speed, easing, callback) {
			var anchor = $(this).length ? $(this).offset().top : 0;
			$('html,body').stop().animate({'scrollTop': anchor}, speed || 0, easing, callback);
		},
		videoRender: function (attrs){
			var def = {
				'loop': true,
				'autoplay': true,
				'controls': false,
				'preload': true
			};

			$(this).prepend(
				$('<video/>', $.extend(def, attrs))
					.append($('<source/>', {'src': $(this).data("video")})
				)
			);
		}
	});

	// variables
	var $win = $(window), 
		$scrollTop = 0,
		$scrollDuration = 600,
		bp = {
			'xsmall': 480,
			'small': 768,
			'medium': 970,
			'large': 1170
		};

	$(".svg-inject").svgInject();

	$(".box.show").removeClass("show");

	(!Modernizr.touch || Modernizr.mq("(min-width: "+bp.small+"px)")) && $("#intro").videoRender({
		'id': 'bg-video',
		'class': 'overlay'
	});
	
	Modernizr.touch && $(".tip").on('click', function(){
		$(this).toggleClass('show-tip');
		return !1;
	});
	
	$(document).on('click', "#menu-toggle", function(e) { // menu toggle
		e.preventDefault();
		$(this).toggleClass('active').next().addClass("ani-off").slideToggle(300);
		return !1;
	})

	.on('click', "a[href^='#']", function(e) { // anchor links click / smooth scroll
		e.preventDefault();
		var target = this.hash;
		$(target).scrollTo($scrollDuration, 'swing', function(){
			window.location.hash = target;
		});
	});

	$win.on('scroll', function(){ // window scroll event

		$scrollTop = $win.scrollTop();
		var $winHeight = $win.height();

		// navigation fixed
		$scrollTop + 1 >= $("#intro").height() ? $("#header").addClass("fixed") : $("#header").removeClass("fixed");

		// move background / show sidebox
		$("#main > section").each(function(){
			var $screen = $(this),
			$goOver = $scrollTop - $screen.offset().top,
			$box = $screen.find(".box");
			$screen.css('background-position', $goOver > 0 ? ('50% -' + $goOver / 5 + 'px') : '50% 50%');
			if($box.length)
				$scrollTop + $winHeight >= $box.offset().top ? $box.addClass("show") : $box.removeClass("show");
		});
	})

	.on('hashchange', function() { // window hashchange / smooth scroll
		var target = location.hash;
		$(target).scrollTo($scrollDuration, 'swing', function(){
			window.location.hash = target;
		});
	});
});