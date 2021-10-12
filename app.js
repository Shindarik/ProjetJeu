const gameBox = d3.select(".gameBox");

let coord;
let compteur = 0;
let tabCoord = [];

gameBox.on("mousemove", function (e) {

    let pointer = d3.pointer(e);

    coord = 90 - (Math.atan2(pointer[0], pointer[1]) * 180 / Math.PI);

     d3.select(".jony")
      .style("transform", `rotate(${coord}deg)`);
})

function updateDOM() {
    let join=gameBox
        .selectAll("path")
        .data(tabCoord, d=> d.id);

    join.enter()
        .append("path")
        .attr("d","M0,0 L-10,0 M0,0 L8.1,5.9 M0,0 L8.1,-5.9 M0,0 L-3.1,9.5 M0,0 L-3.1,-9.5")
        .style("stroke", "yellow");
    
    join.exit()
        .remove();


    updateTransforms();
}
function updateTransforms(){
    gameBox
    .selectAll("path")
    .attr("transform", d=>`translate(${d.x}, ${d.y})scale(${(d.x*d.x+d.y*d.y+5000)/10000})`);          
}

// initialement: on ajoute les Ã©toiles
updateDOM();

function deplacePoint(c){    
    let distance=Math.sqrt((c.x*c.x+c.y*c.y)/10000); 
    c.x*=(1+.03/distance);
    c.y*=(1+.03/distance);   
}
function pointVisible(c){ 
    return c.x<80 && c.x>-80 &&  c.y<80 && c.y>-80;
}
//toutes les 50ms, on ne modifie que les coordonnÃ©es
setInterval(function(){
    tabCoord.forEach(deplacePoint);
    if (tabCoord.every(pointVisible)) { 
        //tous les points dans coordonnÃ©es ont pointVisible(c) = true
        updateTransforms();        
    } else { 
        //au moins un point cachÃ©, on le retire du tableau
        tabCoord=tabCoord.filter(pointVisible);
        updateDOM();
    }
}, 50);



//toutes les 200ms, on insÃ¨re une Ã©toile
setInterval(function(){    
    compteur++;
    tabCoord.push({x:entierAlea(40)-19.5, y:entierAlea(40)-19.5, id: compteur});
    updateDOM();
}, 100);













