import { round } from './calc'
import { PSE } from './constants'
import { objIndex, err } from './helpers'

/**
 * this interface describes the properties of an Atom() class.
 * 
 * element: the chemical symbol of the element as a string
 * count: simple atom counter, used to count them in molecules
 * props: the characteristics of the element, will be a copy of the
 *    according element object in the PSE table defined in the constants module
 * 
 * important is M: which is the molar mass of the element
 */
export interface Atom {
   element: string
   count: number
   props: {
      name: string
      latin: string
      P: number
      N: number
      M: number
      e: number
   }
}

/**
 * interface for Molecules, it basically contains an array of
 * Atom interfaces and an additional counter to make stochiometrical
 * calculations possible
 */
export interface Molecule {
   formula: string
   atoms: Atom[]
   count: number
   M: number
   valid: boolean
}

export interface Reaction {
   educts: Molecule[]
   products: Molecule[]
}

// USE OF INTERFACES IN CLASSES

export class Molecule {
   public atoms: Atom[]
   public count: number = 1
   public M: number = 0
   public valid: boolean = true

   constructor(public formula: string) {
      let e = []
      e = formula.match(/[A-Z]?[a-z]?[0-9]*/g)
      e.splice(e.length-1)

      let molecule = []

      for(let i in e) {
         let element = e[i]
         let name = element.match(/[A-Z]?[a-z]*/g)
         let count = element.match(/[0-9]*/g)

         let newName = ''
         for(let j in name) {
            newName += name[j]
         }
         name = newName

         count = count.map(x => Number(x))
         for(let j in count) {
            if(count[j] > 0) {
               count = count[j]
            }
         }

         if(typeof count !== 'number') {
            count = 1
         }

         if(PSE.hasOwnProperty(name)) {
            molecule.push({
               element: String(name),
               count: Number(count),
               props: PSE[name]
            })
         } else {
            this.valid = false
         }
      }

      this.atoms = molecule

      this.M = this.molarMass()
   }

   private molarMass(): number {
      let M: number = 0
      for(let i in this.atoms) {
         let e = this.atoms[i]
         let sm = e.props.M * e.count
         M += sm
      }
      return round(M, 4)
   }
}

// type identifiers that can be used to define concentration by providing
// an arbitraray volume and mass without calculating a unit of mol/liter
type mass = 'mass'
type mole = 'mole'

type concentration = {
   volume: number
   amount: number
   unit: mass | mole
}

export class Solution {
   public concentration: number
   constructor(public substance: Molecule, c: concentration) {
      let n: number
      if(c.unit == 'mass') {
         n = c.amount / substance.M
      } else {
         n = c.amount
      }
      let V = c.volume
      this.concentration = n / V
   }
}

/**
 * example usage of the Solution and Molecule class:
 * 
 * let HCl = new Solution(new Molecule('HCl'), {
 *    volume: 0.5,
 *    amount: 14,
 *    unit: 'mass'
 * })
 */

export class Reaction {
   constructor(public educts: Molecule[], public products: Molecule[]) {}

   public massPortion(product: Molecule, educt: Molecule): number {
      let eductMol: Molecule
      let productMol: Molecule
      let valid = true

      try {
         eductMol = this.educts.find(m => m.formula == educt.formula)
         productMol = this.products.find(m => m.formula == product.formula)
      } catch(err) {
         console.error(err)
         valid = false
         return
      }

      // if educt and product was found in the reaction molecules
      if(valid) {
         let eductMass: number = eductMol.count * eductMol.M
         let productMass: number = productMol.count * productMol.M
   
         return round(productMass / eductMass, 5)
      }
   }

   public balance() {
      // this array will hold all atoms appearing in the reaction
      let totalAtoms: Atom[] = []
      // initially count atoms
      countAtoms(this)

      let loopcounter = 0
      looper(this)


      function countAtoms(_this) {
         // at first, we loop over the educt Molecule[] and add the contained Atom instances to the totalAtoms array
         for(let eM in _this.educts) {
            for(let eA in _this.educts[eM].atoms) {
               let hasAtom = atom => {
                  return atom.element == _this.educts[eM].atoms[eA].element
               }

               let index = totalAtoms.findIndex(hasAtom)
               let atom = totalAtoms[index]

               if(atom !== undefined) {
                  atom.count += _this.educts[eM].atoms[eA].count
               } else {
                  totalAtoms.push(_this.educts[eM].atoms[eA])
               }
            }
         }

         // we now add the product atoms as well
         for(let pM in _this.products) {
            for(let pA in _this.products[pM].atoms) {
               let hasAtom = atom => {
                  return atom.element == _this.products[pM].atoms[pA].element
               }

               let index = totalAtoms.findIndex(hasAtom)
               let atom = totalAtoms[index]

               if(atom !== undefined) {
                  atom.count += _this.products[pM].atoms[pA].count
               } else {
                  err('Some molecules are malformed!')
               }
            }
         }
      }

      function looper(that) {
         loopcounter++
         for(let eM in that.educts) { // each is of Molecule
            for(let eA in that.educts[eM].atoms) { // each is of Atom
               let eductCount = that.educts[eM].count * that.educts[eM].atoms[eA].count
   
               for(let pM in that.products) { // each is of Molecule
                  // that function checks if a Molecule contains an Atom,
                  // returns true of the element properties are equal
                  let moleculeHas = atom => {
                     return atom.element == that.educts[eM].atoms[eA].element
                  }
   
                  let pA = that.products[pM].atoms.findIndex(moleculeHas)
                  // runs, if the current product Molecule contains the current Atom of the educt
                  if(pA > -1) {
                     let productCount = that.products[pM].count * that.products[pM].atoms[pA].count
   
                     // count molecules up if the atom count is not equal, and run the whole thing again
                     if(productCount > eductCount) {
                        that.educts[eM].count *= productCount/eductCount
                        if(loopcounter < 10) {
                           looper(that)
                        }
                     } else if(productCount < eductCount) {
                        that.products[pM].count *= eductCount/productCount
                        if(loopcounter < 10) {
                           looper(that)
                        }
                     }
                  }
               }
            }
         }
      }
   }
}


export function requiredVol(cStart: number, cTarget: number, volume?: number): number {
   volume = volume || 1
   let frac: number = cStart / cTarget
   return round(volume/frac, 5)
}

export function massRelation(nEduct: number, nProduct: number, MEduct: number, MProduct: number): number {
   let mEduct: number = nEduct * MEduct
   let mProduct: number = nProduct * MProduct
   return round(mProduct / mEduct, 5)
}

function balanceStoich(educts: Molecule[], products: Molecule[]) {
   let eductElements: Atom[] = []
   let productElements: Atom[] = []

   // helps counting up and adding new elements
   function countHelper(source, target) {
      for(let e in source) {
         for(let i in source[e].atoms) {
            let el = source[e].atoms[i]
            let index = objIndex(target, 'element', el.element)
            if(index == -1) {
               target.push(el)
            } else {
               target[index].count++
            }
         }
      }
   }
   countHelper(educts, eductElements)
   countHelper(products, productElements)

   let sFactors = {
      educts: [],
      products: []
   }

   for(let i in educts) {
      sFactors.educts.push({
         count: 1,
         molecule: educts[i]
      })
   }

   for(let i in products) {
      sFactors.products.push({
         count: 1,
         molecule: products[i]
      })
   }

   // these are all elements with their numbers saved
   let atoms: Atom[] = []
   // sum the elements in educts and products together
   countHelper(educts, atoms)
   countHelper(products, atoms)

   /**
   
   C6H12O6 = C2H6O + CO2
   a * C6H12O6 = b * C2H6O + c * CO2

   C: a*6 = b*2 + c*1
   H: a*12 = b*6 + c*0
   O: a*6 = b*1 + c*2

   ... more coming soon
   
   */
}
