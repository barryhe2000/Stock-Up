import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Authentication from './Authentication';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default () => {
    
    return (
        <div className="home">
            <h1 className="logo">Stock-Up</h1>
            <Jumbotron id="jumbotron">
            <h1>Budgeting Made Easy.</h1>
            <p>
                Create a budget, manage expenses, and track spending all in one place.
            </p>
            <p>
                <Authentication />
            </p>
            <button onCLick={() => firebase.auth().signOut()}>Sign Out</button>
            </Jumbotron>
            {firebase.user && <div>HELLO</div>}
            <img className="home-img" src={require('./images/gradient.png')} alt="hi"></img>
        </div>
    )
}