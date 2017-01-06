'use strict';

var Module = require('../Module');

class Constant extends Module {
    constructor() {
        super();
        
        this.value = 0;
    }
    
    get type() { return 'Constant'; }
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        return this.value;
    }
}

module.exports = Constant;
