'use strict';

var MathUtils = {};

MathUtils.factorial = function(n) {
    var v = 1;
    for (var i = 1; i <= n; i++) {
        v *= i;
    }
    return v;
};

MathUtils.fnv1a = function(octets) {
    var hash = 2166136261;
    
    octets.forEach((n) => {
        hash ^= n & 255;
        hash *= 16777619;
    });
    
    return hash & 0xffffffff;
};

MathUtils.coordHash = function(x, y, z) {
    x = parseInt(x) & 0xffffffff;
    y = parseInt(y) & 0xffffffff;
    z = parseInt(z) & 0xffffffff;
    
    var octets = [
        (x      ) & 255,
        (x >> 8 ) & 255,
        (x >> 16) & 255,
        (x >> 24) & 255,
        (y      ) & 255,
        (y >> 8 ) & 255,
        (y >> 16) & 255,
        (y >> 24) & 255,
        (z      ) & 255,
        (z >> 8 ) & 255,
        (z >> 16) & 255,
        (z >> 24) & 255,
    ];
    
    return MathUtils.fnv1a(octets);
};

module.exports = MathUtils;