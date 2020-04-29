import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Home from './Home';
import Transaction from './Transaction';
import AddFunds from './AddFunds';
import Action from './Action'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/action">
            <Action />
          </Route>

          <Route path="/transaction">
            <Transaction />
          </Route>

          <Route path="/addfunds">
            <AddFunds />
          </Route>

        </Switch>
      </Router>
    </div>

  );
}

export default App;
