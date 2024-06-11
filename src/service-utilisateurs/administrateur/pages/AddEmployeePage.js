import React ,{ useEffect }from 'react';

import Header from '../components/Header/header';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmployeeForm from '../components/EmployeeForm';
import Menu2 from '../../../Home/components/Menu2';
import Sidebar from '../../../Dashboard/Sidebar';
import {useNavigate } from 'react-router-dom';


function AddEmployeePage() {

  const navigate = useNavigate();
  const handleAddEmployee = (formData) => {
    console.log('New employee added:', formData);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("UserInfo")) {
      navigate(`/login`);
    }
  }, [navigate]);

    if(sessionStorage.getItem("UserInfo")){
      const userInfoData = sessionStorage.getItem("UserInfo");

      const userInfoObject = JSON.parse(userInfoData);
    
      const role = userInfoObject.role;
      if(role)
      return <h1>Acces Denied! You are Employee</h1>
     else if(!role){ 
  return (
    <div>
      <Menu2/>
      <Sidebar/>
      <Card sx={{ maxWidth: 100, margin: '10px', marginTop: "-110px" , border:'none'}}>
      {/* <CardContent >
           <Typography variant="h4" sx={{ color: 'rgb(51,0,114);', textAlign: 'center', my: 1 }}>
             Chno ndir hna?
            </Typography>
      </CardContent> */}
    </Card>
      <EmployeeForm onSubmit={handleAddEmployee} />

    </div>
  );}else{
    return <div class="alert alert-danger" role="alert">
   Session Expired
  </div>
  }
}
}
export default AddEmployeePage;
