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
        .append("path")
        .attr(
            "d",
            "M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
        )
        .attr("class", "TirsEnnemis")
        .style("stroke", "black")
        .style("fill", "black");

    join.exit().remove();

    affichageTirsEnnemis();
}

function affichageTirsEnnemis() {
    gameBox
        .selectAll(".TirsEnnemis")
        .attr("transform", (d) => `translate(${Math.floor(d.x) - 20}, ${Math.floor(d.y) - 20})`);
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
        console.log("bloqué");
        tirsEnnemisArray = tirsEnnemisArray.filter(tirsEnnemisVisible);
        updateTirsEnnemis();
      } else {
        if (vieJoueur > 0) {
          vieJoueur--;
          blink();
          if (vieJoueur == 0) {
            gameOver =
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