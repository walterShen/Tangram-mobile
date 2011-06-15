/*
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 */
///import baidu.ui.Carousel;
///import baidu.event.tap;

/**
 * 为滚动组件添加控制按钮插件
 */
baidu.ui.Carousel.register(function(me) {
    me.addEventListener('onload', function() {
        me.each('prev', function(item){
        	me.on(item.element, 'tap', '_goToItem', 'right');
        });
        
        me.each('next', function(item){
        	me.on(item.element, 'tap', '_goToItem', 'left');
        });
    });
});