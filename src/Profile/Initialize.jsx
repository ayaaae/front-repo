// import React, { useState, useEffect } from 'react';
// import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import CryptoJS from 'crypto-js';
// import Menu3navbar from '../Home/components/Menu3navbar';

// const defaultTheme = createTheme();

// function Initialize() {
//   const [User, setUser] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   const userInfoData = sessionStorage.getItem("UserInfo");
//   const userInfoObject = JSON.parse(userInfoData);
//   const emailUserConnecte = userInfoObject.email;

//   console.log("Email of connected user:", emailUserConnecte);

//   useEffect(() => {
//     if (!emailUserConnecte) {
//       console.error("No user email found");
//       return;
//     }
//     setUser({...User, email: emailUserConnecte });
//   }, [emailUserConnecte]);

//   const handlePasswordReset = (e) => {
//     e.preventDefault();
//     if (User.newPassword!== User.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     var encryptedBase64Key = "bXVzdGJlMTZieXRlc2tleQ==";
//     var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);

//     const encryptedEmail = CryptoJS.AES.encrypt(emailUserConnecte, parsedBase64Key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     const encryptedNewPassword = CryptoJS.AES.encrypt(User.newPassword, parsedBase64Key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     const token = {
//       email: encryptedEmail.toString(),
//       password: encryptedNewPassword.toString()
//     };

//     console.log("Password to be sent:", User.newPassword); // <--- Add this line
//     console.log("Encrypted password to be sent:", encryptedNewPassword.toString()); // <--- Add this line

//     const accessToken = sessionStorage.getItem("AccessTocken");
//     if (!accessToken) {
//       console.error("No access token found");
//       return;
//     }

//     fetch("http://localhost:8083/SERVICE-UTILISATEUR/Utilisateur-service/reset-password", {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           Accept: 'application/json',
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(token)
//       })
//    .then(response => {
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//         return response.text();
//       })
//    .catch(error => {
//         console.error("Error:", error.message);
//         setError(error.message);
//       });
//   };

//   return (
//     <>
//       <Menu3navbar />
//       <ThemeProvider theme={defaultTheme}>
//         <Container component="main" maxWidth="xs" style={{ marginTop: "150px", boxShadow: "1px 1px 10px grey, -2px 1px 10px rgb(95,36,159)", borderRadius: "10px" }}>
//           <CssBaseline />
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Avatar sx={{ m: 1, bgcolor: 'econdary.main' }}>
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Reset Password
//             </Typography>
//             <Box component="form" onSubmit={handlePasswordReset} noValidate sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="newPassword"
//                 label="New Password"
//                 type="password"
//                 id="newPassword"
//                 autoComplete="new-password"
//                 value={User.newPassword}
//                 onChange={(e) => setUser({...User, newPassword: e.target.value })}
//                 error={Boolean(error)}
//                 helperText={error? error.message : ''}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 type="password"
//                 id="confirmPassword"
//                 autoComplete="new-password"
//                 value={User.confirmPassword}
//                 onChange={(e) => setUser({...User, confirmPassword: e.target.value })}
//                 error={Boolean(error)}
//                 helperText={error? error.message : ''}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 style={{ background: "rgb(95,36,159)" }}
//               >
//                Reset Password
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     </>
//   );
// }

// export default Initialize;