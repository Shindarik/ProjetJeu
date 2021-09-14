var canvas = document.getElementById("gameBox");
var ctx = canvas.getContext("2d");

function drawBall(bx, by) {
    ctx.beginPath();
    ctx.arc(by, bx, 10, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
  
function draw(mx, my) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(mx, my);
}

canvas.addEventListener("mousemove", function(e){
    drawBall(e.pageX, e.pageY);
});