import { devi, round } from './calc'
import { err, say, printArray, colorize } from './helpers';

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
}

export class Line3D {
   public dir: Vector3D
   public pos: Vector3D

   constructor(public from: Vector3D, public to: Vector3D) {
      this.dir = to.sub(from, 1)
      this.pos = from.clone()
   }
}

// MATRICES

// dimension type to allow matrix sizes
type dim<keys, values> = { width: number, height: number}

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

   private fix() { // fix for dividing errors
      let m: Matrix = new Matrix(this.create(this.size().height))
      for(let r in this.data) {
         for(let c in this.data[r]) {
            m.data[c].push(round(this.data[r][c], 15))
         }
      }
      return m
   }

   public transpose(): Matrix {
      let m: Matrix = new Matrix(this.create(this.size().height))
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

      let dets: number[] = []
      let that = this // we need this in the runner() function

      function runner(mat: Matrix) {
         let M = mat.data // shortcut
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
            say('new submatrix created:')
            let str = '\n'
            for(let j in sub.data) {
               let r = ''
               for(let i in sub.data[j]) {
                  r += `${colorize((sub.data[j][i]).toString(), 'yellow')} `
               }
               str += `${r}\n`
            }
            say(str)


            if(sub.size().width > 2) {
               say('running again...')
               runner(sub) // repeats while submatrix is too large
            } else {
               say('det found', sub.raw_det(sub.data))
               dets.push(k*sub.raw_det(sub.data))
            }
         }
      }
      runner(this) // start the recursive loooooooo...

      say('all sub determinants found:')
      console.log(dets)
      let str = ''
      say('calculating...')
      let d: number = 0 // the final determinant
      for(let dd in dets) {
         // alternating between + and -
         if((Number(dd)+1) % 2 == 0) {
            str += ` - ${dets[dd]}`
            d -= dets[dd]
         } else {
            str += ` + ${dets[dd]}`
            d += dets[dd]
         }
      }
      str += ` = ${d}`
      say(str)
      return d
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
      let m: Matrix = new Matrix(this.create(this.size().height))
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
      let m: Matrix = new Matrix(this.create(this.size().height))
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
   public multiply(k: number): Matrix {
      let m: Matrix = new Matrix(this.create(this.size().height))
      for(let j in this.data) {
         for(let i in this.data[j]) {
            m.data[j].push(k * this.data[j][i])
         }
      }
      return m.fix()
   }

   // this returns the inverse of itself, using all the methods above
   public invert(): Matrix {
      // 1. step: find matrix of minors
      let m1 = this.minors()
      // 2. step: turn it into the matrix of cofactors
      let m2 = m1.checkerboard()
      // 3. step: adjugate it
      let m3 = m2.transpose()
      // 4. step: remove the original determinant
      let m4 = m3.multiply(1/this.det())

      return m4
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

}
