import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import CheckboxList from '../components/checkboxList.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Menu3 from '../../../Home/components/Menu3.jsx';
import Absenceotification from "../../../Home/components/Absenceotification";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function BacklogPage() {

  const [sprints, setSprints] = useState([]);
  const [backlogsBySprint, setBacklogsBySprint] = useState({});
  const [openCheckboxes, setOpenCheckboxes] = useState({});
  const [projectName, setProjectName] = useState('');
  const [reload,setreload]=useState(0);

  const toggleCheckboxList = (sprintName) => {
    setOpenCheckboxes(prevState => ({
      ...prevState,
      [sprintName]: !prevState[sprintName]
    }));
  };

   const { projectid } = useParams();
   console.log(projectid);
 // const  projectid  = 1;

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


 const fetchBacklogData = async () => {
  if (!projectid) {
    console.error('projectid is undefined');
    return;
  }
  try {
    const response = await fetch(`http://localhost:8083/SERVICE-TACHE/backlog/findProjectBacklogsSorted/${projectid}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Backlog data sorted:', data);

    const filteredBacklogs = data.filter((backlog) => backlog.idProjet === parseInt(projectid, 10));
    console.log('Filtered backlogs:', filteredBacklogs);

    // Group backlogs by sprint
    const backlogsGroupedBySprint = {};
    filteredBacklogs.forEach((backlog) => {
      const sprintName = backlog.sprint ? backlog.sprint.nom_sprint : 'No Sprint';
      if (!backlogsGroupedBySprint[sprintName]) {
        backlogsGroupedBySprint[sprintName] = [];
      }
      backlogsGroupedBySprint[sprintName].push(backlog);
    });

    setBacklogsBySprint(backlogsGroupedBySprint);
    console.log('Backlog data grouped by sprint:', backlogsGroupedBySprint);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};

useEffect(() => {
  fetchProjectData();
  fetchBacklogData();
}, [projectid]);


  useEffect(() => {
    const fetchSprints = async () => {
      const response = await fetch('http://localhost:8083/SERVICE-TACHE/sprint/AllSprints', {});
      const data = await response.json();
      const filteredSprints = data.filter(s => s.idProjet == projectid);
      setSprints(filteredSprints);
      console.log('Sprint data filter',filteredSprints);
      console.log('Sprint data',data);
    };

    fetchSprints();
  }, [projectid]);


  return (
    <Box display="flex" >
    <Menu3 rd={setreload} r={reload} />
    <Absenceotification  rd={setreload} r={reload} />
    <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%" , marginLeft: 3, marginRight: 3}}>

<div style={{ flexGrow: 1 , height: "100%", fontWeight: 'bold', marginTop: 5,marginBottom: 15,
                   textAlign: 'left', 
                   color: 'secondary'}}>Project  :
                    {projectName}</div>

<Grid container direction="column" spacing={3} style={{ height: "100%" }} alignItems="stretch"> 

{sprints.map((sprint) => (
  <Grid container direction="column" justifyContent="flex-end" alignItems="stretch" 
  item xs style={{ display: 'flex', flexDirection: 'column', height: "100%"}}
  spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} > 


        <Grid item xs={2} sm={4} md={4} key={sprint.id_sprint}>
  
    <Item style={{ flexGrow: 1 , height: "100%", 
                   textAlign: 'left', 
                   color: 'secondary',
                   backgroundColor: 'rgba(217, 217, 214, 0.5)'}}>

    <Button  variant="text" sx={{color:'rgb(095,036,159)',backgroundColor: 'transparent','&:hover':
                        {backgroundColor: 'rgb(217,217,214)'}, width: '100%' ,
                        textAlign: 'left'}}  onClick={() => toggleCheckboxList(sprint.nom_sprint)}> 

            {openCheckboxes[sprint.nom_sprint] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              
              <div style={{ marginLeft: '10px' , fontSize: '0.9rem',textTransform: 'none',fontWeight:'bold'}}> {sprint.nom_sprint}  </div>
              <div style={{ marginLeft: '10px',fontSize: '0.8rem' ,textTransform: 'none' }}> {sprint.Datedebut} - {sprint.Datefin}</div>
              <div style={{ marginLeft: '10px', marginRight: '10px', fontSize: '0.7rem',textTransform: 'none' }}> ({backlogsBySprint[sprint.nom_sprint]?.length || 0} tasks) </div>
              
    </Button>
    {openCheckboxes[sprint.nom_sprint] && (
                  <Item>
                    <CheckboxList showCheckboxList={true} sprint={sprint.nom_sprint} backlogs={backlogsBySprint[sprint.nom_sprint] || []} />
                  </Item>
                )}

      </Item> 
   
      </Grid>
      
    </Grid>
     ))}
  </Grid>

 
</Box>

</Box>
  )
}

export default BacklogPage