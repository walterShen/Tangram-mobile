/**
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 */

///import baidu.ui.createUI;
///import baidu.dom.getStyle;
///import baidu.dom.setStyle;
///import baidu.dom.setStyles;
///import baidu.dom._styleFilter.px;
///import baidu.fx.fade;
///import baidu.dom.hide;
///import baidu.dom.show;
///import baidu.dom.create;
/**
 * 弹出层
 * @class popup类
 * @param   {Object}  [options]  选项.
 * @config  {DOMElement}  element
 * @config  {Boolean}     mask     是否启用遮罩层
 * @config  {Number}      zIndex  
 * @return  {Popup}                Popup类
 */
baidu.ui.Popup = baidu.ui.createUI(function() {

}).extend({
    uiType: 'popup',

    mask: false,

    zIndex: 999,

    /**
     * 数据初始化
     * @private
     */
    _setup: function() {
        var me = this,
            element = me.element;
        
        me.popupWidth = element.offsetWidth;
        me.popupHeight = element.offsetHeight;

        baidu.ui.Base._setup.call(me);
        me.dispatchEvent('setup');
    },

    /**
     * 渲染页面元素
     * @private
     */
    _init: function() {
        var me = this,
            element = me.element;

        baidu.dom.setStyles(element, {
            'display': 'none',
            'position': 'absolute',
            'zIndex': me.zIndex
        });

        me.visible = false;

        if (me.mask && !baidu.ui.Mask._instance) {
            me._addMask();
        }

        me._setPostion();
        me.on(window, 'turn', '_onTurn');
        me.dispatchEvent('onload');
    },

    /**
     * 添加一个mask类
     * @private
     */
    _addMask: function() {
        var ui,
            div = baidu.dom.create('div',{
               't-ui': 'Mask',
               'style': "display:none;opacity:0.4;background-color:black"
            });

        document.body.appendChild(div);
        
        ui = new baidu.ui.Mask({element: div});
        ui._setup();
        ui._init();
    },

    /**
     * 设置元素的位置
     * @private
     */
    _setPostion: function() {
        var me = this,
            element = me.element,
            left = ( window.innerWidth - me.popupWidth ) / 2,
            top = ( window.innerHeight - me.popupHeight ) / 2;
        
        baidu.dom.setStyles(element, {'top': top, 'left': left});
    },

    /**
     * 屏幕翻转时调用
     * @private
     */
    _onTurn: function(e) {
       var me = this;
       
       me._setPostion();
       me.fire('turn', e);
    },

    /**
     * 显示弹出层
     */
    show: function() {
        var me = this,
            element = me.element;
        
        baidu.dom.show(element);

        me.visible = true;
        
        if (me.mask) {
            baidu.ui.Mask._instance.show();
        }
        
        me.showFx(element, {
            'duration': 1000,
            'out': false
        });
    },

    /**
     * 关闭弹出层
     */
    close: function() {
        var me = this,
            element = me.element,
            onClose = function(){
               baidu.dom.hide(element);
               me.visible = false;
            };
        
        if (me.mask) {
            baidu.ui.Mask._instance.close();
        }

        if (me.visible) {
           me.showFx(element, {
               'duration': 500,
               'out': true, 
               'onfinish': onClose
           });
        }
    },

    /**
     * 动画效果 
     * @param   {HTMLElement}  element     目标元素
     * @param   {Object}       [options]   选项 
     *          参考baidu.fx.fade参数列表
     */
     showFx: function(element, options) {
        baidu.fx.fade(element, options);
     }
});