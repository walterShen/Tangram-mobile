/*
 * Tangram Mobile
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 */

///import baidu.lang;
///import baidu.lang.Class;
///import baidu.lang.Event;

/**
 * 创建一个baidu.lang.Class的单例实例
 * @name baidu.lang.createSingle
 * @function
 * @grammar baidu.lang.createSingle(json)
 * @param {Object} json 直接挂载到这个单例里的预定属性/方法
 * @version 1.2
 * @see baidu.lang.Class
 *             
 * @returns {Object} 一个实例
 */
baidu.lang.createSingle = function (json) {
    var c = new baidu.lang.Class();

    for (var key in json) {
        c[key] = json[key];
    }
    return c;
};

