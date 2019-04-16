import { isInt } from './checks'

export const pi: number    = 3.14159265358979323846
export const pis: number   = 9.86960440108935861883
export const es: number    = 7.38905609893065022723
export const pipi: number  = 36.4621596072079117709
export const e: number     = 2.71828182845904523536
export const re: number    = 1.64872127070012814684
export const ree: number   = 1.44466786100976613365
export const ii: number    = 0.20787957635076190854
export const ie: number    = 0.36787944117144232159
export const phi: number   = 1.61803398874989484820
export const ipi: number   = 0.31830988618379067153
export const pie: number   = 22.4591577183610454734
export const epi: number   = 23.1406926327792690057
export const gan: number   = 2.39996322972865332223
export const chi: number   = 0.52382257138986440645
export const rtau: number  = 2.50662827463100050241
export const rtaue: number = 4.13273135412249293846
export const pih: number   = 1.57079632679489661923
export const r2: number    = 1.41421356237309504880
export const r3: number    = 1.73205080756887729352
export const r5: number    = 2.23606797749978969640
export const llim: number  = 0.66274341934918158097
export const ln2: number   = 0.69314718055994530941
export const r45: number   = 1.49534878122122054191

export function log(x: number, base?: number): number {
   return Math.log(x) / (base ? Math.log(base) : 1)
}

export function round(x: number, digits?: number): number {
   digits = digits || 0
   return Number(x.toFixed(digits))
}

export function sum(items: number[]): number {
   let s: number = 0
   items.forEach(e => s += e)
   return s
}

export function gcd(items: number[]): number {
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

function min(items: number[]): number {
   let m: number = items[0]
   items.forEach(e => e < m ? m = e : m)
   return m
}

function max(items: number[]): number {
   let m: number = items[0]
   items.forEach(e => e > m ? m = e : m)
   return m
}
