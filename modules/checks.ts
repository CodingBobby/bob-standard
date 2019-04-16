export function isPrime(x: number): boolean {
   if([2, 3].includes(x))
      return true
   let half = x % 2 !== 0 ? (x - 1) / 2 : x / 2;
   for(var i = 2; i <= half; i++) {
      let div = x / i
      if(Math.round(div) === div)
         return false
   }
   return true
}

export function isPalin(x: number | string): boolean {
   let reverse = Number(x.toString().split('').reverse().join(''))
   if(x == reverse) // do not change to triple '='!
      return true
   else return false
}

export function isInt(x: any): boolean {
   let y: number
   return isNaN(x) ? !1 : (y = Number(x), (0 | y) === y)
}

export function isSquare(x: number): boolean {
   return isInt(Math.sqrt(x))
}
