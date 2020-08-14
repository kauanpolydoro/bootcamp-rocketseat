"use strict";

//const não é reatribuivel, apenas mutavel
var a = 1; // a = 3; Uncaught Error: "a" is read-only

var b = {
  nome: 'Kauan'
};
console.log(b);
b.nome = 'Polydoro';
console.log(b); //Let é uma variável de escopo e pode ser reatribuída.

function letExample() {
  var y = 1;
  console.log(y);
  y = 2; //Reatribuição do valor no escopo

  console.log(y); //Alterado para 2

  if (y === 2) {
    var _y = 3;
    console.log(_y); //Novo escopo com valor 3
  }

  console.log(y); //Continua sendo 2
}

letExample();
