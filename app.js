const gameBox = d3.select(".gameBox");

let coord;
let mouseX, mouseY;
let compteur = 0;
let tabCoord = [];

function entierAlea(n) {
    return Math.floor(Math.random()*n);
}

gameBox.on("mousemove", function (e) {

    let pointer = d3.pointer(e);

    mouseX = pointer[0];
    mouseY = pointer[1];

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
        .style("stroke", "red");
    
    join.exit()
        .remove();


    updateTransforms();
}

function updateTransforms(){
    gameBox
    .selectAll("path")
    .attr("transform", d=>`translate(${d.x}, ${d.y})`);          
}

// initialement: on ajoute les Ã©toiles
updateDOM();

function deplacePoint(c){
    
    if(mouseX >= 0 && mouseY >= 0){
        while(c.x != mouseX && c.y != mouseY){
            console.log("fez");
            /*c.x += 1 ;
            c.y += 1 ;*/
        }
    }else if(mouseX <= 0 && mouseY >= 0){
        c.x -= 1 ;
        c.y += 1 ;
    }else if(mouseX <= 0 && mouseY <= 0){
        c.x -= 1 ;
        c.y -= 1 ;
    }else if(mouseX >= 0 && mouseY <= 0){
        c.x += 1 ;
        c.y -= 1 ;
    }
}

function pointVisible(c){ 
    return c.x<250 && c.x>-250 &&  c.y<350 && c.y>-350;
}
//toutes les 100ms, on ne modifie que les coordonnÃ©es
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
}, 10);



//toutes les 1000ms, on insÃ¨re une Ã©toile
setInterval(function(){    
    compteur++;
    tabCoord.push({x:0, y:0, id: compteur});
    updateDOM();
}, 1000);
















