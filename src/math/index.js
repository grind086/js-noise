'use strict';

var utils = require('./utils'),
    easing = require('./easing'),
    LCG = require('./LCG'),
    Poisson = require('./Poisson'),
    Tween = require('./Tween');
    
var Mathx = {
    lerp: utils.lerp,
    mod: utils.mod,
    factorial: utils.factorial,
    fnv1a: utils.fnv1a,
    coordHash: utils.coordHash,
    
    easing: easing,
    
    LCG: LCG,
    Poisson: Poisson,
    Tween: Tween
};

module.exports = Mathx;