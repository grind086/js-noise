'use strict';

var Module = require('../Module');

class ScaleBias extends Module {
    constructor() {
        super();
        
        this.scale = 1;
        this.bias = 0;
    }
    
    get type() { return 'ScaleBias'; }
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return this.scale * this.sourceModules[0].getValue(x, y, z) + this.bias;
    }
}

module.exports = ScaleBias;
