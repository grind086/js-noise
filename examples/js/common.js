// Helper functions for examples

var Helper = (function() {
    'use strict';
    
    // Handles calling raf and calculating delta-time
    function animate(render) {
        var lastFrame = Date.now();
        
        var doRender = function() {
            requestAnimationFrame(doRender);
            
            var thisFrame = Date.now(),
                dt = thisFrame - lastFrame;
                
            lastFrame = thisFrame;
            
            render(dt);
        };
        
        requestAnimationFrame(doRender);
    }
    
    return {
        animate: animate
    };
})();
