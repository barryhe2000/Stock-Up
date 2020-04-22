const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stock-up-31d01.firebaseio.com"
});

const db = admin.firestore();
const app = express();
const port = 8080;
app.use(bodyParser.json());

const userTable = db.collection("Users");
const stockTable = db.collection("UserStocks");
const transactionTable = db.collection("Transactions");

//json fields should be username, password
//we will set balance to 0 during account creation 
app.post('/signup/', function (req, res, next) {
  const loginInfo = req.body;
  if (loginInfo.Username == null || loginInfo.Password == null) {
    res.status(500).send("Invalid Username or Password");
  }
  loginInfo.balance = 0;
  const newDoc = userTable.doc(loginInfo.Username);
  newDoc.set(loginInfo);
  res.status(201).send(newDoc.Username);
})

app.listen(port, () => console.log(`Listening on port ${port}!`));