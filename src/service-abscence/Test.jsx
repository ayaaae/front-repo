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
  IconButton,
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Menu3navbar from '../Home/components/Menu3navbar';
import SideBar from '../Home/components/SideBar';
import EditIcon from '@mui/icons-material/Edit';

function Historique() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDocs, setOpenDocs] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredDemandes, setFilteredDemandes] = useState([]);

  const fetchDemandes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/Alldemande', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Received data:', data); // Log data
        const approvedDemandes = data.filter(demande => demande.etat === 'APPROVED');
        setDemandes(approvedDemandes);
        setFilteredDemandes(approvedDemandes); // Initialize filteredDemandes with the approved demandes
      } else {
        setError(`Error: ${response.statusText}`);
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    console.log('Search value changed:', searchValue);
    if (searchValue.trim() === '') {
      console.log('Resetting filteredDemandes to all demandes');
      setFilteredDemandes(demandes); // Reset the filteredDemandes state
    } else {
      const filtered = demandes.filter((demande) => {
        return demande.motif && demande.motif.toLowerCase().includes(searchValue.toLowerCase());
      });
      console.log('Filtered demandes:', filtered);
      setFilteredDemandes(filtered);
    }
  }, [searchValue, demandes]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Menu3navbar />
      <SideBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '3%', marginLeft: '400px', marginTop: '-150px' }}>
        <h4 className="" style={{ color: "#330072", fontWeight: "light" }}>Absence History </h4>
      </Box>
      <Box sx={{ display: 'flex', marginLeft: '400px', marginTop: '-35px' }}>
        <TextField
          type="search"
          placeholder="Search by employee name..."
          value={searchValue}
          onChange={handleSearchChange}
          sx={{ width: 200 }}
          InputProps={{
            style: {
              height: '30px',
              padding: '0 10px',
            },
          }}
        />
        <IconButton
          sx={{
            height: '30px',
            marginTop: 'auto',
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <TableContainer sx={{ width: "1000px", marginLeft: "400px", marginTop: "20px" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "#330072 " }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>ID Source</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Description</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Request date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Period</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Docs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDemandes.length > 0 ? (
              filteredDemandes.map((demande) => {
                const startDate = new Date(demande.datedebut);
                const endDate = new Date(demande.datefin); // assuming the end date is the same as the start date for now

                // calculate the period
                const period = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

                return (
                  <TableRow key={demande.idsource}>
                    <TableCell component="th" scope="row" sx={{ textAlign: "center" }}>
                      {demande.idsource}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{demande.nomcompletsource}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{demande.motif}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {demande.datedemand ? demande.datedemand.substring(0, 10) : ''}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {period} days
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setOpenDocs(true);
                          setSelectedDemande(demande);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
}

export default Historique;
