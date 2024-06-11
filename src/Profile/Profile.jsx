import React from 'react'
import "./Profile.css";
import Menu2 from '../Home/components/Menu2'
import { Button } from '@mui/material'
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import Sidebar from '../Dashboard/Sidebar';
import { useState , useEffect} from 'react';
import { Block } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start', // Pour aligner les composants à gauche
  },
  sidebar: {
    flex: '0 0 auto', // La sidebar s'adapte automatiquement à sa taille minimale
  },
  content: {
    flex: '1 1 auto', // Le contenu occupe l'espace restant
  },
};

function Profile() {
   
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
    
      
    //   const handleFieldChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserInfo((prevUserInfo) => ({
    //       ...prevUserInfo,
    //       [name]: value
    //     }));
    //   };
      const handleFieldChange = (e, fieldName) => {
        const { value } = e.target;
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [fieldName]: value
        }));
      };
      
      const [selectedImage, setSelectedImage] = useState(null);
      const [imageUrl, setImageUrl] = useState("");


      const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
       
      };
    
      const handleSubmitImage = async () => {
        const formData = new FormData();
    
         formData.set("image", selectedImage, JSON.parse(sessionStorage.getItem("UserInfo")).nom+JSON.parse(sessionStorage.getItem("UserInfo")).prenom+JSON.parse(sessionStorage.getItem("UserInfo")).id+".jpg");
      
    
    
        try {
          const response = await axios.post(
            "http://localhost:3001/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
             
            }
          );
          setImageUrl(response.data);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      
    
    



     window.location.reload();



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

    if(sessionStorage.getItem("UserInfo")){

  return (

    <>
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.content}>
        <Menu2 />
    <div className="container rounded bg-white mt-5 mb-5" style={{marginTop: "60px"}}>
                <div className="row" style={{ marginTop: "-250px" }}>
                    <div className="col-md-12">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <div className="col-md-4" style={{marginLeft:"-100px", boxShadow:'0px 0px 0px 0px rgb(51,0,114)',marginTop: "125px"}}>
                                <div className="d-flex flex-column align-items-center text-center  m-5" style={{ position: 'relative'}}>
                                        
                                      <label  htmlFor="profileImage" style={{ cursor: 'pointer', "position": "absolute","color":"rgb(51,0,114)",
    "left": "42%","top":"47%" }}>
                                            <input
                                                type="file"
                                                id="profileImage"
                                             
                                               accept="image/*"
                                                onChange={handleImageChange}
                                                style={{ display: 'none',marginTop: "60px" }}
                                            />
                                            <FaEdit size={50} />
                                            
                                        </label> 
                                       
                                        <img  className="rounded-circle " width="180px" height="180px" src={'http://localhost:3001/Uploads/ProfilesImages/'+JSON.parse(sessionStorage.getItem("UserInfo")).nom+JSON.parse(sessionStorage.getItem("UserInfo")).prenom+JSON.parse(sessionStorage.getItem("UserInfo")).id+".jpg"} style={{"border":"rgb(51,0,114) solid 1px" }}   />

                                      <br></br>  <span className="font-weight-bold">{JSON.parse(sessionStorage.getItem("UserInfo")).nom+" "+JSON.parse(sessionStorage.getItem("UserInfo")).prenom}</span>
                                    
                                       
                                        <button onClick={handleSubmitImage} className="btn btn-warning" style={{"margin-top":"10px"}}>Upload Image</button>





                                       
                                    </div>
                                    <div>
      
      
    </div> 

                                </div>
                            </div>
            <div className="row mt-1">
            <div className="col-md-6">
                <label className="labels" style={{fontWeight: "bolder", fontSize:"15px" }}>Name</label>
                <input 
                type="text" 
                className="form-control form-control-lg border border-dark " 
                placeholder="First Name" 
                value={userInfo.nom} 
                onChange={(e) => handleFieldChange(e, "nom")}  // Update the "nom" field
                name="nom" 
                />
            </div>
            <div className="col-md-6">
                <label className="labels" style={{fontWeight: "bolder", fontSize:"15px" }}>Surname</label>
                <input 
                type="text" 
                className="form-control form-control-lg border border-dark" 
                value={userInfo.prenom} 
                onChange={(e) => handleFieldChange(e, "prenom")} // Update the "prenom" field
                name="prenom" 
                placeholder="Surname" 
                />
            </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-12 mb-2">
                    <label className="labels" style={{fontWeight: "bolder", fontSize:"15px" }}>Mobile Number</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border border-dark" 
                        placeholder="Enter Phone Number" 
                        value={userInfo.mobileNumber} 
                        onChange={(e) => handleFieldChange(e, "mobileNumber")} // Update the "mobileNumber" field
                        name="mobileNumber" 
                    />
                </div>
                        
                <div className="col-md-12 mb-2">
                    <label className="labels" style={{fontWeight: "bolder", fontSize:"15px" }}>Address Line 1</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border border-dark" 
                        placeholder="Enter Address Line 1" 
                        value={userInfo.addressLine1} 
                        onChange={(e) => handleFieldChange(e, "addressLine1")} // Update the "addressLine1" field
                        name="addressLine1" 
                    />
                </div>
                
                <div className="col-md-12 mb-2">
                    <label className="labels" style={{fontWeight: "bolder", fontSize:"15px" }}>Email</label>
                    <input 
                        type="text" 
                        className="form-control form-control-lg border border-dark" 
                        placeholder="Enter Email ID" 
                        value={userInfo.email} 
                        onChange={(e) => handleFieldChange(e, "email")} // Update the "email" field
                        name="email" 
                    />
                </div>
            </div>

            <div className="row mt-2">
            <div className="col-md-6">
                <label className="labels" style={{fontWeight: "bolder", fontSize:"15px" }}>ID</label>
                <input 
                type="text" 
                className="form-control form-control-lg border border-dark" 
                placeholder="Country" 
                value={userInfo.id} 
                onChange={(e) => handleFieldChange(e, "id")} // Update the "id" field
                name="id" 
                />
            </div>
            <div className="col-md-6">
                <label className="labels" style={{fontWeight: "bolder", fontSize:"15px" }}>State/Region</label>
                <input 
                type="text" 
                className="form-control form-control-lg border border-dark" 
                placeholder="State/Region" 
                value={userInfo.stateRegion} 
                onChange={(e) => handleFieldChange(e, "stateRegion")} // Update the "stateRegion" field
                name="stateRegion" 
                />
            </div>
            </div>

            <div className="mt-2 text-center">
            <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{background:"rgb(51,0,114)",borderRadius:"15px"}}
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                    e.preventDefault(); 
                    handleSubmit(e);
                    setIsEditMode(false); 
                  }}>
                Save Data
            </Button>
            </div>
        </div>
        </div>
                  <Button
                  type="submit"
                  component={Link}
      to="/Initialize"
                  fullWidth
                  variant="contained"
                  style={{ background: "rgb(51,0,114)", borderRadius: "15px", padding: "8px 20px", fontSize: "0.875rem" }}
                  sx={{ mt: 3, mb: 2 }}
                  >Forgot password</Button>
       
    </div>
    </div>
    
            {/* <div>
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
                      </div> */}
                       </div>
    </div>
</>

  )}else{
    return <div class="alert alert-danger" role="alert">
   Session Expired
  </div>
  }
}

export default Profile
