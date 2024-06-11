import React , { useEffect, useState } from 'react'
import Menu3 from '../../../Home/components/Menu3.jsx';
import {Box} from '@mui/material'
import ResponsiveGrid from '../components/ResponsiveGrid.js'
import Absenceotification from "../../../Home/components/Absenceotification";


function BoardPage() {
  const [reload,setreload]=useState(0);

  return (
    <Box display="flex" >
     <Menu3 rd={setreload} r={reload} />
    <Absenceotification  rd={setreload} r={reload} />
    <ResponsiveGrid />
    </Box>
  )
}

export default BoardPage