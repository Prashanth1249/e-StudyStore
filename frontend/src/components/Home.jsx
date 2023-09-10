import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotLogin from "./NotLogin";
import { Button } from "@mui/material";
import "./Home.css"; // Make sure to have the necessary CSS file for styling

function Home({ login, setLogin }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [soldImages, setSoldImages] = useState([]);

  const getInfo = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      setLogin(false);
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
      console.error("Error fetching user info:", error);
      navigate('/login');
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setLogin(false);
    navigate('/login');
  };

  const getSoldImages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:9002/homebooks");
      if (response.status === 200) {
        setSoldImages(response.data.soldImages);
      }
    } catch (error) {
      console.error("Error fetching sold images:", error);
    }
  };

  useEffect(() => {
    getInfo();
    getSoldImages();
  }, []);

  return (
    <div className="home-container">
      {login ? (
        <div>
          <h1>Welcome, {user ? user.name : "Guest"}!</h1>
          <p>Unlock your book-loving potential with our platform. Buy and sell books effortlessly. Join our vibrant literary community and embrace limitless opportunities today!</p>
          <Button onClick={logOut}>Log Out</Button>
          <hr></hr>
          <h2 className="available-books-header">Available Books</h2>
          <div className="book-container">
            {soldImages.length > 0 ? (
              <div className="book-list">
                {soldImages.map((image, index) => (
                  <div className="book-box" key={index}>
                    <img
                      src={`http://localhost:9002/uploads/${image.imageName}`}
                      alt={image.title}
                      className="book-image"
                    />
                    <div className="book-details">
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                      <p className="book-price">&#8377;{image.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No sold images available.</p>
            )}
          </div>
        </div>
      ) : (
        <NotLogin />
      )}
    </div>
  );
}

export default Home;
