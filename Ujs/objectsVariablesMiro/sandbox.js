let i = 5;
console.log("i:", i);

function add3(x) {
  x = x + 3;
  return x;
};

i = add3(i);

console.log("i after:", i);