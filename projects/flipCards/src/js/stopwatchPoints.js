// import { cards, userID } from './bundle';

let d = new Date();
let dayToday = d.getDate(); //day as a number (1-31)
let month = d.getMonth() + 1;  //month as a number (0-11)
let year = d.getFullYear(); //year as a four digit number (yyyy)
// console.log('date today:', dayToday);
// console.log('month: ', month + 1, ' year: ', year);

// console.log(d);
let timeNow = d.getTime();
// console.log(timeNow);
let days = timeNow / 1000 / 60 / 60 / 24;
// console.log(days);
let daysSince1970Floored = Math.floor(days);
// console.log(daysSince1970Floored);


let pointsSHTML = document.querySelector('#pointsCounterS');
let pointsTHTML = document.querySelector('#pointsCounterT');
let history7HTML = document.querySelector('#history7days');

let timeSHTML = document.querySelector('#timeCounterS');
let timeTHTML = document.querySelector('#timeCounterT');
let timeHistory7HTML = document.querySelector('#timeHistory7days');

let idleTime = 0;








// returns current points and time from DB also
let createUserVariablesInFBifNeeded = async (cards) => {
  // let updatingPoints = null;
  // let updatingPointsHistory = null;
  // let updatingDayToday = null;
  let points = await cards.collection("about").doc("points").get();
  points = points.data();

  let time = await cards.collection("about").doc("time").get();
  time = time.data();

  // console.log(points, 'ppppppppppppppppppppppppppppppppp');
  // console.log('check new variables XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

  if (points == undefined || time == undefined) {
    let updatingPoints = cards.collection("about").doc("points").set({
      session: 0,
      today: 0,
      daysActive: 1,
      lastActiveDay: daysSince1970Floored
    });
    let updatingPointsHistory = cards.collection("about").doc("pointsHistory").set({
      // empty document - ready to be used
    });
    let updateUserInfo = cards.collection("about").doc("info").update({
      startDate: d
    });

    let updatingTime = cards.collection("about").doc("time").set({
      session: 0,
      today: 0,
    });
    let updatingTimeHistory = cards.collection("about").doc("timeHistory").set({
      // empty document - ready to be used
    });

    // updatingDayToday = cards.collection("about").doc("dayToday").set({
    //   day: dayToday
    // });

    await Promise.all([updatingPoints, updatingPointsHistory, updateUserInfo, updatingTime, updatingTimeHistory]);
    points = await cards.collection("about").doc("points").get();
    points = points.data();

    time = await cards.collection("about").doc("time").get();
    time = time.data();
    console.log('POINTS and TIME created in DB XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    // console.log(points);
    // console.log(time);

  }
  // console.log('POINTS AND TIME IN DB:');
  // console.log(points);
  // console.log(time);

  return [points, time];
}





// returns updated points
let updateDayStuffIfNeeded = async (cards, points, time) => {
  points.session = 0;
  time.session = 0;


  // if new day...
  while (daysSince1970Floored > points.lastActiveDay) {
    console.log('DAYS ARE DIFFERENT, time to update variables...XXXXXXXXXXXXXXXXXXXXXXX');
    // console.log(daysSince1970Floored); //days to current day
    // console.log(points.daysActive); //last Active day = in DB points

    // get  HISTORY docs
    let pointsHistory = cards.collection("about").doc("pointsHistory").get();
    let timeHistory = cards.collection("about").doc("timeHistory").get();
    pointsHistory = await pointsHistory;
    timeHistory = await timeHistory;
    pointsHistory = pointsHistory.data();
    timeHistory = timeHistory.data();

    console.log('ttttttttttttttttttttttttttttttttttttttttttttttttttttttt');
    console.log('pointsH:', pointsHistory, 'timesH:', timeHistory);


    // update history doc locally, then in DB
    pointsHistory[points.daysActive] = points.today;
    timeHistory[points.daysActive] = time.today;
    // console.log('P XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    let aa = cards.collection("about").doc("pointsHistory").set(pointsHistory);
    let bb = cards.collection("about").doc("timeHistory").set(timeHistory);
    await aa; await bb;
    console.log('history of both updated in DB');

    // console.log(pointsHistory);
    // update timeHistory and time

    // add 1 day to user's "last day" (and keep repeating until you reach today)
    points.lastActiveDay++;
    points.daysActive++;

    points.today = 0;
    time.today = 0;

    // updating current points and times in DB
    let cc = cards.collection("about").doc("points").update(points);
    let dd = cards.collection("about").doc("time").update(time);
    await cc; await dd;
  }
  let cc = cards.collection("about").doc("points").update(points);
  let dd = cards.collection("about").doc("time").update(time);
  await cc; await dd;


  return [points, time];
}




let showPointsInHtml = (points) => {
  pointsSHTML.innerHTML = `<p>${points.session}</p>`;
  pointsTHTML.innerHTML = `<p>${points.today}</p>`;
}

let showTimeInHTML = (time) => {
  timeSHTML.innerHTML = `<p>${time.session}</p>`;
  timeTHTML.innerHTML = `<p>${time.today}</p>`;
  // timeHistoryHTML = as separate function-  only once a day and during reload
}










let showHistory = async (cardsPath, points, time) => {
  // get  HISTORY doc

  let pointsHistory = cardsPath.collection("about").doc("pointsHistory").get();
  let timeHistory = cardsPath.collection("about").doc("timeHistory").get();
  pointsHistory = await pointsHistory;
  timeHistory = await timeHistory;
  pointsHistory = pointsHistory.data();
  timeHistory = timeHistory.data();
  // console.log('points history: ', pointsHistory);
  // console.log('time history: ', timeHistory);


  let counter = 1;
  let lastDayInHistory = points.daysActive - 1;
  let lastWantedDayInHistory = points.daysActive - 1;
  // let history7Array = [];
  // let timeHistory7Array = [];

  history7HTML.innerHTML = '<strong>Points: </strong> ';
  timeHistory7HTML.innerHTML = '<strong>Minutes: </strong> ';

  // console.log('scores in history HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
  while (counter < 8 && counter <= lastDayInHistory) {
    // history7Array.push(pointsHistory[lastWantedDayInHistory]);
    // timeHistory7Array.push(timeHistory[lastWantedDayInHistory]);
    // console.log(lastWantedDayInHistory, ' : ', pointsHistory[lastWantedDayInHistory]);
    history7HTML.innerHTML += `<span>${pointsHistory[lastWantedDayInHistory]} </span>`
    timeHistory7HTML.innerHTML += `<span>${timeHistory[lastWantedDayInHistory]}</span>`

    // console.log("counter: ", counter);
    // if (counter == 8 || counter == lastDayInHistory) {
    //   history7HTML.innerHTML += `<span> </span>`;
    //   timeHistory7HTML.innerHTML += `<span>m. </span>`;

    // } else {
    //   history7HTML.innerHTML += `<span> - </span>`;
    //   timeHistory7HTML.innerHTML += `<span>m. - </span>`;
    // }

    counter++;
    lastWantedDayInHistory--;
  }
  // console.log('Starting with the most recent day: ', history7Array);
  // console.log(history7Array.length);

  // history7Array.forEach(day => {  //starts with the left = most recent day first
  //   // console.log(day, ', ');
  //   history7HTML.innerHTML += `<span>${day}, </span>`
  // })
  // history7HTML.innerHTML += `<span>...</span>`

}


// let showHistory = async (cardsPath, points) => {
//   // get  HISTORY doc
//   let pointsHistory = await cardsPath.collection("about").doc("pointsHistory").get();
//   pointsHistory = pointsHistory.data();

//   let counter = 1;
//   let lastDayInHistory = points.daysActive - 1;
//   let lastWantedDayInHistory = points.daysActive - 1;
//   let history7Array = [];
//   history7HTML.innerHTML = '<strong>Last 7 days: </strong> ';

//   // console.log('scores in history HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
//   while (counter < 8 && counter <= lastDayInHistory) {
//     history7Array.push(pointsHistory[lastWantedDayInHistory])
//     // console.log(lastWantedDayInHistory, ' : ', pointsHistory[lastWantedDayInHistory]);
//     history7HTML.innerHTML += `<span>${pointsHistory[lastWantedDayInHistory]} </span>`


//     // console.log("counter: ", counter);
//     if (counter == 8 || counter == lastDayInHistory) {
//       history7HTML.innerHTML += `<span> </span>`;
//     } else {
//       history7HTML.innerHTML += `<span> - </span>`;
//     }

//     counter++;
//     lastWantedDayInHistory--;
//   }
//   // console.log('Starting with the most recent day: ', history7Array);
//   // console.log(history7Array.length);

//   // history7Array.forEach(day => {  //starts with the left = most recent day first
//   //   // console.log(day, ', ');
//   //   history7HTML.innerHTML += `<span>${day}, </span>`
//   // })
//   // history7HTML.innerHTML += `<span>...</span>`

// }







let startTimeTrack = (time, cardsPath) => {
  idleTime = 0;
  let timePracticedInSeconds = 0;

  setInterval(() => {  //each second
    idleTime++;
    timePracticedInSeconds++;
    // console.log(idleTime);
    // console.log(timePracticedInSeconds);

    // keep time practices "paused" until user became active again (by +-1 keeping the seconds the same)
    if (idleTime > 60) { timePracticedInSeconds--; }

    if (timePracticedInSeconds >= 60) { //needs to be 60 to make 1 minute
      time.session++;
      time.today++;
      cardsPath.collection("about").doc("time").update(time);
      showTimeInHTML(time);
      timePracticedInSeconds = 0;
    }
  }, 1000)
}

// called upon any click in practice section
let resetIdleTime = () => {
  idleTime = 0;
}












let stopwatchPointsInit = async (cardsPath) => {
  // let points = await createUserVariablesInFBifNeeded(cardsPath);
  let array = await createUserVariablesInFBifNeeded(cardsPath);
  let points = array[0];
  let time = array[1];
  // console.log('after CHECKING  USER OBJECTS, getting points and time from DB and returning array and converting array to points and time:');
  // console.log(points, time);

  // UPDATE NEW DAY if needed, update new Session points and time in DB and locally, return current points and time from DB
  let array2 = await updateDayStuffIfNeeded(cardsPath, points, time);
  points = array2[0];
  time = array2[1];
  // console.log('after UPDATING Session (+DAY) and returning array and converting array to points and time:');
  // console.log(points, time);

  showTimeInHTML(time);
  showPointsInHtml(points);
  showHistory(cardsPath, points, time);
  startTimeTrack(time, cardsPath);










  return points;
}















let updatePoints = async (score, points, cardsPath) => {
  points.session += score;
  points.today += score;
  // console.log('points to upoad to DB  qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
  // console.log(points);
  await cardsPath.collection("about").doc("points").update(points);
  showPointsInHtml(points);
  return points;
}













// let createTimeVariablesInDBIfNeeded = async (cardsPath) => {
//   let time = await cardsPath.collection("about").doc("time").get();
//   time = time.data();

//   if (points == undefined) {
//     let updatingTime = cards.collection("about").doc("time").set({
//       session: 0,
//       today: 0,
//     });
//     let updatingTimeHistory = cards.collection("about").doc("timeHistory").set({
//       // empty document - ready to be used
//     });
//   }
// }

let stopWatchInit = async (cardsPath) => {
  // let timeTracker = await createTimeVariablesInDBIfNeeded(cardsPath);
  console.log('stop watch init');
}


























// ///////count cards
let countCards = (cardsPath) => {
  console.log('COUNTING CARDS    -----------------------------------------');
  let totalAmountOfCards = 0;
  cardsPath.collection("cardsToLearn").get().then((data) => {
    // console.log("to learn: ", data.docs.length, ' cards');
    data.docs.forEach(doc => {
      // console.log(doc.data());
    })
    totalAmountOfCards += data.docs.length;
    // console.log('Total: ', totalAmountOfCards);
  });
  cardsPath.collection("cardsLearningNotDue").get().then((data) => {
    console.log("not due/waiting: ", data.docs.length, ' cards');
    data.docs.forEach(doc => {
      console.log(doc.data());
    })
    totalAmountOfCards += data.docs.length;
    // console.log('Totals: ', totalAmountOfCards);
  });
  cardsPath.collection("cardsLearningDue").get().then((data) => {
    console.log("due: ", data.docs.length, ' cards');
    data.docs.forEach(doc => {
      console.log(doc.data());
    })
    totalAmountOfCards += data.docs.length;
    // console.log('Total: ', totalAmountOfCards);
  });
  cardsPath.collection("cardsLearned").get().then((data) => {
    // console.log("learned: ", data.docs.length, ' cards');
    // data.docs.forEach(doc => {
    //   console.log(doc.data());
    // })
    totalAmountOfCards += data.docs.length;
    console.log('TOTAL: ', totalAmountOfCards);
  });
}



let resetAppIfReturnedAfterXseconds = (seconds) => {
  // refresh page when returned from other tab/app
  let VisibilityTimeOn = 0;
  let VisibilityTimeOff = 0;

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'visible') {
      VisibilityTimeOn = new Date().getTime() / 1000;
      console.log('Visibility on (in s): ', VisibilityTimeOn);

      if ((VisibilityTimeOn - VisibilityTimeOff) > seconds) {
        // console.log('I will reset  the app now.');
        window.location.reload();
        // window.location.href = window.location.href;
      };
    };
    if (document.visibilityState === 'hidden') {
      VisibilityTimeOff = new Date().getTime() / 1000;
      console.log('Visibility off (in s): ', VisibilityTimeOff);
    };
  });

}




export { stopwatchPointsInit, updatePoints, stopWatchInit, resetIdleTime, resetAppIfReturnedAfterXseconds, countCards, daysSince1970Floored };