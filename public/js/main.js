$(window)
	.on('load', fadeInContent)
	.on('scroll', toggleNav)
	.on('scroll', fadeOutHero)
	.on('scroll', fadeOutText);

// Wait until image is loaded
function fadeInContent () {
	$('.c-loading-screen').fadeOut(600, function () {
		$('.c-hero__inner').fadeIn(600);
	});
};

// Toggle nav active state
function toggleNav () {
	var heroHeight = $('.c-hero').outerHeight();
	var scrollTop = $(window).scrollTop();

	if (scrollTop >= heroHeight) {
		$('.c-nav').addClass('c-nav--active');
	} else {
		$('.c-nav').removeClass('c-nav--active');
	}
};

// Fade hero to #black on scroll down
function fadeOutHero () {
	var scrollTop = $(window).scrollTop();
	var heroHeight = $('.c-hero').outerHeight();

	if (scrollTop < heroHeight) {
		$('.c-hero__overlay').css({
			'opacity': scrollTop / $(this).height()
		});
	}
};

// Fade out hero content on scroll down
function fadeOutText () {
	var scrollTop = $(window).scrollTop();
	var heroHeight = $('.c-hero').outerHeight();
	var height = heroHeight / 2;
	var $arrow = $('.c-hero__arrow');
	var activeClass = 'c-hero__arrow--active';

	if (scrollTop < heroHeight) {
		if (scrollTop > 0) {
			$arrow.removeClass(activeClass);
		} else {
			$arrow.addClass(activeClass);
		}

		$('.js-fade-hero-content').css({
			'opacity': ((height - scrollTop) / height)
		});
	}
};

// Hide nav on scroll down
(function () {
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.c-nav').outerHeight();

	$(window).scroll(function (event) {
		didScroll = true;
	});

	setInterval(function () {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled () {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if (Math.abs(lastScrollTop - st) <= delta) {
			return;
		}
		// If they scrolled down and are past the navbar, add class .c-nav--hide.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down
			$('.c-nav').addClass('c-nav--hide');
		}
		else if (st + $(window).height() < $(document).height()) {
			// Scroll Up
			$('.c-nav').removeClass('c-nav--hide');
		}

		lastScrollTop = st;
	}

})();

// Internal linking
$('body').on('click', '.js-go-to-section', function (e) {
	var $section = $($(this).attr('href'));
	e.preventDefault();

	$('html, body').animate({
		scrollTop: $section.offset().top
	}, 400);
});

// TinyMCE
tinymce.init({
	selector: '.c-form__wysiwyg',
	content_css: '/js/vendor/tinymce/skins/custom/custom-theme.css',
	plugins: 'codesample, fullscreen',
	toolbar: 'codesample, fullscreen'
});

// Delete article
$('body').on('click', '.c-edit__link--delete', function (e) {
	e.preventDefault();

	if (confirm('Are you sure you want to delete this article?')) {
		$.ajax({
			type: 'delete',
			url: $(this).attr('href'),
			success: function (response) {
				console.log('response:', response);
				// reload page
				window.location.reload();
			}
		});
	}
});