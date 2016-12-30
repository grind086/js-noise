'use strict';

var utils = require('./utils'),
    LCG = require('./LCG'),
    Poisson = require('./Poisson'),
    Tween = require('./Tween');
    
var Mathx = {
    factorial: utils.factorial,
    fnv1a: utils.fnv1a,
    coordHash: utils.coordHash,
    
    LCG: LCG,
    Poisson: Poisson,
    Tween: Tween
};

module.exports = Mathx;