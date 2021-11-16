let compteur = 0;
let tabCoord = [];

function entierAlea(n) {
    return Math.floor(Math.random() * n);
}

function updateDOM() {
    let join = gameBox.selectAll(".Tirs").data(tabCoord, (d) => d.id);

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

    updateTransforms();
}

function updateTransforms() {
    gameBox
        .selectAll(".Tirs")
        .attr("transform", (d) => `translate(${Math.floor(d.x)}, ${Math.floor(d.y)})`);
}

updateDOM();


function deplacePoint(c) {

    if (c.coordMX == 0) {
        c.coordMX = 1;
    }

    if (c.coordMY == 0) {
        c.coordMY = 1;
    }

    if (c.coordMX >= 0) {
        c.x += (Math.abs(c.coordMX / c.coordMY));
    } else if (c.coordMX <= 0) {
        c.x -= (Math.abs(c.coordMX / c.coordMY));
    }

    if (c.coordMY >= 0) {
        c.y += (Math.abs(c.coordMY / c.coordMX));
    } else if (c.coordMY <= 0) {
        c.y -= (Math.abs(c.coordMY / c.coordMX));
    }
}

function collision(c) {
    for (let i = 0; i < Amis.length; i++) {

        if ((Math.floor(c.x) <= (Amis[i].x + 20) && Math.floor(c.x) >= (Amis[i].x - 20)) && (Math.floor(c.y) <= (Amis[i].y + 20) && Math.floor(c.y) >= (Amis[i].y - 20))) {
            return true;
        }
    }
}

function pointVisible(c) {

    if (c.x <= -350 || c.x >= 350 || c.y <= -250 || c.y >= 250) {
        return false;
    } else {
        return true;
    }
}

setInterval(function () {

    tabCoord.forEach(tir => {
        deplacePoint(tir);
    });

    if (tabCoord.every(pointVisible) == true) {
        if (tabCoord.every(collision) == true) { 
            tabCoord = tabCoord.filter(collision);
            updateDOM();
        }
        updateTransforms();
    } else {
        tabCoord = tabCoord.filter(pointVisible);
        updateDOM();
    }
}, 10);

let posMouse = [];
let posMouseComp = 0;

setInterval(function () {
    compteur++;
    posMouse[posMouseComp] = [Math.floor(mouseX), Math.floor(mouseY)];
    tabCoord.push({
        x: 0,
        y: 0,
        id: compteur,
        coordMX: posMouse[posMouseComp][0],
        coordMY: posMouse[posMouseComp][1]
    });

    updateDOM();
    posMouseComp++;

}, 1000);