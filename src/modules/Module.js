'use strict';

var Mathx = require('../math');

class Module {
    constructor() {
        this.uid = Mathx.uuid();
        this.sourceModules = [];
    }
    
    get type() { throw new Error('Module.type must be overwritten'); }
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        throw new Error('Module.getValue must be overwritten');
    }
    
    setSourceModules(list) {
        if (list.length !== this.sourceModuleCount) {
            throw new Error(`Got ${list.length} sources, expected ${this.sourceModuleCount}`);
        }
        
        this.sourceModules.length = this.sourceModuleCount;
        
        list.forEach((el, i) => {
            this.sourceModules[i] = el;
        });
    }
}

module.exports = Module;
