'use strict';

var Module = require('../core/Module');

class Multiply extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return this.sourceModules[0](x, y, z) * this.sourceModules[1](x, y, z);
    }
}

module.exports = Multiply;
