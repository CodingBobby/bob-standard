"use strict";
exports.__esModule = true;
exports.config = {
    maths: {
        aMode: 'RAD',
        digits: undefined
    }
};
function angleMode(unit) {
    exports.config.maths.aMode = unit;
    if (exports.config.maths.aMode !== unit) {
        throw 'Error setting angle mode.';
    }
    else {
        return "Angle mode set to " + unit + ".";
    }
}
exports.angleMode = angleMode;
function setDigits(count) {
    exports.config.maths.digits = count;
    if (exports.config.maths.digits !== count) {
        throw 'Error setting digit count.';
    }
    else {
        return "Digit count set to " + count + ".";
    }
}
exports.setDigits = setDigits;
function resetDigits() {
    exports.config.maths.digits = undefined;
    if (exports.config.maths.digits !== undefined) {
        throw 'Error setting digit count.';
    }
    else {
        return "Digit count resetted to default.";
    }
}
exports.resetDigits = resetDigits;
