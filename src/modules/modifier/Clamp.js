'use strict';

var Module = require('../Module');

class Clamp extends Module {
    constructor() {
        super();
        
        this.min = 0;
        this.max = 1;
    }
    
    get type() { return 'Clamp'; }
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.min(this.max, Math.max(this.min, this.sourceModules[0].getValue(x, y, z)));
    }
}

module.exports = Clamp;
