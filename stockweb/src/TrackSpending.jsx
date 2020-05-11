import React from 'react';
import SpendingReport from './SpendingReport';
import NavBar from './NavBar';

export default (loggedIn) => {
// should take in budget
// need to calculate statistics and data to pass into graphs

if (loggedIn) {
    return (
        <div>
            <div className="nav-component">
                <NavBar active_page="track" />
            </div>
            <div className="track-spending-header">
                <p className="track-spending-title">My Spending</p>
            </div>
            <div className="spending-report-component">
                <SpendingReport />
            </div>

        </div>
    )
}
    
}