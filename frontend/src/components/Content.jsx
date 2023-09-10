import React, { Fragment, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import ShopTwoOutlinedIcon from '@mui/icons-material/ShopTwoOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import AddIcon from '@mui/icons-material/Add';
import Toolbar from '@mui/material/Toolbar';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import List from '@mui/material/List';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import SellTwoToneIcon from '@mui/icons-material/SellTwoTone';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from "@mui/icons-material/Home"
import axios from 'axios';
//import { Home, HomeRepairServiceOutlined } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
import { Stack,Button, Hidden,Avatar } from '@mui/material';
// import { BorderAllRounded } from '/@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import LoginPage from './Login';
import ContentComponent from './Notice';
import RegisterComponent from './Register';
// import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';
import Dashboard from './dashboard';
// import WeatherComponent from './IsAuthenticated';
import BookStore from './Productpage';
// import RegisterPage from './Register';
import Home from './Home';
import YourOrder from './YourOrders';
import YourSell from './YourSell';
import PersonalInfoForm from './Profile';
import SellBooksForm from './SellBook';
import { useEffect } from 'react';
import AboutPage from './About';

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {

  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePhoto,setProfilePhoto]=useState(null);
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [openSubsection, setOpenSubsection] = useState(false);
  const [openSubsection1, setOpenSubsection1] = useState(false);
  const [openSubsection2, setOpenSubsection2] = useState(false);
  const [openSubsection3, setOpenSubsection3] = useState(false);
  // const Navigate=useNavigate();
  const[loginUser,setloginUser]=useState(false);
  const [hovered, setHovered] = useState(false);
  const handleListItemMouseEnter = () => {
    setHovered(true);
  };

  const handleListItemMouseLeave = () => {
    setHovered(false);
  };
  const handleContactClick=()=>{
    
  }
  const handleListItemClick = () => {
    setOpenSubsection(!openSubsection);
  };
  const handleListItemClick1 = () => {
    setOpenSubsection1(!openSubsection1);
  };
  const handleListItemClick2 = () => {
    setOpenSubsection2(!openSubsection2);
  };
  const handleListItemClick3 = () => {
    setOpenSubsection3(!openSubsection3);
  };



  const getInfo = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    let url = `http://localhost:9002/getinfo/` + token;
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setLogin(true);
      setUser(data);
      setProfilePhoto(data.profilePhoto);
    } catch (error) {
      // Handle the error here
      console.error("Error fetching user info:", error);
    }
  };

  // useEffect with an empty dependency array will be called only once when the component is mounted
  useEffect(() => {
    getInfo();
  }, []);
 // const navigate=useNavigate();
  // Function to handle logout
  const logOut = () => {
    if(login){
    localStorage.removeItem('token'); // Remove the token from localStorage // Navigate to the login page
    setLogin(false); // Update the login state to false (optional if you need this state in the component)
    setUser(null); 
    window.location.reload();
    }// Update the user state to null (optional if you need this state in the component)
  };
  const avatarStyle = {
    height: '40px', // Set the desired height here
    width: '40px', // Automatically adjust width based on height
    cursor: 'pointer',
  };

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };
  const onProfile = () => {
    setShowDropdown(!showDropdown);
  };
  const onLogout = () => {
    setShowDropdown(!showDropdown);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    let timer;
    if (showDropdown) {
      timer = setTimeout(() => {
        setShowDropdown(false);
      }, 3000); // 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showDropdown]);

  return (
    <Box sx={{ display: 'flex' ,backgroundColor:'#f4f4f4' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:"#4267b2"}}>
        <Toolbar>
           <IconButton
            color="inherit"
            aria-label="open drawer"
            size='Huge'
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton><></>
          {open ? (<></>
) : (<Fragment>
    <Box
    component="img"
        src="https://hub.rgukt.ac.in/hub/static/images/logo.png"
    alt="logo"
        sx={{
            maxWidth: {
            xs: "10%",
            sm: "35px",
            },
            objectFit: "cover",
            paddingRight:'3px'
            
        }}
    />
    <Box sx={{paddingLeft:"12px",color:"white"}}>
        RGUKT BASAR
    </Box>
    </Fragment>
)}
          <Typography variant='h6' component='div' edge='end' sx={{ flexGrow: 1 }}>
            e-studyStore
          </Typography>
          <Stack direction='row' spacing={2}>
            {/* <Button color='inherit'>  <Link to={"/Home"}>Your Name</Link></Button> */}
            <Button color='inherit'> <a href='/about' style={{textDecoration:"none",color:"white"}}>About</a></Button>
            <Button color='inherit' ><a href="mailto:prshanthpottola49an@gmail.com" style={{textDecoration:"none",color:"white"}}>Contact</a></Button>
            {showDropdown && (
    <div className="dropdown">
      {login && (
        <>
          {/* <Button color='inherit' > <a href='/profile/info' style={{textDecoration:"none",color:"white"}}>Profile</a></Button> */}
          <Button color='inherit' onClick={logOut}>Logout</Button>
        </>
      )}
    </div>
  )}
  <div className="avatar-component" >
  {login && (
    <Avatar
      alt="Profile"
      src={profilePhoto ? `http://localhost:9002/uploads/${profilePhoto}` : 'http://localhost:9002/uploads/profile.png'}
      style={avatarStyle}
      onClick={handleAvatarClick}
    />
  )}
  {!login && (
    <Button color='inherit'> <a href='/login' style={{textDecoration:"none",color:"white"}}>Login</a></Button>
  )}

</div>


            {/* <Button color='inherit' onClick={logOut}>{login ? 'Logout' :  <a href='/login' style={{textDecoration:"none",color:"white"}}>Login</a>}</Button> */}
           
            </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{backgroundColor:"#4267b2"}} >
        <Box
        component="img"
            src="https://hub.rgukt.ac.in/hub/static/images/logo.png"
        alt="logo"
            sx={{
                maxWidth: {
                xs: "10%",
                sm: "35px",
                },
                objectFit: "cover",
                paddingRight:'13px'
            }}
        />
       
        <Box sx={{paddingRight:"8px",color:"white"}}>
            RGUKT BASAR
        </Box>
        



<IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
</IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ overflow: 'hidden' }}>
        <ListItem disablePadding>
        <ListItemButton onClick={handleListItemClick}>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText>
              <a href='/' style={{textDecoration:"none",color:"black"}}>Home</a>
            </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding  onMouseEnter={handleListItemMouseEnter}
         >
        <ListItemButton onClick={handleListItemClick1}>
          <ListItemIcon>
            <SellTwoToneIcon/>
          </ListItemIcon>
          <ListItemText primary="Upload Now"/>
          {openSubsection1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSubsection1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ overflow: 'hidden' }}>
          <ListItem button>
            <ListItemIcon>
            <AddIcon/>
            </ListItemIcon>
            <ListItemText>
              <a href='/upload/book' style={{textDecoration:"none",color:"black"}}>Upload Book</a>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
      <ListItem disablePadding
       sx={{
        backgroundColor: openSubsection2 ? '#89be3d' : 'transparent',
        color: openSubsection2 ? 'white' : 'black',
        '&:hover': {
          backgroundColor: hovered ? 'brown' : 'transparent',
          color:hovered?'white':'black'
        },
      }}
      >
        <ListItemButton onClick={handleListItemClick2}>
          <ListItemIcon>
          <ShoppingBagTwoToneIcon/>
          </ListItemIcon>
          <ListItemText primary="Get Now" />
          {openSubsection2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSubsection2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ overflow: 'hidden' }}>
          <ListItem button>
            <ListItemIcon>
            <ShoppingCartTwoToneIcon/>
            </ListItemIcon>
            <ListItemText>
              <a href='/get/book' style={{textDecoration:"none",color:"black"}}>Get Books</a>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
      <ListItem disablePadding>
        <ListItemButton onClick={handleListItemClick3}>
          <ListItemIcon>
          <AccountBoxTwoToneIcon/>
          </ListItemIcon>
          <ListItemText primary="Profile" />
          {openSubsection3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSubsection3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ overflow: 'hidden' }}>
          <ListItem button>
            <ListItemIcon>
            <ShopTwoOutlinedIcon/>
            </ListItemIcon>
            <ListItemText>
              <a href='/profile/orders' style={{textDecoration:"none",color:"black"}}>Your Orders</a>
            </ListItemText>
          </ListItem>
          <ListItem button >
            <ListItemIcon>
            <BookTwoToneIcon/>
            </ListItemIcon>
            <ListItemText>
              <a href='/profile/uploads' style={{textDecoration:"none",color:"black"}}>Your Uploads</a>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
             <AdminPanelSettingsTwoToneIcon/>
            </ListItemIcon>
            <ListItemText>
              <a href='/profile/info' style={{textDecoration:"none",color:"black"}}>Personal Info</a>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </List>
      </Drawer>
    
        <Main open={open} sx={{display:"flex" ,backgroundColor:"#F5F5F5"}}>
            <Router>
                <Routes>
                    {/* <Route exact path="/" element={!login?(<Fragment><LoginPage /><ContentComponent/></Fragment>):<Home login={login} setLogin={setLogin}/>} />
                    <Route exact path="/login" element={(<Fragment><LoginPage login={login} setLogin={setLogin} /> <ContentComponent/></Fragment>)} />
                    <Route exact path="/register" element={!login?(<Fragment><RegisterComponent login={login} setLogin={setLogin}/><ContentComponent/></Fragment>):<Home login={login} setLogin={setLogin}/>} />
                    <Route exact path="/home" element={!login?(<Fragment><LoginPage login={login} setLogin={setLogin}/><ContentComponent/></Fragment>):<Home login={login} setLogin={setLogin}/>} />
                    <Route exact path="/upload/book" element={!login?(<Fragment><RegisterComponent/><ContentComponent/></Fragment>):<SellBooksForm/>} />
                    <Route exact path="/get/book" element={!login?(<Fragment><RegisterComponent/><ContentComponent/></Fragment>):<BookStore/>} />
                    <Route exact path="/profile/orders" element={!login?(<Fragment><RegisterComponent/><ContentComponent/></Fragment>):<YourOrder/>} />
                    <Route exact path="/profile/info" element={!login?(<Fragment><RegisterComponent/><ContentComponent/></Fragment>):<PersonalInfoForm/>} />
                    <Route exact path="/profile/uploads" element={!login?(<Fragment><RegisterComponent/><ContentComponent/></Fragment>):<YourSell/>} /> */}
                    <Route exact path='/home' element={<Home login={login} setLogin={setLogin}/>}/>
                    <Route exact path='/' element={<Home login={login} setLogin={setLogin}/>}/>
                    <Route exact path="/get/book" element={<BookStore/>}/>
                    <Route exact path="/login" element={(<Fragment><LoginPage/> <ContentComponent/></Fragment>)} />
                    <Route exact path="/register" element={(<Fragment><RegisterComponent/> <ContentComponent/></Fragment>)} />
                    <Route exact path='/upload/book' element={<SellBooksForm/>}/>
                    <Route exact path="/profile/orders" element={<YourOrder/>} />
                     <Route exact path="/about" element={<AboutPage/>}/>
                    <Route exact path="/profile/uploads" element={<YourSell/>}/>
                    <Route exact path="/profile/info" element={<PersonalInfoForm/>} />
                </Routes>
            </Router>
        </Main>
    </Box>
  );
}