/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/bundle.js":
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \"./src/js/test.js\");\n\r\n\r\n\r\n\r\nlet dueCount = 0;\r\nlet toLearnCount = 0;\r\n// const cards = db.collection('FlipCards');\r\nlet cards = db.collection('FlipCards');\r\n\r\nconst currentCardS = null;\r\nlet currentCard = {};\r\nlet currentCardID = null;\r\nlet wordOne = '';\r\nlet wordTwo = '';\r\nconst refresh = document.querySelector('#test');\r\nconst nextBt = document.querySelector('#b_next');\r\nconst threeBt = document.querySelector('#threeButtons');\r\nlet firstWordHTML = document.querySelector('#wordOne');\r\nlet secondWordHTML = document.querySelector('#wordTwo');\r\nlet levelIndicator = document.querySelector('#levelIndicator');\r\n// let showAllCardsHTML = document.querySelector('#showAllCards');\r\nlet deleteCardHTML = document.querySelector('#deleteCard');\r\nlet loggedStatus = document.querySelector('#loggedInStatus');\r\nlet scoreHTML = document.querySelector('#scoreCounter');\r\nlet score = 0;\r\n\r\nlet clickHintCounter = 0;\r\nlet hintLettersToShow = '';\r\n\r\nlet languageToSpeak = '';\r\nlet responsiveVoiceLanguage = '';\r\nlet showNativeWordFirst = true;\r\nlet languageSwap = true;  //users who have native language czech\r\n\r\n\r\n/////////// F LEVELS - TIMES\r\n// to bigger time units  -return array\r\nlet now = new Date().getTime();\r\nconsole.log('current time: ', now);\r\n\r\nlet toBiggerUnits = (unitsBefore, chunks) => {\r\n  let biggerUnits = Math.floor(unitsBefore / chunks);\r\n  let unitsAfter = unitsBefore % chunks;\r\n  let array = [biggerUnits, unitsAfter];\r\n  return array;\r\n}\r\n// convert timeStamp to message\r\nlet timeStampToMessage = (timeStamp) => {\r\n  // let stringTemplate = ' Due again in ';\r\n  let string = '';\r\n  let sec = Math.round(timeStamp / 1000);\r\n  let minBefore = Math.floor(sec / 60);\r\n  sec = sec % 60;\r\n  let min = toBiggerUnits(minBefore, 60)[1];\r\n  let hoursBefore = toBiggerUnits(minBefore, 60)[0];\r\n\r\n  let hours = toBiggerUnits(hoursBefore, 24)[1];\r\n  let daysBefore = toBiggerUnits(hoursBefore, 24)[0];\r\n\r\n  let days = toBiggerUnits(daysBefore, 365)[1];\r\n  let yearsBefore = toBiggerUnits(daysBefore, 24)[0];\r\n  if (days > 0) { string += `${days} day`; if (days > 1) { string += 's' }; }\r\n  else if (hours > 0) { string += `${hours} hour`; if (hours > 1) { string += 's' }; }\r\n  else if (min > 0) { string += `${min} minute`; if (min > 1) { string += 's' }; }\r\n  else if (sec > 0) { string += `${sec} second`; if (sec > 1) { string += 's' }; }\r\n  // string = stringTemplate + string;\r\n  return string;\r\n}\r\n\r\n\r\n\r\n//////// levels - times - MAIN\r\nlet arrayTimes = [];\r\nlet timeCounter = 10000;\r\nlet oneArray = [];\r\nlet levelLearned = 10; //if level 10 --> label as learned\r\nfor (let i = 1; i < levelLearned; i++) {\r\n  arrayTimes.push(timeCounter);\r\n  // timeCounter = timeCounter;\r\n  timeCounter = timeCounter * 5;\r\n}\r\nconsole.log('array of times for levels:');\r\nconsole.log(arrayTimes);\r\narrayTimes.forEach((time) => {\r\n  // console.log(time);\r\n  // timeStampToMessage(time);\r\n  oneArray += [`${timeStampToMessage(time)}; `];\r\n});\r\nconsole.log(oneArray);\r\n\r\n\r\n\r\n//////////////////////////////////EXTRA\r\n// show all cards\r\n// let showAllCards = async () => {\r\n//   console.log('in show All cards F');\r\n//   let dataAll = await cards.get();\r\n//   let cardsInfo = dataOrdered.docs.forEach(doc => {\r\n//     console.log(doc);\r\n//   })\r\n// }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n////////////////////////////// F SET UP\r\n// F delete card\r\nlet deleteCard = async () => {\r\n  console.log('ready to delete card');\r\n  console.log(currentCardID);\r\n  cards.doc(currentCardID).delete().then(() => {\r\n    console.log('deleted');\r\n    updateDatabaseTHEN_UI();\r\n  });\r\n}\r\n\r\n\r\n// F-update and Count Due\r\nlet updateDue = async data => {\r\n  let now = new Date().getTime();\r\n  dueCount = 0;\r\n  console.log('L1-1-1: starting \"updateDue\" in MAIN-ASYNC');\r\n  let dueToUpdate = await cards.where('mainStage', '==', 'learning').where('due', '==', false).where('dueTime', '<', now);\r\n  let ddData = await dueToUpdate.get();\r\n  // console.log('cards which needs to have DUE changed to TRUE:');\r\n  ddData.docs.forEach((doc) => {\r\n    console.log(doc.data());\r\n    cards.doc(doc.id).update({ due: true });\r\n  })\r\n};\r\n\r\n\r\n// get current card from DUE\r\nlet getCardFromDue = async () => {\r\n\r\n  let dataOrdered = await cards.where('mainStage', '==', 'learning').where('due', '==', true).orderBy('lastSeen', \"desc\").limit(1).get();\r\n  // console.log('dataOrdered:', dataOrdered.docs.length);\r\n  if (dataOrdered.docs.length == 0) { console.log('no DUE card right NOW.'); dueCount = 0; }\r\n  else {\r\n    currentCard = dataOrdered.docs[0].data();\r\n    currentCardID = dataOrdered.docs[0].id;\r\n    dueCount = 1;\r\n    console.log('because DUE card was found, \"current card\" was updated.', currentCard, \"card's ID: \", currentCardID);\r\n  }\r\n  return currentCard;\r\n}\r\n\r\n\r\n\r\n// get \"to learn\" card\r\nlet getCardFromToLearn = async (cards) => {\r\n  // console.log('L1-1-4 STARTING getting ToLEARN card.');\r\n  let checkIfACardFromToLearn = await cards.where('mainStage', '==', 'to learn').limit(1).get();\r\n  if (checkIfACardFromToLearn.docs.length == 0) { console.log('no TO LEARN card right NOW.'); toLearnCount = 0; }\r\n  else {\r\n    let now = new Date().getTime();\r\n    currentCard = checkIfACardFromToLearn.docs[0].data();\r\n    currentCardID = checkIfACardFromToLearn.docs[0].id;\r\n    currentCard.mainStage = 'learning';\r\n    currentCard.lastSeen = now;\r\n    toLearnCount = 1;\r\n    console.log('because TO LEARN card was found, \"current card\" was updated.', currentCard, \"card's ID: \", currentCardID);\r\n  }\r\n}\r\n\r\n/////////////////////////////// F-Main async\r\nlet updateDataReturnCard = async () => {\r\n  console.log('STARTING GET CARD main f.a');\r\n  let currentCardOrNull = await updateDue();\r\n  let testIfACard = await getCardFromDue();\r\n\r\n  console.log('GetDueCard f. finished, current dueCount: ', dueCount, 'toLearnCount: ', toLearnCount);\r\n  if (dueCount === 0) {\r\n    console.log('we will start GetToLEarnCard f. now...');\r\n    let xXx = await getCardFromToLearn(cards);\r\n    if (toLearnCount > 0) {\r\n      return currentCard;\r\n    } else { return 'no card to use.'; }\r\n  }\r\n  else { return currentCard; }\r\n}\r\n\r\n\r\n\r\n\r\n///////////////////////////// UI\r\nlet assignWordsAndColours = (currentCard) => {\r\n  // console.log('1.2.1.1 assign words');\r\n  // console.log(currentCard.enCheck);\r\n  let en = currentCard.enCheck;\r\n  if (en) {\r\n    wordOne = currentCard.czWord;\r\n    wordTwo = currentCard.enWord;\r\n    firstWordHTML.style.color = 'blue';\r\n    secondWordHTML.style.color = 'red';\r\n    showNativeWordFirst = false;\r\n  } else {\r\n    wordOne = currentCard.enWord;\r\n    wordTwo = currentCard.czWord;\r\n    firstWordHTML.style.color = 'red';\r\n    secondWordHTML.style.color = 'blue';\r\n    showNativeWordFirst = true;\r\n  }\r\n  // console.log('1.2.1.1 word 1 is:', wordOne);\r\n  // console.log('1.2.1.1 word 2 is:', wordTwo);\r\n}\r\n\r\n\r\nlet showThreeButtons = () => {\r\n  nextBt.style.display = 'none';\r\n  threeBt.style.display = 'flex';\r\n}\r\n\r\nlet jumpLevels = (level) => {\r\n  console.log('');\r\n  console.log('starting F timeJump');\r\n  console.log(`current card level: ${level}, enCheck: ${currentCard.enCheck}.`);\r\n  let now = new Date().getTime();\r\n  let timeJump = now - currentCard.lastSeen;\r\n  console.log(`card last time seen ${timeStampToMessage(timeJump)}`);\r\n  console.log('since last time seen: ', timeJump);\r\n  console.log('next tie should be seen in:', arrayTimes[level]);\r\n\r\n  while (timeJump > arrayTimes[level]) {\r\n    level++;\r\n    score++;\r\n    if (level === levelLearned - 1) { break; }; //you can jump max to level Learned-1 (9)\r\n  }\r\n  console.log('Ending F timeJump');\r\n  console.log(`current card level: ${level}, enCheck: ${currentCard.enCheck}.`);\r\n  return level;\r\n}\r\n\r\n\r\nlet hintNotUsed = () => {\r\n  // console.log('checking cheating');\r\n  // console.log(clickHintCounter);\r\n  if (clickHintCounter > 0 && clickHintCounter < 500) { return false }\r\n  else { return true };\r\n}\r\nlet updateCurrentCard = (e) => {\r\n  console.log('updateCurrenCard F running', currentCard);\r\n  let en = currentCard.enCheck;\r\n  let lev = currentCard.level;\r\n  console.log('level before:', lev);\r\n  if (e.target.id === 'BtnDown') {\r\n    if (lev > 1) { score = score - 2; };\r\n    if (lev === 1) {\r\n      score = score - 1;\r\n    };\r\n    lev = lev > 2 ? lev - 2 : 0;\r\n  }\r\n  if (e.target.id === 'BtnStay') {\r\n    // lev = lev > 1 ? lev - 1 : 0;\r\n    console.log(\"let's keep the level the same.\");\r\n  }\r\n\r\n  // correct Ans\r\n  if (e.target.id === 'BtnUp') {\r\n    if (hintNotUsed()) {\r\n      // console.log('updating level on variable inside programme');\r\n      console.log('original level:', lev, 'original enCheck (on variable):', en, 'on current card(to double check):', currentCard.enCheck);\r\n\r\n\r\n      if (en === true) {\r\n        lev++;\r\n        score++;\r\n        // console.log('level en is originaly true - now=', lev);\r\n        en = false;\r\n      } else {\r\n        // console.log('level if en is false - now=', lev);\r\n\r\n        en = true;\r\n      }\r\n\r\n      if (lev < levelLearned - 1) lev = jumpLevels(lev); // level has to be 2+smaller(8 or smaller) to go into jump consideration\r\n\r\n      console.log('updated level(in variable):', lev, 'updated enCheck:', en);\r\n    } else {\r\n      alert('STOP CHEATING, I know you used a hint!;-)');\r\n    }\r\n  }\r\n\r\n  currentCard.enCheck = en;\r\n  currentCard.level = lev;\r\n  console.log('level after:', lev);\r\n\r\n  let now = new Date().getTime();\r\n  currentCard.lastSeen = now;\r\n  currentCard.due = false;\r\n\r\n  if (lev < levelLearned) { currentCard.dueTime = now + arrayTimes[lev]; }\r\n  else if (lev = levelLearned) {\r\n    currentCard.mainStage = 'learned';\r\n    // console.log('card labeled learned');\r\n    // console.log(currentCard);\r\n    alert('Congrats -this card was added to \"learned\" pile.');\r\n  }\r\n}\r\n\r\nlet updateCardInFirebase = async () => {\r\n  console.log('card to be updated like this:');\r\n  console.log(currentCard);\r\n  await cards.doc(currentCardID).update({\r\n    enCheck: currentCard.enCheck,\r\n    level: currentCard.level,\r\n    lastSeen: currentCard.lastSeen,\r\n    due: currentCard.due,\r\n    dueTime: currentCard.dueTime,\r\n    mainStage: currentCard.mainStage\r\n  });\r\n  // console.log(' card in FIREBASE updated');\r\n}\r\n\r\n\r\n// update ALL from second page to new card\r\nlet updateALL = async (e) => {\r\n  // console.log('this was clicked:');\r\n  // console.log(e.target.parentNode.id);\r\n\r\n  updateCurrentCard(e);\r\n  await updateCardInFirebase();\r\n  // console.log('GOING TO UPDATE DATABASE AGAIN...');\r\n  updateDatabaseTHEN_UI();\r\n}\r\n\r\n\r\n\r\n// HINTS on p1:   show LETTER on click as \r\nlet ShowLetterOnClick = () => {\r\n  clickHintCounter++;\r\n  Object(_test__WEBPACK_IMPORTED_MODULE_0__[\"importPozdrav\"])('Mirecek');\r\n  Object(_test__WEBPACK_IMPORTED_MODULE_0__[\"importPozdrav\"])('Abi');\r\n  console.log('click counter in function:', clickHintCounter);\r\n  let hintWord = wordTwo;\r\n  // console.log('you just clicked on hint');\r\n  if (clickHintCounter < wordTwo.length) {\r\n    hintLettersToShow += wordTwo[clickHintCounter - 1];\r\n    secondWordHTML.textContent = hintLettersToShow + '...';\r\n  }\r\n  if (clickHintCounter === wordTwo.length) {\r\n    secondWordHTML.textContent = wordTwo;\r\n  }\r\n  // console.log('hintLettersToShow:', hintLettersToShow);\r\n}\r\n\r\nlet ResetLettersOnClick = () => {\r\n  clickHintCounter = 0;\r\n  hintLettersToShow = '';\r\n}\r\nlet showLevel = () => {\r\n  if (currentCard.enCheck === false) { levelIndicator.innerHTML = `L. ${currentCard.level}a` }\r\n  else { levelIndicator.innerHTML = `L. ${currentCard.level}b` }\r\n  // console.log(currentCard.enCheck);\r\n}\r\n\r\n\r\n// not activated\r\n\r\n\r\n\r\n\r\n// PAGES\r\nlet showPageOne = async () => {\r\n  // console.log('page one Activated');\r\n\r\n  // speak the word if Language-to-learn displayed\r\n  // responsiveVoice.speak(\"hello world\");\r\n  //   https://responsivevoice.org/api/\r\n\r\n  assignWordsAndColours(currentCard);  // which word to speak first also decided here\r\n  firstWordHTML.textContent = wordOne;\r\n  secondWordHTML.textContent = '...';\r\n  nextBt.style.display = 'block';\r\n  threeBt.style.display = 'none';\r\n\r\n  // **\r\n  // SPEAKING\r\n  if (!showNativeWordFirst && !languageSwap) {\r\n    console.log('LANGUAGE -not swapped- TO SPEAK now', responsiveVoiceLanguage);\r\n    let cekej = await responsiveVoice.speak(wordOne, responsiveVoiceLanguage);\r\n  }\r\n  if (showNativeWordFirst && languageSwap) {\r\n    console.log('LANGUAGE -swapped- TO SPEAK now', responsiveVoiceLanguage);\r\n    let cekejToo = await responsiveVoice.speak(wordOne, responsiveVoiceLanguage);\r\n    // console.log(responsiveVoice.speak(wordOne, responsiveVoiceLanguage));\r\n  }\r\n\r\n  // activating letter hints\r\n  clickHintCounter = 0;\r\n  hintLettersToShow = '';\r\n  console.log('clickHintCounter: ', clickHintCounter);\r\n  secondWordHTML.addEventListener('click', ShowLetterOnClick);\r\n  showLevel();\r\n\r\n\r\n\r\n  // **\r\n\r\n}\r\n\r\nlet showPageTwo = () => {\r\n  // console.log('Page two Activated.');\r\n  // secondWordHTML.onclick = null;\r\n  // secondWordHTML.removeEventListener();\r\n  // secondWordHTML.removeEventListener('click', e => ResetLettersOnClick());\r\n  // console.log('clickHint listener SHOUND be removed');\r\n  // console.log('current clickhintCouner=', clickHintCounter);\r\n  clickHintCounter = 1000;\r\n  secondWordHTML.textContent = wordTwo;\r\n\r\n  // SPEAKING\r\n  // for english speaking  users (Abi)...\r\n  if (showNativeWordFirst && !languageSwap) {\r\n    console.log('LANGUAGE -not swapped- TO SPEAK now', responsiveVoiceLanguage);\r\n    responsiveVoice.speak(wordTwo, responsiveVoiceLanguage);\r\n  }\r\n  // for czech speaking  users (Me, Dana, Stana)...\r\n  if (!showNativeWordFirst && languageSwap) {\r\n    console.log('LANGUAGE -swapped- TO SPEAK now', responsiveVoiceLanguage);\r\n    responsiveVoice.speak(wordTwo, responsiveVoiceLanguage);\r\n    // console.log(responsiveVoice.speak(wordOne, responsiveVoiceLanguage));\r\n  }\r\n\r\n  showThreeButtons();\r\n}\r\n\r\nlet updateScoreUI = () => {\r\n  scoreHTML.innerHTML = `<p>Session score: ${score}</p>`;\r\n}\r\n\r\n\r\n\r\n\r\nlet updateDatabaseTHEN_UI = () => {\r\n  updateScoreUI();\r\n  updateDataReturnCard().then((ans) => {\r\n    console.log('FINISHING GET CARD main f.');\r\n    console.log('current dueCount: ', dueCount, 'toLearnCount: ', toLearnCount);\r\n    console.log('L1 \"updateDataReturnCard\" function finished.');\r\n    ResetLettersOnClick();\r\n    console.log('Card got from database:', ans, typeof ans);\r\n    if (typeof ans === 'string') {\r\n      // console.log('string returned from main function');\r\n      nextBt.style.display = 'none';\r\n      threeBt.style.display = 'none';\r\n      // alert('You are out of cards to learn./some may be waiting/. Add/Make new cards to learn.');\r\n      if (window.confirm('You are out of cards to learn./some may be waiting/. Add/Make new cards to learn.')) {\r\n        window.location.href = 'index.html';\r\n      };\r\n      // window.open(/index.html);\r\n    }\r\n    if (typeof ans === 'object') {\r\n      showPageOne();\r\n    }\r\n    // console.log('\"updateDatabaseTHEN_UI\" JUST FINISHING!!!!!!!!!!!!!!!!!!');\r\n  });\r\n}\r\n\r\n\r\n// F speaking \r\n\r\nlet setLanguagesToSpeak = async (user) => {\r\n  console.log('starting SETTING LANGUAGE TO SPEAK:');\r\n  let userInfo = await cards.doc(user.uid).get();\r\n  languageToSpeak = userInfo.data().langToLearn;\r\n  console.log('language to speak:', languageToSpeak);\r\n\r\n  if (languageToSpeak === 'czech') {\r\n    responsiveVoiceLanguage = 'Czech Female';\r\n    languageSwap = false;   //users with native English, not czech, like Abi\r\n  }\r\n  else if (languageToSpeak === 'english') { responsiveVoiceLanguage = 'UK English Female'; }\r\n  else if (languageToSpeak === 'french') { responsiveVoiceLanguage = 'French Female'; }\r\n\r\n  console.log('languageSwapp?', languageSwap, '; responsiveVoiceLanguage: ', responsiveVoiceLanguage);\r\n  console.log('finishing SETTING LANGUAGE TO SPEAK:');\r\n  // console.log(userInfo.docs[0].data());\r\n  // languageToSpeak = \r\n}\r\n\r\n\r\n//////////////////////////////// MAIN\r\n// console.log('getting to listening to al cards click1');\r\n\r\n// refresh.style.display = 'none';\r\nauth.onAuthStateChanged(user => {\r\n  if (user) {\r\n    loggedStatus.innerHTML = `<p>Enjoy ${user.email}!</p>`\r\n    cards = db.collection(user.uid);\r\n    setLanguagesToSpeak(user).then(() => {\r\n      updateDatabaseTHEN_UI();\r\n    })\r\n\r\n\r\n  }\r\n  else { loggedStatus.innerHTML = '<p>Stranger Enjoy!</p>'; }\r\n});\r\n\r\n\r\n// console.log('getting to listening to al cards click2');\r\n\r\nnextBt.addEventListener('click', e => { showPageTwo(); });\r\nthreeBt.addEventListener('click', ee => { updateALL(ee); })\r\ndeleteCardHTML.addEventListener('click', e => { deleteCard(e); })\r\n\r\n// console.log('getting to listening to al cards click3');\r\n// showAllCardsHTML.addEventListener('click', e => showALLCards);\n\n//# sourceURL=webpack:///./src/js/bundle.js?");

/***/ }),

/***/ "./src/js/test.js":
/*!************************!*\
  !*** ./src/js/test.js ***!
  \************************/
/*! exports provided: importPozdrav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"importPozdrav\", function() { return importPozdrav; });\nlet importPozdrav = (name) => {\r\n  console.log(`${name} zdraví ze souboru test.js.`);\r\n  console.log('XXX');\r\n  console.log('XXX');\r\n  console.log('XXX');\r\n  console.log('XXX');\r\n  console.log('XXX');\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/test.js?");

/***/ })

/******/ });