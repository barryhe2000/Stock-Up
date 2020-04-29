import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default () => {
    return (
        <div className="home">
            <h1 className="logo">Stock-Up</h1>
            <Jumbotron id="jumbotron">
            <h1>Investing Made Easy.</h1>
            <p>
                Manage your stocks, make new investments, and get real-time data all in one place.
            </p>
            <p>
                <Button id="custom-button" variant="outline-dark" href="/Home">Learn more</Button>
            </p>
            </Jumbotron>
            <img src={require('./gradient.png')} alt="hi"></img>
        </div>
    )
}