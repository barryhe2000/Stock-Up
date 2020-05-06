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
                <div className="option-make-transaction">
                    <img className="action-transaction-img" src={require('./images/134.png')} alt="Girl Holding Bags"/>
                    <Button id="option-transaction-button" variant="outline-dark" href="/Home">Input Expense</Button>
                </div>

                <div className="option-overview">
                    <img className="overview-img" src={require('./images/075.png')} alt="Man Checking Screen"/>
                    <Button id="option-overview-button" variant="outline-dark" href="/Home">Track Spending</Button>
                </div>

                <div className="option-add-funds">
                    <img className="add-funds-img" src={require('./images/104.png')} alt="Man Adding Funds"/>
                    <Button id="option-funds-button" variant="outline-dark" href="/managebudget">Manage Budget</Button>
                </div>
            

            </div>
        </div>
    )
}