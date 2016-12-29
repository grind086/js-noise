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
    
    Noise: {
        Perlin: NYI,
        Simplex: NYI,
        Voronoi: NYI
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
        Voronoi: NYI,
        
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

},{"./modules/combiner/Add":4,"./modules/combiner/Max":5,"./modules/combiner/Min":6,"./modules/combiner/Multiply":7,"./modules/combiner/Power":8,"./modules/generator/Checkerboard":9,"./modules/generator/Constant":10,"./modules/misc/Cache":11,"./modules/modifier/Abs":12,"./modules/modifier/Clamp":13,"./modules/modifier/Exponent":14,"./modules/modifier/Invert":15,"./modules/modifier/ScaleBias":16,"./modules/transformer/Displace":17,"./modules/transformer/ScalePoint":18,"./modules/transformer/TranslatePoint":19,"alea":1}],3:[function(require,module,exports){
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
        
        list.forEach(this.sourceModules.push);
    }
}

module.exports = Module;

},{}],4:[function(require,module,exports){
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

},{"../Module":3}],5:[function(require,module,exports){
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

},{"../Module":3}],6:[function(require,module,exports){
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

},{"../Module":3}],7:[function(require,module,exports){
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

},{"../Module":3}],8:[function(require,module,exports){
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

},{"../Module":3}],9:[function(require,module,exports){
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

},{"../Module":3}],10:[function(require,module,exports){
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

},{"../Module":3}],11:[function(require,module,exports){
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

},{"../Module":3}],12:[function(require,module,exports){
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

},{"../Module":3}],13:[function(require,module,exports){
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

},{"../Module":3}],14:[function(require,module,exports){
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

},{"../Module":3}],15:[function(require,module,exports){
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

},{"../Module":3}],16:[function(require,module,exports){
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

},{"../Module":3}],17:[function(require,module,exports){
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

},{"../Module":3}],18:[function(require,module,exports){
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

},{"../Module":3}],19:[function(require,module,exports){
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

},{"../Module":3}]},{},[2]);
