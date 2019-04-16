"use strict";
exports.__esModule = true;
function isPrime(x) {
    if ([2, 3].includes(x))
        return true;
    var half = x % 2 !== 0 ? (x - 1) / 2 : x / 2;
    for (var i = 2; i <= half; i++) {
        var div = x / i;
        if (Math.round(div) === div)
            return false;
    }
    return true;
}
exports.isPrime = isPrime;
function isPalin(x) {
    var reverse = Number(x.toString().split('').reverse().join(''));
    if (x == reverse) // do not change to triple '='!
        return true;
    else
        return false;
}
exports.isPalin = isPalin;
function isInt(x) {
    var y;
    return isNaN(x) ? !1 : (y = Number(x), (0 | y) === y);
}
exports.isInt = isInt;
function isSquare(x) {
    return isInt(Math.sqrt(x));
}
exports.isSquare = isSquare;
