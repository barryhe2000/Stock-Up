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

app.listen(port, () => console.log(`Listening on port ${port}!`));