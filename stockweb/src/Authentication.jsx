import React, {useState} from 'react';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDckLi28GxIxLQiGSMgasvOvfpGqbT-660",
    authDomain: "stock-up-31d01.firebaseapp.com",
    databaseURL: "https://stock-up-31d01.firebaseio.com",
    projectId: "stock-up-31d01",
    storageBucket: "stock-up-31d01.appspot.com",
    messagingSenderId: "226025343200",
    appId: "1:226025343200:web:b52ba85971893ab1416885",
    measurementId: "G-FC03SZF4B9"

}; // put firebase config in here

firebase.initializeApp(firebaseConfig);

export default (props) => {

  const [user, setUser] = useState(null);

  // handles login from home page
  const isLoggedIn = (handleLogin, user) => {
    if (handleLogin && user) {
      handleLogin();
    }
  }

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }

  useEffect(() => onAuthStateChange(), []);
  useEffect(() => isLoggedIn(props.handleLogin, user), [props.handleLogin, user]);

  return (
    <div>
      {user && props.children}
      {!user && (
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      )}
    </div>
  );
};