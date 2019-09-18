localStorage.setItem('player', 'Tomas');
let sName = localStorage.getItem('player');

let sName2 = localStorage.setItem('boss', 'Martin');
console.log('ahoj tooo');
console.log(sName);


localStorage.setItem('player', 'Tomas-ne');
console.log(sName);
sName = localStorage.getItem('player');
console.log(sName);
sName = 'string';
// console.log(localStorage.letItem('string'));

localStorage.setItem('plasssyer', 'Tooooimas-ne');

localStorage.clear();