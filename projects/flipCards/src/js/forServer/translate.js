import { langInWord1, langInWord2, langInWord1G, langInWord2G, page2ActiveNow, userInfo } from '../bundle';
import urlRoot from './globalVarRootUrl';
let savedSelectedText = '';
let textAndLangForTranslation;

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
    postJsonData(urlRoot+'/api/translate',
    // postJsonData('https://mern-express-heroku.herokuapp.com/api/translate',
      {
        from,
        to,
        translate: textToTranslate,
      })
      .then(async (data) => {
        console.log("Data from server: ", data);
        // JSON data parsed by `response.json()` call
        // console.log(data.translated); // JSON data parsed by `response.json()` call
        return await data.translated;
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
  };
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
  if (selectedNow.length > 0) savedSelectedText = selectedNow;

  // alertUserForSec("SAVED:" + savedSelectedText + "\n HIGH: " + selectedNow, 4);
  console.log("SAVED:" + savedSelectedText);
  console.log("HIGH: " + selectedNow);
  console.log("Window:", window.getSelectionText);
  console.log("Window2:", window.getSelection().toString());

  let langForGoogle = { textToTranslate: selectedNow.length > 0 ? selectedNow : savedSelectedText };
  // console.log("USER for google translate:", userInfo);
  if (userInfo.langToLearn == 'portuguese') { //asuming en-pt pair
    if (languageOfTheSelection == 'portuguese') {
      langForGoogle.from = 'pt';
      langForGoogle.to = 'en';
    } else if (languageOfTheSelection == 'english') {
      langForGoogle.from = 'en';
      langForGoogle.to = 'pt';
    }
  } else { //assuming en-cz pair
    if (languageOfTheSelection == 'czech') {
      langForGoogle.from = 'cs';
      langForGoogle.to = 'en';
    } else if (languageOfTheSelection == 'english') {
      langForGoogle.from = 'en';
      langForGoogle.to = 'cs';
    }
  }


  console.log("langForGoogle: ",langForGoogle);
  let translation = await translateOnline(langForGoogle.from, langForGoogle.to, langForGoogle.textToTranslate);
  // console.log(translation);
  // showSelectionForSec();

  alertUserForSec(translation, 1.5);

}


let showTranslateButtonAndUpdateSavedSelectedText = (buttonID, languageOfTheSelection, langG) => {
  console.log("touch detected - text will be updated");
  console.log("sel length: ", getSelectionText().length);
  // alertUserForSec("some touch detected", 0.5);
  // console.log("DDDDDDDDDDDDDDDDDD p2 active:", page2ActiveNow);
  if (getSelectionText().length > 0) savedSelectedText = getSelectionText();
  if (page2ActiveNow && savedSelectedText.length > 0) {
    document.querySelector(buttonID).style.display = 'inline-block';
    document.querySelector(`${buttonID}Google`).style.display = 'inline-block';
    textAndLangForTranslation = { text: savedSelectedText, lang: languageOfTheSelection, langG };
    // console.log("XXX freshly selected: ", textAndLangForTranslation);
    // document.querySelector('#addVocabulary .visibleIcon')
    if (getSelectionText().length) {
      document.querySelector('#addVocabulary .visibleIcon').classList.remove('animateBorder');
      new Promise(resolve => setTimeout(resolve, 300)).then(() => {
        document.querySelector('#addVocabulary .visibleIcon').classList.add('animateBorder');
      })
    }




    // translateAndShowSelectedText(languageOfTheSelection);
  }
}

export const enableTranslateOnSelect = async () => {

  //show translate button
  document.querySelector('#wordOne').addEventListener('touchend', () => showTranslateButtonAndUpdateSavedSelectedText('#wordOneTranslate', langInWord1, langInWord1G));
  document.querySelector('#wordOne').addEventListener('touchcancel', () => showTranslateButtonAndUpdateSavedSelectedText('#wordOneTranslate', langInWord1, langInWord1G));
  document.querySelector('#wordOne').addEventListener('mouseup', () => showTranslateButtonAndUpdateSavedSelectedText('#wordOneTranslate', langInWord1, langInWord1G));

  document.querySelector('#wordTwo').addEventListener('touchend', () => showTranslateButtonAndUpdateSavedSelectedText('#wordTwoTranslate', langInWord2, langInWord2G));
  document.querySelector('#wordTwo').addEventListener('touchcancel', () => showTranslateButtonAndUpdateSavedSelectedText('#wordTwoTranslate', langInWord2, langInWord2G));
  document.querySelector('#wordTwo').addEventListener('mouseup', () => showTranslateButtonAndUpdateSavedSelectedText('#wordTwoTranslate', langInWord2, langInWord2G));
  document.addEventListener('selectionchange', () => {
    console.log("doc.onselectionchange fired - text will be updated");
    if (getSelectionText().length > 0) {
      savedSelectedText = getSelectionText();
      //update text for translation (not the language) if it is not an empty string
      if (textAndLangForTranslation) {
        textAndLangForTranslation.text = savedSelectedText;
        console.log("SSSSSSSSSS saved text for translation:", textAndLangForTranslation);
      }
    }
  });

  //update highlightedText variable upon change in selection
  // document.querySelector('#wordOne').addEventListener('select', () => {
  //   console.log("MMMMMMMMMMMMM", getSelectionText());
  //   if (getSelectionText().length > 0) savedSelectedText = getSelectionText()
  // });
  // document.querySelector('#wordOne').addEventListener('select', () => { if (getSelectionText().length > 0) savedSelectedText = getSelectionText() });

  //main
  // console.log("langInWord1: ", langInWord1);
  // console.log("langInWord1G: ", langInWord1G);
  document.querySelector('#wordOneTranslate').addEventListener('click', () => translateAndShowSelectedText(langInWord1));
  document.querySelector('#wordTwoTranslate').addEventListener('click', () => translateAndShowSelectedText(langInWord2));
  // document.querySelector('#wordTwoTranslate').innerHTML = await translateOnline('cs', 'en', 'kdo to je?');

};

export { textAndLangForTranslation };