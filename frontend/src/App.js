
import './App.css';
import PersistentDrawerLeft from './components/Content';
import { MuiDrawer } from './components/Drawer';
import LoginPage from './components/Login';
import ContentComponent from './components/Notice';
import FileApp from './components/myfile';

import axios, { Axios } from 'axios';
// import { MuiNavbar } from './components1/Navbar';
// import { MuiImageList } from './components1/imagelist';s
import { useEffect, useState } from 'react';
import SellBooksForm from './components/SellBook';
import PersonalInfoForm from './components/Profile';
import { useNavigate } from 'react-router-dom';

function App() {
  
const [login,setLogin]=useState(false);
  axios.defaults.withCredentials = true;  
  return (
    <div className="App">
      <PersistentDrawerLeft />
      {/* <SellBooksForm/> */}
      {/* <PersonalInfoForm/> */}
    </div>
  );
}

export default App;
