import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Authentication from './Authentication';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';


export default ({ handleLogin, loggedIn, handleLogout }) => {

    // currently does not successfully redirect
    if (loggedIn) {

        return <Redirect to="/action" />;

    } else {
        return (
            <div className="home">
                <h1 className="logo">Stock-Up</h1>

                <Jumbotron id="jumbotron">
                    <h1>Budgeting Made Easy.</h1>
                    <p>Create a budget, manage expenses, and track spending all in one place.</p>

                    <Authentication handleLogin={handleLogin} />

                </Jumbotron>

                <img className="home-img" src={require('./images/gradient.png')} alt="hi"></img>
            </div>
        )

    }


}