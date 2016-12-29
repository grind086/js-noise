'use strict';

var Module = require('../core/Module');

class Clamp extends Module {
    constructor() {
        super();
        
        this.min = 0;
        this.max = 1;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.min(this.max, Math.max(this.min, this.sourceModules[0](x, y, z)));
    }
}

module.exports = Clamp;
