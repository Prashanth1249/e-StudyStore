import React from 'react';
import { Paper, Typography, Button, Divider } from '@mui/material';

const ContentComponent = () => {
  const containerStyle = {
    width: '45%',
    height: 'calc(100% - 100px)',
    margin: '0',
    marginLeft: '20px',
    marginTop: '5rem',
    marginBottom: '2rem',
  };

  const messageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <Paper sx={{ padding: '2rem' }}>
        <div style={messageStyle}>
          <Typography variant="h5" align="center">
            Welcome to Our Book Community!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Join us to explore a world of books. Buy and sell your favorites, connect with other book lovers, and embark on a literary journey.
          </Typography>
          <Button variant="contained" color="primary" href="/Register" sx={{ mt: 3 }}>
            Get Started
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ContentComponent;
