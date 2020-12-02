
const canvas = document.querySelector('#canvas-1');

// draw the image

let ctx = canvas.getContext("2d");

var gradient = ctx.createLinearGradient(100,100,225,225);

// Add three color stops
gradient.addColorStop(0, 'red');
gradient.addColorStop(.5, 'green');
gradient.addColorStop(1, 'blue');

ctx.strokeStyle = gradient;
ctx.lineWidth = 1;

let xStart = 150;
let yStart = 150;
let x = xStart;
let y = yStart;
// draw the first path of the icon
ctx.beginPath();
ctx.moveTo(x,y);
// move left -25
x-=25;
ctx.lineTo(x,y);
// move down -25 (stopping early)
y+=25;
ctx.lineTo(x,y);
ctx.stroke();



// move right 25 (starting early)
y+=25;
x+=25;
ctx.beginPath();
ctx.moveTo(x,y);
x+=25;
ctx.lineTo(x,y);
// move up 100
y-=100;
ctx.lineTo(x,y);
// move left -50
x-=50;
ctx.lineTo(x,y);
// move up 50
y-=50;
ctx.lineTo(x,y);

// move right 125 (stopping early)
x+=125;
ctx.lineTo(x,y);
ctx.stroke();

// move down -25 (starting early)
x+=25;
y+=25;
ctx.beginPath();
ctx.moveTo(x,y);
y+=25;
ctx.lineTo(x,y);
// move left -50
x-=50;
ctx.lineTo(x,y);
// move down -100
y+=100;
ctx.lineTo(x,y);
// move right 50
x+=50;
ctx.lineTo(x,y);
// move up 50
y-=50;
ctx.lineTo(x,y);
// move left -25
x-=25;
ctx.lineTo(x,y);
ctx.stroke();

// bottom left arc LARGE

ctx.beginPath();
ctx.arc(xStart - 25, yStart + 50, 25, 1.5 * Math.PI, 2.0 * Math.PI, false);
ctx.stroke();

// top right arc LARGE
ctx.beginPath();
ctx.arc(xStart + 125, yStart - 100, 25, 0.5 * Math.PI, 1.0 * Math.PI, false);
ctx.stroke();

// small bottom left sphere
ctx.beginPath();
ctx.arc(xStart - 25, yStart + 50, 12.5, 0.0, 2.0 * Math.PI, false);
ctx.stroke();

// small top left sphere
ctx.beginPath();
ctx.arc(xStart + 125, yStart - 100, 12.5, 0.0, 2.0 * Math.PI, false);
ctx.stroke();

function f1() {
  this.x = 2;
  this.y = 4;
  console.dir(this);
  return this.x + this.y;
}

console.info("HELLO THERE!");
f1();
