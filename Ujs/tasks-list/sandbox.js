const liList = document.querySelectorAll('li');
const ul = document.querySelector('ul');
const bu = document.querySelector('button');

// add listener to each li
// liList.forEach(li => {
//   li.addEventListener('click', e => {
//     e.target.remove();
//   });
// });



// add listener to ul (works also with newly adda=ed elements)
ul.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    e.target.remove();
  }
}); 






// add new task
bu.addEventListener('click', e => {
  newLI = document.createElement('li');
  newLI.textContent = 'New task';
  ul.prepend(newLI);
});







































