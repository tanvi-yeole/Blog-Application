import React, {useState} from "react";
import { TextField, Button, Box, Typography, Container, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response =await axios.post('http://localhost:4000/login',{
        email,
        password
      });
      console.log('login successful', response.data);
      navigate('/');
    }catch(err){
      setError(err.response?.data?.msg || 'Login failed')
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Box
        sx={{
          boxShadow: 4,
          padding: 4,
          borderRadius: 3,
          backgroundColor: "linear-gradient(to bottom, #ffffff, #f0f4f8)",
          transition: "transform 0.3s ease",
          '&:hover': {
            transform: "scale(1.02)",
            boxShadow: 8,
          },
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <LockOutlinedIcon style={{ fontSize: 50, color: "#007bff" }} />
        </Box>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: 3,
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: "#ccc",
                    },
                    '&:hover fieldset': {
                      borderColor: "#007bff",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: "#ccc",
                    },
                    '&:hover fieldset': {
                      borderColor: "#007bff",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <a href="/register">Create an account</a>
          {error && <Typography color='error'>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              padding: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#007bff",
              '&:hover': {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
