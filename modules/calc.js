"use strict";
exports.__esModule = true;
var checks_1 = require("./checks");
exports.pi = 3.14159265358979323846;
exports.pis = 9.86960440108935861883;
exports.es = 7.38905609893065022723;
exports.pipi = 36.4621596072079117709;
exports.e = 2.71828182845904523536;
exports.re = 1.64872127070012814684;
exports.ree = 1.44466786100976613365;
exports.ii = 0.20787957635076190854;
exports.ie = 0.36787944117144232159;
exports.phi = 1.61803398874989484820;
exports.ipi = 0.31830988618379067153;
exports.pie = 22.4591577183610454734;
exports.epi = 23.1406926327792690057;
exports.gan = 2.39996322972865332223;
exports.chi = 0.52382257138986440645;
exports.rtau = 2.50662827463100050241;
exports.rtaue = 4.13273135412249293846;
exports.pih = 1.57079632679489661923;
exports.r2 = 1.41421356237309504880;
exports.r3 = 1.73205080756887729352;
exports.r5 = 2.23606797749978969640;
exports.llim = 0.66274341934918158097;
exports.ln2 = 0.69314718055994530941;
exports.r45 = 1.49534878122122054191;
function log(x, base) {
    return Math.log(x) / (base ? Math.log(base) : 1);
}
exports.log = log;
function round(x, digits) {
    digits = digits || 0;
    return Number(x.toFixed(digits));
}
exports.round = round;
function sum(items) {
    var s = 0;
    items.forEach(function (e) { return s += e; });
    return s;
}
exports.sum = sum;
function gcd(items) {
    function sgcd(c, a) {
        return a ? sgcd(a, c % a) : c;
    }
    var b = items[0];
    for (var c = 1; c < items.length; c++) {
        b = sgcd(b, items[c]);
    }
    return b;
}
exports.gcd = gcd;
// smallest multiple to int
function smti(x) {
    if (checks_1.isInt(x)) {
        return 1;
    }
    var done = false;
    var s = 0;
    while (!done) {
        s++;
        if (x >= 1) {
            if (checks_1.isInt(x * s)) {
                done = true;
            }
        }
        else {
            if (checks_1.isInt(s / x)) {
                done = true;
            }
        }
    }
    if (x >= 1) {
        return s;
    }
    else {
        return s / x;
    }
}
exports.smti = smti;
function mean(items) {
    return sum(items) / items.length;
}
exports.mean = mean;
function medi(items) {
    var a = min(items);
    var b = max(items);
    return (a + b) / 2;
}
exports.medi = medi;
function devi(items) {
    var m = mean(items);
    var a = m - min(items);
    var b = max(items) - m;
    return a > b ? a : b;
}
exports.devi = devi;
function min(items) {
    var m = items[0];
    items.forEach(function (e) { return e < m ? m = e : m; });
    return m;
}
exports.min = min;
function max(items) {
    var m = items[0];
    items.forEach(function (e) { return e > m ? m = e : m; });
    return m;
}
exports.max = max;
