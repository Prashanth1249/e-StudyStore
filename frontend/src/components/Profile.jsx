import React, { useState } from 'react';
import { TextField, Button, Avatar, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PersonalInfoForm = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [id, setId] = useState('');
  const [contact, setContact] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [error,setError]=useState(null);
  const getInfo = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      console.log("hey");
      navigate('/login');
      return;
    }

    let url = `http://localhost:9002/getinfo/` + token;
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setLogin(true);
      setUser(data);
      setMobile(data.mobile);
      setContact(data.mobile);
      setEmail(data.username);
      setName(data.name);
      setBio(data.bio);
      setId(data.id);
      console.log(user);
      // /console.log(Profile)
    } catch (error) {
      // Handle the error here
      console.error("Error fetching user info:", error);
      // navigate('/login');
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  const handleEdit = () => {
    console.log(name+bio);
    setEditMode(true);
  };

  const handleSave = async() => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const userdata={
      token:token,
      name:name,
      bio:bio,
      id:id,
      mobile:mobile,
      contact:contact,
      email:email,
    }
    try {
      const {data} = await  axios.post("http://127.0.0.1:9002/profilechange",userdata,{validateStatus:false});
      console.log(data);
      if(!data.status)
      {
        setError(data.message);
      }
      else
      {
        navigate("/home");
      }
    }
    catch(e)
    {
      console.log(e);
    }
    setEditMode(false);
  };

  const handleChangePassword = async() => {
    setCurrentPassword('');
    setNewPassword('');
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const user = {
      newPassword: newPassword,
      currentPassword: currentPassword,
      token:token
      };
    try {
      const {data} = await  axios.post("http://127.0.0.1:9002/password",user,{validateStatus:false});
      console.log(data);
      if(!data.status)
      {
        setError(data.message);
      }
      else
      {
        setError('Password has changed successfully');
        navigate("/home");
      }
    }
    catch(e)
    {
      console.log(e);
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
  formData.append('file', profilePhoto);
  // formData.append('token',token);
  try {
    const response = await axios.post("http://127.0.0.1:9002/uploadProfilePhoto", formData, {
      headers: {
          userid: user._id, // Replace 'user._id' with the actual user ID you get from the server
      },
    });

    console.log(response.data);
    navigate("/home");
    // Handle response as needed
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    // Handle error as needed
  }
  };
  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleProfilePhotoButtonClick = () => {
    document.getElementById('profilePhotoInput').click(); // Trigger file input click
  };
  return (
    
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '26px',
        margin:'50px',
        marginTop:'0px',
        paddingTop:'100px'
      }}
    >
         {editMode && (
        <Box style={{marginLeft:"40px"}}>
          <Avatar
            alt="Profile Photo"
            src={profilePhoto ? URL.createObjectURL(profilePhoto) : ''}
            sx={{ width: '80px', height: '80px', marginBottom: '16px' }}
          />
          <input
            id="profilePhotoInput"
            type="file"
            onChange={handleProfilePhotoChange}
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfilePhotoButtonClick}
          >
            Upload Photo
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleUpload}
          >
            Save
          </Button>
        </Box>
      )}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        disabled={!editMode}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        fullWidth
        multiline
        disabled={!editMode}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        fullWidth
        disabled={!editMode}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        fullWidth
        disabled={!editMode}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        fullWidth
        disabled={!editMode}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        disabled={!editMode}
        variant="outlined"
        margin="normal"
      />
      {editMode ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
        >
          Edit Details
        </Button>
      )}
      { (
        <div style={{ marginTop: '16px', width: '100%' }}>
          <TextField
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            type="password"
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
        </div>
      )}
    </Box>
  );
};

export default PersonalInfoForm;
