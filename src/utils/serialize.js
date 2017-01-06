'use strict';

function toObj(module) {
    var obj = { 
        uid: module.uid,
        type: module.type
    };
    
    switch (module.type) {
        // Generators
        case 'Constant':
            obj.value = module.value;
            break;
        case 'Echo':
            obj.arg = module.arg;
            break;
        case 'Simplex':
            obj.seed = module.seed;
            break;
        case 'Voronoi':
            obj.seed = module.seed;
            obj.meanPoints = module.meanPoints;
            break;
            
        // Modifiers
        case 'Clamp':
            obj.min = module.min;
            obj.max = module.max;
            break;
        case 'Exponent':
            obj.exponent = module.exponent;
            break;
        case 'FBM':
            obj.octaves = module.octaves;
            obj.persistence = module.persistence;
            obj.lacunarity = module.lacunarity;
            break;
        case 'ScaleBias':
            obj.scale = module.scale;
            obj.bias = module.bias;
            break;
            
        // Selectors
        case 'Blend': 
            // TODO
            // obj.ease = module.ease;
            break;
        case 'Select':
            obj.threshold = module.threshold;
            obj.edgeFalloff = module.edgeFalloff;
            // TODO
            // obj.ease = module.ease;
            break;
            
        // Transformers
        case 'ScalePoint':
            obj.scaleX = module.scaleX;
            obj.scaleY = module.scaleY;
            obj.scaleZ = module.scaleZ;
            break;
        case 'TranslatePoint':
            obj.transX = module.transX;
            obj.transY = module.transY;
            obj.transZ = module.transZ;
            break;
    }
    
    return obj;
}

function toObjArray(module) {
    var objs = [];
    
    objs.push(toObj(module));
    
    module.sourceModules.forEach((child) => {
        toObjArray(child).forEach((childObj) => {
            objs.push(childObj);
        });
    });
    
    return objs;
}

function serialize(module, mkTree) {
    if (!mkTree) {
        return JSON.stringify(toObj(module));
    } else {
        var collection = {},
            arr = toObjArray(module);
        
        arr.forEach((obj) => {
            collection[obj.uid] = obj;
        });
        
        return JSON.stringify({
            root: module.uid,
            collection: collection
        });
    }
}

module.exports = serialize;
