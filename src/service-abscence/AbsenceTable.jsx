import React, { useState, useEffect } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import EditAbsenceForm from './EditAbsenceForm';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Document, Page } from 'react-pdf';



const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // your styles here
}));

const ActionCell = ({ onEdit, onCancel , etat}) => {
  return (
    <TableCell>
    {etat === 'UNREAD' && (
      <>
        <IconButton onClick={onEdit} color="primary" aria-label="edit">
          <EditIcon sx={{color:"#F0E68C"}}/>
        </IconButton>
        <IconButton onClick={onCancel}  aria-label="cancel" sx={{ fontSize: '0.8rem',color:"#330072" }} >
          <CancelIcon sx={{color:"#330072"}}/>
          Cancel
        </IconButton>
      </>
    )}
  </TableCell>
  );
};

const AbsenceTable = () => {
  const [demandes, setDemandes] = useState([]);
  const [open, setOpen] = useState(false);
  
const userInfoData = sessionStorage.getItem("UserInfo");
const userInfoObject = JSON.parse(userInfoData);
const idsUserConnecte = userInfoObject.id;

  const [newDemande, setNewDemande] = useState({
    motif: '',
    etat: 'UNREAD',
    datedemand: new Date(),
    datedebut: new Date(),
    datefin: new Date(),
    notifications: [],
    iddestination: '',
    idsource: idsUserConnecte,
    nomcompletsource: `${userInfoObject.nom} ${userInfoObject.prenom}`,
  });
  const [lastId, setLastId] = useState(1);
  const [chefsDeProjet, setChefsDeProjet] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);
  const [openDocs, setOpenDocs] = useState(false);
 
  
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const handleEditDemande = (demande) => {
    setSelectedDemande(demande); 
    setNewDemande(demande);
    setOpen(true); 
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFilePreviewUrl(URL.createObjectURL(event.target.files[0]));
    console.log('Selected file:', selectedFile);
  };
  const handleCancel = (id) => {
    const url = `http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/annuler/${id}`; 
  
    fetch(url, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'annulation de la demande');
        }
        return response.json();
      })
      .then(data => {
        console.log('Demande annulée avec succès:', data);
      
      })
      .catch(error => {
        console.error('Erreur lors de l\'annulation de la demande:', error);
      });
  };
  
  const handleOpenDocs = () => {
    setOpenDocs(true);
    console.log('Selected demande:', selectedDemande);
  };
  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = () => {
    axios.get('http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/Alldemande', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
      },
    })
      .then(response => {
        const demandesWithDateObjects = response.data.map(demande => ({
          ...demande,
          datedemand: new Date(demande.datedemand),
          datedebut: new Date(demande.datedebut),
          datefin: new Date(demande.datefin),
        }));
        setDemandes(demandesWithDateObjects);
  
        // Assuming idsUserConnecte is available in the scope
        const filtered = demandesWithDateObjects.filter((demande) =>
          demande.idsource && demande.idsource === idsUserConnecte
        );
        setFilteredDemandes(filtered);
  
        const maxId = Math.max(...response.data.map(demande => demande.id), 0);
        setLastId(maxId + 1);
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  const handleOpen = () => {
    setNewDemande({
      motif: '',
      etat: 'UNREAD',
      datedemand: new Date(),
      datedebut: new Date(),
      datefin: new Date(),
      notifications: [],
      iddestination: '',
      idsource: idsUserConnecte,
      nomcompletsource: `${userInfoObject.nom} ${userInfoObject.prenom}`,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event, name) => {
    const value = event.target.value;
    setNewDemande({ ...newDemande, [name]: value });
  };

  const handleSelectChange = (event) => {
    setNewDemande({ ...newDemande, iddestination: event.target.value });
  };

  const handleDateChange = (date, name) => {
    setNewDemande({ ...newDemande, [name]: date });
  };

  const handleSubmit = () => {
  if (
   !newDemande.motif ||
   !newDemande.datedemand ||
   !newDemande.datedebut ||
   !newDemande.datefin
  ) {
    alert('Please fill in all fields.');
    return;
  }

  const formattedDemande = {
   ...newDemande,
    datedemand: newDemande.datedemand.toISOString(),
    datedebut: newDemande.datedebut.toISOString(),
    datefin: newDemande.datefin.toISOString(),
    docs: selectedFile ? [selectedFile.name] : []
  };

  console.log("Request payload:", formattedDemande);

  // Upload the file to the DocumentUploadServer

  
    // Upload the file to the DocumentUploadServer
    const formData = new FormData();
    formData.append('pdfFiles', selectedFile);
  
    axios.post('http://localhost:3002/uploadpdf', formData)
    .then(response => {
       console.log('File uploaded successfully:', response.data);
       const fileUrl = response.data.fileUrl;
       setFileUrls({...fileUrls, [response.data.id]: fileUrl });
       console.log('File URLs:', fileUrls);
 
       // Create a new demande with the uploaded file URL
       formattedDemande.documentUrl = fileUrl;
       formattedDemande.docs = [selectedFile.name]; // Add the uploaded file to the docs array
 
       console.log('Formatted demande:', formattedDemande);
 
       // Create a new demande
       axios.post('http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/createdemmande', formattedDemande, {
         headers: {
           'Content-Type': 'application/json'
         }
       })
        .then(response => {
           setDemandes([...demandes, response.data]);
           setLastId(lastId + 1); // Increment lastId
           setOpen(false);
           setSelectedDemande(response.data); // Update the selectedDemande state
           console.log('Selected demande:', selectedDemande);
         })
        .catch(error => {
           console.error(error);
           alert(`Failed to create demande: ${error.message}`);
         });
     })
    .catch(error => {
       console.error('Error uploading file:', error);
       alert('Failed to upload file');
     });
 };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8083/SERVICE-UTILISATEUR/ListEmployee', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
          },
        });
        const data = await response.json();
        setChefsDeProjet(data.filter(user => user.role === "chef_projet"));
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchUserData();
  }, []);
  // const renderDocs = (docs) => {
  //   return (
  //     <div>
  //       {docs.map((doc) => (
  //         <div key={doc}>
  //           <a href={fileUrls[doc]} target="_blank" rel="noopener noreferrer">
  //             <FontAwesomeIcon icon={faFilePdf} />
  //           </a>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <>
      <div>
      <Button variant="contained" style={{marginLeft:'1270px',top:'-160px'}} sx={{ bgcolor: '#330072', color: 'white',}} startIcon={<AddIcon />} onClick={handleOpen}>
  Request
</Button>
      </div>
      <TableContainer sx={{ width: "1000px", marginLeft: "400px", marginTop: "-140px" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "#330072 " }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center"  }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" , textAlign: "center" }}>Description</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" , textAlign: "center" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center"  }}>Request date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" , textAlign: "center" }}>Start date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",textAlign: "center" }}>End date</TableCell>
              
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center"     }}>Action</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",textAlign: "center" }}>Docs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDemandes.map((demande) => (
              <StyledTableRow key={demande.id}>
                <TableCell component="th" scope="row" sx={{ textAlign: "center" }}>
                  {demande.id}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{demande.motif}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{demande.etat}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{demande.datedemand ? new Date(demande.datedemand).toLocaleDateString() : ''}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{demande.datedebut ? new Date(demande.datedebut).toLocaleDateString() : ''}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{demande.datefin ? new Date(demande.datefin).toLocaleDateString() : ''}</TableCell>
                
                <ActionCell
                onEdit={() => handleEditDemande(demande)}
                onCancel={() => handleCancel(demande.id)}
                etat={demande.etat}
                />
                
                <TableCell sx={{ textAlign: "center" }}>
  <AssignmentIcon onClick={handleOpenDocs} />
</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

            {/* Call the Edit From component */}

      {/* <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <EditAbsenceForm demande={selectedDemande} handleClose={handleClose} />
        </DialogContent>
      </Dialog> */}
              {/* ----------- */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Demande</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="motif"
                value={newDemande.motif}
                onChange={(event) => handleInputChange(event, 'motif')}
                label="Motif"
                fullWidth
                error={!newDemande.motif}
                helperText={!newDemande.motif ? 'This field is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="iddestination-label">Chef de Projet</InputLabel>
                <Select
                  labelId="iddestination-label"
                  id="iddestination"
                  name="iddestination"
                  value={newDemande.iddestination}
                  onChange={handleSelectChange}
                >
                  {chefsDeProjet.map((chefDeProjet) => (
                    <MenuItem key={chefDeProjet.id} value={chefDeProjet.id}>
                      {chefDeProjet.nom} {chefDeProjet.prenom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                name="datedemand"
                selected={newDemande.datedemand}
                onChange={(date) => handleDateChange(date, 'datedemand')}
                dateFormat="yyyy-MM-dd"
                label="Date de demande"
                fullWidth
                showYearDropdown
                scrollableYearDropdown
                placeholderText="Select date"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                name="datedebut"
                selected={newDemande.datedebut}
                onChange={(date) => handleDateChange(date, 'datedebut')}
                dateFormat="yyyy-MM-dd"
                label="Date de début"
                fullWidth
                showYearDropdown
                scrollableYearDropdown
                placeholderText="Select date"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                name="datefin"
                selected={newDemande.datefin}
                onChange={(date) => handleDateChange(date, 'datefin')}
                dateFormat="yyyy-MM-dd"
                label="Date de fin"
                fullWidth
                showYearDropdown
                scrollableYearDropdown
                placeholderText="Select date"
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleFileChange} />
              {filePreviewUrl && <img src={filePreviewUrl} alt="Selected File" style={{ width: '100%', height: 'auto' }} />}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDocs}
        onClose={() => setOpenDocs(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Documents</DialogTitle>
        <DialogContent>
          {selectedDemande && selectedDemande.docs && selectedDemande.docs.length > 0 ? (
            <Grid container spacing={2}>
              {selectedDemande.docs.map((doc, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <a href={`http://localhost:3002/Uploads/Profilesdocs/${doc}`} target="_blank" rel="noopener noreferrer">
                    {doc}
                  </a>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No documents found.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDocs(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AbsenceTable;