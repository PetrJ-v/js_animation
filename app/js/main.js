(function($){
	$(document).ready(function(){
		
		$.fn.animateText = function(className, duration, complete) {
			var string = this.text(),
				duration = duration ? duration : 400;
				transition = (duration/1000 * 1.2) + 's',
				string = string.replace(/\s/g, ''),
				stringLength = string.length;

			this.queue(function(next){
				var $this = $(this);
				$this.html(string.replace(/./g, '<span class="' + className + '">$&</span>'));
				$this.show();
				$this.find('span.' + className).each(function(i, el){
					setTimeout(function(){ 
						$el = $(el);
						$el.css("transition", transition);
						$el.removeClass(className);
					}, duration * i);
				});
				setTimeout(function () {
					$this.css('transition', '');
					if (complete) {
						complete();
					};
					next();
				}, duration * stringLength);
			});
			return this;
		};
		
		/**
			 * Анимирует ДОМ элемент путем изменения его размера.
			 * @param {number} value Процентное соотношение от первоначального размера элемента.
			 * Допускаются отрицательные значения.
			 * @param {number} delay Длительность анимации в милисекундах.
			 * @param {function} [complete] Необязательная функция, которая будет вызвана, когда анимация будет завершена.
			 * @return {object} Дом элемент, который анимировался, с новыми значениями ширины и высоты.
		 */
		$.fn.sizeAnimation = function(value, delay, complete) {

			var delay = delay ? delay : 800,
				$this = $(this);

			$this.queue(function (next){
				if (!value) {
					console.error('Missing varieble "value" in sizeAnimation function');
				};
				currentWidth = $this.width();
				$this.width(currentWidth);
				currentHeight = $this.height();
				$this.height(currentHeight);
				$this.css('transition', delay/1000 + 's');
				$this.width( currentWidth/100 * (100 + value) );
				$this.height( currentHeight/100 * (100 + value) );
				setTimeout(function () {
					$this.css('transition', '');
					if (complete) {
						complete();
					};
					next();
				}, delay);
			});

			return this;
		};

		$.fn.fadeElements = function (effect, duration, complete) {
			var $this = $(this),
				elCount = $this.length;
			$this.each(function (i) {
				$this = $(this);
				$this.queue(function (next) {
					$this = $(this);
					if (effect === 'fadeOut') {
						$this.fadeOut(duration);
						next();
					} else if (effect === 'fadeIn') {
						$this.fadeIn(duration);
						next();
					} else { console.error('Unexpected parametr "effect" in fadeElements func. Must be string "fadeIn" or "fadeOut".') };
					if (i === elCount - 1) {
						setTimeout(function () {
							if (complete) {
								complete();
							};
						}, duration);
					};
				});
			});
			return this;
		};
		
		var logoImg = $('.header__center-img'),
			logoDescription = $('.header__center-text');

		logoImg.fadeIn(500, textAnimation);
		function textAnimation() {
			logoDescription.animateText('header__center-text_invisible', 300, imgAnimation);
		};
		function imgAnimation() {
			logoImg.sizeAnimation(7, 600).sizeAnimation(-7, 600, fadeFunc);
		};
		function fadeFunc() {
			var elForFade = [logoImg, logoDescription];
			$(elForFade).fadeElements('fadeOut', 800, animateBgAntText);
		};
		function animateBgAntText() {
			$('.header').addClass('header_animated');
			$('.header__center-info-first-line').animate( { "margin-right": 0 }, 1300);
			setTimeout(function () {
				$('.header__center-info-second-line').animate( { "margin-right": 0 }, 1300);
			}, 200);
			setTimeout(function () {
				$('.header__center-info-third-line').animate( { "margin-right": 0 }, 1300, showBottomText);
			}, 300);
		};
		function showBottomText(){
			$('.header-title').fadeIn();
		}

	});
})(jQuery);
