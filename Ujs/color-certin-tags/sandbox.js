// eE

let allP = document.querySelectorAll('p');

allP.forEach(
  e => {
    if (e.innerText.includes('error')) {
      e.classList.add('error');
    } else if (e.innerText.includes('success')) {
      e.classList.add('success');

    }
  }
);