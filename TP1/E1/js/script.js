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