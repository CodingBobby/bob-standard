bob = module.exports = {
   say, err, log, round, rand, leng, clone,
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
         let v = []
         if (typeof a[0] == 'object')
            a = a[0]
         for (var i = 0; i < a.length; i++) {
            v.push([a[i]])
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
         if(that instanceof Vector && this.d == that.d) {
            for(var j in this.v) {
               for(var i in this.v[j]) {
                  this.v[j][i] += that.v[j][i]
               }
            }
         }
      }
      sub(that) {
         if(this.check(that)) {
            for(var j in this.v) {
               for(var i in this.v[j]) {
                  this.v[j][i] -= that.v[j][i]
               }
            }
         }
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
               calc(this)
            } else if(this.d == 3) { calc(this,that) }
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
      print() {
         console.log(this.v)
      }
      check(that) {
         return that instanceof Vector && this.d == that.d
      }
   }
}

function say(...args) {
   for(var i in args) {
      let s = args[i]
      if (typeof s == 'object' && typeof s[0] == 'object') {
         let A = s, outMsg = ''
         for (var n in A) {
            for (var m in A[n]) {
               let currLenA = (A[n][m]).toString().length
               let spcA = length(A)[m] - currLenA
               outMsg += `${string(spcA, ' ')}${A[n][m]}`
               if (n < A.length)
                  outMsg += '  '
            }
            outMsg += '\n\n'
         }
         console.log(outMsg)
      } else if (typeof s == 'object') {
         console.table(s)
      } else {
         let log = ''
         if (args[i] == 0)
            log += '\n'
         else {
            log += args[i]
            if (i < args.length && args[i - 1] != 0)
               log += ' '
         }
         console.log(log)
      }
   }
}

function err(s) {
   console.error(s)
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
                  console.error('no split point given')
                  break
               }
               return arr.sort((a, b) => a <= v || b <= v ? a - b : b - a)
            }
            case 'rev split':
            case 'split rev':
            case 'split reverse':
            case 'reverse split': {
               if (!v) {
                  console.error('no split point given')
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
