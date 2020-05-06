import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default ({page}) => {
    return (
        <div className="custom-navbar">
            <p className="nav-logo">Stock-Up</p>
            <Nav defaultActiveKey={page} className="flex-column">

                <div className="single-link">
                    <Nav.Link className="navlink" href="/inputexpense" eventKey="inputexpense">
                    Input Expense</Nav.Link>
                </div>

                <div className="single-link">
                    <Nav.Link className="navlink" href="/trackspending" eventKey="trackspending">
                    Track Spending</Nav.Link>
                </div>

                <div className="single-link">
                    <Nav.Link className="navlink" href="/managebudget" eventKey="managebudget">
                    Manage Budget</Nav.Link>
                </div>

            </Nav>
        </div>
    )
}