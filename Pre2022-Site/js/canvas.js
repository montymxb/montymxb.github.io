String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// from S.O., what does dot() do? (dot product, yes), and fract() (fraction, yes)
// Random Poster: https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl#4275343
// Detailed Sourcing: https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
// Supposedly from a 1998 Mathematical Statistics paper that has since been lost?
// Not Random, Hash Function (works for same X & Y)
function hash(st) {
		// multiplies input by the seed
		// then converts number from 2D to 1D (via dot product)
		// arbitrary numbers 12.9898 and 78.233 chosen to avoid repitition
		// ~~~ used to multiply co.st by seed (a float)
    /**/
    let dotProduct = st[0] * 12.9898 + st[1] * 78.233;
		// then takes the sin of that number
		// then multiplies by 43758.5453, which amplifies the error of the sin function (based on local implementation)
		return Math.sin(dotProduct) * 43758.5453123 % 1;
		// then returns the fractional component of that number, focusing further on the error
		// overall, this is a dubious hash function because sin() is platform specific, and may not be consistent
    /**/
}

// 1D noise function
// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
// referenced from: https://thebookofshaders.com/13/
function noise(st) {

    // vec2 i = floor(st);
    //console.info(st);
    let i = [Math.floor(st[0]), Math.floor(st[1])];
    //console.info(st + " vs. " + i);

    //vec2 f = fract(st);
    let f = [st[0] % 1, st[1] % 1];

    // calculate 4 corners of a 2D tile
    let a = hash(i.slice());
    let b = hash([i[0]+1.0, i[1]]);
    let c = hash([i[0], i[1]+1.0]);
    let d = hash([i[0]+1.0, i[1]+1.0]);

		// calculate f^2 * (3.0 - 2.0 * f)
    //vec2 u = f * f * (3.0 - 2.0 * f);
    let u = [];
    u[0] = f[0] * f[0] * (3.0 - 2.0 * f[0]);
    u[1] = f[1] * f[1] * (3.0 - 2.0 * f[1]);


		// mix between a and b via u.x
    // x * (1−a) + y*a
    let h = a * (1.0 - u[0]) + b * u[0];
    // diff of c & a * u.y, multiplied by inverse of u.x
    // add in diff of d - b * (u.x*u.y)
    h+= (c - a) * u[1] * (1.0 - u[0]) + (d - b) * u[0] * u[1];

    /*
		float h = mix(a, b, u.x) +
						// diff of c & a * u.y, multiplied by inverse of u.x
            (c - a)* u.y * (1.0 - u.x) +
						// add in diff of d - b * (u.x*u.y)
            (d - b) * u.x * u.y;
            */

    return h;
}

// Fractal Brownian Motion
function fbm(v) {
	// number of iterations
	let octaves 		= 16;
	// initial value
	let value 		= 0.0;
	// initial amp at half
	let amplitude = 0.5;

	// regular step to increase freqency by
	let lacunarity = 2.0;
	// amplitude modification
	let gain = 0.5;

	for(let x = 0; x < octaves; x++) {
		// add noise of 'v' scaled by amplitude
		value += amplitude * noise(v.slice());

		// scale frequency by lacunarity
		//v *= lacunarity;
    v[0] *= lacunarity;
    v[1] *= lacunarity;

		// scale amplitude by gain
		amplitude *= gain;
	}

	return value;

}

let canvas;
let ctx;
let grid = null;
let imgData;
let seed = Math.random() * 1000.0;
console.info(seed);


function redraw() {
  // grab the canvas
  requestAnimationFrame(redraw);
  let canvas = document.getElementById("canvas-1");

  let ctx = canvas.getContext("2d");

  let size = 75;
  if(grid == null) {
    // get image data at the start
    grid = ctx.getImageData(0, 0, size, size);
    imgData = grid.data;

  }

  let time = ((new Date).getTime() / 1000) * 0.5;

  let step = 1;
  for(let x = 0; x < size; x+=step) {
    for(let y = 0; y < size; y+=step) {
      let cord = (x*size + y) * 4;

      // normalize the coordinates
      let nx = x / size;
      let ny = y / size

      let red = fbm([nx + seed + time,ny + seed + time]);
      red = fbm([nx + red, ny + red]);
      red = fbm([nx + red, ny + red]);

      //console.info(red);

      // RGBA
      imgData[cord] = (1.0 - red) * 255.0;
      imgData[cord+1] = (1.0 - red) * 255.0;
      imgData[cord+2] = (1.0 - red) * 255.0;
      imgData[cord+3] = 255.0;
    }
  }

  ctx.putImageData(grid, 0, 0);
}


///
///
///
///
///
///
///
///
///
///
///
// Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };


function initBuffers(gl) {

  // Create a buffer for the square's positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.

  const positions = [
    -1.0,  1.0,
     1.0,  1.0,
    -1.0, -1.0,
     1.0, -1.0,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -6.0]);  // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2;  // pull out 2 values per iteration
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next
                              // 0 = use type and numComponents above
    const offset = 0;         // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}



window.onload = (() => {
  redraw();
  //setInterval(redraw, 17);
});
