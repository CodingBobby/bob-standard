"use strict";
exports.__esModule = true;
exports.config = {
    maths: {
        aMode: 'RAD'
    }
};
function angleMode(unit) {
    exports.config.maths.aMode = unit;
    if (exports.config.maths.aMode !== unit) {
        throw 'Error setting angle mode.';
    }
}
exports.angleMode = angleMode;
