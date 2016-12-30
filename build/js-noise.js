(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (root, factory) {
  if (typeof exports === 'object') {
      module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
      define(factory);
  } else {
      root.Alea = factory();
  }
}(this, function () {

  'use strict';

  // From http://baagoe.com/en/RandomMusings/javascript/

  // importState to sync generator states
  Alea.importState = function(i){
    var random = new Alea();
    random.importState(i);
    return random;
  };

  return Alea;

  function Alea() {
    return (function(args) {
      // Johannes Baagøe <baagoe@baagoe.com>, 2010
      var s0 = 0;
      var s1 = 0;
      var s2 = 0;
      var c = 1;

      if (args.length == 0) {
        args = [+new Date];
      }
      var mash = Mash();
      s0 = mash(' ');
      s1 = mash(' ');
      s2 = mash(' ');

      for (var i = 0; i < args.length; i++) {
        s0 -= mash(args[i]);
        if (s0 < 0) {
          s0 += 1;
        }
        s1 -= mash(args[i]);
        if (s1 < 0) {
          s1 += 1;
        }
        s2 -= mash(args[i]);
        if (s2 < 0) {
          s2 += 1;
        }
      }
      mash = null;

      var random = function() {
        var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
      };
      random.uint32 = function() {
        return random() * 0x100000000; // 2^32
      };
      random.fract53 = function() {
        return random() + 
          (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
      };
      random.version = 'Alea 0.9';
      random.args = args;

      // my own additions to sync state between two generators
      random.exportState = function(){
        return [s0, s1, s2, c];
      };
      random.importState = function(i){
        s0 = +i[0] || 0;
        s1 = +i[1] || 0;
        s2 = +i[2] || 0;
        c = +i[3] || 0;
      };
 
      return random;

    } (Array.prototype.slice.call(arguments)));
  }

  function Mash() {
    var n = 0xefc8249d;

    var mash = function(data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };

    mash.version = 'Mash 0.9';
    return mash;
  }
}));

},{}],2:[function(require,module,exports){
const NYI = () => { throw new Error('Not yet implemented'); };

var JSNoise = {
    r: 0,
    
    Random: require('alea'),
    
    Mathx: require('./math'),
    
    Noise: {
        Perlin: NYI,
        Simplex: NYI,
        Voronoi: require('./noise/Voronoi')
    },
    
    Module: {
        // Generators
        Billow: NYI,
        Checkerboard: require('./modules/generator/Checkerboard'),
        Constant: require('./modules/generator/Constant'),
        Cylinders: NYI,
        Perlin: NYI,
        Simplex: NYI,
        RidgedMulti: NYI,
        Spheres: NYI,
        Voronoi: require('./modules/generator/Voronoi'),
        
        // Modifiers
        Abs: require('./modules/modifier/Abs'),
        Clamp: require('./modules/modifier/Clamp'),
        Curve: NYI,
        Exponent: require('./modules/modifier/Exponent'),
        Invert: require('./modules/modifier/Invert'),
        ScaleBias: require('./modules/modifier/ScaleBias'),
        Terrace: NYI,
        
        // Combiners
        Add: require('./modules/combiner/Add'),
        Max: require('./modules/combiner/Max'),
        Min: require('./modules/combiner/Min'),
        Multiply: require('./modules/combiner/Multiply'),
        Power: require('./modules/combiner/Power'),
        
        // Selectors
        Blend: NYI,
        Select: NYI,
        
        // Transformers
        Displace: require('./modules/transformer/Displace'),
        RotatePoint: NYI,
        ScalePoint: require('./modules/transformer/ScalePoint'),
        TranslatePoint: require('./modules/transformer/TranslatePoint'),
        Turbulence: NYI,
        
        // Misc
        Cache: require('./modules/misc/Cache')
    }
};

module.exports = JSNoise;

if (typeof window == 'object') window.JSNoise = JSNoise;

},{"./math":7,"./modules/combiner/Add":10,"./modules/combiner/Max":11,"./modules/combiner/Min":12,"./modules/combiner/Multiply":13,"./modules/combiner/Power":14,"./modules/generator/Checkerboard":15,"./modules/generator/Constant":16,"./modules/generator/Voronoi":17,"./modules/misc/Cache":18,"./modules/modifier/Abs":19,"./modules/modifier/Clamp":20,"./modules/modifier/Exponent":21,"./modules/modifier/Invert":22,"./modules/modifier/ScaleBias":23,"./modules/transformer/Displace":24,"./modules/transformer/ScalePoint":25,"./modules/transformer/TranslatePoint":26,"./noise/Voronoi":27,"alea":1}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');

class Poisson extends Array {
    constructor(mean, threshold) {
        super();
        
        if (!threshold) threshold = 0.0001;
        
        this.mean = mean;
        
        var ptot = 1,
            i = 0,
            p;
            
        while (ptot > threshold) {
            p = this.probability(i);
            this[i++] = p;
            ptot -= p;
        }
        
        this[i] = ptot;
    }
    
    probability(k) {
        return Math.pow(this.mean, k) * Math.pow(Math.E, -this.mean) / utils.factorial(k);
    }
    
    choose(n) {
        n = n ? n : Math.random();
        
        for (var i = 0; i < this.length; i++) {
            n -= this[i];
            if (n <= 0) return i;
        }
        
        return i;
    }
}

module.exports = Poisson;
},{"./utils":8}],5:[function(require,module,exports){
'use strict';

var easing = require('./easing');

class Tween {
    constructor(points, attr) {
        this.attr = attr;
        this.points = [];
        this.ease = easing.lerp;
        
        points.forEach((pt) => {
            this.addPoint(pt[0], pt[1]);
        });
    }
    
    addPoint(t, obj) {
        var points = this.points;
        
        for (var i = 0; i < points.length; i++) {
            if (t < points[i][0]) {
                break;
            }
        }
        
        points.splice(i, 0, [t, obj]);
    }
    
    value(t) {
        var points = this.points;
        
        for (var i = 0; i < points.length; i++) {
            if (t <= points[i][0]) {
                break;
            }
        }
        
        // Handle edge cases
        
        if (i === 0) {
            return points[0][1];
        }
        else if (i === points.length) {
            return points[points.length - 1][1];
        }
        
        //
        
        var a = points[i - 1],
            b = points[i];
            
        var alpha = (t - a[0]) / (b[0] - a[0]);
        
        var result;
        
        if (Array.isArray(this.attr)) {
            result = {};
            
            this.attr.forEach((attr) => {
                result[attr] = this.ease(a[1][attr], b[1][attr], alpha);
            });
        } else {
            result = this.ease(a[1], b[1], alpha);
        }
        
        return result;
    }
}

module.exports = Tween;
},{"./easing":6}],6:[function(require,module,exports){
'use strict';

var MathEasing = {};

MathEasing.lerp = function(a, b, alpha) {
    return (1 - alpha) * a + alpha * b;
};

module.exports = MathEasing;
},{}],7:[function(require,module,exports){
'use strict';

var utils = require('./utils'),
    LCG = require('./LCG'),
    Poisson = require('./Poisson'),
    Tween = require('./Tween');
    
var Mathx = {
    factorial: utils.factorial,
    fnv1a: utils.fnv1a,
    coordHash: utils.coordHash,
    
    LCG: LCG,
    Poisson: Poisson,
    Tween: Tween
};

module.exports = Mathx;
},{"./LCG":3,"./Poisson":4,"./Tween":5,"./utils":8}],8:[function(require,module,exports){
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
    x = Math.floor(x) & 0xffffffff;
    y = Math.floor(y) & 0xffffffff;
    z = Math.floor(z) & 0xffffffff;
    
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
},{}],9:[function(require,module,exports){
'use strict';

class Module {
    constructor() {
        this.sourceModules = [];
    }
    
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        throw new Error('Module.getValue must be overwritten');
    }
    
    setSourceModules(list) {
        if (list.length !== this.sourceModuleCount) {
            throw new Error(`Got ${list.length} sources, expected ${this.sourceModuleCount}`);
        }
        
        this.sourceModules.length = this.sourceModuleCount;
        
        list.forEach((el, i) => {
            this.sourceModules[i] = el;
        });
    }
}

module.exports = Module;

},{}],10:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Add extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return this.sourceModules[0](x, y, z) + this.sourceModules[1](x, y, z);
    }
}

module.exports = Add;

},{"../Module":9}],11:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Max extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return Math.max(this.sourceModules[0](x, y, z), this.sourceModules[1](x, y, z));
    }
}

module.exports = Max;

},{"../Module":9}],12:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Min extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return Math.min(this.sourceModules[0](x, y, z), this.sourceModules[1](x, y, z));
    }
}

module.exports = Min;

},{"../Module":9}],13:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Multiply extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return this.sourceModules[0](x, y, z) * this.sourceModules[1](x, y, z);
    }
}

module.exports = Multiply;

},{"../Module":9}],14:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Power extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 2; }
    
    getValue(x, y, z) {
        return Math.pow(this.sourceModules[0](x, y, z), this.sourceModules[1](x, y, z));
    }
}

module.exports = Power;

},{"../Module":9}],15:[function(require,module,exports){
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

},{"../Module":9}],16:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Constant extends Module {
    constructor() {
        super();
        
        this.value = 0;
    }
    
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        return this.value;
    }
}

module.exports = Constant;

},{"../Module":9}],17:[function(require,module,exports){
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

},{"../../math":7,"../../noise/Voronoi":27,"../Module":9}],18:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Abs extends Module {
    constructor() {
        super();
        
        this._isCached = false;
        
        this._lastX = null;
        this._lastY = null;
        this._lastZ = null;
        this._lastValue = null;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        if (!this._isCached || x !== this._lastX || y !== this._lastY || z !== this._lastZ) {
            this._isCached = true;
            
            this._lastX = x;
            this._lastY = y;
            this._lastZ = z;
            this._lastValue = this.sourceModules[0](x, y, z);
        }
        
        return this._lastValue;
    }
}

module.exports = Abs;

},{"../Module":9}],19:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Abs extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.abs(this.sourceModules[0](x, y, z));
    }
}

module.exports = Abs;

},{"../Module":9}],20:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Clamp extends Module {
    constructor() {
        super();
        
        this.min = 0;
        this.max = 1;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.min(this.max, Math.max(this.min, this.sourceModules[0](x, y, z)));
    }
}

module.exports = Clamp;

},{"../Module":9}],21:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Clamp extends Module {
    constructor() {
        super();
        
        this.exponent = 1;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return Math.pow(this.sourceModules[0](x, y, z), this.exponent);
    }
}

module.exports = Clamp;

},{"../Module":9}],22:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Invert extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return -this.sourceModules[0](x, y, z);
    }
}

module.exports = Invert;

},{"../Module":9}],23:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class Clamp extends Module {
    constructor() {
        super();
        
        this.scale = 1;
        this.bias = 0;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return this.scale * this.sourceModules[0](x, y, z) + this.bias;
    }
}

module.exports = Clamp;

},{"../Module":9}],24:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class TranslatePoint extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 4; }
    
    getValue(x, y, z) {
        var dx = this.sourceModules[0](x, y, z),
            dy = this.sourceModules[1](x, y, z),
            dz = this.sourceModules[2](x, y, z);
            
        return this.sourceModules[3](x + dx, y + dy, z + dz);
    }
}

module.exports = TranslatePoint;

},{"../Module":9}],25:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class TranslatePoint extends Module {
    constructor() {
        super();
        
        this.scaleX = 0;
        this.scaleY = 0;
        this.scaleZ = 0;
    }
    
    get sourceModuleCount() { return 1; }
    
    setScale(x, y, z) {
        if (y === undefined) {
            y = x;
            z = x;
        }
        
        this.scaleX = x;
        this.scaleY = y;
        this.scaleZ = z;
    }
    
    getValue(x, y, z) {
        return this.sourceModules[0](x + this.scaleX, y + this.scaleY, z + this.scaleZ);
    }
}

module.exports = TranslatePoint;

},{"../Module":9}],26:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class TranslatePoint extends Module {
    constructor() {
        super();
        
        this.transX = 0;
        this.transY = 0;
        this.transZ = 0;
    }
    
    get sourceModuleCount() { return 1; }
    
    setTranslation(x, y, z) {
        if (y === undefined) {
            y = x;
            z = x;
        }
        
        this.transX = x;
        this.transY = y;
        this.transZ = z;
    }
    
    getValue(x, y, z) {
        return this.sourceModules[0](x + this.transX, y + this.transY, z + this.transZ);
    }
}

module.exports = TranslatePoint;

},{"../Module":9}],27:[function(require,module,exports){
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
},{"../math":7}]},{},[2]);
