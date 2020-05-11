import React from 'react';
import SpendingReport from './SpendingReport';
import NavBar from './NavBar';
import RecentExpenses from './RecentExpenses';

export default (loggedIn, expenses) => {
// should take in budget
// need to calculate statistics and data to pass into graphs
const data = [
    {
        "username": "sl2486",
        "year": 2020,
        "description": "steak",
        "amount": 5,
        "day": 5,
        "month": 5
    },
    {
        "year": 2020,
        "description": "eggs",
        "amount": 3,
        "day": 5,
        "month": 5,
        "username": "sl2486"
    },
    {
        "amount": 8,
        "day": 5,
        "month": 5,
        "username": "sl2486",
        "year": 2020,
        "description": "pizza pie"
    },
    {
        "year": 2020,
        "description": "fries",
        "amount": 9,
        "day": 5,
        "month": 5,
        "username": "sl2486"
    },
    {
        "amount": 9,
        "day": 5,
        "month": 5,
        "username": "sl2486",
        "year": 2020,
        "description": "greens"
    }
];

if (loggedIn) {
    return (
        <div className="track-spending">
            <div className="nav-component">
                <NavBar active_page="track" />
            </div>

            <div className="track-spending-header">
                <p className="track-spending-title">My Spending</p>
            </div>

            <div className="spending-report-component">
                <SpendingReport />
            </div>

            <div className="recent-expenses-component">
                <RecentExpenses expenses={data} />
            </div>

        </div>
    )
}
    
}