let compteur = 0;
let tirArray = [];

function entierAlea(n) {
    return Math.floor(Math.random() * n);
}

function updateDOM() {
    let join = gameBox.selectAll(".Tirs").data(tirArray, (d) => d.id);

    join
        .enter()
        .append("path")
        .attr(
            "d",
            "M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
        )
        .attr("class", "Tirs")
        .style("stroke", "black")
        .style("fill", "#F05534");

    join.exit().remove();

    affichageTirs();
}

function affichageTirs() {
    gameBox
        .selectAll(".Tirs")
        .attr("transform", (d) => `translate(${Math.floor(d.x) - 20}, ${Math.floor(d.y) - 20})`);
}

updateDOM();


function deplacePoint(c) {

    c.x += c.coordMX * 4;
    c.y += c.coordMY * 4;
}

function collision(c) {

    return suppressionDansTableau(Amis, (a) =>{
        if ((Math.floor(c.x) <= (a.x + 20) && Math.floor(c.x) >= (a.x - 20)) && (Math.floor(c.y) <= (a.y + 20) && Math.floor(c.y) >= (a.y - 20))) {
            console.log("touché");
            return true;
        }
    });
}

function pointVisible(c) {

    if (c.x <= -350 || c.x >= 350 || c.y <= -250 || c.y >= 250) {
        return false;
    } else {
        return true;
    }
}

function suppressionDansTableau(tableau, critere) {
    let suppression=false;
    for (let i=tableau.length-1; i>=0; i--) {
        if (critere(tableau[i])) {
            tableau.splice(i,1);
            suppression=true;
        }
    }
    return suppression;
}

setInterval(function () {

    tirArray.forEach(tir => {
        deplacePoint(tir);
    });

    if (tirArray.every(pointVisible) == true) {
        suppressionDansTableau(tirArray, (d) =>{
            if (collision(d) == true) {
                console.log(score);
                console.log(previousScore);
                updateDOM();
                affichageEnemmi();
                if(score >= previousScore+100){
                    setMovSpeed();
                    previousScore = score;
                }
                score += 10;
                return true;
            }
        });
        updateDOM();
        affichageTirs();
    } else {
        tirArray = tirArray.filter(pointVisible);
        updateDOM();
    }
}, 10);

let posMouse = [];
let posMouseComp = 0;

setInterval(function () {
    compteur++;
    let norme = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    tirArray.push({
        x: 0,
        y: 0,
        id: compteur,
        coordMX: mouseX / norme,
        coordMY: mouseY / norme
    });

    updateDOM();
}, 500);