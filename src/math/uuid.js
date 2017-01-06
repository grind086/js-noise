'use strict';

var Alea = require('alea');

// generates a v4 uuid;
var rng = new Alea(),
    chars = 'abcdef0123456789',
    vchars = '89ab';
    
function charstr(n, lib) {
    var len = lib.length,
        str = '';
    
    for (var i = 0; i < n; i++) {
        str += lib.charAt(Math.floor(rng() * len));
    }
    
    return str;
}

function uuid() {
    return (
        charstr(8, chars) + '-' +
        charstr(4, chars) + '-4' +
        charstr(3, chars) + '-' +
        charstr(1, vchars) +
        charstr(3, chars) + '-' +
        charstr(12, chars)
    );
}

module.exports = uuid;
