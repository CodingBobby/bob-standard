import { gcd } from './calc'

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

export function weight(array: any[][]): any[] {
   let pi = 0,
      pw = 1,
      witems = [],
      citem = 0

   let items = array.map(e => e[pi]),
      weights = array.map(e => e[pw])

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
