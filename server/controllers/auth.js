require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/config');



const defaultViewController = (request, response) => {
  response.send('Front Page')
}

const signupController = (request, response) => {
  // destructure the require.body
  const {username, email, password} = request.body;

  // console.log(`username: ${username} email: ${email} password: ${password}`)

  // if user did not input username, email or password, return the json message
  if(!username || !email || !password){
    return response.status(422).json('Please add all fields!')
  }
  // checks mongoDB to see if user with that specific email already exists in the database
  User.findOne({email: email})
  // if true, return with error message
    .then((savedUser) => {
      if(savedUser){
        return response.status(422).json('User already exists with that email. Try another one')
      } else {
        // if new email, hash the password and save the user to the database using the User model schema
        bcrypt.hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              username: username,
              email: email,
              password: hashedPassword
            })
            // save the newly created user into the database
            user.save()
              .then(user => {
                response.json('User saved successfully')
              })
              .catch(error => {
                console.log(error)
              })
          })
      }
    })
    .catch(error => {
      console.log(error)
    })
};

const signinController = (request, response) => {
  const {email, password} = request.body;

  // if missing email or password, return general error message
  if(!email || !password){
    return response.status(422).json('Invalid credentials')
  } else {
    // checks the mongoDB and determines whether the user already signed up with that email
    User.findOne({email: email})
      .then(savedUser => {
        // console.log(savedUser)
        // if no user with that specific email, return error message
        if(!savedUser){
          console.log('user does not exist')
          return response.status(422).json('invalid credentials')
        } else {
          bcrypt.compare(password, savedUser.password)
            .then(itMatches => {
              // console.log(itMatches)
              if(itMatches){
                // create payload for jwt token
                const payload = {
                  user: {
                    _id: savedUser._id
                  }
                };
                // create jwt token
                const token = jwt.sign(payload, JWT_SECRET);
                // destructure the savedUser data
                const {_id, username, email, role} = savedUser;
                // console.log(token)
                response.json({token: token, user:{_id, username, email, role}})
              } else {
                return response.status(422).json('Invalid credentials')
              }
            })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
};

module.exports={
  defaultViewController,
  signupController,
  signinController
}