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
})