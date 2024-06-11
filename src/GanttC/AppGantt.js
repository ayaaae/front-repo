// import React, { useState, useEffect } from 'react';
// import { Chart } from "react-google-charts";
// import Absenceotification from '../Home/components/Absenceotification.jsx';
// import Menu3 from '../Home/components/Menu3.jsx';
// import Box from '@mui/material/Box';


// const columns = [
//   { type: "string", label: "Task ID" },
//   { type: "string", label: "Task Name" },
//   { type: "string", label: "Resource" },
//   { type: "date", label: "Start Date" },
//   { type: "date", label: "End Date" },
//   { type: "number", label: "Duration" },
//   { type: "number", label: "Percent Complete" },
//   { type: "string", label: "Dependencies" },
  
// ];




// export function AppGantt() {
//   const [data, setData] = useState([columns]);
//   const [reload, setReload] = useState(0);
//     useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8083/SERVICE-TACHE/sprint/AllSprints');
//         const sprints = await response.json();
//         const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
//         const rows = sprints.map((sprint, index) => {
//           const startDate = new Date(sprint.datedebut);
//           const endDate = new Date(sprint.datefin);
//           const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
//           return [
//             sprint.id_sprint.toString(),
//             sprint.nom_sprint,
//             null,
//             startDate,
//             endDate,
//             duration,
//             null,null,
//           ];
//         });
//         setData([columns,...rows]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
    
//     fetchData();
//   }, []);

//   const options = {
//     height: 400,
//     gantt: {
//       trackHeight: 30,
//       barCornerRadius: 5,
//       barColor: (data, row, col) => {
//         const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
//         const index = data.getValue(row, 0); // assuming the first column is the ID
//         return colors[index % colors.length];
//       },
//     },
//   };
//   return (
    
//      <Box display="flex">
//             <Menu3 rd={setReload} r={reload} />
//             <Absenceotification rd={setReload} r={reload} />
            
//             <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%", marginLeft: 3, marginRight: 3 }}>
//     <Chart
//       chartType="Gantt"
//       width="100%"
//       height="50%"
//       data={data}
//       options={options}
//     />
    
//     </Box></Box>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Chart } from "react-google-charts";
// import Absenceotification from '../Home/components/Absenceotification.jsx';
// import Menu3 from '../Home/components/Menu3.jsx';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// const columns = [
//   { type: "string", label: "Task ID" },
//   { type: "string", label: "Task Name" },
//   { type: "string", label: "Resource" },
//   { type: "date", label: "Start Date" },
//   { type: "date", label: "End Date" },
//   { type: "number", label: "Duration" },
//   { type: "number", label: "Percent Complete" },
//   { type: "string", label: "Dependencies" },
//   { type: "string", label: "Color" },
// ];

// export function AppGantt() {
//   const [data, setData] = useState([columns]);
//   const [reload, setReload] = useState(0);
//   const [projects, setProjects] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8083/SERVICE-TACHE/sprint/AllSprints');
//         const sprints = await response.json();
//         const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
//         const rows = sprints.map((sprint, index) => {
//           const startDate = new Date(sprint.datedebut);
//           const endDate = new Date(sprint.datefin);
//           const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
//           const color = colors[index % colors.length];
//           return [
//             sprint.id_sprint.toString(),
//             sprint.nom_sprint,
//             null,
//             startDate,
//             endDate,
//             duration,
//             null,
//             null,
//             color,
//           ];
//         });
//         setData([columns,...rows]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/list`); // assume this is the API endpoint for projects
//         const projectsData = await response.json();
//         setProjects(projectsData);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const options = {
//     height: 400,
//     gantt: {
//       trackHeight: 30,
//     },
//   };
//   return (
//     <Box display="flex">
//       <Menu3 rd={setReload} r={reload} />
//       <Absenceotification rd={setReload} r={reload} />
//       <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%", marginLeft: 3, marginRight: 3 }}>
//       <div className="mt-4 ml-2" style={{ marginLeft: "10px" }}>
//           <h4 className="" style={{ color: "grey", fontWeight: "light" }}>Timeline</h4>
//           <input type="search" placeholder="Search" style={{ padding: 8, width: 200, borderRadius: 5, border: "solid 0.5px" }} />
//         </div>
//         <AvatarGroup total={4} style={{ marginTop: "-40px",marginRight:"900px" }}>
//           <Avatar sx={{ bgcolor: "orange", width: 30, height: 30 }}>OP</Avatar>
//           <Avatar sx={{ bgcolor: "green", width: 30, height: 30 }}>sf</Avatar>
//           <Avatar sx={{ bgcolor: "blue", width: 30, height: 30 }}>tt</Avatar>
//           <Avatar sx={{ bgcolor: "purple", width: 30, height: 30 }}>cc</Avatar>
//         </AvatarGroup>
//         <div>
//           <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: "-40px", marginLeft: "900px" }}>
//             <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
//             <Select
//               labelId="demo-simple-select-standard-label"
//               id="demo-simple-select-standard"
//             >
//               <MenuItem value=""><em>None</em></MenuItem>
//               <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//         <div>
//           <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: "-60px", marginLeft: "1100px" }}>
//             <InputLabel id="demo-simple-select-standard-label">Project</InputLabel>
//             <Select
//               labelId="demo-simple-select-standard-label"
//               id="demo-simple-select-standard"
//             >
//               <MenuItem value=""><em>None</em></MenuItem>
//               <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//         <Chart
//           chartType="Gantt"
//           width="100%"
//           height="50%"
//           data={data}
//           options={options}
//         />
//       </Box>
//     </Box>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import Absenceotification from '../Home/components/Absenceotification.jsx';
import Menu3 from '../Home/components/Menu3.jsx';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
  { type: "string", label: "Color" },
];

export function AppGantt() {
  const [data, setData] = useState([columns]);
  const [reload, setReload] = useState(0);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const userInfoData = sessionStorage.getItem("UserInfo");
  const userInfoObject = JSON.parse(userInfoData);
const idsUserConnecte = userInfoObject.id;

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8083/SERVICE-TACHE/sprint/AllSprints');
        const sprints = await response.json();
        const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
        const rows = sprints.map((sprint, index) => {
          const startDate = new Date(sprint.datedebut);
          const endDate = new Date(sprint.datefin);
          const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
          const color = colors[index % colors.length];
          return [
            sprint.id_sprint.toString(),
            sprint.nom_sprint,
            null,
            startDate,
            endDate,
            duration,
            null,
            null,
            color,
          ];
        });
        setData([columns,...rows]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:8083/SERVICE-GESTIONPROJETS/projet/Getbyemployee/${idsUserConnecte}`);
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, [idsUserConnecte]);

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
    // Implement additional logic if needed to filter data based on selected project
  };

  return (
    <Box display="flex">
      <Menu3 rd={setReload} r={reload} />
      <Absenceotification rd={setReload} r={reload} />
      <Box sx={{ flexGrow: 1, marginTop: 5, height: "100%", marginLeft: 3, marginRight: 3 }}>
        <div className="mt-4 ml-2" style={{ marginLeft: "10px" }}>
          <h4 className="" style={{ color: "grey", fontWeight: "light" }}>Timeline</h4>
          <input type="search" placeholder="Search" style={{ padding: 8, width: 200, borderRadius: 5, border: "solid 0.5px" }} />
        </div>
        <AvatarGroup total={4} style={{ marginTop: "-40px", marginRight:"900px" }}>
          <Avatar sx={{ bgcolor: "orange", width: 30, height: 30 }}>OP</Avatar>
          <Avatar sx={{ bgcolor: "green", width: 30, height: 30 }}>sf</Avatar>
          <Avatar sx={{ bgcolor: "blue", width: 30, height: 30 }}>tt</Avatar>
          <Avatar sx={{ bgcolor: "purple", width: 30, height: 30 }}>cc</Avatar>
        </AvatarGroup>
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: "-40px", marginLeft: "900px" }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: "-60px", marginLeft: "1100px" }}>
            <InputLabel id="project-select-label">Project</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={selectedProject}
              onChange={handleProjectChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {projects.map(project => (
                <MenuItem key={project.id} value={project.id}>{project.nom}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Chart
          chartType="Gantt"
          width="100%"
          height="50%"
          data={data}
          options={options}
        />
      </Box>
    </Box>
  );
}

