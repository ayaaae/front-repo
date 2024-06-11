import React from 'react'
import { useState ,useEffect} from 'react';
import Menu3 from '../Home/components/Menu3';
import Absenceotification from "../Home/components/Absenceotification";
import Box from '@mui/material/Box';
import { Card, CardContent, Grid, Typography, Button, Table, TableBody, TableContainer, TablePagination, Container } from '@mui/material';
import {  applyFilter, getComparator } from '../../src/service-utilisateurs/administrateur/components/Table/utils';
import TableHead from '../../src/service-utilisateurs/administrateur/components/Table/TableHead';
import { useParams } from 'react-router-dom';
import SummarizeIcon from '@mui/icons-material/Summarize';
import {  IconButton,   TableRow,TableCell}  from '@mui/material';
import {useNavigate } from 'react-router-dom';

function ProjectEmployeesList() {
  const [reload,setreload]=useState(0);
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [projectEmployeesData, setProjectEmployeesData] = useState([]);
  const [project, setProject] = useState('');
  const { projectid } = useParams();
  const navigate = useNavigate();

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };


  const fetchProjectData = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/get/${projectid}`, {
      
      });
      const data = await response.json();
      
      setProject(data);
      console.log(data);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  
  const fetchProjectEmployeesData = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/public/Employeespeojet/${projectid}`, {
      
      });
      const data = await response.json();
      
      setProjectEmployeesData(data);
      console.log(data);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchProjectEmployeesData();
    fetchProjectData();
  }, [projectid]);

  const dataFiltered = applyFilter({
    inputData: projectEmployeesData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  return (
  
    <Box display="flex" >
    <Menu3 rd={setreload} r={reload} />
    <Absenceotification  rd={setreload} r={reload} />
    <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%" , marginLeft: 3, marginRight: 3}}>

    <Grid item xs={12} style={{ width: "100%" }} alignItems="stretch"  justifyContent="center"> 
     <div style={{ flexGrow: 1 , fontWeight: 'bold',marginTop: '5%',marginBottom: 15,marginRight: '5%' ,
               marginLeft: '5%', textAlign: 'left', 
                   color: 'secondary'}}>Project  :
                    {project.nom}</div>
          <Card style={{  marginLeft: '5%',marginRight: '5%' }} >
          
           
          <TableContainer style={{ width: '100%' }}>
            <Table style={{ width: '100%' }}>
                  <TableHead
                  
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleSort}
                    headLabel={[
                      { id: 'id', label: 'ID Employee' },
                      { id: 'nom', label: 'Project Name' },
                      { id: 'prenom', label: 'Employee Full Name' },
                      { id: 'email', label: 'Employee Mail' },
                      { id: 'role', label: 'Employee Function' },
                      { id: '', label: 'Report' },
                    ]}
                    
                  />
                 <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow  key={row.id}>
                         
                         <TableCell>{row.id}</TableCell>
                         <TableCell>{project.nom}</TableCell>
                         <TableCell>{row.prenom} {row.nom}</TableCell>
                         <TableCell>{row.email}</TableCell>
                         <TableCell>{row.role}</TableCell>
                         <TableCell>{row.backLog}</TableCell>
                        
                         <IconButton onClick={()=>navigate(`/EmployeeTasksReport/${row.id}`)} color="primary" aria-label="edit">
                                <SummarizeIcon />
                        </IconButton>
                         
                          
                        </TableRow>
                      ))}
                    
                  </TableBody>
                </Table>
              </TableContainer>
            <TablePagination
              component="div"
              count={projectEmployeesData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Grid>

    </Box>

</Box>
  )
}

export default ProjectEmployeesList