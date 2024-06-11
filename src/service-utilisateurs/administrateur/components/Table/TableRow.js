import { useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import {  DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';

import Iconify from '../Iconfy';

// ----------------------------------------------------------------------

export function useRedirectToEditPage() {
  const navigate = useNavigate();

  const redirectToEditPage = (userId) => {
    navigate(`/Edit-Employee/${userId}`);
  };

  return redirectToEditPage;
}


export default function UserTableRow({

  id,
  nom,
  prenom,
  email,
  role,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const redirectToEditPage = useRedirectToEditPage();

  const [confirmDelete, setConfirmDelete] = useState(false); 
  const [employeeDeleted, setEmployeeDeleted] = useState(false);

  const handleConfirmDelete = async () => {
    handleCloseMenu();
    try {
      
      const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/DeleteEmployee/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
        },
      });
      if (response.ok) {
        setConfirmDelete(false);
        setEmployeeDeleted(true);
        console.log("User with ID", id, "successfully deleted from response");
        window.location.reload();
      } else {
       
        console.error("Failed to delete user with ID", id);
      }
    } catch (error) {
      
      console.error("Error while deleting user:", error.message);
    }
  
    
    console.log("User with ID", id, "will be deleted");
  };

  const handleCloseDialog = () => {
    setEmployeeDeleted(false);
  };
  

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" >
        


      <TableCell>{id}</TableCell>

        <TableCell>{prenom}</TableCell>

        <TableCell>{nom}</TableCell>

        <TableCell>{email}</TableCell>


        <TableCell>{role}</TableCell>


       {role==="Admin" ? 
       <TableCell align="right">
       
     </TableCell>
       :
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
        }
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={()=>redirectToEditPage(id)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />

          Edit
        </MenuItem>

        <MenuItem onClick={() => setConfirmDelete(true)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user with ID {id} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{ setConfirmDelete(false); handleCloseMenu();}} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

<Dialog open={employeeDeleted} onClose={handleCloseDialog}>
<DialogTitle>Employee Deleted</DialogTitle>
<DialogContent>
  <DialogContentText>
    The employee has been successfully deleted.
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleCloseDialog} color="primary">
    OK
  </Button>
</DialogActions>
</Dialog>
    </>
  );
}

  UserTableRow.propTypes = {

  id:PropTypes.any,
  prenom: PropTypes.any,
  nom: PropTypes.any,
  handleClick: PropTypes.func,
  email: PropTypes.any,
  role: PropTypes.any
};
