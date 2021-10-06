const gameBox = d3.select(".gameBox");

gameBox.on("mousemove", function (e) {

    let pointer = d3.pointer(e);

    let coord = Math.atan2(pointer[0], pointer[1]) * 180 / Math.PI;

    console.log(coord);

    // d3.select("circle")
    //     .attr("transform", `translate(${pointer[0]}, ${pointer[1]})`);
})