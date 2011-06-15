/*
* Tangram
* Copyright 2011 Baidu Inc. All rights reserved.
*/
///import baidu.ui.Carousel;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;

/**
 * 为滚动组件添加标题插件
 */
baidu.ui.Carousel.register( function(me) {
	if(!me.roles.caption) {
		return;
	}

	var caption = me.roles.caption[0].element,
		captionItems = caption.children;
	
	me.addEventListener('onload', function() {
		caption.style.overflow = 'hidden';
		baidu.array.each(captionItems, function(item, index) {
			if(index != me.activeIndex) {
				item.style.display = 'none';
			}
		})
	});
	
	me.addEventListener('onbeforeswipe', function() {
		baidu.fx.slide(captionItems[me.activeIndex], {
			out: true,
			duration: 300,
			direction: 'down',
			onfinish: function() {
				this.style.display = 'none';
			}
		});
	});
	
	me.addEventListener('onslide', function() {
		captionItems[me.activeIndex].style.display = '';
		baidu.fx.slide(captionItems[me.activeIndex], {
			duration: 300,
			direction: 'up'
		});
	});
});