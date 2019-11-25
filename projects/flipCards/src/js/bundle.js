// import { importPozdrav } from './test';
import { stopwatchPointsInit, updatePoints, stopWatchInit, resetIdleTime, resetAppIfReturnedAfterXseconds, countCards, daysSince1970Floored } from './stopwatchPoints';

import './wordsOptions';
import { activateWordsOptions, showOptions, hideOptions, refreshOptions, activateUserInOptions } from './wordsOptions';


let dueCount = 0;
let toLearnCount = 0;
// const cards = db.collection('FlipCards');
let cards = db.collection('FlipCards');
let userID = 0;
let userInfo = null;

const currentCardS = null;
let currentCard = {};
let currentCardID = null;
let wordOne = '';
let wordTwo = '';
const refresh = document.querySelector('#test');
const nextBt = document.querySelector('#b_next');
const threeBt = document.querySelector('#threeButtons');
let firstWordHTML = document.querySelector('#wordOne');
let secondWordHTML = document.querySelector('#wordTwo');
let levelIndicator = document.querySelector('#levelIndicator');
// let showAllCardsHTML = document.querySelector('#showAllCards');
let deleteCardHTML = document.querySelector('#deleteCard');
let loggedStatus = document.querySelector('#loggedInStatus');
let scoreHTML = document.querySelector('#scoreCounter');
let mainTitleHTML = document.querySelector('#mainTitle');
let closeWindowS = document.querySelectorAll('.closeButton');
let showWindowS = document.querySelectorAll('.visibleIcon');

let score = 0;
let points = {
  session: 0,
  today: 0
}; //hl. from other file 

// console.log(points);

let clickHintCounter = 0;
let hintLettersToShow = '';

let languageToSpeak = '';
let responsiveVoiceLanguage = '';
let showNativeWordFirst = true;
// let languageSwap = true;  //users who have native language czech
let languageSwap = false;  //users who have native language czech



/////////// F LEVELS - TIMES
// to bigger time units  -return array
let now = new Date().getTime();
// console.log('current time: ', now);

let toBiggerUnits = (unitsBefore, chunks) => {
  let biggerUnits = Math.floor(unitsBefore / chunks);
  let unitsAfter = unitsBefore % chunks;
  let array = [biggerUnits, unitsAfter];
  return array;
}
// convert timeStamp to message
let timeStampToMessage = (timeStamp) => {
  // let stringTemplate = ' Due again in ';
  let string = '';
  let sec = Math.round(timeStamp / 1000);
  let minBefore = Math.floor(sec / 60);
  sec = sec % 60;
  let min = toBiggerUnits(minBefore, 60)[1];
  let hoursBefore = toBiggerUnits(minBefore, 60)[0];

  let hours = toBiggerUnits(hoursBefore, 24)[1];
  let daysBefore = toBiggerUnits(hoursBefore, 24)[0];

  let days = toBiggerUnits(daysBefore, 365)[1];
  let yearsBefore = toBiggerUnits(daysBefore, 24)[0];
  if (days > 0) { string += `${days} day`; if (days > 1) { string += 's' }; }
  else if (hours > 0) { string += `${hours} hour`; if (hours > 1) { string += 's' }; }
  else if (min > 0) { string += `${min} minute`; if (min > 1) { string += 's' }; }
  else if (sec > 0) { string += `${sec} second`; if (sec > 1) { string += 's' }; }
  // string = stringTemplate + string;
  return string;
}



//////// levels - times - MAIN
let arrayTimes = [];
let timeCounter = 1000;
// let timeCounter = 10000;
let oneArray = [];
let levelLearned = 10; //if level 10 --> label as learned

// for (let i = 1; i < levelLearned; i++) {
//   arrayTimes.push(timeCounter);
//   timeCounter = timeCounter * 5;
// }

// for (let i = 1; i < levelLearned; i++) {
//   arrayTimes.push(timeCounter);
// }


arrayTimes = [
  1000 * 10,  //sec     L0
  1000 * 50,
  60000 * 5, //min
  3600000 * 1, //hours
  3600000 * 6,
  3600000 * 22,
  3600000 * 22,
  86400000 * 2, //days
  86400000 * 5,
  86400000 * 15  //    L9 adds this much time (first level is updated, then this time is added based on current level)
]
// console.log('level 9  adds ', arrayTimes[9], " ms to now time");

// arrayTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// console.log('array of times for levels:');
// console.log(arrayTimes);
arrayTimes.forEach((time) => {
  // console.log(time);
  // timeStampToMessage(time);
  oneArray += [`${timeStampToMessage(time)}; `];
});
console.log(oneArray);



//////////////////////////////////EXTRA
// show all cards
// let showAllCards = async () => {
//   console.log('in show All cards F');
//   let dataAll = await cards.get();
//   let cardsInfo = dataOrdered.docs.forEach(doc => {
//     console.log(doc);
//   })
// }








////////////////////////////// F SET UP
// F delete card
let deleteCard = async () => {
  // console.log('ready to delete card');
  // console.log(currentCardID);
  cards.collection("cardsLearningDue").doc(currentCardID).delete().then(() => {
    // console.log('deleted');
    updateDatabaseTHEN_UI();
  });
}



// F-update and Count Due
let updateDue = async data => {
  let now = new Date().getTime();
  dueCount = 0;
  // console.log('L1-1-1: starting "updateDue" in MAIN-ASYNC');
  // let dueToUpdate = await cards.where('mainStage', '==', 'learning').where('due', '==', false).where('dueTime', '<', now);
  let dueToUpdate = await cards.collection("cardsLearningNotDue").where('dueTime', '<', now);
  let ddData = await dueToUpdate.get();
  // console.log('cards which are going to have DUE changed to TRUE:');

  // this promise is not usefull, it doesn't wait for the updated cards anyway
  // return new Promise((resolve, reject) => {
  ddData.docs.forEach((docC) => {
    // console.log(doc.data());
    let cardToMove = docC.data();
    // console.log(cardToMove);
    // console.log(docC.id);
    cards.collection("cardsLearningDue").doc(docC.id).set(cardToMove).then(() => {
      cards.collection("cardsLearningNotDue").doc(docC.id).delete();
      // console.log('------- CARD MOVED TO DUE GROUP qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

    });
  });
  // cards.collection("cardsLearningNotDue").doc(doc.id).update({ due: true }).then(function () { console.log('XXXXXXXXupdating "due status" finishedXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); });
  // cards.collection("cardsLearningDue").add()

  // resolve('due statuses hopefully updated!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  // });


  // wait 200ms after updating due times so that due card can be loaded 
  if (ddData.docs.length > 0) {
    await new Promise(resolve => {
      setTimeout(resolve, 200);
    });
  }

};


// get current card from DUE
let getCardFromDue = async () => {
  // console.log('starting get card from Due');
  // console.log('------- STARTING TO GET CARD FROM DUE GROUP qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

  // let dataOrdered = await cards.where('mainStage', '==', 'learning').where('due', '==', true).orderBy('lastSeen', "desc").limit(1).get();
  let dataOrdered = await cards.collection("cardsLearningDue").orderBy('lastSeen', "desc").limit(1).get();
  // console.log('dataOrdered:', dataOrdered.docs.length);
  if (dataOrdered.docs.length == 0) { console.log('no DUE card right NOW.'); dueCount = 0; }
  else {
    currentCard = dataOrdered.docs[0].data();
    currentCardID = dataOrdered.docs[0].id;
    // let cardMoveHere = await cards.collection("cardsLearningNotDue").doc(currentCardID).set(currentCard).then(() => {
    //   cards.collection("cardsLearningDue").doc(currentCardID).delete();
    //   // console.log('------- CARD MOVED TO DUE GROUP qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    // });

    // let cardToMove = await cards.collection("cardsLearningDue").
    dueCount = 1;
    // console.log('because DUE card was found, "current card" was updated.', currentCard, "card's ID: ", currentCardID);
  }
  return currentCard;
}



// get "to learn" card
let getCardFromToLearn = async (cards) => {
  // console.log('L1-1-4 STARTING getting ToLEARN card.');
  // let checkIfACardFromToLearn = await cards.where('mainStage', '==', 'to learn').limit(1).get();
  let checkIfACardFromToLearn = await cards.collection("cardsToLearn").limit(1).get();
  if (checkIfACardFromToLearn.docs.length == 0) { console.log('no TO LEARN card right NOW.'); toLearnCount = 0; }
  else {
    let now = new Date().getTime();
    currentCard = checkIfACardFromToLearn.docs[0].data();
    currentCardID = checkIfACardFromToLearn.docs[0].id;
    currentCard.mainStage = 'learning';
    currentCard.lastSeen = now;
    currentCard.dueTime = now;
    // let cardMoveHere = await cards.collection("cardsLearningNotDue").doc(currentCardID).set(currentCard).then(() => {
    let cardMoveHere = await cards.collection("cardsLearningDue").doc(currentCardID).set(currentCard).then(() => {
      cards.collection("cardsToLearn").doc(currentCardID).delete();
      // console.log('------- CARD MOVED TO DUE GROUP qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    });
    toLearnCount = 1;
    console.log('because TO LEARN card was found, "current card" was updated.', currentCard, "card's ID: ", currentCardID);
  }
}

/////////////////////////////// F-Main async
let updateDataReturnCard = async () => {
  // console.log('STARTING GET CARD main f.a');
  let currentCardOrNull = await updateDue();
  // console.log(currentCardOrNull, 'xxxxxxxxxxxxxxxxxxxxx');
  let testIfACard = await getCardFromDue();
  // updateDue().then(getCardFromDue());

  // console.log('GetDueCard f. finished, current dueCount: ', dueCount, 'toLearnCount: ', toLearnCount);
  if (dueCount === 0) {
    // console.log('we will start GetToLEarnCard f. now...');
    let xXx = await getCardFromToLearn(cards);
    if (toLearnCount > 0) {
      return currentCard;
    } else { return 'no card to use.'; }
  }
  else { return currentCard; }
}




///////////////////////////// UI
let assignWordsAndColours = (currentCard) => {
  // console.log('1.2.1.1 assign words');
  // console.log(currentCard.enCheck);
  let en = currentCard.enCheck;
  refreshOptions(currentCard, currentCardID, userInfo);

  if (en) {
    // wordOne = currentCard.czWord;
    wordOne = currentCard.languageToLearn;
    // wordTwo = currentCard.enWord;
    wordTwo = currentCard.languageNative;

    firstWordHTML.style.color = 'blue';
    secondWordHTML.style.color = 'red';
    showNativeWordFirst = false;
  } else {
    // wordOne = currentCard.enWord;
    wordOne = currentCard.languageNative;
    // wordTwo = currentCard.czWord;
    wordTwo = currentCard.languageToLearn;
    // console.log(wordTwo, 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');

    firstWordHTML.style.color = 'red';
    secondWordHTML.style.color = 'blue';
    showNativeWordFirst = true;
  }
  // console.log('1.2.1.1 word 1 is:', wordOne);
  // console.log('1.2.1.1 word 2 is:', wordTwo);
}


let showThreeButtons = () => {
  nextBt.style.display = 'none';
  threeBt.style.display = 'flex';
}

let jumpLevels = (level) => {
  console.log('');
  console.log('starting F timeJump');
  console.log(`current card level: ${level}, enCheck: ${currentCard.enCheck}.`);
  let now = new Date().getTime();
  let timeJump = now - currentCard.lastSeen;
  console.log(`card last time seen ${timeStampToMessage(timeJump)}`);
  console.log('since last time seen: ', timeJump);
  console.log('next tie should be seen in:', arrayTimes[level]);

  while (timeJump > arrayTimes[level]) {
    level++;
    score++;
    if (level === levelLearned - 1) { break; }; //you can jump max to level Learned-1 (9)
  }
  console.log('Ending F timeJump');
  console.log(`current card level: ${level}, enCheck: ${currentCard.enCheck}.`);
  return level;
}


let hintNotUsed = () => {
  console.log('checking cheating (needs to be 1..499 for cheating to be true');
  console.log(clickHintCounter);
  if (clickHintCounter > 0 && clickHintCounter < 500) { return false }
  else { return true };
}

let updateCurrentCard = (e) => {
  console.log('updateCurrenCard F running', currentCard);
  let en = currentCard.enCheck;
  let lev = currentCard.level;
  // console.log('level before:', lev);
  if (e.target.id === 'BtnDown') {
    // if (lev > 1) { score = score - 2; };
    // if (lev === 1) {
    //   score = score - 1;
    // };
    // lev = lev > 2 ? lev - 2 : 0;
    score -= lev;
    // alert(`score lowered by ${lev}, lev going down to 0.`);
    lev = 0;
  }
  if (e.target.id === 'BtnStay') {
    // lev = lev > 1 ? lev - 1 : 0;
    if (lev > 2) {
      lev -= 2;
      score = score - 2;
    } else {  //lev 1 or 0...
      score -= lev - 1;
      lev -= lev - 1;  //L2-1 ->L1; L1-0 ->L1
    }
  }

  // correct Ans
  if (e.target.id === 'BtnUp') {
    if (hintNotUsed()) {
      // console.log('updating level on variable inside programme');
      // console.log('original level:', lev, 'original enCheck (on variable):', en, 'on current card(to double check):', currentCard.enCheck);


      if (en === true) {
        lev++;
        score++;
        // console.log('level en is originaly true - now=', lev);
        en = false;
      } else {
        // console.log('level if en is false - now=', lev);

        en = true;
      }

      if (lev < levelLearned - 1) lev = jumpLevels(lev); // level has to be 2+smaller(8 or smaller) to go into jump consideration

      // console.log('updated level(in variable):', lev, 'updated enCheck:', en);
    } else {
      // alert('STOP CHEATING, I know you used a hint!;-)');
      alertUserForSec('CHEATING! You used a hint!', 1.5);
    }
  }

  currentCard.enCheck = en;
  currentCard.level = lev;
  // console.log('level after:', lev);

  let now = new Date().getTime();
  currentCard.lastSeen = now;
  currentCard.due = false;

  if (lev < levelLearned) { currentCard.dueTime = now + arrayTimes[lev]; }
  else if (lev = levelLearned) {
    currentCard.level = 888;
    // currentCard.mainStage = 'learned';
    // console.log('card labeled learned');
    // console.log(currentCard);
    // alert('Congrats -this card was added to "learned" pile.');
    alertUserForSec('Congrats - this card was added to "learned" pile.', 2);
  }
}

let updateCardInFirebase = async () => {
  // console.log('card to be updated like this:');
  // console.log(currentCard);
  // await cards.doc(currentCardID).update({

  if (currentCard.level != 888) {
    // console.log('card shall be updated like this: UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
    // console.log(currentCard);
    await cards.collection("cardsLearningNotDue").doc(currentCardID).set(currentCard);
    await cards.collection("cardsLearningDue").doc(currentCardID).delete();
  };
  if (currentCard.level == 888) {
    await cards.collection("cardsLearned").doc(currentCardID).set(currentCard).then(() => {
      cards.collection("cardsLearningDue").doc(currentCardID).delete();
    });
  }

  // update({
  //     enCheck: currentCard.enCheck,
  //   level: currentCard.level,
  //   lastSeen: currentCard.lastSeen,
  //   due: currentCard.due,
  //   dueTime: currentCard.dueTime,
  //   mainStage: currentCard.mainStage
  // });
  // console.log(' card in FIREBASE updated');



  // console.log('points BEFORE upoading to DB and before adding gained score from last card: 1ppppppppppppppppppppppppppppppppppppppppppppppppp');
  // console.log(points);
  // console.log('adjust by score:', score);
  updatePoints(score, points, cards)
    .then(pointsReturned => {
      points = pointsReturned;
      score = 0;

      // console.log('points returned to MAIN after updated in DB: 2ppppppppppppppppppppppppppppppppppppppppppppppppp');
      // console.log(points);
    });
}


// update ALL from second page to new card
let updateALL = async (e) => {
  // console.log('this was clicked:');
  // console.log(e.target.parentNode.id);

  updateCurrentCard(e);
  await updateCardInFirebase();
  // console.log('GOING TO UPDATE DATABASE AGAIN...');
  updateDatabaseTHEN_UI();
}



// HINTS on p1:   show LETTER on click as 
let ShowLetterOnClick = () => {
  clickHintCounter++;
  // importPozdrav('Mirecek');
  // importPozdrav('Abi');
  console.log('click counter in function:', clickHintCounter);
  let hintWord = wordTwo;
  // console.log('you just clicked on hint');
  if (clickHintCounter < wordTwo.length) {
    hintLettersToShow += wordTwo[clickHintCounter - 1];
    secondWordHTML.textContent = hintLettersToShow + '...';
  }
  if (clickHintCounter === wordTwo.length) {
    secondWordHTML.textContent = wordTwo;
  }
  // console.log('hintLettersToShow:', hintLettersToShow);
}

let ResetLettersOnClick = () => {
  clickHintCounter = 0;
  hintLettersToShow = '';
}
let showLevel = () => {
  if (currentCard.enCheck === false) { levelIndicator.innerHTML = `level ${currentCard.level}-A` }
  else { levelIndicator.innerHTML = `level ${currentCard.level}-B` }
  // console.log(currentCard.enCheck);
}


// not activated




// PAGES
let showPageOne = async () => {
  // console.log('page one Activated');

  // speak the word if Language-to-learn displayed
  // responsiveVoice.speak("hello world");
  //   https://responsivevoice.org/api/

  assignWordsAndColours(currentCard);  // which word to speak first also decided here
  firstWordHTML.textContent = wordOne;
  secondWordHTML.textContent = '...';
  nextBt.style.display = 'block';
  threeBt.style.display = 'none';

  // **
  // SPEAKING
  if (!showNativeWordFirst && !languageSwap) {
    // console.log('LANGUAGE -not swapped- TO SPEAK now', responsiveVoiceLanguage);
    let cekej = await responsiveVoice.speak(wordOne, responsiveVoiceLanguage);
  }
  if (showNativeWordFirst && languageSwap) {
    // console.log('LANGUAGE -swapped- TO SPEAK now', responsiveVoiceLanguage);
    let cekejToo = await responsiveVoice.speak(wordOne, responsiveVoiceLanguage);
    // console.log(responsiveVoice.speak(wordOne, responsiveVoiceLanguage));
  }

  // activating letter hints
  clickHintCounter = 0;
  hintLettersToShow = '';
  // console.log('clickHintCounter: ', clickHintCounter);
  secondWordHTML.addEventListener('click', ShowLetterOnClick);
  showLevel();



  // **

}

let showPageTwo = () => {
  // console.log('Page two Activated.');
  // secondWordHTML.onclick = null;
  // secondWordHTML.removeEventListener();
  // secondWordHTML.removeEventListener('click', e => ResetLettersOnClick());
  // console.log('clickHint listener SHOUND be removed');
  // console.log('current clickhintCouner=', clickHintCounter);
  // clickHintCounter = 1000;
  // console.log(wordTwo, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  secondWordHTML.textContent = wordTwo;

  // SPEAKING
  // for english speaking  users (Abi)...
  if (showNativeWordFirst && !languageSwap) {
    // console.log('LANGUAGE -not swapped- TO SPEAK now', responsiveVoiceLanguage);
    responsiveVoice.speak(wordTwo, responsiveVoiceLanguage);
  }
  // for czech speaking  users (Me, Dana, Stana)...
  if (!showNativeWordFirst && languageSwap) {
    // console.log('LANGUAGE -swapped- TO SPEAK now', responsiveVoiceLanguage);
    responsiveVoice.speak(wordTwo, responsiveVoiceLanguage);
    // console.log(responsiveVoice.speak(wordOne, responsiveVoiceLanguage));
  }

  showThreeButtons();
  showOptions();
}

let updateScoreUI = () => {
  scoreHTML.innerHTML = `<p>Session score: ${score}</p>`;
}




let updateDatabaseTHEN_UI = () => {
  updateScoreUI();
  hideOptions();
  // countCards(cards);


  updateDataReturnCard().then((ans) => {
    // console.log('FINISHING GET CARD main f.');
    // console.log('current dueCount: ', dueCount, 'toLearnCount: ', toLearnCount);
    // console.log('L1 "updateDataReturnCard" function finished.');
    ResetLettersOnClick();
    // console.log('Card got from database:', ans, typeof ans);
    if (typeof ans === 'string') {
      // console.log('string returned from main function');
      nextBt.style.display = 'none';
      threeBt.style.display = 'none';
      // alert('You are out of cards to learn./some may be waiting/. Add/Make new cards to learn.');
      if (window.confirm('You are out of cards to learn./some may be waiting/. Add/Make new cards to learn.')) {
        window.location.href = 'index.html';
      };
      // window.open(/index.html);
    }
    if (typeof ans === 'object') {
      showPageOne();
    }
    // console.log('"updateDatabaseTHEN_UI" JUST FINISHING!!!!!!!!!!!!!!!!!!');
  });
}


// F speaking 

let setLanguagesToSpeak = async () => {
  // console.log('starting SETTING LANGUAGE TO SPEAK:');

  languageToSpeak = userInfo.langToLearn;
  // console.log('language to speak:', languageToSpeak);

  if (languageToSpeak === 'czech') {
    responsiveVoiceLanguage = 'Czech Female';
    // languageSwap = false;   //users with native English, not czech, like Abi
  }
  else if (languageToSpeak === 'english') { responsiveVoiceLanguage = 'UK English Female'; }
  else if (languageToSpeak === 'french') { responsiveVoiceLanguage = 'French Female'; }

  // console.log('languageSwapp?', languageSwap, '; responsiveVoiceLanguage: ', responsiveVoiceLanguage);
  // console.log('finishing SETTING LANGUAGE TO SPEAK:');
  // console.log(userInfo.docs[0].data());
  // languageToSpeak = 
}

//////Add new words to learn
let activateNEwCardListener = (user) => {
  let form = document.querySelector('#formNewWord');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let nativeInput = form.nativeInput.value;
    let toLearnInput = form.toLearnInput.value;

    // add new object into firebase

    const newCard = {
      languageNative: nativeInput,
      languageToLearn: toLearnInput,
      mainStage: 'to learn',
      enCheck: false,
      czCheck: false,
      level: 0,
      dueTime: 8888888888888,
      due: false,
      lastSeen: 8888888888888
    };

    // db.collection(user.uid).add(newCard).then(() => {
    //  new-DB-structure
    db.collection("users").doc(user.email).collection("cardsToLearn").add(newCard).then(() => {
      console.log('Flip-card added');
      alertUserForSec("Flip-card added", 1);





    }).catch(err => {
      console.log(err);
      console.log('I could NOT add object into the database.');
    });
    // reset form
    form.reset();
  })
}

// short alert
let alertUserForSec = (text, durationInSec) => {
  let alertForSec = document.createElement('div');
  alertForSec.textContent = text;
  alertForSec.id = "alertForSec";
  alertForSec.classList.add("flyingAlert");
  alertForSec.style.animationDuration = durationInSec + "s";
  let hook = document.querySelector("#words");
  hook.append(alertForSec);

  console.log('alert');
}


//////////////////////////////// MAIN
// console.log('getting to listening to al cards click1');
auth.onAuthStateChanged(async (user) => {
  if (user) {
    activateNEwCardListener(user); //to listen to cards which user could later create
    userID = user.uid;
    cards = db.collection("users").doc(user.email);


    // updates the points in/from DB and then in UI (if day is new), ans sets session score to 0;
    stopwatchPointsInit(cards).then((pointsReturned) => {
      points = pointsReturned;
    });

    stopWatchInit(cards);


    // userInfo = await
    cards.collection("about").doc("info").get().then((userDoc) => {
      // loggedStatus.innerHTML = `<p>Enjoy ${user.email}!</p>`
      userInfo = userDoc.data();
      activateUserInOptions(userInfo, cards);
      loggedStatus.innerHTML = `<p>Enjoy ${userInfo.username}!</p>`
      setLanguagesToSpeak().then(() => {
        updateDatabaseTHEN_UI();
      });
    });


  } else {
    loggedStatus.innerHTML = '<p>Stranger Enjoy!</p>';

    let formatGuestCards = async () => {
      console.log('XXXXXXXXXXXXXX formating  guest cards');

      ////// guest cards in guest1 are deleted, then new are created (in guest1) from guestDefault
      //F. delete original cards
      let deleteCardsInCollection = async (colName) => {
        let pathXX = db.collection("guests").doc("guest1");
        pathXX.collection(colName).get().then((data) => {
          data.docs.forEach(doc => {
            console.log('deleting card...');
            pathXX.collection(colName).doc(doc.id)
              .delete();
          })
        });
      }

      //F. create new cards for guest1
      let copyCards = async (coll) => {
        // let oldCardsC = await db.collection("guests").doc("guestDefault").collection("cardsToLearn").get();
        let oldCardsC = await db.collection("guests").doc("guestDefault").collection(coll).get();
        let newCardsD = db.collection("guests").doc("guest1");
        oldCardsC.docs.forEach(doc => {
          newCardsD.collection(coll).add(doc.data());
          console.log('creating card...');
        });
      }
      let copyUserData = async (coll) => {
        // let oldCardsC = await db.collection("guests").doc("guestDefault").collection("cardsToLearn").get();
        let oldCardsC = await db.collection("guests").doc("guestDefault").collection(coll).get();
        let newCardsD = db.collection("guests").doc("guest1");
        oldCardsC.docs.forEach(doc => {
          newCardsD.collection(coll).doc(doc.id).set(doc.data());
          console.log('creating card...');
        });
      }

      // !!!! await Promise.all here seem not working, but in general it seems all working anyway so i will not change it...
      console.log('starting deleting original cards...');
      await Promise.all([deleteCardsInCollection("cardsLearningNotDue"), deleteCardsInCollection("cardsLearningDue"), deleteCardsInCollection("cardsToLearn"), deleteCardsInCollection("cardsLearned"), deleteCardsInCollection("about")]);
      console.log("cards in guest 1 hopefully deleted.");

      await copyCards("cardsToLearn");
      await copyUserData("about");
      console.log("new cards in guest1 created.");

      await db.collection("guests").doc("guest1").collection("about").doc("points").update({
        lastActiveDay: daysSince1970Floored
      });
    }

    await formatGuestCards();
    console.log('more stuff happening...');

    // userID = user.uid;  - asi ani neni potreba
    cards = db.collection("guests").doc("guest1");


    // updates the points in/from DB and then in UI (if day is new), ans sets session score to 0;
    stopwatchPointsInit(cards).then((pointsReturned) => {
      points = pointsReturned;
    });
    stopWatchInit(cards);


    // loggedStatus.innerHTML = `<p>Enjoy ${user.email}!</p>`
    userInfo = {
      langNative: "english",
      langToLearn: "czech",
    };
    activateUserInOptions(userInfo, cards);
    // loggedStatus.innerHTML = `<p>Enjoy ${userInfo.username}!</p>`
    setLanguagesToSpeak().then(() => {
      updateDatabaseTHEN_UI();
    });



  }
});

// console.log('getting to listening to al cards click2');
nextBt.addEventListener('click', e => { showPageTwo(); });
threeBt.addEventListener('click', ee => { updateALL(ee); })
deleteCardHTML.addEventListener('click', e => { deleteCard(e); })

// prevent scrolling on certain buttons
nextBt.addEventListener('touchmove', e => { e.preventDefault(); });
threeBt.addEventListener('touchmove', e => { e.preventDefault(); });
secondWordHTML.addEventListener('touchmove', e => { e.preventDefault(); });

//show and close windows (Help section) on click
for (const sw of showWindowS) {
  sw.addEventListener('click', eX => {
    eX.target.parentElement.nextElementSibling.style.display = "block";
    scroll(0, 0);
  });
};
for (const bb of closeWindowS) {
  bb.addEventListener('click', eee => {
    eee.target.parentElement.style.display = "none";
    // scroll(0, scrollAmount);
  });
};



resetAppIfReturnedAfterXseconds(120);


// console.log('getting to listening to al cards click3');
// showAllCardsHTML.addEventListener('click', e => showALLCards);








// time tracking idle counter?
window.addEventListener('click', e => {
  // console.log('you CLICKED-I will reset idle time.');
  resetIdleTime();
});

// hiding score
let scrollAmount = 350;
scroll(0, scrollAmount);  // to hide ALL score
// ho hide score when title clicked
mainTitleHTML.addEventListener('click', e => { scroll(0, scrollAmount) });

activateWordsOptions.js;
activateWordsOptions();

// alertUserForSec('Congrats - you learned this card.', 2);


export { cards, userID, alertUserForSec };