"use strict";
// VECTORS
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2D.prototype.clone = function () {
        return new Vector2D(this.x, this.y);
    };
    Vector2D.prototype.expand = function (z) {
        z = z || 0;
        return new Vector3D(this.x, this.y, z);
    };
    Vector2D.prototype.times = function (factor, newInstance) {
        var fx, fy;
        if (factor instanceof Vector2D) {
            fx = factor.x;
            fy = factor.y;
        }
        else {
            fx = factor;
            fy = factor;
        }
        if (newInstance) {
            return new Vector2D(this.x * fx, this.y * fy);
        }
        else {
            this.x *= fx;
            this.y *= fy;
        }
    };
    Vector2D.prototype.add = function (other, newInstance) {
        if (newInstance) {
            return new Vector2D(this.x + other.x, this.y + other.y);
        }
        else {
            this.x += other.x;
            this.y += other.y;
        }
    };
    Vector2D.prototype.sub = function (other, newInstance) {
        if (newInstance) {
            return new Vector2D(this.x - other.x, this.y - other.y);
        }
        else {
            this.x -= other.x;
            this.y -= other.y;
        }
    };
    Vector2D.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Vector2D.prototype.cross = function (other) {
        var v1 = this.expand(), v2;
        if (other instanceof Vector2D) {
            v2 = other.expand();
        }
        else {
            v2 = other;
        }
        return v1.cross(v2, 1);
    };
    Vector2D.prototype.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2D.prototype.norm = function (newInstance) {
        var mag = this.mag();
        var div = (mag === 0) ? Infinity : 1 / mag;
        if (newInstance) {
            return this.times(div, 1);
        }
        else {
            this.times(div);
        }
    };
    return Vector2D;
}());
exports.Vector2D = Vector2D;
var Vector3D = /** @class */ (function () {
    function Vector3D(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3D.prototype.clone = function () {
        return new Vector3D(this.x, this.y, this.z);
    };
    Vector3D.prototype.times = function (factor, newInstance) {
        var fx, fy, fz;
        if (factor instanceof Vector3D) {
            fx = factor.x;
            fy = factor.y;
            fz = factor.z;
        }
        else {
            fx = factor;
            fy = factor;
            fz = factor;
        }
        if (newInstance) {
            return new Vector3D(this.x * fx, this.y * fy, this.z * fz);
        }
        else {
            this.x *= fx;
            this.y *= fy;
            this.z *= fz;
        }
    };
    Vector3D.prototype.add = function (other, newInstance) {
        if (other instanceof Vector2D) {
            other = other.expand();
        }
        if (newInstance) {
            return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
        }
        else {
            this.x += other.x;
            this.y += other.y;
            this.z += other.z;
        }
    };
    Vector3D.prototype.sub = function (other, newInstance) {
        if (newInstance) {
            return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z);
        }
        else {
            this.x -= other.x;
            this.y -= other.y;
            this.z -= other.z;
        }
    };
    Vector3D.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    };
    Vector3D.prototype.cross = function (other, newInstance) {
        var v1 = this;
        var v2 = other;
        if (newInstance) {
            return new Vector3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
        }
        else {
            this.x = v1.y * v2.z - v1.z * v2.y;
            this.y = v1.z * v2.x - v1.x * v2.z;
            this.z = v1.x * v2.y - v1.y * v2.x;
        }
    };
    Vector3D.prototype.mag = function () {
        return Math.cbrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3D.prototype.norm = function (newInstance) {
        var mag = this.mag();
        var div = (mag === 0) ? Infinity : 1 / mag;
        if (newInstance) {
            return this.times(div, 1);
        }
        else {
            this.times(div);
        }
    };
    return Vector3D;
}());
exports.Vector3D = Vector3D;
// ANGLES
var Angle = /** @class */ (function () {
    function Angle() {
    }
    Angle.prototype.toRAD = function (source) {
        return Math.PI / source;
    };
    Angle.prototype.toDRG = function (source) {
        return (source * 2 * Math.PI) / 360;
    };
    return Angle;
}());
var Angle2D = /** @class */ (function (_super) {
    __extends(Angle2D, _super);
    function Angle2D(x, y, isPiFrac) {
        var _this = _super.call(this) || this;
        isPiFrac = isPiFrac || 0;
        if (isPiFrac === 1) {
            _this.a = _this.toRAD(x);
            _this.b = _this.toRAD(y);
        }
        else {
            _this.a = _this.toDRG(x);
            _this.b = _this.toDRG(y);
        }
        return _this;
    }
    return Angle2D;
}(Angle));
exports.Angle2D = Angle2D;
var Angle3D = /** @class */ (function (_super) {
    __extends(Angle3D, _super);
    function Angle3D(x, y, z, isPiFrac) {
        var _this = _super.call(this) || this;
        isPiFrac = isPiFrac || 0;
        if (isPiFrac === 1) {
            _this.a = _this.toRAD(x);
            _this.b = _this.toRAD(y);
            _this.c = _this.toRAD(z);
        }
        else {
            _this.a = _this.toDRG(x);
            _this.b = _this.toDRG(y);
            _this.c = _this.toDRG(z);
        }
        return _this;
    }
    return Angle3D;
}(Angle));
exports.Angle3D = Angle3D;
