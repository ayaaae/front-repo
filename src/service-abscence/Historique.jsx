import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@mui/material';
import axios from 'axios';
import Menu3navbar from '../Home/components/Menu3navbar';
import SideBar from '../Home/components/SideBar';

function Historique() {
  const { idsource } = useParams(); // get the idsource from the URL parameter
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDemandes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/Alldemande`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const approvedDemandes = data.filter(demande => demande.etat === 'APPROVED');
        setDemandes(approvedDemandes);
        setFilteredDemandes(approvedDemandes.filter(demande => demande.idsource === parseInt(idsource)));
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
  }, [idsource]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <>
      <Menu3navbar />
      <SideBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '3%', marginLeft: '400px', marginTop: '-150px' }}>
        <h4 className="" style={{ color: "#330072", fontWeight: "light" }}>Absence History</h4>
      </Box>
      <TableContainer sx={{ width: "1000px", marginLeft: "400px", marginTop: "20px" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "#330072 " }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>ID Source</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Description</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Request Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
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
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Historique;
