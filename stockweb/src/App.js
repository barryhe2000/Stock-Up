import React, { useState, useEffect } from 'react';
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
import TrackSpending from './TrackSpending';
import RecentExpenses from './RecentExpenses';
import Expense from './Expense';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {

  // handle login/logout in different components
  // all components redirect to home page if no user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  const [limit, setLimit] = useState(0);
  const [balance, setBalance] = useState(0); //number of $ user has spent
  const [expenses, setExpenses] = useState([]); //curr month&year
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [yearExpenses, setYearExpenses] = useState([]);

  let username = null;
  if (loggedIn) username = firebase.auth().currentUser.email;

  // calls post request for '/action/:username'
  const createUser = () => {
    axios.post(`/action/${username}`);
  }

  //update month
  const getMon = () => {
    axios.get(`/month/`).then(res => setMonth(res.data.month));
  }

  useEffect(() => getMon());

  const getYr = () => {
    axios.get(`/year/`).then(res => setYear(res.data.year));
  }

  useEffect(() => getYr());

  // calls get request for '/getlimit/:username'
  const getLimit = () => {
    axios.get(`/getlimit/${username}`).then(res => setLimit(res.data.limit));
  }

  useEffect(() => getLimit());

  // calls get request for '/getbalance/:username'
  const getBalance = () => {
    axios.get(`/getbalance/${username}`).then(res => setBalance(res.data.balance));
  }

  useEffect(() => getBalance());

  // calls post request for updatelimit
  const updateLimit = (lim) => {
    axios.post(`/updatelimit/${username}`, { lim: lim }).then(
      res => setLimit(lim)
    );
  }

  // calls get request for '/getallactions/:username'
  const getAllActions = () => {
    axios.get(`/getallactions/${username}?month=${month}&year=${year}`).then(
      res => { setExpenses(res.data) });
  }

  useEffect(() => getAllActions());

  const getYearActions = () => {
    axios.get(`/getallactions/${username}?year=${year}`).then(
      res => { setYearExpenses(res.data) });
  }

  useEffect(() => getYearActions());

  // calls post request for makeTransaction
  const makeTransaction = (desc, amnt, mon, day, yr, cat) => {
    axios.post(`/maketransaction/${cat}?month=${month}&year=${year}`,
      { amount: amnt, day: day, description: desc, year: yr, month: mon, username: username });
  }

  // keeps track of login/logout
  const handleLogout = () => {
    setLoggedIn(false);
    firebase.auth().signOut();
  
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

          <Route path="/home">
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
              <InputExpense makeTransaction={makeTransaction}
                loggedIn={loggedIn} handleLogout={handleLogout}
              />
            </Authentication>
          </Route>

          <Route path="/managebudget/">
            <Authentication handleLogin={handleLogin}>
              <ManageBudget limit={limit} loggedIn={loggedIn}
                updateLimit={updateLimit} handleLogout={handleLogout} />
            </Authentication>
          </Route>

          <Route path="/trackspending/">
            <Authentication handleLogin={handleLogin}>
              <TrackSpending limit={limit} balance={balance} expenses={expenses}
                loggedIn={loggedIn} handleLogout={handleLogout}
                yearExpenses={yearExpenses} />
            </Authentication>
          </Route>


        </Switch>
      </Router>
    </div>

  );
}

export default App;
