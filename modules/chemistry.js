"use strict";
exports.__esModule = true;
var calc_1 = require("./calc");
var constants_1 = require("./constants");
var helpers_1 = require("./helpers");
// USE OF INTERFACES IN CLASSES
var Molecule = /** @class */ (function () {
    function Molecule(formula) {
        this.formula = formula;
        this.count = 1;
        this.M = 0;
        this.valid = true;
        var e = [];
        e = formula.match(/[A-Z]?[a-z]?[0-9]*/g);
        e.splice(e.length - 1);
        var molecule = [];
        for (var i in e) {
            var element = e[i];
            var name_1 = element.match(/[A-Z]?[a-z]*/g);
            var count = element.match(/[0-9]*/g);
            var newName = '';
            for (var j in name_1) {
                newName += name_1[j];
            }
            name_1 = newName;
            count = count.map(function (x) { return Number(x); });
            for (var j in count) {
                if (count[j] > 0) {
                    count = count[j];
                }
            }
            if (typeof count !== 'number') {
                count = 1;
            }
            if (constants_1.PSE.hasOwnProperty(name_1)) {
                molecule.push({
                    element: String(name_1),
                    count: Number(count),
                    props: constants_1.PSE[name_1]
                });
            }
            else {
                this.valid = false;
            }
        }
        this.atoms = molecule;
        this.M = this.molarMass();
    }
    Molecule.prototype.molarMass = function () {
        var M = 0;
        for (var i in this.atoms) {
            var e = this.atoms[i];
            var sm = e.props.M * e.count;
            M += sm;
        }
        return calc_1.round(M, 4);
    };
    return Molecule;
}());
exports.Molecule = Molecule;
var Solution = /** @class */ (function () {
    function Solution(substance, c) {
        this.substance = substance;
        var n;
        if (c.unit == 'mass') {
            n = c.amount / substance.M;
        }
        else {
            n = c.amount;
        }
        var V = c.volume;
        this.concentration = n / V;
    }
    return Solution;
}());
exports.Solution = Solution;
/**
 * example usage of the Solution and Molecule class:
 *
 * let HCl = new Solution(new Molecule('HCl'), {
 *    volume: 0.5,
 *    amount: 14,
 *    unit: 'mass'
 * })
 */
var Reaction = /** @class */ (function () {
    function Reaction(educts, products) {
        this.educts = educts;
        this.products = products;
    }
    Reaction.prototype.massPortion = function (product, educt) {
        var eductMol;
        var productMol;
        var valid = true;
        try {
            eductMol = this.educts.find(function (m) { return m.formula == educt.formula; });
            productMol = this.products.find(function (m) { return m.formula == product.formula; });
        }
        catch (err) {
            console.error(err);
            valid = false;
            return;
        }
        // if educt and product was found in the reaction molecules
        if (valid) {
            var eductMass = eductMol.count * eductMol.M;
            var productMass = productMol.count * productMol.M;
            return calc_1.round(productMass / eductMass, 5);
        }
    };
    Reaction.prototype.balance = function () {
        // this array will hold all atoms appearing in the reaction
        var totalAtoms = [];
        // initially count atoms
        countAtoms(this);
        var loopcounter = 0;
        looper(this);
        function countAtoms(_this) {
            var _loop_1 = function (eM) {
                var _loop_3 = function (eA) {
                    var hasAtom = function (atom) {
                        return atom.element == _this.educts[eM].atoms[eA].element;
                    };
                    var index = totalAtoms.findIndex(hasAtom);
                    var atom = totalAtoms[index];
                    if (atom !== undefined) {
                        atom.count += _this.educts[eM].atoms[eA].count;
                    }
                    else {
                        totalAtoms.push(_this.educts[eM].atoms[eA]);
                    }
                };
                for (var eA in _this.educts[eM].atoms) {
                    _loop_3(eA);
                }
            };
            // at first, we loop over the educt Molecule[] and add the contained Atom instances to the totalAtoms array
            for (var eM in _this.educts) {
                _loop_1(eM);
            }
            var _loop_2 = function (pM) {
                var _loop_4 = function (pA) {
                    var hasAtom = function (atom) {
                        return atom.element == _this.products[pM].atoms[pA].element;
                    };
                    var index = totalAtoms.findIndex(hasAtom);
                    var atom = totalAtoms[index];
                    if (atom !== undefined) {
                        atom.count += _this.products[pM].atoms[pA].count;
                    }
                    else {
                        helpers_1.err('Some molecules are malformed!');
                    }
                };
                for (var pA in _this.products[pM].atoms) {
                    _loop_4(pA);
                }
            };
            // we now add the product atoms as well
            for (var pM in _this.products) {
                _loop_2(pM);
            }
        }
        function looper(that) {
            loopcounter++;
            var _loop_5 = function (eM) {
                var _loop_6 = function (eA) {
                    var eductCount = that.educts[eM].count * that.educts[eM].atoms[eA].count;
                    for (var pM in that.products) { // each is of Molecule
                        // that function checks if a Molecule contains an Atom,
                        // returns true of the element properties are equal
                        var moleculeHas = function (atom) {
                            return atom.element == that.educts[eM].atoms[eA].element;
                        };
                        var pA = that.products[pM].atoms.findIndex(moleculeHas);
                        // runs, if the current product Molecule contains the current Atom of the educt
                        if (pA > -1) {
                            var productCount = that.products[pM].count * that.products[pM].atoms[pA].count;
                            // count molecules up if the atom count is not equal, and run the whole thing again
                            if (productCount > eductCount) {
                                that.educts[eM].count *= productCount / eductCount;
                                if (loopcounter < 10) {
                                    looper(that);
                                }
                            }
                            else if (productCount < eductCount) {
                                that.products[pM].count *= eductCount / productCount;
                                if (loopcounter < 10) {
                                    looper(that);
                                }
                            }
                        }
                    }
                };
                for (var eA in that.educts[eM].atoms) {
                    _loop_6(eA);
                }
            };
            for (var eM in that.educts) {
                _loop_5(eM);
            }
        }
    };
    return Reaction;
}());
exports.Reaction = Reaction;
function requiredVol(cStart, cTarget, volume) {
    volume = volume || 1;
    var frac = cStart / cTarget;
    return calc_1.round(volume / frac, 5);
}
exports.requiredVol = requiredVol;
function massRelation(nEduct, nProduct, MEduct, MProduct) {
    var mEduct = nEduct * MEduct;
    var mProduct = nProduct * MProduct;
    return calc_1.round(mProduct / mEduct, 5);
}
exports.massRelation = massRelation;
function balanceStoich(educts, products) {
    var eductElements = [];
    var productElements = [];
    // helps counting up and adding new elements
    function countHelper(source, target) {
        for (var e in source) {
            for (var i in source[e].atoms) {
                var el = source[e].atoms[i];
                var index = helpers_1.objIndex(target, 'element', el.element);
                if (index == -1) {
                    target.push(el);
                }
                else {
                    target[index].count++;
                }
            }
        }
    }
    countHelper(educts, eductElements);
    countHelper(products, productElements);
    var sFactors = {
        educts: [],
        products: []
    };
    for (var i in educts) {
        sFactors.educts.push({
            count: 1,
            molecule: educts[i]
        });
    }
    for (var i in products) {
        sFactors.products.push({
            count: 1,
            molecule: products[i]
        });
    }
    // these are all elements with their numbers saved
    var atoms = [];
    // sum the elements in educts and products together
    countHelper(educts, atoms);
    countHelper(products, atoms);
    /**
    
    C6H12O6 = C2H6O + CO2
    a * C6H12O6 = b * C2H6O + c * CO2
 
    C: a*6 = b*2 + c*1
    H: a*12 = b*6 + c*0
    O: a*6 = b*1 + c*2
 
    ... more coming soon
    
    */
}
