import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Menu3 from '../../Home/components/Menu3';
// Import the styled function from MUI
import { styled } from '@mui/system';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableSortLabel from '@mui/material/TableSortLabel';


class ProjetModel {
  constructor(id, nom, description, status, dateDebut, dateFin) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.status = status;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
  }
}
const API_URL = 'http://localhost:3000/api';

class ProjetService {
  async getAllProjects() {
    const response = await axios.get(`${API_URL}/projets`);
    return response.data;
  }

  async getProjectById(id) {
    const response = await axios.get(`${API_URL}/projets/${id}`);
    return response.data;
  }
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: 'rgb(195, 177, 225)', // Change the color here
  color: "#330072",
  fontSize: '17px', // Adjust the font size here
}));

const columns = [
  { id: 'nom', label: 'Project name', minWidth: 170 ,fontSize:"bold"},
  { id: 'id', label: 'ID\u00a0', minWidth: 100 },
  {
    id: 'description',
    label: '\u00a0Description',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'dateDebut',
    label: 'Start Date',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'dateFin',
    label: 'End Date',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  }
];

// function createData(name, id, description, status, DateD, DateF) {
//   return { name, id, description, status, DateD, DateF };
// }
// const rows = [
//   createData('Project K', 'P011', 'Description of Project K', 'Active','13-05-2024', '17-05-2024'),
//   createData('Project L', 'P012', 'Description of Project L', 'Inactive','13-05-2024', '17-05-2024'),
//   createData('Project M', 'P013', 'Description of Project M', 'Active','13-05-2024', '17-05-2024'),
//   createData('Project N', 'P014', 'Description of Project N', 'Inactive','13-05-2024', '17-05-2024'),
//   createData('Project O', 'P015', 'Description of Project O', 'Active','13-05-2024', '17-05-2024'),
//   createData('Project P', 'P016', 'Description of Project P', 'Inactive','13-05-2024', '17-05-2024'),
//   createData('Project Q', 'P017', 'Description of Project Q', 'Active','13-05-2024', '17-05-2024'),
//   createData('Project R', 'P018', 'Description of Project R', 'Active','13-05-2024', '17-05-2024'),
//   createData('Project S', 'P019', 'Description of Project S', 'Inactive','13-05-2024', '17-05-2024'),
//   createData('Project T', 'P020', 'Description of Project T', 'Active','13-05-2024', '17-05-2024'),
// ];

function ProjectList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projects, setProjects] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nom');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedProjects = projects.slice().sort((a, b) => {
    if (b[orderBy] < a[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (b[orderBy] > a[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get('http://localhost:8083/SERVICE-GESTIONPROJETS/projet/Getbyemployee/4');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const userInfoData = sessionStorage.getItem("UserInfo");
 
  // const userInfoObject = JSON.parse(userInfoData);

  // const idsUserConnecte = userInfoObject.id;
  return (
    <div>
      <div className="mt-4 ml-2" style={{ marginLeft: "400px" ,marginTop:"100px"}}>
                  <h4 className="" style={{ color: "grey", fontWeight: "light" }}>Project List</h4>
                  <input type="search" placeholder="Search" style={{ padding: 8, width: 200, borderRadius: 5, border: "solid 0.5px" }} />
                  <AvatarGroup total={4} style={{ marginTop: "-35px",marginRight:"800px" }}>
                      <Avatar sx={{ bgcolor: "orange", width: 30, height: 30 }}>OP</Avatar>
                      <Avatar sx={{ bgcolor: "green", width: 30, height: 30 }}>sf</Avatar>
                      <Avatar sx={{ bgcolor: "blue", width: 30, height: 30 }}>tt</Avatar>
                      <Avatar sx={{ bgcolor: "purple", width: 30, height: 30 }}>cc</Avatar>
                    </AvatarGroup>
                    <div>
                        <FormControl variant="standard" sx={{ m: 3, minWidth: 120 ,marginTop:"-50px", marginLeft:"920px"}}>
                          <InputLabel id="demo-simple-select-standard-label" >Status</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            // value={age}
                            // onChange={handleChange}
                            // label="Age"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                        
                      </div>
                    </div>
                    
    <Menu3/>
    {/* <div className="d-flex justify-content-start align-items-center gap-2"> */}
                
    <Paper sx={{ width: '1050px', marginLeft: '400px', marginTop: '-320px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                   <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProjects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={project.id}>
                  {columns.map((column) => {
                    const value = project[column.id];
                    console.log("data-displayed from "+value);

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                        
                          ? column.format(value)
                          : value}
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
  </div>
  );
}

export default ProjectList;