import React, { useState } from 'react';
import {
    Button,
    Stack,
    Menu,
    MenuItem,
    Paper
  } from '@mui/material'
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse } from '@mui/material';
// import { Menu as MenuIcon, Close as C/loseIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIco } from '@mui/icons-materials';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DraftsIcon from '@mui/icons-material/Drafts';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FileApp = () => {
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [isSubsectionOpen, setIsSubsectionOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

const toggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen);
};

const toggleSubsection = () => {
  setIsSubsectionOpen(!isSubsectionOpen);
};

const handleItemClick = (item) => {
  setSelectedItem(item);
};

const isItemSelected = (item) => {
  return item === selectedItem;
};
  return (
    <div>
   
       <AppBar height="300px" 
       />
      <AppBar position='static' color='transparent' 
      sx={{backgroundColor:"#4267b2",
        color:'#fff',height:"60px" 
    ,fontSize:"18px", display: 'flex',
   
    justifyContent: 'center',}}>
        <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' edge='end' sx={{ flexGrow: 1 }}>
            RGUKT-STORE
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button color='inherit'>Home</Button>
            <Button color='inherit'>Contact</Button>
            <Button color='inherit'>Login</Button>
            </Stack>
        </Toolbar>
      </AppBar>
    <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: '280px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '280px',
            boxSizing: 'border-box',
            backgroundColor: 'black',
            padding: '4px',
            boxShadow: "0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)!important",
        }
        }}
      >
        <div id="topper">
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
        <List>
          <ListItem
            button
            onClick={toggleSubsection}
            selected={isItemSelected('item1')}
            sx={{
              backgroundColor: isItemSelected('item1') ? 'lightgreen' : 'transparent',
              '&:hover': {
                backgroundColor: 'brown',
              },
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Drawer Item 1" color='#fff'/>
            {isSubsectionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={isSubsectionOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Subsection Item 1" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Subsection Item 2" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => handleItemClick('item2')}
            selected={isItemSelected('item2')}
            sx={{
              backgroundColor: isItemSelected('item2') ? 'lightgreen' : 'transparent',
              '&:hover': {
                backgroundColor: 'brown',
              },
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Drawer Item 2" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleItemClick('item3')}
            selected={isItemSelected('item3')}
            sx={{
              backgroundColor: isItemSelected('item3') ? 'lightgreen' : 'transparent',
              '&:hover': {
                backgroundColor: 'brown',
              },
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Drawer Item 3" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default FileApp;
