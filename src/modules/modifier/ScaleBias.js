'use strict';

var Module = require('../Module');

class Clamp extends Module {
    constructor() {
        super();
        
        this.scale = 1;
        this.bias = 0;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return this.scale * this.sourceModules[0](x, y, z) + this.bias;
    }
}

module.exports = Clamp;
