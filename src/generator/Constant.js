'use strict';

var Module = require('../core/Module');

class Constant extends Module {
    constructor() {
        super();
        
        this.value = 0;
    }
    
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        return this.value;
    }
}

module.exports = Constant;
