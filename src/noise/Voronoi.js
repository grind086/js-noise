'use strict';

var Mathx = require('../math');

class Voronoi {
    constructor(meanPoints, seed) {
        this.seed = seed || Date.now();
        this.rng = new Mathx.LCG();
        this.dist = new Mathx.Poisson((meanPoints || 1) - 1);
        
        this._prevCube = [null, null, null];
        this._prevPoints = [];
    }
    
    getValue(x, y, z) {
        var seed = this.seed,
            rng = this.rng,
            dist = this.dist,
            hash = Mathx.coordHash;
            
        var ix = Math.floor(x),
            iy = Math.floor(y),
            iz = Math.floor(z);
            
        var points = this._prevPoints;
        
        if (ix !== this._prevCube[0] || iy !== this._prevCube[1] || iz !== this._prevCube[2]) {
            points = [];
    
            var dx, dy, dz, n, px, py, pz;
            for (dx = -1; dx < 2; dx++) {
                for (dy = -1; dy < 2; dy++) {
                    for (dz = -1; dz < 2; dz++) {
                        rng.setSeed(seed + hash(ix + dx, iy + dy, iz + dz));
                        
                        for (n = dist.choose(rng.random()) + 1; n > 0; n--) {
                            px = ix + dx + rng.random();
                            py = iy + dy + rng.random();
                            pz = iz + dz + rng.random();
                            
                            points.push([px, py, pz]);
                        }
                    }
                }
            }
            
            this._prevCube = [ix, iy, iz];
            this._prevPoints = points;
        }
        
        var minDist = Infinity;
        
        var distX, distY, distZ, distSq;
        points.forEach((pt) => {
            distX = x - pt[0];
            distY = y - pt[1];
            distZ = z - pt[2];
            
            distSq = distX * distX + distY * distY + distZ * distZ;
            
            if (distSq < minDist) {
                minDist = distSq;
            }
        });
        
        return Math.min(1, Math.max(0, Math.sqrt(minDist)));
    }
}

module.exports = Voronoi;