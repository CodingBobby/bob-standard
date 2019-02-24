bob_standard = module.exports = {
  log: function(n, b) {
    return Math.log(n)/(b ? Math.log(b) : 1)
  },

  round: function(x, n) {
    return Number.parseFloat(x.toFixed(n))
  },

  rand: function(f, t) {
    return Math.random() * (t - f) + f
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

    sort: function(arr, s) {
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
  },

  make: {
    string: function(n, char) {
      let s = ``
      for(var i=0; i<n; i++) {
        s += char
      }
      return s
    }
  }
}
