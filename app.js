const gameBox = d3.select(".gameBox");

gameBox.on("mousemove", function (e) {

    let pointer = d3.pointer(e);

    let coord = Math.atan2(pointer[0], pointer[1]) * 180 / Math.PI;

    console.log(coord);

    // d3.select(".cls-1")
    //     .attr("transform", `translate(-135,-185) scale(0.5) rotate(${coord}, 320, 320 )`);
})