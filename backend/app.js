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
// app.use(express.urlencoded())cd
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
 
const dburl = "mongodb://127.0.0.1:27017/mydatabase4";
//const dburl="mongodb+srv://Prashanth:Stevesmith%4012%2B@cluster0.6ioio77.mongodb.net/ProjectLoginData?retryWrites=true&w=majority";
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start your application or perform database operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
});

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    password:String,
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

 app.post("/login",async(req,res)=>{
    console.log("how are you");
    const { email, password} = req.body
    try{
            const data = await User.findOne({
            email:email
        });
        if (!data) {
            console.log( "User not registered")
        }
        if (data) {
        if(password===data.password)
        {
            console.log("Login Successfull")
        }
        else{
            console.log( "Password didn't match")
        }
   }
    }
   catch(error)
   {
    console.log(error);
   }
})

app.post("/register", async(req, res)=> {
   // const { name, email, password,phone} = req.body;
    console.log("req"+req);
    const{ name,email,mobile,password} =req.body;
    //console.log(name+email+password+mobile);
    console.log(req.body);
    try{
     const data = await User.findOne({
        email:email
       });
     console.log("Data founds");
       if (data) {
        res.status(400).json({status:false,message:"User Exists"});
       }
       else{
          const data=new User({
                  name:req.body.name,
                  email:req.body.email,
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
        }
    }
    catch(errors)
    {
      res.status(500).json({status:false,message:"Internal Server Error"});
     console.log("error");
   }
}) 


app.listen(9002,()=>{
    console.log("Be Started at");
})