attribute vec2 aTextureCoord;
varying highp vec2  	vST;		// texture coords
varying highp vec2 vPos;

attribute highp vec4 aVertexPosition;
uniform highp mat4 uModelViewMatrix;
uniform highp mat4 uProjectionMatrix;

/**
 * sky.vert
 * Vertex shader for the sky
 */

 // seed provided outside, better random
 uniform highp float uSeed;
 // extremely slow time
 uniform highp float uSlowTime;

 uniform highp float	uTime;		// "Time", from Animate( )

 varying highp vec3 vMCPosition; // model coords
 varying highp vec4 vECPosition; // eye coordinates

 // shaded normal, light, eye vectors
 varying highp vec3 Ns;
 varying highp vec3 Ls;
 varying highp vec3 Es;

 // light position
 uniform highp float LightX;
 uniform highp float LightY;
 uniform highp float LightZ;

 // eye coordinate lights
 varying highp vec3 vECLight;

 const int uOctaves = 8;

 // inverse of model view matrix
 varying highp mat4 vModelViewMatrix_Inverse;

 // approximate eye light position
 highp vec3 eyeLightPosition = vec3(LightX,LightY,LightZ);

 const highp float PI = 3.14159265;

 // from S.O., what does dot() do? (dot product, yes), and fract() (fraction, yes)
 // Random Poster: https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl#4275343
 // Detailed Sourcing: https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
 // Supposedly from a 1998 Mathematical Statistics paper that has since been lost?
 // Not Random, Hash Function (works for same X & Y)
 highp float hash(highp vec2 co) {
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
 highp float noise(highp vec2 st) {
     highp vec2 i = floor(st);
     highp vec2 f = fract(st);

     // calculate 4 corners of a 2D tile
     highp float a = hash(i);
     highp float b = hash(i + vec2(1.0, 0.0));
     highp float c = hash(i + vec2(0.0, 1.0));
     highp float d = hash(i + vec2(1.0, 1.0));

    // calculate f^2 * (3.0 - 2.0f)
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
 highp float fbm(highp vec2 v) {
  // number of iterations
  int octaves 		= uOctaves;
  // initial value
  highp float value 		= 0.0;
  // initial amp at half
  highp float amplitude = 0.5;

  // regular step to increase freqency by
  highp float lacunarity = 2.0;
  // amplitude modification
  highp float gain = 0.5;

  for(int x = 0; x < 100; x++) {

    if(x >= octaves) {
      break;
    }

    // add noise of 'v' scaled by amplitude
    value += amplitude * noise(v);

    // scale frequency by lacunarity
    v *= lacunarity;
    // scale amplitude by gain
    amplitude *= gain;
  }

  return value;

 }


 void perFragmentLighting(highp vec4 ECPosition, highp vec3 adjustedNormal) {
  highp mat3 normalMatrix = mat3(1);
  highp vec3 normal = normalize(normalMatrix * adjustedNormal);

  // set surface normal
  Ns = normal;

  // calc vector from point to light
  Ls = eyeLightPosition - ECPosition.xyz;

  // vec from point to eye position
  Es = vec3(0.0, 0.0, 0.0) - ECPosition.xyz;

  // adjust existing normals
  /*
  Ns = normal * Ns;
  Ls = normal * Ls;
  Es = normal * Es;
  /**/

 }


 // calculates the surface normal that should be used
 highp vec3 calcNormal(highp vec3 p1, highp float modifier) {
  // calculate 2 other points slightly farther along s and t
   p1.y = 1.0;
  highp vec3 p2 = p1;
  highp vec3 p3 = p1;

  // slightly shift p2's x up and calc new y
  p2.x += 0.0001;
  p2.y += fbm(p2.xz + fbm(p2.xz + fbm(p2.xz + uSlowTime + uSeed))) * 0.05;
  // slightly shift p3's z up and calc new y
  p3.z += 0.0001;
  p3.y += fbm(p3.xz + fbm(p3.xz + fbm(p3.xz + uSlowTime + uSeed))) * 0.05;

  // calculate cross of vector(p1,p2) and vector(p1,p3)
  highp vec3 v1 = p1 - p2;
  highp vec3 v2 = p1 - p3;
  highp vec3 normal = normalize(cross(v2,v1));

  // return as new normal
  return normal;
}


//
// Inverses from: https://github.com/glslify/glsl-inverse
//
highp float inverse(highp float m) {
  return 1.0 / m;
}

highp mat2 inverse(highp mat2 m) {
  return mat2(m[1][1],-m[0][1],
             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);
}

highp mat3 inverse(highp mat3 m) {
  highp float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];
  highp float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];
  highp float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];

  highp float b01 = a22 * a11 - a12 * a21;
  highp float b11 = -a22 * a10 + a12 * a20;
  highp float b21 = a21 * a10 - a11 * a20;

  highp float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

highp mat4 inverse(highp mat4 m) {
  highp float
      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  return mat4(
      a11 * b11 - a12 * b10 + a13 * b09,
      a02 * b10 - a01 * b11 - a03 * b09,
      a31 * b05 - a32 * b04 + a33 * b03,
      a22 * b04 - a21 * b05 - a23 * b03,
      a12 * b08 - a10 * b11 - a13 * b07,
      a00 * b11 - a02 * b08 + a03 * b07,
      a32 * b02 - a30 * b05 - a33 * b01,
      a20 * b05 - a22 * b02 + a23 * b01,
      a10 * b10 - a11 * b08 + a13 * b06,
      a01 * b08 - a00 * b10 - a03 * b06,
      a30 * b04 - a31 * b02 + a33 * b00,
      a21 * b02 - a20 * b04 - a23 * b00,
      a11 * b07 - a10 * b09 - a12 * b06,
      a00 * b09 - a01 * b07 + a02 * b06,
      a31 * b01 - a30 * b03 - a32 * b00,
      a20 * b03 - a21 * b01 + a22 * b00) / det;
}



void main() {
  // returns coordinates in Eye Space, making camera at <0,0,0>
  highp vec4 ECPosition = uModelViewMatrix * aVertexPosition;

  vST = aVertexPosition.xy; //gl_MultiTexCoord0.st;

  //vec3 vert = ECPosition.xyz;
  highp vec3 vert = aVertexPosition.xyz;

  // TODO, ignores the normal here, recalculates based on ray cast results in fragment shader
  // uses Es and Ls, but ignores Ns, so we will pass gl_Normal to quickly set the other 2 up here
  vec3 adjustedNormal = calcNormal(vert, 1.0);
  //highp vec3 adjustedNormal = gl_Normal;
  //highp vec3 adjustedNormal = vec3(0.0,0.0,1.0);

  // setup perfragment lighting in vertex shader
  // ECPosition.xyz - vert;
  perFragmentLighting(ECPosition, adjustedNormal);

  // store model coordinates for use in frag shader
  vMCPosition = vert.xyz;
  // store eye coordinates for use in frag shader
  vECPosition = ECPosition;

  // convert light to eye coordinates to use in the next stage
  vECLight = (uModelViewMatrix * vec4(LightX, LightY, LightZ, 1.0)).xyz;

  // calculate invers of model view matrix
  vModelViewMatrix_Inverse = inverse(uModelViewMatrix);

  gl_Position = uProjectionMatrix * ECPosition;
  gl_PointSize = 5.0;

}
