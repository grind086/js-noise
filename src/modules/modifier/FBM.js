'use strict';

var Module = require('../Module');

class FBM extends Module {
    constructor() {
        super();
        
        this.octaves = 8;
        this.persistence = 0.5;
        this.lacunarity = 2;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        var val = 0,
            max = 0,
            a = 1,
            f = 1;
            
        for (var i = 0; i < this.octaves; i++) {
            val += this.sourceModules[0].getValue(x * f, y * f, z * f) * a;
            
            max += a;
            a *= this.persistence;
            f *= this.lacunarity;
        }
        
        return val / max;
    }
}

module.exports = FBM;
