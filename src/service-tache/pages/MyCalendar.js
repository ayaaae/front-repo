import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Absenceotification from '../../Home/components/Absenceotification.jsx';
import Menu3 from '../../Home/components/Menu3.jsx';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import NotesIcon from '@mui/icons-material/Notes';
import TaskIcon from '@mui/icons-material/Task';

const localizer = momentLocalizer(moment);

function MyCalendar() {
    const [reload, setReload] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');
    const [title, setTitle] = useState('');
    const [selectedTask, setSelectedTask] = useState('');
    const [notes, setNotes] = useState('');
    const [userTasks, setUserTasks] = useState([]);

    const userInfoData = sessionStorage.getItem("UserInfo");
    const userInfoObject = JSON.parse(userInfoData);
    const idUserConnecte = userInfoObject.id;

    const [myEventsList, setMyEventsList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8083/SERVICE-TACHE/events/AllEvents')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const filteredEvents = data.filter(event => event.idemployee === idUserConnecte);
                
                const formattedEvents = filteredEvents.map(event => ({
                    ...event,
                    title: `${event.title}<br/>${event.task_name}`,
                    start: new Date(moment(event.dateTime).format('YYYY-MM-DD HH:mm')), 
                    end: new Date(moment(event.dateTime).add(1, 'hour').format('YYYY-MM-DD HH:mm')), 

                }));
                
                setMyEventsList(formattedEvents);
                
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    useEffect(() => {
        alert("myEventsList"+ JSON.stringify(myEventsList));
    }, [myEventsList]); 

    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8083/SERVICE-TACHE/Taches/AllTaches`, {
          
          });
          const data = await response.json();
          
          const filteredTasks = data.filter(task => task.idemployee === idUserConnecte 
            && task.etat_tache !='FAIT'
          );
          
          setUserTasks(filteredTasks);
          console.log(data);
          
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    

    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
       
        setFormattedDate(moment(slotInfo.start).format('YYYY-MM-DD HH:mm'));
        
        setDialogOpen(true);
    
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedDate(null);
        setFormattedDate('');
        setTitle('');
        setSelectedTask('');
        setNotes('');
    };

    const handleSave = () => {
        const eventData = {
            dateTime:selectedDate,
            title: title,
            task_name: selectedTask,
            notes: notes,
            idemployee:idUserConnecte
        };
        
    
        fetch('http://localhost:8083/SERVICE-TACHE/events/createEvent', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert("Event created");
            handleCloseDialog()
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error while creating Event ");
        });
    };
    

    return (
        <Box display="flex">
            <Menu3 rd={setReload} r={reload} />
            <Absenceotification rd={setReload} r={reload} />
            <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%", marginLeft: 3, marginRight: 3 }}>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    components={{
                        event: ({ event }) => (
                            <span dangerouslySetInnerHTML={{ __html: event.title }} />
                        )
                    }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                />
            </Box>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Date Selected</DialogTitle>
                <DialogContent>
                   
                     <TextField
                       margin="dense"
                       label="Selected Date and Time"
                       type="text"
                       fullWidth
                       value={formattedDate}
                        InputProps={{
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                            <EventIcon />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <EditIcon />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />

                    <TextField
                    select
                     fullWidth
                     margin="dense"
                    id="task-native-select"
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <TaskIcon />
                            </InputAdornment>
                        ),
                        }}
                    >
                    {userTasks.map(task => (
                        <MenuItem key={task.id_tache} value={task.nom_tache}>{task.nom_tache}
                        </MenuItem>
                    ))}
                    </TextField>

                    <TextField
                        margin="dense"
                        label="Notes"
                        type="text"
                        fullWidth
                        multiline
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <NotesIcon />
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                    />

                   
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default MyCalendar;
