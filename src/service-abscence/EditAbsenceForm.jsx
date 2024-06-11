import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';

function EditAbsenceForm({   demande,handleClose }) {
  const [editedDemande, setEditedDemande] = useState({ ...demande });

  useEffect(() => {
    setEditedDemande({ ...demande });
  }, [demande]);
  
  const handleSubmit = (editedDemande) => {
    // Construction de l'URL de l'API pour mettre à jour la demande
    const url = `http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/update/${editedDemande.id}`;
  
    // Préparation des données à envoyer dans la requête PUT
    const requestData = {
      motif: editedDemande.motif,
      etat: editedDemande.etat,
      datedemand: editedDemande.datedemand.toISOString(),
      datedebut: editedDemande.datedebut.toISOString(),
      datefin: editedDemande.datefin.toISOString(),
      iddestination: editedDemande.iddestination,
      idsource: editedDemande.idsource,
      nomcompletsource: editedDemande.nomcompletsource
      // Assurez-vous d'inclure toutes les autres propriétés de la demande
    };
  
    // Envoi de la requête PUT avec fetch
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de la demande');
        }
        return response.json();
      })
      .then(data => {
        console.log('Demande mise à jour avec succès:', data);
        // Après avoir soumis la demande avec succès, vous pouvez fermer la boîte de dialogue
        handleClose();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la demande:', error);
        // Gérez les erreurs ici
      });
  };

  const handleInputChange = (event, name) => {
    const value = event.target.value;
    setEditedDemande({ ...editedDemande, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setEditedDemande({ ...editedDemande, [name]: date });
  };

  return (
    <Dialog  onClose={handleClose}>
      <DialogTitle>Edit Demande</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="id"
              value={editedDemande.id}
              onChange={(event) => handleInputChange(event, 'id')}
              label="ID"
              fullWidth
              disabled // ID should not be edited
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="motif"
              value={editedDemande.motif}
              onChange={(event) => handleInputChange(event, 'motif')}
              label="Motif"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="etat"
              value={editedDemande.etat}
              onChange={(event) => handleInputChange(event, 'etat')}
              label="Etat"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="datedemand"
              value={editedDemande.datedemand?.toLocaleDateString()}
              onChange={(event) => handleDateChange(event.target.valueAsDate, 'datedemand')}
              label="Date de demande"
              type="date"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="datedebut"
              value={editedDemande.datedebut?.toLocaleDateString()}
              onChange={(event) => handleDateChange(event.target.valueAsDate, 'datedebut')}
              label="Date de début"
              type="date"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="datefin"
              value={editedDemande.datefin?.toLocaleDateString()}
              onChange={(event) => handleDateChange(event.target.valueAsDate, 'datefin')}
              label="Date de fin"
              type="date"
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(editedDemande)}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAbsenceForm;
