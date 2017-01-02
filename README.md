# js-noise

A simple module-based javascript library for generating coherent noise. 
Inspired by the [libnoise](http://libnoise.sourceforge.net/) project for C++.

## Installing

```
npm i js-noise
```

Compatible with both node and the browser (via browserify).

## Modules Overview

Modules are the building blocks for your noise generators. They generate 
outputs starting with basic types of noise, and can modify or combine different 
sources of noise to produce unique results. Modules are broken up into 5 major
types: Generators (0 inputs, 1 output), Modifiers (1 input, 1 output), 
Combiners (2 inputs, 1 output), Selectors (n inputs, 1 output), and Transformers
(n inputs, 1 output).

### Generators

When looking at a module tree, generators are the most basic components. They 
produce a value based only on the provided coordinates, and have no source 
modules.

**Checkerboard**  
Produces either -1 or 1 in a checkerboard pattern of cubes. Mostly useful for 
testing purposes.

**Constant**  
Produces a set value for all inputs.

**Echo**  
Produces one of the input coordinates as output (configurable for x, y, or z). 
Primarily used in the test suite.

**Simplex**  
Generates simplex noise in the range [-1, 1]. Very useful for creating basic 
heightmaps, as well as textures.

**Voronoi**  
Generates Voronoi (aka Cell, Worley) noise in the range [0, 1]. Useful for 
creating such as water and stone.

### Modifiers

Modifiers take a single input and alter it.

**Abs**  
Produces the absolute value of its source module.

**Clamp**  
Clamps the value of a source module to within a given range.

**Exponent**  
Raises the value of a source module to a set exponent.

**FBM**  
Performs [Fractional Brownian Motion](https://en.wikipedia.org/wiki/Fractional_Brownian_motion) 
on a source module with configurable octaves.

**Invert**  
Reverses the sign of its source module.

**ScaleBias**  
Applies a scale factor, then adds a constant value (bias).

### Transformers

Transformers alter the coordinates being sent to their source modules.

**Displace**  
Uses 3 source modules to alter the coordinates of a 4th source module.

**ScalePoint**  
Scales the coordinates being sent to its source module by a constant amount.

**TranslatePoint**  
Translates the coordinates being sent to its source module by a constant amount.

### Misc

Utility modules that don't actually alter the inputs.

**Cache**  
Caches the value of the last used coordinates. Useful if you need to reuse a 
module in multiple places within your module tree.

```javascript
// Calculates the value at (0, 0, 0) twice
var simplex = new JSNoise.Module.Simplex();

simplex.getValue(0, 0, 0);
simplex.getValue(0, 0, 0);

// Calculates the value at (0, 0, 0) once
var cache = new JSNoise.Module.Cache();

cache.setSourceModules([simplex]);

cache.getValue(0, 0, 0);
cache.getValue(0, 0, 0);
```