'use strict';

var Module = require('../Module');

class Displace extends Module {
    constructor() {
        super();
    }
    
    get type() { return 'Displace'; }
    get sourceModuleCount() { return 4; }
    
    getValue(x, y, z) {
        var dx = this.sourceModules[0].getValue(x, y, z),
            dy = this.sourceModules[1].getValue(x, y, z),
            dz = this.sourceModules[2].getValue(x, y, z);
            
        return this.sourceModules[3].getValue(x + dx, y + dy, z + dz);
    }
}

module.exports = Displace;
