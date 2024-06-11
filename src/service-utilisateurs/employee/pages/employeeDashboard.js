

import React from 'react'
import Menu3navbar from '../../../Home/components/Menu3navbar';
import { Card, CardContent } from '@mui/material'
import {Typography} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom';
import SideBar from '../../../Home/components/SideBar';
function EmployeeDashboardPage() {

  return (
    <>
    <Menu3navbar/>
    <SideBar/>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-120px' }}>
        <Link to="/Project-List-Manager">
        <Card sx={{ width: "80%", marginRight: "100px", height: "100px"}}>
        <CardContent >
            <WorkIcon sx={{ color: '#E6E6FA ' }} />
            <Typography variant="body1" style={{ marginLeft: '50px',marginTop:"-4px", fontSize:"22px" , fontWeight:"bold",color:'#330072'}} >Projects</Typography>
          </CardContent>
        </Card>
    </Link>
    </div>
    </>
  )
}
export default EmployeeDashboardPage
