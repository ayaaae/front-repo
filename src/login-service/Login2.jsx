
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import {Box , InputLabel , OutlinedInput} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CryptoJS from 'crypto-js';
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
 
 
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props} >
       
        &nbsp;
       
      </Typography>
    );
  }
 
 
const defaultTheme = createTheme();
 
 
function Login2() {
 
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();
 
  const [error, setError] = useState('');
 
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // check tokens ---> get user info ---> create session
  function Chek() {
    //encypted
    var encryptedBase64Key = "bXVzdGJlMTZieXRlc2tleQ==";
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
 
    const encryptedEmail = CryptoJS.AES.encrypt(User.email, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const encryptedPassword = CryptoJS.AES.encrypt(
      User.password,
      parsedBase64Key,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
 
    // Construct the encrypted token object
    const token = {
      email: encryptedEmail.toString(),
      password: encryptedPassword.toString()
    };
 
 
      fetch("http://localhost:8083/SERVICE-UTILISATEUR/public/authenticate", {
  method: "POST",
  mode: "cors",
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json",
     },
  body: JSON.stringify(token)
})
.then(response => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
 
  return response.text();
})
.then(data => {
 
if(JSON.parse(data).access_token){
sessionStorage.setItem("AccessTocken",JSON.parse(data).access_token);
}else{
alert("error in authentification");
}
 
console.log(data);
 
})
.catch(error => {
  console.error("Error:", error);
});
 
sleep(2000).then(() => {
 
 
    fetch("http://localhost:8083/SERVICE-UTILISATEUR/Utilisateur-service/login", {
  method: "POST",
  mode: "cors",
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json",
    Authorization:'Bearer '+sessionStorage.getItem("AccessTocken"),
  },
  body: JSON.stringify(token)
})
.then(response => {
  if (!response.ok) {
    setError({
      field: 'fields',
      message: 'Email or password incorrect !',
    });
    throw new Error("Network response was not ok error in login");
   
  }
 
 
 
  return response.text();
})
.then(data => {
//decrypt user info
  var decryptedData = CryptoJS.AES.decrypt(data, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
    //create session with user info
 
if(decryptedData.toString(CryptoJS.enc.Utf8).length == 0){
alert("login or password incorrect");
}else{
  sessionStorage.setItem("UserInfo", decryptedData.toString(CryptoJS.enc.Utf8));
 
  const userInfoData = sessionStorage.getItem("UserInfo");
 
  const userInfoObject = JSON.parse(userInfoData);
 
  const role = userInfoObject.role;
 
  console.log(role);
  if(!role){
    navigate(`/Dashboard-Admin`);
  }else if(role!="chef_projet")
  navigate(`/Employee`);
else{
  navigate(`/DashboardM`);
}
}
 
})
.catch(error => {
  console.error("Error:", error);
});
});
 
  }  
 
 
 
 
  return (
    <ThemeProvider theme={defaultTheme} >
 
       <nav className="navbar navbar-expand-md fixed-top" id="navbar" >
         
          <a className="navbar-brand fw-bold d-none d-md-block" href="/" >DXC Technology</a>
          <div className="container-fluid px-0" >
             <a className="dxc" href="/"></a>
          </div>
       </nav>
       
 
    <Container
      component="main"
      style={{
        marginTop: "70px",
        boxShadow: "1px 1px 10px grey, -2px 1px 10px rgb(95,36,159)",
        borderRadius: "10px", // Adjust the value as needed
       
      }}
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
         
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
 
        <Avatar sx={{ m: 1, bgcolor:"rgb(95,36,159)"  }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h4">
 
          Sign in
        </Typography>
        <Box component="form" method='POST' noValidate sx={{ mt: 1 }}>
          <TextField
           margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
            value={User.email}
            onChange={(e) => setUser({ ...User, email: e.target.value })}
            error={error}
            helperText={error ? error.message : ''}
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: error ? 'red' : '#75356b'
              },
              '& .MuiInputLabel-root': {
                color: error ? 'red' : '#75356b'
              },
            }}
         
          />
 <TextField
  margin="normal"
  fullWidth
  name="password"
  type={showPassword ? 'text' : 'password'}
  id="password"
  autoComplete="current-password"
  value={User.password}
  onChange={(e) => setUser({ ...User, password: e.target.value })}
  error={error}
  helperText={error ? error.message : ''}
  label="Password"
  required
  color="secondary"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end" color='secondary'>
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
          color='secondary'
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
    sx: {
      '& .MuiInput-underline:before': {
        borderBottomColor: error ? 'red' : '#75356b'
      },
      '& .MuiInputLabel-root': {
        color: error ? 'red' : '#75356b'
      },
    },
  }}
  InputLabelProps={{
    sx: {
      color: error ? 'red' : '#75356b'
    }
  }}
/>
 
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{background:"rgb(95,36,159)"}}
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => {e.preventDefault();
              Chek();
             
     
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2" style={{color:"rgb(95,36,159)",textDecoration:"none"}}>
                Forgot password?
              </Link>
            </Grid>
         
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  )
}
 
export default Login2
 