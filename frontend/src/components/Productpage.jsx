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
// import Dialog from '@mui/material';
import {DialogTitle} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {Dialog} from '@mui/material';

// Subcomponent for displaying individual books
const BookItem = ({ name,imageName,description, price, onAddToCart }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [loading,setLoading]=useState(false);
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
  const handleBuyNow = async () => {
    try {
      console.log("id",user._id);
      console.log("Book ID:", imageName); // Display the book ID
      console.log("Book Name:", name); // Display the book name
      console.log("Current User:", user.username);
      setLoading(true); // Display the current user's information
      const response = await axios.post('http://localhost:9002/send-email', {
        userEmail: user.username,
        uname:user.name,
        mobile:user.mobile,
        id:user._id,
        sellerEmail: '',
        bookName: imageName,
        bname:name,
      });
      setPurchaseSuccess(true);
      setLoading(false);
      console.log(response.data);
      // Display a success message or take further actionss
    } catch (error) {
      console.error("Error sending email:", error);
      // Display an error message or handle the error
      setLoading(false);
    }
  };
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
            {/* <Button onClick={onAddToCart} variant="contained" color="primary" style={{ marginBottom: '4px', background: '#f0c14b', color: '#111', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)' }}>Add to Cart</Button> */}
            <Button variant="contained" onClick={handleBuyNow} color="primary" style={{ background: '#f0c14b', color: '#111', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)' }}>Buy Now</Button>
            {loading && <p style={{ color: 'blue' }}>Processing Order, Please Wait...</p>}
          </div>
        </div>
      </Paper>
      <Dialog
        open={purchaseSuccess}
        onClose={() => setPurchaseSuccess(false)}
      >
        <DialogTitle>Order Placed Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order has been placed successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPurchaseSuccess(false);
              navigate('/profile/orders');
            }}
            color="primary"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
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
        let url = `http://localhost:9002/productpage/` + token;
        const { data } = await axios.get(url);
        setSoldImages(data.soldImages);
        console.log(data.soldImages);
      } catch (error) {
        console.error("Error fetching all sold images:", error);
      }
    };

    fetchAllSoldImages();
  }, []);

  const handleAddToCart = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ paddingTop: '100px',width:'100%'}}>
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
              onAddToCart={() => {  }}
            />
          ))} 
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" >
          Successfully added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default BookStore;
