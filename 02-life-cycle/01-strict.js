'use strict';

/*
  O modo estrito foi um novo recurso do ECMAScript 5 que permite colocar um 
  programa ou uma função em um contexto operacional "estrito". Esse contexto 
  estrito impede que determinadas ações sejam executadas e lança mais exceções. 
  A instrução "use strict" instrui o navegador a usar o modo estrito, que é um 
  conjunto de recursos reduzido e mais seguro do JavaScript
*/

{
  x = 3.14;       // This will cause an error because x is not declared
}

{
  myFunction();
  function myFunction() {
    y = 3.14;   // This will also cause an error because y is not declared
  }
}