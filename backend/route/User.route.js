const User = require('../model/User.model');
const express = require('express');
const  jwt = require('jsonwebtoken');

const app = express.Router();



// this is for getting the all the user who register to our website
app.get("/", async (req, res) => {

    try {
      let allUsers = await User.find();
       return res.send({ message: "signups", data: allUsers });
    } catch (e) {
      console.log(e);
      return res.status(404).send({ error: 'Something went wrong in getting all user' });
    }
  });


// this is the signup api, he user can register himself but before that we are checkin that if user already exist or not if yes show them the message that you are alredy register with this email id
app.post('/signup', async (req, res) => {
    try {
        const { name,email, password} = req.body;
        const getuser = await User.findOne({ email });

        // here we are checking if given email is already exist or not if that email is already in database then we are showing then alert that this email is already used by some user
        if (getuser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        else{
          // if email is fresh then we are creating a new user account with given details
          const user = await User.create({ name,email,password});
          console.log('user: ', user);
          return res.status(201).send({ message : 'User Registered Successfully' });
        }
           
        } catch (error) {
        return res.status(404).send({ error: 'Something went wrong' });
    }
});


// it is the login API where user can login to their account and we can send JWT token but before that we are checking that user exist or not or have same password or not
app.post('/login',async (req, res) => {
    const { email, password } = req.body;
    console.log('req.body: ', req.body);
    try {
        const user = await User.findOne({ email });
        console.log('user: ', user);

        //here we are checking if user exist or not if user does not exit then we are showing them a message that with this email Id there is no account so please register first
        if (!user) {
            return res.status(400).send({ message: 'User does not exist, Please register First' });
        }

        // if(password.length<=8){
        //   return res.status(400).send({ message: 'Password must be at least of 8 Character Long' });
        // }

        // here we are checking the request password is matching or not matching to the user email password, if they are not matched then we are showing them message that your typed password in incorrect please type correct password
        if (user.password !== password) {
            return res.status(400).send({ message: 'Password is incorrect, Please Check again' });
        }

        // here we are creating a token with the help of JWT and putting the informatin of the user 
        const token = jwt.sign({ _id: user._id, name:user.name, email:user.email}, 'SECRET1234', { expiresIn: '5000' });
        // res.cookie("usercookie",token,{
        //   expires:new Date(Date.now()+9000000),
        //   httpOnly:true
        // }); 
        return res.status(200).send({ message: 'Login successful' , token, user : user.name, userData:user});
    } catch (error) {
        return res.status(404).send({ message : 'Something went wrong' });
    }
});


app.post("/userData", async (req, res) => {
  const { token } = req.body;
  console.log('object-',token)
  try {
    const user = jwt.verify(token, 'SECRET1234', (err, res) => {
      if (err) {
        console.log(err)
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", message: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});


module.exports = app;