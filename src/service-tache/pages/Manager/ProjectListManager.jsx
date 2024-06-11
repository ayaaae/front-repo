import React, { useState, useEffect } from 'react';
import { DialogActions } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Menu3navbar from "../../../Home/components/Menu3navbar"
import { styled } from '@mui/system';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Slide } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup'; // Add this import
import FormControlLabel from '@mui/material/FormControlLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Checkbox from '@mui/material/Checkbox';
import Addproject from './Addproject';
import TableSortLabel from '@mui/material/TableSortLabel';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DialogContent , DialogContentText, DialogTitle ,Box } from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import Description from './Description';
import SideBar from '../../../Home/components/SideBar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: 'rgb(195, 177, 225)',
  color: "#330072",
  fontSize: '17px',
}));

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'nom', label: 'Project name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'dateDebut', label: 'Start Date', minWidth: 170, align: 'center' },
  { id: 'dateFin', label: 'End Date', minWidth: 170, align: 'center' },
  { id: 'action', label: ' ', minWidth: 170, align: 'center' }
];

function ProjectListManager() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const [projectDetails, setProjectDetails] = useState({
    id: '',
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    status: ''
  });
  const [filter, setFilter] = useState(""); 
  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [allProjects, setallprojects]= useState([]);
  const [errors, setErrors] = useState({});
  const [employeeId, setEmployeeId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nom');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [Employee, setEmployee]=  useState([]);
  
    const [status, setStatus] = useState('');
    const [dataProjectFiltred, setDataProjectFiltred] = useState([]);
  
    const userInfoData = sessionStorage.getItem("UserInfo");
 
    const userInfoObject = JSON.parse(userInfoData);
  
    const idsUserConnecte = userInfoObject.id;
  

    const handleChange = (event) => {
      const selectedStatus = event.target.value;
      setStatus(selectedStatus);
      
    };
  
    const fetchDataByStatus = (status) => {
      fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/status/${status}`)
        .then(response => response.json())
        .then(data => {
          setDataProjectFiltred(data);
          setProjects(data); 
          console.log("filtred projects by status", data);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
          setDataProjectFiltred([]);
          setProjects([]); 
        });
    };

    const handleSearch = async () => {
      const [firstName, lastName] = searchValue.split(' ');
    
      if (!firstName ||!lastName) {
        console.error('Please provide both first name and last name.');
        return;
      }
    
      try {
        const response = await fetch(
          `http://localhost:8083/SERVICE-GESTIONPROJETS/projet/projects-by-employee?firstName=${firstName}&lastName=${lastName}`
        );
    
        if (response.ok) {
          const data = await response.json();
          const uniqueEmployees = [...new Set(data.map(item => item.employeeId))];
          setProjects(uniqueEmployees.map(employeeId => data.find(item => item.employeeId === employeeId)));
        } else {
          console.error('No projects found for the given employee.');
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };
    
    useEffect(() => {
      handleAddproject();
      if (startDate && endDate) {
        filterProjectsByDateRange();

      }
    }, [startDate, endDate]);
  
    const filterProjectsByDateRange = async () => {
      try {
        const response = await fetch(
          `http://localhost:8083/SERVICE-GESTIONPROJETS/projet/date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('No projects found for the given date range.');
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };

  async function assigneremp(idprojet){
    console.log("idprojet", idprojet);
    if (checkedEmployees.length > 0) {
        for (let i = 0; i < checkedEmployees.length; i++) {
            console.log(checkedEmployees[i]);

            // Get employee
            let userData = null;
            try {
                const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/GetEmployee/${checkedEmployees[i]}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
                    },
                });

                if (response.ok) {
                    userData = await response.json();
                    setUserData(userData);
                    console.log(userData);
                } else {
                    console.log("aya");
                    console.log(checkedEmployees[i]);
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error while fetching user data:', error.message);
            }

            // Update employee
            if (userData && userData.id) {
                let projetidsArray = userData.projetids.split(',').filter(Boolean);
                projetidsArray.push(idprojet);
                const newProjetids = `,${projetidsArray.join(',,')},,`;

                const userData2 = { ...userData, projetids: newProjetids };
                // const userData2={...userData,projetids:userData.projetids+","+idprojet+","};
                try {
                    const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/UpdateEmployee/${checkedEmployees[i]}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
                        },
                        body: JSON.stringify(userData2),
                    });

                    if (response.ok) {
                        setUserData(userData2);
                        console.log("userdata après modif", userData2);
                    } else {
                        console.error('Échec de la soumission des données au backend');
                    }
                } catch (error) {
                    console.error('Erreur lors de la soumission des données au backend:', error);
                }
            }
        }
    }
}

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };
  const handleCloseDescription = () => {
    setDescriptionOpen(false);
  };

  // const sortedProjects = projects.slice().sort((a, b) => {
  //   if (b[orderBy] < a[orderBy]) {
  //     return order === 'asc' ? -1 : 1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return order === 'asc' ? 1 : -1;
  //   }
  //   return 0;
  // });

  const filterProjectsByUserIds = (projects, userProjetIds) => {
    return projects.filter(project => userProjetIds.includes(project.id));
  };

  

  useEffect(()=>{
    if (status !== '') {
      fetchDataByStatus(status);
      console.log("statut sélectionné", status);
    }
  },[status]);

  useEffect(() => {
   
    fetchDataFromApi()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
      });
      fetchDataProject()
      .then((data) => {
        setallprojects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
      });
      
      //alert("statut");
  }, []);
  console.log(allProjects);
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/Getbyemployee/${idsUserConnecte}`, {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch data from API");
      throw new Error("Failed to fetch data from API");
    }
  };
  const fetchDataProject = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/list`, {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch data from API");
      throw new Error("Failed to fetch data from API");
    }
  };
  const handleCheckboxChange = (event, employeeId) => {
    if (event.target.checked) {
      setCheckedEmployees([...checkedEmployees, employeeId]);
    } else {
      setCheckedEmployees(checkedEmployees.filter((id) => id!== employeeId));
    }
  };

  console.log("checkedEmployees");
  console.log(checkedEmployees);
  const handleAddEmployeeToProject = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/addEmployee/${projectDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employees: checkedEmployees }),
      });
      if (response.ok) {
        // Assuming the response contains the updated project data
        const updatedProject = await response.json();
        // Update the state with the updated project
        setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
        // Close the dialog or any other necessary actions
        // For example:
        handleClose();
      } else {
        console.error('Failed to add employees to project');
      }
    } catch (error) {
      console.error('Error adding employees to project:', error);
    }
  };
 const validate = () => {
  let tempErrors = {};
  if (!projectDetails.nom) {
    tempErrors.nom = 'Project name is required';
  }
  if (!projectDetails.description) {
    tempErrors.description = 'Description is required';
  }
  if (!projectDetails.dateDebut) {
    tempErrors.dateDebut = 'Start date is required';
  }
  if (!projectDetails.dateFin) {
    tempErrors.dateFin = 'End date is required';
  }
  if (!projectDetails.status) {
    tempErrors.status = 'Status is required';
  }
  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0;
};
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const handlefilter = (e) => {
    const { value } = e.target;
    setFilter(value);
    console.log(filter);
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/update/${projectDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectDetails),
      });
      if (response.ok) {
        // Validate project details before submitting
        if (validate()) {
          // Update the project only if validation passes
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.id === projectDetails.id ? projectDetails : project
            )
          );
          handleClose();
        }
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteRow = (index) => {
    setDeleteDialogOpen(true);
    setDeleteIndex(index);
  };

  const confirmDeleteRow = async () => {
    if (deleteIndex !== null) {
      const projectToDelete = projects[deleteIndex];
      try {
        const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/delete/${projectToDelete.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProjects((prevProjects) => prevProjects.filter((_, i) => i !== deleteIndex));
          setDeleteDialogOpen(false);
          setDeleteIndex(null);
        } else {
          console.error('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleAddProjectOpen = () => {
    setAddProjectOpen(true);
  };
  const handleOpenDescription= (index) => {
    setProjectDetails(projects[index]); 
    setDescriptionOpen(true);
  };
  const handleClickOpen = (index) => {
    setProjectDetails(projects[index]);
    setEditProjectIndex(index);
    setOpen(true);
  };
  const handleAddproject = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/GetEmployee/${idsUserConnecte}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
        console.log(Employee);
      } else {
        console.error('Failed to add employees to project');
      }
    } catch (error) {
      console.error('Error adding employees to project:', error);
    }
  };
  const handleClose = () => {
    
    setOpen(false);
    setEditProjectIndex(null);
    setProjectDetails({
      id: '',
      nom: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      status: ''
    });
  };

  const handleAddProjectClose = () => {
    setAddProjectOpen(false);
  };

  const handleToggleEmployee = (employeeId) => {
    setCheckedEmployees((prevChecked) =>
      prevChecked.includes(employeeId)
        ? prevChecked.filter((id) => id !== employeeId)
        : [...prevChecked, employeeId]
    );
  };
 // Get filtered projects for the connected user
  const filteredProjects = filterProjectsByUserIds(allProjects, Employee.projetids);
  
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nom: "",
    mot_de_passe: "",
    prenom: "",
    role: "",
    token:{
      id:"",
      token:"",
    },
    projetids:""
  });
  
    
  let userRole = '';
  
  if (userInfoData) {
    try {
      const parsedUserInfo = JSON.parse(userInfoData);
      userRole = parsedUserInfo.role;
    } catch (error) {
      console.error("Error parsing user info data:", error);
    }
  }

  return (
    <>
     <Box display="flex" >
     <Menu3navbar/>
    <SideBar/>
       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 ,margin: '3%'}}>
       <h4 className="" style={{ color: "#330072", fontWeight: "light"}}>Project List</h4>
     
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            type="search"
            placeholder="Search ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ width: 200 }}
            InputProps={{
              style: {
                height: '30px',
                padding: '0 10px',
              },
            }}
          />
          <IconButton
            onClick={handleSearch}
            sx={{
              height: '30px',
              marginTop: 'auto',
            }}
          >
            <SearchIcon />
          </IconButton>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: 120 }}
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '30px',
                      padding: '0 10px',
                    },
                  }}
                />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: 120 }}
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '30px',
                      padding: '0 10px',
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value="AFAIRE">To Do</MenuItem>
              <MenuItem value="ENCOURS">In Progress</MenuItem>
              <MenuItem value="FAIT">Done</MenuItem>
            </Select>
          </FormControl>
          {userRole === "chef_projet" && 
          <Button
            variant="contained"
            style={{ backgroundColor: '#330072', color: '#ffffff', padding: '4px' }}
            size="small"
            onClick={handleAddProjectOpen}
          >
            <AddIcon />
          </Button>}
          
        </Box>
        <Paper sx={{ width: '100%', margin: '20px auto', padding: '20px' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "16px" }}
                    >

                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        // onClick={(event) => handleRequestSort(event, column.id)}
                      >
                        {column.label}
                      </TableSortLabel>

                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                      {columns.map((column) => {
                        const value = row[column.id];
                      
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            component={column.id !== 'action' ? Link : undefined}
                            to={column.id !== 'action' && userRole === 'chef_projet' ? `/tache/${row.id}` : `/Employee-Backlog/${row.id}`}
                          >
                            {column.id === 'action' ? (
                               <div>
                               {userRole === "chef_projet" && 
                               <Button
                                 variant="contained"
                                 startIcon={<DeleteIcon />}
                                 style={{ backgroundColor: '#330072', color: '#ffffff', padding: '8px' }}
                                 size="small"
                                 onClick={() => handleDeleteRow(index)}
                               >
                               </Button>}
                              <div>
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: '#C3B1E1', color: '#ffffff', padding: '4px', marginTop: "-2px" }}
                                  size="small"
                                  onClick={() => handleOpenDescription(index)}

                                >
                                  <DescriptionIcon sx={{ padding: '2px' }} />
                                </Button>
                                <Dialog
                    open={descriptionOpen}
                    onClose={handleCloseDescription}
                  >
                    <Description projectDetails={projectDetails} handleClose={handleCloseDescription} />
                  </Dialog>
                              </div>

                               
                                <React.Fragment>
                                {userRole === "chef_projet" && <Button variant="contained" style={{ backgroundColor: '#E6E6FA', color: '#330072', padding: '4px' }} size="small" onClick={() => handleClickOpen(index)}>
                                  <EditIcon />
                                </Button>}
                                
                                  <Dialog
                                    fullScreen
                                    open={open && editProjectIndex === index}
                                    onClose={handleClose}
                                    TransitionComponent={Transition}
                                  >
                                    <AppBar sx={{ position: 'relative', backgroundColor: '#E6E6FA', color: '#330072' }}>
                                      <Toolbar>
                                        <IconButton
                                          edge="start"
                                          color="inherit"
                                          onClick={handleClose}
                                          aria-label="close"
                                        >
                                          <CloseIcon />
                                        </IconButton>
                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                          Edit Project
                                        </Typography>
                                        <Button autoFocus color="inherit" onClick={handleSubmitEdit}>
                                          Save
                                        </Button>
                                      </Toolbar>
                                    </AppBar>
                                    <DialogContent>
                                      <Card sx={{ width: "600px", margin: "0 auto", position: "fixed", top: "50%", left: "70%", transform: "translate(-50%, -50%)", height: "550px" }}>
                                        <CardContent>
                                          <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="ID"
                                            defaultValue={row.id}
                                            style={{ width: "100%", marginBottom: "20px" }}
                                          />
                                          <TextField
                                            id="outlined-basic"
                                            label="Project name"
                                            value={projectDetails.nom}
                                            name="nom"
                                            onChange={handleEditChange}
                                            error={!!errors.nom}
                                            helperText={errors.nom}
                                            variant="outlined"
                                            style={{ width: "100%", marginBottom: "20px" }}
                                          />
                                          <TextField
                                            label="Description"
                                            fullWidth
                                            value={projectDetails.description}
                                            name="description"
                                            onChange={handleEditChange}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                            style={{ width: "100%", marginBottom: "20px" }}
                                          />
                                          <TextField
                                            id="date-debut"
                                            label="Start Date"
                                            type="date"
                                            value={projectDetails.dateDebut}
                                            name="dateDebut"
                                            error={!!errors.dateDebut}
                                            helperText={errors.dateDebut}
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            onChange={handleEditChange}
                                            style={{ width: "100%", marginBottom: "20px" }}
                                          />
                                          <TextField
                                            id="date-start"
                                            label="End Date"
                                            type="date"
                                            value={projectDetails.dateFin}
                                            name="dateFin"
                                            onChange={handleEditChange}
                                            error={!!errors.dateFin}
                                            helperText={errors.dateFin}
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            style={{ width: "100%", marginBottom: "20px" }}
                                          />
                                          <TextField
                                            id="select-status"
                                            select
                                            label="Status"
                                            value={projectDetails.status}
                                            name="status"
                                            onChange={handleEditChange}
                                            error={!!errors.status}
                                            SelectProps={{
                                              native: true,
                                            }}
                                            variant="outlined"
                                            style={{ width: "100%" }}
                                          >
                                            <option value=""></option>
                                            <option value="TO DO">TO DO</option>
                                            <option value="On prossec">On Progress</option>
                                            <option value="Done">Done</option>
                                          </TextField>
                                        </CardContent>
                                        <CardActions>
                                        <Button variant="contained" style={{ width: "90%", marginLeft: "32px", backgroundColor: '#330072' }} onClick={()=>{setProjectDetails({ ...projectDetails, id: row.id });
                                        handleSubmitEdit()}}>Save</Button>
                                        </CardActions>
                                      </Card>
                                      <Card sx={{ width: "600px", margin: "0 auto", position: "fixed", top: "60%", right: "31%", transform: "translate(-50%, -50%)", height: "700px" }}>
                                        <CardContent>
                                          <Card>
                                            <Button
                                              variant="contained"
                                              style={{ backgroundColor: '#330072', color: '#ffffff', padding: '4px', marginLeft: "500px" }}
                                              size="small"
                                            >
                                              <DeleteIcon />
                                            </Button>
                                            <CardContent>
                                              <FormControl component="fieldset">
                                                <FormGroup>
                                                  {(projects.find(p => p.id === row.id)?.empployees || []).map((item) => (
                                                    <FormControlLabel
                                                      key={item.id}
                                                      control={
                                                        <Checkbox
                                                          checked={checkedEmployees.includes(item.id)}
                                                          onChange={(e) => handleCheckboxChange(e, item.id)}
                                                        />
                                                      }
                                                      label={
                                                        <div>
                                                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar
                                                              alt="Employee Avatar"
                                                              style={{ width: "30px", height: "30px", backgroundColor: "green", fontSize: "15px" }}
                                                              src="/path/to/avatar.jpg"
                                                            />
                                                            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                                                              {item.nom + " " + item.prenom}
                                                            </span>
                                                          </div>
                                                          <span style={{ color: '#888' }}>
                                                            {item.role}
                                                          </span>
                                                        </div>
                                                      }
                                                    />
                                                  ))}
                                                    
                                                      
                                                </FormGroup>
                                              </FormControl>
                                            </CardContent>
                                          </Card>

                                          <div>
                                            <AccountCircle sx={{ color: 'yellow', mr: 1, my: 3 }} />
                                          <TextField id="input-with-sx" label="Add Employee" variant="standard" style={{ width: "90%" }}  value={filter}
                                              name="filter"
                                              onChange={handlefilter} />
                                          </div>
                                          <Card>
                                            <Button variant="contained" style={{ backgroundColor: '#330072', color: '#ffffff', padding: '4px', marginLeft: "500px" }} size="small"
                                              onClick={() => assigneremp(row.id)}>
                                              <AddIcon />
                                            
                                            </Button>
                                            <CardContent>
                                              <FormControl component="fieldset">
                                                <FormGroup>
                                                  {allProjects.map((item1) =>
                                                    item1.empployees.map((item) => {
                                                      if (
                                                        filter !== "" &&
                                                        (item.nom.includes(filter) || item.prenom.includes(filter)) &&
                                                        !item.projetids.includes("," + row.id + ",")
                                                      ) {
                                                        return (
                                                          <FormControlLabel
                                                            key={item.id}
                                                            control={
                                                              <Checkbox
                                                                checked={checkedEmployees.includes(item.id)}
                                                                onChange={(e) => handleCheckboxChange(e, item.id)}
                                                              />
                                                            }
                                                            label={
                                                              <div>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                  <Avatar
                                                                    alt="Employee Avatar"
                                                                    style={{
                                                                      width: '30px',
                                                                      height: '30px',
                                                                      backgroundColor: 'green',
                                                                      fontSize: '15px',
                                                                    }}
                                                                    src="/path/to/avatar.jpg"
                                                                  />
                                                                  <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                                                                    {item.nom + ' ' + item.prenom}
                                                                  </span>
                                                                </div>
                                                                <span style={{ color: '#888' }}>{item.role}</span>
                                                              </div>
                                                            }
                                                          />
                                                        );
                                                      }
                                                      return null;
                                                    })
                                                  )}

                                                                                                
                                                                    
                                                                                                

                                                </FormGroup>
                                              </FormControl>
                                            </CardContent>
                                          </Card>
                                        </CardContent>

                                        <CardActions>
                                        </CardActions>
                                      </Card>
                                    </DialogContent>
                                  </Dialog>
                                </React.Fragment>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Dialog open={addProjectOpen} onClose={handleAddProjectClose} TransitionComponent={Transition}>
        <Addproject handleClose={handleAddProjectClose} />
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this project?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
          <Button onClick={confirmDeleteRow} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </>
  );
}
export default ProjectListManager;