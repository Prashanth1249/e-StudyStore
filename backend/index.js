const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nodemailer = require('nodemailer');
const fs = require("fs");
const path = require("path");
const app = express()
const SecretKey = 'sdskfjaldsfjdsfjdskdslafa';
const verifyToken = require("../Backend/verifyToken");
app.use(cors({
  origin: ["http://localhost:3000"],
  method: ["GET", "POST"],
  credentials: true,
}))
const staticPath = path.join(__dirname, "./public/");
console.log(staticPath);
app.use(express.static(staticPath));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    }
  })
)

const dburl = "mongodb://127.0.0.1:27017/mydatabase7";
//const dburl="mongodb+srv://Prashanth:Stevesmith%4012%2B@cluster0.6ioio77.mongodb.net/ProjectLoginData?retryWrites=true&w=majority";
mongoose.connect(dburl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start your application or perform database operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
  });


const imgSchema = new mongoose.Schema({
  title: String,
  description: String,
  isFree: Boolean,
  price: String,
  imageName: String,
  buyer: String,
});
const pSchema = new mongoose.Schema({
  title: String,
  description: String,
  isFree: Boolean,
  price: String,
  imageName: String,
  seller: String,
});

// Define the UserSchema and include the arrays of SellSchema objects for sold and purchased books
const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  bio: String,
  id: String,
  contact: String,
  mobile: String,
  profilePhoto: String,
  soldBooks: [imgSchema],
  purchaseBooks: [pSchema],
  // Array of SellSchema objects for sold books // Array of SellSchema objects for purchased books
});



// Create the ImageModel using the correct schema
const ImageModel = mongoose.model("Image", imgSchema);
// Create models from the schemas
const User = mongoose.model("User", UserSchema);
const Sell = mongoose.model("Sell", imgSchema);
// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage
}).single('bookImage')
app.post("/upload", upload, async (req, res) => {
  var success = req.file.filename + "uploade";
  try {
    // Create a new Sell object to represent a sold book
    const bookInfo = JSON.parse(req.body.bookInfo); // Parse the JSON string
    console.log(req.file.filename);
    console.log(bookInfo.title); // Now you can access properties like this
    // Rest of your code
    if (bookInfo.isFree) {
      bookInfo.price = '0';
    }
    const newSoldBook = new Sell({
      title: bookInfo.title,
      description: bookInfo.description,
      isFree: bookInfo.isFree,
      price: bookInfo.price,
      imageName: req.file.filename,
      buyer: ""
    });
    // Get the user ID from the headers
    const userId = req.headers.userid;
    // Find the user by ID
    const user = await User.findById(userId);
    console.log(req.file.filename);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }


    // Push the newSoldBook object to the soldBooks array of the user
    user.soldBooks.push(newSoldBook);

    // Save the updated user data to the database
    await user.save();
    console.log('Book details and image saved to user"s soldBooks array');
    res.send('Book details and image are saved');
  } catch (error) {
    console.error("Error saving book details and image:", error);
    res.status(500).send('Error saving book details and image');
  }
})


app.get("/", (req, res) => {
  res.send("My APi");
})

// Endpoint to handle book information upload
app.get('/homebooks', async (req, res) => {
  try {
    const allUsers = await User.find({});

    const matchingImages = [];

    allUsers.forEach(user => {
      user.soldBooks.forEach(book => {
        if (book.buyer === "") {
          matchingImages.push(book);
        }
      });
    });

    res.status(200).json({ status: true, soldImages: matchingImages });
  } catch (error) {
    console.error("Error fetching matching images:", error);
    res.status(500).json({ status: false, message: "Error fetching matching images" });
  }
});



app.post("/register", async (req, res) => {
  const data = new User({
    username: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
    password: req.body.password,
    bio: "RGUKT Student",
    id: "",
    contact: req.body.mobile,
  });
  data.save().then(() => {
    console.log(data);
    res.status(200).json({ status: true, user: data, message: "Successfully Registered " });
  }).catch((err) => {
    res.status(400).json({ status: false, message: "Error Occured" });
    console.log(err);
  })
})

app.get('/getinfo/:token', async (req, res) => {
  try {
    let token = req.params.token;
    let data = await jwt.verify(token, SecretKey);
    // {_id:existUser._id,username:existUser.username}

    let user = await User.findById(data._id);

    res.json(user);

  }
  catch (e) {
    res.status(500).json({ status: false, msg: e.message, e });
  }
})

app.get("/login", (req, res) => {
  if (req.session) {
    res.status(200).json({ loggedIn: true, user: req.session.username });
  }
  else {
    res.status(200).json({ loggedIn: false });

  }
})
app.post("/password", async (req, res) => {
  try {
    let token = req.body.token;
    let data = await jwt.verify(token, SecretKey);
    let user = await User.findById(data._id);

    console.log(user.password + " and " + req.body.currentPassword);

    if (user.password === req.body.currentPassword) {
      if (user.password === req.body.newPassword) {
        res.status(400).json({ status: false, message: "Please do not enter old password" });
        return; // Return after sending the response
      }

      user.password = req.body.newPassword;

      await user.save();
      console.log(data);
      res.status(200).json({ status: true, user: data, message: "Password updated successfully" });
    } else {
      res.status(400).json({ status: false, message: "Please enter correct password" });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
});
app.post("/profilechange", async (req, res) => {
  try {
    console.log(req.body);
    let token = req.body.token;
    let data = await jwt.verify(token, SecretKey);
    let user = await User.findById(data._id);
    user.name = req.body.name;
    user.bio = req.body.bio;
    user.username = req.body.email;
    user.contact = req.body.contact;
    user.mobile = req.body.mobile
    user.id = req.body.id;
    await user.save();
    console.log(data);
    res.status(200).json({ status: true, user: data, message: "Profile updated successfully" });
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const existUser = await User.findOne({
      username: req.body.username
    });
    if (!existUser) {
      return res.status(500).json({ status: false, error: "user not found" });
    }
    if (existUser) {
      if (req.body.password === existUser.password) {
        console.log(existUser);
        const authToken = jwt.sign({ _id: existUser._id, username: existUser.username }, SecretKey, {
          expiresIn: '1h'
        })
        return res.status(200).json({ status: true, data: { existUser, authToken } });
      }
      else {
        return res.status(500).json({ status: false, error: "login  failed" });
      }
    }
  }
  catch (error) {
    return res.status(500).json({ status: false, error: error });
  }
})

app.get('/dashboard', verifyToken, async (req, res) => {
  if (req && req.decodedToken) {
    res.json({ status: 'ok', data: 'ok' })
  }
  else {
    res.json({ status: 'error', data: 'error' });
  }
})

app.get('/productpage/:token', async (req, res) => {
  try {
    let token = req.params.token;
    let data = await jwt.verify(token, SecretKey);
    let currentUser = await User.findById(data._id);

    const allUsers = await User.find({ _id: { $ne: currentUser._id } });

    const allSoldImages = allUsers.reduce((soldImages, user) => {
      // Include sold books where the buyer's field is an empty string
      const filteredSoldBooks = user.soldBooks.filter(book => book.buyer === "");

      soldImages.push(...filteredSoldBooks);
      return soldImages;
    }, []);

    res.status(200).json({ status: true, soldImages: allSoldImages });
  } catch (error) {
    console.error("Error fetching all sold images:", error);
    res.status(500).json({ status: false, message: "Error fetching sold images" });
  }
});

app.post('/send-email', async (req, res) => {
  console.log(req.body);
  let {userEmail,uname, mobile ,id,sellerEmail, bookName ,bname} = req.body;
  bname=req.body.bname;
  try {
    const userWithImage = await User.findOne({ 'soldBooks.imageName': bookName });
    if (!userWithImage) {
      return res.status(404).json({ status: false, message: "User with the provided image not found" });
    }
    const updatedBook = await User.findOneAndUpdate(
      { 'soldBooks.imageName': bookName },
      { $set: { 'soldBooks.$.buyer': id } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ status: false, message: "Book not found" });
    }

    const sellerUserEmail = userWithImage.username;
    console.log(sellerUserEmail);
    console.log(bname);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GOOGLE_USERNAME, // Replace with your Gmail email
        pass: process.env.GOOGLE_PASSWORD, // Replace with your Gmail password
      },
    });
    const mailOptions = {
      from: 'estore.busines@gmail.com',
      to: sellerUserEmail, // Send the email to the sellerEmail, not a hardcoded email address
      subject: 'Book Purchase Inquiry',
      text: `User ${uname} is interested in purchasing the book ${bname} listed by you. Please contact them at email: ${userEmail} and contact: ${mobile} for further details.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ status: false, message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({ status: true, message: `Email sent to ${sellerUserEmail} regarding book: ${bookName}` });
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ status: false, message: "Error sending email" });
  }
});

app.get('/profile/order/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const data = await jwt.verify(token, SecretKey);
    const currentUser = await User.findById(data._id);

    const allUsers = await User.find({ _id: { $ne: currentUser._id } });

    const matchingImages = [];

    allUsers.forEach(user => {
      user.soldBooks.forEach(book => {
        if (book.buyer === currentUser._id.toString()) {
          matchingImages.push(book);
        }
      });
    });
    console.log("m" + matchingImages + "m");
    res.status(200).json({ status: true, matchingImages });
  } catch (error) {
    console.error("Error fetching matching images:", error);
    res.status(500).json({ status: false, message: "Error fetching matching images" });
  }
});


app.get('/profile/sell/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const data = await jwt.verify(token, SecretKey);
    const currentUser = await User.findById(data._id);
    console.log("f" + currentUser + "f");

    console.log("Matching Images:", currentUser.soldBooks);

    res.status(200).json({ status: true, soldBooks: currentUser.soldBooks });
  } catch (error) {
    console.error("Error fetching matching images:", error);
    res.status(500).json({ status: false, message: "Error fetching matching images" });
  }
});
const profilePhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const profilePhotoUpload = multer({
  storage: profilePhotoStorage
}).single('file'); // The 'file' fieldname should match the form field name on the frontend

// ... (other routes)

app.post("/uploadProfilePhoto", profilePhotoUpload, async (req, res) => {
  try {
    console.log(req.file.filename);

    // Perform necessary operations here, like saving the image details to the user's profile
    const userId = req.headers.userid;
    const user = await User.findById(userId);

    // Update user's profile photo information
    user.profilePhoto = req.file.filename;
    await user.save();

    console.log("Profile photo uploaded and user data updated");

    res.status(200).json({ status: true, message: "Profile photo uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ status: false, message: "Error uploading profile photo" });
  }
});

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
// Define a schema for storing OTPs
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiry: Date,
});

// Create a model using the schema
const OTPModel = mongoose.model('OTP', otpSchema);

// Send OTP for email verification
app.post('/send-verification-otp', async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    console.log(email);
    const existingOTP = await OTPModel.findOne({ email });
    console.log(existingOTP);
    if (existingOTP && existingOTP.expiry > Date.now()) {
      console.log("sent");
      try{
       return res.status(400).json({ status: false, message: 'OTP has already been sent. Please wait before requesting another.' });
      }
      catch(e)
      {
        console.log(e);
       }
    }
    const otp = generateOTP();
    const otpData = new OTPModel({
      email,
      otp,
      expiry: new Date(Date.now() + 600000), // OTP expires after 10 minutes
    });
    await otpData.save();
    console.log(otp);
    const transporter = nodemailer.createTransport({
  //     host: smtp.gmail.com,
  // port:465,
  // secure: false,
      service: 'Gmail',
      auth: {
        user: process.env.GOOGLE_USERNAME, // Replace with your Gmail email
        pass: process.env.GOOGLE_PASSWORD, // Replace with your Gmail password
      },
    });
    const mailOptions = {
      from: process.env.GOOGLE_USERNAME, // Replace with your Gmail email
      to: 'prshanth.pottrola@gmail.com',
      subject: 'Book Purchase Inquiry',
      text: `This is your veification OTP ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: false, message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ status: true, message: `otp sent to  the mail ${email}` });
      }
    });
  } catch (error) {
    console.error('Error sending verification OTP:', error);
    res.status(500).json({ status: false, message: 'Error sending verification OTP' });
  }
});

app.post('/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("comming3");
    const storedOTP = await OTPModel.findOne({ email });
    console.log(storedOTP);
    console.log(otp);
    console.log(storedOTP.expiry < Date.now());
    if (!storedOTP || storedOTP.expiry < Date.now() || storedOTP.otp !== otp) {
      return res.status(400).json({ status: false, message: 'Invalid OTP' });
    }
    // Mark the email as verified in the database (you can update your User model)
    res.status(200).json({ status: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    res.status(500).json({ status: false, message: 'Error verifying email OTP' });
  }
});




app.listen(9002, () => {
  console.log("Be Started at");
})