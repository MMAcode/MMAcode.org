// import { importPozdrav } from './test';
import { stopwatchPointsInit, updatePoints, stopWatchInit, resetIdleTime, resetAppIfReturnedAfterXseconds, countCards, daysSince1970Floored } from './stopwatchPoints';

import './wordsOptions';
import { activateWordsOptions, showOptions, hideOptions, refreshOptions, activateUserInOptions, getPosponeTime } from './wordsOptions';


//mic
// navigator.permissions.query({ name: 'microphone' })
//   .then((permissionObj) => {
//     console.log('MMMMMMMMMMMMMMMMMMMMMMic report');
//     console.log(permissionObj.state);
//     console.log('MMMMMMMMMMMMMMMMic end');
//   })
//   .catch((error) => {
//     console.log('Got error :', error);
//   });



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
let wShuffledNumbers = [];
let evaluateButtonOpacity = 1;

let lettersBubblesActive = false;
let maxNumberOfBubbleLetters = 0;
let numberOfLettersShownNow = 0;
let wordTwoLettersShown = '';
let cardCollectionName = null;


// let posponeAdjusted = false;

const refresh = document.querySelector('#test');
const nextBt = document.querySelector('#b_next');
const threeBt = document.querySelector('#threeButtons');
let wordsHTML = document.querySelectorAll('#words *')
let wordsBackground = "normal";
let firstWordHTML = document.querySelector('#wordOne');
let secondWordHTML = document.querySelector('#wordTwo');
let levelIndicator = document.querySelector('#levelIndicator');
// let showAllCardsHTML = document.querySelector('#showAllCards');
let deleteCardHTML = document.querySelector('#deleteCard');
let loggedStatus = document.querySelector('#loggedInStatus');
let scoreHTML = document.querySelector('#scoreCounter');
let mainTitleHTML = document.querySelector('#mainTitle');
let closeWindowS = document.querySelectorAll('.closeButton');
let helpUsed = false;
let updateThisHTMLIdAfterUpdate = null;
// let xcc = document.querySelectorAll('.closeButton2')[0];
// console.log(closeWindowS);

let showWindowS = document.querySelectorAll('.visibleIcon');

let remindConnectButtonHTML = document.querySelector('#hintConnection');
// remindConnectButtonHTML.classList.remove('hide');
let remindConnectTextHTML = document.querySelector('#hintConnectionText');
// remindConnectTextHTML.classList.remove('hide');
let remindButtonHTML = document.querySelector('#hintConnectionReminder');
// remindButtonHTML.classList.remove('hide');
let remindTextHTML = document.querySelector('#hintConnectionReminderText');
// remindTextHTML.classList.remove('hide');


let score = 0;
let points = {
  session: 0,
  today: 0
}; //hl. from other file 

// console.log(points);

let clickHintCounter = 0;


let languageToSpeak = '';
let responsiveVoiceLanguage = '';
let showNativeWordFirst = true;
// let languageSwap = true;  //users who have native language czech
let languageSwap = false;  //users who have native language czech

//////////////F other










//F prepare word to work with
let getWordToWorkWith = word => {
  let wL = word.length;
  let wUse = '';
  let spaceCounter = 0;
  for (let i = 0; i < wL; i++) {
    if (word[i] === ',' || word[i] === ';' || word[i] === "\(" || word[i] === '{') {
      break;
    } else {
      if (word[i] === ' ') { spaceCounter++; };
      if (spaceCounter > 1) { break; }
      else {
        wUse += `${word[i]}`;
      }
    }
  }
  return wUse;
}

//////letter puzzle
let letterPuzzle = word => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

  //F prepare word to work with
  let getWordToWorkWith = word => {
    let wL = word.length;
    let wUse = '';
    let spaceCounter = 0;
    for (let i = 0; i < wL; i++) {
      if (word[i] === ',' || word[i] === ';' || word[i] === "\(" || word[i] === '{') {
        break;
      } else {
        if (word[i] === ' ') { spaceCounter++; };
        if (spaceCounter > 1) { break; }
        else {
          wUse += `${word[i]}`;
        }
      }
    }
    return wUse;
  }

  // making new element-wrapper
  let makeNewDivElement = (text, /*durationInSec,*/ newDivElID, appendToThisElID, inOrAfter) => {
    let newElement = document.createElement('div');
    newElement.textContent = text;
    newElement.id = newDivElID;
    // newElement.classList.add("flyingAlert");
    // newElement.style.animationDuration = durationInSec + "s";
    let hook = document.querySelector(`#${appendToThisElID}`);
    hook.insertAdjacentElement(inOrAfter, newElement);
    // await new Promise(resolve => setTimeout(resolve, durationInSec * 1000));
    // console.log('XXXXXXXXXXX alert pop up');

    // document.querySelector("#newDivElID").remove();
  }

  //make letter elements in html
  let createElementsInWrapper = word => {
    for (let i = 1; i <= word.length; i++) {
      // console.log(word[i - 1]);
      makeNewDivElement('', `wrapper${i}`, 'puzzleWrapper', 'beforeend');
      makeNewDivElement(word[i - 1], `letter${i}`, `wrapper${i}`, 'beforeend');
      let randomMarginLeft = Math.round(Math.random() * 30);
      let randomMarginTop = Math.round(Math.random() * 30);
      document.querySelector(`#${`letter${i}`}`).style.marginLeft = `${randomMarginLeft}px`;
      document.querySelector(`#${`letter${i}`}`).style.marginTop = `${randomMarginTop}px`;
    }

  }

  //shuffle array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //check letter clicked
  let checkLetterClicked = e => {
    let letterToClick = wAsArray[numberOfLettersShownNow];
    console.log('first letter to be clicked:', letterToClick);

    //if letter clicked
    if (e.target.id.includes('letter') == true) {
      // number = id[id.length - 1];
      let letterClicked = e.target.innerHTML;
      console.log('letter clicked:', letterClicked);

      // check if correct letter clicked
      if (letterClicked === letterToClick) {
        // remove this letter and show it in main window

        //add letter in html
        if (numberOfLettersShownNow + 1 < wAsArray.length) {
          wordTwoLettersShown += letterClicked;
          document.querySelector('#wordTwo').textContent = wordTwoLettersShown + '...';
        } else
          if (numberOfLettersShownNow + 1 === wAsArray.length) {
            console.log('GGGGGGGGGGGGGGGGGGG');
            wordTwoLettersShown += letterClicked;

            if (wAsArray.length < word.length) {
              document.querySelector('#wordTwo').textContent = wordTwoLettersShown + '...';
            } else {
              document.querySelector('#wordTwo').textContent = wordTwoLettersShown;
              showPageTwo();
            }

            document.querySelector('#puzzleWrapper').remove();
            lettersBubblesActive = false;
          }
        e.target.remove();
        // letterNumberToBeTyped++;
        numberOfLettersShownNow++;
        console.log('number of letters shown:', numberOfLettersShownNow);
        console.log('array length:', wAsArray.length);



      } else {
        //make letter red for a sec.
      }




    } else {
      console.log('sth else clicked');
    }

    // console.log(number);
    // console.log(wAsArray);
    // console.log(wShuffled);
  }



  //////////// MAIN
  let wUse = getWordToWorkWith(word);
  maxNumberOfBubbleLetters = wUse.length;

  ////making an array(s)
  let wAsArray = wUse.split('');
  let wNumberedArray = [];

  //remove first letters if used already
  // wAsArray.splice(0, numberOfLettersShownNow);

  // make doubled array template;
  let nr = 1;
  wAsArray.forEach(element => {
    wNumberedArray[nr - 1] = [nr, element];
    nr++;
  });

  let shuffledNumberedArray = [...wNumberedArray];
  shuffle(shuffledNumberedArray);
  wShuffledNumbers = [];
  let wShuffled = [];
  // let wShorer = [];
  // let nrArray = [];
  shuffledNumberedArray.forEach(el => {
    wShuffledNumbers.push('');
  })
  let counterX = 1;
  shuffledNumberedArray.forEach(el => {
    wShuffled.push(el[1]);
    wShuffledNumbers[el[0] - 1] = counterX;
    // nrArray[counterX - 1] = el[0];
    counterX++;
  })
  console.log('- ID: "letterX" to delete,in order----', wShuffledNumbers);
  // console.log('-----------------------', shuffledNumberedArray);


  // console.log('vvvvvvv-----------------', wShuffled);
  // for (let i = numberOfLettersShownNow; i >=1 ; i--){
  // if (wShuffledNumbers[])
  // }



  // copyMayBeShorterIfHintsUsed.splice(0, numberOfLettersShownNow);
  // console.log('vvvvvvv-----------------', copyMayBeShorterIfHintsUsed);

  makeNewDivElement('', 'puzzleWrapper', 'words', 'afterend');
  createElementsInWrapper(wShuffled); //id's: letter1 ...

  //remove used hint elements
  for (let i = 1; i <= numberOfLettersShownNow; i++) {
    console.log('#############', i);
    document.querySelector(`#letter${wShuffledNumbers[i - 1]}`).remove();
  }

  // let letterNumberToBeTyped = 1;
  // let lettersToShow = '';

  //set up listener

  document.querySelector('#puzzleWrapper').addEventListener('click', checkLetterClicked);



};






















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
let levelLearned = 11; //if level 11 --> label as learned

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
  3600000 * 22,  //L5
  3600000 * 22,
  86400000 * 2, //days
  86400000 * 5,
  86400000 * 15,  //    L9 adds this much time (first level is updated, then this time is added based on current level)
  86400000 * 45,
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
  console.log('ready to delete card');
  console.log(currentCardID);
  await cards.collection("cardsLearningNotDue").doc(currentCardID).delete(); //deleting in both piles in case action was initialized through adjusting cards in one of the 2 packs
  cards.collection("cardsLearningDue").doc(currentCardID).delete().then(() => {
    // console.log('deleted');
    alertUserForSec("Deleted", 0.8);
    document.querySelector('#changeWords .optionsWindow').style.display = 'none';

    // await new Promise(resolve => setTimeout(resolve, 800));
    updateDatabaseTHEN_UI();
    scroll(0, scrollAmount);
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

let moveCardFromPileToLEarningPile = async (card1, colToRemoveFrom) => {
  console.log("1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

  let now = new Date().getTime();
  currentCard = card1.docs[0].data();
  console.log(currentCard);
  currentCardID = card1.docs[0].id;
  currentCard.mainStage = 'learning';
  currentCard.lastSeen = now;
  currentCard.dueTime = now;
  // let cardMoveHere = await cards.collection("cardsLearningNotDue").doc(currentCardID).set(currentCard).then(() => {
  let cardMoveHere = await cards.collection("cardsLearningDue").doc(currentCardID).set(currentCard).then(() => {
    cards.collection(colToRemoveFrom).doc(currentCardID).delete();
    // console.log('------- CARD MOVED TO DUE GROUP qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
  });
  wordsBackground = "new";
  toLearnCount = 1;
  console.log('because TO LEARN card was found, "current card" was updated.', currentCard, "card's ID: ", currentCardID);
}

// get "to learn" card - first try NEXT pile, then toLearn pile
let getCardFromToLearn = async (cards) => {
  // console.log('L1-1-4 STARTING getting ToLEARN card.');
  // let checkIfACardFromToLearn = await cards.where('mainStage', '==', 'to learn').limit(1).get();

  let checkIfACardFromToLearn = await cards.collection("cardsToLearnNext").limit(1).get();
  if (checkIfACardFromToLearn.docs.length == 0) {
    console.log("BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    checkIfACardFromToLearn = await cards.collection("cardsToLearn").limit(1).get();
    if (checkIfACardFromToLearn.docs.length == 0) { console.log('no card "TO LEARN" right NOW.'); toLearnCount = 0; }
    else {
      //remove also card from toLearn (not next)
      await moveCardFromPileToLEarningPile(checkIfACardFromToLearn, "cardsToLearn");
    }

  }
  else { //remove also card from toLearnNext
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log("ahoj")
    await moveCardFromPileToLEarningPile(checkIfACardFromToLearn, "cardsToLearnNext");
  }
}

/////////////////////////////// F-Main async
let updateDataReturnCard = async () => {
  wordsBackground = "normal"; //updating info about if current word is from TO LEARN pile
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

  maxNumberOfBubbleLetters = getWordToWorkWith(wordTwo).length;

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
  if (clickHintCounter > 1 && clickHintCounter < 500) { return false }
  else { return true };
}

let updateCurrentCard = (e) => {
  console.log('updateCurrenCard F running', currentCard);
  let en = currentCard.enCheck;
  let lev = currentCard.level;
  // console.log('level before:', lev);
  let origScore = score;
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
  else if (e.target.id === 'BtnStay') {
    // lev = lev > 1 ? lev - 1 : 0;

    // if (lev > 2) {
    //   lev -= 2;
    //   score = score - 2;
    // } else {  //lev 1 or 0...
    //   score -= lev - 1;
    //   lev -= lev - 1;  //L2-1 ->L1; L1-0 ->L1
    // }

    score = score - Math.floor(lev / 2);
    lev = Math.ceil(lev / 2);
  }

  // correct Ans
  else if (e.target.id === 'BtnUp') {
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
      // alertUserForSec('CHEATING!', 1.5);
    }
  }
  else {
    //="slow" button pushed
    // en = !en;
    if (lev > 0) { lev--; score--; }
  }

  ////show score change:
  // let scoreChange = '';
  // if (score > origScore) { scoreChange = '+' };
  // alertUserForSec(`${scoreChange} ${score - origScore}`, 0.3);

  currentCard.enCheck = en;
  currentCard.level = lev;
  // console.log('level after:', lev);

  let now = new Date().getTime();
  currentCard.lastSeen = now;
  currentCard.due = false;

  // card learned/not learned:
  if (lev < levelLearned) {
    let posponedTime = getPosponeTime();
    currentCard.dueTime = now + posponedTime + arrayTimes[lev];
    if (posponedTime > 0) {
      alertUserForSec('Card posponed.', 1);
    }

  }
  else if (lev == levelLearned) {
    // currentCard.level = 888;

    // currentCard.mainStage = 'learned';
    // console.log('card labeled learned');
    // console.log(currentCard);
    // alert('Congrats -this card was added to "learned" pile.');
    alertUserForSec('Congrats! - Card learned.', 2);
  }
}

let updateCardInFirebase = async () => {
  // console.log('card to be updated like this:');
  // console.log(currentCard);
  // await cards.doc(currentCardID).update({

  if (currentCard.level != levelLearned) {
    // console.log('card shall be updated like this: UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
    // console.log(currentCard);
    await cards.collection("cardsLearningNotDue").doc(currentCardID).set(currentCard);
    await cards.collection("cardsLearningDue").doc(currentCardID).delete();
  };
  if (currentCard.level == levelLearned) {
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

  //update html element in decks of words  -adjusted word
  if (updateThisHTMLIdAfterUpdate != null) {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX")
    console.log(currentCard)
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX")

    document.querySelector(`#${updateThisHTMLIdAfterUpdate}adjust`).previousElementSibling.innerHTML = currentCard.languageToLearn;
    document.querySelector(`#${updateThisHTMLIdAfterUpdate}adjust`).previousElementSibling.previousElementSibling.innerHTML = currentCard.languageNative;
    updateThisHTMLIdAfterUpdate = null;
  }

  updateCurrentCard(e);
  await updateCardInFirebase();


  // console.log('GOING TO UPDATE DATABASE AGAIN...');
  // if (e.target.id === 'BtnDown' || e.target.id === 'BtnStay') {
  //   document.querySelector('#improveChallengeButtons').style.display = "flex";
  //   document.querySelector('#threeButtons').style.display = 'none';
  // } 
  updateDatabaseTHEN_UI();

}

let setEvaluateButtonsOpacity = (oDown, oStay, oSlow, oUp) => {
  if (oDown < 2) { document.querySelector('#BtnDown').style.opacity = oDown; }
  if (oStay < 2) { document.querySelector('#BtnStay').style.opacity = oStay; }
  if (oSlow < 2) { document.querySelector('#BtnSlow').style.opacity = oSlow; }
  if (oUp < 2) { document.querySelector('#BtnUp').style.opacity = oUp; }
}

// HINTS on p1:   show LETTER on click as 
let ShowLetterOnClick = () => {
  clickHintCounter++;

  if (clickHintCounter > 1) {
    setEvaluateButtonsOpacity(0.9, 0.9, 0.3, 0.3);

    // if (clickHintCounter >= wordTwo.length - 1) {
    //   setEvaluateButtonsOpacity(0.9, 0.3, 0.3, 0.3);
    // }
  }

  if (lettersBubblesActive === true && numberOfLettersShownNow < maxNumberOfBubbleLetters) {
    document.querySelector(`#letter${wShuffledNumbers[numberOfLettersShownNow]}`).remove();
  }

  // console.log('you just clicked on hint');
  if (numberOfLettersShownNow + 1 < wordTwo.length) {
    wordTwoLettersShown += wordTwo[numberOfLettersShownNow];
    secondWordHTML.textContent = wordTwoLettersShown + '...';
  }
  if (numberOfLettersShownNow + 1 === wordTwo.length) {
    secondWordHTML.textContent = wordTwo;
    showPageTwo();
  }

  numberOfLettersShownNow++;
  console.log('hint counter in function:', clickHintCounter);
  console.log('shown letters counter in function:', numberOfLettersShownNow);

  if (numberOfLettersShownNow >= maxNumberOfBubbleLetters) {
    document.querySelector('#showLettersWrapper').style.display = 'none';
  }
}

let ResetLettersOnClick = () => {
  clickHintCounter = 0;
  wordTwoLettersShown = '';
}
let showLevel = () => {
  if (currentCard.enCheck === false) { levelIndicator.innerHTML = `level ${currentCard.level}-A` }
  else { levelIndicator.innerHTML = `level ${currentCard.level}-B` }
  // console.log(currentCard.enCheck);
}


// not activated


let preventScroll = e => { e.preventDefault(); }

// PAGES
let showPageOne = async () => {
  // console.log('page one Activated');

  // speak the word if Language-to-learn displayed
  // responsiveVoice.speak("hello world");
  //   https://responsivevoice.org/api/


  assignWordsAndColours(currentCard);  // which word to speak first also decided here
  firstWordHTML.textContent = wordOne;
  secondWordHTML.textContent = '...';
  setEvaluateButtonsOpacity(0.9, 0.9, 0.9, 0.9);
  nextBt.style.display = 'block';
  threeBt.style.display = 'none';
  document.querySelector('#BtnDown').style.display = 'block';
  document.querySelector('#BtnSlow').style.display = 'block';

  // posponeAdjusted = false;

  // prevent scrolling on second word:
  secondWordHTML.addEventListener('touchmove', preventScroll);
  document.querySelector('#showLettersWrapper').style.display = 'flex';

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

  //hide one of the evaluating buttons
  if (currentCard.level < 4) {
    document.querySelector('#BtnSlow').style.display = 'none';
  } else {
    document.querySelector('#BtnDown').style.display = 'none';
  }




  // activating letter hints
  clickHintCounter = 0;
  wordTwoLettersShown = '';
  // console.log('clickHintCounter: ', clickHintCounter);
  secondWordHTML.addEventListener('click', ShowLetterOnClick);
  showLevel();

  //hide hint buttons and text by default
  remindConnectButtonHTML.classList.add('hide');
  remindButtonHTML.classList.add('hide');
  remindConnectTextHTML.classList.add('hide');
  remindTextHTML.classList.add('hide');

  /////assign texts and show appropriate button
  //assign connection text
  if (currentCard.connection != undefined && currentCard.connection != '') {
    remindConnectTextHTML.innerHTML = currentCard.connection;
  }
  //showing appropriate button
  if (currentCard.languageNative == wordOne && currentCard.cReminderNativeShown != undefined && currentCard.cReminderNativeShown != '') {
    //add text
    remindTextHTML.innerHTML = currentCard.cReminderNativeShown;
    //show button
    remindButtonHTML.classList.remove('hide');
  } else if (currentCard.cReminderToLearnShown != undefined && currentCard.cReminderToLearnShown != '') {
    //add text
    remindTextHTML.innerHTML = currentCard.cReminderToLearnShown;
    //show button
    remindButtonHTML.classList.remove('hide');
  } else if (currentCard.connection != undefined && currentCard.connection != '') {
    remindConnectButtonHTML.classList.remove('hide');
  };


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

  //sort bubble letters
  if (lettersBubblesActive === true) { document.querySelector('#puzzleWrapper').remove(); }
  document.querySelector('#showLettersWrapper').style.display = 'none';
  lettersBubblesActive = false;


  //activate scrolling and remove tapping on second word
  secondWordHTML.removeEventListener('touchmove', preventScroll);
  secondWordHTML.removeEventListener('click', ShowLetterOnClick);

  console.log(wordTwo, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

  //show connection text if exists
  if (currentCard.connection != undefined && currentCard.connection != '') {
    remindConnectButtonHTML.classList.remove('hide');
    remindConnectTextHTML.classList.remove('hide');
  };
  // hide connection reminder
  remindButtonHTML.classList.add('hide');
  remindTextHTML.classList.add('hide');
  // document.querySelector('#takeTimeReminder').style.opacity = "1";



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
  numberOfLettersShownNow = 0;
  wordTwoLettersShown = '';

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
      firstWordHTML.innerHTML = '-';
      secondWordHTML.innerHTML = '-';
      // alert('You are out of cards to learn./some may be waiting/. Add/Make new cards to learn.');
      if (window.alert('You are out of cards to learn./some may be waiting/. Add/Make new cards to learn.')) {
        // window.location.href = 'index.html';
      };
      // window.open(/index.html);
    }
    console.log(currentCard);


    if (typeof ans === 'object') {
      if (wordsBackground == "new") {
        wordsHTML.forEach(element => {
          element.style.backgroundColor = 'white';
        });
        alertUserForSec("New Card", 1);
      } else if (currentCard.level == levelLearned - 1 && currentCard.enCheck == true) {
        wordsHTML.forEach(element => {
          element.style.backgroundColor = 'lightgreen';
        });
        alertUserForSec("1 step from learned:", 1.4);
      } else {
        wordsHTML.forEach(element => {
          // element.style.backgroundColor = 'rgb(255, 230, 0)';
          element.style.backgroundColor = 'rgb(252, 240, 188)';
        })
      }
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
  else if (languageToSpeak === 'german') {
    responsiveVoiceLanguage = 'Deutsch Female';

  }

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

    let checkBoxCurrentPile = form.querySelector('input[name="collection"]:checked').value;
    // console.log(checkBoxCurrentPile)

    // let checkBoxTraslationChecked = form.newWordTranslationCheckBox.checked;


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
      lastSeen: 8888888888888,
      translationChecked: form.newWordTranslationCheckBox.checked
    };

    // db.collection(user.uid).add(newCard).then(() => {
    //  new-DB-structure

    if (checkBoxCurrentPile == "LATER") {
      db.collection("users").doc(user.email).collection("cardsToLearn").add(newCard).then(() => {
        console.log('Added');
        alertUserForSec("Added to 'Later'.", 1);
      }).catch(err => {
        console.log(err);
        console.log('I could NOT add object into the database.');
      });
    } else if (checkBoxCurrentPile == "NEXT") {
      db.collection("users").doc(user.email).collection("cardsToLearnNext").add(newCard).then(() => {
        console.log('Added TO NEXT COLL');
        alertUserForSec("Added to 'Next'.", 1);
      }).catch(err => {
        console.log(err);
        console.log('I could NOT add object into the database.');
      });
    } else if (checkBoxCurrentPile == "NOW") {
      let now = new Date().getTime();
      newCard.mainStage = "learning";
      newCard.lastSeen = now;
      newCard.dueTime = now; //if +10 000 = after 10 seconds
      // console.log('current  new card:', newCard);
      db.collection("users").doc(user.email).collection("cardsLearningNotDue").add(newCard).then(() => {
        console.log('Flip-card added');
        alertUserForSec("Added to 'Now'.", 1);
      }).catch(err => {
        console.log(err);
        console.log('I could NOT add object into the database.');
      });
    }






    // if (checkBoxCurrentPile == false) {
    //   db.collection("users").doc(user.email).collection("cardsToLearn").add(newCard).then(() => {
    //     console.log('Added');
    //     alertUserForSec("Added", 1);
    //   }).catch(err => {
    //     console.log(err);
    //     console.log('I could NOT add object into the database.');
    //   });
    // } else if (checkBoxCurrentPile == true) {
    //   let now = new Date().getTime();
    //   newCard.mainStage = "learning";
    //   newCard.lastSeen = now;
    //   newCard.dueTime = now; //if +10 000 = after 10 seconds
    //   console.log('current  new card:', newCard);
    //   db.collection("users").doc(user.email).collection("cardsLearningNotDue").add(newCard).then(() => {
    //     console.log('Flip-card added');
    //     alertUserForSec("Added", 1);
    //   }).catch(err => {
    //     console.log(err);
    //     console.log('I could NOT add object into the database.');
    //   });
    // }

    // reset form
    form.reset();
    // document.querySelector("#formNewWord_NativeInput").focus();
  })
}

// short alert
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
nextBt.addEventListener('click', e => {
  showPageTwo();

});
threeBt.addEventListener('click', ee => {
  //watch for cheating
  if (ee.target.style.opacity < 0.5) { alertUserForSec(`You sneaky one...`, 0.5) }
  // document.querySelector('#puzzleWrapper').remove();
  // document.querySelector('#takeTimeReminder').style.opacity = "0";
  document.querySelector('#threeButtons').style.backgroundColor = 'rgba(0, 0, 0, 0)';
  document.querySelector('#saveChangesAlert').style.display = 'none';
  // threeBt.style.display = 'none';

  updateALL(ee);
})
deleteCardHTML.addEventListener('click', e => { deleteCard(e); })

// prevent scrolling on certain buttons
nextBt.addEventListener('touchmove', e => { e.preventDefault(); });
threeBt.addEventListener('touchmove', e => { e.preventDefault(); });
// secondWordHTML.addEventListener('touchmove', e => { e.preventDefault(); });

//show and close windows (Help section and Add new word) on click
for (const sw of showWindowS) {
  sw.addEventListener('click', eX => {
    eX.target.parentElement.nextElementSibling.style.display = "block";
    scroll(0, 0);
    // console.log('selected element:', eX.target.parentElement.parentElement.id);
    if (eX.target.parentElement.parentElement.id == "addVocabulary") {
      // console.log('add voc clicked');
      document.querySelector("#formNewWord_NativeInput").focus();

    };
  });
};
for (const bb of closeWindowS) {
  bb.addEventListener('click', eee => {
    // alertUserForSec(eee.target.parentElement.parentElement.id, 2);
    if (eee.target.parentElement.classList.contains('pairedButton') && eee.target.parentElement.parentElement.id == 'formAdjustWord') {
      eee.target.parentElement.parentElement.parentElement.style.display = "none";
    } else {
      eee.target.parentElement.style.display = "none";
      // window.location.reload();
    }
    scroll(0, scrollAmount);
  });
};

//listen to hints buttons clicks - reveal text and next buttons
remindConnectButtonHTML.addEventListener('click', e => {
  remindConnectTextHTML.classList.remove('hide');
  setEvaluateButtonsOpacity(2, 2, 0.3, 0.3);
});
remindButtonHTML.addEventListener('click', e => {
  remindTextHTML.classList.remove('hide');
  remindConnectButtonHTML.classList.remove('hide');
  setEvaluateButtonsOpacity(2, 2, 0.3, 0.3);
});

//listen to buttons after  4 evaluating buttons
/// adjust button sorted in "wordsOptions" package as it needs functions from there
// document.querySelector('#moveOnOption').addEventListener('click', e => {
//   document.querySelector('#improveChallengeButtons').style.display = "none";
//   updateDatabaseTHEN_UI();
// })

//listen to show letters button
let once = true;
document.querySelector('#showLettersWrapper').addEventListener('click', e => {
  letterPuzzle(wordTwo);
  lettersBubblesActive = true;
  setEvaluateButtonsOpacity(2, 2, 2, 0.3);
  document.querySelector('#showLettersWrapper').style.display = 'none';
});






/////info about cards' PILES
//adds cards info to HTML
// let learnedCardsAvailableToChange = [];

let printCardsPileToHTML = (ID, cardsArray) => {

  const newCardCountForHTML = document.createElement('div');
  newCardCountForHTML.innerHTML = `${cardsArray.length} cards in this pile.`;
  document.querySelector(`${ID} .showHideCards`).append(newCardCountForHTML);

  cardsArray.forEach(card => {
    let cardInfoNumbers = `${(new Date(card.lastSeen)).getDate()}/${(new Date(card.lastSeen)).getMonth() + 1} L.${card.level} `;
    let cardInfoText = `${card.languageNative} `;

    const newCardForHTML = document.createElement('div');
    const newCardForHTMLc1 = document.createElement('span');
    const newCardForHTMLc2 = document.createElement('span');

    newCardForHTMLc1.innerHTML = cardInfoNumbers;
    newCardForHTMLc2.innerHTML = cardInfoText;
    newCardForHTMLc2.setAttribute("style", "color: black;");

    newCardForHTML.append(newCardForHTMLc1);
    newCardForHTML.append(newCardForHTMLc2);

    // if (ID === '#pileLearned') {
    //   learnedCardsAvailableToChange = cardsArray;
    //   newCardForHTMLc2.addEventListener('click', (e) => {
    //     // console.log(e)
    //     e.target.innerHTML = `${card.id}`;
    //   })
    // }

    document.querySelector(`${ID} .showHideCards`).append(newCardForHTML);
    document.querySelector(`${ID} button`).setAttribute("style", "display:none");
    // e.target.setAttribute("style", "display:none");


    // if card from learned pile...
    if (ID === '#pileLearned') {

      const buttonsWrapper = document.createElement('div');

      const newSHOWButtonForHTML = document.createElement('button');
      newSHOWButtonForHTML.innerHTML = "Show translation";
      newSHOWButtonForHTML.setAttribute("id", `TRANSLATION${card.DBid}`);
      newSHOWButtonForHTML.setAttribute("class", `spin-border-radius`);
      // newCardForHTML.append(newSHOWButtonForHTML);
      buttonsWrapper.append(newSHOWButtonForHTML);


      const newButtonForHTML = document.createElement('button');
      newButtonForHTML.innerHTML = "Learn again";
      newButtonForHTML.setAttribute("id", `${card.DBid}`);
      // newCardForHTML.append(newButtonForHTML);
      buttonsWrapper.append(newButtonForHTML);

      newCardForHTML.append(buttonsWrapper);
    }

    if (ID === '#pileNotDue' || ID === "#pileDue") {


      //show translation text
      const newSpanForHTML = document.createElement('span');
      let cardInfoTextTranslation = `${card.languageToLearn} `;
      newSpanForHTML.innerHTML = cardInfoTextTranslation;
      newSpanForHTML.setAttribute("style", "color: brown;");
      newCardForHTML.append(newSpanForHTML);

      //add button for adjusting translations
      const newButtonForHTMLTranslationAdjustment = document.createElement('button');
      newButtonForHTMLTranslationAdjustment.innerHTML = "Adjust";
      newButtonForHTMLTranslationAdjustment.setAttribute("id", `ID${card.DBid}adjust`);
      newCardForHTML.append(newButtonForHTMLTranslationAdjustment);

      if (!card.translationChecked || card.translationChecked != true) {
        //new line
        const newLineForHTML = document.createElement('br');
        newCardForHTML.append(newLineForHTML);

        //add button for marking checked translations
        const newButtonForHTMLTranslationCheck = document.createElement('button');
        newButtonForHTMLTranslationCheck.innerHTML = "Translation Ok";
        newButtonForHTMLTranslationCheck.setAttribute("id", `ID${card.DBid}`);
        newCardForHTML.append(newButtonForHTMLTranslationCheck);
      }
    }
  })
}

// get cards from DB
let getAndReturnDataAboutPile = async (pileNameInDB) => {
  let cardsByLastSeenAr = [];
  let cardsByLastSeen = await cards.collection(pileNameInDB).orderBy('lastSeen', "desc").get();
  // cardsByLastSeen.docs.forEach(doc => cardsByLastSeenAr.push({doc.id, ...doc.data() }));
  cardsByLastSeen.docs.forEach(doc => cardsByLastSeenAr.push({ DBid: doc.id, ...doc.data() }));
  // console.log(cardsByLastSeenAr[0]);
  return cardsByLastSeenAr;
};

document.querySelector('#pileLearned button').addEventListener("click", async () => {
  printCardsPileToHTML('#pileLearned', await getAndReturnDataAboutPile("cardsLearned"));
});
////spec. for learned pile - listen to MOVE buttons
document.querySelector('#pileLearned .showHideCards').addEventListener("click", async (e) => {

  if (e.target.tagName == 'BUTTON' && e.target.id) {
    let dbKey = e.target.id;
    if (e.target.id.slice(0, 11) === 'TRANSLATION') dbKey = e.target.id.slice(11, e.target.id.length);
    let cardToMove = await cards.collection("cardsLearned").doc(`${dbKey}`).get();
    console.log(cardToMove);

    cardToMove = cardToMove.data();

    if (e.target.id.slice(0, 11) === 'TRANSLATION') {
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB BUTON translation")

      const translationForHTML = document.createElement('span');
      translationForHTML.innerHTML = cardToMove.languageToLearn;
      translationForHTML.setAttribute("style", "color: brown;");
      console.log("element to append:", translationForHTML);
      // e.target.append(translationForHTML);
      e.target.insertAdjacentElement('afterend', translationForHTML);

      const translationBrForHTML = document.createElement('br');
      e.target.insertAdjacentElement('afterend', translationBrForHTML);
    }
    else {
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB BUTON move back")

    }
    //   cardToMove.level = 5;
    //   cards.collection("cardsLearningNotDue").doc(e.target.id).set(cardToMove);
    //   cards.collection("cardsLearned").doc(e.target.id).delete();

    //   const buttonReplacementForHTML = document.createElement('span');
    //   buttonReplacementForHTML.innerHTML = "  Element moved to current pile.";
    //   e.target.insertAdjacentElement('afterend', buttonReplacementForHTML);
    //   e.target.remove();
    // }
  }
});




////spec. for 2 learning piles - listen to CHECK TRANSLATION buttons
document.querySelector('#pileNotDue .showHideCards').addEventListener("click", async (e) => {
  if (e.target.tagName == 'BUTTON' && e.target.id) {
    let idHelp = e.target.id;
    idHelp = idHelp.substring(2);  // remove letters 'ID' from the beginning
    let ending = idHelp.slice(-6); // returns last 6 letters from the string
    if (ending != "adjust") { // button "Translate ok" clicked; button which has id withOUT DB doc id extended with "adjust" text on the end

      // let cardToAdjust = await cards.collection("cardsLearningNotDue").doc(`${idHelp}`).get();
      // cardToAdjust = cardToAdjust.data();
      // // cardToAdjust.level = 5;
      // cardToAdjust.translationChecked = true;
      // cards.collection("cardsLearningNotDue").doc(idHelp).set(cardToAdjust);

      await cards.collection("cardsLearningNotDue").doc(`${idHelp}`).update({ translationChecked: true });

      // cards.collection("cardsLearned").doc(e.target.id).delete();

      const buttonReplacementForHTML = document.createElement('span');
      buttonReplacementForHTML.innerHTML = "Card marked as checked.";
      e.target.insertAdjacentElement('afterend', buttonReplacementForHTML);
      e.target.remove();
    }


    else {
      //button "adjust was clicked"; button which has html id with 'DB doc id extended with "adjust" text on the end'
      let hideInfoPiles = document.querySelector('#pilesInfo .invisibleWindow');
      hideInfoPiles.style.display = "none";
      scroll(0, scrollAmount);

      console.log("XXXXXXXXXYYYYYYbutton adjust was clicked");


      let changeWordsHTML = document.querySelector('#changeWords');
      let changeWordsHTMLf = changeWordsHTML.querySelector('.optionsWindow');

      scroll(0, 0);
      // adjustCurrentWord();
      // console.log(currentCardInOp, currentCardInOpID);
      // console.log(changeWordsHTMLf);
      let DbID = idHelp.slice(0, idHelp.length - 6); //removing "adjust" text from the HTML ID to get doc from DB

      let cardToAdjust = await cards.collection("cardsLearningNotDue").doc(`${DbID}`).get();
      cardToAdjust = cardToAdjust.data();

      currentCard = cardToAdjust;
      currentCardID = DbID;

      let nativeWord = document.querySelector('#nativeWToAdjust');
      let toLearnWord = document.querySelector('#wToLearnAdjust');
      let connectionHTML = document.querySelector('#connectionInput');
      let cReminderAHTML = document.querySelector('#remindConnectionA');
      let cReminderBHTML = document.querySelector('#remindConnectionB');

      // show current values of the card:
      nativeWord.setAttribute('value', currentCard.languageNative);
      toLearnWord.setAttribute('value', currentCard.languageToLearn);
      if (currentCard.connection != undefined) {
        connectionHTML.setAttribute('value', currentCard.connection);
      } else { connectionHTML.setAttribute('value', ''); }
      if (currentCard.cReminderNativeShown != undefined) {
        cReminderAHTML.setAttribute('value', currentCard.cReminderNativeShown);
      } else { cReminderAHTML.setAttribute('value', ''); }
      if (currentCard.cReminderToLearnShown != undefined) {
        cReminderBHTML.setAttribute('value', currentCard.cReminderToLearnShown);
      } else { cReminderBHTML.setAttribute('value', ''); }

      // console.log(nativeWord, toLearnWord);
      refreshOptions(currentCard, currentCardID, userInfo);
      showPageTwo();
      changeWordsHTMLf.style.display = 'block';
      console.log("XXXXXXXXXYYYYYYbutton adjust was clicked - block should be shown");
      updateThisHTMLIdAfterUpdate = "ID" + DbID;
    }
  }
});
document.querySelector('#pileDue .showHideCards').addEventListener("click", async (e) => {
  if (e.target.tagName == 'BUTTON' && e.target.id) {
    let idHelp = e.target.id;
    idHelp = idHelp.substring(2);  // remove letters 'ID' from the beginning
    let ending = idHelp.slice(-6); // returns last 6 letters from the string
    if (ending != "adjust") { // button "Translate ok" clicked; button which has id withOUT DB doc id extended with "adjust" text on the end
      await cards.collection("cardsLearningDue").doc(`${idHelp}`).update({ translationChecked: true });
      //update info about "doc" in html pile
      const buttonReplacementForHTML = document.createElement('span');
      buttonReplacementForHTML.innerHTML = "Card marked as checked.";
      e.target.insertAdjacentElement('afterend', buttonReplacementForHTML);
      e.target.remove();
    }
    else {
      //button "adjust was clicked"; button which has html id with 'DB doc id extended with "adjust" text on the end'
      let hideInfoPiles = document.querySelector('#pilesInfo .invisibleWindow');
      hideInfoPiles.style.display = "none"; //to hide first page of the app and jump to 'update word' section, i think
      // scroll(0, scrollAmount);
      // console.log("XXXXXXXXXYYYYYYbutton adjust was clicked");
      let changeWordsHTML = document.querySelector('#changeWords');
      let changeWordsHTMLf = changeWordsHTML.querySelector('.optionsWindow');
      scroll(0, 0);
      let DbID = idHelp.slice(0, idHelp.length - 6); //removing "adjust" text from the HTML ID to get doc from DB
      let cardToAdjust = await cards.collection("cardsLearningDue").doc(`${DbID}`).get();
      cardToAdjust = cardToAdjust.data();
      currentCard = cardToAdjust;
      currentCardID = DbID;
      let nativeWord = document.querySelector('#nativeWToAdjust');
      let toLearnWord = document.querySelector('#wToLearnAdjust');
      let connectionHTML = document.querySelector('#connectionInput');
      let cReminderAHTML = document.querySelector('#remindConnectionA');
      let cReminderBHTML = document.querySelector('#remindConnectionB');
      // show current values of the card:
      nativeWord.setAttribute('value', currentCard.languageNative);
      toLearnWord.setAttribute('value', currentCard.languageToLearn);
      if (currentCard.connection != undefined) {
        connectionHTML.setAttribute('value', currentCard.connection);
      } else { connectionHTML.setAttribute('value', ''); }
      if (currentCard.cReminderNativeShown != undefined) {
        cReminderAHTML.setAttribute('value', currentCard.cReminderNativeShown);
      } else { cReminderAHTML.setAttribute('value', ''); }
      if (currentCard.cReminderToLearnShown != undefined) {
        cReminderBHTML.setAttribute('value', currentCard.cReminderToLearnShown);
      } else { cReminderBHTML.setAttribute('value', ''); }

      // console.log(nativeWord, toLearnWord);
      refreshOptions(currentCard, currentCardID, userInfo);
      showPageTwo();
      changeWordsHTMLf.style.display = 'block';
      console.log("XXXXXXXXXYYYYYYbutton adjust was clicked - block should be shown");
      updateThisHTMLIdAfterUpdate = "ID" + DbID;


      e.target.parentElement.remove(); //remove card from html Due pile (as it is in not due pile now)
      updateThisHTMLIdAfterUpdate = null; //has to be null to prevent updating html element which is not there
    }
  }
});

document.querySelector('#pileDue button').addEventListener("click", async () => {
  printCardsPileToHTML('#pileDue', await getAndReturnDataAboutPile("cardsLearningDue"));
});
document.querySelector('#pileNotDue button').addEventListener("click", async () => {
  printCardsPileToHTML('#pileNotDue', await getAndReturnDataAboutPile("cardsLearningNotDue"));
});

document.querySelector('#pileToLearnNext button').addEventListener("click", async () => {
  printCardsPileToHTML('#pileToLearnNext', await getAndReturnDataAboutPile("cardsToLearnNext"));
});

document.querySelector('#pileToLearn button').addEventListener("click", async () => {
  printCardsPileToHTML('#pileToLearn', await getAndReturnDataAboutPile("cardsToLearn"));
});






resetAppIfReturnedAfterXseconds(120);


// console.log('getting to listening to al cards click3');
// showAllCardsHTML.addEventListener('click', e => showALLCards);








// time tracking idle counter?
window.addEventListener('click', e => {
  // console.log('you CLICKED-I will reset idle time.');
  resetIdleTime();
});

// hiding score
let scrollAmount = 430;
let offsetTop = document.querySelector('#mainTitle').offsetTop;
// scrollAmount = offsetTop;
scroll(0, scrollAmount);  // to hide scores on the beginning
// ho hide score when title clicked
mainTitleHTML.addEventListener('click', e => { scroll(0, scrollAmount) });

activateWordsOptions.js;
activateWordsOptions();


// //////// center button - text reminder
// alertUserForSec('Congrats - you learned this card.', 2);



window.addEventListener('scroll', function (e) {

  // console.log('CurentCard in bundle.js on scroll CCCCCCCCCCCCCCCCCC', currentCard);


  //sort + button
  // let yOffset = window.pageYOffset - scrollAmount;
  let yOffset = window.pageYOffset - offsetTop;
  let bodyWidth = document.querySelector('body').offsetWidth;
  let containerWidth = document.querySelector('#container').offsetWidth;
  if (yOffset > -75) {
    document.querySelector('#addVocabulary .visibleIcon').style.position = 'fixed';
    let movePlusToLeft = 0;
    document.querySelector('#addVocabulary .visibleIcon').style.top = '0';
    document.querySelector('#addVocabulary .visibleIcon').style.opacity = '0.3';
    if (bodyWidth > containerWidth) { movePlusToLeft = (bodyWidth - 500) / 2; }
    document.querySelector('#addVocabulary .visibleIcon').style.right = `${movePlusToLeft}px`;
  } else {
    document.querySelector('#addVocabulary .visibleIcon').style.position = 'absolute';
    document.querySelector('#addVocabulary .visibleIcon').style.right = '0';
    document.querySelector('#addVocabulary .visibleIcon').style.top = '0';
    document.querySelector('#addVocabulary .visibleIcon').style.opacity = '1';
  }

  //title opacity
  if (yOffset > -35) { document.querySelector('#mainTitle').style.opacity = '0'; }
  else { document.querySelector('#mainTitle').style.opacity = '1'; }

  // tapToCenter button opacity
  // let centerOffset = Math.abs(window.pageYOffset - scrollAmount);
  let centerOffset = Math.abs(window.pageYOffset - offsetTop);
  let centerButtonOpacityMiro = 0;
  if (centerOffset > 75) {
    centerButtonOpacityMiro = 0 + (centerOffset - 25) / 200;
    if (centerButtonOpacityMiro > 1) { centerButtonOpacityMiro = 1 };
  } else { centerButtonOpacityMiro = 0 };
  document.querySelector('#tapToCenter').style.opacity = centerButtonOpacityMiro;

  // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOO offset ', centerOffset);
  // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOO ', centerButtonOpacityMiro);
});



















export { cards, userID, alertUserForSec, scrollAmount, wordOne };