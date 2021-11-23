let compteurAmis = 0;
let speedMov = 1;

function entierAlea(n) {
  return Math.floor(Math.random() * n);
}

function entierMinMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function amisRandom(r) {

  if (r >= -250 && r <= 250) {

    let posX = [-350, 350];
    x = posX[entierAlea(2)];
    y = r;
    return [x, y];

  } else if (r < -250 || r > 250) {

    let posY = [-250, 250];
    x = entierMinMax(-350, 350);
    y = posY[entierAlea(2)];
    return [x, y];

  }
}

let Amis = []

setInterval(function () {
  compteurAmis++;
  let position = amisRandom(entierMinMax(-350, 350));
  let norme = Math.sqrt(position[0] * position[0] + position[1] * position[1]);
  Amis.push({
    nX: position[0] / norme,
    ny: position[1] / norme,
    x: position[0],
    y: position[1],
    id: compteurAmis
  });
  affichageEnemmi();
}, 1000);

function affichageEnemmi() {

  let join = gameBox.selectAll(".Amis").data(Amis, (d) => d.id);

  join
    .enter()
    .append("image")
    .attr("href", "./images/sadamis.svg")
    .attr("height", "60px")
    .attr("width", "60px")
    .attr("class", "Amis");

  join.exit().remove();

  updateAmis();
}


function updateAmis() {

  gameBox
    .selectAll(".Amis")
    .attr("transform", (d) => `translate(${d.x - 30}, ${d.y - 30})`);

}

function setMovSpeed(){
  speedMov = speedMov * 2;
  return speedMov
}

function deplaceAmis(c) {

  console.log(speedMov);

  c.x += c.nX;
  c.y += c.nY;

//  if (c.x <= 0 && c.y <= 0) {
//     c.x += speedMov;
//     c.y += speedMov;
//   } else if (c.x >= 0 && c.y <= 0) {
//     c.x -= speedMov;
//     c.y += speedMov;
//   } else if (c.x >= 0 && c.y >= 0) {
//     c.x -= speedMov;
//     c.y -= speedMov;
//   } else if (c.x <= 0 && c.y >= 0) {
//     c.x += speedMov;
//     c.y -= speedMov;
//   }
}

function amiVisible(c) {
  if ((c.x <= 30 && c.x >= -30) && (c.y <= 30 && c.y >= -30)) {
    return false;
  } else {
    return true;
  }
}


setInterval(function () {

  Amis.forEach(deplaceAmis);

  if (Amis.every(amiVisible)) {
    updateAmis();
  } else {
    if(vieJoueur>0){
      vieJoueur--;
      if(vieJoueur == 0){
        alert("Game Over !");
        location.reload();
      }
    }
    Amis = Amis.filter(amiVisible);
    affichageEnemmi();
  }

}, 30);