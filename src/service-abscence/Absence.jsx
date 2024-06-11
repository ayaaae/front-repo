import React , {  useState } from 'react'
import Menu3 from '../../src/Home/components/Menu3.jsx';
import SideBar from '../Home/components/SideBar'
import AbsenceTable from './AbsenceTable'
import Absenceotification from '../../src/Home/components/Absenceotification.jsx';

function Absence() {
  const [reload,setreload]=useState(0);

  return (
    <div>
        <Menu3 rd={setreload} r={reload} />
    <Absenceotification  rd={setreload} r={reload} />
        <AbsenceTable/>
    </div>
  )
}

export default Absence