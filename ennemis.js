let compteurAmis = 0;

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
  Amis.push({
    x: position[0],
    y: position[1],
    id: compteurAmis
  });
  affichageEnemmi();
}, 1000);


// function affichageEnemmi() {

//   let join = gameBox.selectAll(".Amis").data(Amis, (d) => d.id);

//   join
//     .enter()
//     .append("path")
//     .attr(
//       "d",
//       "M0,0 L-10,0 M0,0 L8.1,5.9 M0,0 L8.1,-5.9 M0,0 L-3.1,9.5 M0,0 L-3.1,-9.5"
//     )
//     .attr("class", "Amis")
//     .style("stroke", "black");

//   join.exit().remove();

//   updateAmis();
// }

function affichageEnemmi() {

  let join = gameBox.selectAll(".Amis").data(Amis, (d) => d.id);

  join
    .enter()
    .append("img")
    .attr("href", "./images/sadamis.svg")
    .attr("height", "85px")
    .attr("width", "85px")
    .attr("class", "Amis");

  join.exit().remove();

  updateAmis();
}


function updateAmis() {

  gameBox
    .selectAll(".Amis")
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

}

function deplaceAmis(c) {

  // if (c.x <= 0) {
  //   c.x += (Math.abs(c.x/ c.y));
  // } else if (c.x >= 0) {
  //   c.x -= (Math.abs(c.x / c.y));
  // }

  // if (c.y <= 0) {
  //   c.y += (Math.abs(c.x / c.y));
  // } else if (c.y >= 0) {
  //   c.y -= (Math.abs(c.x / c.y));
  // }

  if (c.x <= 0 && c.y <= 0) {
    c.x += 1;
    c.y += 1;
  } else if (c.x >= 0 && c.y <= 0) {
    c.x -= 1;
    c.y += 1;
  } else if (c.x >= 0 && c.y >= 0) {
    c.x -= 1;
    c.y -= 1;
  } else if (c.x <= 0 && c.y >= 0) {
    c.x += 1;
    c.y -= 1;
  }
}

function amiVisible(c) {
  if ((c.x <= 0 && c.x >= -1) && (c.y <= 0 && c.y >= -1)) {
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
    Amis = Amis.filter(amiVisible);
    affichageEnemmi();
  }

}, 30);