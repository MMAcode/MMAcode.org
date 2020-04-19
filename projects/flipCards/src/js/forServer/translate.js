import { langInWord1, langInWord2, page2ActiveNow } from '../bundle';
let savedSelectedText = '';

let translateOnline = async (from, to, textToTranslate) => {

  async function postJsonData(url, data) {//object  
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    const response = await fetch(url, options);
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  return await
    // postJsonData('http://localhost:3001/api/translate',
    postJsonData('https://mern-express-heroku.herokuapp.com/api/translate',
      {
        from,
        to,
        translate: textToTranslate,
      })
      .then((data) => {
        console.log("Data from server: ", data); // JSON data parsed by `response.json()` call
        // console.log(data.translated); // JSON data parsed by `response.json()` call
        return data.translated;
      });
}
export default translateOnline;

function getSelectionText() {
  // e.preventDefault();
  var text = "";
  if (window.getSelection) {
    // console.log("text received");
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    console.log("control received as SELECT TEXT");

    text = document.selection.createRange().text;
  } else {
    // console.log("screwed");

    alert('no');
  }
  return text;
}
let alertUserForSec = async (text, durationInSec) => {
  let alertForSec = document.createElement('p');
  // alertForSec.textContent = text;
  alertForSec.innerHTML = text;
  alertForSec.id = "alertForSec";
  // alertForSec.classList.add("flyingAlert");
  alertForSec.style.animationDuration = durationInSec + "s";
  let hook = document.querySelector("#words");
  hook.append(alertForSec);
  await new Promise(resolve => setTimeout(resolve, durationInSec * 1000));
  // console.log('XXXXXXXXXXX alert pop up');
  document.querySelector("#alertForSec").remove();
}






let translateAndShowSelectedText = async (languageOfTheSelection) => {
  // console.log('AAAAAAAAAAAAAAAAAAAAAAtranslateSelectedText');
  // console.log(languageOfTheSelection);
  let selectedNow = getSelectionText();
  if (selectedNow > 0) savedSelectedText = selectedNow;

  alertUserForSec("SAVED:" + savedSelectedText + "\n HIGH: " + selectedNow, 4);
  console.log("SAVED:" + savedSelectedText);
  console.log("HIGH: " + selectedNow);
  console.log("Window:", window.getSelectionText);

  let langForGoogle = { textToTranslate: selectedNow.length > 0 ? selectedNow : savedSelectedText };
  if (languageOfTheSelection == 'czech') {
    langForGoogle.from = 'cs';
    langForGoogle.to = 'en';
  } else if (languageOfTheSelection == 'english') {
    langForGoogle.from = 'en';
    langForGoogle.to = 'cs';
  }

  // console.log(langForGoogle);
  let translation = await translateOnline(langForGoogle.from, langForGoogle.to, langForGoogle.textToTranslate);
  // console.log(translation);
  // showSelectionForSec();

  // alertUserForSec(translation, 5);

}



export const enableTranslateOnSelect = async () => {

  let showTranslateButtonAndUpdateSavedSelectedText = (buttonID, languageOfTheSelection) => {
    // console.log("DDDDDDDDDDDDDDDDDD p2 active:", page2ActiveNow);
    if (getSelectionText().length > 0) savedSelectedText = getSelectionText();
    if (page2ActiveNow && savedSelectedText.length > 0) {
      document.querySelector(buttonID).style.display = 'inline-block';
      translateAndShowSelectedText(languageOfTheSelection);
    }

  }

  //show translate button
  document.querySelector('#wordOne').addEventListener('touchend', () => showTranslateButtonAndUpdateSavedSelectedText('#wordOneTranslate', langInWord1));
  // document.querySelector('#wordOne').addEventListener('touchcancel', () => showTranslateButtonAndUpdateSavedSelectedText('#wordOneTranslate', langInWord1));
  // document.querySelector('#wordTwo').addEventListener('touchend', () => showTranslateButtonAndUpdateSavedSelectedText('#wordTwoTranslate', langInWord2));
  document.querySelector('#wordTwo').addEventListener('touchcancel', () => showTranslateButtonAndUpdateSavedSelectedText('#wordTwoTranslate', langInWord2));

  //update highlightedText variable upon change in selection
  // document.querySelector('#wordOne').addEventListener('select', () => {
  //   console.log("MMMMMMMMMMMMM", getSelectionText());
  //   if (getSelectionText().length > 0) savedSelectedText = getSelectionText()
  // });
  // document.querySelector('#wordOne').addEventListener('select', () => { if (getSelectionText().length > 0) savedSelectedText = getSelectionText() });

  //main
  document.querySelector('#wordOneTranslate').addEventListener('click', () => translateAndShowSelectedText(langInWord1));
  document.querySelector('#wordTwoTranslate').addEventListener('click', () => translateAndShowSelectedText(langInWord2));
  // document.querySelector('#wordTwoTranslate').innerHTML = await translateOnline('cs', 'en', 'kdo to je?');

};

