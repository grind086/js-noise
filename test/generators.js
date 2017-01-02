var vows = require('vows'),
    assert = require('assert');
    
var JSNoise = require('../src');

vows.describe('generators')
    .addBatch({
        'constant': {
            topic: function() {
                var constant = new JSNoise.Module.Constant();
                constant.value = 42;
                
                return constant;
            },
            
            'produces the set value over several inputs': function(constant) {
                assert.equal(constant.getValue(0, 0, 0), 42);
                assert.equal(constant.getValue(2, 5, 1), 42);
            }
        },
        'echo': {
            topic: new JSNoise.Module.Echo(),
            
            'echoes the x coordinate': function(echo) {
                echo.arg = 0;
                
                assert.equal(echo.getValue(0, 0, 0), 0);
                assert.equal(echo.getValue(42, 0, 0), 42);
            },
            'echoes the y coordinate': function(echo) {
                echo.arg = 1;
                
                assert.equal(echo.getValue(0, 0, 0), 0);
                assert.equal(echo.getValue(0, 42, 0), 42);
            },
            'echoes the z coordinate': function(echo) {
                echo.arg = 2;
                
                assert.equal(echo.getValue(0, 0, 0), 0);
                assert.equal(echo.getValue(0, 0, 42), 42);
            }
        }
    })
    .export(module);