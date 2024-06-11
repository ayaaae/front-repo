// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Menu3 from '../../../src/Home/components/Menu3';
// import Absenceotification from "../../../src/Home/components/Absenceotification";
// import { Card, CardContent, Typography, Avatar, Grid, Table, TableBody,
//    TableCell, TableContainer, TableHead, TableRow, Paper ,CardMedia } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import { useParams } from 'react-router-dom';
// import { Container, CssBaseline } from '@mui/material';
// import MyChart from '../pages/Manager/MyChart';

// const OuterCard = styled(Card)(({ theme }) => ({
//   margin: theme.spacing(2),
//   padding: theme.spacing(2),
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: 'rgb(099,102,106)',
//   color: 'white',
//   width: '100%',
// }));

// const StyledAvatar = styled(Avatar)(({ theme }) => ({
//   backgroundColor: 'white',
//   color: 'green',
//   marginRight: theme.spacing(2),
// }));

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'left',
//   color: theme.palette.text.secondary,
// }));

// function EmployeeTasksReports() {
//   const [reload, setreload] = useState(false);
//   const [employeeData, setEmployeeData] = useState('');
//   const { userId } = useParams();
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/public/GetEmployee/${userId}`, {});
//       const data = await response.json();
//       setEmployeeData(data);
//       console.log(data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des données:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [userId]);

  
//   useEffect(() => {


//     console.log("Fetching tasks for userId:", userId);

//     fetch(`http://localhost:8083/SERVICE-TACHE/Taches/AllTaches`)
//       .then(response => response.json())
//       .then(data => {

//         const filteredData = data.filter(task => String(task.idemployee) === String(userId));

      
        
//           setData(filteredData);
       
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, [userId]);


//   return (
//     <Box display="flex">
//       <Menu3 rd={setreload} r={reload} />
//       <Absenceotification rd={setreload} r={reload} />

//       <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%", marginLeft: 3, marginRight: 3 }}>
//         <OuterCard>
//           <StyledCard>
//             <CardContent>
//               <Grid container alignItems="center">
//                 <Grid item>
//                   <StyledAvatar>
//                     <AssessmentIcon />
//                   </StyledAvatar>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="h5" component="div">
//                     Employee ID: {employeeData.id}
//                   </Typography>
//                   <Typography variant="h6" component="div">
//                     Employee Full Name: {employeeData.nom} {employeeData.prenom}
//                   </Typography>
//                 </Grid>
               
//               </Grid>
//             </CardContent>
//           </StyledCard>

//           <Grid container spacing={3} direction="row" sx={{ marginTop: 1 }}>
//           <Grid item xs>
//           <Paper
//             style={{
//               flexGrow: 1,
//               height: '500px',
//               overflowY: 'auto',
//               fontWeight: 'bold',
//               textAlign: 'left',
//               color: 'secondary',
//               backgroundColor: 'rgba(0, 105, 117, 0.1)',
//               padding: '16px',
//             }}
//           >
//             <Grid container spacing={2} direction="column">
//               {/* Content for the first column */}
//               <Grid item>
               
//                 <MyChart userId={userId} sx={{margin : 1}}/>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//            <Grid item xs>
//            <Item
//              style={{
//                flexGrow: 1,
//                height: '500px',
//                overflowY: 'auto',
//                fontWeight: 'bold',
//                textAlign: 'left',
//                color: 'secondary',
//                backgroundColor: 'rgba(255, 205, 0, 0.2)',
//              }}
//            >
//              <Grid container spacing={2} direction="column">
//                <Grid item>
//                  <TableContainer component={Paper}>
//                    <Table aria-label="simple table">
//                      <TableHead>
//                        <TableRow sx={{bgcolor:'rgb(249,240,072,0.2)'}}>
//                          <TableCell>Task ID</TableCell>
//                          <TableCell align="right">Task Name</TableCell>
//                          <TableCell align="right">Task Description</TableCell>
//                          <TableCell align="right">Status</TableCell>
//                          <TableCell align="right">Time</TableCell>
                         
//                        </TableRow>
//                      </TableHead>
//                      <TableBody>
//                        {data.map((task) => (
//                          <TableRow key={task.id}>
//                            <TableCell component="th" scope="row">
//                              {task.id_tache}
//                            </TableCell>
//                            <TableCell align="right">{task.nom_tache}</TableCell>
//                            <TableCell align="right">{task.description_tache}</TableCell>
//                            <TableCell align="right">{task.etat_tache}</TableCell>
//                            <TableCell align="right">{task.duree}</TableCell>
                           
//                          </TableRow>
//                        ))}
//                      </TableBody>
//                    </Table>
//                  </TableContainer>
//                </Grid>
//              </Grid>
//            </Item>
//          </Grid>

//             {/* <Grid item xs>
//               <Item style={{
//                 flexGrow: 1, height: '500px', overflowY: 'auto', fontWeight: 'bold',
//                 textAlign: 'left', color: 'secondary', backgroundColor: 'rgba(095, 036, 159, 0.2)'
//               }}>
//                 <Grid container spacing={2} direction="column">
//                   {/* Content for the third column 
//                 </Grid>
//               </Item>
//             </Grid> */}
//           </Grid>

         
//         </OuterCard>
//       </Box>
//     </Box>
//   );
// }

// export default EmployeeTasksReports;
