/*
 * Tangram Mobile
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 */

///import baidu.dom;

/**
 * 判断一个元素是否包含另一个元素
 * @name baidu.dom.contains
 * @function
 * @grammar baidu.dom.contains(container, contained)
 * @param {HTMLElement|string} container 包含元素
 * @param {HTMLElement|string} contained 被包含元素
 * @meta standard
 * @see baidu.dom.intersect
 *             
 * @returns {boolean} contained元素是否被包含于container元素的DOM节点上
 */
baidu.dom.contains = function (container, contained) {
	return !!(container.compareDocumentPosition(contained) & 16);
};
