(() => {
  // <stdin>
  var timer1 = Math.random() * 1e4;
  var seed = Math.random() * 1e4;
  var vertexCount = 0;
  var rotate = false;
  var vsSource = `
precision highp float;
precision highp int;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

attribute vec4 aVertPos;

varying vec2 vXY;

void main() {
  vXY = vec2(aVertPos.x, aVertPos.y);
  gl_Position = uProjectionMatrix * uModelViewMatrix  * aVertPos;
}`;
  var fsSource = `
precision highp float;
precision highp int;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float	uTime;

varying vec2 vXY;

void main() {
  float x = vXY.x + uTime * 3.3;
  float y = vXY.y + uTime * 3.7;

  float r = cos(x);
  float g = sin(y);
  float b = r + g;

  gl_FragColor = vec4(r,g,b,1.0);
}
`;
  function update() {
    rotate = document.getElementById("rotatebutton").checked;
    let vs = document.getElementById("vertexShader").value;
    let fs = document.getElementById("fragmentShader").value;
    document.getElementById("errors").value = "";
    if (vs != "") {
      vsSource = vs;
    }
    if (fs != "") {
      fsSource = fs;
    }
    main();
  }
  window.onload = () => {
    update();
    document.getElementById("rotatebutton").addEventListener("click", (e) => {
      update();
    });
    document.getElementById("updateShaders").addEventListener("click", (e) => {
      update();
    });
  };
  function main() {
    if (rotate) {
      requestAnimationFrame(main);
    }
    const canvas = document.querySelector("#canvas-1");
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertPos")
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        slowTime: gl.getUniformLocation(shaderProgram, "uSlowTime"),
        seed: gl.getUniformLocation(shaderProgram, "uSeed"),
        time: gl.getUniformLocation(shaderProgram, "uTime"),
        lightX: gl.getUniformLocation(shaderProgram, "LightX"),
        lightY: gl.getUniformLocation(shaderProgram, "LightX"),
        lightZ: gl.getUniformLocation(shaderProgram, "LightX")
      }
    };
    const buffers = initBuffers(gl);
    drawScene(gl, programInfo, buffers);
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return {
      position: positionBuffer
    };
  }
  function drawScene(gl, programInfo, buffers) {
    gl.clearColor(0, 0, 0, 0);
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
    timer1 += 5e-3;
    {
      const offset = 0;
      const vertexCount2 = vertexCount;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount2);
    }
  }
  function initShaderProgram(gl, vsSource2, fsSource2) {
    const vertexShader = loadShader("vertex", gl, gl.VERTEX_SHADER, vsSource2);
    const fragmentShader = loadShader("fragment", gl, gl.FRAGMENT_SHADER, fsSource2);
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
      document.getElementById("errors").value = "You have " + name + " shader errors in the console\n\nAn error occurred compiling the " + name + " shader:\n" + gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      rotate = false;
      return null;
    }
    return shader;
  }
})();
