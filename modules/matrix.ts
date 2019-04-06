export function transpose(matrix: any[][]): any[][] {
   let n = [],
      l = matrix[0].length
   for(let i = 0; i < l; i++) {
      n.push([])
   }
   for(let j in matrix) {
      for(let i in matrix[j]) {
         n[i].push(matrix[j][i])
      }
   }
   return n
}

export function flatten(matrix: any[][]): any[] {
   let items = []
   for(let j in matrix) {
      for(let i in matrix[j]) {
         if(typeof matrix[j][i] != 'function') {
            items.push(matrix[j][i])
         }
      }
   }
   return items
}
