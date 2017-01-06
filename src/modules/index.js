const NYI = function() { throw new Error('Not yet implemented'); };

module.exports = {
    // Generators
    Billow: NYI,
    Checkerboard: require('./generator/Checkerboard'),
    Constant: require('./generator/Constant'),
    Cylinders: NYI,
    Echo: require('./generator/Echo'),
    Simplex: require('./generator/Simplex'),
    RidgedMulti: NYI,
    Spheres: NYI,
    Voronoi: require('./generator/Voronoi'),
    
    // Modifiers
    Abs: require('./modifier/Abs'),
    Clamp: require('./modifier/Clamp'),
    Curve: NYI,
    Exponent: require('./modifier/Exponent'),
    FBM: require('./modifier/FBM'),
    Invert: require('./modifier/Invert'),
    ScaleBias: require('./modifier/ScaleBias'),
    Terrace: NYI,
    
    // Combiners
    Add: require('./combiner/Add'),
    Max: require('./combiner/Max'),
    Min: require('./combiner/Min'),
    Multiply: require('./combiner/Multiply'),
    Power: require('./combiner/Power'),
    
    // Selectors
    Blend: require('./selector/Blend'),
    Select: require('./selector/Select'),
    
    // Transformers
    Displace: require('./transformer/Displace'),
    RotatePoint: NYI,
    ScalePoint: require('./transformer/ScalePoint'),
    TranslatePoint: require('./transformer/TranslatePoint'),
    Turbulence: NYI,
    
    // Misc
    Cache: require('./misc/Cache')
};
