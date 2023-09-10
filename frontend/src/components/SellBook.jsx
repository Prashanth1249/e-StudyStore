import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  InputAdornment,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellBooksForm = () => {
  const [dialogAction, setDialogAction] = useState('cancel');
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
  useEffect(() => {
    getInfo();
  }, []);

  const [bookInfo, setBookInfo] = useState({
    title: '',
    description: '',
    price: '',
    isFree: false,
    bookImage: null,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handleRadioChange = (e) => {
    const value = e.target.value === 'true';
    setBookInfo({ ...bookInfo, isFree: value, price: value ? '' : bookInfo.price });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Check if a file is selected and its type is either 'image/jpeg' or 'image/png'
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setBookInfo({ ...bookInfo, bookImage: file });
    } else {
      setBookInfo({ ...bookInfo, bookImage: null });
      e.target.value = ''; // Clear the input to allow selecting a valid file on next try
      alert('Please select a valid JPG or PNG image.');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookInfo);
    setDialogOpen(true);
  };
  
  const handleDialogClose = async (action) => {
    console.log("Dialog Action:", action);
    setDialogOpen(false);
    setDialogAction(action);
    if (action === 'proceed') {
      const formData = new FormData();
      // Add other form data as you need
      formData.append('bookInfo', JSON.stringify(bookInfo)); // Convert bookInfo to a JSON string and append it
      formData.append('dialogAction', action); // Append the dialogAction
      formData.append('bookImage', bookInfo.bookImage); // Append the bookImage directly without converting
  
      try {
        console.log("formda"+formData);
        // Send the POST request with the user ID in the headers
        const { data } = await axios.post("http://127.0.0.1:9002/upload", formData, {
          headers: {
            userid: user._id, // Replace 'user._id' with the actual user ID you get from the server
          },
        });
        navigate('/home');
        console.log(data);
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{paddingTop:"100px",width:"100%"}}>
      <form onSubmit={handleSubmit}>
      <TextField
          fullWidth
          required
          label="Title"
          name="title"
          value={bookInfo.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          multiline
          label="Description"
          name="description"
          value={bookInfo.description}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Price</FormLabel>
          <RadioGroup row name="isFree" value={bookInfo.isFree.toString()} onChange={handleRadioChange}>
            <FormControlLabel value="true" control={<Radio />} label="Free" />
            <FormControlLabel value="false" control={<Radio />} label="For Money" />
          </RadioGroup>
          {!bookInfo.isFree && (
            <TextField
              fullWidth
              required
              label="Price (in INR)"
              name="price"
              value={bookInfo.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          )}
        </FormControl>
        <input
          type="file"
          name="bookImage"
          accept=".jpg,.png"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="book-image-input"
        />
        <label htmlFor="book-image-input">
          <Button variant="outlined" component="span" fullWidth>
            {bookInfo.bookImage ? 'Image Selected' : 'Select Book Image (JPG/PNG)'}
          </Button>
        </label>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Upload
        </Button>
      </form>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Uploaded Data</DialogTitle>
        <DialogContent>
          <Typography>Title: {bookInfo.title}</Typography>
          <Typography>Description: {bookInfo.description}</Typography>
          <Typography>Price: {bookInfo.isFree ? 'Free' : `₹${bookInfo.price}`}</Typography>
          {bookInfo.bookImage && <img src={URL.createObjectURL(bookInfo.bookImage)} alt="Book" />}
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleDialogClose('cancel')}>Cancel</Button>
        <Button onClick={() => handleDialogClose('proceed')}>Proceed</Button>
        <Button onClick={() => handleDialogClose('edit')}>Edit</Button>
      </DialogActions>
      </Dialog>
    </Container>
  );

};

export default SellBooksForm;
