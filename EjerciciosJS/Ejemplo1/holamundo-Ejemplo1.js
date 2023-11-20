console.log ('Hola mundo');

/*
const mensajes = () =>{    
    console.log ('Comienzo mi programación JS');
    console.log('Reprobe mate otra vez');
}

function imprimeMensaje(mensaje, veces) {
    for (var i = 0; i < veces; i++) {
    console.log(mensaje);
    }
    console.log('Valor de i es: ' + i);
   }


imprimeMensaje('hola', 5);
mensajes (); */

//condicionales
let x = 10;
if (x > 0) {
const y = 10;
const list = [1, 2, 3];
}

//concatenar cadenas
let botana = 'Galle';
botana += 'tas';
console.log("yo quiero " + botana);

var immutableString = "Hello";
immutableString = immutableString + "World";
console.log (immutableString);

//valores nulos
let numero = null;
let entero1;
console.log(numero); // null

//recorrer listas:
let bebidas = ['leche', 'cacao', 'té'];
for (let i = 0; i < bebidas.length; i++) {
 console.log(bebidas[i]);
}

//iterar sobre el areglo anterior:
bebidas.forEach((item, i) => {
    console.log(item,i);
   });

   bebidas.map(function(item,i){
    console.log(item,i);
   })


   //mapas a traves de ojetos (Acceder al valor de una propiedad):
const cadena = {
    'pato': 102,
    perro: 230,
    gato: 203
}
//1. objectName[property]
console.log ((cadena['pato']));

//2. objectName.property
console.log((cadena.pato));


//Añadir una propiedad a un objeto
//Nombramos a la propiedad y le damos un valor
let nombre = 'azucena';
cadena.azucena = 72;
 console.log(cadena);

 //eliminar una propiedad a un objeto
 delete cadena.gato;
 console.log(cadena);

 //Iterar a través de un mapa utilizacndo bucle for
 for (let nombre in cadena) {
    console.log(nombre + ' tiene ' + cadena[nombre]);
    }
    
