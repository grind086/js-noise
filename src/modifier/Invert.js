'use strict';

var Module = require('../core/Module');

class Invert extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return -this.sourceModules[0](x, y, z);
    }
}

module.exports = Invert;
