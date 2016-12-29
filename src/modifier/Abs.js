'use strict';

var Module = require('../core/Module');

class Abs extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.abs(this.sourceModules[0](x, y, z));
    }
}

module.exports = Abs;
