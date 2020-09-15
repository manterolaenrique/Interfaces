let cols = 10;
let rows = 10;

let matrix = [];
for(let i = 0; i<cols; i++){
    matrix[i] = [];
    for(let j = 0; j<rows; j++){
        matrix[i][j] = Math.random() * 100;
    }
}

console.table(matrix);

console.log("EJERCICIO 1 A" + " // Escribir una función que retorne el valor máximo de toda la matriz")

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

console.log("EJERCICIO 1 B" + "  //  Escribir una función que retorne el valor máximo contenido en las filas pares y el valor mínimo en las filas impares")

function maximoFila (){
    let max = 0;
    let i = 0;
    let col = 0;
    while( i<cols){
        for(let j = 0; j<rows; j++){
            if (max < matrix[i][j]){
                max = matrix[i][j];
                col = i;
            }
        }
        i++;
        i*=2;
    }
    console.log("El numero maximo en las filas pares: " + max);
    console.log("La Fila es: " + col); 
}

maximoFila();

function minimoFila (){
    let max = 0;
    let i = 0;
    let col = 0;
    while( i<cols){
        for(let j = 0; j<rows; j++){
            if (max > matrix[i][j] || max == 0){
                max = matrix[i][j];
                col = i;
            }
        }
        i++;
        i*=2+1;
    }
    console.log("El numero minimo en las filas impares: " + max);
    console.log("La Fila es: " + col); 
}

minimoFila();

console.log("EJERCICIO 1 C" + " //  Calcular el valor promedio de cada fila y guardarlos en un arreglo.")

function promedioFila (){
    var promedio = [];
    var      promedio = new Array();
    let aux = 0;
    for(let i = 0; i<cols; i++){
        for(let j = 0; j<rows; j++){
            aux+=parseInt(matrix[i][j]);
        }
        aux= parseInt(aux) / parseInt(cols);
        promedio[i] = aux;
    }
    console.log(promedio);
}

promedioFila();







