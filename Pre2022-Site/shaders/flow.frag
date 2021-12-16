varying highp vec2  	vST;		// texture coords
varying highp vec2 vPos;
uniform highp float uSlowTime;

// from S.O., what does dot() do? (dot product, yes), and fract() (fraction, yes)
// Random Poster: https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl#4275343
// Detailed Sourcing: https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
// Supposedly from a 1998 Mathematical Statistics paper that has since been lost?
// Not Random, Hash Function (works for same X & Y)
highp float hash(vec2 co) {
   // multiplies input by the seed
   // then converts number from 2D to 1D (via dot product)
   // arbitrary numbers 12.9898 and 78.233 chosen to avoid repitition
   // ~~~ used to multiply co.st by seed (a float)
   highp float t = dot(co.st, vec2(12.9898,78.233));
   // then takes the sin of that number
   // then multiplies by 43758.5453, which amplifies the error of the sin function (based on local implementation)
   highp float u = sin(t) * 43758.5453123;
   // then returns the fractional component of that number, focusing further on the error
   // overall, this is a dubious hash function because sin() is platform specific, and may not be consistent
    return fract(u);
}

// 1D noise function
// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
// referenced from: https://thebookofshaders.com/13/
highp float noise(vec2 st) {
    highp vec2 i = floor(st);
    highp vec2 f = fract(st);

    // calculate 4 corners of a 2D tile
    highp float a = hash(i);
    highp float b = hash(i + vec2(1.0, 0.0));
    highp float c = hash(i + vec2(0.0, 1.0));
    highp float d = hash(i + vec2(1.0, 1.0));

   // calculate f^2 * (3.0 - 2.0 * f)
    highp vec2 u = f * f * (3.0 - 2.0 * f);

   // mix between a and b via u.x
   highp float h = mix(a, b, u.x) +
           // diff of c & a * u.y, multiplied by inverse of u.x
            (c - a)* u.y * (1.0 - u.x) +
           // add in diff of d - b * (u.x*u.y)
            (d - b) * u.x * u.y;

    return h;
}

// Fractal Brownian Motion
highp float fbm(vec2 v) {
 // number of iterations
 const int octaves 		= 8;
 // initial value
 highp float value 		= 0.0;
 // initial amp at half
 highp float amplitude = 0.5;

 // regular step to increase freqency by
 highp float lacunarity = 2.0;
 // amplitude modification
 highp float gain = 0.5;

 for(int x = 0; x < octaves; x++) {
   // add noise of 'v' scaled by amplitude
   value += amplitude * noise(v);

   // scale frequency by lacunarity
   v *= lacunarity;
   // scale amplitude by gain
   amplitude *= gain;
 }

 return value;

}
  void main() {
    highp float f = fbm(vPos + sin(uSlowTime * 0.1) + fbm(vPos + uSlowTime));
    gl_FragColor = vec4(f, f, f, 1.0);
  }
