$(function() {
	var scene = document.getElementById('scene');
	var parallaxInstance = new Parallax(scene, {
		relativeInput: true,
		pointerEvents: true
	});
	parallaxInstance.friction(0.2, 0.2);;

	var parts = $('.part');
	parts.each(function(index, item) {
		$(item).on('click', function(e) {
			$('#' + item.dataset.name).css({'visibility': 'visible'});
			setTimeout(function() {
				$('#' + item.dataset.name).toggleClass('show');
			}, 0)
		})
	})

	var closes = $('.close');
	closes.each(function(index, item) {
		$(item).on('click', function(e) {
			$('#' + item.dataset.name).toggleClass('show');
			setTimeout(function(){
				$('#' + item.dataset.name).css({'visibility': 'hidden'});
			}, 500)
		})
	})

	var links = [
		'https://kokota.github.io/resume/img/bg1.jpeg',
		'https://kokota.github.io/resume/img/bg2.jpeg',
		'https://kokota.github.io/resume/img/bg3.jpeg'
	]
	var count = 0;
	links.forEach(function(src) {
		var img = new Image();
		img.src = src;
		img.onload = function() {
			console.log('ok');
			if(++count === 3) {
				$('.mask').css({'opacity': 0});
				setTimeout(function() {
					$('.mask').css({'visibility': 'hidden'});
				}, 500);
			}
		}
	})

})