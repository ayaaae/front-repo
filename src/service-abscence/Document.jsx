import React from 'react'
import Document from 'react-pdf';

function Document() {
  return (
    <div>
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
    </div>
  )
}

export default Document