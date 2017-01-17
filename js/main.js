$(document).ready(function(){

	/**
	 * Home Services Tabs 
	 */
	$('.serviceOpener').on('click', function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		$('.serviceOpener').removeClass('active');
		$(this).addClass('active');

		var tl = new TimelineMax();
		tl.staggerTo($('.serviceDescr').children(), .5, {autoAlpha: 0, display: 'none', opacity: 0}, .2)
			.staggerFromTo($(target).children(), .5, {autoAlpha: 0, display: 'none', opacity: 0}, {autoAlpha: 1, display: 'block', opacity: 1}, .2);
		$(target).show()
	});


	/**
	 * Progress bar circle
	 */
	$('.pie_progress').asPieProgress({
        namespace: 'pie_progress',
        speed: 40,
        easing: 'ease',
        size: 100,
        trackcolor: '#151515',
        fillcolor: 'rgba(255,255,255,.1)',
        // barcolor: 'blue'

    });
    $(window).on('scroll', function() {
	    if ($('.homeProgresses').isOnScreen()) {
	    	setTimeout(function(){
	    		$('.pie_progress').asPieProgress('start');
				$(window).off('scroll');
	    	},200)
	    }
	});


	/**
	 * scrollr initialization
	 */
    var s = skrollr.init({
    	// animate: true,
    	// smoothScrolling: true,
    	// smoothScrollingDuration: 500,
    	// edgeStrategy: 'reset'
    });


    /**
	 * scroll smoothly
	 */
	if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
	window.onmousewheel = document.onmousewheel = wheel;

	var goUp = true;
	var end = null;
	var interval = null;

	function wheel(event) {
	    var delta = 0;
	    if (event.wheelDelta) delta = event.wheelDelta / 120;
	    else if (event.detail) delta = -event.detail / 3;

	    handle(delta);
	    if (event.preventDefault) event.preventDefault();
	    event.returnValue = false;
	}

	function handle(delta) {
	    var animationInterval = 20; //lower is faster
	    var scrollSpeed = 30; //lower is faster

	    if (end == null) {
	        end = $(window).scrollTop();
	    }
	    end -= 20 * delta;
	    goUp = delta > 0;

	    if (interval == null) {
	        interval = setInterval(function() {
	            var scrollTop = $(window).scrollTop();
	            var step = Math.round((end - scrollTop) / scrollSpeed);
	            if (scrollTop <= 0 ||
	                scrollTop >= $(window).prop("scrollHeight") - $(window).height() ||
	                goUp && step > -1 ||
	                !goUp && step < 1) {
	                clearInterval(interval);
	                interval = null;
	                end = null;
	            }
	            $(window).scrollTop(scrollTop + step);
	        }, animationInterval);
	    }
	}


	/**
	 * check if element is in viewport
	 */
	$.fn.isOnScreen = function(){
	    var win = $(window);
	    var viewport = {
	        top : win.scrollTop(),
	        left : win.scrollLeft()
	    };
	    viewport.right = viewport.left + win.width();
	    viewport.bottom = viewport.top + win.height();
	    
	    var bounds = this.offset();
	    bounds.right = bounds.left + this.outerWidth();
	    bounds.bottom = bounds.top + this.outerHeight();
	    
	    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	};


	/**
	 * Initialize wow.js
	 */
	new WOW().init();




}); /* end of document ready */