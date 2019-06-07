"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
var calc_1 = require("./calc");
var Rectificator = /** @class */ (function () {
    // constructor(public subtanceA: Molecule, public substanceB: Molecule) {}
    function Rectificator(a, xA, xF, xD) {
        // tells if the whole thing is ready for calcualtions
        this.valid = false;
        this.a = Number(a);
        this.xA = Number(xA);
        this.xF = Number(xF);
        this.xD = Number(xD);
        this.valid = true;
    }
    Rectificator.prototype.theoreticSteps = function () {
        var numA = calc_1.log(this.xD / (1 - this.xD));
        var numB = calc_1.log(this.xA / (1 - this.xA));
        var den = calc_1.log(this.a);
        return calc_1.round((numA - numB) / den, 1);
    };
    Rectificator.prototype.minimumSteps = function () {
        if (!this.valid) {
            throw 'something is missing';
        }
        var curr = this.xD;
        var steps = 0;
        while (curr > this.xA) {
            curr = this.VLE(curr, 1);
            steps++;
        }
        return steps;
    };
    Rectificator.prototype.optimalSteps = function () {
        if (!this.valid) {
            throw 'something is missing';
        }
        // the real intersection when using optimal back feed
        // let b_axis = this.xD/(this.minimumBackFeed()+1)
        var b_axis = this.xD + (this.optimalBackFeed() * this.xD);
        var b_inter = calc_1.lin(this.xF, 0, b_axis, this.xD, this.xD);
        var currX = this.xD;
        var currY = currX;
        var steps = 0;
        while (currX > this.xA) {
            if (currY <= 0 || currY >= 1) {
                currX = 0;
                currY = 0;
            }
            currX = calc_1.round(this.VLE(currY, 1), 5);
            if (currX > this.xF) {
                currY = calc_1.lin(currX, this.xF, b_inter, this.xD, this.xD);
            }
            else if (currX > this.xA) {
                currY = calc_1.lin(currX, this.xA, this.xA, this.xF, b_inter);
            }
            else {
                currY = currX;
            }
            steps++;
            if (steps >= 50) {
                currY = 0;
                currX = 0;
                helpers_1.err('unrealistic, would require 50+ steps!');
            }
        }
        return steps;
    };
    Rectificator.prototype.minimumBackFeed = function () {
        if (!this.valid) {
            throw 'something is missing';
        }
        // the y-value where xF crosses VLE
        var b_inter = this.VLE(this.xD);
        var b_axis = calc_1.linB(this.xF, b_inter, this.xD, this.xD);
        var v_min = (this.xD - b_axis) / b_axis;
        return calc_1.round(v_min, 3);
    };
    Rectificator.prototype.optimalBackFeed = function () {
        if (!this.valid) {
            throw 'something is missing';
        }
        return calc_1.round(0.8 * this.minimumBackFeed(), 3);
    };
    // the Vapour-Liquid-Equilibrium state, function returns value of y when
    // input is x, can calculate backwards when optional "back" argument is given
    // X and Y (the input) are percentages of mass concentration of the liquid (X)
    // and the Vapour (Y) phase of two substances
    // the required alpha (a) is taken from this.'``
    Rectificator.prototype.VLE = function (input, back) {
        if (input > 1 || input < 0) {
            console.log(input);
            throw 'invalid arguments';
        }
        else {
            if (back) {
                var den = this.a * (-input);
                return input / (den + this.a + input);
            }
            else {
                var num = input * this.a;
                var den = input * (this.a - 1);
                return num / (1 + den);
            }
        }
    };
    Rectificator.prototype.layout = function () {
        var out = '';
        out += helpers_1.colorize('LAYOUT OF A RECTIFICATION PROCESS', 'red', 'white');
        out += '\n';
        out += '\n';
        out += "| " + helpers_1.colorize('parameter', 'red') + "       | " + helpers_1.colorize('value', 'red') + "      |";
        out += '\n';
        out += '|-----------------|------------|';
        out += '\n';
        out += "| " + helpers_1.colorize('rel. volatility', 'yellow') + " |      " + helpers_1.colorize(this.a.toString(), 'green') + "  |";
        out += '\n';
        out += "|            " + helpers_1.colorize('feed', 'yellow') + " |      " + helpers_1.colorize(this.xF.toString(), 'green') + "   |";
        out += '\n';
        out += "|       " + helpers_1.colorize('destilate', 'yellow') + " |      " + helpers_1.colorize(this.xD.toString(), 'green') + "  |";
        out += '\n';
        out += "|            " + helpers_1.colorize('rest', 'yellow') + " |      " + helpers_1.colorize(this.xA.toString(), 'green') + "  |";
        out += '\n';
        out += '|-----------------|------------|';
        out += '\n';
        out += "|       " + helpers_1.colorize('th. steps', 'yellow') + " |     " + helpers_1.colorize(this.theoreticSteps().toString(), 'green') + "    |";
        out += '\n';
        out += "|      " + helpers_1.colorize('min. steps', 'yellow') + " |     " + helpers_1.colorize(this.minimumSteps().toString(), 'green') + "      |";
        out += '\n';
        out += "|      " + helpers_1.colorize('opt. steps', 'yellow') + " |     " + helpers_1.colorize(this.optimalSteps().toString(), 'green') + "      |";
        out += '\n';
        out += "|   " + helpers_1.colorize('min. backfeed', 'yellow') + " |     " + helpers_1.colorize(this.minimumBackFeed().toString(), 'green') + " |";
        out += '\n';
        out += "|   " + helpers_1.colorize('opt. backfeed', 'yellow') + " |     " + helpers_1.colorize(this.optimalBackFeed().toString(), 'green') + " |";
        return console.log(out);
    };
    return Rectificator;
}());
exports.Rectificator = Rectificator;
