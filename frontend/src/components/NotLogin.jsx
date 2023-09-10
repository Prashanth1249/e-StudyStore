import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  content: {
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  message: {
    marginBottom: "20px",
  },
  loginButton: {
    backgroundColor: "#1976D2",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#1565C0",
    },
  },
};

function NotLogin() {
  const navigate = useNavigate();

  const logIn = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Typography variant="h5" style={styles.message}>
          You are not authenticated for this page, please login
        </Typography>
        <Button variant="contained" onClick={logIn} style={styles.loginButton}>
          Log In
        </Button>
      </div>
    </div>
  );
}

export default NotLogin;
