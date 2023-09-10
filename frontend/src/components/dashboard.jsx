import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, TextField, Paper, Grid } from '@mui/material';

const books = [
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'pRASHANTH',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  {
    id: 1,
    name: 'Book 1',
    description: 'Description for Book 1',
  },
  // Add more books here...
];

const BookComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOrderNow = (bookId) => {
    // Handle the order now functionality for the selected book
    console.log(`Order now clicked for book ${bookId}`);
  };

  const handleAddToCart = (bookId) => {
    // Handle adding the book to the cart
    console.log(`Added book ${bookId} to cart`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper elevation={0} className="book-container" style={{ paddingTop: '100px' }}>
      <TextField
        className="search-input"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
      />
      <Grid container spacing={2} className="book-list" style={{ width:'100%',border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card className="book-card" style={{ height: '100%' }}>
              <CardActionArea>
                <CardMedia
                  className="book-image"
                  image="https://hub.rgukt.ac.in/hub/static/images/logo.png"
                  title={book.name}
                  style={{ height: '140px' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <div className="button-group">
                <Button variant="contained" color="primary" onClick={() => handleOrderNow(book.id)}>
                  Order Now
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleAddToCart(book.id)}>
                  Add to Cart
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default BookComponent;
