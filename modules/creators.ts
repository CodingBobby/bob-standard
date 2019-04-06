export function string(length: number, char: string): string {
   let s = ''
   for(let i = 0; i < length; i++) {
      s += char
   }
   return s
}

export function array(length: number, element?: any): any[] {
   let arr = [],
      x = element || 0
   for(let i = 0; i < length; i++) {
      if(typeof element == 'function') {
         x = element()
      }
      arr.push(x)
   }
   return arr
}

export function matrix(width: number, height: number, element?: any): any[][] {
   let m = [],
      c = element || 0
   for(let j = 0; j < height; j++) {
      m.push([])
      for(let i = 0; i < width; i++) {
         if(typeof element == 'function') {
            c = element()
         }
         m[j].push(c)
      }
   }
   return m
}
