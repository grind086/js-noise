var vows = require('vows'),
    assert = require('assert');
    
var JSNoise = require('../src');

vows.describe('combiners')
    .addBatch({
        'power': {
            topic: function() {
                var echoX = new JSNoise.Module.Echo(),
                    echoY = new JSNoise.Module.Echo(),
                    power = new JSNoise.Module.Power();
                    
                echoX.arg = 0;
                echoY.arg = 1;
                
                power.setSourceModules([echoX, echoY]);
                
                return power;
            },
            
            'raises the first source to the power of the second': function(pow) {
                assert.equal(pow.getValue(2, 0, 0), 1);
                assert.equal(pow.getValue(1, 5, 0), 1);
                assert.equal(pow.getValue(2, 3, 0), 8);
            }
        }
    })
    .export(module);