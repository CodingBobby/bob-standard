"use strict";
exports.__esModule = true;
var calc_1 = require("./calc");
var creators_1 = require("./creators");
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
function crankup(items) {
    for (var i in items) {
        var multiple = calc_1.smti(items[i]);
        for (var j in items) {
            items[j] *= multiple;
        }
    }
    return items;
}
exports.crankup = crankup;
function weight(items, weights) {
    if (items.length !== weights.length) {
        console.error('arrays do not match!');
    }
    var witems = [], citem = 0;
    // now we need to push the weights to whole numbers, because we can't
    // put half items into an array, using crankup function
    weights = crankup(weights);
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
            console.log(logPut(args[i]));
        }
    }
    function logPut(input) {
        var str = '';
        var counter = 0;
        function helper(e) {
            switch (type(e)) {
                case 'String': {
                    str += "\u001B[34m" + e + "\u001B[0m";
                    break;
                }
                case 'Number': {
                    str += "\u001B[36m" + e + "\u001B[0m";
                    break;
                }
                case 'Boolean': {
                    str += "\u001B[33m" + e + "\u001B[0m";
                    break;
                }
                case 'Array': {
                    str += '\u2514 ';
                    for (var i_1 in e) {
                        counter++;
                        helper(e[i_1]);
                        if ((counter + 1) >= e.length) {
                            str += '\n';
                        }
                    }
                    break;
                }
                case 'Object': {
                    break;
                }
            }
            str += ' ';
        }
        helper(input);
        return str;
    }
    function helperold(e) {
        switch (type(e)) {
            case 'String': {
                console.log('\x1b[34m%s\x1b[0m', e);
                break;
            }
            case 'Number': {
                console.log('\x1b[36m%s\x1b[0m', e);
                break;
            }
            case 'Boolean': {
                console.log('\x1b[33m%s\x1b[0m', e);
                break;
            }
            case 'Array':
            case 'Object': {
                console.table(e);
                break;
            }
            case 'Function': {
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
function printArray(input, name) {
    // used for getting the deepness of nested items
    var deepness = 0;
    var deepArray = [];
    function mapDeepness(e) {
        for (var i = 0; i < e.length; i++) {
            if (type(e[i]) == 'Array') {
                deepness++;
                mapDeepness(e[i]);
            }
            else {
                deepArray.push(deepness);
            }
        }
        deepness--;
    }
    // used for getting the raw items
    var itemArray = [];
    // recursively loop through the array and fetch all elements
    function getItems(arr) {
        function helper(e) {
            for (var i in e) {
                if (type(e[i]) == 'Array') {
                    helper(e[i]);
                }
                else {
                    itemArray.push(e[i]);
                }
            }
        }
        helper(arr);
    }
    // the actual items
    getItems(input);
    // their deepness / level
    mapDeepness(input);
    // we have to get the level changes and sublevels as well
    var itemLevels = [];
    for (var i in deepArray) {
        var prev = -1;
        var next = -1;
        var sub = [];
        // if a previous item exists
        if (deepArray[Number(i) - 1] !== undefined) {
            prev = deepArray[Number(i) - 1] - deepArray[i];
        }
        // if a next item exists
        if (deepArray[Number(i) + 1] !== undefined) {
            next = deepArray[Number(i) + 1] - deepArray[i];
        }
        // the item levels before current
        var before = deepArray.slice(0, Number(i));
        // the item levels after current
        var after = deepArray.slice(Number(i) + 1);
        // get the max level
        var maxlvl = calc_1.max(deepArray);
        // check if any level appears before and after the current item and if yes, put it in the sub array
        for (var l = 0; l < maxlvl; l++) {
            if (before.includes(l) && after.includes(l)) {
                // just push levels lower than itself
                if (l < deepArray[i]) {
                    sub.push(l);
                }
            }
            // level -1 indicates the end of a root
            if (before.includes(l) && !after.includes(l)) {
                sub = [-1];
            }
        }
        itemLevels.push({
            prev: prev,
            next: next,
            sub: sub
        });
    }
    // now we can create the actual output
    // these are the guys we need to build a 'screen' (not actually one but we'll map all characters into a matrix that will be converted into a string afterwards)
    var line = creators_1.array(20, '  ');
    var screen = [];
    // these are the characters we use to create the tree
    var box = '\u25A7';
    var hor = '\u2500';
    var ver = '\u2502';
    var ver_right = '\u251C';
    var hor_down = '\u252C';
    var down_right = '\u2514';
    // the actual line we're on
    var lc = 0;
    for (var j in itemArray) {
        // we can't use it as a string
        var i = Number(j);
        // the current x-position in the screen matrix
        var mat_pos = deepArray[i];
        // add a new line for the next item and save the count
        screen.push(clone(line));
        // put a nice box in the beginning
        if (i == 0) {
            screen.push(clone(line));
            if (name) { // if name for the array was given
                screen[lc][mat_pos] = name;
            }
            else {
                screen[lc][mat_pos] = box + ' ';
            }
            lc++;
        }
        // put the tree section for current item
        if (itemLevels[i].next == 1) {
            screen[lc][mat_pos] = ver_right + hor;
            // add the actual item
            screen[lc][mat_pos + 1] = ' ' + itemArray[i];
            // add a new line for vertex and jump into it
            screen.push(clone(line));
            lc++;
            // add the vertex and the box next to it
            if (itemLevels[i].sub.includes(-1)) {
                // if there is no item on the current level left
                screen[lc][mat_pos] = down_right + hor;
            }
            else {
                screen[lc][mat_pos] = ver_right + hor;
            }
            screen[lc][mat_pos + 1] = box + ' ';
        }
        else if (itemLevels[i].next == 0) {
            // nothing special happens here, just add a new vertex
            screen[lc][mat_pos] = ver_right + hor;
            // add the actual item
            screen[lc][mat_pos + 1] = ' ' + itemArray[i];
        }
        else if (itemLevels[i].next == -1) {
            // end of root is reached, add a corner
            screen[lc][mat_pos] = down_right + hor;
            // add the actual item
            screen[lc][mat_pos + 1] = ' ' + itemArray[i];
        }
        // add vertical carriers on all sublevels
        for (var k in itemLevels[i].sub) {
            var sublevel = itemLevels[i].sub[k];
            // exclude the end-of-root level
            if (sublevel !== -1) {
                screen[lc][sublevel] = ver + ' ';
            }
        }
        // hop into the next line
        lc++;
    }
    // here we loop through the screen matrix and add everything to one string we can then log
    var text = '';
    for (var r in screen) {
        for (var s in screen[r]) {
            text += screen[r][s];
        }
        text += '\n';
    }
    // FINALLY print the array tree
    console.log();
    console.log(text);
}
exports.printArray = printArray;
