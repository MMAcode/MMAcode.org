const getTodos = (callback) => {

  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', () => {

    if (request.readyState === 4 && request.status === 200) {
      callback(undefined, request.responseText);
    } else if (request.readyState === 4) {
      callback('could not fetch the data', undefined);
    }

  });

  request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
  request.send();

};

// callBack function
const errData = (chyba, info) => {
  console.log('callback function fired');
  if (chyba) {
    console.log(chyba);
  } else {
    console.log(info);
  }
};
 
getTodos(errData);














const getTodos = (callback) => {

  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', () => {

    if (request.readyState === 4 && request.status === 200) {
      callback(undefined, request.responseText);
    } else if (request.readyState === 4) {
      callback('could not fetch the data', undefined);
    }

  });

  request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
  request.send();

};

console.log(1);
console.log(2);

getTodos((err, data) => {
  console.log('callback function fired');
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

console.log(3);
console.log(4);