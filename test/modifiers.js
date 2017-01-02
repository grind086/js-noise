var vows = require('vows'),
    assert = require('assert');
    
var JSNoise = require('../src');

vows.describe('modifiers')
    .addBatch({
        'abs': {
            topic: function() {
                var echo = new JSNoise.Module.Echo(),
                    abs = new JSNoise.Module.Abs();
                    
                abs.setSourceModules([echo]);
                
                return abs;
            },
            
            'produces the absolute value of its source': function(abs) {
                assert.equal(abs.getValue(-1, 0, 0), 1);
                assert.equal(abs.getValue(1, 5, 1), 1);
            }
        },
        'clamp': {
            topic: function() {
                var echo = new JSNoise.Module.Echo(),
                    clamp = new JSNoise.Module.Clamp();
                    
                clamp.min = 0;
                clamp.max = 1;
                clamp.setSourceModules([echo]);
                
                return clamp;
            },
            
            'doesn\'t affect a value within the range': function(clamp) {
                assert.equal(clamp.getValue(0.5, 0, 0), 0.5);
            },
            
            'reduces a value that\'s too high to the maximum': function(clamp) {
                assert.equal(clamp.getValue(10, 0, 0), 1);
            },
            
            'increases a value that\'s too low to the minimum': function(clamp) {
                assert.equal(clamp.getValue(-2, 0, 0), 0);
            }
        },
        'exponent': {
            topic: function() {
                var echo = new JSNoise.Module.Echo(),
                    exponent = new JSNoise.Module.Exponent();
                
                exponent.setSourceModules([echo]);
                
                return exponent;
            },
            
            'raises the source to the given exponent': function(exp) {
                exp.exponent = 0;
                assert.equal(exp.getValue(2, 0, 0), 1);
                
                exp.exponent = 5;
                assert.equal(exp.getValue(1, 0, 0), 1);
                
                exp.exponent = 3;
                assert.equal(exp.getValue(2, 0, 0), 8);
            }
        }
    })
    .export(module);