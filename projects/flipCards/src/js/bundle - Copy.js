let now = new Date().getTime();
let dueCount = 0;
let toLearnCount = 0;
const cards = db.collection('FlipCards');
const currentCardS = null;
let currentCard = {};
let currentCardID = null;
const refresh = document.querySelector('#test');



//F count "to learn" cards
let countToLearnCards = () => {
  toLearnCount = 0;
  console.log('counting "to learn" elements:');

  cards.where('mainStage', '==', 'to learn').get()
    .then(data => {
      data.docs.forEach(doc => toLearnCount++);
      console.log('to learn counted:', toLearnCount);
    })
    .catch(err => { console.log(err) });
};

//F 
let getCardFromToLearn = () => {
  console.log('getting card from TO LEARN.');
  cards.where('mainStage', '==', 'to learn').get()
    .then(data => {
      currentCard = data.docs[0].data();
      currentCardID = data.docs[0].id;
      console.log('Card from "to learn" cards:');
      console.log(currentCard);
      console.log(currentCardID);
    })
    .catch(err => { console.log(err) });
}








// count DUE cards


let updateDuesAndGetOne = () => {
  // counting -try to sort...
  now = new Date().getTime();
  // update data in firebase and count due times

  // -- update and count due cards
  // updateAndCountDues();
  cards.get()
    .then((data) => {
      dueCount = 0;
      console.log('counting all using length property:', data.docs.length);

      data.docs.forEach(doc => {
        let card = doc.data();
        if (card.dueTime < now) {
          cards.doc(doc.id).update({ due: true });
          dueCount++;
        } else {
          cards.doc(doc.id).update({ due: false });
        }
      });
      console.log(`dueCount = ${dueCount}.`);

      // set most current "due" card
      if (dueCount > 0) {
        cards.where('due', '==', true).orderBy('lastSeen').get()
          .then(data => {
            currentCard = data.docs[0].data();
            currentCardID = data.docs[0].id;
            console.log('Most current Due card:');
            console.log(currentCard);
            console.log(currentCardID);
          })
          .catch(err => { console.log(err) });
      }
      else {
        // check there is sht. in "to learn" pile
        countToLearnCards().then(() => {
          console.log('after  countToLearnCards finished');
          console.log(toLearnCount, 'from main');
          if (toLearnCount > 0) { getCardFromToLearn(); }
          else {
            alert('There are no cards "to learn". Add/make more cards.');
          };
        });
      }

    }).catch((err) => { console.log("error retrieving data from server: ", err); })



}



// on REFRESH click...
refresh.addEventListener('click', e => {
  updateDuesAndGetOne().then(() => {
    console.log('after "updateDuesAndGetOneCard" FUNTION');
    console.log(currentCard);
    console.log(currentCardID);
  });
});












