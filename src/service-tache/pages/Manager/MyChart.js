import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';

const COLORS = ['#FF8042', '#00C49F', '#0088FE'];

const MyChart = ({ userId }) => {
  const [data, setData] = useState([]);



  useEffect(() => {


    console.log("Fetching tasks for userId:", userId);

    fetch(`http://localhost:8083/SERVICE-TACHE/Taches/AllTaches`)
      .then(response => response.json())
      .then(data => {

        const filteredData = data.filter(task => String(task.idemployee) === String(userId));

        const taskData = {
            todo: filteredData.filter(task => task.etat_tache === 'AFAIRE').length,
            inProgress: filteredData.filter(task => task.etat_tache === 'ENCOURS').length,
            done: filteredData.filter(task => task.etat_tache === 'FAIT').length,
          };
        
       const totalTasks = taskData.todo + taskData.inProgress + taskData.done;
        console.log("Total tasks:", totalTasks);

        if (totalTasks > 0) {
          const chartData = [
            { name: 'To Do', value: (taskData.todo / totalTasks) * 100 },
            { name: 'In Progress', value: (taskData.inProgress / totalTasks) * 100 },
            { name: 'Done', value: (taskData.done / totalTasks) * 100 },
          ];
          console.log("Chart data:", chartData);
          setData(chartData);
        } else {
          console.log("No tasks found for userId:", userId);
          setData([]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Task Distribution
      </Typography>
      <ResponsiveContainer width="90%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value.toFixed(2)}%`} // Affiche les pourcentages
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default MyChart;