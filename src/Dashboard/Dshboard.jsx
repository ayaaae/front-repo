import React ,{ useEffect }from 'react'
import Sidebar from './Sidebar'
import Menu2 from '../Home/components/Menu2'
import EmployeeTable from '../service-utilisateurs/administrateur/components/EmployeeTable'
import {useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start', // Pour aligner les composants à gauche
  },
  sidebar: {
    flex: '0 0 auto', // La sidebar s'adapte automatiquement à sa taille minimale
  },
  content: {
    flex: '1 1 auto', // Le contenu occupe l'espace restant
  },
};

function Dshboard() {

  const navigate = useNavigate();

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
   <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.content}>
        <Menu2 />
        <EmployeeTable />
      </div>
    </div>
  );}

}
}

export default Dshboard