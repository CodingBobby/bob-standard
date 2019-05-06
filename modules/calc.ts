import { isInt } from './checks'
import { r2, PHITABLE, pi, rpi } from './constants'
import { config } from './configurator'

// TRIGONOMETRIC functions
// allow to use radians and degrees for angles, to change the mode,
// you can use angleMode() from the configurator module
export function sin(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.sin(y)
}

export function cos(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.cos(y)
}

export function tan(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.tan(y)
}

export function asin(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.asin(y)
}

export function acos(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.acos(y)
}

export function atan(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.atan(y)
}

export function sinh(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.sinh(y)
}

export function cosh(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.cosh(y)
}

export function tanh(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return Math.tanh(y)
}

// improved logarithm function, accepts an oprional base
// default base is e but can be changed to anything
export function log(x: number, base?: number): number {
   return Math.log(x) / (base ? Math.log(base) : 1)
}

// rounds floats to a given number of digits after the decimal point
// default is 0 which then yields an integer
export function round(x: number, digits?: number): number {
   digits = digits || 0
   return Number(x.toFixed(digits))
}

// sums up the numbers in an array
export function sum(items: number[]): number {
   let s: number = 0
   items.forEach(e => s += e)
   return s
}

// finds the greatest common divisor in an array
export function gcd(items: number[]): number {
   // helper function to get the gcd of two numbers
   function sgcd(c, a) {
      return a ? sgcd(a, c % a) : c
   }

   let b: number = items[0]
   for(let c = 1; c < items.length; c++) {
      b = sgcd(b, items[c])
   }
   return b
}

// smallest multiple to int
export function smti(x: number): number {
   if(isInt(x)) { return 1 }
   
   let done: boolean = false
   let s: number = 0
   
   while(!done) {
      s++
      if(x >= 1) {
         if(isInt(x * s)) {
            done = true
         }
      } else {
         if(isInt(s / x)) {
            done = true
         }
      }
   }
   if(x >= 1) {
      return s
   } else {
      return s / x
   }
}

export function mean(items: number[]): number {
   return sum(items) / items.length
}

export function medi(items: number[]): number {
   let a: number = min(items)
   let b: number = max(items)

   return (a + b)/2
}

export function devi(items: number[]): number {
   let m: number = mean(items)
   let a: number = m - min(items)
   let b: number = max(items) - m

   return a > b ? a : b
}

export function min(items: number[]): number {
   let m: number = items[0]
   items.forEach(e => e < m ? m = e : m)
   return m
}

export function max(items: number[]): number {
   let m: number = items[0]
   items.forEach(e => e > m ? m = e : m)
   return m
}

// simple factorial or !-function
export function factorial(x: number): number {
   let f: number = 1
   for(let i=1; i<=x; i++) {
      f *= i
   }
   return f
}

// returns the value of the gaussian normal distribution at the given value x,
// the optional calc lets you calulate the value manually, if not set or set to false,
// the result will be read from PHITABLE from the constants module. Last method rounds
// the input value to three digits and the output value to five digits. Input values above
// 4 or below -4 will be set to 1 and 0 respectively
export function normDist(x: number, calc?: boolean): number {
   if(calc) {
      let factor: number = 1/Math.sqrt(2*pi)
      let erfx: number = erf(x/r2)
      let root: number = Math.sqrt(pi/2)
   
      let dist: number = factor * root * (erfx + 1)
   
      return dist
   }
   
   else {
      if(x > 1 && x <= 4) {
         return round(PHITABLE[round(x, 3)], 5)
      } else if(x > 4) {
         return 1
      } else if(x < 0 && x >= -4) {
         return round(1 - PHITABLE[round(abs(x), 3)], 5)
      } else if(x < -4) {
         return 0
      }
   }
}

// returns the positive value of a negative input number
export function abs(x: number): number {
   if(x < 0) {
      return x*x + x
   } else {
      return x
   }
}

// returns the error function of x,
// can approximate optionally for very quick calculation
export function erf(x: number, approx?: 1): number {
   if(approx) {
      const p: number  = 0.3275911
      const a1: number = 0.254829592
      const a2: number = -0.284496736
      const a3: number = 1.421413741
      const a4: number = -1.453152027
      const a5: number = 1.061405429
   
      let px: number   = 1+p*x
      let t: number    = 1/px
      let xs: number   = Math.pow(x,2)
      let ex: number   = Math.exp(-xs)
   
      let sum1: number = a1*t
      let sum2: number = a2*(Math.pow(t,2))
      let sum3: number = a3*(Math.pow(t,3))
      let sum4: number = a4*(Math.pow(t,4))
      let sum5: number = a5*(Math.pow(t,5))
      let sum: number  = sum1+sum2+sum3+sum4+sum5
   
      let term: number = sum*ex
      return 1-term

   } else {
      let a: number   = 2/rpi
      // virtual inifinity to limit the loop, still provides
      // very high accuracy
      let inf: number = 100 
      let sum: number = 0

      for(let n=0; n<inf; n++) {
         let b: number    = 2*n +1
         let part: number = x/b
         let prod: number = 1

         for(let k=1; k<=n; k++) {
            let c: number = Math.pow(x, 2)
            prod *= -(c/k)
         }
         sum += part*prod
      }
      return a*sum
   }
}
