'use strict';

var utils = require('./utils'),
    easing = require('./easing'),
    Alea = require('alea'),
    LCG = require('./LCG'),
    Poisson = require('./Poisson'),
    Tween = require('./Tween');
    
var Mathx = {
    lerp: utils.lerp,
    mod: utils.mod,
    clamp: utils.clamp,
    factorial: utils.factorial,
    fnv1a: utils.fnv1a,
    coordHash: utils.coordHash,
    
    easing: easing,
    
    Alea: Alea,
    LCG: LCG,
    Poisson: Poisson,
    Tween: Tween
};

module.exports = Mathx;