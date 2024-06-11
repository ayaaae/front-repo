import React, { useState, useEffect } from 'react';
import Gantt from './Gantt/Gantt';
import Menu3 from '../../Home/components/Menu3';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const App = () => {
  const [data, setData] = useState({ tasks: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8083/SERVICE-TACHE/sprint/AllSprints');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      setData({
        tasks: fetchedData.map(sprint => ({
          id: sprint.id_sprint,
          text: sprint.nom_sprint,
          start_date: sprint.Datedebut,
          duration: sprint.duree_sprint,
          progress: sprint.progression
        })),
        links: []
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-start align-items-center gap-2">
        <div className="mt-4 ml-2" style={{ marginLeft: "250px" }}>
          <h4 className="" style={{ color: "grey", fontWeight: "light" }}>Timeline</h4>
          <input type="search" placeholder="Search" style={{ padding: 8, width: 200, borderRadius: 5, border: "solid 0.5px" }} />
        </div>
        <AvatarGroup total={4} style={{ marginTop: "80px" }}>
          <Avatar sx={{ bgcolor: "orange", width: 30, height: 30 }}>OP</Avatar>
          <Avatar sx={{ bgcolor: "green", width: 30, height: 30 }}>sf</Avatar>
          <Avatar sx={{ bgcolor: "blue", width: 30, height: 30 }}>tt</Avatar>
          <Avatar sx={{ bgcolor: "purple", width: 30, height: 30 }}>cc</Avatar>
        </AvatarGroup>
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: "70px", marginLeft: "18px" }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: "70px", marginLeft: "50px" }}>
            <InputLabel id="demo-simple-select-standard-label">Epic</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Menu3 />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="gantt-container">
          <Gantt tasks={data} />
        </div>
      )}
    </div>
  );
};

export default App;
