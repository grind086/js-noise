'use strict';

var Module = require('../Module');

class TranslatePoint extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 4; }
    
    getValue(x, y, z) {
        var dx = this.sourceModules[0](x, y, z),
            dy = this.sourceModules[1](x, y, z),
            dz = this.sourceModules[2](x, y, z);
            
        return this.sourceModules[3](x + dx, y + dy, z + dz);
    }
}

module.exports = TranslatePoint;
