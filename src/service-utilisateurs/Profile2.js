import "./css/Profile.css";
import React from "react";
import Header from "./administrateur/components/Header/header";
import lg from "../login-service/static/dxc.png";
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem ,FormHelperText } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState , useEffect} from 'react';

function Profile2() {
  const [userInfo, setUserInfo] = useState({
    id:"",
    email: "",
    nom: "",
    mot_de_passe: "",
    prenom: ""
  });

  //Convertir id_utili pour l'url
  const idUtilisateur = Number(userInfo.id);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const userInfoString = sessionStorage.getItem("UserInfo");
    if (userInfoString) {
      const userData = JSON.parse(userInfoString);
      setUserInfo(userData);
    }
  }, []);
  

  const [isEditMode, setIsEditMode] = useState(false);

  
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/Utilisateur-service/Update/${idUtilisateur}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo), 
      });
      
      if (response.ok) {
        setUserInfo(userInfo);
        console.log(userInfo);
        sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
        console.log(sessionStorage.getItem("UserInfo"));
        console.log('Informations du profil modifiées');
      } else {
        console.error('Échec de la soumission des données au backend');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission des données au backend:', error);
    }
  };

  return (
    <>
      <Header />

      <div className="container-fluid w-100">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-3">
                    <div className="text-center ProfileIMage">
                      <img
                        src={lg}
                        className="rounded-5"
                        width={"100%"}
                        height={"100%"}
                        alt="User"
                      />
                    </div>
                    <div>
                      <input
                        className="form-control"
                        id="formFileLg"
                        type="file"
                        lang="en"
                      />
                    </div>
                  </div>
                  <div className="col-9">
       <form onSubmit={handleSubmit}>

          <div>
            <TextField
              required
              id="emailInput"
              name="email"
              label="Email Address"
              readOnly={!isEditMode}
              value={userInfo.email}
              onChange={handleFieldChange}
              variant="filled"
              fullWidth 
              sx={{ marginBottom: '20px' }}
          
            />
          </div>

          <div>
            <TextField
              required
              id="nomInput"
              name="nom"
              label="Last Name"
              value={userInfo.nom}
              onChange={handleFieldChange}
              variant="filled"
              fullWidth 
              readOnly={!isEditMode}
              sx={{ marginBottom: '20px' }}
          
            />
          </div>

          <div>
            <TextField
              required
              id="prenomInput"
              name="prenom"
              label="First Name"
              value={userInfo.prenom}
              onChange={handleFieldChange}
              variant="filled"
              fullWidth 
              readOnly={!isEditMode}
              sx={{ marginBottom: '20px' }}
          
            />
          </div>
                      
          <FormControl  variant="filled" fullWidth>
              <InputLabel required htmlFor="password"
              
              >Password</InputLabel>

              <FilledInput
                id="passwordInput"
                name="mot_de_passe"
                value={userInfo.mot_de_passe}
                onChange={handleFieldChange}
                readOnly={!isEditMode}
                fullWidth
                sx={{ marginBottom: '20px' }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>           
            <div>
                      {isEditMode ? (
                        <button type="submit" className="btn custom-btn-enregistrer" 
                        onClick={(e) => {
                          e.preventDefault(); 
                          handleSubmit(e);
                          setIsEditMode(false); 
                        }}>
                          Save
                        </button>
                      ) : (
                        <button type="button" className="btn custom-btn-modifier" onClick={() => setIsEditMode(true)}>
                          Edit
                        </button>
                      )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile2;
