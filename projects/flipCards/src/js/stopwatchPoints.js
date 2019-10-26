// import { cards, userID } from './bundle';


let createUserVariablesInFBifNeeded = async (user) => {
  if (user.xyz == undefined) {

  }
  if (user.xyz == undefined) {

  }
  if (user.xyz == undefined) {

  }
  if (user.xyz == undefined) {

  }
}






let StopwatchPoints = async (cards, userID) => {
  // console.log('1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  // console.log('S stopwatchPoints initiated');
  // console.log('S', cards);
  // console.log('S', userID);
  let userDoc = await cards.doc(userID).get();
  console.log('2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  let userData = userDoc.data();
  // console.log('S', userData);
  console.log('SS', userData.langToLearn);
  // console.log('SSS', userDoc.data().langToLearn);
  console.log('S', userData.LangToLearnXXX);

  let createdUserCard = await createUserVariablesInFBifNeeded(userData);





  // cards.doc(doc.id).update({ due: true }).then(function () { console.log('XXXXXXXXupdating "due status" finishedXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); });

}




export { StopwatchPoints };