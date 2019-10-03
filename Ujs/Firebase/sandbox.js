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


//F update HTML
function updateHTML() {
  db.collection('recipes').get().then((recipesDataCollection) => {
    list.innerHTML = '';
    recipesDataCollection.docs
      .forEach(doc => {
        console.log(doc.data());
        addRecipe(doc.data(), doc.id);
      })
  }).catch((err) => {
    console.log(err)
  })
}

updateHTML();

// get collection "recepies" from the database and show whole objects in the dom and some parts in html






// after user submits the form...
form.addEventListener('submit', e => {
  e.preventDefault();

  // Add recipe object into the firebase database
  // - 1.- create object
  console.log(form.recipe.value);
  let now = new Date();
  let recipeToAdd = {
    title: form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  }
  console.log(recipeToAdd);

  //  2.- save object to firebase
  db.collection('recipes').add(recipeToAdd)
    .then(() => console.log('Recipe added.')).catch((err) => { console.log(err) })


  updateHTML();
})




// listen to click on delete button
list.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const idToDelete = e.target.parentElement.parentElement.getAttribute('data-id');
    console.log(idToDelete);
    db.collection('recipes').doc(idToDelete).delete()
      .then(() => console.log('deleted in Firebase.'))
      .catch((err) => console.log(err));

    updateHTML();
  }
})