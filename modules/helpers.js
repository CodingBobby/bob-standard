"use strict";
exports.__esModule = true;
// some functions from other modules we'll need here
var calc_1 = require("./calc");
var creators_1 = require("./creators");
// returns a random float (!) in the range 'from' - 'to' which both are inclusive
function rand(from, to) {
    return Math.random() * (to - from) + from;
}
exports.rand = rand;
// returns a deep copy of the inserted object of any (!) type
function clone(object) {
    if (null == object || "object" != typeof object)
        return object;
    // create new blank object of same type
    var copy = object.constructor();
    // copy all attributes into it
    for (var attr in object) {
        if (object.hasOwnProperty(attr)) {
            copy[attr] = object[attr];
        }
    }
    return copy;
}
exports.clone = clone;
// returns a random item from a given array
function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.pick = pick;
// returns the inserted array, but with item A and item B swapped
function swap(array, indexA, indexB) {
    var cache = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = cache;
    return array;
}
exports.swap = swap;
// returns the inserted array from which the items from the other
// array are being removed, items from the other array that are not
// inside of the original one are ignored
function remove(array, remove) {
    return array.filter(function (el) { return !remove.includes(el); });
}
exports.remove = remove;
// returns the inserted array which items are 'cranked' up, by that I mean
// to produce integers from float numbers without loosing the ratio to
// all the other items
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
// returns an array of a weighted amount of each of the original items
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
// extracts data from string and splits it at a given identifier
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
// returns size object representing the size of input object
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
// returns a string containing the type of input item, detects
// any custom type and can distinguish between objects and arrays
function type(item) {
    var construct = item.constructor.toString();
    // matcher seen on stackoverflow, cannot find it anymore :(
    return construct.match(/function (.*)\(/)[1];
}
exports.type = type;
// custom log method that colors values according to their type
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
        switch (type(input)) {
            case 'Array': {
                printArray(input);
                break;
            }
            default: {
                str += typeColor(input).toString();
                break;
            }
        }
        str += ' ';
        return str;
    }
}
exports.say = say;
function err(msg) {
    sayError(msg);
}
exports.err = err;
// helpers for say and err methods, not exported because they
// are only required inside this module
function sayHelper(t, v) {
    say('\x1b[2m' + t + ': \x1b[0m\x1b[35m' + [v] + '\x1b[0m');
}
function sayError(t) {
    say('\x1b[41m\x1b[36m' + t + '\x1b[0m');
}
// returns a string containing the item value surrounded by colorcodes
// according to their value type, optional toColor can be another item
// which type will be checked instead while returning the value of the
// original item
function typeColor(item, toColor) {
    var str;
    toColor = toColor || item;
    switch (type(toColor)) {
        case 'String': {
            str = "\u001B[32m" + item + "\u001B[0m";
            break;
        }
        case 'Number': {
            str = "\u001B[36m" + item + "\u001B[0m";
            break;
        }
        case 'Boolean': {
            str = "\u001B[33m" + item + "\u001B[0m";
            break;
        }
        case 'Function': {
            str = "\u001B[35m" + item.name + "()\u001B[0m";
            break;
        }
        case 'Object': {
            var props = Object.getOwnPropertyNames(item);
            var propString = '';
            // we want to display the properties of the object
            for (var i in props) {
                // get the color of the properly value and not the key,
                // thats why we pass the optional item
                propString += typeColor(props[i], item[props[i]]);
                if (Number(i) + 1 < props.length) {
                    propString += '\x1b[34m' + ', ' + '\x1b[0m';
                }
            }
            str = "\u001B[34mobject: {\u001B[0m" + propString + "\u001B[34m}\u001B[0m";
            break;
        }
        default: {
            str = '\x1b[0m' + item.toString() + '\x1b[0m';
            break;
        }
    }
    return str;
}
// neat little method that prints a tree of input array that can
// be nested in multiple levels
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
                    // to distinguish between arrays following each other
                    // on the same level, we introduce dummy nulls
                    itemArray.push(null);
                    helper(e[i]);
                }
                else {
                    itemArray.push(e[i]);
                }
            }
        }
        helper(arr);
    }
    // get the actual items
    getItems(input);
    // get their deepness, called it level sometimes, sorry for that
    mapDeepness(input);
    // it is also important to know where the items are linked,
    // by that I mean the level of the array our current item is inside
    // that level is always one below the current level of the actual item
    var anchorArray = [];
    for (var i in deepArray) {
        anchorArray.push(deepArray[i] - 1);
    }
    // to have the deepArray containing the dummies as well,
    // we recreate it and check for available dummies. for that we use a
    // separate counter as we will jump ahead the actual length of the itemArray
    // when we arrive at an item which is not a dummy
    var newDeep = [];
    var t = 0; // other parallel counter for below
    for (var i in itemArray) {
        if (itemArray[i] === null) {
            newDeep.push(anchorArray[t]);
        }
        else { // only count up when its an actual item
            newDeep.push(deepArray[t++]);
        }
    }
    // we update the old deepArray with the just created
    // content (couldn't do it right in the same array cause we
    // need it for exactly that)
    deepArray = clone(newDeep);
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
        // check if any level appears before and after the
        // current item and if yes, put it in the sub array
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
    // this is a 'screen' (not actually
    // one but we'll map all characters into a matrix that will
    // be converted into a string afterwards)
    var screen = [];
    // these are the characters we use to create the tree
    // let box: string = '\u25A7'
    var hor = '\x1b[1;37m\u2500\x1b[0m';
    var ver = '\x1b[1;37m\u2502\x1b[0m';
    var ver_right = '\x1b[1;37m\u251C\x1b[0m';
    var hor_down = '\x1b[1;37m\u252C\x1b[0m';
    var down_right = '\x1b[1;37m\u2514\x1b[0m';
    var box = "\u001B[1;31m\u25A7\u001B[0m";
    var box_start = "" + box;
    var box_node = hor_down + " " + box;
    // the actual line we're on
    var lc = 0;
    // THE ACTUAL STUFF
    for (var i = 0; i < itemArray.length; i++) {
        // the current x-position in the screen matrix
        var mat_pos = deepArray[i];
        // add a new line for the next item and save the count
        screen.push(creators_1.array(deepArray[i] + 1, '  '));
        // put a nice box in the beginning
        if (i == 0) {
            screen.push(creators_1.array(deepArray[i] + 1, '  '));
            if (name) { // if name for the array was given
                screen[lc][mat_pos] = name;
            }
            else {
                screen[lc][mat_pos] = box_start + ' ';
            }
            lc++;
        }
        // put node for new arrays
        if (itemArray[i] === null) {
            // add a new line for vertex and jump into it
            screen.push(creators_1.array(deepArray[i] + 1, '  '));
            lc++;
            // add the vertex and the box next to it
            if (itemLevels[i].sub.includes(-1)) {
                // if there is no item on the current level left
                screen[lc][mat_pos] = down_right + hor;
            }
            else {
                screen[lc][mat_pos] = ver_right + hor;
            }
            screen[lc][mat_pos + 1] = box_node + ' ';
            lc--;
        }
        // put the tree section for current item
        if (itemLevels[i].next == 1) {
            // add the actual item but exclude dummies
            if (itemArray[i] !== null) {
                screen[lc][mat_pos] = ver_right + hor;
                screen[lc][mat_pos + 1] = ' ' + typeColor(itemArray[i]);
                // hop into the next line
                lc++;
            }
            else {
                // remove te line that was placeholding the dummies
                // and reduce the counter to match the new line
                screen.splice(lc, 1);
            }
            // add the vertex and the box next to it
            if (itemLevels[i].sub.includes(-1)) {
                // if there is no item on the current level left
                screen[lc][mat_pos] = down_right + hor;
            }
            else {
                screen[lc][mat_pos] = ver_right + hor;
            }
            screen[lc][mat_pos + 1] = box_node + ' ';
        }
        else if (itemLevels[i].next == 0) {
            // nothing special happens here, just add a new vertex
            screen[lc][mat_pos] = ver_right + hor;
            // add the actual item
            screen[lc][mat_pos + 1] = ' ' + typeColor(itemArray[i]);
        }
        else if (itemLevels[i].next == -1) {
            // end of root is reached, add a corner
            screen[lc][mat_pos] = down_right + hor;
            // add the actual item
            screen[lc][mat_pos + 1] = ' ' + typeColor(itemArray[i]);
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
    // here we loop through the screen matrix and add everything
    // to one string we can then log
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
} // END of printArray()
exports.printArray = printArray;
// returns the array index number of an object that has the given value at the given property
function objIndex(array, property, value) {
    // by German Attanasio
    return array.map(function (e) { return e[property]; }).indexOf(value);
}
exports.objIndex = objIndex;
