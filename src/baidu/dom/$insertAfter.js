/*
 * Tangram Mobile
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 */

///import baidu.dom;

/**
 * 将目标元素添加到基准元素之后
 * @name baidu.dom.insertAfter
 * @function
 * @grammar baidu.dom.insertAfter(newElement, existElement)
 * @param {HTMLElement|string} newElement 被添加的目标元素
 * @param {HTMLElement|string} existElement 基准元素
 * @meta standard
 * @see baidu.dom.insertBefore
 *             
 * @returns {HTMLElement} 被添加的目标元素
 */
baidu.dom.insertAfter = function (newElement, existElement) {
    existElement.parentNode.insertBefore(newElement, existElement.nextSibling);
    return newElement;
};
