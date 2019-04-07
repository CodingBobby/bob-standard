"use strict";
exports.__esModule = true;
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
function arrSum(array) {
    var s = 0;
    array.forEach(function (e) { return s += e; });
    return s;
}
exports.arrSum = arrSum;
function gcd(array) {
    function sgcd(c, a) {
        return a ? sgcd(a, c % a) : c;
    }
    var b = array[0];
    for (var c = 1; c < array.length; c++) {
        b = sgcd(b, array[c]);
    }
    return b;
}
exports.gcd = gcd;
