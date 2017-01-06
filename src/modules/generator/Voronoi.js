'use strict';

var Module = require('../Module'),
    VoronoiNoise = require('../../noise/Voronoi'),
    Mathx = require('../../math');

class Voronoi extends Module {
    constructor() {
        super();
        
        this.noise = new VoronoiNoise(3);
        this.meanPoints = 3;
        this.seed = Date.now();
    }
    
    get type() { return 'Voronoi'; }
    get sourceModuleCount() { return 0; }
    
    get seed() { return this.noise.seed; }
    set seed(s) { this.noise.seed = s; }
    
    get meanPoints() { return this.noise.dist.mean + 1; }
    set meanPoints(n) {
        if (this.meanPoints !== n) {
            this.noise.dist = new Mathx.Poisson(n - 1);
        }
    }
    
    getValue(x, y, z) {
        return this.noise.getValue(x, y, z);
    }
}

module.exports = Voronoi;
