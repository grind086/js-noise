'use strict';

var Mathx = require('../math');

class Voronoi {
    constructor(meanPoints) {
        this.rng = new Mathx.LCG();
        this.dist = new Mathx.Poisson(meanPoints);
    }
    
    getValue(x, y, z) {
        var rng = this.rng,
            dist = this.dist,
            hash = Mathx.coordHash;
            
        var ix = Math.floor(x),
            iy = Math.floor(y),
            iz = Math.floor(z);
        
        var minDist = Infinity;

        var dx, dy, dz, n, px, py, pz, distX, distY, distZ, distSq;
        for (dx = -1; dx < 2; dx++) {
            for (dy = -1; dy < 2; dy++) {
                for (dz = -1; dz < 2; dz++) {
                    rng.setSeed(hash(ix + dx, iy + dy, iz + dz));
                    
                    for (n = dist.choose(rng.random()); n > 0; n--) {
                        px = ix + dx + rng.random();
                        py = iy + dy + rng.random();
                        pz = iz + dz + rng.random();
                        
                        distX = x - px;
                        distY = y - py;
                        distZ = z - pz;
                        
                        distSq = distX * distX + distY * distY + distZ * distZ;
                        
                        if (distSq < minDist) {
                            minDist = distSq;
                        }
                    }
                }
            }
        }
        
        return Math.min(1, Math.max(0, Math.sqrt(minDist)));
    }
}

module.exports = Voronoi;