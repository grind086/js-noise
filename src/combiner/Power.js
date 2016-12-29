'use strict';

var Module = require('../core/Module');

class Power extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return Math.pow(this.sourceModules[0](x, y, z), this.sourceModules[1](x, y, z));
    }
}

module.exports = Power;
