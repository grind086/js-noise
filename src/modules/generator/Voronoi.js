'use strict';

var Module = require('../Module'),
    VoronoiNoise = require('../noise/Voronoi'),
    Mathx = require('../math');

class Voronoi extends Module {
    constructor() {
        super();
        
        this.noise = new VoronoiNoise(3);
        this.meanPoints = 3;
        this.seed = Date.now();
    }
    
    get sourceModuleCount() { return 0; }
    
    get seed() { return this.noise.rng.seed; }
    set seed(s) { this.noise.rng.setSeed(s); }
    
    get meanPoints() { return this.noise.dist.mean; }
    set meanPoints(n) {
        if (this.meanPoints !== n) {
            this.noise.dist = new Mathx.Poisson(n);
        }
    }
    
    getValue(x, y, z) {
        return this.noise.getValue(x, y, z);
    }
}

module.exports = Voronoi;
