import React, { useState } from 'react';
import NavBar from './NavBar';
import InputExpenseForm from './InputExpenseForm';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default ({ makeTransaction }, loggedIn) => {

    if (loggedIn) {

        return (
            <div>
                <div className="nav-component">
                    <NavBar active_page="input" />
                </div>

                <div className="input-expense-header">
                    <p className="input-expense-title">Input Expense</p>
                </div>

                <div className="input-expense-component">
                    <InputExpenseForm makeTransaction={makeTransaction} />
                </div>

                <div className="input-image-container">
                    <img className="input-expense-image" src={require('./images/input_expense.png')}
                        alt="Man Sitting on Chair"></img>
                </div>



            </div>

        )

    } else {


    }
}