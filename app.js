//setting the module express as a const
const express = require('express');
//setting the middleware body-parser as a const
const bodyParser = require('body-parser');
//adding a pointer to the file query.js in the db file
const db = require('./db/query');
//adding a flexible const that defines our port as either 3000 or our env port
const port = process.env.PORT || 3000;
//calling the express app and referring to it as app
const app = express();

//telling express to use body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//route for a post on '/api/users'
app.post('/api/users', (req, res, next) => {
  //envokes the function createUser from the db page (./db/query.js)
  db.createUser(req.body)
    //on a successful run through, sends a 201 and user data as a json
    .then(user => res.status(201).json(user))
    //on a failed run through, returns a 500 and the error message
    .catch(err => res.status(500).send(err));
});

//route for a post on '/api/users/login'
app.post('/api/users/login', (req, res, next) => {
  //runs the login function from the db page
  db.login(req.body.code)
    //on success run this .then
    .then(user => {
      //if the response is undefined, send a 401
      if (!user) {
        res.sendStatus(401);
        //if the response is not undefined, send them user data
      } else {
        res.json(user);
      }
      //on failure, send the 500 status and error
    }).catch(err => {
      res.status(500).send(err);
    });
});

//route for a get request on /api/users/ with an id
app.get('/api/users/:id', (req, res, next) => {
  //sets two const's with the data we got sent: code and id
  const code = req.query.code;
  const id = req.params.id;
  //runs the funciton getUserById from the db page
  db.getUserById(id)
    //on success run this .then
    .then(user => {
      //if the user is returned as undefined, return 401
      if (!user) {
        res.sendStatus(401);
        //if the user returns but the code is incorrect, return 401
      } else if (user.code !== code) {
        res.sendStatus(401);
        //if the user exists and the code is correct, send the user data as a json
      } else {
        res.json(user);
      }
    })
    //on failed run, send 500 status and error
    .catch(err => res.status(500).send(err));
});

//listens on the port, which will be either env.port or 3000.
app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
