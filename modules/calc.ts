import { isInt } from './checks'
import { r2, PHITABLE, pi, rpi } from './constants'
import { config } from './configurator'

// TRIGONOMETRIC functions
// allow to use radians and degrees for angles, to change the mode,
// you can use angleMode() from the configurator module
export function sin(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return fix(Math.sin(y))
}

export function cos(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return fix(Math.cos(y))
}

export function tan(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return fix(Math.tan(y))
}

export function asin(x: number): number {
   return fix(Math.asin(x))
}

export function acos(x: number): number {
   return fix(Math.acos(x))
}

export function atan(x: number): number {
   return fix(Math.atan(x))
}

export function sinh(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return fix(Math.sinh(y))
}

export function cosh(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return fix(Math.cosh(y))
}

export function tanh(x: number): number {
   let y = config.maths.aMode == 'RAD' ? x : x * pi/180
   return fix(Math.tanh(y))
}

// improved logarithm function, accepts an oprional base
// default base is e but can be changed to anything
export function log(x: number, base?: number): number {
   return fix(Math.log(x) / (base ? Math.log(base) : 1))
}

// rounds floats to a given number of digits after the decimal point
// default is 0 which then yields an integer
export function round(x: number, digits?: number): number {
   digits = digits || 0
   return Number(x.toFixed(digits))
}

// floors a float to an integer
export function floor(x: number): number {
   return (round(x) - x < 0) ? round(x) : round(x-0.5)
}

// ceils a float to an integer
export function ceil(x: number): number {
   return (round(x) - x > 0) ? round(x) : round(x+0.5)
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

// simple average of two values
export function avg(a: number, b: number): number {
   return (a + b)*.5
}

// find mean value of number array (average)
export function mean(items: number[]): number {
   return sum(items) / items.length
}

// find median of number array
export function medi(items: number[]): number {
   let a: number = min(items)
   let b: number = max(items)

   return (a + b)/2
}

// find maximum difference to mean value
export function devi(items: number[]): number {
   let m: number = mean(items)
   let a: number = m - min(items)
   let b: number = max(items) - m

   return a > b ? a : b
}

// finds minimum value of number array
export function min(items: number[]): number {
   let m: number = items[0]
   items.forEach(e => e < m ? m = e : m)
   return m
}

// finds maximum value of number array
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
      let erfx: number = erf(x/r2)
      return (erfx + 1)*0.5
   } else {
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
      let sum2: number = a2*Math.pow(t,2)
      let sum3: number = a3*Math.pow(t,3)
      let sum4: number = a4*Math.pow(t,4)
      let sum5: number = a5*Math.pow(t,5)
      let sum: number  = sum1+sum2+sum3+sum4+sum5
   
      let term: number = sum*ex
      return 1-term

   } else {
      let a: number   = 2/rpi
      let c: number   = Math.pow(x, 2)
      // virtual inifinity to limit the loop, still provides
      // maximum possible accuracy
      let inf: number = 24
      let sum: number = 0

      for(let n=0; n<inf; n++) {
         let b: number    = 2*n +1
         let part: number = x/b
         let prod: number = 1

         for(let k=1; k<=n; k++) {
            prod *= -(c/k)
         }
         sum += part*prod
      }
      return a*sum
   }
}

// PRIVATE helpers for this module

// rounds small numbers to 10^-15
function fix(x: number): number {
   return round(x, 15)
}

// returns the slope of a line
export function lin_m(x1: number, y1: number, x2: number, y2: number): number {
   return (y2-y1)/(x2-x1)
}

// returns y-axis offset of linear equation that runs
// through the points (x1, y1) and (x2, y2)
export function lin_b(x1: number, y1: number, x2: number, y2: number): number {
   let m: number = lin_m(x1, y1, x2, y2)
   return y1-(m * x1)
}

// returns y-value for input x-value for a line between
// (x1, y1) and (x2, y2)
export function lin(x: number, x1: number, y1: number, x2: number, y2: number): number {
   let m: number = lin_m(x1, y1, x2, y2)
   let b: number = lin_b(x1, y1, x2, y2)
   return m*x +b
}
