"use strict";
exports.__esModule = true;
var calc_1 = require("./calc");
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
function weight(array) {
    var pi = 0, pw = 1, witems = [], citem = 0;
    var items = array.map(function (e) { return e[pi]; }), weights = array.map(function (e) { return e[pw]; });
    var divs = calc_1.gcd(weights);
    if (divs > 1) {
        weights = weights.map(function (x) { return x / divs; });
    }
    while (citem < items.length) {
        for (var i = 0; i < weights[citem]; i++) {
            witems[witems.length] = items[citem];
        }
        citem++;
    }
    return witems;
}
exports.weight = weight;
function extract(input, identifier) {
    var rows = input.split('\n');
    var reg = RegExp(identifier);
    var out = [];
    var tmp = [];
    for (var i in rows) {
        var row = rows[i];
        if (reg.test(row)) {
            if (tmp.length !== 0) {
                out.push(tmp);
                tmp = [];
            }
        }
        else {
            var rowArr = row.split('');
            tmp.push(rowArr.map(function (x) { return parseInt(x); }));
        }
    }
    return out;
}
exports.extract = extract;
function size(object) {
    var s = { keys: 0, values: 0 };
    function find(obj) {
        for (var item in obj) {
            if (obj.hasOwnProperty(item)) {
                s.keys++;
                if (type(obj[item]) == 'Object') {
                    find(obj[item]);
                }
                else {
                    s.values++;
                }
            }
        }
    }
    find(object);
    return s;
}
exports.size = size;
function type(item) {
    var text = item.constructor.toString();
    return text.match(/function (.*)\(/)[1];
}
exports.type = type;
