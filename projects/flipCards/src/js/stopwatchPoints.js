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







// returns current points also
let createUserVariablesInFBifNeeded = async (cards) => {
  // let updatingPoints = null;
  // let updatingPointsHistory = null;
  // let updatingDayToday = null;
  let points = await cards.collection("about").doc("points").get();
  points = points.data();
  // console.log(points, 'ppppppppppppppppppppppppppppppppp');
  // console.log('check new variables XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

  if (points == undefined) {
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

    // updatingDayToday = cards.collection("about").doc("dayToday").set({
    //   day: dayToday
    // });

    await Promise.all([updatingPoints, updatingPointsHistory, updateUserInfo]);
    points = await cards.collection("about").doc("points").get();
    points = points.data();
    console.log('POINTS created in DB XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    console.log(points);
  }
  return points;
}





// returns updated points
let updateDayStuffIfNeeded = async (cards, points) => {
  points.session = 0;

  // if new day...
  while (daysSince1970Floored > points.lastActiveDay) {
    console.log('DAYS ARE DIFFERENT, time to update variables...XXXXXXXXXXXXXXXXXXXXXXX');
    // console.log(daysSince1970Floored); //days to current day
    // console.log(points.daysActive); //last Active day = in DB points

    // get  HISTORY doc
    let pointsHistory = await cards.collection("about").doc("pointsHistory").get();
    pointsHistory = pointsHistory.data();
    // console.log(pointsHistory);


    // update history doc locally, then in DB
    pointsHistory[points.daysActive] = points.today;
    // console.log('P XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    await cards.collection("about").doc("pointsHistory").set(pointsHistory);
    // console.log(pointsHistory);

    // add 1 day to user's "last day" (and keep repeating until you reach today)
    points.lastActiveDay++;
    points.daysActive++;
    points.today = 0;
  }
  await cards.collection("about").doc("points").update(points);
  return points;
}




let showPointsInHtml = (points) => {
  pointsSHTML.innerHTML = `<p>${points.session}</p>`;
  pointsTHTML.innerHTML = `<p>${points.today}</p>`;
}







let showHistory = async (cardsPath, points) => {
  // get  HISTORY doc
  let pointsHistory = await cardsPath.collection("about").doc("pointsHistory").get();
  pointsHistory = pointsHistory.data();

  let counter = 1;
  let lastDayInHistory = points.daysActive - 1;
  let lastWantedDayInHistory = points.daysActive - 1;
  let history7Array = [];
  history7HTML.innerHTML = '<strong>Last 7 days: </strong> ';

  // console.log('scores in history HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
  while (counter < 8 && counter <= lastDayInHistory) {
    history7Array.push(pointsHistory[lastWantedDayInHistory])
    // console.log(lastWantedDayInHistory, ' : ', pointsHistory[lastWantedDayInHistory]);
    history7HTML.innerHTML += `<span>${pointsHistory[lastWantedDayInHistory]} </span>`


    // console.log("counter: ", counter);
    if (counter == 8 || counter == lastDayInHistory) {
      history7HTML.innerHTML += `<span> </span>`;
    } else {
      history7HTML.innerHTML += `<span> - </span>`;
    }

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



let stopwatchPointsInit = async (cardsPath) => {
  // 
  let points = await createUserVariablesInFBifNeeded(cardsPath);

  points = await updateDayStuffIfNeeded(cardsPath, points);
  showPointsInHtml(points);
  showHistory(cardsPath, points);
  return points;
}




let updatePoints = async (score, points, cardsPath) => {
  points.session += score;
  points.today += score;
  console.log('points to upoad to DB  qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
  console.log(points);
  await cardsPath.collection("about").doc("points").update(points);
  showPointsInHtml(points);
  return points;
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







export { stopwatchPointsInit, updatePoints, countCards };