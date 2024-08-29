import React from "react";
import { MDBRow } from 'mdb-react-ui-kit';
import './common.css';
const Dashboard = () => {
    return (
        <div className="mt-5 container-fluid p-4 scrolling-container">
            <MDBRow>
                <h1 className="mt-5 scrolling-text">Wellcome to TN Hulling Mill Management System Dashboard</h1>
            </MDBRow>
        </div>
    )
}

export default Dashboard;