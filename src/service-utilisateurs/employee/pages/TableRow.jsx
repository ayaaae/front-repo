import { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, Select, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// ----------------------------------------------------------------------




export default function TaskTableRow({

    id_tache,
    nom_tache,
    description_tache,
    etat_tache,
    backLog,
}) {
  const [open, setOpen] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [taskData, setTaskData] = useState('');
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setSelectedValue(etat_tache);
  }, []);

  useEffect(() => {
    switch (selectedValue) {
      case 'ENCOURS':
        setBgColor('rgb(237, 155, 51, 0.4)');
        break;
      case 'AFAIRE':
        setBgColor('rgb(99, 102, 106, 0.4)');
        break;
      case 'FAIT':
        setBgColor('rgb(108, 194, 74, 0.4)');
        break;
      default:
        setBgColor('');
    }
  }, [selectedValue]);

  const handleChange = (event) => {
    const newEtatTache = event.target.value;
    setSelectedValue(newEtatTache);
    updateTaskStatusInDatabase(id_tache, newEtatTache);
};

console.log('Request Body:'+backLog);
const updateTaskStatusInDatabase = async (taskId, selectedValue) => {

  try {
    const requestBody = {
      id_tache: taskId,
      etat_tache: selectedValue,
      nom_tache: nom_tache, 
      description_tache: description_tache, 
      backLog: {
      
        id_backlog:backLog.id_backlog,
        etat: backLog.etat,
        idProjet: backLog.idProjet,
        nom_backlog: backLog.nom_backlog,
        description: backLog.description,
        id_employee: backLog.id_employee,
        prioriter: backLog.prioriter,
        employe: backLog.employe,
        sprint: backLog.sprint,
        epic: backLog.epic,
  
      }
      
    };
    
    console.log('Request Body:'+JSON.parse(backLog.id_backlog));

      const response = await fetch(`http://localhost:8083/SERVICE-TACHE/Taches/update/${taskId}`, {
          method: 'PUT', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            requestBody
          ),
      });
      const data = await response.json();
      console.log(data); 

      console.log('Request Body:', requestBody);
      console.log(response);

   
  } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'état de la tâche:', error);
  }
};

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow hover style={{ width: '100%' }}>
        


      <TableCell>{id_tache}</TableCell>

        <TableCell>{nom_tache}</TableCell>

        <TableCell>{description_tache}</TableCell>


        <TableCell>
               
                            <Select
                                id="etat_tache"
                                size="small" 
                                value={selectedValue}
                                onChange={handleChange}
                                style={{ marginLeft: '10px',fontSize: '0.80rem',
                                  margin: '0 10px',
                                 
                                }}
                                sx={{
                                  bgcolor: bgColor,
                                  '&:hover': {
                                    bgcolor: bgColor,
                                  },
                                }} >
                            
                            <MenuItem value="ENCOURS" sx={{ bgcolor: 'rgb(237, 155, 51,0.4)', '&:hover': { bgcolor: 'rgb(237, 155, 51,0.4)' } }}>In Progress</MenuItem>
                            <MenuItem value="AFAIRE" sx={{ bgcolor: 'rgb(99,102,106,0.4)', '&:hover': { bgcolor: 'rgb(99,102,106,0.4)' } }}>To Do</MenuItem>
                            <MenuItem value="FAIT" sx={{ bgcolor: 'rgb(108,194,074,0.4)', '&:hover': { bgcolor: 'rgb(108,194,074,0.4)' } }}>Done</MenuItem>
                          </Select>
                       
             
      </TableCell>

      </TableRow>

     
    </>
  );
}

TaskTableRow.propTypes = {

    id_tache:PropTypes.any,
    nom_tache: PropTypes.any,
    description_tache: PropTypes.any,
    handleClick: PropTypes.func,
    etat_tache: PropTypes.any,
    backLog:PropTypes.any,
};
