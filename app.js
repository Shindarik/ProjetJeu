const gameBox = d3.select(".gameBox");

let coord;
let mouseX, mouseY;
let vieJoueur = 3;
let score = 0;
let previousScore = 0;
let pause = false;
let gameOver = false;


gameBox.on("mousemove", function (e) {

  if(!pause){

    let pointer = d3.pointer(e);
  
    mouseX = pointer[0];
    mouseY = pointer[1];
  
    coord = 90 - (Math.atan2(pointer[0], pointer[1]) * 180) / Math.PI;

    console.log(coord);
  
    d3.select(".jony").style("transform", `rotate(${coord}deg)`);
  }

});


window.addEventListener("keypress", (e) =>{
  if(e.key == 'p' && pause == false && gameOver == false){
    pause = true;
    d3.select(".pauseScreen").style("display", "flex");
  }else if(e.key == 'p' && pause == true && gameOver == false){
    pause = false;
    d3.select(".pauseScreen").style("display", "none");
  }
});