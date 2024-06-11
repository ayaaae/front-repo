// import React, { useState } from 'react';
// import axios from 'axios';

// const Email_sent = () => {
//   const [email, setEmail] = useState('');
//   const [token, setToken] = useState('');
//   const [alert, setAlert] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log('Email value:', email);
//     try {
//       const response = await axios.post('http://localhost:8083/SERVICE-UTILISATEUR/public/forgot-password', { email });
//       const token = response.data;

//       if (token) {
//         console.log('Token generated:', token);
//         setToken(token);
//         setAlert(`Token generated: ${token}`);
//       } else {
//         console.log('Error: Token not generated');
//       }
//     } catch (error) {
//       if (error.response.status === 403) {
//         setAlert('Error: Invalid email address or not registered with the service');
//       } else {
//         setAlert(`Error: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
//         <button type="submit">Forgot Password</button>
//       </form>
//       {alert && <div style={{ color: 'red' }}>{alert}</div>}
//     </div>
//   );
// };

// export default Email_sent;