var canvas = document.getElementById("gameBox");
var ctx = canvas.getContext("2d");

function drawBall(bx, by) {
    ctx.beginPath();
    ctx.arc(bx, by, 10, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

canvas.addEventListener("mousemove", function(e){
    drawBall(e.clientX, e.clientY);
});