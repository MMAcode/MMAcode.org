import { alertUserForSec } from "./bundle";

let optionsHTML = document.querySelector('#options');

// GOOGLE DEF.
let defGoogleHTML = document.querySelector('#definitionGoogle');
let defGoogleHTMLi = document.querySelectorAll('#definitionGoogle .optionsIcon')[0];
let defGoogleHTMLf = defGoogleHTML.querySelector('.optionsWindow');
let closeGoogleF = document.querySelectorAll('#definitionGoogle .closeButton')[0];
// console.log('QUERY SELECTOR ALL:');
// console.log(closeGoogleF);

let sentenceExamplesHTML = document.querySelector('#sentenceExamples');
// let sentenceExamplesHTMLb = sentenceExamplesHTML.querySelector('.optionsIcon');
let alternativeTranslationsHTML = document.querySelector('#alternativeTranslations');
// let alternativeTranslationsHTMLb = alternativeTranslationsHTML.querySelector('.optionsIcon');
let changeWordsHTML = document.querySelector('#changeWords');
let changeWordsHTMLf = changeWordsHTML.querySelector('.optionsWindow');
let currentCardInOp = null;
let currentCardInOpID = null;
let userInOp = null;
let cardsIoOp = null;

let speakWordHTML = document.querySelector('#speakWord');
// let speakWordHTMLb = speakWordHTML.querySelector('.optionsIcon');
// optionsHTML.innerHTML = 'changed';




let activateWordsOptions = () => {

  let optionsActions = e => {
    // console.log(e.target.parentElement.id);
    // let buttonID = e.target.parentElement.id;
    let buttonParent = e.target.parentElement;
    // console.log(buttonID);
    // console.log(buttonParent);
    // console.log(defGoogleHTML);
    // console.log(e.target.className);

    if (buttonParent == defGoogleHTML && e.target.className === 'optionsIcon') {
      console.log('google def action');
      // defGoogleHTMLf.style.display = 'block';
      // defGoogleHTMLf.style.display = 'none';
      // closeGoogleF.onclick = () => {
      //   console.log('you clicked CLOSE button');
      //   defGoogleHTMLf.style.display = 'none';
      // }
    }

    //changing the word/phrase
    if (buttonParent == changeWordsHTML && e.target.className === 'optionsIcon') {
      console.log('change word action fired');
      // adjustCurrentWord();
      // console.log(currentCardInOp, currentCardInOpID);
      console.log(changeWordsHTMLf);
      let nativeWord = document.querySelector('#nativeWToAdjust')
      let toLearnWord = document.querySelector('#wToLearnAdjust')

      nativeWord.setAttribute('value', currentCardInOp.languageNative);
      toLearnWord.setAttribute('value', currentCardInOp.languageToLearn);
      // console.log(nativeWord, toLearnWord);
      changeWordsHTMLf.style.display = 'block';



      let formToAdjust = document.querySelector('#formAdjustWord');
      formToAdjust.addEventListener('submit', e => {
        e.preventDefault();
        let nativeIn = formToAdjust.nativeInput.value;
        let toLearnIn = formToAdjust.toLearnInput.value;
        // currentCardInOp.languageNative = nativeInput;
        // currentCardInOp.languageToLearn = toLearnInput;
        // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        // console.log('ADJUSTED CARD:');
        // console.log(currentCardInOp);
        // console.log(currentCardInOpID);

        db.collection("users").doc(userInOp.userEmail).collection("cardsLearningDue").doc(currentCardInOpID).update({
          languageNative: nativeIn,
          languageToLearn: toLearnIn
        }).then(async () => {
          console.log('Flip-card adjusted');
          alertUserForSec("Flip-card adjusted", 0.8);
          await new Promise(resolve => setTimeout(resolve, 800));

          // reset form  -  HAS TO BE HERE or
          formToAdjust.reset();
          window.location.reload();
        }).catch(err => {
          console.log(err);
          console.log('I could NOT adjust the card.');
          // reset form
          formToAdjust.reset();
          window.location.reload();
        });

      })
    }


    if (buttonParent == speakWordHTML && e.target.className === 'optionsIcon') {
      let responsiveVoiceLanguage = '';
      console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
      console.log(userInOp.langToLearn);
      if (userInOp.langToLearn === 'czech') { responsiveVoiceLanguage = 'Czech Female'; }
      else if (userInOp.langToLearn === 'english') { responsiveVoiceLanguage = 'UK English Female'; }
      else if (userInOp.langToLearn === 'french') { responsiveVoiceLanguage = 'French Female'; }

      let speak = async () => {
        await responsiveVoice.speak(currentCardInOp.languageToLearn, responsiveVoiceLanguage);
      }

      speak();


    }


  }

  optionsHTML.addEventListener('click', optionsActions);
}




let activateUserInOptions = (userDoc, cards) => {
  userInOp = userDoc;
  cardsIoOp = cards;
}

let refreshOptions = (currentCard, currentCardID) => {
  currentCardInOp = currentCard;
  currentCardInOpID = currentCardID;

  // google definition
  let readyLink = '';
  if (userInOp.langToLearn == 'english') { readyLink = 'https://www.google.com/search?q=' + encodeURI('definition of ') + encodeURI(currentCard.languageToLearn) }
  else if (userInOp.langToLearn == 'czech') { readyLink = 'https://www.google.com/search?q=' + encodeURI('definuj ') + encodeURI(currentCard.languageToLearn) }
  else { readyLink = 'https://www.google.com/search?q=' + encodeURI(currentCard.languageToLearn) }
  defGoogleHTMLi.setAttribute('href', readyLink);
  // console.log(defGoogleHTMLi);
  // console.log(userInfo);
}


let showOptions = () => {
  optionsHTML.style.display = 'flex';
}

let hideOptions = () => {
  optionsHTML.style.display = 'none';
}

export { activateWordsOptions, showOptions, hideOptions, refreshOptions, activateUserInOptions };