import { gcd, smti } from './calc'

export function rand(from: number, to: number): number {
   return Math.random() * (to - from) + from
}

export function clone(object: any): any {
   if(null == object || "object" != typeof object) return object
   let copy = object.constructor()
   for(let attr in object) {
      if(object.hasOwnProperty(attr)) copy[attr] = object[attr]
   }
   return copy
}

export function pick(array: any[]): any {
   return array[Math.floor(Math.random() * array.length)]
}

export function swap(array: any[], indexA: number, indexB: number): any[] {
   let cache = array[indexA]
   array[indexA] = array[indexB]
   array[indexB] = cache
   return array
}

export function remove(array: any[], remove: any[]): any[] {
   return array.filter(el => !remove.includes(el))
}

export function weight(items: any[], weights: number[]): any[] {
   if(items.length !== weights.length) {
      console.error('arrays do not match!')
   }
   let witems = [],
      citem = 0

   // now we need to push the weights to whole numbers, because we can't
   // put half items into an array
   for(let i in weights) {
      let multiple = smti(weights[i])
      for(let j in weights) {
         weights[j] *= multiple
      }
   }

   // if weights could be simplified because common divisors exist,
   // the 'divs' variable would be greater than '1' (which is always the case)
   let divs = gcd(weights)
   if(divs > 1) {
      weights = weights.map(x => x/divs)
   }

   while(citem < items.length) {
      for(let i = 0; i < weights[citem]; i++) {
         witems[witems.length] = items[citem]
      }
      citem++
   }

   return witems
}

export function extract(input: string, identifier: string): any[] {
   let rows = input.split('\n')
   let reg = RegExp(identifier)
   let out = []
   let tmp = []
   for(var i in rows) {
      let row = rows[i]
      if(reg.test(row)) {
         if(tmp.length !== 0) {
            out.push(tmp)
            tmp = []
         }
      } else {
         let rowArr = row.split('')
         tmp.push(rowArr.map(x => parseInt(x)))
      }
   }
   return out
}

type size<keys, values> = { keys: number, values: number}

export function size(object: object): size<number, number> {
   let s = { keys: 0, values: 0 }

   function find(obj) {
      for(let item in obj) {
         if(obj.hasOwnProperty(item)) {
            s.keys++
            if(type(obj[item]) == 'Object') {
               find(obj[item])
            } else {
               s.values++
            }
         }
      }
   }

   find(object)
   return s
}

export function type(item: any): string {
	var text = item.constructor.toString()
	return text.match(/function (.*)\(/)[1]
}

export function say(...args) {
   if(args.length === 2 && typeof args[0] == 'string') {
      sayHelper(args[0],args[1])
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

export function err(msg: string) {
   sayError(msg)
}

function sayHelper(t,v) {
   say('\x1b[2m'+t+': \x1b[0m\x1b[35m'+[v]+'\x1b[0m')
}

function sayError(t) {
   say('\x1b[41m\x1b[36m'+t+'\x1b[0m')
}
