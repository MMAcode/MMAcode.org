
const nameOfServerStateCssClass = 'serverState';

const changeServerStateSubClassTo = (subClassName) => {
  console.log("subclass: ", subClassName, `${nameOfServerStateCssClass}${subClassName}`);
  document.querySelectorAll(`.${nameOfServerStateCssClass}`).forEach(El => {
    // El.setAttribute('class', `${nameOfServerStateCssClass} ${nameOfServerStateCssClass}${subClassName}`);
    El.classList.remove(`${nameOfServerStateCssClass}Off`);
    El.classList.remove(`${nameOfServerStateCssClass}Activating`);
    El.classList.remove(`${nameOfServerStateCssClass}On`);
    El.classList.remove(`${nameOfServerStateCssClass}Err`);
    El.classList.add(`${nameOfServerStateCssClass}${subClassName}`);
  });
}

const wakeUpServer = async () => {
  console.log("waking up server :)");

  //create classes
  let styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .${nameOfServerStateCssClass}Off{background-color:grey;}  
    .${nameOfServerStateCssClass}Activating{background-color:yellow;}
    .${nameOfServerStateCssClass}On{background-color:yellowgreen;}
    .${nameOfServerStateCssClass}Err{background-color:red;}
    `;
  document.querySelector('body').append(styleEl);


  changeServerStateSubClassTo('Loading');
  // fetch('http://localhost:3001/api/start')
  fetch('https://mern-express-heroku.herokuapp.com/api/start')
    .then(res => res.json())
    .then(
      (result) => changeServerStateSubClassTo('On'),
      (error) => {
        console.log("Error in fetch:", error);
        changeServerStateSubClassTo('Err');
      }
    )
}

export default wakeUpServer;