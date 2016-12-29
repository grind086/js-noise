'use strict';

var Module = require('../core/Module');

class TranslatePoint extends Module {
    constructor() {
        super();
        
        this.transX = 0;
        this.transY = 0;
        this.transZ = 0;
    }
    
    get sourceModuleCount() { return 1; }
    
    setTranslation(x, y, z) {
        if (y === undefined) {
            y = x;
            z = x;
        }
        
        this.transX = x;
        this.transY = y;
        this.transZ = z;
    }
    
    getValue(x, y, z) {
        return this.sourceModules[0](x + this.transX, y + this.transY, z + this.transZ);
    }
}

module.exports = TranslatePoint;
