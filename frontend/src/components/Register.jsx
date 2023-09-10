import React, { useState } from 'react';
import { Fragment } from 'react';
import { Typography, Paper, TextField, Button } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom' ;
const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false); // To track if verification email has been sent
  const [otp, setOTP] = useState(''); // To store the entered OTP
  const [verificationError, setVerificationError] = useState('');
  const [emailVerified,setEmailVerifed]=useState(false);
  const paperStyle = {
    width: '50%',
    margin: 0,
    padding: '2rem',
    height: '600px',
    marginTop: '6rem',
    marginRight: '2%',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const buttonContainerStyle = {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
  };
  const navigate = useNavigate();
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
      setError('Please fill in all the fields');
      return;
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setError('Invalid mobile number');
      return;
    } else {
      console.log('Registration successful');
      console.log('Full Name:', fullName);
      console.log('Email:', email);
      console.log('Mobile Number:', mobileNumber);
      console.log('Password:', password);
      // Perform registration logic here
      setError('');
      const user = {
        name: fullName,
      email: email,
      mobile: mobileNumber,
      password: password,
      };
    try{
      const {data} = await  axios.post("http://127.0.0.1:9002/register",user,{validateStatus:false});
      console.log(data); // Log the acknowledgment message
      console.log(data.status);
      if (data.status === true) {
        console.log(user);
        navigate("/login");
      } else {
        setError(data.error);
        console.log(data.error);
      }
    } catch (error) {
      console.error(error);
    }
      }
  };
  const handelMainEvent = async () => {
    const { data } = await axios.get("http://localhost:9002/checkAuthentication");
    navigate("/login");
    console.log(data);
  }
  return (
    <Fragment>
      <Paper style={paperStyle}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form style={formStyle} onSubmit={handleFormSubmit}>
  <TextField
    label="Full Name"
    required
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
  />
  <TextField
  label="Email"
  type="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)} // Disable if verification is sent or email is verified
/>
  <TextField
    label="Mobile Number"
    type="text"
    required
    value={mobileNumber}
    onChange={(e) => setMobileNumber(e.target.value)}
  />
  <TextField
    label="Password"
    type="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <TextField
    label="Confirm Password"
    type="password"
    required
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  {error && <Typography variant="body2" color="error">{error}</Typography>}
  <div style={buttonContainerStyle}>
    <Button variant="contained" color="primary" type="submit" >
      Register
    </Button>
    <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>
      Login
    </Button>
  </div>
</form>

      </Paper>
    </Fragment>
  );
};

export default RegisterPage;


