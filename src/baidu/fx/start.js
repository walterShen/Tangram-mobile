/*
 * Tangram Mobile
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 */

///import baidu.fx;
///import baidu.dom.g;
///import baidu.dom.setStyles;
///import baidu.dom._styleFilter.px;
///import baidu.event.once;
///import baidu.object.extend;

/**
 * 基础动画方法
 * @param {DOMElement} elem  目标元素
 * @param {Object} [options] 选项
 * @config {Function} [onstart] 动画开始前执行
 * @config {Function} [onfinish] 动画结束后执行
 * @config {String} [easing = 'ease'] 动画缓动  ease | linear | ease-in | ease-out | ease-in-out | step-start | step-end 
 * @config {Number} [duration = 800] 动画持续时间，单位ms
 * @config {Object} [from] 初始样式，例：{width: "100px"}
 * @config {Object} [to] 目标样式
 * @config {Number} [delay = 0] 延迟开始时间，单位ms
 * @return {DOMElement} 目标元素
 */
baidu.fx.start = function(elem, options) {
    var 
        elem = baidu.dom.g(elem),
        style = elem.style,
        options = baidu.object.extend({
            onstart : function() {},
            onfinish : function() {},
            easing : "",
            duration : 800, 
            from : {},
            to : {},
            delay : 0
        }, options || {});
    
    style['webkitTransitionDuration'] = '0';
    if (baidu.browser.has3d) {
        elem.parentNode.style['webkitPerspective'] = 1200;
        elem.parentNode.style['webkitTransformStyle'] = 'preserve-3d';
    }
    
    baidu.dom.setStyles(elem, options.from);
    
    //setTimeout保证初始from style设置完成后再设置to style
    setTimeout(function() {
        style['webkitTransitionDuration'] = options.duration + 'ms';
        style['webkitTransitionProperty'] = "all";
        style['webkitTransitionTimingFunction'] = options.easing;
        
        options.onstart.call(elem, elem);
        
        //应用to style，开始动画
        baidu.dom.setStyles(elem, options.to);
        
        //存储变化的属性，给stop用
        elem["_tgFxTrsProp"] = elem["_tgFxTrsProp"] || options.to;
 
        elem["_tgFxTimeoutFunc"] = options.onfinish;
        
        baidu.event.once(elem, 'webkitTransitionEnd', function(){
            options.onfinish && options.onfinish.call(elem);
            style['webkitTransitionProperty'] = null;
            elem["_tgFxTrsProp"]  = null;
            elem["_tgFxTimeoutFunc"] = null;
        });
        
    }, options.delay);
    return elem;
};
