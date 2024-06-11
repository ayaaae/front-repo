import React from 'react';
import Backlog from './Backlog';
import AddItem from './AddItem';
import AddSprint from './AddSprint';
import AddEpic from './AddEpic';
import AddTaches from './Taches';
import Menu3 from '../../../Home/components/Menu3';

function HomeTache() {

  return (
    <div>
      <Menu3/>
<AddTaches></AddTaches>
      <AddEpic></AddEpic>
      <AddItem></AddItem>
      <AddSprint></AddSprint>
      <Backlog></Backlog>

      
    </div>
  );
}

export default HomeTache;
