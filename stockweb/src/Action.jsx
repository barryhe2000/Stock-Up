import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default () => {
    return (
        <div>
            
            <div className="action-header">
                <p className="action-title">Hi, Alice.</p>
                <p className="action-subtitle">What would you like to do?</p>
                
            </div>
            <div className="action-options">
                <div className="option-input-expense">
                    <img className="action-input-img" src={require('./images/134.png')} alt="Girl Holding Bags"/>
                    <Button id="option-input-button" variant="outline-dark" href="/Home">Input Expense</Button>
                </div>

                <div className="option-track-spending">
                    <img className="action-track-img" src={require('./images/075.png')} alt="Man Checking Screen"/>
                    <Button id="option-track-button" variant="outline-dark" href="/Home">Track Spending</Button>
                </div>

                <div className="option-manage-budget">
                    <img className="action-budget-img" src={require('./images/104.png')} alt="Man Adding Funds"/>
                    <Button id="option-budget-button" variant="outline-dark" href="/managebudget">Manage Budget</Button>
                </div>
            

            </div>
        </div>
    )
}