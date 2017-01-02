'use strict';

var Module = require('../Module'),
    SimplexNoise = require('../../noise/Simplex'),
    Mathx = require('../../math');

class Simplex extends Module {
    constructor() {
        super();
        
        this.noise = new SimplexNoise(this.rng);
        this.seed = Date.now();
    }
    
    get sourceModuleCount() { return 0; }
    
    get seed() { return this._seed; }
    set seed(s) { 
        this._seed = s; 
        this.rng = new Mathx.Alea(s);
        this.noise.buildPermutationTable(this.rng);
    }
    
    getValue(x, y, z) {
        return this.noise.getValue(x, y, z);
    }
}

module.exports = Simplex;
