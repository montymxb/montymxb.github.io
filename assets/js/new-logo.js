
const canvas = document.querySelector('#canvas-1');

let iter = 0.0;

// draw the image

function drawLogo() {
  let ctx = canvas.getContext("2d");

  //var gradient = ctx.createLinearGradient(100,100,225,225);
  let a = Math.abs(Math.sin(iter)) * 200;
  let b = Math.abs(Math.cos(iter)) * 200;
  let c = Math.abs(Math.sin(iter)) * 200;
  let d = Math.abs(Math.cos(iter)) * 200;
  let gradient = ctx.createLinearGradient(a, b, 200, 200);
  //let gradient = ctx.createRadialGradient(a, b, 0, 100, 100, 100)

  // Add three color stops
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.5, 'green');
  gradient.addColorStop(1, 'blue');

  ctx.strokeStyle = gradient;
  const lineWidth = 8;
  ctx.lineWidth = lineWidth;

  let xStart = 45;
  let yStart = 120;
  let x = xStart;
  let y = yStart;
  // draw the first path of the icon
  ctx.beginPath();
  ctx.moveTo(x,y);
  // move left -25
  x-=25;
  ctx.lineTo(x,y);
  // move down -25 (stopping early)
  y+=25 + (lineWidth / 2);
  ctx.lineTo(x,y);
  ctx.stroke();



  // move right 25 (starting early)
  y+=25 - (lineWidth / 2);
  x+=25 - (lineWidth / 2);
  ctx.beginPath();
  ctx.moveTo(x,y);
  x+=25 + (lineWidth / 2);
  ctx.lineTo(x,y);
  // move up 100
  y-= (100 + (lineWidth / 2));
  ctx.lineTo(x,y);
  // move left -50
  x-=50;
  ctx.lineTo(x,y);
  // move up 50
  y-=50;
  ctx.lineTo(x,y);

  // move right 125 (stopping early)
  x+=(125 + (lineWidth / 2));
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
  y+=(100 + (lineWidth / 2));
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

  // draw circle at the point
  // ctx.beginPath();
  // ctx.arc(xStart - 25, yStart + 25, 1, 2.0 * Math.PI, 1.5 * Math.PI, false);
  // ctx.stroke();

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
}

window.onload = function() {
  setInterval((() => {
    drawLogo();
    iter+=0.1;
  }), 100);
}
