import React from 'react'
import "../../../Profile/Profile.css"
import Menu2 from '../../../Home/components/Menu2'
import { Button } from '@mui/material'
import  { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../../../Dashboard/Sidebar';

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

function EditEmployeePage(){
   
    const [userData, setUserData] = useState({
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

    const { userId } = useParams();
    const navigate = useNavigate();
    
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value
        }));
      };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/GetEmployee/${userId}`,{
            method: 'GET', 
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
            },
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          console.log(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error while fetching user data:', error.message);
      }
    };

    fetchUserData();
    if (!sessionStorage.getItem("UserInfo")) {
      navigate(`/login`);
    }
  }, [userId, navigate]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/UpdateEmployee/${userId}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
            },
            body: JSON.stringify(userData), 
          });
          
          if (response.ok) {
            setUserData(userData);
            console.log(userData);
            console.log('Informations du profil employé modifiées');
            navigate(`/Dashboard-Admin`);
          } else {
            console.error('Échec de la soumission des données au backend');
          }
        } catch (error) {
          console.error('Erreur lors de la soumission des données au backend:', error);
        }
      };
      
      if(sessionStorage.getItem("UserInfo")){
        const userInfoData = sessionStorage.getItem("UserInfo");

        const userInfoObject = JSON.parse(userInfoData);
      
        const role = userInfoObject.role;
        if(role)
        return <h1>Acces Denied! You are Employee</h1>
        else if(!role){ 

    return (
      <>
      <div style={styles.container}>
     
      <div style={{...styles.content, marginTop: '60px' }}>
        <Menu2 />
      
      <div className="container rounded bg-white mt-5 mb-5" style={{marginTop: "60px"}}>
      <div className="row" style={{marginTop:"-100px"}} >
          <div className="col-md-3 border-right" style={{marginLeft:"-100px", boxShadow:'1px 1px 2px rgb(51,0,114)'}}>
              <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="250px"   src={'http://localhost:3001/Uploads/ProfilesImages/'+JSON.parse(sessionStorage.getItem("UserInfo")).nom+JSON.parse(sessionStorage.getItem("UserInfo")).prenom+JSON.parse(sessionStorage.getItem("UserInfo")).id+".jpg"}/>
              <span className="font-weight-bold">{userData.prenom}{" "}{userData.nom}</span><span className="text-black-50 font-weight-bold">{userData.email}</span><span> </span></div>
          </div>
          <div className="col-md-10 border-right" style={{ boxShadow:'1px 1px 2px rgb(51,0,114)'}}>
          <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Edit Employee's Profile</h4>
              </div>
              <form onSubmit={handleSubmit}>
                    <div className="row mt-2">

                        <div className="col-md-6"><label className="labels">First Name</label><input type="text" id="prenom" name="prenom" className="form-control" placeholder="first name" 
                        value={userData.prenom} onChange={handleFieldChange}/></div>

                        <div className="col-md-6"><label className="labels">Last Name</label><input type="text" id="nom" name="nom" className="form-control"
                         value={userData.nom} onChange={handleFieldChange} placeholder="surname"/></div>

                    </div>
             <div className="row mt-3">

                        <div className="col-md-12"><label className="labels">E-mail</label><input type="text" id="email" name="email" className="form-control" placeholder="enter phone number" 
                        value={userData.email} onChange={handleFieldChange}/></div>

                        <div className="col-md-12"><label className="labels">Password</label><input type="password"  id="mot_de_passe" name="mot_de_passe" className="form-control" placeholder="enter address line 1" 
                        value={userData.mot_de_passe} onChange={handleFieldChange}/></div>
                       
                    <div className="col-md-12">
                        <label className="labels">Role</label>

                 <select className="form-select" aria-label="Select Role" value={userData.role}  onChange={handleFieldChange}>
                        
                        <option value="">Select a role</option>
                        <option value="chef_projet">Project Manager</option>
                        <option value="developpeur">Developer</option>
                        <option value="devops">DevOps Engineer</option>
                        <option value="resource_humain">Human Resources</option>
                 </select>
                 </div>
                 </div>
              <div className="mt-5 text-center">
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{background:"rgb(51,0,114)"}}
                  sx={{ mt: 3 ,mb:2}}>
                  Save Data
              </Button>
              </div>

              
              <Button sx={{ backgroundColor: 'rgb(0,105,117)', '&:hover': { backgroundColor: ' rgb(0,150,143)', color: 'white', } }} 
              component={Link} to="/Dashboard-Admin" fullWidth variant="contained" >Cancel</Button>
              
                    </form>
                </div>
            </div>
           
        </div>
    </div>
    </div>
    </div>
  </>
     
      );}
    }

}






export default EditEmployeePage;