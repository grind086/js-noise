'use strict';

var Module = require('../Module');

class Multiply extends Module {
    constructor() {
        super();
    }
    
    get type() { return 'Multiply'; }
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return this.sourceModules[0].getValue(x, y, z) * this.sourceModules[1].getValue(x, y, z);
    }
}

module.exports = Multiply;
