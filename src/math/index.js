'use strict';

var utils = require('./utils'),
    LCG = require('./LCG'),
    Poisson = require('./Poisson');
    
var Mathx = {
    factorial: utils.factorial,
    fnv1a: utils.fnv1a,
    coordHash: utils.coordHash,
    
    LCG: LCG,
    Poisson: Poisson
};

module.exports = Mathx;