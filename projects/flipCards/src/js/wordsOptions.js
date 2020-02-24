import { alertUserForSec, scrollAmount, wordOne } from "./bundle";

// alertUserForSec('ahoj', 2);
let optionsHTML = document.querySelector('#options');
let adjustedCardToReturn = undefined;

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

let posponeAdjusted = 0;

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
    if ((buttonParent == changeWordsHTML && e.target.className === 'optionsIcon') || (e.target.id == 'adjustOption')) {
      console.log('change word action fired');
      scroll(0, 0);
      // adjustCurrentWord();
      // console.log(currentCardInOp, currentCardInOpID);
      console.log(changeWordsHTMLf);
      let nativeWord = document.querySelector('#nativeWToAdjust');
      let toLearnWord = document.querySelector('#wToLearnAdjust');
      let connectionHTML = document.querySelector('#connectionInput');
      let cReminderAHTML = document.querySelector('#remindConnectionA');
      let cReminderBHTML = document.querySelector('#remindConnectionB');

      // show current values of the card:
      nativeWord.setAttribute('value', currentCardInOp.languageNative);
      toLearnWord.setAttribute('value', currentCardInOp.languageToLearn);
      if (currentCardInOp.connection != undefined) {
        connectionHTML.setAttribute('value', currentCardInOp.connection);
      } else { connectionHTML.setAttribute('value', ''); }
      if (currentCardInOp.cReminderNativeShown != undefined) {
        cReminderAHTML.setAttribute('value', currentCardInOp.cReminderNativeShown);
      } else { cReminderAHTML.setAttribute('value', ''); }
      if (currentCardInOp.cReminderToLearnShown != undefined) {
        cReminderBHTML.setAttribute('value', currentCardInOp.cReminderToLearnShown);
      } else { cReminderBHTML.setAttribute('value', ''); }

      // console.log(nativeWord, toLearnWord);
      changeWordsHTMLf.style.display = 'block';



    }


    if (buttonParent == speakWordHTML && e.target.className === 'optionsIcon') {
      let responsiveVoiceLanguage = '';
      console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
      console.log(userInOp.langToLearn);
      if (userInOp.langToLearn === 'czech') { responsiveVoiceLanguage = 'Czech Female'; }
      else if (userInOp.langToLearn === 'english') { responsiveVoiceLanguage = 'UK English Female'; }
      else if (userInOp.langToLearn === 'french') { responsiveVoiceLanguage = 'French Female'; }
      else if (userInOp.langToLearn === 'german') { responsiveVoiceLanguage = 'Deutsch Female'; }

      let speak = async () => {
        await responsiveVoice.speak(currentCardInOp.languageToLearn, responsiveVoiceLanguage);
      }

      speak();


    }


  }

  optionsHTML.addEventListener('click', optionsActions);

  //adjust option button after 4 evaluating buttons
  document.querySelector('#adjustOption').addEventListener('click', e => {
    optionsActions(e);

    document.querySelector('#changeWords .optionsWindow').style.display = 'block';
    scroll(0, 0);
    document.querySelector('#improveChallengeButtons').style.display = "none";
  });
}




let activateUserInOptions = (userDoc, cards) => {
  userInOp = userDoc;
  cardsIoOp = cards;
}

let refreshOptions = (currentCard, currentCardID) => {
  currentCardInOp = currentCard;
  currentCardInOpID = currentCardID;

  // google definition

  // let readyLink = '';
  // if (userInOp.langToLearn == 'english') { readyLink = 'https://www.google.com/search?q=' + encodeURI('definition of ') + encodeURI(currentCard.languageToLearn) }
  // else if (userInOp.langToLearn == 'czech') { readyLink = 'https://www.google.com/search?q=' + encodeURI('definuj ') + encodeURI(currentCard.languageToLearn) }
  // else { readyLink = 'https://www.google.com/search?q=' + encodeURI(currentCard.languageToLearn) }
  // defGoogleHTMLi.setAttribute('href', readyLink);

  let readyLink = '';

  // in these translations I am assuming that one of the languagess is allways czech!!
  if (userInOp.langToLearn == 'english') { readyLink = 'https://translate.google.co.uk/?hl=cs#view=home&op=translate&sl=en&tl=cs&text=' + encodeURI(currentCard.languageToLearn) }
  else if (userInOp.langToLearn == 'czech') { readyLink = 'https://translate.google.co.uk/?hl=en#view=home&op=translate&sl=cs&tl=en&text=' + encodeURI(currentCard.languageToLearn) }
  else if (userInOp.langToLearn == 'german') { readyLink = 'https://translate.google.co.uk/?hl=cs#view=home&op=translate&sl=de&tl=cs&text=' + encodeURI(currentCard.languageToLearn) }
  else if (userInOp.langToLearn == 'french') { readyLink = 'https://translate.google.co.uk/?hl=cs#view=home&op=translate&sl=fr&tl=cs&text=' + encodeURI(currentCard.languageToLearn) }
  else { readyLink = 'https://www.google.com/search?q=' + encodeURI(currentCard.languageToLearn) }
  defGoogleHTMLi.setAttribute('href', readyLink);


  // console.log(defGoogleHTMLi);
  // console.log(userInfo);
}


let showOptions = () => {
  optionsHTML.style.display = 'flex';
  // document.querySelector('#connection').style.display = 'block';

  // connection:
  // if (currentCardInOp.connection == undefined) {
  //   document.querySelector('#connection').style.display = 'none';
  // } else {
  //   document.querySelector('#connectionP').innerHTML = `<p>${currentCardInOp.connection}</p>`;
  // }

}

let hideOptions = () => {
  optionsHTML.style.display = 'none';
  // document.querySelector('#connection').style.display = 'none';
}





////////////adjusting form function and submit listener
let adjustForm = e => {
  e.preventDefault();
  let nativeIn = formToAdjust.nativeInput.value;
  let toLearnIn = formToAdjust.toLearnInput.value;
  let connect = formToAdjust.connectionInput.value;
  let cRemindA = formToAdjust.remindConnectionA.value;
  let cRemindB = formToAdjust.remindConnectionB.value;

  let posponeCard = formToAdjust.pospone.value;
  // alertUserForSec(posponeCard, 1);
  // console.log('X', posponeCard, 'X');


  // currentCardInOp.languageNative = nativeInput;
  // currentCardInOp.languageToLearn = toLearnInput;
  // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  // console.log('ADJUSTED CARD:');
  // console.log(currentCardInOp);
  // console.log(currentCardInOpID);




  let nowAdjust = new Date().getTime();
  // currentCardInOp.dueTime = nowAdjust + 1000 * 60 * 1 //show in 1 min
  // if pospone set...
  posponeAdjusted = 0;
  if (posponeCard === 'm') {
    // currentCardInOp.dueTime += 1000 * 60 * 5;
    posponeAdjusted = 1000 * 60 * 5;

  } else if (posponeCard === 'h') {
    // currentCardInOp.dueTime += 1000 * 60 * 60 * 5;
    posponeAdjusted = 1000 * 60 * 60 * 5;

  } else if (posponeCard === 'd') {
    // currentCardInOp.dueTime += 1000 * 60 * 60 * 24 * 5;
    posponeAdjusted = 1000 * 60 * 60 * 24 * 5;

  } else { posponeAdjusted = 0; }

  currentCardInOp.lastSeen = nowAdjust;

  currentCardInOp.languageNative = nativeIn;
  currentCardInOp.languageToLearn = toLearnIn;
  currentCardInOp.connection = connect;
  currentCardInOp.cReminderNativeShown = cRemindA;
  currentCardInOp.cReminderToLearnShown = cRemindB;
  currentCardInOp.translationChecked = true;

  adjustedCardToReturn = currentCardInOp;
  console.log('adjusted card in OPTIONS CCCCCCCCCCCCCCC', currentCardInOp);
  console.log('Flip-card adjusted');
  alertUserForSec("<p>Evaluate card <br> to SAVE changes</p>", 1.5);
  // reset form - HAS TO BE HERE or





  console.log('P1 should RRRRRRRRRRRRRefresh');
  document.querySelector('#wordOne').textContent = currentCardInOp.languageNative;
  document.querySelector('#wordTwo').textContent = currentCardInOp.languageToLearn;
  //show connection text if exists
  if (currentCardInOp.connection != undefined && currentCardInOp.connection != '') {
    document.querySelector('#hintConnection').classList.remove('hide');
    document.querySelector('#hintConnectionText').innerHTML = currentCardInOp.connection;
    document.querySelector('#hintConnectionText').classList.remove('hide');

  };

  // // hide connection reminder
  document.querySelector('#hintConnectionReminder').classList.add('hide');
  document.querySelector('#hintConnectionReminder + *').classList.add('hide');

  // hide adjust window
  document.querySelector('#changeWords .optionsWindow').style.display = 'none';
  scroll(0, scrollAmount);  // to hide ALL scores
  formToAdjust.reset();

  document.querySelector('#threeButtons').style.backgroundColor = 'rgba(0, 0, 0, 1)';
  document.querySelector('#saveChangesAlert').style.display = 'block';
}

let getPosponeTime = () => {
  let sendTime = posponeAdjusted;
  posponeAdjusted = 0;
  console.log('PPPPPPPPPPPPPPPPPPPPPP', sendTime);
  return sendTime;
}

let formToAdjust = document.querySelector('#formAdjustWord');
formToAdjust.addEventListener('submit', adjustForm);

export { activateWordsOptions, showOptions, hideOptions, refreshOptions, activateUserInOptions, getPosponeTime };