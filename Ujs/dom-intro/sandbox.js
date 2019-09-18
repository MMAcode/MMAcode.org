// const ahoj = document.querySelectorAll('p');
const allP = document.querySelectorAll("p")
allP.forEach(p => {
  p.innerText += "  ---P IDENTIFIED"
})
// console.log(allP);

const content = document.querySelector(".content")
// console.log(content);
// console.log(content.innerHTML);
content.innerHTML += "<h1>renamed</h1>"

const title = document.querySelector("h1");
title.setAttribute("class", "content");