import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default ({active_page}) => {

    return (
        <div className="custom-navbar">
            <p className="nav-logo">Stock-Up</p>
            <Nav defaultActiveKey={active_page} className="flex-column">

                <div className={"single-link " + (active_page === "input" && "current-link")}>
                    <Nav.Link className="navlink" href="/inputexpense" eventKey="inputexpense">
                    Input Expense</Nav.Link>
                </div>

                <div className={"single-link " + (active_page === "track" && "current-link")}>
                    <Nav.Link className="navlink" href="/trackspending" eventKey="trackspending">
                    Track Spending</Nav.Link>
                </div>

                <div className={"single-link " + (active_page === "manage" && "current-link")}>
                    <Nav.Link className="navlink" href="/managebudget" eventKey="managebudget">
                    Manage Budget</Nav.Link>
                </div>

            </Nav>
        </div>
    )
}