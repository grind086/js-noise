const NYI = function() { throw new Error('Not yet implemented'); };

var JSNoise = {
    VERSION: '0.1.2',
    
    Mathx: require('./math'),
    
    Noise: {
        Simplex: require('./noise/Simplex'),
        Voronoi: require('./noise/Voronoi')
    },
    
    Module: {
        // Generators
        Billow: NYI,
        Checkerboard: require('./modules/generator/Checkerboard'),
        Constant: require('./modules/generator/Constant'),
        Cylinders: NYI,
        Echo: require('./modules/generator/Echo'),
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
        Blend: require('./modules/selector/Blend'),
        Select: require('./modules/selector/Select'),
        
        // Transformers
        Displace: require('./modules/transformer/Displace'),
        RotatePoint: NYI,
        ScalePoint: require('./modules/transformer/ScalePoint'),
        TranslatePoint: require('./modules/transformer/TranslatePoint'),
        Turbulence: NYI,
        
        // Misc
        Cache: require('./modules/misc/Cache')
    },
    
    Utils: {
        renderGreyscale: NYI,
        renderRGB: NYI,
        renderRGBA: NYI
    }
};

module.exports = JSNoise;

if (typeof window == 'object') window.JSNoise = JSNoise;
