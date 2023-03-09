attribute vec2 aTextureCoord;
varying highp vec2  	vST;		// texture coords
varying highp vec2 vPos;
attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform highp float uSlowTime;

void main() {
  vST = aTextureCoord;
  vPos = aVertexPosition.xy;
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
