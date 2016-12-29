'use strict';

var Module = require('../core/Module');

class Clamp extends Module {
    constructor() {
        super();
        
        this.exponent = 1;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.pow(this.sourceModules[0](x, y, z), this.exponent);
    }
}

module.exports = Clamp;
