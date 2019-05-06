export let config = {
   maths: {
      aMode: 'RAD'
   }
}

export function angleMode(unit: 'DEG' | 'RAD') {
   config.maths.aMode = unit

   if(config.maths.aMode !== unit) {
      throw 'Error setting angle mode.'
   }
}
