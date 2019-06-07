export let config = {
   maths: {
      aMode: 'RAD',
      digits: undefined
   }
}

export function angleMode(unit: 'DEG' | 'RAD') {
   config.maths.aMode = unit

   if(config.maths.aMode !== unit) {
      throw 'Error setting angle mode.'
   } else {
      return `Angle mode set to ${unit}.`
   }
}

export function setDigits(count: number) {
   config.maths.digits = count

   if(config.maths.digits !== count) {
      throw 'Error setting digit count.'
   } else {
      return `Digit count set to ${count}.`
   }
}

export function resetDigits() {
   config.maths.digits = undefined

   if(config.maths.digits !== undefined) {
      throw 'Error setting digit count.'
   } else {
      return `Digit count resetted to default.`
   }
}
