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
const NYI = function() { throw new Error('Not yet implemented'); };

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
        Simplex: require('./modules/generator/Simplex'),
        RidgedMulti: NYI,
        Spheres: NYI,
        Voronoi: require('./modules/generator/Voronoi'),
        
        // Modifiers
        Abs: require('./modules/modifier/Abs'),
        Clamp: require('./modules/modifier/Clamp'),
        Curve: NYI,
        Exponent: require('./modules/modifier/Exponent'),
        FBM: require('./modules/modifier/FBM'),
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

},{"./math":7,"./modules/combiner/Add":10,"./modules/combiner/Max":11,"./modules/combiner/Min":12,"./modules/combiner/Multiply":13,"./modules/combiner/Power":14,"./modules/generator/Checkerboard":15,"./modules/generator/Constant":16,"./modules/generator/Simplex":17,"./modules/generator/Voronoi":18,"./modules/misc/Cache":19,"./modules/modifier/Abs":20,"./modules/modifier/Clamp":21,"./modules/modifier/Exponent":22,"./modules/modifier/FBM":23,"./modules/modifier/Invert":24,"./modules/modifier/ScaleBias":25,"./modules/transformer/Displace":26,"./modules/transformer/ScalePoint":27,"./modules/transformer/TranslatePoint":28,"./noise/Voronoi":30,"alea":1}],3:[function(require,module,exports){
'use strict';

class LCG {
    constructor(seed) {
        if (typeof seed != 'number') seed = Date.now();
        
        this.setSeed(seed);
    }
    
    setSeed(seed) {
        this.seed = seed & 0xffffffff;
        this.state = this.seed;
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

var easing = require('./easing'),
    utils = require('./utils');

class Tween {
    constructor(points, attr) {
        this.attr = attr;
        this.points = [];
        this.ease = easing.linear;
        
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
            
        var alpha = this.ease((t - a[0]) / (b[0] - a[0]));
        
        var result;
        
        if (Array.isArray(this.attr)) {
            result = {};
            
            this.attr.forEach((attr) => {
                result[attr] = utils.lerp(a[1][attr], b[1][attr], alpha);
            });
        } else {
            result = utils.lerp(a[1], b[1], alpha);
        }
        
        return result;
    }
}

module.exports = Tween;
},{"./easing":6,"./utils":8}],6:[function(require,module,exports){
'use strict';

// Originally from https://gist.github.com/gre/1650294

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
  
  // step
  step: function(t) { return t<.5 ? 0 : 1 }
};

module.exports = EasingFunctions;
},{}],7:[function(require,module,exports){
'use strict';

var utils = require('./utils'),
    easing = require('./easing'),
    Alea = require('alea'),
    LCG = require('./LCG'),
    Poisson = require('./Poisson'),
    Tween = require('./Tween');
    
var Mathx = {
    lerp: utils.lerp,
    mod: utils.mod,
    factorial: utils.factorial,
    fnv1a: utils.fnv1a,
    coordHash: utils.coordHash,
    
    easing: easing,
    
    Alea: Alea,
    LCG: LCG,
    Poisson: Poisson,
    Tween: Tween
};

module.exports = Mathx;
},{"./LCG":3,"./Poisson":4,"./Tween":5,"./easing":6,"./utils":8,"alea":1}],8:[function(require,module,exports){
'use strict';

var MathUtils = {};

MathUtils.lerp = function(a, b, alpha) {
    return (1 - alpha) * a + alpha * b;
};

MathUtils.mod = function(n, mod) {
    return ((n % mod) + mod) % mod;
};

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
    SimplexNoise = require('../../noise/Simplex'),
    Mathx = require('../../math');

class Simplex extends Module {
    constructor() {
        super();
        
        this.noise = new SimplexNoise(this.rng);
        this.seed = Date.now();
    }
    
    get sourceModuleCount() { return 0; }
    
    get seed() { return this._seed; }
    set seed(s) { 
        this._seed = s; 
        this.rng = new Mathx.Alea(s);
        this.noise.buildPermutationTable(this.rng);
    }
    
    getValue(x, y, z) {
        return this.noise.getValue(x, y, z);
    }
}

module.exports = Simplex;

},{"../../math":7,"../../noise/Simplex":29,"../Module":9}],18:[function(require,module,exports){
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

},{"../../math":7,"../../noise/Voronoi":30,"../Module":9}],19:[function(require,module,exports){
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

},{"../Module":9}],20:[function(require,module,exports){
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

},{"../Module":9}],21:[function(require,module,exports){
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

},{"../Module":9}],22:[function(require,module,exports){
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

},{"../Module":9}],23:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class FBM extends Module {
    constructor() {
        super();
        
        this.octaves = 8;
        this.persistence = 0.5;
        this.lacunarity = 2;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        var val = 0,
            max = 0,
            a = 1,
            f = 1;
            
        for (var i = 0; i < this.octaves; i++) {
            val += this.sourceModules[0].getValue(x * f, y * f, z * f) * a;
            
            max += a;
            a *= this.persistence;
            f *= this.lacunarity;
        }
        
        return val / max;
    }
}

module.exports = FBM;

},{"../Module":9}],24:[function(require,module,exports){
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

},{"../Module":9}],25:[function(require,module,exports){
'use strict';

var Module = require('../Module');

class ScaleBias extends Module {
    constructor() {
        super();
        
        this.scale = 1;
        this.bias = 0;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        return this.scale * this.sourceModules[0].getValue(x, y, z) + this.bias;
    }
}

module.exports = ScaleBias;

},{"../Module":9}],26:[function(require,module,exports){
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

},{"../Module":9}],27:[function(require,module,exports){
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

},{"../Module":9}],28:[function(require,module,exports){
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

},{"../Module":9}],29:[function(require,module,exports){
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

},{"../math":7}],30:[function(require,module,exports){
'use strict';

var Mathx = require('../math');

class Voronoi {
    constructor(meanPoints, seed) {
        this.seed = seed || Date.now();
        this.rng = new Mathx.LCG();
        this.dist = new Mathx.Poisson((meanPoints || 1) - 1);
        
        this.wrapX = 0;
        this.wrapY = 0;
        this.wrapZ = 0;
        
        this._prevCube = [null, null, null];
        this._prevPoints = [];
    }
    
    getValue(x, y, z) {
        var seed = this.seed,
            rng = this.rng,
            dist = this.dist,
            hash = Mathx.coordHash;
            
        var wx = this.wrapX,
            wy = this.wrapY,
            wz = this.wrapZ;
            
        var ix = Math.floor(x),
            iy = Math.floor(y),
            iz = Math.floor(z);
            
        var points = this._prevPoints;
        
        if (ix !== this._prevCube[0] || iy !== this._prevCube[1] || iz !== this._prevCube[2]) {
            points = [];
    
            var cx, cy, cz, dx, dy, dz, n, px, py, pz;
            for (dx = -1; dx < 2; dx++) {
                for (dy = -1; dy < 2; dy++) {
                    for (dz = -1; dz < 2; dz++) {
                        cx = ix + dx;
                        cy = iy + dy;
                        cz = iz + dz;
                        
                        rng.setSeed(seed + hash(
                            wx > 0 ? Mathx.mod(cx, wx) : cx,
                            wy > 0 ? Mathx.mod(cy, wy) : cy,
                            wz > 0 ? Mathx.mod(cz, wz) : cz
                        ));
                        
                        for (n = dist.choose(rng.random()) + 1; n > 0; n--) {
                            px = cx + rng.random();
                            py = cy + rng.random();
                            pz = cz + rng.random();
                            
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
