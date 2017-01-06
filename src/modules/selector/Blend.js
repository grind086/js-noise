'use strict';

var Module = require('../Module'),
    Mathx = require('../../math');

class Blend extends Module {
    constructor() {
        super();
        
        this.ease = Mathx.easing.linear;
    }
    
    get type() { return 'Blend'; }
    get sourceModuleCount() { return 3; }
    
    getValue(x, y, z) {
        var a = this.sourceModules[0].getValue(x, y, z),
            b = this.sourceModules[1].getValue(x, y, z),
            alpha = this.sourceModules[2].getValue(x, y, z);
            
        return Mathx.lerp(a, b, this.ease(alpha));
    }
}

module.exports = Blend;
