const gameBox = d3.select(".gameBox");

let coord, coordSprite;
let mouseX, mouseY;
let vieJoueur = 3;
let score = 0;
let pouvoir = 1;
let previousScore = 0;
let previousScoreBig = 0;
let previousScoreMax = 0;
let pause = true;
let gameOver = false;
let menu = true;
let godmode = false;
let gameFocus = true;


gameBox.on("mousemove", function (e) {

  if(!pause){

    let pointer = d3.pointer(e);
  
    mouseX = pointer[0];
    mouseY = pointer[1];
  
    coord = 180 - (Math.atan2(pointer[0], pointer[1]) * 180) / Math.PI;
    coordSprite = 90 - (Math.atan2(pointer[0], pointer[1]) * 180) / Math.PI;
  
    d3.select(".jony").style("transform", `rotate(${coordSprite}deg)`);
  }

});


window.addEventListener("keypress", (e) =>{
  if(e.key == ' ' && pause == false && gameOver == false && menu == false){
    e.preventDefault();
    pause = true;
    d3.select(".pauseScreen").style("display", "flex");
  }else if(e.key == ' ' && pause == true && gameOver == false && menu == false){
    e.preventDefault();
    pause = false;
    d3.select(".pauseScreen").style("display", "none");
  }else if(e.key == 'g' && godmode == false && pause == false){  //Godmode
    godmode = true;
    d3.select(".godmodeText").style("display", "block");
  }else if(e.key == 'g' && godmode == true && pause == false){
    godmode = false;
    d3.select(".godmodeText").style("display", "none");
  }
});

document.querySelector(".skinReset").addEventListener("click", ()=>{

  let invertTab = [0, 100];
  let colorLight = ["yellow", "red", "white", "black", "blue", "green", "pink", "violet", "orange"];

  let colorSkinHue = entierAlea(360);
  let colorSkinInvert = invertTab[entierMinMax(0,1)];
  let colorSkinLight = colorLight[entierMinMax(0,colorLight.length)];

  d3.select(".skin").style("filter", `hue-rotate(${colorSkinHue}deg) invert(${colorSkinInvert}%) drop-shadow(0px 0px 3px ${colorSkinLight})`);
  d3.select(".jony").style("filter", `hue-rotate(${colorSkinHue}deg) invert(${colorSkinInvert}%) drop-shadow(0px 0px 3px ${colorSkinLight})`);
});

document.querySelector(".start").addEventListener("click", ()=>{
  menu=false;
  pause=false;
  d3.select(".menuScreen").style("display", "none");
});

gameBox.on("click", ()=>{
  if(pouvoir!= 0){
    let speedMovInit = speedMov;
    speedMov = speedMov/2;
    pouvoir--;
    gameBox.style("filter", "hue-rotate(250deg)");

    setTimeout(() => {
      speedMov = speedMovInit;
      gameBox.style("filter", "hue-rotate(0deg)");
    }, 3000);
  }
});
