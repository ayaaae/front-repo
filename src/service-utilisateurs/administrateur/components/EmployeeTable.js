import { useState } from 'react';
import { Card, CardContent, Grid, Typography, Button, Table, TableBody, TableContainer, TablePagination, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from './Iconfy';
import Scrollbar from './Scrollbar/Scrollbar';
import TableNoData from './Table/TableNoData';
import TableRow from './Table/TableRow';
import TableHead from './Table/TableHead';
import TableToolbar from './Table/TableToolbar';
import { emptyRows, applyFilter, getComparator } from './Table/utils';
import AddEmployeePage from '../pages/AddEmployeePage';
import { useEffect } from 'react';

export default function EmployeeTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState([]);
  const [roleAdmin, setRoleAdmin] = useState('');

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("AccessTocken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Fetch data from the first endpoint
      const response1 = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/ListEmployee`, { headers });
      if (!response1.ok) {
        throw new Error(`Erreur ${response1.status}: ${response1.statusText}`);
      }
      const data1 = await response1.json();
      console.log("Employees", data1);
  
      // Ensure data1 is an array
      const employees = Array.isArray(data1) ? data1 : [];
  
      // Modify the role if necessary
      employees.forEach(employee => {
        if (employee.role === "chef_projet") {
          employee.role = "Project Manager";
        }
      });
  
      // Fetch data from the second endpoint
      const response2 = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/ListAdmin`, { headers });
      if (!response2.ok) {
        throw new Error(`Erreur ${response2.status}: ${response2.statusText}`);
      }
      const data2 = await response2.json();
      console.log("Admins", data2);
  
      // Ensure data2 is an array
      const admins = Array.isArray(data2) ? data2 : [];

      admins.forEach(admin => {
        if (!admin.role) {
          setRoleAdmin("Admin");
        }
      });
  
      // Merge the two datasets
      const mergedData = [...employees, ...admins];
      console.log("Merged Data", mergedData);
  
      // Update the userData state
      setUserData(mergedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  const dataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container  sx={{ boxShadow: ' 0px 0px 17px 0px rgba(0,0,0,0.1)', borderRadius:'25px',marginTop: "60px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4" gutterBottom>Employees</Typography>
                </Grid>
                <Grid item>
                <Button
            variant="contained" 
            sx={{ 
              backgroundColor: 'rgb(51, 0, 114)',
              '&:hover': {
                backgroundColor: 'rgb(95, 36, 159)',
                color: 'white',
              },
            }} 
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={Link} 
            to="/Add-Employee"
          >
            Add employee
          </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableToolbar filterName={filterName} onFilterName={handleFilterByName} />
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHead
                  
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleSort}
                    headLabel={[
                      { id: 'id', label: 'ID' },
                      { id: 'prenom', label: 'First Name' },
                      { id: 'nom', label: 'Last Name' },
                      { id: 'email', label: 'E-mail' },
                     
                      { id: 'role', label: 'Role' },
                      { id: '' },
                    ]}
                    
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          id={row.id}
                          prenom={row.prenom}
                          role={!row.role ? roleAdmin : row.role}
                          nom={row.nom}
                          email={row.email}
                         
                          selected={selected.indexOf(row.name) !== -1}
                          
                          handleClick={(event) => handleClick(event, row.name)}
                        />
                      ))}
                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              component="div"
              count={userData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
