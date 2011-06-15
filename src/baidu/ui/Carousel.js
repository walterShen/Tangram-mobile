/**
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 */

///import baidu.ui.createUI;
///import baidu.dom.children;
///import baidu.dom.setStyle;
///import baidu.event.swipe;

/**
 * Carousel基类，创建一个Carousel实例
 * @class Carousel类
 * @param {Object} [options] 选项
 * @config {DOMElement} element
 * @config {String}     flip        滚动的方式，取值：item(默认，一次滚动一项)，page(一次滚动一页)
 * @config {Boolean}    animation   是否启用动画效果，取值：true(默认)，flase
 * @config {Function}   onScrollEnd   滚动后触发事件
 * @returns {Carousel}              Carousel类
 * */

baidu.ui.Carousel = baidu.ui.createUI( function() {

}).extend({

    uiType:'carousel',
    
    lastActiveIndex: 0,
    
    activeIndex: 0,

    /**
     * 数据初始化
     * @private 
     */
    _setup: function() {
        var me = this;

        baidu.ui.Base._setup.call(me);
        
        if(me.roles["content"]) {
            me.content = me.roles["content"][0].element;
            me.items = baidu.dom.children(me.content);
            me._itemWidth = me.items[0].offsetWidth;
            me._pagesize = Math.floor(me.element.offsetWidth / me._itemWidth);
        }
        
        me.dispatchEvent("setup");
    },
    
    /**
     * 渲染页面元素
     * @private
     * */
    _init: function() {
        var me = this,
            element = me.element,
            content = me.content;
            
        baidu.ui.Base._init.call(me);
        baidu.dom.setStyle(element, "overflow", "hidden");
        
        baidu.array.each(me.items, function(item, i){
        	baidu.dom.setStyle(item, 'position', 'absolute');
        })
        
        me.on(content, 'swipe', '_onContentSwipe');
        
        me.dispatchEvent("load");
    },

    /**
     * 滑动时触发事件
     * @private
     * 
     */
    _onContentSwipe: function(e) {
        this._goToItem(e.direction);
    }
});