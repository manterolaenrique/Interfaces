
let ctx = document.getElementById("canvas").getContext("2d");
ctx.fillStyle = "#ff00000";
ctx.rect(20, 20, 150, 100);
ctx.stroke();


let ctx1 = document.getElementById("canvas1").getContext("2d");
ctx1.shadowBlur = 20;
ctx1.shadowColor = "black";
ctx1.fillStyle = "red";
ctx1.fillRect(0,0,500,250);

let ctx2 = document.getElementById("canvas2").getContext("2d");
ctx2.beginPath();
ctx2.rect(20, 20, 150, 100);
ctx2.fillStyle = "#ff00000";
ctx2.fill();

ctx2.beginPath();
ctx2.rect(40, 40, 150, 100);
ctx2.fillStyle = "blue";
ctx2.fill();

let ctx3 = document.getElementById("canvas3").getContext("2d");
ctx3.fillStyle = "#ff00000";
ctx3.fillRect(0, 0, 300, 150);
ctx3.clearRect(20, 20, 100, 50);

function colorRandom (){
    return Math.random() * 255 + 1;
}