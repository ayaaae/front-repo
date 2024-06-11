import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Card } from '@mui/material';

// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Card } from '@mui/material';

// function Description({ handleClose, projectDetails }) {
//   const [formData, setFormData] = useState({
//     nom: projectDetails.nom || '',
//     description: projectDetails.description || '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(
//         "http://localhost:8083/SERVICE-GESTIONPROJETS/projet/add",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (response.ok) {
//         handleClose();
//         window.location.reload();
//       } else {
//         console.error("Failed to add project");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/list`, {
//         method: "GET",
//         mode: "cors",
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.log("Failed to fetch data from API");
//       throw new Error("Failed to fetch data from API");
//     }
//   };
// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Card } from '@mui/material';

// function Description({ handleClose, projectDetails }) {
//   const [formData, setFormData] = useState({
//     nom: projectDetails.nom || '', // Initialize formData with project name
//     description: projectDetails.description || '',
//   });

//   useEffect(() => {
//     setFormData({
//       nom: projectDetails.nom || '', // Update formData when projectDetails changes
//       description: projectDetails.description || '',
//     });
//   }, [projectDetails]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/get/${projectDetails.id}`, {
//         method: "GET",
//         mode: "cors",
//       });
//       const data = await response.json();
//       console.log("API Response:", data); // Log the API response
//       handleClose();
//     } catch (error) {
//       console.log("Failed to fetch data from API");
//       throw new Error("Failed to fetch data from API");
//     }
//   };

//   return (
//     <Dialog
//       open={true}
//       onClose={handleClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         style: {
//           backgroundColor: '#ffffff',
//           padding: '20px',
//           borderRadius: '10px'
//         }
//       }}
//     >
//       <DialogTitle style={{ color: "#330072", fontWeight: "bolder", fontSize: "22px", textAlign: "center" }}>
//         Project Description: {projectDetails.nom}
//       </DialogTitle>
//       <DialogContent>
//         <Card sx={{ width: "100%", padding: "10px", marginTop: "10px" }}>
          {/* <TextField
            disabled
            margin="dense"
            label="Project Name"
            fullWidth
            name="nom"
            value={projectDetails.nom}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          /> */}

        {/* </Card>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ width: "50%", backgroundColor: '#330072', color: "white" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          style={{ width: "50%", backgroundColor: '#330072', color: "white" }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Description; */}



function Description({ handleClose, projectDetails }) {
  const [formData, setFormData] = useState({
    nom: projectDetails.nom || '',
    description: projectDetails.description || '',
  });

  useEffect(() => {
    setFormData({
      nom: projectDetails.nom || '',
      description: projectDetails.description || '',
    });
  }, [projectDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/get/${projectDetails.id}`, {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      console.log("API Response:", data);
      handleClose();
    } catch (error) {
      console.error("Failed to fetch data from API");
      // Handle error gracefully
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#E6E6FA',
          padding: '20px',
          borderRadius: '10px'
        }
      }}
    >
      {/* <DialogTitle style={{ color: "#330072", fontWeight: "bolder", fontSize: "22px", textAlign: "left" }}>
        {projectDetails.nom}
      </DialogTitle> */}
      <DialogContent>
        <Card sx={{ width: "100%", padding: "10px", marginTop: "10px",color:"#330072" ,backgroundColor:'#E6E6FA',height:"300px"}}>
          <div style={{ color: "#330072", fontWeight: "bolder", fontSize: "22px", textAlign: "left" }}>{projectDetails.nom}</div>
          {/* <TextField
            disabled
            id="outlined-disabled"
            label="ID"
            defaultValue={projectDetails.id}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={projectDetails.description}
            onChange={handleInputChange}
          /> */}
          {projectDetails.description}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ width: "100%", backgroundColor: '#330072', color: "white" }}
          onClick={handleClose}
        >
          Close
        </Button>
        
      </DialogActions>
    </Dialog>
  );
}

export default Description;
