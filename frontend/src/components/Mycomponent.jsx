import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const MyComponent = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: 'flex'}}>
      <AppBar position="fixed" style={{ marginLeft: open ? drawerWidth : 0, transition: 'margin 0.2s' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{ marginRight: '16px' }}
          >
            <MenuIcon />
          </IconButton>
          {/* Place your AppBar content here */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        style={{ width: drawerWidth, flexShrink: 0 }}
        classes={{
          paper: 'drawer-paper',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '8px' }}>
          <IconButton onClick={handleDrawerClose}>
            HI
          </IconButton>
        </div>
        <List>
          {/* Place your Drawer items here */}
          <ListItem button>
            <ListItemIcon>
              {/* Place your Drawer item icons here */}
            </ListItemIcon>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              {/* Place your Drawer item icons here */}
            </ListItemIcon>
            <ListItemText primary="Item 2" />
          </ListItem>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '16px', transition: 'margin 0.2s', marginLeft: open ? drawerWidth : 0 }}>
        <div style={{ height: '64px' }} />
        {/* Place your main content here */}
      </main>
    </div>
  );
};

export default MyComponent;
