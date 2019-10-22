// let cards = db.collection('FlipCards');

let cardID = '0CyQm2uc7EZSZXl4JboK';
let getAllButtonHtml = document.querySelector('#updateAllCardsButID');
let userID = '';


let getCard = async (cardPath) => {
  let cardReceived = await cardPath.get();
  let cardData = cardReceived.data();
  return cardData;
}




let changeCard = async (card, path) => {
  // console.log(card);
  await path.update({
    // languageNative: card.czWord,
    // languageNative: card.enWord,
    // languageToLearn: card.czWord,
    // languageToLearn: card.enWord,
    // justFun: firebase.firestore.FieldValue.delete(),
    // czWord: card.languageNative,
    // enWord: card.languageToLearn
    // fieldName: firebase.firestore.FieldValue.delete()
    // czCheck: firebase.firestore.FieldValue.delete(),
    czWord: firebase.firestore.FieldValue.delete(),
    enWord: firebase.firestore.FieldValue.delete(),
    // native: firebase.firestore.FieldValue.delete(),
    // toLearn: firebase.firestore.FieldValue.delete()

  });

}



let getAllBtnClicked = (cards) => {
  console.log('btn clicked');
  console.log(cards);

  cards.get().then(cardsData => {
    cardsData.docs.forEach(doc => {
      console.log(doc.data());
      console.log(doc.id);
      let pathToCard = cards.doc(doc.id);

      if (doc.id != userID) {
        changeCard(doc.data(), pathToCard);


      } else { console.log('this is user object'); }

    })
  });
}





auth.onAuthStateChanged(user => {
  if (user) {
    console.log(`Enjoy ${user.email}`);
    let cards = db.collection(user.uid);
    userID = user.uid;
    let pathToTestCard = cards.doc(cardID);

    // getCard(pathToTestCard).then(testCard => {
    //   changeCard(testCard, pathToTestCard);
    // });


    // getAllButtonHtml.addEventListener('click', () => { getAllBtnClicked(cards) });




  }
  else { console.log('noone logged in'); }
});






