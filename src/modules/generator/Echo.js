'use strict';

var Module = require('../Module');

class Echo extends Module {
    constructor() {
        super();
        
        this.arg = 0;
    }
    
    get type() { return 'Echo'; }
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        return arguments[this.arg];
    }
}

module.exports = Echo;
