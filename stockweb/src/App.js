import React, {useState} from 'react';
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  // handle login/logout in different components
  // all components redirect to home page if no user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

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
            handleLogout={handleLogout}/>
          </Route>

          <Route path="/action/">
            <Authentication handleLogin={handleLogin}>
              <Action loggedIn={loggedIn} handleLogout={handleLogout}/>
            </Authentication>
          </Route>

          <Route path="/inputexpense/">
            <Authentication handleLogin={handleLogin}>
              <InputExpense loggedIn={loggedIn} />
            </Authentication>
          </Route>

          <Route path="/managebudget/">
            <ManageBudget />
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

        </Switch>
      </Router>
    </div>

  );
}

export default App;
