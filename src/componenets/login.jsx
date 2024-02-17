import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useState, useEffect } from "react";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useStore();

  const handleLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      phoneNumber,
      password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://aon-final.onrender.com/user/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success && result.userLogin.isAdmin) {
          setIsLogin(true);
          localStorage.setItem("adminToken", result.token);
          navigate("/");
        } else {
          alert(result.msg);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="login-screen">
      <div className="form">
        <TextField
        id="outlined-basic"
        label="phone number"
        variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginScreen;
