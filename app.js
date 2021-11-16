const gameBox = d3.select(".gameBox");

let coord;
let mouseX, mouseY;

gameBox.on("mousemove", function (e) {
  let pointer = d3.pointer(e);

  mouseX = pointer[0];
  mouseY = pointer[1];

  coord = 90 - (Math.atan2(pointer[0], pointer[1]) * 180) / Math.PI;

  d3.select(".jony").style("transform", `rotate(${coord}deg)`);
});