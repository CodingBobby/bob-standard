bob = module.exports = {
   say, err, log, round, rand, leng, clone,
   pi, pis, pih, es, pipi, e, re, ree, ii,
   ie, phi, ipi, pie, gan, chi, rtau, rtaue,
   r2, r3, r5, llim, ln2, r45,
   check: {
      prime, palin, int, square, cross
   },
   mat: {
      det, sub, rot, length, transpose
   },
   arr: {
      sum, remove, sort
   },
   make: {
      string, array, matrix
   },
   Vector: class {
      constructor(...a) {
         if(a.length == 0) {
            return bob.err('vector must have items')
         }
         let v = []
         if(a[0] instanceof bob.Vector) {
            for(var i in a[0].v) {
               v.push(clone(a[0].v[i]))
            }
         } else {
            if(typeof a[0] == 'object')
            a = a[0]
            for(var i = 0; i < a.length; i++) {
               v.push([a[i]])
            }
         }
         this.v = v
         this.d = this.v.length
         this.update()
      }
      update() {
         this.leng()
      }
      leng() {
         let root = 0
         for(var i=1; i<this.d; i++) {
            root += Math.hypot(this.v[i-1][0],this.v[i][0])
         }
         this.l = root
      }
      add(that) {
         if(this.check(that)) {
            for(var j in this.v) {
               for(var i in this.v[j]) {
                  this.v[j][i] += that.v[j][i]
               }
            }
         }
         this.update()
      }
      sub(that) {
         if(this.check(that)) {
            for(var j in this.v) {
               for(var i in this.v[j]) {
                  this.v[j][i] -= that.v[j][i]
               }
            }
         }
         this.update()
      }
      norm() {
         for(var j in this.v) {
            for(var i in this.v[j]) {
               this.v[j][i] = this.v[j][i] / this.l
            }
         }
         this.update()
      }
      xprod(that) {
         if(this.check(that)) {
            if(this.d == 2) {
               this.v.push([0])
               that.v.push([0])
               calc(this,that)
            } else if(this.d == 3) { calc(this,that) }
            else {
               sayError('invalid arguments')
            }
            function calc(x,y) {
               x.v[0][0] = x.v[1][0]*y.v[2][0] - x.v[2][0]*y.v[1][0]
               x.v[1][0] = x.v[2][0]*y.v[0][0] - x.v[0][0]*y.v[2][0]
               x.v[2][0] = x.v[0][0]*y.v[1][0] - x.v[1][0]*y.v[0][0]
            }
         }
         this.update()
      }
      dprod(that) {
         if(this.check(that)) {
            let p = 0
            for(var j in this.v) {
               for(var i in this.v[j]) {
                  p += this.v[j][i] * that.v[j][i]
               }
            }
            return p
         }
      }
      mult(...ar) {
         if(ar.length == 1) {
            ar = ar[0]
            if(this.check(ar)) {
               for(var i in this.v) {
                  this.v[i][0] *= that.v[i][0]
               }
            } else if(typeof ar == 'number') {
               for(var i in this.v) {
                  this.v[i][0] *= ar
               }
            } else {
               sayError('invalid arguments')
            }
         } else if(ar.length == this.d) {
            let valid = true
            for(var i in ar) {
               if(typeof ar[i] != 'number') {
                  valid = false
               }
            }
            if(valid) {
               for(var i in this.v) {
                  this.v[i][0] *= ar[i]
               }
            } else {
               sayError('invalid arguments')
            }
         } else {
            sayError('invalid arguments')
         }
         this.update()
      }
      clone() {
         return new bob.Vector(this)
      }
      print(...ar) {
         if(ar.length == 0) {
            sayHelper('vector',this.v)
         } else {
            for(var i in ar) {
               let s = ar[i].split(' ')
               for(var j in s) {
                  switch(s[j]) {
                     case ' ': { break }
                     case 'v':
                     case 'vec':
                     case 'vector': {
                        sayHelper('vector',this.v)
                        break
                     }
                     case 'l':
                     case 'len':
                     case 'length': {
                        sayHelper('length',this.l)
                        break
                     }
                     case 'd':
                     case 'dim':
                     case 'dimension': {
                        sayHelper('dimensions',this.d)
                        break
                     }
                     default: {
                        sayError('invalid arguments')
                        break
                     }
                  }
               }
            }
         }
      }
      check(that) {
         return that instanceof bob.Vector && this.d == that.d
      }
   }
}

const pi = 3.14159265358979323846
const pis = 9.86960440108935861883
const es = 7.38905609893065022723
const pipi = 36.4621596072079117709
const e = 2.71828182845904523536
const re = 1.64872127070012814684
const ree = 1.44466786100976613365
const ii = 0.20787957635076190854
const ie = 0.36787944117144232159
const phi = 1.61803398874989484820
const ipi = 0.31830988618379067153
const pie = 22.45915771836104547342
const epi = 23.1406926327792690057
const gan = 2.39996322972865332223
const chi = 0.52382257138986440645
const rtau = 2.50662827463100050241
const rtaue = 4.13273135412249293846
const pih = 1.57079632679489661923
const r2 = 1.41421356237309504880
const r3 = 1.73205080756887729352
const r5 = 2.23606797749978969640
const llim = 0.66274341934918158097
const ln2 = 0.69314718055994530941
const r45 = 1.49534878122122054191

function say(...args) {
   if(args.length == 2 && typeof args[0] == 'string') {
      sayHelper(args[0],args[1])
   } else if(typeof args == 'object' && typeof args[0] == 'object') {
      for(var i in args) {
         let A = args[i], outMsg = ''
         for(var n in A) {
            for(var m in A[n]) {
               let currLenA = (A[n][m]).toString().length
               let spcA = length(A)[m] - currLenA
               outMsg += `${string(spcA, ' ')}${A[n][m]}`
               if(n < A.length)
                  outMsg += '  '
            } outMsg += '\n\n'
         } helper(outMsg)
      }
   } else {
      for(var i in args) {
         let s = args[i]
         helper(s)
      }
   }
   function helper(e) {
      switch(typeof e) {
         case 'string': {
            console.log('\x1b[34m%s\x1b[0m', e)
            break
         }
         case 'number': {
            console.log('\x1b[36m%s\x1b[0m', e)
            break
         }
         case 'boolean': {
            console.log('\x1b[33m%s\x1b[0m', e)
            break
         }
         case 'object': {
            console.table(e)
            break
         }
         case 'function': {
            // This is a temporary fix to prevent functions to be
            // printed to the console. Done because somewhy methods
            // that have been added to an existing prototype print
            // to the console, which is unwanted.
            break
         }
         default: {
            console.log('\x1b[37m%s\x1b[0m', e)
            break
         }
      }
   }
}

function err(s) {
   sayError(s)
}

function log(n, b) {
   return Math.log(n) / (b ? Math.log(b) : 1)
}

function round(x, n) {
   n = n || 0
   return Number.parseFloat(x.toFixed(n))
}

function rand(f, t) {
   return Math.random() * (t - f) + f
}

function leng(obj) {
   let l = 0
   for (var k in obj)
      if (obj.hasOwnProperty(k))
         l++
   return l
}

function clone(obj) {
   if (null == obj || "object" != typeof obj) return obj
   let copy = obj.constructor()
   for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
   }
   return copy
}

function prime(x) {
   if ([2, 3].includes(x))
      return true
   let half = x % 2 != 0 ? (x - 1) / 2 : x / 2;
   for (var i = 2; i <= half; i++) {
      let div = x / i
      if (Math.round(div) == div)
         return false
   }
   return true
}

function palin(x) {
   let reverse = parseInt(x.toString().split("").reverse().join(""))
   if (x == reverse)
      return true
   else return false
}

function int(y) {
   var x
   return isNaN(y) ? !1 : (x = Number.parseFloat(y), (0 | x) === x)
}

function square(x) {
   return int(Math.sqrt(x))
}

function sub([a, b]) {
   return {
      x: a.x - b.x,
      y: a.y - b.y
   }
}

function det([a, b]) {
   return (a.x * b.y) - (a.y * b.x)
}

function rot(r, p, q) {
   return det([
      sub(p, r),
      sub(q, r)
   ])
}

function cross(r, s, p, q) {
   return true
      ? rot(r, p, q) * rot(s, p, q) < 0
      : false
}

function length(mrx) {
   let mLen = []
   for (var m = 0, len = 0, lVal = 0; m < mrx[0].length; m++) {
      for (var n in mrx) {
         let eLen = (mrx[n][m]).toString().length
         lVal = eLen ? lVal < eLen : lVal
         if (len < eLen) len = eLen
      }
      mLen.push(len)
      len -= len
   }
   return mLen
}

function sum(a) {
   let s = 0
   a.forEach(i => s += i)
   return s
}

function remove(arr, req) {
   let n = []
   arr.forEach(x => {
      if (req.test(x)) n.push(x)
   })
   return n
}

function sort(arr, s, v) {
   if (typeof arr[0] == 'number' || typeof arr[0] == 'string') {
      if (typeof s == 'function') {
         return arr.sort((a, b) => s(a, b))
      } else {
         switch (s) {
            case 'rev':
            case 'reverse': {
               return arr.sort((a, b) => b - a)
            }
            case 'split': {
               if (!v) {
                  sayError('no split point given')
                  break
               }
               return arr.sort((a, b) => a <= v || b <= v ? a - b : b - a)
            }
            case 'rev split':
            case 'split rev':
            case 'split reverse':
            case 'reverse split': {
               if (!v) {
                  sayError('no split point given')
                  break
               }
               return arr.sort((a, b) => a >= v || b >= v ? a - b : b - a)
            }
            case 'pos split':
            case 'split pos': {
               let up = clone(arr.sort((a, b) => a - b)),
                  down = clone(arr.sort((a, b) => b - a)),
                  nrr = []
               v = v || Math.round(arr.length / 2)
               for (var i = 0; i < arr.length; i++) {
                  if (i < v) {
                     nrr.push(up[i])
                  } else {
                     nrr.push(down[i - v])
                  }
               }
               return nrr
            }
            case 'pos rev split':
            case 'rev pos split':
            case 'split pos rev':
            case 'split rev pos':
            case 'pos split rev':
            case 'rev split pos': {
               let up = clone(arr.sort((a, b) => a - b)),
                  down = clone(arr.sort((a, b) => b - a)),
                  nrr = []
               v = v || Math.round(arr.length / 2)
               for (var i = 0; i < arr.length; i++) {
                  if (i < v) {
                     nrr.push(down[i])
                  } else {
                     nrr.push(up[i - v])
                  }
               }
               return nrr
            }
            default: {
               return arr.sort((a, b) => a - b)
            }
         }
      }
   } else {
      let swapp, n = arr.length - 1
      s -= 1
      do {
         swapp = false
         for (var i = 0; i < n; i++) {
            if (arr[i][s] < arr[i + 1][s]) {
               let tmp = arr[i]
               arr[i] = arr[i + 1]
               arr[i + 1] = tmp
               swapp = true
            }
         } n--
      } while (swapp)
      return arr
   }
}

function string(n, char) {
   let s = ``
   for (var i = 0; i < n; i++) {
      s += char
   }
   return s
}

function array(n, c) {
   let arr = [],
      x = c || 0
   for (var i = 0; i < n; i++) {
      if (typeof c == 'function') {
         x = c()
      }
      arr.push(x)
   }
   return arr
}

function matrix(x, y, n) {
   let m = [],
      c = n || 0
   for (var j = 0; j < y; j++) {
      m.push([])
      for (var i = 0; i < x; i++) {
         if (typeof n == 'function') {
            c = n()
         }
         m[j].push(c)
      }
   }
   return m
}

function transpose(m) {
   let n = [],
      l = m[0].length
   for (var i = 0; i < l; i++) {
      n.push([])
   }
   for (var j in m) {
      for (var i in m[j]) {
         n[i].push(m[j][i])
      }
   }
   return n
}

function sayHelper(t,v) {
   say('\x1b[2m'+t+': \x1b[0m\x1b[35m'+[v]+'\x1b[0m')
}

function sayError(t) {
   say('\x1b[41m\x1b[36m'+t+'\x1b[0m')
}

Array.prototype.print = function() {
   say('array',this.toLocaleString())
}

Array.prototype.sortify = function(...args) {
   return sort(this,...args)
}
