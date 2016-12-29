(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],2:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],3:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],4:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],5:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

class Checkerboard extends Module {
    constructor() {
        super();
    }
    
    get sourceModuleCount() { return 0; }
    
    getValue(x, y, z) {
        return (Math.floor(x) + Math.floor(y) + Math.floor(z)) & 1;
    }
}

module.exports = Checkerboard;

},{"../core/Module":6}],8:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],9:[function(require,module,exports){
const NYI = () => { throw new Error('Not yet implemented'); };

var LibNoise = {
    r: 0,
    
    Module: {
        // Generators
        Billow: NYI,
        Checkerboard: require('./generator/Checkerboard'),
        Constant: require('./generator/Constant'),
        Cylinders: NYI,
        Perlin: NYI,
        Simplex: NYI,
        RidgedMulti: NYI,
        Spheres: NYI,
        Voronoi: NYI,
        
        // Modifiers
        Abs: require('./modifier/Abs'),
        Clamp: require('./modifier/Clamp'),
        Curve: NYI,
        Exponent: NYI,
        Invert: NYI,
        ScaleBias: NYI,
        Terrace: NYI,
        
        // Combiners
        Add: require('./combiner/Add'),
        Max: require('./combiner/Max'),
        Min: require('./combiner/Min'),
        Multiply: require('./combiner/Multiply'),
        Power: require('./combiner/Power'),
        
        // Selectors
        Blend: NYI,
        Select: NYI,
        
        // Transformers
        Displace: NYI,
        RotatePoint: NYI,
        ScalePoint: require('./transformer/ScalePoint'),
        TranslatePoint: require('./transformer/TranslatePoint'),
        Turbulence: NYI,
        
        // Misc
        Cache: require('./misc/Cache')
    }
};

module.exports = LibNoise;

},{"./combiner/Add":1,"./combiner/Max":2,"./combiner/Min":3,"./combiner/Multiply":4,"./combiner/Power":5,"./generator/Checkerboard":7,"./generator/Constant":8,"./misc/Cache":10,"./modifier/Abs":11,"./modifier/Clamp":12,"./transformer/ScalePoint":13,"./transformer/TranslatePoint":14}],10:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

class Abs extends Module {
    constructor() {
        super();
        
        this._lastX = null;
        this._lastY = null;
        this._lastZ = null;
        this._lastValue = null;
    }
    
    get sourceModuleCount() { return 1; }
    
    getValue(x, y, z) {
        if (x !== this._lastX || y !== this._lastY || z !== this._lastZ) {
            this._lastX = x;
            this._lastY = y;
            this._lastZ = z;
            this._lastValue = this.sourceModules[0](x, y, z);
        }
        
        return this._lastValue;
    }
}

module.exports = Abs;

},{"../core/Module":6}],11:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],12:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],13:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}],14:[function(require,module,exports){
'use strict';

var Module = require('../core/Module');

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

},{"../core/Module":6}]},{},[9]);
