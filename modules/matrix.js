"use strict";
exports.__esModule = true;
function transpose(matrix) {
    var n = [], l = matrix[0].length;
    for (var i = 0; i < l; i++) {
        n.push([]);
    }
    for (var j in matrix) {
        for (var i in matrix[j]) {
            n[i].push(matrix[j][i]);
        }
    }
    return n;
}
exports.transpose = transpose;
function flatten(matrix) {
    var items = [];
    for (var j in matrix) {
        for (var i in matrix[j]) {
            if (typeof matrix[j][i] != 'function') {
                items.push(matrix[j][i]);
            }
        }
    }
    return items;
}
exports.flatten = flatten;
