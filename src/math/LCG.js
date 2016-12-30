'use strict';

class LCG {
    constructor(seed) {
        if (typeof seed != 'number') seed = Date.now();
        
        this.seed = seed;
        this.state = seed;
    }
    
    setSeed(seed) {
        this.seed = seed;
        this.state = seed;
    }
    
    next() {
        return this.state = ((this.state * 1664525 + 1013904223) & 0xffffffff);
    }
    
    random() {
        return this.next() / 0xffffffff + 0.5;
    }
}

module.exports = LCG;