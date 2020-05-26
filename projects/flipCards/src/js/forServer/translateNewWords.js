import { cards } from '../bundle'
import translateOnline from './translate'

//////translate new words -- assumin user's native language is English and language to learn is Czech!!!
let returnUserInfo = async (cards) => {
  let userInfo = null;
  return await cards.collection("about").doc("info").get().then(async (userDoc) => {
    userInfo = await userDoc.data();
    // console.log("USER MMMMAIN BEFORE:", userInfo);
    return userInfo;
  });
}

let sortUserLanguagesForGoogleTranslateIfNeeded = async (cards, userInfo) => {
  console.log("USER BEFORE:", userInfo.langNative);
  if (userInfo.langNativeforGoogle) return;

  switch (userInfo.langNative) {
    case 'czech': userInfo.langNativeforGoogle = 'cs'; break;
    case 'english': userInfo.langNativeforGoogle = 'en'; break;
    case 'french': userInfo.langNativeforGoogle = 'fr'; break;
    case 'german': userInfo.langNativeforGoogle = 'de';
  }
  switch (userInfo.langToLearn) {
    case 'czech': userInfo.langToLearnforGoogle = 'cs'; break;
    case 'english': userInfo.langToLearnforGoogle = 'en'; break;
    case 'french': userInfo.langToLearnforGoogle = 'fr'; break;
    case 'portuguese': userInfo.langToLearnforGoogle = 'pt'; break;
    case 'german': userInfo.langToLearnforGoogle = 'de';
  }
  // let dd =
  return await cards.collection("about").doc("info").update(userInfo);
  // await cc; await dd;
  // console.log("USER AFTER:", userInfo);
}






let allIn = async () => {
  let userInfo = await returnUserInfo(cards);
  await sortUserLanguagesForGoogleTranslateIfNeeded(cards, userInfo);
  // let updatedUserInfo = await returnUserInfo(cards);
  // console.log("UUUUUUUUUUUUUUU",updatedUserInfo);


  let trbtn1 = document.querySelector('#button_formNewWord_NativeInput');
  let trbtn2 = document.querySelector('#button_formNewWord_toLearnInput');
  let textTotranslate = '';

  trbtn1.addEventListener('click', async () => {
    textTotranslate = document.querySelector('#formNewWord_NativeInput').value;
    // console.log(textTotranslate);
    let translation = await translateOnline(userInfo.langNativeforGoogle, userInfo.langToLearnforGoogle, textTotranslate);
    // console.log("TTTTTTT", translation);
    document.querySelector('#formNewWord_toLearnInput').value = translation;
    // document.querySelector('#formNewWord_toLearnInput').innerHTML = translation;
  })

  trbtn2.addEventListener('click', async () => {
    textTotranslate = document.querySelector('#formNewWord_toLearnInput').value;
    let translation = await translateOnline(userInfo.langToLearnforGoogle,userInfo.langNativeforGoogle,  textTotranslate);
    // console.log("TTTTTTT", translation);
    document.querySelector('#formNewWord_NativeInput').value = translation;
    // document.querySelector('#formNewWord_toLearnInput').innerHTML = translation;
  })

}

export default allIn;