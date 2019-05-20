"use strict";
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
var calc_1 = require("./calc");
var helpers_1 = require("./helpers");
// VECTORS
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
    Vector2D.prototype.det = function (other) {
        var a = this.x * other.y;
        var b = this.y * other.x;
        return a - b;
    };
    Vector2D.prototype.rotation = function (other_first, other_second) {
        var p = other_first, q = other_second;
        p.sub(this);
        q.sub(this);
        return p.det(q);
    };
    Vector2D.prototype.line = function (other) {
        return new Line2D(this, other);
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
    Vector3D.prototype.det = function (other_first, other_second) {
        var v1a = new Vector2D(other_first.y, other_first.z);
        var v1b = new Vector2D(other_first.x, other_first.z);
        var v1c = new Vector2D(other_first.x, other_first.y);
        var v2a = new Vector2D(other_second.y, other_second.z);
        var v2b = new Vector2D(other_second.x, other_second.z);
        var v2c = new Vector2D(other_second.x, other_second.y);
        var d = v1a.det(v2a);
        var e = v1b.det(v2b);
        var f = v1c.det(v2c);
        return this.x * d - this.y * e + this.z * f;
    };
    Vector3D.prototype.line = function (other) {
        return new Line3D(this, other);
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
// LINES
var Line2D = /** @class */ (function () {
    function Line2D(from, to) {
        this.from = from;
        this.to = to;
        this.dir = to.sub(from, 1);
        this.pos = from.clone();
    }
    Line2D.prototype.doCross = function (other) {
        return true
            ? this.from.rotation(other.from, other.to)
                * this.to.rotation(other.from, other.to) < 0
            : false;
    };
    return Line2D;
}());
exports.Line2D = Line2D;
var Line3D = /** @class */ (function () {
    function Line3D(from, to) {
        this.from = from;
        this.to = to;
        this.dir = to.sub(from, 1);
        this.pos = from.clone();
    }
    return Line3D;
}());
exports.Line3D = Line3D;
var Matrix = /** @class */ (function () {
    function Matrix(data) {
        this.data = data;
    }
    Matrix.prototype.size = function () {
        var h = 0;
        var w = 0;
        for (var r in this.data) {
            h++;
            var curr = 0;
            for (var i in this.data[r]) {
                curr++;
            }
            if (curr > w) {
                w = curr;
            }
        }
        return { width: w, height: h };
    };
    Matrix.prototype.create = function (height) {
        var mat = [];
        for (var r = 0; r < height; r++) {
            mat.push([]);
        }
        return mat;
    };
    Matrix.prototype.clone = function (cloneData) {
        if (cloneData) {
            return new Matrix(this.data);
        }
        else {
            return new Matrix(this.create(this.size().height));
        }
    };
    Matrix.prototype.fix = function (decimals) {
        var m = this.clone();
        for (var r in this.data) {
            for (var c in this.data[r]) {
                m.data[c].push(calc_1.round(this.data[r][c], decimals));
            }
        }
        return m;
    };
    Matrix.prototype.transpose = function () {
        var m = this.clone();
        for (var r in this.data) {
            for (var c in this.data[r]) {
                m.data[c].push(this.data[r][c]);
            }
        }
        return m;
    };
    // finds det of 2x2 matrix, used in public det()
    Matrix.prototype.raw_det = function (mat) {
        var l = mat[0][0] * mat[1][1];
        var r = mat[0][1] * mat[1][0];
        return l - r;
    };
    Matrix.prototype.det = function () {
        if (this.size().width !== this.size().height) {
            helpers_1.err('Matrix must be square!');
            return undefined;
        }
        // if matrix is already 2x2, so we don't need the stuff below
        if (this.size().width == 2) {
            return this.raw_det(this.data);
        }
        var that = this; // we need this in the runner() function
        function runner(mat) {
            var M = mat.data; // shortcut
            // determinants found in this runner iteration
            var d = 0;
            var c = 1; // counter to keep track of the sign
            // run over first row
            for (var i in M[0]) {
                var k = M[0][i]; // the coefficient
                var sub = new Matrix(that.create(M.length - 1));
                // now add items to the submatrix
                for (var r = 1; r < M.length; r++) { // start in second row
                    for (var j = 0; j < M[r].length; j++) {
                        if (j !== Number(i)) {
                            sub.data[r - 1].push(M[r][j]);
                        }
                    }
                }
                var dd = 0;
                if (sub.size().width > 2) {
                    dd = k * runner(sub); // repeats while submatrix is too large
                }
                else {
                    dd = k * sub.raw_det(sub.data);
                }
                if (c % 2 == 0) {
                    d -= dd;
                }
                else {
                    d += dd;
                }
                c++;
            }
            return d;
        }
        return runner(this); // start the recursive loooooooo...
    };
    // this returns a single minor at a given position
    Matrix.prototype.minor = function (posX, posY) {
        var sub = new Matrix(this.create(this.size().height - 1));
        var c = 0; // counter for y-position in new submatrix
        for (var j in this.data) {
            for (var i in this.data[j]) {
                if (Number(j) !== posY && Number(i) !== posX) {
                    sub.data[c].push(this.data[j][i]);
                }
            }
            // clip y-position to new height
            if (Number(j) !== posY) {
                c++;
            }
        }
        return sub.det();
    };
    // all the minors in a matrix
    Matrix.prototype.minors = function () {
        var m = this.clone();
        // calculate each item
        for (var j in this.data) {
            for (var i in this.data[j]) {
                var min = this.minor(Number(i), Number(j));
                if (min == -0) { // fix weird -0 issue
                    m.data[j].push(0);
                }
                else {
                    m.data[j].push(min);
                }
            }
        }
        return m;
    };
    // returns a "checkerboarded" matrix
    Matrix.prototype.checkerboard = function () {
        var m = this.clone();
        // here we apply a checkerboard to the original
        for (var j in this.data) {
            for (var i in this.data[j]) {
                var x = Number(i);
                var y = Number(j);
                if (this.data[j][i] !== 0) { // ignore zeroes
                    if (x % 2 == 0 && y % 2 == 0 || x % 2 !== 0 && y % 2 !== 0) {
                        m.data[j].push(this.data[j][i]);
                    }
                    else {
                        m.data[j].push(-this.data[j][i]);
                    }
                }
                else {
                    m.data[j].push(this.data[j][i]);
                }
            }
        }
        return m;
    };
    // just a simple multiply-all-items
    Matrix.prototype.multiply = function (k, decimals) {
        var m = this.clone();
        for (var j in this.data) {
            for (var i in this.data[j]) {
                m.data[j].push(k * this.data[j][i]);
            }
        }
        return m.fix(decimals);
    };
    // this returns the inverse of itself, using all the methods above
    Matrix.prototype.invert = function (decimals) {
        // 1. step: find matrix of minors
        var m1 = this.minors();
        // 2. step: turn it into the matrix of cofactors
        var m2 = m1.checkerboard();
        // 3. step: remove the original determinant
        var m3 = m2.multiply(1 / this.det(), decimals || 15);
        return m3;
    };
    // shows which rows and columns have only zeroes in them
    Matrix.prototype.getfree = function () {
        var free = {
            columns: [],
            rows: []
        };
        function helper(m) {
            var frees = [];
            for (var j = 0; j < m.length; j++) {
                var isFree = true;
                for (var i = 0; i < m[j].length; i++) {
                    if (m[j][i] !== 0)
                        isFree = false;
                }
                if (isFree) {
                    frees.push(j);
                }
            }
            return frees;
        }
        free.columns = helper(this.data);
        free.rows = helper(this.transpose().data);
        return free;
    };
    // helper for actual product method
    Matrix.prototype.vec_prod = function (other) {
        var m = this.clone();
        for (var j in this.data) {
            for (var i in this.data[j]) {
                m.data[j].push(this.data[j][i] * other.data[i]);
            }
        }
        return m;
    };
    Matrix.prototype.mat_prod = function (other) {
        var m = this.clone();
        for (var j in this.data) {
            for (var i in this.data[j]) {
                var a = new Vector(this.data[j]);
                var b = new Vector(other.transpose().data[i]);
                m.data[j].push(a.dot(b));
            }
        }
        return m;
    };
    // returns product of mat*mat or mat*vec
    Matrix.prototype.product = function (other) {
        switch (helpers_1.type(other)) {
            case 'Vector': {
                if (other.size().height !== this.size().width) {
                    helpers_1.err('Sizes do not match!');
                    return this;
                }
                return this.vec_prod(other);
            }
            case 'Matrix': {
                if (other.size().height !== this.size().width
                    || other.size().width !== this.size().height) {
                    helpers_1.err('Sizes do not match!');
                    return this;
                }
                return this.mat_prod(other);
            }
        }
    };
    return Matrix;
}());
exports.Matrix = Matrix;
// simple Vector class for any sizes
var Vector = /** @class */ (function () {
    function Vector(data) {
        this.data = data;
    }
    Vector.prototype.size = function () {
        return { width: 1, height: this.data.length };
    };
    // the dot-product of two vectors
    Vector.prototype.dot = function (other) {
        var p = 0;
        for (var i in this.data) {
            p += this.data[i] * other.data[i];
        }
        return p;
    };
    return Vector;
}());
exports.Vector = Vector;
