function User(username, email){
  this.username = username;
  this.email = email;
  this.login = function(){
    console.log(`${this.username} has logged in`);
  };
}

const userOne = new User('ryu', 'ryu@thenetninja.co.uk');
const userTwo = new User('chun-li', 'chun.li@thenetninja.co.uk');