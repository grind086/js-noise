'use strict';

// Based on http://weber.itn.liu.se/~stegu/simplexnoise/SimplexNoise.java
// by Stefan Gustavson (stegu@itn.liu.se)

var Mathx = require('../math');

const F3 = 1/3;
const G3 = 1/6;

const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
];

class Simplex {
    constructor(rng) {
        rng = rng || Math.random;
        
        this.perm = new Uint8Array(512),
        this.perm12 = new Uint8Array(512);
    }
    
    buildPermutationTable(rng) {
        var perm = this.perm,
            perm12 = this.perm12;
        
        for (var i = 0, n; i < 256; i++) {
            n = Math.floor(256 * rng()) & 255;
            
            perm[i]   = perm[i + 256]   = n;
            perm12[i] = perm12[i + 256] = Mathx.mod(n, 12);
        }
    }
    
    dot(grad, x, y, z) {
        return grad[0] * x + grad[1] * y + grad[2] * z;
    }
    
    getValue(x, y, z) {
        var floor = Math.floor,
            perm = this.perm,
            perm12 = this.perm12,
            dot = this.dot;
            
        var s = (x+y+z)*F3;
        
        var i = floor(x+s),
            j = floor(y+s),
            k = floor(z+s);
            
        var t = (i+j+k)*G3;
        
        var x0 = x - (i - t),
            y0 = y - (j - t),
            z0 = z - (k - t);
        
        var i1, j1, k1,
            i2, j2, k2;
            
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1=1; j1=0; k1=0; 
                i2=1; j2=1; k2=0;
            } else
            if (x0 >= z0) {
                i1=1; j1=0; k1=0; 
                i2=1; j2=0; k2=1;
            } else {
                i1=0; j1=0; k1=1; 
                i2=1; j2=0; k2=1;
            }
        } else {
            if (y0 < z0) {
                i1=0; j1=0; k1=1; 
                i2=0; j2=1; k2=1;
            } else
            if (x0 < z0) {
                i1=0; j1=1; k1=0; 
                i2=0; j2=1; k2=1;
            } else {
                i1=0; j1=1; k1=0; 
                i2=1; j2=1; k2=0;
            }
        }
        
        var x1 = x0 - i1 + G3,
            y1 = y0 - j1 + G3,
            z1 = z0 - k1 + G3;
            
        var x2 = x0 - i2 + 2 * G3,
            y2 = y0 - j2 + 2 * G3,
            z2 = z0 - k2 + 2 * G3;
            
        var x3 = x0 - 1 + 3 * G3,
            y3 = y0 - 1 + 3 * G3,
            z3 = z0 - 1 + 3 * G3;
        
        var ii = i & 255,
            jj = j & 255,
            kk = k & 255;
            
        var gi0 = perm12[ii+perm[jj+perm[kk]]],
            gi1 = perm12[ii+i1+perm[jj+j1+perm[kk+k1]]],
            gi2 = perm12[ii+i2+perm[jj+j2+perm[kk+k2]]],
            gi3 = perm12[ii+1+perm[jj+1+perm[kk+1]]];
            
        var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0,
            t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1,
            t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2,
            t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
            
        var n0, n1, n2, n3;
        
        if (t0 < 0) { n0 = 0; }
        else { 
            t0 *= t0; 
            n0 = t0 * t0 * dot(grad3[gi0], x0, y0, z0);
        }
        
        if (t1 < 0) { n1 = 0; }
        else { 
            t1 *= t1; 
            n1 = t1 * t1 * dot(grad3[gi1], x1, y1, z1);
        }
        
        if (t2 < 0) { n2 = 0; }
        else { 
            t2 *= t2; 
            n2 = t2 * t2 * dot(grad3[gi2], x2, y2, z2);
        }
        
        if (t3 < 0) { n3 = 0; }
        else { 
            t3 *= t3; 
            n3 = t3 * t3 * dot(grad3[gi3], x3, y3, z3);
        }
        
        return 32 * (n0 + n1 + n2 + n3);
    }
}

module.exports = Simplex;
