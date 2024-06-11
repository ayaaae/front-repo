import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DialogContent , DialogContentText ,Box } from '@mui/material';



function Addproject({ handleClose }) {
  const [projectDetails, setProjectDetails] = useState({
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    status: ''
  });
  const [idp,setidp]=useState(0);
  const userInfoData = sessionStorage.getItem("UserInfo");
 
  const userInfoObject = JSON.parse(userInfoData);

  const [userData, setUserData] = useState({
    id: userInfoObject.id,
    email: userInfoObject.email,
    nom: userInfoObject.nom,
    mot_de_passe: userInfoObject.mot_de_passe,
    prenom: userInfoObject.prenom,
    role: userInfoObject.role,
    token:{
      id:userInfoObject.token.id,
      token:userInfoObject.token.token,
    },
    projetids:userInfoObject.projetids,
  });

  


  

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };


   

 


 


   

 


 

  const validate = () => {
    let tempErrors = {};
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    tempErrors.nom = projectDetails.nom ? "" : "Project name is required.";
    tempErrors.description = projectDetails.description ? "" : "Description is required.";
    tempErrors.dateDebut = projectDetails.dateDebut ? "" : "Start date is required.";
    tempErrors.dateFin = projectDetails.dateFin ? "" : "End date is required.";
    if (projectDetails.dateDebut) {
      if (projectDetails.dateDebut < currentDate) {
        tempErrors.dateDebut = "Start date cannot be earlier than today.";
      }
    }
    if (projectDetails.dateDebut && projectDetails.dateFin) {
      const startDate = new Date(projectDetails.dateDebut);
      const endDate = new Date(projectDetails.dateFin);
      if (startDate > endDate) {
        tempErrors.dateFin = "End date cannot be earlier than start date.";
      }
    }
    tempErrors.status = projectDetails.status ? "" : "Status is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      
      
      try {
        const response = await fetch(
          "http://localhost:8083/SERVICE-GESTIONPROJETS/projet/addprojet",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectDetails),
          }
        );

        console.log("Response:", response);
      const id = await response.json();
      console.log(id);
      try {
        const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/UpdateEmployeeprojetcs/${id}`, {
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
        } else {
          console.error('Échec de la soumission des données au backend');
        }
      } catch (error) {
        console.error('Erreur lors de la soumission des données au backend:', error);
      }








       
        handleClose();
      } catch (error) {

        console.error("Error:", error);
      }
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle style={{ color: "#330072", fontWeight: "bolder", fontSize: "22px", marginLeft: "30%" }}>Add New Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project Name"
          type="text"
          fullWidth
          name="nom"
          value={projectDetails.nom}
          onChange={handleInputChange}
          error={!!errors.nom}
          helperText={errors.nom}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          name="description"
          value={projectDetails.description}
          onChange={handleInputChange}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          margin="dense"
          type="date"
          fullWidth
          name="dateDebut"
          value={projectDetails.dateDebut}
          onChange={handleInputChange}
          error={!!errors.dateDebut}
          helperText={errors.dateDebut}
        />
        <TextField
          margin="dense"
          type="date"
          fullWidth
          name="dateFin"
          value={projectDetails.dateFin}
          onChange={handleInputChange}
          error={!!errors.dateFin}
          helperText={errors.dateFin}
        />
        <TextField
          margin="dense"
          label="Status"
          select
          fullWidth
          name="status"
          SelectProps={{
            native: true,
          }}
          value={projectDetails.status}
          onChange={handleInputChange}
          error={!!errors.status}
          helperText={errors.status}
        >
          <option value=""></option>
          <option value="TO DO">TO DO</option>
          <option value="On Progress">On Progress</option>
          <option value="Done">Done</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button style={{ width: "50%", marginLeft: "10px", backgroundColor: '#330072', color: "white" }} onClick={handleClose}>Cancel</Button>
        <Button style={{ width: "50%", marginLeft: "20px", backgroundColor: '#330072', color: "white" }} onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Addproject;
