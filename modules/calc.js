"use strict";
exports.__esModule = true;
var checks_1 = require("./checks");
var constants_1 = require("./constants");
var configurator_1 = require("./configurator");
// TRIGONOMETRIC functions
// allow to use radians and degrees for angles, to change the mode,
// you can use angleMode() from the configurator module
function sin(x) {
    var y = configurator_1.config.maths.aMode == 'RAD' ? x : x * constants_1.pi / 180;
    return fix(Math.sin(y));
}
exports.sin = sin;
function cos(x) {
    var y = configurator_1.config.maths.aMode == 'RAD' ? x : x * constants_1.pi / 180;
    return fix(Math.cos(y));
}
exports.cos = cos;
function tan(x) {
    var y = configurator_1.config.maths.aMode == 'RAD' ? x : x * constants_1.pi / 180;
    return fix(Math.tan(y));
}
exports.tan = tan;
function asin(x) {
    return fix(Math.asin(x));
}
exports.asin = asin;
function acos(x) {
    return fix(Math.acos(x));
}
exports.acos = acos;
function atan(x) {
    return fix(Math.atan(x));
}
exports.atan = atan;
function sinh(x) {
    var y = configurator_1.config.maths.aMode == 'RAD' ? x : x * constants_1.pi / 180;
    return fix(Math.sinh(y));
}
exports.sinh = sinh;
function cosh(x) {
    var y = configurator_1.config.maths.aMode == 'RAD' ? x : x * constants_1.pi / 180;
    return fix(Math.cosh(y));
}
exports.cosh = cosh;
function tanh(x) {
    var y = configurator_1.config.maths.aMode == 'RAD' ? x : x * constants_1.pi / 180;
    return fix(Math.tanh(y));
}
exports.tanh = tanh;
// improved logarithm function, accepts an oprional base
// default base is e but can be changed to anything
function log(x, base) {
    return fix(Math.log(x) / (base ? Math.log(base) : 1));
}
exports.log = log;
// rounds floats to a given number of digits after the decimal point
// default is 0 which then yields an integer
function round(x, digits) {
    digits = digits || 0;
    return Number(x.toFixed(digits));
}
exports.round = round;
// floors a float to an integer
function floor(x) {
    return (round(x) - x < 0) ? round(x) : round(x - 0.5);
}
exports.floor = floor;
// ceils a float to an integer
function ceil(x) {
    return (round(x) - x > 0) ? round(x) : round(x + 0.5);
}
exports.ceil = ceil;
// sums up the numbers in an array
function sum(items) {
    var s = 0;
    items.forEach(function (e) { return s += e; });
    return s;
}
exports.sum = sum;
// finds the greatest common divisor in an array
function gcd(items) {
    // helper function to get the gcd of two numbers
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
// find mean value of number array (average)
function mean(items) {
    return sum(items) / items.length;
}
exports.mean = mean;
// find median of number array
function medi(items) {
    var a = min(items);
    var b = max(items);
    return (a + b) / 2;
}
exports.medi = medi;
// find maximum difference to mean value
function devi(items) {
    var m = mean(items);
    var a = m - min(items);
    var b = max(items) - m;
    return a > b ? a : b;
}
exports.devi = devi;
// finds minimum value of number array
function min(items) {
    var m = items[0];
    items.forEach(function (e) { return e < m ? m = e : m; });
    return m;
}
exports.min = min;
// finds maximum value of number array
function max(items) {
    var m = items[0];
    items.forEach(function (e) { return e > m ? m = e : m; });
    return m;
}
exports.max = max;
// simple factorial or !-function
function factorial(x) {
    var f = 1;
    for (var i = 1; i <= x; i++) {
        f *= i;
    }
    return f;
}
exports.factorial = factorial;
// returns the value of the gaussian normal distribution at the given value x,
// the optional calc lets you calulate the value manually, if not set or set to false,
// the result will be read from PHITABLE from the constants module. Last method rounds
// the input value to three digits and the output value to five digits. Input values above
// 4 or below -4 will be set to 1 and 0 respectively
function normDist(x, calc) {
    if (calc) {
        var erfx = erf(x / constants_1.r2);
        return (erfx + 1) * 0.5;
    }
    else {
        if (x > 1 && x <= 4) {
            return round(constants_1.PHITABLE[round(x, 3)], 5);
        }
        else if (x > 4) {
            return 1;
        }
        else if (x < 0 && x >= -4) {
            return round(1 - constants_1.PHITABLE[round(abs(x), 3)], 5);
        }
        else if (x < -4) {
            return 0;
        }
    }
}
exports.normDist = normDist;
// returns the positive value of a negative input number
function abs(x) {
    if (x < 0) {
        return x * x + x;
    }
    else {
        return x;
    }
}
exports.abs = abs;
// returns the error function of x,
// can approximate optionally for very quick calculation
function erf(x, approx) {
    if (approx) {
        var p = 0.3275911;
        var a1 = 0.254829592;
        var a2 = -0.284496736;
        var a3 = 1.421413741;
        var a4 = -1.453152027;
        var a5 = 1.061405429;
        var px = 1 + p * x;
        var t = 1 / px;
        var xs = Math.pow(x, 2);
        var ex = Math.exp(-xs);
        var sum1 = a1 * t;
        var sum2 = a2 * Math.pow(t, 2);
        var sum3 = a3 * Math.pow(t, 3);
        var sum4 = a4 * Math.pow(t, 4);
        var sum5 = a5 * Math.pow(t, 5);
        var sum_1 = sum1 + sum2 + sum3 + sum4 + sum5;
        var term = sum_1 * ex;
        return 1 - term;
    }
    else {
        var a = 2 / constants_1.rpi;
        var c = Math.pow(x, 2);
        // virtual inifinity to limit the loop, still provides
        // very high accuracy
        var inf = 24;
        var sum_2 = 0;
        for (var n = 0; n < inf; n++) {
            var b = 2 * n + 1;
            var part = x / b;
            var prod = 1;
            for (var k = 1; k <= n; k++) {
                prod *= -(c / k);
            }
            sum_2 += part * prod;
        }
        return a * sum_2;
    }
}
exports.erf = erf;
// PRIVATE helpers for this module
// rounds small numbers to 10^-15
function fix(x) {
    return round(x, 15);
}
// returns the slope of a line
function lin_m(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
}
exports.lin_m = lin_m;
// returns y-axis offset of linear equation that runs
// through the points (x1, y1) and (x2, y2)
function lin_b(x1, y1, x2, y2) {
    var m = lin_m(x1, y1, x2, y2);
    return y1 - (m * x1);
}
exports.lin_b = lin_b;
// returns y-value for input x-value for a line between
// (x1, y1) and (x2, y2)
function lin(x, x1, y1, x2, y2) {
    var m = lin_m(x1, y1, x2, y2);
    var b = lin_b(x1, y1, x2, y2);
    return m * x + b;
}
exports.lin = lin;
