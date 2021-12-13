let compteurTirsEnnemis = 0;
let tirsEnnemisArray = [];
let coordTirs;


function entierAlea(n) {
    return Math.floor(Math.random() * n);
}

function updateTirsEnnemis() {
    let join = gameBox.selectAll(".TirsEnnemis").data(tirsEnnemisArray, (d) => d.id);

    join
      .enter()
      .append("image")
      .attr("href", "./images/heartbroken.svg")
      .attr("height", "30px")
      .attr("width", "30px")
      .attr("class", "TirsEnnemis");

    join.exit().remove();

    affichageTirsEnnemis();
}

function affichageTirsEnnemis() {
    gameBox
        .selectAll(".TirsEnnemis")
        .attr("transform", (d) => `translate(${Math.floor(d.x) - 15}, ${Math.floor(d.y) - 15})`);
}

updateTirsEnnemis();


function deplaceTirsEnnemis(c) {

    c.x -= c.nX * 2 * speedMov;
    c.y -= c.nY * 2 * speedMov;
}

function tirsEnnemisVisible(c) {
    if ((c.x <= 35 && c.x >= -35) && (c.y <= 35 && c.y >= -35)) {
      return false;
    } else {
      return true;  
    }
}

function tirsEnnemisBloque(c) {

    coordTirs = 180 - (Math.atan2(c.x, c.y) * 180) / Math.PI;
    let coordTirsOpposite = (coordTirs+180) % 360;
    let coordTirsMax = (coordTirsOpposite + 60);
    let coordTirsMin = (coordTirsOpposite - 60) % 360;

      if ((coord > coordTirsMax) && (coord < coordTirsMin)) {
        return false;
      } else if((coord <= coordTirsMax) && (coord >= coordTirsMin)){
        return true;
      }
}

setInterval(function () {

    if(!pause){
  
      tirsEnnemisArray.forEach(deplaceTirsEnnemis);
    
      if (tirsEnnemisArray.every(tirsEnnemisVisible)) {
        updateTirsEnnemis();
      }else if (tirsEnnemisArray.every(tirsEnnemisBloque)) {
        tirsEnnemisArray = tirsEnnemisArray.filter(tirsEnnemisVisible);
        updateTirsEnnemis();
      } else {
        if (vieJoueur > 0) {
          if(!godmode){
            vieJoueur--;
            blink();
          }
          if (vieJoueur == 0) {
            gameOver = true;
            pause = true;
            d3.select(".gameOverScreen").style("display", "flex");
            d3.select(".gameOverScreen span").text(score);
            document.querySelector(".gameOverScreen button").addEventListener("click", ()=>{ 
              location.reload();
            });
          }
        }
        tirsEnnemisArray = tirsEnnemisArray.filter(tirsEnnemisVisible);
        affichageTirsEnnemis();
      }
    }
  
  
}, 20);


setInterval(function () {


    if(!pause){

        
        compteurTirsEnnemis++;
        let NumAmis = (entierAlea(Amis.length));
        let norme = Math.sqrt((Amis[NumAmis].x) * (Amis[NumAmis].x) + (Amis[NumAmis].y) * (Amis[NumAmis].y));
        tirsEnnemisArray.push({
            nX: Amis[NumAmis].x / norme,
            nY: Amis[NumAmis].y / norme,
            x: Amis[NumAmis].x,
            y: Amis[NumAmis].y,
            id: compteurTirsEnnemis,
        });
    
        updateTirsEnnemis();

    }


}, 4000);