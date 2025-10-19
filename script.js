
// script.js - simple falling hearts on a canvas
const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
let W, H;
function resize(){ W=canvas.width = window.innerWidth; H=canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);

function rand(a,b){ return Math.random()*(b-a)+a; }
const hearts = [];
for(let i=0;i<25;i++){
  hearts.push({x:rand(0,W), y:rand(-H, H), s:rand(8,20), vy:rand(0.2,1.2), rot:rand(0,Math.PI*2)});
}

function drawHeart(x,y,s,rot){
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(rot);
  ctx.beginPath();
  const topCurveHeight = s * 0.3;
  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(0, topCurveHeight - s, -s, topCurveHeight - s, -s, topCurveHeight);
  ctx.bezierCurveTo(-s, topCurveHeight + (s*0.5), 0, topCurveHeight + (s*0.9), 0, topCurveHeight + s);
  ctx.bezierCurveTo(0, topCurveHeight + (s*0.9), s, topCurveHeight + (s*0.5), s, topCurveHeight);
  ctx.bezierCurveTo(s, topCurveHeight - s, 0, topCurveHeight - s, 0, topCurveHeight);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,90,158,0.9)";
  ctx.fill();
  ctx.restore();
}

function loop(){
  ctx.clearRect(0,0,W,H);
  for(let h of hearts){
    drawHeart(h.x, h.y, h.s, h.rot);
    h.y += h.vy;
    h.x += Math.sin(h.y*0.01)*0.3;
    h.rot += 0.01;
    if(h.y - h.s > H){ h.y = -20; h.x = rand(0,W); }
  }
  requestAnimationFrame(loop);
}
loop();
