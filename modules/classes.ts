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

   public times(factor: number | Vector2D, newInstance?: 1): void | Vector2D {
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

   public add(other: Vector2D, newInstance?: 1): void | Vector2D {
      if(newInstance) {
         return new Vector2D(this.x + other.x, this.y + other.y)
      } else {
         this.x += other.x
         this.y += other.y
      }
   }

   public sub(other: Vector2D, newInstance?: 1): void | Vector2D {
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

   public norm(newInstance?: 1): void | Vector2D {
      let mag = this.mag()
      let div = (mag === 0) ? Infinity : 1 / mag
      if(newInstance) {
         return this.times(div, 1)
      } else {
         this.times(div)
      }
   }
}

export class Vector3D {
   constructor(public x: number, public y: number, public z: number) {}

   public clone(): Vector3D {
      return new Vector3D(this.x, this.y, this.z)
   }

   public times(factor: number | Vector3D, newInstance?: 1): void | Vector3D {
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

   public add(other: Vector2D | Vector3D, newInstance?: 1): void | Vector3D {
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

   public sub(other: Vector3D, newInstance?: 1): void | Vector3D {
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

   public norm(newInstance?: 1): void | Vector3D {
      let mag = this.mag()
      let div = (mag === 0) ? Infinity : 1 / mag
      if(newInstance) {
         return this.times(div, 1)
      } else {
         this.times(div)
      }
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
