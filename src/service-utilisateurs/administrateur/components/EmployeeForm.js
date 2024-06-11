import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, OutlinedInput, Grid } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CryptoJS from 'crypto-js';

function EmployeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    nom: "",
    mot_de_passe: "",
    prenom: "",
    role: "",
    token:{
      id:"",
      token:"",
    },
    projetids:""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    // Regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const emptyFields = {};
    const invalidFields = {};
    Object.entries(formData).forEach(([key, value]) => {
      if(key!=formData.token){
        if (value.toString().trim() == '' ) {
        emptyFields[key] = true;
      }}
      if (key === 'email' && !validateEmail(value)) {
        invalidFields[key] = true;
      }
    });
    if (Object.keys(emptyFields).length > 0 || Object.keys(invalidFields).length > 0) {
      setErrors({ ...emptyFields, ...invalidFields });
      setIsSubmitting(false);
     
    }

    
    //create tokens for added employees
   /* var encryptedBase64Key = "bXVzdGJlMTZieXRlc2tleQ==";
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);

    const encryptedEmail = CryptoJS.AES.encrypt(formData.email, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.mot_de_passe,
      parsedBase64Key,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    const newtoken = {
      email: encryptedEmail.toString(),
      password: encryptedPassword.toString()
    };
    setFormData(prevFormData => ({
      ...prevFormData, 
      token: 'valeur_du_token' 
    }));

*/
if(formData.role ==="ADMIN"){
try {

  const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/public/AddAdmin`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setShowSuccessAlert(true);
    console.log(formData);
    setFormData({
      email: "",
      nom: "",
      mot_de_passe: "",
      prenom: "",
      role: "",
    });
    setIsSubmitting(false);
    setErrors({});
    setSubmitError(null);

    onSubmit();
  }
  if (!response.ok) {
    throw new Error('Failed to add employee');
  }

} catch (error) {
  setSubmitError(error.message);
  setIsSubmitting(false);
}

}else{

    try {

      const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/public/AddEmployee`, {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessAlert(true);
        console.log(formData);
        setFormData({
          email: "",
          nom: "",
          mot_de_passe: "",
          prenom: "",
          role: "",
        });
        setIsSubmitting(false);
        setErrors({});
        setSubmitError(null);

        onSubmit();
      }
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  }
  };

  const handleAlertClose = () => {
    setShowSuccessAlert(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card sx={{ maxWidth: 1000, margin: 'auto', marginTop: 5, boxShadow: "1px 1px 10px grey, -2px 1px 10px rgb(217,217,214)", borderRadius: "10px" }}>
      <CardContent>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} m={2} mb={1}>
              <TextField
                required
                id="prenom"
                label="First Name"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                variant="outlined"
                error={errors.prenom}
                color='secondary'
                fullWidth
                sx={{
                  '& .MuioutlinedInput-underline:before': {
                    borderBottomColor: errors.prenom ? 'red' : '#75356b'
                  },
                  '& .MuiInputLabel-root': {
                    color: errors.prenom ? 'red' : '#75356b'
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} m={2} mb={1}>
              <TextField
                required
                id="nom"
                label="Last Name"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                variant="outlined"
                error={errors.nom}
                color='secondary'
                fullWidth
                sx={{
                  '& .MuioutlinedInput-underline:before': {
                    borderBottomColor: errors.nom ? 'red' : '#75356b'
                  },
                  '& .MuiInputLabel-root': {
                    color: errors.nom ? 'red' : '#75356b'
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} m={2} mb={1}>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                error={errors.email}
                color='secondary'
                fullWidth
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottomColor: errors.email ? 'red' : '#75356b'
                  },
                  '& .MuiInputLabel-root': {
                    color: errors.email ? 'red' : '#75356b'
                  },
                }}
              />
              {errors.email && (
                <FormHelperText error sx={{ ml: 2, mt: 0, mb: 0 }}>Invalid Email format</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} m={2} mb={1}>
              <FormControl sx={{ width: '100%' }}>
               
                <TextField
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  color='secondary'
                  label="Password"
                  required
                  error={errors.mot_de_passe}
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
                      borderBottomColor: errors.mot_de_passe ? 'red' : '#75356b'
                    },
                    '& .MuiInputLabel-root': {
                      color: errors.mot_de_passe ? 'red' : '#75356b'
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errors.mot_de_passe ? 'red' : '#75356b'
                  }
                }}
                  
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} m={2} mb={1}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel required id="role" sx={{ color: errors.role ? 'red' : '#75356b' }} color='secondary'>Role</InputLabel>
                <Select
                  labelId="role"
                  id="demo-simple-select"
                  value={formData.role}
                  name="role"
                  label="Role"
                  onChange={handleChange}
                  variant="outlined"
                  error={errors.role}
                  color='secondary'
                  sx={{
                    '& .MuioutlinedInput-underline:before': {
                      borderBottomColor: errors.role ? 'red' : '#75356b'
                    },
                  }}
                >
                  <MenuItem value="">Select a role</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="chef_projet">Project Manager</MenuItem>
                  <MenuItem value="developeur">Developer</MenuItem>
                  <MenuItem value="devops">DevOps Engineer</MenuItem>
                  <MenuItem value="resource_humain">Human Resources</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {showSuccessAlert && (
            <Alert sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2, width: '100%' }} icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={handleAlertClose}>
              Employee added successfully!
            </Alert>
          )}
          <div>

            {/* <Button sx={{
              backgroundColor: 'rgb(051,0,114)',
              '&:hover': {
                backgroundColor: 'rgb(095,036,159)',
              },
            }}
              variant="contained" type="submit">Add</Button>
              <Button sx={{
              backgroundColor: 'rgb(0,105,117)',
              '&:hover': {
                backgroundColor:' rgb(0,150,143)',
                color:'white',
              },m:2
            }}
            component={Link} 
            to="/Dashboard-Aya"
              variant="contained" >
             Cancel
            </Button> */}

            <Button sx={{ backgroundColor: 'rgb(051,0,114)', '&:hover': { backgroundColor: 'rgb(095,036,159)', }, }}
             variant="contained" type="submit" onClick={(e) => {
              e.preventDefault(); 
              handleSubmit(e);
            }}>Add</Button>
            <Button sx={{ backgroundColor: 'rgb(0,105,117)', '&:hover': { backgroundColor: ' rgb(0,150,143)', color: 'white', }, m: 2 }} component={Link} to="/Dashboard-Admin" variant="contained" >Cancel</Button>

          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EmployeeForm;
