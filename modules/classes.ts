import { round } from './calc'
import { err, say } from './helpers'
import { axis, dim } from './types'

// VECTORS

export class Vector2D {
   constructor(public x: number, public y: number) {}

   public clone(): Vector2D {
      return new Vector2D(this.x, this.y)
   }

   public expand(z?: number): Vector3D {
      z = z || 0
      return new Vector3D(this.x, this.y, z)
   }

   public times(factor: number | Vector2D, newInstance?: 1): Vector2D {
      let fx: number, fy: number
      if(factor instanceof Vector2D) {
         fx = factor.x
         fy = factor.y
      } else {
         fx = factor
         fy = factor
      }
      if(newInstance) {
         return new Vector2D(this.x * fx, this.y * fy)
      } else {
         this.x *= fx
         this.y *= fy
      }
   }

   public add(other: Vector2D, newInstance?: 1): Vector2D {
      if(newInstance) {
         return new Vector2D(this.x + other.x, this.y + other.y)
      } else {
         this.x += other.x
         this.y += other.y
      }
   }

   public sub(other: Vector2D, newInstance?: 1): Vector2D {
      if(newInstance) {
         return new Vector2D(this.x - other.x, this.y - other.y)
      } else {
         this.x -= other.x
         this.y -= other.y
      }
   }

   public dot(other: Vector2D): number {
      return this.x * other.x + this.y * other.y
   }

   public cross(other: Vector2D | Vector3D): Vector3D {
      let v1 = this.expand(), v2: any
      if(other instanceof Vector2D) {
         v2 = other.expand()
      } else {
         v2 = other
      }

      return v1.cross(v2, 1)
   }

   public mag(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y)
   }

   public norm(newInstance?: 1): Vector2D {
      let mag = this.mag()
      let div = (mag === 0) ? Infinity : 1 / mag
      if(newInstance) {
         return this.times(div, 1)
      } else {
         this.times(div)
      }
   }

   public det(other: Vector2D): number {
      let a = this.x * other.y
      let b = this.y * other.x
      return a - b
   }

   public rotation(other_first: Vector2D, other_second: Vector2D): number {
      let p = other_first, q = other_second
      p.sub(this)
      q.sub(this)
      return p.det(q)
   }

   public line(other: Vector2D): Line2D {
      return new Line2D(this, other)
   }
}

export class Vector3D {
   constructor(public x: number, public y: number, public z: number) {}

   public clone(): Vector3D {
      return new Vector3D(this.x, this.y, this.z)
   }

   public times(factor: number | Vector3D, newInstance?: 1): Vector3D {
      let fx: number, fy: number, fz: number
      if(factor instanceof Vector3D) {
         fx = factor.x
         fy = factor.y
         fz = factor.z
      } else {
         fx = factor
         fy = factor
         fz = factor
      }
      if(newInstance) {
         return new Vector3D(this.x * fx, this.y * fy, this.z * fz)
      } else {
         this.x *= fx
         this.y *= fy
         this.z *= fz
      }
   }

   public add(other: Vector2D | Vector3D, newInstance?: 1): Vector3D {
      if(other instanceof Vector2D) {
         other = other.expand()
      }
      if(newInstance) {
         return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z)
      } else {
         this.x += other.x
         this.y += other.y
         this.z += other.z
      }
   }

   public sub(other: Vector3D, newInstance?: 1): Vector3D {
      if(newInstance) {
         return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z)
      } else {
         this.x -= other.x
         this.y -= other.y
         this.z -= other.z
      }
   }

   public dot(other: Vector3D): number {
      return this.x * other.x + this.y * other.y + this.z * other.z
   }

   public cross(other: Vector3D, newInstance?: 1) {
      let v1 = this
      let v2 = other
      if(newInstance) {
         return new Vector3D(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
         )
      } else {
         this.x = v1.y * v2.z - v1.z * v2.y
         this.y = v1.z * v2.x - v1.x * v2.z
         this.z = v1.x * v2.y - v1.y * v2.x
      }
   }

   public mag(): number {
      return Math.cbrt(this.x * this.x + this.y * this.y + this.z * this.z)
   }

   public norm(newInstance?: 1): Vector3D {
      let mag = this.mag()
      let div = (mag === 0) ? Infinity : 1 / mag
      if(newInstance) {
         return this.times(div, 1)
      } else {
         this.times(div)
      }
   }

   public det(other_first: Vector3D, other_second: Vector3D): number {
      let v1a = new Vector2D(other_first.y, other_first.z)
      let v1b = new Vector2D(other_first.x, other_first.z)
      let v1c = new Vector2D(other_first.x, other_first.y)

      let v2a = new Vector2D(other_second.y, other_second.z)
      let v2b = new Vector2D(other_second.x, other_second.z)
      let v2c = new Vector2D(other_second.x, other_second.y)

      let d = v1a.det(v2a)
      let e = v1b.det(v2b)
      let f = v1c.det(v2c)
      return this.x * d - this.y * e + this.z * f
   }

   public line(other: Vector3D): Line3D {
      return new Line3D(this, other)
   }
}

// ANGLES

class Angle {
   toRAD(source: number) {
      return Math.PI / source
   }
   toDRG(source: number) {
      return (source * 2 * Math.PI) / 360
   }
}

export class Angle2D extends Angle {
   public a: number
   public b: number

   constructor(x: number, y: number, isPiFrac?: 0 | 1) {
      super()
      isPiFrac = isPiFrac || 0

      if(isPiFrac === 1) {
         this.a = this.toRAD(x)
         this.b = this.toRAD(y)
      } else {
         this.a = this.toDRG(x)
         this.b = this.toDRG(y)
      }
   }
}

export class Angle3D extends Angle {
   public a: number
   public b: number
   public c: number

   constructor(x: number, y: number, z: number, isPiFrac?: 0 | 1) {
      super()
      isPiFrac = isPiFrac || 0

      if(isPiFrac === 1) {
         this.a = this.toRAD(x)
         this.b = this.toRAD(y)
         this.c = this.toRAD(z)
      } else {
         this.a = this.toDRG(x)
         this.b = this.toDRG(y)
         this.c = this.toDRG(z)
      }
   }
}

// LINES

export class Line2D {
   public dir: Vector2D
   public pos: Vector2D

   constructor(public from: Vector2D, public to: Vector2D) {
      this.dir = to.sub(from, 1)
      this.pos = from.clone()
   }

   public doCross(other: Line2D): boolean {
      return true
         ? this.from.rotation(other.from, other.to)
            * this.to.rotation(other.from, other.to) < 0
         : false
   }

   public slope(): number {
      let den: number = this.dir.y - this.pos.y
      let nom: number = this.dir.x - this.pos.x
      return den/nom
   }

   public intercept(): number {
      return this.pos.y-(this.slope() * this.pos.x)
   }
}

export class Line3D {
   public dir: Vector3D
   public pos: Vector3D

   constructor(public from: Vector3D, public to: Vector3D) {
      this.dir = to.sub(from, 1)
      this.pos = from.clone()
   }

   public slope(through: axis): number {
      let _this = this
      let sl: number
      // this calculates the slope and takes the axis names
      function calc(ax1: axis, ax2: axis) {
         // first we map the existing start and end position of _this onto a 2D version by ignoring the third axis, we're looking from
         let vpos = new Vector2D(_this.pos[ax1], _this.pos[ax2])
         let vdir = new Vector2D(_this.dir[ax1], _this.dir[ax2])
         // then we create a new 2D line from it and return it's slope
         let line = new Line2D(vpos, vdir)
         return line.slope()
      }
      // here we check which axis was entered and calculate the corresponding slope
      switch(through) {
         case 'x': {
            sl = calc('y', 'z')
            break
         }
         case 'y': {
            sl = calc('z', 'x')
            break
         }
         case 'z': {
            sl = calc('x', 'y')
            break
         }
      }
      return sl
   }
}

export class Plane {
   public form: String

   constructor(public pos: Vector3D, public dir1: Vector3D, public dir2: Vector3D) {
      this.form = 'normal'
   }

   static fromPoints(A: Vector3D, B: Vector3D, C: Vector3D): Plane {
      let pos: Vector3D
      let dir1: Vector3D
      let dir2: Vector3D
   
      let a = A.mag()
      let b = B.mag()
      let c = C.mag()
   
      if(a < b) {
         if(c < a) {
            pos = C
            dir1 = A.norm(1)
            dir2 = B.norm(1)
         } else {
            pos = A
            dir1 = B.norm(1)
            dir2 = C.norm(1)
         }
      } else {
         if(c < b) {
            pos = C
            dir1 = A.norm(1)
            dir2 = B.norm(1)
         } else {
            pos = B
            dir1 = A.norm(1)
            dir2 = C.norm(1)
         }
      }
   
      return new Plane(pos, dir1, dir2)
   }
}

// MATRICES

export class Matrix {
   constructor(public data: number[][]) {}

   public size(): dim<number, number> {
      let h: number = 0
      let w: number = 0
      for(let r in this.data) {
         h++
         let curr: number = 0
         for(let i in this.data[r]) {
            curr++
         }
         if(curr > w) {
            w = curr
         }
      }
      return { width: w, height: h }
   }

   public create(height: number): any[][] {
      let mat = []
      for(let r=0; r<height; r++) {
         mat.push([])
      }
      return mat
   }

   public clone(cloneData?: 1): Matrix {
      if(cloneData) {
         return new Matrix(this.data)
      } else {
         return new Matrix(this.create(this.size().height))
      }  
   }

   private fix(decimals) { // fix for dividing errors
      let m: Matrix = this.clone()
      for(let r in this.data) {
         for(let c in this.data[r]) {
            m.data[c].push(round(this.data[r][c], decimals))
         }
      }
      return m
   }

   public transpose(): Matrix {
      let m: Matrix = this.clone()
      for(let r in this.data) {
         for(let c in this.data[r]) {
            m.data[c].push(this.data[r][c])
         }
      }
      return m
   }

   // finds det of 2x2 matrix, used in public det()
   private raw_det(mat: number[][]): number {
      let l: number = mat[0][0] * mat[1][1]
      let r: number = mat[0][1] * mat[1][0]
      return l-r
   }

   public det(): number {
      if(this.size().width !== this.size().height) {
         err('Matrix must be square!')
         return undefined
      }

      // if matrix is already 2x2, so we don't need the stuff below
      if(this.size().width == 2) {
         return this.raw_det(this.data)
      }
      let that = this // we need this in the runner() function

      function runner(mat: Matrix) {
         let M = mat.data // shortcut
         // determinants found in this runner iteration
         let d: number = 0
         let c: number = 1 // counter to keep track of the sign
         // run over first row
         for(let i in M[0]) {
            let k: number = M[0][i] // the coefficient
            let sub: Matrix = new Matrix(that.create(M.length-1))
            // now add items to the submatrix
            for(let r=1; r<M.length; r++) { // start in second row
               for(let j=0; j<M[r].length; j++) {
                  if(j !== Number(i)) {
                     sub.data[r-1].push(M[r][j])
                  }
               }
            }

            let dd: number = 0
            if(sub.size().width > 2) {
               dd = k*runner(sub) // repeats while submatrix is too large
            } else {
               dd = k*sub.raw_det(sub.data)
            }

            if(c%2 == 0) {
               d -= dd
            } else {
               d += dd
            }
            c++
         }
         return d
      }

      return runner(this) // start the recursive loooooooo...
   }

   // this returns a single minor at a given position
   private minor(posX: number, posY: number): number {
      let sub: Matrix = new Matrix(this.create(this.size().height-1))
      let c: number = 0 // counter for y-position in new submatrix
      for(let j in this.data) {
         for(let i in this.data[j]) {
            if(Number(j) !== posY && Number(i) !== posX) {
               sub.data[c].push(this.data[j][i])
            }
         }
         // clip y-position to new height
         if(Number(j) !== posY) {
            c++
         }
      }
      return sub.det()
   }

   // all the minors in a matrix
   public minors(): Matrix {
      let m: Matrix = this.clone()
      // calculate each item
      for(let j in this.data) {
         for(let i in this.data[j]) {
            let min = this.minor(Number(i), Number(j))
            if(min == -0) { // fix weird -0 issue
               m.data[j].push(0)
            } else {
               m.data[j].push(min)
            }
            
         }
      }
      return m
   }

   // returns a "checkerboarded" matrix
   public checkerboard() {
      let m: Matrix = this.clone()
      // here we apply a checkerboard to the original
      for(let j in this.data) {
         for(let i in this.data[j]) {
            let x: number = Number(i)
            let y: number = Number(j)
            if(this.data[j][i] !== 0) { // ignore zeroes
               if(x%2 == 0 && y%2 == 0 || x%2 !== 0 && y%2 !== 0) {
                  m.data[j].push(this.data[j][i])
               } else {
                  m.data[j].push(-this.data[j][i])
               }
            } else {
               m.data[j].push(this.data[j][i])
            }
         }
      }
      return m
   }

   // just a simple multiply-all-items
   public multiply(k: number, decimals: number): Matrix {
      let m: Matrix = this.clone()
      for(let j in this.data) {
         for(let i in this.data[j]) {
            m.data[j].push(k * this.data[j][i])
         }
      }
      return m.fix(decimals)
   }

   // this returns the inverse of itself, using all the methods above
   public invert(decimals?: number): Matrix {
      // 1. step: find matrix of minors
      let m1 = this.minors()
      // 2. step: turn it into the matrix of cofactors
      let m2 = m1.checkerboard()
      // 3. step: remove the original determinant
      let m3 = m2.multiply(1/this.det(), decimals || 15)

      return m3
   }

   // shows which rows and columns have only zeroes in them
   public getfree() {
      let free = {
         columns: [],
         rows: []
      }

      function helper(m) {
         let frees = []
         for(let j=0; j<m.length; j++) {
            let isFree = true
            for(let i=0; i<m[j].length; i++) {
               if(m[j][i] !== 0) isFree = false
            }
            if(isFree) {
               frees.push(j)
            }
         }
         return frees
      }

      free.columns = helper(this.data)
      free.rows = helper(this.transpose().data)
      return free
   }

   public vec_prod(other): Vector {
      if(other.size().height !== this.size().width) {
         err('Sizes do not match!')
         return
      }
      let m: Vector = new Vector([])
      for(let j in this.data) {
         let jv: Vector = new Vector(this.data[j])
         m.data.push(jv.dot(other))
      } 
      return m
   }

   public mat_prod(other): Matrix {
      if(other.size().height !== this.size().width
            || other.size().width !== this.size().height) {
         err('Sizes do not match!')
         return
      }
      let m: Matrix = this.clone()
      for(let j in this.data) {
         for(let i in this.data[j]) {
            let a: Vector = new Vector(this.data[j])
            let b: Vector = new Vector(other.transpose().data[i])
            m.data[j].push(a.dot(b))
         }
      } 
      return m
   }

}

// simple Vector class for any sizes
export class Vector {
   constructor(public data: number[]) {}

   public size(): dim<number, number> {
      return { width: 1, height: this.data.length }
   }

   // the dot-product of two vectors
   public dot(other: Vector): number {
      let p: number = 0
      for(let i in this.data) {
         p += this.data[i] * other.data[i]
      }
      return p
   }

   // used for polynomic regression
   /**
    * uses this Vector instance as a independent dataset to generate a Vandermonde matrix
    */
   public design(): Matrix {
      let vm = []
      for(let i=0; i<this.size().height; i++) {
         // creates matrix with same height as this Vector
         vm.push([])
         for(let d=0; d<this.size().height; d++) {
            if(d == 0) {
               // the first column always becomes 1 as it
               // would have a power of 0, so to save computation
               // time, we simply push the 1
               vm[i].push(1)
            } else {
               // now we insert the data powered to it's index
               vm[i].push(Math.pow(this.data[i], d))
            }
         }
      }
      // create a new Matrix instance from above and return it
      return new Matrix(vm)
   }

   // used for polynomic regression
   /**
    * takes a dataset of dependent values in form of a Vector
    */
   public reg_coeff(dependent: Vector): Vector {
      // the Vandermonde design matrix we will work with
      let vand: Matrix = this.design()

      // following steps compute the vector of regression coefficients
      // 1. we transpose the Vandermonde matrix
      let m1: Matrix = vand.transpose()
      // 2. find the transposal cross product
      let m2: Matrix = m1.mat_prod(vand)
      // 3. this inverts the whole thing with maximum accuracy
      let m3: Matrix = m2.invert(100)
      // 4. now we use the transpose again
      let m4: Matrix = m3.mat_prod(m1)

      // here we finally insert the dependent dataset
      return m4.vec_prod(dependent)
   }

}


// class for regression, at creation, it takes the data samples for the dependent and independent values
// then the regression can be calculated
/**
 * USAGE:
 * let data = new Dataset([], [])
 * let reg  = new Regression(data)
 */
export class Regression {
   // this only takes the data in form of a Dataset instance,
   // calculation must be done manually
   constructor(public data: Dataset) {}

   // this runs the actual regression
   public calculate(order: number) {
      let indep = new Vector(this.data.independent)
      let dep = new Vector(this.data.dependent)

      let coeff = indep.reg_coeff(dep)

      if(order > coeff.size().height) {
         err('Requested order cannot be computed! ')
         return undefined
      }
   }

   // with this the calculated regression can be used,
   // returns the corresponding y-value by applying the polynomic function
   public predict(independent: number) {

   }

   // gives the R^2 ~~goodness~~ goddess coefficient
   public r2() {

   }
}


export class Dataset {
   constructor(public dependent: number[], public independent: number[]) {}
}
