async function regresion(){
    const epocas = parseInt(document.getElementById('repeticiones').value);
    const x = parseInt(document.getElementById('x').value);
    console.log(epocas)
    const modelo = tf.sequential();

    modelo.add(tf.layers.dense({units:1, inputShape: [1]}))
    modelo.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    })

    const xs = tf.tensor2d([2, 4, 6, 8, 10, 12], [6, 1]);
    const ys = tf.tensor2d([7, 11, 15, 19, 23, 27], [6, 1]);


    const salida = document.getElementById('salida');
    await modelo.fit(xs, ys, {epochs: epocas}).then(() => {
    salida.innerText = modelo.predict(tf.tensor(x, [1, 1]))
    });
}

let matriz1 = [];
let matriz2 = [];
let multiplicacion = new Array(3);
const tdMatriz1 = document.getElementById('matriz1');
const tdMatriz2 = document.getElementById('matriz2');
const tdResultado = document.getElementById('resultado');
const tfmul = document.getElementById('tfmul');

for (let i=0; i < 3; i++){
    matriz1[i] = []
    for (let j=0; j < 3; j++){
    let numero = Math.floor(Math.random() * 10);
    matriz1[i][j] = numero
    }
}

for (let i=0; i < 3; i++){
    matriz2[i] = []
    for (let j=0; j < 3; j++){
    let numero = Math.floor(Math.random() * 10);
    matriz2[i][j] = numero
    }
}

for (let x=0; x<multiplicacion.length;x++){
    multiplicacion[x] = new Array(3).fill(0);
}

function resultado () {
    for (let x=0; x < multiplicacion.length; x++) {
        for (let y=0; y < multiplicacion[x].length; y++) {
            for (let z=0; z<3; z++) {
            multiplicacion [x][y] = multiplicacion [x][y] + matriz1[x][z]*matriz2[z][y]; 
            }
        }
    }
    return multiplicacion
}

tdMatriz1.innerHTML = matriz1;
tdMatriz2.innerHTML = matriz2;
tdResultado.innerHTML = resultado();
tfmul.innerHTML = tf.matMul(matriz1,matriz2)
