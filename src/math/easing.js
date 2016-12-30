'use strict';

var MathEasing = {};

MathEasing.lerp = function(a, b, alpha) {
    return (1 - alpha) * a + alpha * b;
};

module.exports = MathEasing;