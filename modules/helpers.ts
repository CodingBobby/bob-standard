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
