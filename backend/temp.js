
const express=require("express");
const bodyParser=require("body-parser");
const multer = require("multer");
const cors =require("cors");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const fs=require("fs");

const app=express()
const SecretKey='sdskfjaldsfjdsfjdskdslafa';
const verifyToken=require("../Backend/verifyToken");
app.use(cors({
  origin:["http://localhost:3000"],
  method:["GET","POST"],
  credentials:true,
}))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    key:"userId",
    secret:"subscribe",
    resave:false,
    saveUninitialized:false,
    cookie:{
      expires:60*60*24,
    }
  })
)
 
const dburl = "mongodb://127.0.0.1:27017/mydatabase7";
//const dburl="mongodb+srv://Prashanth:Stevesmith%4012%2B@cluster0.6ioio77.mongodb.net/ProjectLoginData?retryWrites=true&w=majority";
mongoose.connect(dburl, {useNewUrlParser: true})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start your application or perform database operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
});

// const UserSchema=new mongoose.Schema({
//     username:String,
//     name:String,
//     password:String,
//     mobile:String
// })

// const User=new mongoose.model("User",UserSchema);

const SellSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  isFree: Boolean,
  bookImage: {
    data: Buffer,
    contentType:String,
  },
});

// Define the UserSchema and include the arrays of SellSchema objects for sold and purchased books
const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  mobile: String,
  soldBooks: [SellSchema], // Array of SellSchema objects for sold books
  purchasedBooks: [SellSchema], // Array of SellSchema objects for purchased books
});

// Create models from the schemas
const User = mongoose.model("User", UserSchema);
const Sell = mongoose.model("Sell", SellSchema);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
});

const upload=multer({storage:storage});

// Route to handle file upload
// Import the User model
app.post("/upload", upload.single("bookImage"), async (req, res) => {
  console.log("sdf");
  // Get the book details from the request body
  const { bookInfo } = req.body;
  const { title, description, price, isFree } = bookInfo;
  // Use req.file.buffer to access the file data
  console.log(req.file);
  const bookImage = { // Corrected: Assign the bookImage object correctly
    data: fs.readFileSync(`uploads/${req.file.filename}`),
    contentType: "image/jpg",
  };
  // Get the user ID from the request headers (you'll need to pass the user ID in the headers from the frontend)
  const userId = req.headers.userid;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Create a new sold book object
    const newSoldBook = {
      title,
      description,
      price,
      isFree,
      bookImage,
    };

    // Push the sold book object to the soldBooks array of the user
    user.soldBooks.push(newSoldBook);

    // Save the updated user data to the database
    await user.save();
    console.log(newSoldBooK);
    // Respond with a success message
    res.json({ status: true, message: "Book details saved successfully" });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error saving book details:", error);
    res.status(500).json({ status: false, message: "An error occurred" });
  }
});


app.get("/",(req,res)=>{
    res.send("My APi");
})

// Endpoint to handle book information upload


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

app.get('/getinfo/:token',async(req,res) => {
  try{
     let token = req.params.token; 
     let data = await jwt.verify(token,SecretKey);
     // {_id:existUser._id,username:existUser.username}

     let user = await User.findById(data._id);

     res.json(user);

  }
  catch(e){
    res.status(500).json({status:false,msg:e.message,e});
  }
})

app.get("/login",(req,res)=>{
  if(req.session)
  {
    res.status(200).json({loggedIn:true,user:req.session.username});
  }
  else{
    res.status(200).json({loggedIn:false});

  }
})
app.post("/login",async(req,res)=>{
  try{
          const existUser = await User.findOne({
          username:req.body.username
      });
      if (!existUser ) {
        return res.status(500).json({ status: false, error: "user not found" });
      }
      if (existUser ) {
      if(req.body.password===existUser.password)
      {
        console.log(existUser);
         const authToken=jwt.sign({_id:existUser._id,username:existUser.username},SecretKey,{
           expiresIn:'1h'
         })
        return res.status(200).json({ status: true,data:{existUser,authToken} });
      }
      else{
        return res.status(500).json({ status: false, error: "login  failed" });
      }
 }
  }
 catch(error)
 {
    return res.status(500).json({ status: false, error: error });
 }
})

app.get('/dashboard',verifyToken,async(req,res)=>{
  if(req && req.decodedToken){
    req.json({status:'ok',data:'ok'})
  }
  else{
    req.json({status:'error',data:'error'});
  }
})
app.listen(9002,()=>{
    console.log("Be Started at");
})