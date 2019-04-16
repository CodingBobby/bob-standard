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
function weight(items, weights) {
    if (items.length !== weights.length) {
        console.error('arrays do not match!');
    }
    var witems = [], citem = 0;
    // now we need to push the weights to whole numbers, because we can't
    // put half items into an array
    for (var i in weights) {
        var multiple = calc_1.smti(weights[i]);
        for (var j in weights) {
            weights[j] *= multiple;
        }
    }
    // if weights could be simplified because common divisors exist,
    // the 'divs' variable would be greater than '1' (which is always the case)
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
function say() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2 && typeof args[0] == 'string') {
        sayHelper(args[0], args[1]);
    }
    else {
        for (var i in args) {
            var s = args[i];
            helper(s);
        }
    }
    function helper(e) {
        switch (typeof e) {
            case 'string': {
                console.log('\x1b[34m%s\x1b[0m', e);
                break;
            }
            case 'number': {
                console.log('\x1b[36m%s\x1b[0m', e);
                break;
            }
            case 'boolean': {
                console.log('\x1b[33m%s\x1b[0m', e);
                break;
            }
            case 'object': {
                console.table(e);
                break;
            }
            case 'function': {
                // This is a temporary fix to prevent functions to be
                // printed to the console. Done because somewhy methods
                // that have been added to an existing prototype print
                // to the console, which is unwanted.
                break;
            }
            default: {
                console.log('\x1b[37m%s\x1b[0m', e);
                break;
            }
        }
    }
}
exports.say = say;
function err(msg) {
    sayError(msg);
}
exports.err = err;
function sayHelper(t, v) {
    say('\x1b[2m' + t + ': \x1b[0m\x1b[35m' + [v] + '\x1b[0m');
}
function sayError(t) {
    say('\x1b[41m\x1b[36m' + t + '\x1b[0m');
}
