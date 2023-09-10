import React, { useState } from 'react';
import {
  TextField,
  Alert,
  Grid,
  Snackbar,
  Button,
  Paper,
} from '@mui/material';
import { ForkRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

// Subcomponent for displaying individual books
const BookItem = ({ name,imageName,description, price, onAddToCart }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  const getInfo = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    let url = `http://localhost:9002/getinfo/` + token;
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setLogin(true);
      setUser(data);
    } catch (error) {
      // Handle the error here
      console.error("Error fetching user info:", error);
      navigate('/login');
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    getInfo();
  }, []);
 
  return (
    <Grid item xs={6} sm={3} md={3} lg={3} sx={{padding:"20px"}}>
      <Paper style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,alignItems:'center'}}>
          <img src={`http://localhost:9002/uploads/${imageName}`} alt={name} style={{ marginBottom: '8px', width:'90px' }} />
          <div>
            <h3 style={{ fontSize: '16px', lineHeight: '1.2', fontWeight: 'bold', marginBottom: '4px' }}>{name}</h3>
            <p style={{ marginBottom: '4px', fontSize: '14px', color: '#777' }}>{description}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>&#8377;{price}</p>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

// Main component
const BookStore = () => {
  const [soldImages, setSoldImages] = useState([]); // Initialize with an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSoldImages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        let url = `http://localhost:9002/profile/sell/` + token;
        const { data } = await axios.get(url);
        setSoldImages(data.soldBooks);
        console.log(data.soldBooks);
      } catch (error) {
        console.error("Error fetching all sold images:", error);
      }
    };

    fetchAllSoldImages();
  }, []);

  return (
    <div style={{ paddingTop: '100px',width:'100%'}}>
       <h1>Your Selling</h1>
      <TextField
        label="Search books"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        variant="outlined"
        color="secondary"
        size="small"
        style={{ marginBottom: '16px', width: '100%' }}
      />

      <Grid container spacing={2}>
        {soldImages.filter(image =>
            image.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((image, index) => (
            <BookItem
              key={index}
              name={image.title}
              description={image.description}
              price={image.price}
              imageName={image.imageName}
            />
          ))} 
      </Grid>
    </div>
  );
};
export default BookStore;
