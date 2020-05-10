import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Home from './Home';
import InputExpense from './InputExpense';
import InputExpenseForm from './InputExpenseForm';
import ManageBudget from './ManageBudget';
import Action from './Action'
import Authentication from './Authentication';
import NavBar from './NavBar';
import NewBudget from './NewBudget';
import BudgetStats from './BudgetStats';
import DonutChart from './DonutChart';
import LineChart from './LineChart';
import SpendingReport from './SpendingReport';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  // handle login/logout in different components
  // all components redirect to home page if no user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  const [limit, setLimit] = useState(0);
  const [balance, setBalance] = useState(0); //number of $ user has spent
  const [expenses, setExpenses] = useState([]); //stuff bought

  let username = null;

  if (loggedIn) username = firebase.auth().currentUser.email;

  //calls post request for '/action/:username'
  const createUser = () => {
    axios.post(`/action/${username}`);
  }

  //calls post request for updatelimit
  const updateLimit = (lim) => {
    axios.post(`/updatelimit/${username}`, { lim: lim }).then(
      res => setLimit(lim));
  }

  const makeTransaction = (desc, amnt, mon, day, yr, cat) => {
    //not entering the function
    axios.post(`/maketransaction/${cat}`,
      { amount: amnt, day: day, description: desc, year: yr, month: mon, username: username })
      .then(res =>
        setExpenses([...expenses, {
          amount: amnt, day: day, description: desc, year: yr, month: mon, username: username
        }]));
  }

  const handleLogout = () => {
    firebase.auth().signOut();
    setLoggedIn(false);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <Home handleLogin={handleLogin} loggedIn={loggedIn}
              handleLogout={handleLogout} />
          </Route>

          <Route path="/action/">
            <Authentication handleLogin={handleLogin}>
              <Action loggedIn={loggedIn} handleLogout={handleLogout}
                createUser={createUser} />
            </Authentication>
          </Route>

          <Route path="/inputexpense/">
            <Authentication handleLogin={handleLogin}>
              <InputExpense loggedIn={loggedIn}
                makeTransaction={makeTransaction} />
            </Authentication>
          </Route>

          <Route path="/managebudget/">
            <Authentication handleLogin={handleLogin}>
              <ManageBudget updateLimit={updateLimit} />
            </Authentication>
          </Route>

          <Route path="/nav/">
            <NavBar />
          </Route>

          <Route path="/newbudget/">
            <NewBudget />
          </Route>

          <Route path="/expenseinput/">
            <InputExpenseForm />
          </Route>
         
          <Route path="/stats/">
            <BudgetStats />
          </Route>

          <Route path="/donut/">
            <DonutChart />
          </Route>

          <Route path="/line/">
            <LineChart />
          </Route>

          <Route path="/spendingreport/">
            <SpendingReport />
          </Route>

        </Switch>
      </Router>
    </div>

  );
}

export default App;
