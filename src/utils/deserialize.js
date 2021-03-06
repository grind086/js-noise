'use strict';

var modules = require('../modules');

function mkModule(obj) {
    if (!modules.hasOwnProperty(obj.type)) {
        throw new Error('Invalid module type "' + obj.type + '"');
    }
    
    var mod = new (modules[obj.type])();
    
    switch (obj.type) {
        // Generators
        case 'Constant':
            mod.value = obj.value;
            break;
        case 'Echo':
            mod.arg = obj.arg;
            break;
        case 'Simplex':
            mod.seed = obj.seed;
            break;
        case 'Voronoi':
            mod.seed = obj.seed;
            mod.meanPoints = obj.meanPoints;
            break;
            
        // Modifiers
        case 'Clamp':
            mod.min = obj.min;
            mod.max = obj.max;
            break;
        case 'Exponent':
            mod.exponent = obj.exponent;
            break;
        case 'FBM':
            mod.octaves = obj.octaves;
            mod.persistence = obj.persistence;
            mod.lacunarity = obj.lacunarity;
            break;
        case 'ScaleBias':
            mod.scale = obj.scale;
            mod.bias = obj.bias;
            break;
            
        // Selectors
        case 'Blend': 
            // TODO
            // mod.ease = obj.ease;
            break;
        case 'Select':
            mod.threshold = obj.threshold;
            mod.edgeFalloff = obj.edgeFalloff;
            // TODO
            // mod.ease = obj.ease;
            break;
            
        // Transformers
        case 'ScalePoint':
            mod.scaleX = obj.scaleX;
            mod.scaleY = obj.scaleY;
            mod.scaleZ = obj.scaleZ;
            break;
        case 'TranslatePoint':
            mod.transX = obj.transX;
            mod.transY = obj.transY;
            mod.transZ = obj.transZ;
            break;
    }
    
    return mod;
}

function deserialize(json) {
    var obj = JSON.parse(json);
    
    if (!obj.hasOwnProperty('root')) {
        return mkModule(obj);
    }
    
    var collection = {};
    
    // Create modules
    obj.collection.forEach((moduleObj) => {
        collection[moduleObj.uid] = mkModule(moduleObj);
    });
    
    // Set sources
    obj.collection.forEach((moduleObj) => {
        if (moduleObj.children) {
            var children = moduleObj.children,
                sources = [],
                uid = moduleObj.uid;
            
            for (var i = 0; i < children.length; i++) {
                if (!collection.hasOwnProperty(children[i])) {
                    throw new Error('Module "' + uid + '" missing child "' + children[i] + '"');
                }
                
                sources[i] = collection[children[i]];
            }
            
            collection[uid].setSourceModules(sources);
        }
    });
    
    return collection[obj.root];
}

module.exports = deserialize;
