import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';
import NewBudget from './NewBudget';

//loggedin was outside
export default ({ updateLimit, limit }, loggedIn) => {
    if (loggedIn) {
        return (
            <div>
                <div className="nav-component">
                    <NavBar active_page="manage" />
                </div>

                <div className="manage-budget">
                    <p className="manage-budget-title">Manage Budget</p>
                    <p className="current-budget">Current Monthly Budget</p>
                    <div className="current-budget-amount"><p>{limit}</p></div>
                    <div className="divider"></div>
                </div>

                <div className="create-budget">
                    <NewBudget updateLimit={updateLimit} />
                </div>

                <div className="budget-img">
                    <img className="budget-bottom-img" src={require('./images/budget_img.png')}
                        alt="Person Riding Bike" />
                </div>

            </div>
        )
    }



}