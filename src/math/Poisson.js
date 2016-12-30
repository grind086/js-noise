'use strict';

var utils = require('./utils');

class Poisson extends Array {
    constructor(mean, threshold) {
        super();
        
        if (!threshold) threshold = 0.0001;
        
        this.mean = mean;
        
        var ptot = 1,
            i = 0,
            p;
            
        while (ptot > threshold) {
            p = this.probability(i);
            this[i++] = p;
            ptot -= p;
        }
        
        this[i] = ptot;
    }
    
    probability(k) {
        return Math.pow(this.mean, k) * Math.pow(Math.E, -this.mean) / utils.factorial(k);
    }
    
    choose(n) {
        n = n ? n : Math.random();
        
        for (var i = 0; i < this.length; i++) {
            n -= this[i];
            if (n <= 0) return i;
        }
        
        return i;
    }
}

module.exports = Poisson;