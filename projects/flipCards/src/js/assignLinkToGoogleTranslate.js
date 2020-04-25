import { textAndLangForTranslation } from './forServer/translate';


const assignLinkToGoogleTranslateWebsite = (text, googleContextLang, fromLang, toLang) => {
  return `https://translate.google.co.uk/?hl=${googleContextLang}#view=home&op=translate&sl=${fromLang}&tl=${toLang}&text=${encodeURI(text)}`;
  // defGoogleHTMLi.setAttribute('href', readyLink);
}

const showHideTranslateButtonsBasedOnTypingInput = () => {
  document.querySelector('#formNewWord_NativeInput').addEventListener('input', () => {
    // console.log(`native input is: *${document.querySelector('#formNewWord_NativeInput').value}*`);
    if (document.querySelector('#formNewWord_NativeInput').value) {
      document.querySelector('#button_formNewWord_NativeInput').style.display = 'inline-block';
      document.querySelector('#button_formNewWord_NativeInputGoogle').style.display = 'inline-block';
    }
    else {
      document.querySelector('#button_formNewWord_NativeInput').style.display = 'none';
      document.querySelector('#button_formNewWord_NativeInputGoogle').style.display = 'none';
    }
  })
  document.querySelector('#formNewWord_toLearnInput').addEventListener('input', () => {
    if (document.querySelector('#formNewWord_toLearnInput').value) {
      document.querySelector('#button_formNewWord_toLearnInput').style.display = 'inline-block';
      document.querySelector('#button_formNewWord_toLearnInputGoogle').style.display = 'inline-block';
    }
    else {
      document.querySelector('#button_formNewWord_toLearnInput').style.display = 'none';
      document.querySelector('#button_formNewWord_toLearnInputGoogle').style.display = 'none';
    }
  })

}

const listenToGoogleTranslateButtonsInNewWords = () => {
  document.querySelector('#button_formNewWord_NativeInputGoogle').addEventListener('click', async () => {
    let text = document.querySelector('#formNewWord_NativeInput').value;
    console.log("TEXT to SEND:", text);
    let { userInfo } = await import('./bundle');
    console.log("TEXT to SEND:", userInfo);
    //change lang names to 2 letters!!!
    let url = assignLinkToGoogleTranslateWebsite(text, userInfo.langNativeforGoogle, userInfo.langNativeforGoogle, userInfo.langToLearnforGoogle);
    console.log(url);
    window.open(url, '_blank');
    window.focus();

  });
  document.querySelector('#button_formNewWord_toLearnInputGoogle').addEventListener('click', async () => {
    let text = document.querySelector('#formNewWord_toLearnInput').value;
    let { userInfo } = await import('./bundle');
    let url = assignLinkToGoogleTranslateWebsite(text, userInfo.langNativeforGoogle, userInfo.langToLearnforGoogle, userInfo.langNativeforGoogle);
    window.open(url, '_blank');
    window.focus();
  });
}

const listenToGoogleTranslateButtonsInMain = () => {
  let openTranslateInNewTab = async () => {
    let { userInfo } = await import('./bundle');
    let url;
    // if ()
    if (textAndLangForTranslation.langG == userInfo.langNativeforGoogle) { url = assignLinkToGoogleTranslateWebsite(textAndLangForTranslation.text, userInfo.langNativeforGoogle, userInfo.langNativeforGoogle, userInfo.langToLearnforGoogle); }
    else { url = assignLinkToGoogleTranslateWebsite(textAndLangForTranslation.text, userInfo.langNativeforGoogle, userInfo.langToLearnforGoogle, userInfo.langNativeforGoogle); }
    window.open(url, '_blank');
    window.focus();
  }

  // document.querySelector('#wordOneTranslateGoogle').addEventListener('click', async () => {
  //   //get the text
  //   // let text = savedSelectedText;
  //   // console.log("IIIIIIIImported selected text:", textAndLangForTranslation);
  //   let text = textAndLangForTranslation.text;

  //   // let text = document.querySelector('#formNewWord_NativeInput').value;
  //   let { userInfo } = await import('./bundle');
  //   console.log(userInfo);
  //   let url;
  //   if (textAndLangForTranslation.langG == userInfo.langNativeforGoogle) {
  //     url = assignLinkToGoogleTranslateWebsite(text, userInfo.langNativeforGoogle, userInfo.langNativeforGoogle, userInfo.langToLearnforGoogle);
  //    }
  //   else {
  //     url = assignLinkToGoogleTranslateWebsite(text, userInfo.langNativeforGoogle, userInfo.langToLearnforGoogle, userInfo.langNativeforGoogle);
  //   }
  //   window.open(url, '_blank');
  //   window.focus();

  // });


  document.querySelectorAll('#wordTwoTranslateGoogle, #wordOneTranslateGoogle').forEach(button => {
    button.addEventListener('click', () => {
      console.log("MMMMMMMMMMMMMMMM: ", textAndLangForTranslation);
      openTranslateInNewTab();

    });
  });
}

const main = () => {
  // console.log("HHHHHHHHHHHi from main2")

  //buttons
  // in adding new word... 
  // display buttons only if there is any text inside - event listener?
  // display by listening to typing, and by listening to clicking on + button (as js input change is not registerd)
  showHideTranslateButtonsBasedOnTypingInput();

  //listen to google buttons in New word
  listenToGoogleTranslateButtonsInNewWords();
  listenToGoogleTranslateButtonsInMain();


  //use link dynamically in js based on what is the content of the form

  //in main p2 when button is clicked, get the text, user data and request url.
}

export { assignLinkToGoogleTranslateWebsite, main };




// let readyLink = '';
//   // in these translations I am assuming that one of the languagess is allways czech!!
//   if (userInOp.langToLearn == 'english') { readyLink = 'https://translate.google.co.uk/?hl=cs#view=home&op=translate&sl=en&tl=cs&text=' + encodeURI(currentCard.languageToLearn) }
//   else if (userInOp.langToLearn == 'czech') { readyLink = 'https://translate.google.co.uk/?hl=en#view=home&op=translate&sl=cs&tl=en&text=' + encodeURI(currentCard.languageToLearn) }
//   else if (userInOp.langToLearn == 'german') { readyLink = 'https://translate.google.co.uk/?hl=cs#view=home&op=translate&sl=de&tl=cs&text=' + encodeURI(currentCard.languageToLearn) }
//   else if (userInOp.langToLearn == 'french') { readyLink = 'https://translate.google.co.uk/?hl=cs#view=home&op=translate&sl=fr&tl=cs&text=' + encodeURI(currentCard.languageToLearn) }
//   else { readyLink = 'https://www.google.com/search?q=' + encodeURI(currentCard.languageToLearn) }
//   defGoogleHTMLi.setAttribute('href', readyLink);

{/* <button id="wordOneTranslateGoogle"  */ }
{/* <button id="wordTwoTranslateGoogle" href="" */ }

{/* <a class="button serverState" id="button_formNewWord_NativeInputGoogle" href="">Other Translations</a> */ }
{/* <a class="button serverState" id="button_formNewWord_toLearnInputGoogle" href="">Other Translations</a> */ }