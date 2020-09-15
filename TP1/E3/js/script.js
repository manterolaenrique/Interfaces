var cols = 10;
var rows = 10;

var matrix = [];
for(let i = 0; i<cols; i++){
    matrix[i] = [];
    for(let j = 0; j<rows; j++){
        matrix[i][j] = Math.random() * 100;
    }
}

console.table(matrix);

console.log("Ahora hay que resolver el ejercicio...")

function maximo (){
    let max = 0;
    let fila = 0;
    let col = 0;
    for(let i = 0; i<cols; i++){
        for(let j = 0; j<rows; j++){
            if (max < matrix[i][j]){
                max = matrix[i][j];
                fila = j;
                col = i;
            }
        }
    }
    console.log(max);
    console.log("fila: " + fila);
    console.log("Columnoa: "+col);
}

maximo();

