import { gcd, smti, max } from './calc'
import { array } from './creators'

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

export function crankup(items: number[]): number[] {
   for(let i in items) {
      let multiple = smti(items[i])
      for(let j in items) {
         items[j] *= multiple
      }
   }
   return items
}

export function weight(items: any[], weights: number[]): any[] {
   if(items.length !== weights.length) {
      console.error('arrays do not match!')
   }
   let witems = [],
      citem = 0

   // now we need to push the weights to whole numbers, because we can't
   // put half items into an array, using crankup function
   weights = crankup(weights)

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
         console.log(logPut(args[i]))
      }
   }
   function logPut(input) {
      let str: String = ''
      let counter: number = 0
      

      function helper(e) {
         switch(type(e)) {
            case 'String': {
               str += `\x1b[34m${e}\x1b[0m`
               break
            }
            case 'Number': {
               str += `\x1b[36m${e}\x1b[0m`
               break
            }
            case 'Boolean': {
               str += `\x1b[33m${e}\x1b[0m`
               break
            }
            case 'Array': {
               str += '\u2514 '
               for(let i in e) {
                  counter++
                  helper(e[i])
                  if((counter+1) >= e.length) {
                     str += '\n'
                  }
               }
               break
            }
            case 'Object': {
               break
            }
         }
         str += ' '
      }

      helper(input)
      return str
   }
   function helperold(e) {
      switch(type(e)) {
         
         case 'String': {
            console.log('\x1b[34m%s\x1b[0m', e)
            break
         }
         case 'Number': {
            console.log('\x1b[36m%s\x1b[0m', e)
            break
         }
         case 'Boolean': {
            console.log('\x1b[33m%s\x1b[0m', e)
            break
         }
         case 'Array':
         case 'Object': {
            console.table(e)
            break
         }
         case 'Function': {
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

export function printArray(input, name?: string) {
   // used for getting the deepness of nested items
   let deepness: number = 0
   let deepArray: number[] = []

   function mapDeepness(e) {
      for(let i=0; i<e.length; i++) {
         if(type(e[i]) == 'Array') {
            deepness++
            mapDeepness(e[i])
         } else {
            deepArray.push(deepness)
         }
      }
      deepness--
   }

   // used for getting the raw items
   let itemArray: any[] = []

   // recursively loop through the array and fetch all elements
   function getItems(arr) {
      function helper(e) {
         for(let i in e) {
            if(type(e[i]) == 'Array') {
               helper(e[i])
            } else {
               itemArray.push(e[i])
            }
         }
      }

      helper(arr)
   }

   // the actual items
   getItems(input)

   // their deepness / level
   mapDeepness(input)

   // we have to get the level changes and sublevels as well
   let itemLevels = []

   for(let i in deepArray) {
      let prev: number = -1
      let next: number = -1
      let sub: number[] = []

      // if a previous item exists
      if(deepArray[Number(i)-1] !== undefined) {
         prev = deepArray[Number(i)-1] - deepArray[i]
      }

      // if a next item exists
      if(deepArray[Number(i)+1] !== undefined) {
         next = deepArray[Number(i)+1] - deepArray[i]
      }

      // the item levels before current
      let before: number[] = deepArray.slice(0, Number(i))

      // the item levels after current
      let after: number[] = deepArray.slice(Number(i)+1)

      // get the max level
      let maxlvl: number = max(deepArray)

      // check if any level appears before and after the current item and if yes, put it in the sub array
      for(let l=0; l<maxlvl; l++) {
         if(before.includes(l) && after.includes(l)) {
            // just push levels lower than itself
            if(l < deepArray[i]) {
               sub.push(l)
            }
         }
         // level -1 indicates the end of a root
         if(before.includes(l) && !after.includes(l)) {
            sub = [-1]
         }
      }

      itemLevels.push({
         prev: prev,
         next: next,
         sub: sub
      })
   }

   // now we can create the actual output

   // these are the guys we need to build a 'screen' (not actually one but we'll map all characters into a matrix that will be converted into a string afterwards)
   let line: string[] = array(20, '  ')
   let screen: string[][] = []

   // these are the characters we use to create the tree
   let box: string = '\u25A7'
   let hor: string = '\u2500'
   let ver: string = '\u2502'
   let ver_right: string = '\u251C'
   let hor_down: string = '\u252C'
   let down_right: string = '\u2514'

   // the actual line we're on
   let lc: number = 0

   for(let j in itemArray) {
      // we can't use it as a string
      let i: number = Number(j)
      
      // the current x-position in the screen matrix
      let mat_pos: number = deepArray[i]

      // add a new line for the next item and save the count
      screen.push(clone(line))

      // put a nice box in the beginning
      if(i == 0) {
         screen.push(clone(line))
         if(name) { // if name for the array was given
            screen[lc][mat_pos] = name
         } else {
            screen[lc][mat_pos] = box+' '
         }
         lc++
      }

      // put the tree section for current item
      if(itemLevels[i].next == 1) {
         screen[lc][mat_pos] = ver_right+hor
         // add the actual item
         screen[lc][mat_pos+1] = ' ' + itemArray[i]

         // add a new line for vertex and jump into it
         screen.push(clone(line))
         lc++

         // add the vertex and the box next to it
         if(itemLevels[i].sub.includes(-1)) {
            // if there is no item on the current level left
            screen[lc][mat_pos] = down_right+hor
         } else {
            screen[lc][mat_pos] = ver_right+hor
         }
         screen[lc][mat_pos+1] = box+' '
      } else if(itemLevels[i].next == 0) {
         // nothing special happens here, just add a new vertex
         screen[lc][mat_pos] = ver_right+hor
         // add the actual item
         screen[lc][mat_pos+1] = ' ' + itemArray[i]
      } else if(itemLevels[i].next == -1) {
         // end of root is reached, add a corner
         screen[lc][mat_pos] = down_right+hor
         // add the actual item
         screen[lc][mat_pos+1] = ' ' + itemArray[i]
      } 

      // add vertical carriers on all sublevels
      for(let k in itemLevels[i].sub) {
         let sublevel: number = itemLevels[i].sub[k]
         // exclude the end-of-root level
         if(sublevel !== -1) {
            screen[lc][sublevel] = ver+' '
         }
      }

      // hop into the next line
      lc++
   }

   // here we loop through the screen matrix and add everything to one string we can then log
   let text: string = ''
   for(let r in screen) {
      for(let s in screen[r]) {
         text += screen[r][s]
      }
      text += '\n'
   }

   // FINALLY print the array tree
   console.log()
   console.log(text)
}
