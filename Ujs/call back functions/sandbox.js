function createQuote(quote, callback){ 
  var myQuote = "Like I always say, " + quote;
  callback(myQuote); 
}

function logQuote(quote){
  console.log(quote);
}

createQuote("eat your vegetables!", logQuote); // 1
createQuote("eat your vegetables!", x => logQuote(x)); 

// Result in console: 
// Like I always say, eat your vegetables!