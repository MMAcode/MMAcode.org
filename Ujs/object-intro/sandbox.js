let user = {
  name: 'Mirecek',
  age: 30,
  email: 'secret@email.com',
  location: 'berlin',
  skills: [{
      title: 'HTML',
      description: 'html5, html forms, nevim...',
      hoursP: 150
    },
    {
      title: 'CSS',
      description: 'grid, flex-box, responsive units (rem,vw,%), animations, transformations, shape-outside,... ',
      hoursP: 100
    },
    {
      title: 'SASS',
      description: 'nesting, variables, functions, extending',
      hoursP: 80
    }
  ],


  login: function () {
    console.log('The user logged in.');
  },
  logout() {
    console.log('The user logged out.');
  },
  logSkills() {
    console.log(`${this.name} has following skills:`);
    this.skills.forEach((object, index) => {
      console.log(`${index + 1}. ${object.title}:`);
      console.log(`${object.description}`);
      console.log(`Hours practiced: ${object.hoursP}`);
      console.log(``);
    })
  }
}
user.logSkills();



console.log(Math);
let x = 4.27236;
console.log(Math.floor(x));
console.log(Math.trunc(x));
console.log(Math.round(Math.random()*10));
