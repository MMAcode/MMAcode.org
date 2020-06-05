let urlRoot;
if (process.env.NODE_ENV === "production") { urlRoot = 'https://mern-express-heroku.herokuapp.com'; }
else { urlRoot = 'http://localhost:3001'; }

export default urlRoot;