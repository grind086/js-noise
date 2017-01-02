'use strict';

var Module = require('../Module');

class Exponent extends Module {
    constructor() {
        super();
        
        this.exponent = 1;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.pow(this.sourceModules[0].getValue(x, y, z), this.exponent);
    }
}

module.exports = Exponent;
