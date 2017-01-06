'use strict';

var Module = require('../Module');

class Max extends Module {
    constructor() {
        super();
    }
    
    get type() { return 'Max'; }
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return Math.max(this.sourceModules[0].getValue(x, y, z), this.sourceModules[1].getValue(x, y, z));
    }
}

module.exports = Max;
