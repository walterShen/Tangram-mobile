/*
 * Tangram Mobile
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 */

///import baidu.dom.g
///import baidu.fx.start

/**
 * 立体翻转效果 
 *       部分代码来自sencha touch
 * @param {HTMLelem} elem  目标元素
 * @param {Object} options 选项 
 *        参考baidu.fx.start，忽略from to参数，新增：
 *        {
 *            out : {boolean} false    //运动类型是否为out(从正常显示运动到消失)
 *            direction : {string}  "left" || "right" || "up" || "down"  //运动方向
 *        }
 */
baidu.fx.cube = function(elem, options) {
    var 
        options = options || {},
        elem = baidu.dom.g(elem),
        direction = options.direction || "left",
        isHori = direction == 'left' || direction == 'right',
        out = options.out,
        
        origin = out ? "100% 100%" : "0% 0%",
        fromRotate = 0,
        toRotate = 0,
        rotateProp = 'Y',
        fromZ = 0,
        toZ = 0,
        fromOpacity = 1,
        toOpacity = 1,
        zDepth,
        elemWidth = elem.offsetWidth,
        elemHeight = elem.offsetHeight,
        showTranslateZ = true,
        fromTranslate = ' translateX(0)',
        toTranslate = '';

    if (direction == 'left' || direction == 'right') {
        if (options.out) {
            toZ = elemWidth;
            toOpacity = 0.5;
            toRotate = -90;
        } else {
            fromZ = elemWidth;
            fromOpacity = 0.5;
            fromRotate = 90;
        }
    } else if (direction == 'up' || direction == 'down') {
        rotateProp = 'X';
        if (options.out) {
            toZ = elemHeight;
            toRotate = 90;
        } else {
            fromZ = elemHeight;
            fromRotate = -90;
        }
    }

    if (direction == 'down' || direction == 'right') {
        fromRotate *= -1;
        toRotate *= -1;
        origin = (origin == '0% 0%') ? '100% 100%': '0% 0%';
    }

    if (options.style == 'inner') {
        fromZ *= -1;
        toZ *= -1;
        fromRotate *= -1;
        toRotate *= -1;

        if (!options.out) {
            toTranslate = ' translateX(0px)';
            origin = '0% 50%';
        } else {
            toTranslate = fromTranslate;
            origin = '100% 50%';
        }
    }

    options.from = {
        'webkitTransform': 'rotate' + rotateProp + '(' + fromRotate + 'deg)' + (showTranslateZ ? ' translateZ(' + fromZ + 'px)': '') + fromTranslate,
        'webkitTransformOrigin': origin
    };
    options.to = {
        'webkitTransform': 'rotate' + rotateProp + '(' + toRotate + 'deg) translateZ(' + toZ + 'px)' + toTranslate,
        'webkitTransformOrigin': origin
    };
    
    baidu.fx.start(elem, options);
    return elem;
};
