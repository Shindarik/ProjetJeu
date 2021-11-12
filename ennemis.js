let compteurAmis = 0;

function entierAlea(n) {
  return Math.floor(Math.random() * n);
}

function placeAmis(position) {
    switch (position) {
      case 0:
        x = -350;
        y = -250;
        r = 135;
        return [x, y, r]
  
      case 1:
        x = 0;
        y = -250;
        r = 180;
        return [x, y, r]
  
      case 2:
        x = 350;
        y = -250;
        r = -135;
        return [x, y, r]
  
      case 3:
        x = 350;
        y = 0;
        r = -90;
        return [x, y, r]
  
      case 4:
        x = 350;
        y = 250;
        r = 45;
        return [x, y, r]
  
      case 5:
        x = 0;
        y = 250;
        r = 0;
        return [x, y, r]
  
      case 6:
        x = -350;
        y = 250;
        r = 45;
        return [x, y, r]
  
      case 7:
        x = -350;
        y = 0;
        r = 90;
        return [x, y, r]
  
    }
  }
  
  let Amis = []
  
  setInterval(function () {
    compteurAmis++;
    let position = placeAmis(entierAlea(8))
    Amis.push({
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
      .append("path")
      .attr(
        "d",
        "M0,0 L-10,0 M0,0 L8.1,5.9 M0,0 L8.1,-5.9 M0,0 L-3.1,9.5 M0,0 L-3.1,-9.5"
      )
      .attr("class", "Amis")
      .style("stroke", "black");
  
    join.exit().remove();
  
    updateAmis();
  }
  
  
  function updateAmis() {
  
    gameBox
      .selectAll(".Amis")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  
  }
  
  function deplaceAmis(c) {
  
    if(c.x <= 0 && c.y <= 0){
      c.x += 1;
      c.y += 1;
    }else if(c.x >= 0 && c.y <= 0){
      c.x -= 1;
      c.y += 1;
    }else if(c.x >= 0 && c.y >= 0){
      c.x -= 1; 
      c.y -= 1;
    }else if(c.x <= 0 && c.y >= 0){
      c.x += 1;
      c.y -= 1;
    }
  }

  function amiVisible(c) {
    if((c.x != 0) && (c.y != 0)){
      return true;
    }
  }
  
  setInterval(function () {

    Amis.forEach(deplaceAmis);

    if (Amis.every(amiVisible)) {
      updateAmis();
    } else {
      console.log(Amis);
      Amis = Amis.filter(amiVisible);
      affichageEnemmi();
    }

  }, 10);