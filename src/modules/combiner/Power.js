'use strict';

var Module = require('../Module');

class Power extends Module {
    constructor() {
        super();
    }
    
    get type() { return 'Power'; }
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return Math.pow(this.sourceModules[0].getValue(x, y, z), this.sourceModules[1].getValue(x, y, z));
    }
}

module.exports = Power;
