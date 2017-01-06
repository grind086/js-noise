'use strict';

var Module = require('../Module');

class Abs extends Module {
    constructor() {
        super();
    }
    
    get type() { return 'Abs'; }
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.abs(this.sourceModules[0].getValue(x, y, z));
    }
}

module.exports = Abs;
