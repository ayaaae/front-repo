// import React, { Component } from 'react';
// import { gantt } from 'dhtmlx-gantt';
// import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

// export default class Gantt extends Component {

//     componentDidMount() {
//         gantt.config.date_format = "%Y-%m-%d %H:%i";  
//         gantt.init(this.ganttContainer);
//         gantt.parse(this.props.tasks);
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.tasks !== this.props.tasks) {
//             gantt.clearAll();  // Clear the previous data
//             gantt.parse(this.props.tasks);  // Parse the new data
//         }
//     }

//     render() {
//        return (
//            <div
//                 ref={ (input) => { this.ganttContainer = input } }
//                 style={ { width: '85%', height: '1000px', marginLeft: "250px", marginTop: '-300px'} }
//             ></div>
//        );
//     }
// }

import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {

    componentDidMount() {
        gantt.config.date_format = "%Y-%m-%d %H:%i";
        gantt.init(this.ganttContainer);
        gantt.parse(this.props.tasks);

        // Set the background color of each task bar based on the sprint duration
        gantt.attachEvent("onAfterTaskRender", function(id, task) {
            if (task.type === "sprint") { 
              const bar = gantt.getTaskBars(id)[0];
              const duration = task.duration * 24 * 60 * 60 * 1000; 
              const color = getRandomColor(duration); 
              bar.style.backgroundColor = color;
          
              // Display the start time as "Date de debut"
              const startTime = gantt.templates.task_text(task.start_date, task, "start");
              bar.innerHTML = `Date de debut: ${startTime}`;
              
            }
          });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tasks !== this.props.tasks) {
            gantt.clearAll();
            gantt.parse(this.props.tasks);
        }
    }

    render() {
        return (
            <div
                ref={ (input) => { this.ganttContainer = input } }
                style={ { width: '70%', height: '1000px', marginLeft: "250px", marginTop: '-300px'} }
            ></div>
        );
    }
}

const getRandomColor = (duration) => {
    const colors = ['#FF69B4', '#33CC33', '#6666FF', '#FFCC00', '#0099CC'];
    const index = Math.floor(duration / (1000 * 60 * 60 * 24)) % colors.length;
    return colors[index];
};
