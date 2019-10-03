function checkPalindrome(inputString) {
  let a = 0
  let b = inputString.length - 1;

  let x = true;
  while (a <= b) {
    if (inputString[a] != inputString[b]) {
      x = false;
    }
    else { console.log('false'); }
    a++;
    b--;
    console.log(a, b, " 1 loop finished");
  }
  return x;
}

checkPalindrome(str);