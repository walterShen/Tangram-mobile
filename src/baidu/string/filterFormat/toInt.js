/*
 * Tangram Mobile
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 */

///import baidu.string.filterFormat;
/**
 * 对数字做安全转义,确保是十进制数字;否则返回0.
 * @name baidu.string.filterFormat.toInt
 * @function
 * @grammar baidu.string.filterFormat.toInt(source)
 * @param {String} source 待转义字符串
 * 
 * @see baidu.string.filterFormat,baidu.string.filterFormat.escapeJs,baidu.string.filterFormat.escapeString
 * @version 1.2
 * @return {Number} 转义之后的数字
 */
baidu.string.filterFormat.toInt = function(str){
	return parseInt(str, 10) || 0;
};
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;