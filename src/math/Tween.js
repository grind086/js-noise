'use strict';

var easing = require('./easing');

class Tween {
    constructor(points, attr) {
        this.attr = attr;
        this.points = [];
        this.ease = easing.lerp;
        
        points.forEach((pt) => {
            this.addPoint(pt[0], pt[1]);
        });
    }
    
    addPoint(t, obj) {
        var points = this.points;
        
        for (var i = 0; i < points.length; i++) {
            if (t < points[i][0]) {
                break;
            }
        }
        
        points.splice(i, 0, [t, obj]);
    }
    
    value(t) {
        var points = this.points;
        
        for (var i = 0; i < points.length; i++) {
            if (t <= points[i][0]) {
                break;
            }
        }
        
        // Handle edge cases
        
        if (i === 0) {
            return points[0][1];
        }
        else if (i === points.length) {
            return points[points.length - 1][1];
        }
        
        //
        
        var a = points[i - 1],
            b = points[i];
            
        var alpha = (t - a[0]) / (b[0] - a[0]);
        
        var result;
        
        if (Array.isArray(this.attr)) {
            result = {};
            
            this.attr.forEach((attr) => {
                result[attr] = this.ease(a[1][attr], b[1][attr], alpha);
            });
        } else {
            result = this.ease(a[1], b[1], alpha);
        }
        
        return result;
    }
}

module.exports = Tween;