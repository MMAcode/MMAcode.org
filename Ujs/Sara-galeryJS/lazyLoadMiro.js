red2Images =
  ['<img src="images/galery/Red/red(1).jpg">',
    '<img src="images/galery/Red/red(2).jpg">']


hurr5Images =
  ['<img src="images/galery/Hurricane/Hurricane(1).jpg">',
    '<img src="images/galery/Hurricane/Hurricane(2).jpg">',
    '<img src="images/galery/Hurricane/Hurricane(3).jpg">',
    '<img src="images/galery/Hurricane/Hurricane(4).jpg">',
    '<img src="images/galery/Hurricane/Hurricane(5).jpg">']

limo12Images =
  ['<img src="images/galery/Limousine/Limousine(2).jpg">',
    '<img src="images/galery/Limousine/Limousine(3).jpg">',
    '<img src="images/galery/Limousine/Limousine(4).jpg">',
    '<img src="images/galery/Limousine/Limousine(5).jpg">',
    '<img src="images/galery/Limousine/Limousine(6).jpg">',
    '<img src="images/galery/Limousine/Limousine(7).jpg">',
    '<img src="images/galery/Limousine/Limousine(8).jpg">',
    '<img src="images/galery/Limousine/Limousine(9).jpg">',
    '<img src="images/galery/Limousine/Limousine(10).jpg">',
    '<img src="images/galery/Limousine/Limousine(11).jpg">',
    '<img src="images/galery/Limousine/Limousine(12).jpg">',]

const ss = document.querySelector.bind(document);
const ssa = document.querySelectorAll.bind(document);

let gLimo = ss('#galery-Limousine .photo-container');
let gHurr = ss('#galery-Hurricane .photo-container');
let gRed = ss('#galery-Red .photo-container');
let gmix = ss('#galery-mixed .photo-container');


// DEF place new img
function placeImageOnEnd(link, galery) {
  galery.innerHTML += link;
};

// def
// **
// action

// select last img
let currentLastLimoIMG = gLimo.querySelector('img:last-child');
console.log(currentLastLimoIMG);




// on load: 
// currentLastLimoIMG.addEventListener ('click',(()=>{
//   console.log('ahoj');
//   placeImageOnEnd(limo12Images[0], gLimo);
//   currentLastLimoIMG = gLimo.querySelector('img:last-child');
//   console.log(currentLastLimoIMG);
//   console.log('ahoj2');
// }));

// onload = () => {
//   console.log('ahoj');
//   placeImageOnEnd(limo12Images[0], gLimo);
//   currentLastLimoIMG = gLimo.querySelector('img:last-child');
//   console.log(currentLastLimoIMG);
//   console.log('ahoj2');
// };

// currentLastLimoIMG.onload = () => {
//   placeImageOnEnd(hurr5Images[3], gHurr);
// };










//different approach - use event listeners to start next image








// const images1by1 = async () => {

//   let response = await fetch('json/luigi.json');

//   if (response.status !== 200) {
//     throw new Error('cannot fetch the data');
//   }

//   let data = await response.json();
//   return data;

// };

// getTodos()
//   .then(data => console.log('resolved:', data))
//   .catch(err => console.log('rejected:', err.message));






