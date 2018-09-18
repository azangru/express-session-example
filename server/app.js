const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const SECRET = 'foo';
const DATABASE_NAME = 'example';
const PORT = 3001;

const app = express();

app.use(cookieParser(SECRET));

app.use(session({
    secret: SECRET,
    store: new MongoStore({
      url: `mongodb://localhost:27017/${DATABASE_NAME}`,
    }),
    resave: false,
    saveUninitialized: false
}));

app.get('/', function(req, res) {
  // add any field to the session as if it were a setter
  // (the session will be saved to session storage, e.g. Mongo)
  req.session.user = { lol: 42 };

  // notice that the session is updated and now contains the user field
  console.log('session', req.session);

  // data stored in the cookie (e.g. session id) can be accessed
  // via the signedCookies field on the req object
  console.log('cookie contents', req.signedCookies);

  // respond with whatever necessary
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
