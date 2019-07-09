import { Molecule } from './chemistry'
import { err, say, colorize } from './helpers'
import { percentage, volatility } from './types'
import { linB, min, lin, round, log } from './calc';

export class Rectificator {
   // tells if the whole thing is ready for calcualtions
   private valid: boolean = false

   // properties one want to use this thing for
   public a: number
   public xA: number
   public xF: number
   public xD: number

   // properties required for calculation
   private b: number
   private n_th: number
   private v_th: number

   // properties that result and describe the thing
   public n: number
   public v: number

   // constructor(public subtanceA: Molecule, public substanceB: Molecule) {}

   constructor(a: volatility, xA: percentage, xF: percentage, xD: percentage) {
      this.a  = Number(a)
      this.xA = Number(xA)
      this.xF = Number(xF)
      this.xD = Number(xD)

      this.valid = true
   }

   public theoreticSteps(): number {
      let numA: number = log(this.xD/(1-this.xD))
      let numB: number = log(this.xA/(1-this.xA))
      let den: number  = log(this.a)

      return round((numA-numB)/den, 1)
   }

   public minimumSteps(): number {
      if(!this.valid) {
         throw 'something is missing'
      }
      let curr = this.xD
      let steps = 0

      while(curr > this.xA) {
         curr = this.VLE(curr, 1)
         steps++
      }
      return steps
   }

   public optimalSteps(): number {
      if(!this.valid) {
         throw 'something is missing'
      }

      // the real intersection when using optimal back feed
      // let b_axis = this.xD/(this.minimumBackFeed()+1)
      let b_axis = this.xD+(this.optimalBackFeed()*this.xD)
      let b_inter = lin(this.xF, 0, b_axis, this.xD, this.xD)

      let currX = this.xD
      let currY = currX
      let steps = 0

      while(currX > this.xA) {
         if(currY <= 0 || currY >= 1) {
            currX = 0
            currY = 0
         }
         currX = round(this.VLE(currY, 1), 5)
         if(currX > this.xF) {
            currY = lin(currX, this.xF, b_inter, this.xD, this.xD)
         } else if(currX > this.xA) {
            currY = lin(currX, this.xA, this.xA, this.xF, b_inter)
         } else {
            currY = currX
         }
         steps++
         if(steps >= 50) {
            currY = 0
            currX = 0
            err('unrealistic, would require 50+ steps!')
         }
      }
      return steps
   }

   public minimumBackFeed(): number {
      if(!this.valid) {
         throw 'something is missing'
      }

      // the y-value where xF crosses VLE
      let b_inter: number = this.VLE(this.xD)
      let b_axis: number = linB(this.xF, b_inter, this.xD, this.xD)

      let v_min: number = (this.xD-b_axis)/b_axis
      return round(v_min, 3)
   }

   public optimalBackFeed() {
      if(!this.valid) {
         throw 'something is missing'
      }
      return round(0.8*this.minimumBackFeed(), 3)
   }

   // the Vapour-Liquid-Equilibrium state, function returns value of y when
   // input is x, can calculate backwards when optional "back" argument is given
   // X and Y (the input) are percentages of mass concentration of the liquid (X)
   // and the Vapour (Y) phase of two substances
   // the required alpha (a) is taken from this.'``
   public VLE(input: number, back?: 1): number {
      if(input > 1 || input < 0) {
         console.log(input)
         throw 'invalid arguments'
      } else {
         if(back) {
            let den: number = this.a*(-input)
            return input/(den+this.a+input)
         } else {
            let num: number = input*this.a
            let den: number = input*(this.a-1)
            return num/(1+den)
         }
      }
   }

   public layout() {
      let out: string = ''

      out += colorize('LAYOUT OF A RECTIFICATION PROCESS', 'red', 'white')
      out += '\n'
      out += '\n'
      out += `| ${colorize('parameter', 'red')}       | ${colorize('value', 'red')}      |`
      out += '\n'
      out += '|-----------------|------------|'
      out += '\n'
      out += `| ${colorize('rel. volatility', 'yellow')} |      ${colorize(this.a.toString(), 'green')}  |`
      out += '\n'
      out += `|            ${colorize('feed', 'yellow')} |      ${colorize(this.xF.toString(), 'green')}   |`
      out += '\n'
      out += `|       ${colorize('destilate', 'yellow')} |      ${colorize(this.xD.toString(), 'green')}  |`
      out += '\n'
      out += `|            ${colorize('rest', 'yellow')} |      ${colorize(this.xA.toString(), 'green')}  |`
      out += '\n'
      out += '|-----------------|------------|'
      out += '\n'
      out += `|       ${colorize('th. steps', 'yellow')} |     ${colorize(this.theoreticSteps().toString(), 'green')}    |`
      out += '\n'
      out += `|      ${colorize('min. steps', 'yellow')} |     ${colorize(this.minimumSteps().toString(), 'green')}      |`
      out += '\n'
      out += `|      ${colorize('opt. steps', 'yellow')} |     ${colorize(this.optimalSteps().toString(), 'green')}      |`
      out += '\n'
      out += `|   ${colorize('min. backfeed', 'yellow')} |     ${colorize(this.minimumBackFeed().toString(), 'green')} |`
      out += '\n'
      out += `|   ${colorize('opt. backfeed', 'yellow')} |     ${colorize(this.optimalBackFeed().toString(), 'green')} |`


      return console.log(out)
   }
}
