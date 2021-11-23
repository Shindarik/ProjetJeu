const gameBox = d3.select(".gameBox");

let coord;
let mouseX, mouseY;
let vieJoueur = 3;
let score = 0;
let previousScore = 0;
let pause = false;


gameBox.on("mousemove", function (e) {

  if(!pause){

    let pointer = d3.pointer(e);
  
    mouseX = pointer[0];
    mouseY = pointer[1];
  
    coord = 90 - (Math.atan2(pointer[0], pointer[1]) * 180) / Math.PI;
  
    d3.select(".jony").style("transform", `rotate(${coord}deg)`);
  }

});


window.addEventListener("keypress", (e) =>{
  if(e.key == 'p' && pause == false){
    pause = true;
    d3.select(".pauseScreen").style("display", "flex");
  }else if(e.key == 'p' && pause == true){
    pause = false;
    d3.select(".pauseScreen").style("display", "none");
  }
});