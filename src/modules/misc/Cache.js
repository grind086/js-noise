'use strict';

var Module = require('../Module');

class Abs extends Module {
    constructor() {
        super();
        
        this._isCached = false;
        
        this._lastX = null;
        this._lastY = null;
        this._lastZ = null;
        this._lastValue = null;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        if (!this._isCached || x !== this._lastX || y !== this._lastY || z !== this._lastZ) {
            this._isCached = true;
            
            this._lastX = x;
            this._lastY = y;
            this._lastZ = z;
            this._lastValue = this.sourceModules[0](x, y, z);
        }
        
        return this._lastValue;
    }
}

module.exports = Abs;
