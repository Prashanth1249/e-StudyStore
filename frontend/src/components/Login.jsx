import React, { useState } from 'react';
import { Fragment } from 'react';
import { Typography, Paper, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom' ;
import { useEffect } from 'react';
import axios from "axios";
const LoginPage = ({login,setLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const respose=axios.get("http://localhost:9002/login")
    console.log(respose);
  },[])

  const paperStyle = {
    width: '50%',
    margin: 0,
    padding: '2rem',
    height: '370px',
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
const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setError('Please enter both email and password');
    return;
  }
  else{
    setError('');
    const user = {
    username: email,
    password: password,
    };
     
      //try { await axios.post("http://localhost:9002/register", user).then((res) => { console.log(res); }); } catch (error) { console.log(error.response); }
  try {
    const {data} = await  axios.post("http://127.0.0.1:9002/login",user,{validateStatus:false});
    console.log(data); // Log the acknowledgment message
    // if(data.status == true ){
    //   navigate('/dashboard');
    // }
    // else{
    //   setError(data.message);
    //   console.log(data.message);
    // }
    console.log(data.status);
    if (data.status === true) {
      localStorage.setItem('token',data.data.authToken);
      navigate('/home');
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
  const { data } = await axios.get("http://127.0.0.1:9002/login");
  console.log("verfieed"+data);
}
  return (
    <Fragment>
      <Paper style={paperStyle} sx={{ marginTop: '10px', paddingLeft: '0' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form style={formStyle} onSubmit={handleFormSubmit}>
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <div style={buttonContainerStyle}>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <Button variant="contained" color="secondary" onClick={()=> navigate("/register")}>
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </Fragment>
  );
};

export default LoginPage;
