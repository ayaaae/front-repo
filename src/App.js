import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmployeePage from './service-utilisateurs/administrateur/pages/AddEmployeePage.js';
import EditEmployeePage from './service-utilisateurs/administrateur/pages/EditEmployeePage.js';
import EmployeeDashboard from './service-utilisateurs/administrateur/pages/EmployeeDashboardPage.js';
import HomeTache from './service-tache/pages/Manager/HomeTache.js';
import Login2 from './login-service/Login2.jsx';
import Home2 from './Home/components/Home2.jsx';
import Profile from './Profile/Profile.jsx';
import Dshboard from './Dashboard/Dshboard.jsx';
import BacklogJira from './service-tache/pages/Manager/BacklogJira.js';
import AccessPage from './Home/components/AccesDenied.jsx';
import EmployeeDashboardPage from './service-utilisateurs/employee//pages/employeeDashboard.js';
import BoardPage from './service-utilisateurs/employee/pages/BoardPage.js';
import BacklogPage from './service-utilisateurs/employee/pages/BacklogPage.js';
import TaskPage from './service-utilisateurs/employee/pages/TaskPage.js';
import GanttWrapper from './GanttChart/Component/Gantt.jsx'; // Adjust the path accordingly
import ProjectList from './service-projet/project-list/ProjectList.jsx';
import ProjectEmployeesList from './service-projet/ProjectEmployeesList.jsx';
import ProjectListManager from './service-tache/pages/Manager/ProjectListManager.jsx';
import DashboardM from './service-tache/pages/Manager/DashboardM.jsx';
import DatePickerComponent from './service-tache/pages/Manager/Date.jsx';
import Absencelist from './service-tache/pages/Manager/Absencelist.js';
import Absence from './service-abscence/Absence.jsx';
import Rapport from './service-tache/pages/Manager/Rapport.js';
import EmployeeTasksReports from './service-tache/pages/EmployeeTasksReports.js';

import Email_sent from './Profile/Email_sent.jsx';
import { AppGantt } from './GanttC/AppGantt.js';
import Historique from './service-abscence/Historique.jsx';
import Initialize from './Profile/Initialize.jsx';
import MyCalendar from './service-tache/pages/MyCalendar.js';
import ForgotPassword from './Profile/ForgotPassword.js';
import ResetPassword from './Profile/ResetPassword.js';
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/tache/:projectid" element={<BacklogJira/>}/>

          <Route path='/' element={<Home2/>}/>
          <Route path='/Initialize' element={<Initialize/>}></Route>
          <Route path='/reset-password' element={<Email_sent/>}></Route>
          <Route path='/login' element={<Login2/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
            <Route path="/Add-Employee" element={<AddEmployeePage/>}> </Route>
            <Route path="/Dashboard-Admin" element={<Dshboard/>}></Route>
            <Route path="/Dashboard-Employee" element={<EmployeeDashboard/>}></Route>
            <Route path="/Edit-Employee/:userId" element={<EditEmployeePage/>}></Route>
            <Route path="/test" element={<DatePickerComponent/>}></Route>
            <Route path='/Access-Denied' element={<AccessPage/>}></Route>
            <Route path="/Employee" element={<EmployeeDashboardPage/>}></Route>
            <Route path="/Maneger-absence" element={<Absencelist/>}></Route>
            <Route path="/Maneger-Rapport" element={<Rapport/>}></Route>

            <Route path="/Employee-Board/:projectid" element={<BoardPage/>}></Route>
             <Route path="/Employee-Backlog/:projectid" element={<BacklogPage/>}></Route>
            <Route path="/Employee-Backlog" element={<BacklogPage/>}></Route>
            <Route path="/Employee-TasksPage/:projectid" element={<TaskPage/>}></Route>
            <Route path="/Project-List" element={<ProjectList/>}></Route>
            <Route path="/DashboardM" element={<DashboardM/>}></Route>
            <Route path="/Project-List-Manager" element={<ProjectListManager/>}></Route>
            <Route path="/Demande-Absence" element={<Absence/>}></Route>
            {/* <Route path="/Historique-absence" element={<Historique/>}></Route> */}
  <Route path="/historique-absence/:idsource" element={<Historique/>} />
  <Route path="/MyCalendar" element={<MyCalendar />} />
  <Route path="/forgotPassword" 
                           element={<ForgotPassword />} />
                    <Route path="/resetPassword" 
                           element={<ResetPassword />} />
 

  
        <Route path="/Gantt-chart" element={<GanttWrapper />} /> {/* Use GanttWrapper */}
        <Route path="/Gantt-charttt" element={<AppGantt />} />
        <Route path="/Project-Employees-List/:projectid" element={<ProjectEmployeesList/>}></Route>
        <Route path="/EmployeeTasksReport/:userId" element={<EmployeeTasksReports/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
