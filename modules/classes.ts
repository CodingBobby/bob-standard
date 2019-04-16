import { devi } from './calc'

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

export class Matrix {
   public columns: number[][]
   public rows: number[][]

   constructor(vectors: number[][]) {
      if(!this.confirm(vectors)) {
         console.error('wrong dimensions')
         return
      }

      let matrix = this.createHelper(vectors.length, vectors[0].length)
      for(let j in matrix) {
         for(let i in matrix[j]) {
            matrix[j][i] = vectors[i][j]
         }
      }
      this.columns = matrix
      this.rows = this.transpose()
   }

   private confirm(arrays) {
      let lengths: number[] = []
      for(let i in arrays) {
         lengths.push(arrays[i].length)
      }
      return devi(lengths) === 0
   }

   private createHelper(width: number, height: number, item?: number | Function): number[][] {
      let matrix: number[][] = []
      for(let j = 0; j < height; j++) {
         matrix.push([])
         for(let i = 0; i < width; i++) {
            let n: number = 0
            if(typeof item == 'function') {
               n = item()
            } else if(typeof item == 'number') {
               n = item
            }
            matrix[j].push(n)
         }
      }
      return matrix
   }

   static create(width: number, height: number, item?: number | Function): Matrix {
      item = item || 0
      function helper(width: number, height: number, item?: number | Function): number[][] {
         let matrix: number[][] = []
         for(let j = 0; j < height; j++) {
            matrix.push([])
            for(let i = 0; i < width; i++) {
               let n: number = 0
               if(typeof item == 'function') {
                  n = item()
               } else if(typeof item == 'number') {
                  n = item
               }
               matrix[j].push(n)
            }
         }
         return matrix
      }
      let tmp = new Matrix(helper(width, height, item))
      return new Matrix(tmp.transpose())
   }

   public transpose() {
      let n: number[][] = []
      let m: number[][] = this.columns
      let l: number = m[0].length

      for(let i = 0; i < l; i++) {
         n.push([])
      }
      for(let j in m) {
         for(let i in m[j]) {
            n[i].push(m[j][i])
         }
      }
      return n
   }
}
