"use strict";
exports.__esModule = true;
function string(length, char) {
    var s = '';
    for (var i = 0; i < length; i++) {
        s += char;
    }
    return s;
}
exports.string = string;
function array(length, element) {
    var arr = [], x = element || 0;
    for (var i = 0; i < length; i++) {
        if (typeof element == 'function') {
            x = element();
        }
        arr.push(x);
    }
    return arr;
}
exports.array = array;
function matrix(width, height, element) {
    var m = [], c = element || 0;
    for (var j = 0; j < height; j++) {
        m.push([]);
        for (var i = 0; i < width; i++) {
            if (typeof element == 'function') {
                c = element();
            }
            m[j].push(c);
        }
    }
    return m;
}
exports.matrix = matrix;
