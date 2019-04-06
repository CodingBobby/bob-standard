"use strict";
exports.__esModule = true;
function rand(from, to) {
    return Math.random() * (to - from) + from;
}
exports.rand = rand;
function clone(object) {
    if (null == object || "object" != typeof object)
        return object;
    var copy = object.constructor();
    for (var attr in object) {
        if (object.hasOwnProperty(attr))
            copy[attr] = object[attr];
    }
    return copy;
}
exports.clone = clone;
function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.pick = pick;
function swap(array, indexA, indexB) {
    var cache = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = cache;
    return array;
}
exports.swap = swap;
function remove(array, remove) {
    return array.filter(function (el) { return !remove.includes(el); });
}
exports.remove = remove;
