import React , { useEffect, useState } from 'react'
import Menu3 from '../../../Home/components/Menu3.jsx';
import {Box} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Grid, Typography, Button, Table, TableBody, TableContainer, TablePagination, Container } from '@mui/material';
import {  applyFilter, getComparator } from '../../administrateur/components/Table/utils';
import TableRow from './TableRow.jsx'
import TableHead from '../../administrateur/components/Table/TableHead';
import { useParams } from 'react-router-dom';
import Absenceotification from "../../../Home/components/Absenceotification";

function TaskPage() {
  const [reload,setreload]=useState(0);
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [taskData, setTaskData] = useState([]);
  const [projectName, setProjectName] = useState('');
  const { projectid } = useParams();
  console.log(projectid);

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
      
      setProjectName(data.nom);
      console.log(data);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-TACHE/Taches/AllTaches`, {
      
      });
      const data = await response.json();
      const userInfoData = sessionStorage.getItem("UserInfo");

      const userInfoObject = JSON.parse(userInfoData);
    
      const idUserConnecte = userInfoObject.id;
      const filteredTasks = data.filter(task => task.backlog && task.backlog.id_employee === idUserConnecte &&
        task.backlog.idProjet === parseInt(projectid, 10));
      
      setTaskData(filteredTasks);
      console.log(data);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProjectData();
  }, [projectid]);

  const dataFiltered = applyFilter({
    inputData: taskData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  return (
    <Box display="flex" >
     <Menu3 rd={setreload} r={reload} />
    <Absenceotification  rd={setreload} r={reload} />
     <Grid item xs={12} style={{ width: "100%" }} alignItems="stretch"  justifyContent="center"> 
     <div style={{ flexGrow: 1 , fontWeight: 'bold',marginTop: '5%',marginBottom: 15,marginRight: '5%' ,
               marginLeft: '5%', textAlign: 'left', 
                   color: 'secondary'}}>Project  :
                    {projectName}</div>
          <Card style={{  marginLeft: '5%',marginRight: '5%' }} >
          
           
          <TableContainer style={{ width: '100%' }}>
            <Table style={{ width: '100%' }}>
                  <TableHead
                  
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleSort}
                    headLabel={[
                      { id: 'id_tache', label: 'ID' },
                      { id: 'nom_tache', label: 'Task Name' },
                      { id: 'description_tache', label: 'Description' },
                      { id: 'etat_tache', label: 'Status' },
                      
                    ]}
                    
                  />
                 <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow
                          key={row.id_tache}
                          id_tache={row.id_tache}
                          nom_tache={row.nom_tache}
                          description_tache={row.description_tache}
                          etat_tache={row.etat_tache}
                          backLog={row.backLog}
                        />
                      ))}
                    
                  </TableBody>
                </Table>
              </TableContainer>
            <TablePagination
              component="div"
              count={taskData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Grid>
    </Box>
  )
}

export default TaskPage