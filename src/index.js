var JSNoise = {
    VERSION: '0.2.0',
    
    Mathx: require('./math'),
    
    Noise: {
        Simplex: require('./noise/Simplex'),
        Voronoi: require('./noise/Voronoi')
    },
    
    Module: require('./modules'),
    
    Utils: {
        deserialize: require('./utils/deserialize'),
        serialize: require('./utils/serialize')
    }
};

module.exports = JSNoise;

if (typeof window == 'object') window.JSNoise = JSNoise;
