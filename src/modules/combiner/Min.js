'use strict';

var Module = require('../Module');

class Min extends Module {
    constructor() {
        super();
    }
    
    get type() { return 'Min'; }
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return Math.min(this.sourceModules[0].getValue(x, y, z), this.sourceModules[1].getValue(x, y, z));
    }
}

module.exports = Min;
