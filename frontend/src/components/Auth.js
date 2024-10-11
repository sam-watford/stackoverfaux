import React, { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await loginUser({ name })
        : await registerUser({ name });
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", name);
      setUser(name);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Authentication failed!"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            {isLogin ? "Sign In" : "Register"}
          </Button>
          <Button onClick={() => setIsLogin(!isLogin)} fullWidth sx={{ mt: 2 }}>
            {isLogin ? "Need to register?" : "Already have an account?"}
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Auth;
