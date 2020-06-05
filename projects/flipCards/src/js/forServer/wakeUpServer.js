import urlRoot from './globalVarRootUrl';
const changeServerStateBackgroundTo = (color) => {
  document.querySelectorAll('.serverState').forEach(El => {
    El.style.backgroundColor = `${color}`;
  });
}

/////////MAIN 
const wakeUpServer = async () => {
  // let off = 'grey';
  let loading = 'purple';
  let on = 'yellowgreen';
  let err = 'red';
  
  console.log("waking up server :)");
  changeServerStateBackgroundTo(loading);
  fetch(urlRoot+'/api/start')
  // fetch('https://mern-express-heroku.herokuapp.com/api/start')
    .then(res => res.json())
    .then(
      (result) => changeServerStateBackgroundTo(on),
      (error) => {
        console.log("Error in fetch:", error);
        changeServerStateBackgroundTo(err);
      }
    )
}

export default wakeUpServer;