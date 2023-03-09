(() => {
  // <stdin>
  var timer1 = Math.random() * 1e4;
  var seed = Math.random() * 1e4;
  var heartSteps = 50;
  var vertexCount = 0;
  var mode = 0;
  main();
  function main() {
    requestAnimationFrame(main);
    const canvas = document.querySelector("#canvas-1");
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    const vsSource = `
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

   const int uOctaves = 4;

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
    p2.y += fbm(p2.xz + fbm(p2.xz + fbm(p2.xz + uTime + uSeed))) * 0.05;
   	// slightly shift p3's z up and calc new y
   	p3.z += 0.0001;
    p3.y += fbm(p3.xz + fbm(p3.xz + fbm(p3.xz + uTime + uSeed))) * 0.05;

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

`;
    const fsSource = `
  #version 100
  /**
   * sky.frag
   *  Fragment shader for the sky
   */

  // seed provided outside, better random
  uniform highp float uSeed;
  // extremely slow time
  uniform highp float uSlowTime;

  uniform highp float	uTime;

  //uniform int activeWarpColor; // texture warp active
  varying highp vec2 vST;		// texture coords
  varying highp vec3 vMCPosition; // model coords
  varying highp vec4 vECPosition; // eye coords (camera coordinates)

  // shaded normal, light, eye vectors
  varying highp vec3 Ns;
  varying highp vec3 Ls;
  varying highp vec3 Es;

  uniform highp float uAmbient, uDiffuse, uSpecular;
  uniform highp vec3 SpecularColor;
  uniform highp vec3 uCloudColor;
  uniform highp float Shininess;

  const int uOctaves = 4;

  // start & dimensions of this volume, adjusted to eye space
  uniform highp vec3 uVolumeStart;
  uniform highp vec3 uVolumeDimens;

  // inverse of model view matrix
  varying highp mat4 vModelViewMatrix_Inverse;

  // eye coordinate lights
  varying highp vec3 vECLight;

  // density of clouds
  uniform highp float uCloudDensity;

  // size multiplier for ray cast steps to use
  uniform highp float uRayCastStepSize;

  // whether to use or ignore boundaries
  uniform bool uIgnoreBounds;

  // noise texture to sample from
  uniform sampler2D uNoiseTexture;


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


  // from S.O., what does dot() do? (dot product, yes), and fract() (fraction, yes)
  // Random Poster: https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl#4275343
  // Detailed Sourcing: https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
  // Supposedly from a 1998 Mathematical Statistics paper that has since been lost?
  // Not Random, Hash Function (works for same X & Y)
  highp float hash3(vec3 co) {
  		// multiplies input by the seed
  		// then converts number from 2D to 1D (via dot product)
  		// arbitrary numbers 12.9898 and 78.233 chosen to avoid repitition
  		// ~~~ used to multiply co.st by seed (a float)
  		highp float t = dot(co.xyz, vec3(12.9898,78.233,34.424242));
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


  // pow implementation
  highp float pow(highp float base, int pow) {
    highp float val = base;
    if(pow == 0) {
      return 1.0;
    }
    for(int x = 1; x < 1000; x++) {
      val*=base;
      if(x >= pow) {
        break;
      }
    }
    return val;
  }


  highp float weakFract(highp float x) {
  	int q = int(x);
  	return x;
  }


  highp float altHash(vec3 v) {
  	//return fract(v.x + uSeed) + fract(v.y + uSeed) + fract(v.z + uSeed);
  	highp float q = v.x - floor(v.x);
  	return v.x;
  }


  highp float gn3(vec3 v, highp float seed) {
  	highp float h = distance(v * 0.8198498492, v) * v.x * seed;
  	return (float(int(h * 10.0))/10.0) - float(int(h));
  }


  // 1D noise function
  // Based on Morgan McGuire @morgan3d
  // https://www.shadertoy.com/view/4dS3Wd
  // referenced from: https://thebookofshaders.com/13/
  highp float noise3D(vec3 v) {
      highp vec3 i = floor(v);
      highp vec3 f = fract(v);

      // calculate 8 corners of a 3D tile
  		/**/
      highp float a = hash3(i);
      highp float b = hash3(i + vec3(1.0, 0.0, 0.0));
      highp float c = hash3(i + vec3(0.0, 1.0, 0.0));
      highp float d = hash3(i + vec3(1.0, 1.0, 0.0));

  		highp float a2 = hash3(i + vec3(0.0, 0.0, 1.0));
      highp float b2 = hash3(i + vec3(1.0, 0.0, 1.0));
      highp float c2 = hash3(i + vec3(0.0, 1.0, 1.0));
      highp float d2 = hash3(i + vec3(1.0, 1.0, 1.0));
  		/**/

  		// using janky alt hash
  		/*
  		highp float a = gn3(i,uSeed);
      highp float b = gn3(i + vec3(1.0, 0.0, 0.0),uSeed);
      highp float c = gn3(i + vec3(0.0, 1.0, 0.0),uSeed);
      highp float d = gn3(i + vec3(1.0, 1.0, 0.0),uSeed);

  		highp float a2 = gn3(i + vec3(0.0, 0.0, 1.0),uSeed);
      highp float b2 = gn3(i + vec3(1.0, 0.0, 1.0),uSeed);
      highp float c2 = gn3(i + vec3(0.0, 1.0, 1.0),uSeed);
      highp float d2 = gn3(i + vec3(1.0, 1.0, 1.0),uSeed);
  		/**/

  		// using noise texture instead
  		/*
  		highp float a = texture2D(uNoiseTexture, i.xz).r * 3.0;
  		highp float b = texture2D(uNoiseTexture, i.xz + vec2(1.0, 0.0)).r * 3.0;
  		highp float c = texture2D(uNoiseTexture, i.xz + vec2(0.0, 1.0)).r * 3.0;
  		highp float d = texture2D(uNoiseTexture, i.xz + vec2(1.0, 1.0)).r * 3.0;

  		highp float a2 = texture2D(uNoiseTexture, i.yz + vec2(1.0, 1.0)).b * 3.0;
  		highp float b2 = texture2D(uNoiseTexture, i.yz + vec2(2.0, 1.0)).b * 3.0;
  		highp float c2 = texture2D(uNoiseTexture, i.yz + vec2(1.0, 2.0)).b * 3.0;
  		highp float d2 = texture2D(uNoiseTexture, i.yz + vec2(2.0, 2.0)).b * 3.0;
  		/**/


  		// calculate f^2 * (3.0 - 2.0f)
      highp vec3 u = f * f * (3.0 - 2.0 * f);

  		// mix between a and b via u.x
  		highp float h1 = mix(a, b, u.x) +
  						// diff of c & a * u.y, multiplied by inverse of u.x
              (c - a)* u.y * (1.0 - u.x) +
  						// add in diff of d - b * (u.x*u.y)
              (d - b) * u.x * u.y;

  		// mix between a and b via u.x
  		highp float h2 = mix(a2, b2, u.x) +
  						// diff of c & a * u.y, multiplied by inverse of u.x
              (c2 - a2)* u.y * (1.0 - u.x) +
  						// add in diff of d - b * (u.x*u.y)
              (d2 - b2) * u.x * u.y;

  		// mix with regards to z
  		highp float h = mix(h1, h2, u.z);

      return h;
  }

  // Fractal Brownian Motion
  highp float fbm(vec3 v) {
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

  	for(int x = 0; x < 10000; x++) {
  		// add noise of 'v' scaled by amplitude
  		value += amplitude * noise3D(v);
  		// scale frequency by lacunarity
  		v *= lacunarity;
  		// scale amplitude by gain
  		amplitude *= gain;

      if(x >= octaves) {
        break;
      }

  	}

  	return value;

  }


  // replacement for the shaded normal from the vertex shader
  // instead computes the normal with respect to the termination positions of 3 rays
  highp vec3 ReplaceNormal;

  // used to compute modification of lighting
  highp float lightAlpha = 0.0;


  // per fragment lighting in the FRAG shader
  highp vec4 perFragmentLighting(vec4 color) {
    highp vec3 Normal,Light,Eye;
    Normal = normalize(ReplaceNormal);
    Light = normalize(Ls);
    Eye = normalize(Es);

    highp vec4 ambient = uAmbient * color * lightAlpha;

    highp float d = max(dot(Normal,Light), 0.0);
    highp vec4 diffuse = uDiffuse * d * color;

    highp float s = 0.0;
    // only do specular if the light can see the point
    if(dot(Normal,Light) > 0.0) {
      highp vec3 ref = normalize(2.0 * Normal * dot(Normal,Light) - Light);
      s = pow(max(dot(Eye,ref), 0.0), Shininess);

    }

    highp vec4 specular = uSpecular * s * vec4(SpecularColor,1.0) * lightAlpha;

    return vec4(ambient.rgb + diffuse.rgb + specular.rgb, 1.0);
  }


  // determine that this point lies above and below the x,y,z positions that define this shape
  // is within the volume
  bool isWithinVolume(vec3 p) {
  	return (
  		// within x coordinate
  		p.x >= uVolumeStart.x && p.x <= (uVolumeStart.x + uVolumeDimens.x) &&
  		// within y coordinate
  		p.y >= uVolumeStart.y && p.y <= (uVolumeStart.y + uVolumeDimens.y) &&
  		// within z coordinate
  		p.z >= uVolumeStart.z && p.z <= (uVolumeStart.z + uVolumeDimens.z)
  	);

  }


  // TODO, this method is unused, wasn't the right direction and doesn't work with the current inputs vals
  // but left for reference
  //
  // Fixed probe, the data being viewed is fixed within the volume in model coordinates
  // This can be changed by rotations and such, but only on the object itself
  // gets the color using a ray cast, without a definite volume boundary
  // for model coordinates (local)
  void getColor_ByRayCast_NoBound_UsingModelCoordinates() {

  	// changes the ray step size
  	// 0.025, 0.0125
  	highp float rayStepSizeMultiplier = 0.1;
  	// max # of steps that are allowed before stopping the ray cast
  	int maxSteps = 30;

  	// default is no color
  	highp vec4 color = vec4(0.0);

  	// calculate small ray that steps through at fixed increments
  	// TODO what's wrong with this?
  	highp vec3 rayStep = (normalize(vECPosition) * rayStepSizeMultiplier).xyz;

  	// progressive rayCast that steps through the volume
  	highp vec3 rayCastPos = vMCPosition;

  	// counts ray cast steps, used to exit out
  	int steps = 0;

  	// isWithinVolume(rayCastPos)
    for(int xx = 0; xx < 100000; xx++) {
  	//while(isWithinVolume(rayCastPos)) {

      if(!isWithinVolume(rayCastPos)) {
        break;
      }

  		if(color.a >= 1.0) {
  			// color maxed out, exit
  			break;
  		}

  		if(steps > maxSteps) {
  			break;
  		}

  		// circle test
  		/*
  		// x^2 + y^2 + z^2 = r^2 (should be <= a certain radius to be within the sphere)
  		if(sqrt(pow(rayCastPos.x, 2) + pow(rayCastPos.y, 2) + pow(rayCastPos.z, 2)) <= 0.52) {
  			// shade in white
  			color = vec4(1.0);
  			break;

  		}
  		/**/

  		/**/
  		// get fractal brownian motion val
  		highp float f = fbm(rayCastPos.xyz + uSeed) * 2.0;
  		//highp float f = fbm(rayCastPos.xyz + fbm(rayCastPos.xyz + fbm(rayCastPos.xyz + uTime + uSeed))) * 2.0;
  		// only apply if greater than 0.8
  		if(f > 0.8) {
  			// add color only if exceeds the threshold to display
  			highp vec4 tColor = mix(
  				vec4(0.0),
  				vec4(1.0),
  				(f - 0.8)
  			);
  			tColor *= 1.0;
  			color += tColor;

  		}
  		/**/

  		// step ray through the volume
  		rayCastPos += rayStep;

  		steps++;
  	}


  	/*
  	if(color.a == 0.0) {
  		// discard if nothing to display
  		discard;

  	}
  	/**/

    // hold alpha
    highp float alpha = 1.0;

  	// to give effect of looking at water
  	//color.r = 0.0;

    // calc fragment lighting with color
    color = perFragmentLighting(color);

  	// aply fragment color
    gl_FragColor = vec4(color.rgb, alpha);

  }



  // Current Approach
  //
  // Gets the color for a fragment by performing a ray cast
  // based on eye coordinates, and then converting back to model coordinates
  // in order to preserve locality of values obtained
  void getColor_ByRayCast_NoBound_UsingEyeCoordinates() {

  	// changes the ray step size
  	// 0.025, 0.0125
  	highp float rayStepSizeMultiplier = uRayCastStepSize;
  	// max # of steps that are allowed before stopping the ray cast
  	int maxSteps = 200; // 200

  	// default is no color (testing with slight coloring to track it)
  	highp vec4 color = vec4(0.0);

  	// calculate small ray that steps through at fixed increments
  	highp vec3 rayStep = (normalize(vECPosition) * rayStepSizeMultiplier).xyz;

  	// progressive rayCast that steps through the volume
  	highp vec4 rayCastPos = vECPosition;

  	// counts ray cast steps, used to exit out
  	int steps = 0;

  	// time and seed adjustment
  	highp float timeAndSeed = (uTime) + uSeed;

  	// convert point to model coordinates before we start
  	highp vec4 convertedPoint = vModelViewMatrix_Inverse * rayCastPos;

  	// TODO old ray tracing method for lighting
  	// setup 2 other converted ray casted points to trace through volume
  	// the end result of the 3 converted points will be used
  	// to compute the normal via the cross product of the 2 resultant vectors
  	//vec4 rc2,rc3;
  	//vec4 c2,c3;
  	//rc2 = vec4(rayCastPos.x+0.01, rayCastPos.y, rayCastPos.z, rayCastPos.w);
  	//rc3 = vec4(rayCastPos.x, rayCastPos.y, rayCastPos.z+0.01, rayCastPos.w);
  	// setup default colors for these as well
  	//c2 = c3 = vec4(0.0);

  	// isWithinVolume(rayCastPos)
  	// isWithinVolume(convertedPoint.xyz)
    for(int xx = 0; xx < 1000000; xx++) {
  	//while(uIgnoreBounds || isWithinVolume(convertedPoint.xyz) || steps == 0) {

      if(!(uIgnoreBounds || isWithinVolume(convertedPoint.xyz) || steps == 0)) {
        break;
      }

  		if(color.a >= 1.0) {
  			// color maxed out, exit
  			break;
  		}

  		if(steps > maxSteps) {
  			break;
  		}

  		/**/
  		// get fractal brownian motion val
  		highp float f = fbm(convertedPoint.xyz + timeAndSeed) * 2.0;
  		//highp float f = fbm(convertedPoint.xyz + fbm(convertedPoint.xyz + fbm(convertedPoint.xyz + uTime + uSeed))) * 2.0;
  		// only apply if greater than 0.8
  		if(f > 0.8) {
  			// add color only if exceeds the threshold to display
  			highp vec4 tColor = mix(
  				vec4(0.0),
  				vec4(uCloudColor.rgb, 1.0),
  				(f - 0.8)
  			);
  			tColor *= uCloudDensity;
  			color += tColor;

  		}

  		// step ray through the volume
  		rayCastPos.xyz += rayStep;

  		// recalc next converted point
  		convertedPoint = vModelViewMatrix_Inverse * rayCastPos;

  		// Do again for Ray Cast #2
  		/*
  		if(c2.a < 1.0) {
  			highp vec4 cp2 = vModelViewMatrix_Inverse * rc2;
  			f = fbm(cp2.xyz + (uTime) + uSeed) * 2.0;
  			if(f > 0.8) {
  				highp vec4 tColor = mix(
  					vec4(0.0),
  					vec4(1.0),
  					(f - 0.8)
  				);
  				tColor *= 0.222;
  				c2 += tColor;
  			}
  			rc2.xyz += rayStep;
  		}
  		/**/

  		// Do again for Ray Cast #3
  		/*
  		if(c3.a < 1.0) {
  			highp vec4 cp3 = vModelViewMatrix_Inverse * rc3;
  			f = fbm(cp3.xyz + (uTime) + uSeed) * 2.0;
  			if(f > 0.8) {
  				highp vec4 tColor = mix(
  					vec4(0.0),
  					vec4(1.0),
  					(f - 0.8)
  				);
  				tColor *= 0.222;
  				c3 += tColor;
  			}
  			rc3.xyz += rayStep;
  		}
  		/**/

  		// bump our step count
  		steps++;

  	}

  	// color red if we are exceeding the ray length
  	// this is a debug feature
  	/*
  	if(steps > maxSteps) {
  		color = vec4(1.0, 0.0, 0.0, 1.0);

  	}
  	*/


  	if(color.a == 0.0) {
  		// discard if nothing to display
  		// no need to draw empty fragments
  		discard;

  	}

  	// compute cross product of resulting ray cast end positions
  	//highp vec3 v1 = (rayCastPos - rc2).xyz;
  	//highp vec3 v2 = (rayCastPos - rc3).xyz;

  	// calculate vector from final point rayCastPos to vECLight
  	// reduce to multiple of unit vector
  	highp vec3 vRL = normalize(vECLight - rayCastPos.xyz) * rayStepSizeMultiplier;
  	// apply fixed increments until we exit the volume
  	rayCastPos.xyz += vRL;
  	convertedPoint = vModelViewMatrix_Inverse * rayCastPos;
  	steps = 0;

    for(int xx = 0; xx < 1000000; xx++) {
  	//while(uIgnoreBounds || isWithinVolume(convertedPoint.xyz)) {

      if(!(uIgnoreBounds || isWithinVolume(convertedPoint.xyz))) {
        break;
      }

  		if(lightAlpha >= 1.0) {
  			break;
  		}

  		if(steps > maxSteps) {
  			break;
  		}

  		// sum up the alphas using the same equation as above
  		highp float g = fbm(convertedPoint.xyz + timeAndSeed) * 2.0;
  		if(g > 0.8) {
  			highp float tAlpha = mix(
  				0.0,
  				1.0,
  				(g - 0.8)
  			) * uCloudDensity;
  			lightAlpha += tAlpha;
  		}

  		rayCastPos.xyz += vRL;
  		convertedPoint = vModelViewMatrix_Inverse * rayCastPos;
  		steps++;

  	}

  	// use the inverse of the alpha to apply a lighting change
  	// which will take effect in the 'perFragmentLighting' function
  	lightAlpha = 1.0 - lightAlpha;

  	// use vector from ray to light for normal
  	// playing around with local normal plus ray to light vector, not really that good
  	//ReplaceNormal = normalize(cross(v1,v2) + normalize(vECLight - rayCastPos.xyz));
  	ReplaceNormal = normalize(vECLight - rayCastPos.xyz);

    // hold alpha
  	highp float alpha = color.a;

    // calc fragment lighting with color
    color = perFragmentLighting(color);

  	// aply fragment color
    gl_FragColor = vec4(color.rgb, alpha);

  }


  void main() {

  	// this one does not help
  	//getColor_ByRayCast_NoBound_UsingModelCoordinates();

  	// this is the one to use
    //gl_FragColor = vec4(1.0, 0.0, 0.0,1.0);
  	getColor_ByRayCast_NoBound_UsingEyeCoordinates();

  	//gl_FragColor = vec4(texture2D(uNoiseTexture, vECPosition.xz).rgb, 1.0);

  }

  `;
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord")
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        slowTime: gl.getUniformLocation(shaderProgram, "uSlowTime"),
        seed: gl.getUniformLocation(shaderProgram, "uSeed"),
        time: gl.getUniformLocation(shaderProgram, "uTime"),
        lightX: gl.getUniformLocation(shaderProgram, "LightX"),
        lightY: gl.getUniformLocation(shaderProgram, "LightX"),
        lightZ: gl.getUniformLocation(shaderProgram, "LightX"),
        ambient: gl.getUniformLocation(shaderProgram, "uAmbient"),
        diffuse: gl.getUniformLocation(shaderProgram, "uDiffuse"),
        specular: gl.getUniformLocation(shaderProgram, "uSpecular"),
        specularColor: gl.getUniformLocation(shaderProgram, "SpecularColor"),
        cloudColor: gl.getUniformLocation(shaderProgram, "uCloudColor"),
        shininess: gl.getUniformLocation(shaderProgram, "Shininess"),
        volumeStart: gl.getUniformLocation(shaderProgram, "uVolumeStart"),
        volumeDimens: gl.getUniformLocation(shaderProgram, "uVolumeDimens"),
        cloudDensity: gl.getUniformLocation(shaderProgram, "uCloudDensity"),
        rayCastStepSize: gl.getUniformLocation(shaderProgram, "uRayCastStepSize"),
        ignoreBounds: gl.getUniformLocation(shaderProgram, "uIgnoreBounds")
      }
    };
    const buffers = initBuffers(gl);
    drawScene(gl, programInfo, buffers);
  }
  function bezierCurve(p1, p2, p3, p4, t) {
    return p1 * Math.pow(1 - t, 3) + p2 * 3 * t * Math.pow(1 - t, 2) + p3 * 3 * (1 - t) * Math.pow(t, 2) + Math.pow(t, 3) * p4;
  }
  function getPointsForBezierCurve(p1, p2, p3, p4, steps) {
    let bezierPoints = [];
    for (let x = 0; x < steps; x++) {
      let t = x * 1 / steps;
      bezierPoints[bezierPoints.length] = bezierCurve(p1[0], p2[0], p3[0], p4[0], t);
      bezierPoints[bezierPoints.length] = bezierCurve(p1[1], p2[1], p3[1], p4[1], t);
      bezierPoints[bezierPoints.length] = bezierCurve(p1[2], p2[2], p3[2], p4[2], t);
    }
    return bezierPoints;
  }
  function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1,
      1,
      1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1
    ];
    vertexCount = positions.length / 3;
    let rot1 = Math.sin(timer1 + 0.824);
    let rot2 = Math.cos(timer1 + 0.824);
    let b1 = 0.5;
    let b2 = 1;
    let b3 = 0.06;
    let b4 = 0.6;
    let b5 = Math.sin(timer1 * 20) * 0.66;
    let b6 = Math.cos(timer1 * 20) * 0.1;
    let b7 = Math.sin(timer1 * 20) * 0.01;
    let heartPositions = getPointsForBezierCurve([rot1, rot2, b6], [-b1, b1, 0], [-b2, b2, b5], [b3, b4, b7], heartSteps);
    heartPositions = heartPositions.concat(getPointsForBezierCurve([rot1, rot2, b6], [b1, b1, 0], [b2, b2, b5], [-b3, b4, b7], heartSteps));
    if (mode == 0) {
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    } else {
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(heartPositions), gl.STATIC_DRAW);
    }
    return {
      position: positionBuffer
    };
  }
  function drawScene(gl, programInfo, buffers) {
    gl.clearColor(1, 1, 1, 1);
    gl.clearDepth(1);
    gl.enable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -6]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, -45, [1, 0, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, timer1 * 1, [0, 0, 1]);
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }
    gl.useProgram(programInfo.program);
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    gl.uniform1f(programInfo.uniformLocations.seed, seed);
    gl.uniform1f(programInfo.uniformLocations.slowTime, timer1 * 5);
    gl.uniform1f(programInfo.uniformLocations.time, timer1 * 2.5);
    gl.uniform1f(programInfo.uniformLocations.lightX, 10);
    gl.uniform1f(programInfo.uniformLocations.lightY, 10);
    gl.uniform1f(programInfo.uniformLocations.lightZ, 10);
    gl.uniform1f(programInfo.uniformLocations.ambient, 0.1);
    gl.uniform1f(programInfo.uniformLocations.diffuse, 0.6);
    gl.uniform1f(programInfo.uniformLocations.specular, 1);
    gl.uniform3f(programInfo.uniformLocations.specularColor, 1, 1, 1);
    gl.uniform3f(programInfo.uniformLocations.cloudColor, 1, 0, 0);
    gl.uniform1f(programInfo.uniformLocations.shininess, 6);
    gl.uniform3f(programInfo.uniformLocations.volumeStart, -1, -1, -1);
    gl.uniform3f(programInfo.uniformLocations.volumeDimens, 2, 2, 2);
    gl.uniform1f(programInfo.uniformLocations.cloudDensity, 0.222);
    gl.uniform1f(programInfo.uniformLocations.rayCastStepSize, 0.025);
    gl.uniform1f(programInfo.uniformLocations.ignoreBounds, false);
    timer1 += 5e-3;
    {
      const offset = 0;
      const vertexCount2 = vertexCount;
      const heartCount = heartSteps * 2;
      if (mode == 0) {
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount2);
      } else {
        gl.drawArrays(gl.TRIANGLE_FAN, offset, heartCount);
      }
    }
  }
  function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader("vertex", gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader("fragment", gl, gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
    return shaderProgram;
  }
  function loadShader(name, gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("You have " + name + " shader errors in the console");
      console.info("An error occurred compiling the " + name + " shader:\n" + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
})();
