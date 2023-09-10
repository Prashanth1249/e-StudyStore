// import { express } from "express";
// const e = require('express')
const express=require("express");
const bodyParser=require("body-parser");
// import cors from "cors";
const cors =require("cors");
// import mongoose from "mongoose";
const mongoose=require("mongoose");
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");

const app=express()
// app.use(express.json())
// app.use(express.urlencoded())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize());
app.use(passport.session());
 
const dburl = "mongodb://127.0.0.1:27017/mydatabase6";
//const dburl="mongodb+srv://Prashanth:Stevesmith%4012%2B@cluster0.6ioio77.mongodb.net/ProjectLoginData?retryWrites=true&w=majority";
mongoose.connect(dburl, {useNewUrlParser: true})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start your application or perform database operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
});

const UserSchema=new mongoose.Schema({
    username:String,
    name:String,
    password:String,
    mobile:String
})
UserSchema.plugin(passportLocalMongoose);
const User=new mongoose.model("User",UserSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
app.get("/",(req,res)=>{
    res.send("My APi");
})


// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res.status(500).json({ status: false, error: "An error occurred during login" });
//     }
//     if (!user) {
//       return res.status(401).json({ status: false, error: "Invalid email or password" });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.status(500).json({ status: false, error: "An error occurred during login" });
//       }
//       return res.status(200).json({ status: true, user: user, message: "Login successful" });
//     });
//   })(req, res, next);
// });

// app.post("/register", function(req, res) {
//   User.register(new User({ username: req.body.email, name: req.body.name,mobile:req.body.mobile }), req.body.password, function(err, user) {
//     if (err) {
//       return res.json({ status: false, error: "Your account could not be saved. Error: " + err });
//     } else {
//       passport.authenticate("local")(req, res, function(err) {
//         if (err) {
//           return res.status(500).json({ status: false, error: "An error occurred during authentication." });
//         } else {
//           console.log("auth"+req.isAuthenticated());
//           return res.status(200).json({ status: true, user: user, message: "Successfully Registered with auth" });
//         }
//       });
//     }
//   });
// });
app.post("/register",async(req,res)=>{
      const data=new User({
        username:req.body.email,
        name:req.body.name,
        mobile:req.body.mobile,
        password:req.body.password,
    });
      data.save().then(()=>{
      console.log(data); 
      res.status(200).json({status:true,user:data,message:"Successfully Registered "});
      }).catch((err)=>{
      res.status(400).json({status:false,message:"Error Occured"});
      console.log(err);
      })
})

app.post("/registered", async(req, res) => {
  try {
    const data = await User.findOne({ username: req.body.email });
    console.log("Data found");
    console.log(data);
    if (data) {
      return res.status(200).json({ status: false, error: "User Exists" });
    }
  } catch (e) {
    return res.status(500).json({ status: false, error: "Not searched data" });
  }

  try {
    User.register(
      { username: req.body.email, mobile: req.body.mobile, name: req.body.name, active: false },
      req.body.password,
      function(err, user) {
        if (err) {
          console.log('manaerror' + err);
          return res.status(500).json({ status: false, error: "An error occurred during registration." });
        } else {
          passport.authenticate("local")(req, res, function(err) {
            if (err) {
              return res.status(500).json({ status: false, error: "An error occurred during authentication." });
            } else {
              console.log("auth"+req.isAuthenticated());
              return res.status(200).json({ status: true, user: user, message: "Successfully Registered with auth" });
            }
          });
        }
      }
    );
    return res.status(200).json({ status: true, message: "Successfully Registered without auth" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false, error: "Registration failed" });
  }
});
app.post("/login",async(req,res)=>{
  console.log("how are you");
  console.log(req.body.username);
  try{
          const data = await User.findOne({
          username:req.body.username
      });
      console.log("data is"+data);
      if (!data) {
        return res.status(500).json({ status: false, error: "user not found" });
      }
      if (data) {
      if(req.body.password===data.password)
      {
        return res.status(200).json({ status: true, error: "login Success" });
      }
      else{
        return res.status(500).json({ status: false, error: "login  failed" });
      }
 }
  }
 catch(error)
 {
    return res.status(500).json({ status: false, error: "Registration failed" });
 }
})
app.listen(9002,()=>{
    console.log("Be Started at");
})