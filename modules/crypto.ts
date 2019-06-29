const alph: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function getkey(text: string, key: string): string[] {
   let newtext: string[] = text.toUpperCase().split('')
   let nkey: string[]    = key.toUpperCase().split('')

   let newkey = []
   while(newtext.length > newkey.length) {
      newkey.push(nkey[newkey.length % nkey.length])
   }

   return newkey
}


export function encrypt(text: string, key: string): string {
   let newkey: string[]  = getkey(text, key)
   let newtext: string[] = text.toUpperCase().split('')

   return newtext.map((letter, index) => {
      return alph[(alph.indexOf(newkey[index]) + alph.indexOf(letter)) % alph.length]
   }).toString().split(',').join('')
}


// just a quick recursive decryption, will be updated to actual decryption later
export function decrypt(text: string, key: string): string {
   for(let i=0; i<25; i++) {
      text = encrypt(text, key)
   }

   return text
}
