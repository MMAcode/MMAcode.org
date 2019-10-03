const list = document.querySelector('ul');
const form = document.querySelector('form');

// F-f add recipe to html
const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();
  let html = `
    <li data-id="${id}">
      <div>${recipe.title}</div>
      <ul>
        <li>Author: ${recipe.author}</li>
        <li>Created at: ${time};</li>
        <button class="btn btn-danger btn-sm my-2">Delete</button>
      </ul>
    </li>
    `;
  list.innerHTML += html;
}

// F delete recipe from HTML
function deleteRecipe(id) {
  const foundRecipe = list.querySelector(`li[data-id="${id}"]`);
  console.log("This recipe is going to be deleted from HTML:", foundRecipe);
  foundRecipe.remove();
  // db.collection('recipes').doc()
}  


//F update HTML
db.collection('recipes').onSnapshot((snapshot) => {
  console.log(snapshot);
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => {
    const doc = change.doc;
    if (change.type === 'added') {
      addRecipe(doc.data(), doc.id)
    }
    else if (change.type === 'removed') {
      deleteRecipe(doc.id);
    }
  });
})





// after user submits the form...
form.addEventListener('submit', e => {
  e.preventDefault();

  // Add recipe object into the firebase database
  // - 1.- create object
  console.log(`Value to add to new recipe: ${form.recipe.value}`);
  let now = new Date();
  let recipeToAdd = {
    title: form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  }
  console.log("New recipe object created: ", recipeToAdd);

  //  2.- save object to firebase
  db.collection('recipes').add(recipeToAdd)
    .then(() => {
      console.log('Recipe added.');
    }).catch((err) => { console.log(err) })


})




// Delete item in firebase
list.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const idToDelete = e.target.parentElement.parentElement.getAttribute('data-id');
    console.log(idToDelete);
    db.collection('recipes').doc(idToDelete).delete()
      .then(() => console.log('deleted in Firebase.'))
      .catch((err) => console.log(err));
  }
})