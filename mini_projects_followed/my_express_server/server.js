const express = require('express');
const app = express();

app.get("/", (request, response) => {
  // console.log(request);
  response.send('<h1>Hi there!</h1>');
})

app.get("/contact", (request, response) => {
  response.send('<h1>contact us!</h1>');
})

app.get("/about", (request, response) => {
  // response.send('<h1>contact us!</h1>');
  // response.send('<h1>i am your god!</h1>');
  response.send('<p>bend before me</p>');
})

app.listen(3000, () => {
  console.log('server started on port 3000');
  console.log('available on path "localhost:3000"');
}); 