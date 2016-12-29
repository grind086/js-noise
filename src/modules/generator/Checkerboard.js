'use strict';

var Module = require('../Module');

class Checkerboard extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        return ((Math.floor(x) + Math.floor(y) + Math.floor(z)) & 1) ? -1 : 1;
    }
}

module.exports = Checkerboard;
