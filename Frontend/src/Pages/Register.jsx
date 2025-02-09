import React,{useState} from "react";
import { TextField, Button, Box, Typography, Container, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[error,setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }
    try{
      const response = await axios.post('http://localhost:4000/signup',{
        name:username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Form submitted", response.data);
      if(response.status==200){
        navigate('/login');
      }else{
        setError('Registration Failed')
      }
      

    }catch(err){
      console.error('Registration error', err.response?.data);
      setError(err.response?.data?.msg || 'Registration Failed')
    }
    // Add form submission logic here
   
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
          <AccountCircleIcon style={{ fontSize: 50, color: "#007bff" }} />
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
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
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
                onChange={(e)=>setPassword(e.target.value)
                }
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
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                value={confirmPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)}
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
          <a href="/login">Login Here</a>
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
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
