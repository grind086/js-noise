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
