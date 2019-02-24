bob_standard = module.exports = {
  say: function(...args) {
    let s = args[0]
    if(typeof s == 'object' && typeof s[0] == 'object') {
      let A = s, outMsg = ''
      for(var n in A) {
        for(var m in A[n]) {
          let currLenA = (A[n][m]).toString().length
          let spcA = this.parent.mat.length(A)[m]-currLenA
          outMsg += `${this.parent.make.string(spcA,' ')}${A[n][m]}`
          if(n<A.length)
            outMsg += '  '
        }
        outMsg += '\n\n'
      }
      console.log(outMsg)
    } else if(typeof s == 'object') {
      console.table(s)
    } else {
      let log = ''
      for(var i in args) {
        if(args[i] == 0)
          log += '\n'
        else {
          log += args[i]
          if(i < args.length && args[i-1] != 0)
            log += ' '
        }
      }
      console.log(log)
    }
  },

  err: function(s) {
    console.error(s)
  },

  log: function(n, b) {
    return Math.log(n)/(b ? Math.log(b) : 1)
  },

  round: function(x, n) {
    n = n || 0
    return Number.parseFloat(x.toFixed(n))
  },

  rand: function(f, t) {
    return Math.random() * (t - f) + f
  },

  leng: function(obj) {
    let l = 0
    for(var k in obj)
      if(obj.hasOwnProperty(k))
        l++
    return l
  },

  clone: function(obj) {
    if(null == obj || "object" != typeof obj) return obj
    let copy = obj.constructor()
    for(var attr in obj) {
      if(obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
    }
    return copy
  },

  check: {
    prime: function(x) {
      if([2,3].includes(x))
        return true
      let half = x % 2 != 0 ? (x - 1) / 2 : x / 2;
      for(var i = 2; i <= half; i++) {
        let div = x / i
        if(Math.round(div) == div)
          return false
      }
      return true
    },

    palin: function(x) {
      let reverse = parseInt(x.toString().split("").reverse().join(""))
      if(x == reverse)
        return true
      else return false
    },

    int: function(y) {
      var x
      return isNaN(y) ? !1 : (x = Number.parseFloat(y), (0 | x) === x)
    },

    square: function(x) {
      return this.int(Math.sqrt(x))
    }
  },

  mat: {
    sub: function([a, b]) {
      return {
        x: a.x - b.x,
        y: a.y - b.y
      }
    },

    det: function([a, b]) {
      return (a.x * b.y) - (a.y * b.x)
    },

    rot: function(r, p, q) {
      return this.det([
        this.sub(p, r),
        this.sub(q, r)
      ])
    },
    
    cross: function(r, s, p, q) {
      return true
        ? this.rot(r, p, q) * this.rot(s, p, q) < 0
        : false
    },

    length: function(mrx) {
      let mLen = []
      for(var m = 0, len = 0, lVal = 0; m < mrx[0].length; m++) {
        for(var n in mrx) {
          let eLen = (mrx[n][m]).toString().length
          lVal = eLen ? lVal < eLen : lVal
          if(len < eLen) len = eLen
        }
        mLen.push(len)
        len -= len
      }
      return mLen
    }
  },

  arr: {
    sum: function(a) {
      let s = 0
      a.forEach(i => s += i)
      return s
    },

    remove: function(arr, req) {
      let n = []
      arr.forEach(x => {
        if(req.test(x)) n.push(x)
      })
      return n
    },

    sort: function(arr, s, v) {
      if(typeof arr[0] == 'number' || typeof arr[0] == 'string') {
        if(typeof s == 'function') {
          return arr.sort((a, b) => s(a, b))
        } else {
          switch(s) {
            case 'rev':
            case 'reverse': {
              return arr.sort((a, b) => b-a)
            }
            case 'split': {
              if(!v) {
                console.error('no split point given')
                break
              }
              return arr.sort((a, b) => a<=v || b<=v ? a-b : b-a)
            }
            case 'rev split':
            case 'split rev':
            case 'split reverse':
            case 'reverse split': {
              if(!v) {
                console.error('no split point given')
                break
              }
              return arr.sort((a, b) => a>=v || b>=v ? a-b : b-a)
            }
            case 'pos split':
            case 'split pos': {
              let up = this.parent.clone(arr.sort((a, b) => a-b)),
                down = this.parent.clone(arr.sort((a, b) => b-a)),
                nrr = []
              v = v || Math.round(arr.length/2)
              for(var i=0; i<arr.length; i++) {
                if(i < v) {
                  nrr.push(up[i])
                } else {
                  nrr.push(down[i-v])
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
              let up = this.parent.clone(arr.sort((a, b) => a-b)),
                down = this.parent.clone(arr.sort((a, b) => b-a)),
                nrr = []
              v = v || Math.round(arr.length/2)
              for(var i=0; i<arr.length; i++) {
                if(i < v) {
                  nrr.push(down[i])
                } else {
                  nrr.push(up[i-v])
                }
              }
              return nrr
            }
            default: {
              return arr.sort((a, b) => a-b)
            }
          }
        }
      } else {
        let swapp, n = arr.length - 1
        s -= 1
        do {
          swapp = false
          for(var i=0; i<n; i++) {
            if(arr[i][s] < arr[i + 1][s]) {
              let tmp = arr[i]
              arr[i] = arr[i + 1]
              arr[i + 1] = tmp
              swapp = true
            }
          } n--
        } while(swapp)
        return arr
      }
    }
  },

  make: {
    string: function(n, char) {
      let s = ``
      for(var i=0; i<n; i++) {
        s += char
      }
      return s
    },

    array: function(n, c) {
      let arr = [],
        x = c || 0
      for(var i=0; i<n; i++) {
        if(typeof c == 'function') {
          x = c()
        }
        arr.push(x)
      }
      return arr
    },

    matrix: function(x, y, n) {
      let m = [],
        c = n || 0
      for(var j=0; j<y; j++) {
        m.push([])
        for(var i=0; i<x; i++) {
          if(typeof n == 'function') {
            c = n()
          }
          m[j].push(c)
        }
      }
      return m
    }
  },

  _init: function(){
    for(var child in this) {
      this[child].parent = this
      for(var grand in this[child]) {
        this[child][grand].parent = this
      }
    }
    delete this._init
    return this
  }
}._init()
