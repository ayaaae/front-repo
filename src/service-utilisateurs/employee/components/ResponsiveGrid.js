import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListSubheader from '@mui/material/ListSubheader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const [tachesData, setTachesData] = useState([]);
  const [projectName, setProjectName] = useState('');
  const { projectid } = useParams();
  console.log(projectid);

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
  

  const fetchTachesData = async () => {
    try {
      console.log(`Fetching tasks for project ID: ${projectid}`);
      const response = await fetch('http://localhost:8083/SERVICE-TACHE/Taches/AllTaches');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('All tasks data:', data);
      const filteredTasks = data.filter(task => task.backlog && task.backlog.idProjet === parseInt(projectid, 10));
      console.log('Filtered tasks:', filteredTasks);
      setTachesData(filteredTasks);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchTachesData();
    fetchProjectData();
  }, [projectid]);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%", marginLeft: 3, marginRight: 3 }}>
     <div style={{ flexGrow: 1 , height: "100%", fontWeight: 'bold', marginTop: 5,marginBottom: 15,
                   textAlign: 'left', 
                   color: 'secondary'}}>Project  :
                    {projectName}</div>

      <Grid container spacing={3} style={{ height: "100%" }} alignItems="stretch">
        <Grid item xs style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
          <Item style={{
            flexGrow: 1, height: '500px', overflowY: 'auto', fontWeight: 'bold',
            textAlign: 'left',
            color: 'secondary',
            backgroundColor: 'rgba(217, 217, 214, 0.5)'
          }}>
            <ListSubheader md={0.5} sx={{
              color: 'rgb(099,102,106)', backgroundColor: 'rgba(217, 217, 214, 0.5)', '&:hover':
                { backgroundColor: 'rgb(217,217,214)' }, fontWeight: 'bold', width: '100%', textAlign: 'center',
              marginBottom: '0px'
            }}>
              TO DO <ListAltIcon />
            </ListSubheader>

            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="column">
              {tachesData.filter(tache => tache.etat_tache === 'AFAIRE').map(tache => (
                <Grid item xs={2} sm={4} md={0.5} key={tache.id}>
                  <Item>
                    <div>{tache.nom_tache}</div>
                    <div>{tache.description_tache}</div>
                    <Button variant="contained" size="small" sx={{
                      fontSize: '0.50rem', width: '100%',
                      bgcolor: tache.backlog.epic ? tache.backlog.epic.couleur : 'rgb(99,102,106)', '&:hover': {
                        bgcolor: tache.backlog.epic ? tache.backlog.epic.couleur : 'rgb(99,102,106)',
                      },
                    }}>
                      {tache.backlog ? tache.backlog.epic.nom_epic : 'No Epic'}
                    </Button>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Item>
        </Grid>

        <Grid item xs style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
          <Item style={{
            flexGrow: 1, height: '500px', overflowY: 'auto', fontWeight: 'bold',
            textAlign: 'left',
            color: 'secondary',
            backgroundColor: 'rgba(217, 217, 214, 0.5)'
          }}>
            <ListSubheader md={0.5} sx={{
              color: 'rgb(237,155,051)', backgroundColor: 'rgba(237,155,051, 0.1)', '&:hover':
                { backgroundColor: 'rgba(237,155,051, 0.2)' }, fontWeight: 'bold', width: '100%', textAlign: 'center',
              marginBottom: '0px'
            }}>
              IN PROGRESS <AccessTimeIcon />
            </ListSubheader>

            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="column">
              {tachesData.filter(tache => tache.etat_tache === 'ENCOURS').map(tache => (
                <Grid item xs={2} sm={4} md={0.5} key={tache.id}>
                  <Item>
                    <div>{tache.nom_tache}</div>
                    <div>{tache.description_tache}</div>
                    <Button variant="contained" size="small" sx={{
                      fontSize: '0.50rem', width: '100%',
                      bgcolor: tache.backlog.epic ? tache.backlog.epic.couleur : 'rgb(99,102,106)', '&:hover': {
                        bgcolor: tache.backlog.epic ? tache.backlog.epic.couleur : 'rgb(99,102,106)',
                      },
                    }}>
                      {tache.backlog ? tache.backlog.epic.nom_epic : 'No Epic'}
                    </Button>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Item>
        </Grid>

        <Grid item xs style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
          <Item style={{
            flexGrow: 1, height: '500px', overflowY: 'auto', fontWeight: 'bold',
            textAlign: 'left',
            color: 'secondary',
            backgroundColor: 'rgba(217, 217, 214, 0.5)'
          }}>
            <ListSubheader md={0.5} sx={{
              color: 'rgb(108,194,074)', backgroundColor: 'rgba(108,194,074, 0.1)', '&:hover':
                { backgroundColor: 'rgba(108,194,074, 0.2)' }, fontWeight: 'bold', width: '100%', textAlign: 'center',
              marginBottom: '0px'
            }}>
              DONE <DoneIcon />
            </ListSubheader>

            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="column">
              {tachesData.filter(tache => tache.etat_tache === 'FAIT').map(tache => (
                <Grid item xs={2} sm={4} md={0.5} key={tache.id}>
                  <Item>
                    <div>{tache.nom_tache}</div>
                    <div>{tache.description_tache}</div>
                    <Button variant="contained" size="small" sx={{
                      fontSize: '0.50rem', width: '100%',
                      bgcolor: tache.backlog.epic ? tache.backlog.epic.couleur : 'rgb(99,102,106)', '&:hover': {
                        bgcolor: tache.backlog.epic ? tache.backlog.epic.couleur : 'rgb(99,102,106)',
                      },
                    }}>
                      {tache.backlog ? tache.backlog.epic.nom_epic : 'No Epic'}
                    </Button>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
