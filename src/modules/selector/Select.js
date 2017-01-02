'use strict';

var Module = require('../Module'),
    Mathx = require('../../math');

class Blend extends Module {
    constructor() {
        super();
        
        this.threshold = 0.5;
        this.edgeFalloff = 0.1;
        this.ease = Mathx.easing.linear;
    }
    
    get sourceModuleCount() { return 3; }
    
    getValue(x, y, z) {
        var alpha = this.sourceModules[2].getValue(x, y, z);
            
        if (alpha <= this.threshold - this.edgeFalloff) {
            return this.sourceModules[0].getValue(x, y, z);
        } else
        if (alpha >= this.threshold + this.edgeFalloff) {
            return this.sourceModules[1].getValue(x, y, z);
        }
        
        var a = this.sourceModules[0].getValue(x, y, z),
            b = this.sourceModules[1].getValue(x, y, z);
            
        alpha -= (this.threshold - this.edgeFalloff);
        alpha /= (2 * this.edgeFalloff);
        
        return Mathx.lerp(a, b, this.ease(alpha));
    }
}

module.exports = Blend;
