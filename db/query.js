//adding a pointer to the page ./connection.js and referring to it as db
const db = require('./connection');

//function creates a user
function createUser(user) {
  //runs the function generateRandomString() and sets the return value as code
  const code = generateRandomString();
  //sets the value (code) to the object key user.code
  user.code = code;
  //insert user into the table site-users and return the id and code of that user
  return db('site-users').insert(user).returning(['id', 'code']);
}

//gets a user by id
function getUserById(id) {
  //goes into the table site-users and finds the first object where the 'id' value is equal to the (id) passed to us in the function
  return db('site-users').first().where('id', id);
}

//this function "generates a random string"
function generateRandomString() {
  //returns the "random string" 'abcd'
  return 'abcd';
}

//this function returns code when user logs in
function login(code) {
  //selects all data from the table site-users. Then returns the objects that's 'code' key value is equal to the (code) passed to the function
  return db('site-users').select().where('code', code);
}

//exports all the functions for use on other pages by using require
module.exports = {
  createUser,
  getUserById,
  login
};
