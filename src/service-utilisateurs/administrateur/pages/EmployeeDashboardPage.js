import React from 'react';
import Menu2 from '../../../Home/components/Menu2';



function Card({ icon, title, value }) {
    if(!sessionStorage.getItem("UserInfo")){return <h1>Session Expired</h1>}
    
    return (
        <div className="col-md-6 col-xl-3">
            <div className="card widget-card-1">
                <div className="card-block-small">
                    <i className={`icofont ${icon}`}></i>
                    <span className="text">{title}</span>
                    <h4>{value}</h4>
                </div>
            </div>
        </div>
    );
}

// Class component for the navigation bar
class NavigationBar extends React.Component {
    render() {
        return (
           
                <Menu2/>
           
        );
    }
}

class EmployeeDashboard extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
               
            </div>
        );
    }
}

export default EmployeeDashboard;