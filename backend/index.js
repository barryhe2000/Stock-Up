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

const usernameLength = 4;
const passwordLength = 8;

const usr = null;
const usrBalance = null;

//username: string, bought: boolean, quantity: number, stock: string
const serializeTransactions = (username, bought, quantity, stock) => {
  return {
    "Bought": bought,
    "Quantity": quantity,
    "Stock": stock,
    "Username": username
  };
}

//username: string, quantity: number, stock: string
const serializeStocks = (username, quantity, stock) => {
  return {
    "Quantity": quantity,
    "Stock": stock,
    "Username": username
  };
}

//json fields are Username and Password
//TODO: check for already existing Username
//signing up for account
app.post('/signup/', function (req, res, next) {
  const loginInfo = req.body;
  loginInfo.balance = 0;
  if (loginInfo.Username.length < usernameLength) {
    res.status(404).send("Username length must be at least 4 characters");
    return;
  }
  if (loginInfo.Password.length < passwordLength) {
    res.status(404).send("Password length must be at least 8 characters");
    return;
  }
  const newDoc = userTable.doc(loginInfo.Username);
  newDoc.set(loginInfo);
  res.status(201).send(newDoc.id);
})

//assuming JSON has fields of stock and quantity
//username has to be saved and passed down
//FILL IN THE STOCK PRICE
const stockPrice = 0;
app.post('/buyorsellstock/', function (req, res, next) {
  const txnInfo = req.body; //quantity and stock and buy/sell
  const amnt = txnInfo.Quantity * stockPrice;
  if (txnInfo.Buy) {
    if (usrBalance - amnt < 0) {
      res.status(404).send("Not enough money!");
      return;
    }
    usrBalance -= amnt;
  } else {
    //assume you can't sell a stock you don't own 
    //will fix later if needed
    usrBalance += amnt;
  }
  txn = serializeTransactions(usr, txnInfo.Buy, txnInfo.Quantity, txnInfo.Stock);
  transactionTable.doc().set(txn);
  updateExistingStock(txnInfo.Stock, usr, txnInfo.Quantity, txnInfo.Buy);
  res.status(201).send(txnInfo.Stock);
})


//after buying a stock, find if stock already exists, add to it
//if doesn't exist, add new stock to stock table for user
//if buy is true, then buy, otherwise sell
const updateExistingStock = async (stock, username, quantity, buy) => {
  const stocks = await stockTable.orderBy("Username").get();
  for (let doc of stocks.docs) {
    let holding = doc.data();
    if (holding.Username === username && holding.Stock === stock) {
      if (buy) holding.Quantity += quantity;
      else holding.Quantity -= quantity;
      stockTable.doc(holding.id).update(holding);
      return;
    }
  }
  if (buy) {
    const newStock = serializeStocks(username, quantity, stock);
    stockTable.doc().set(newStock);
  }
}

//get user by Username (and Password)
//login 
//how to pass username and password from front to backend

//for now assume username and password are variables
//we'll call them userAttempt and passAttempt
const userAttempt = ""; //FILL IN
const passAttempt = ""; //FILL IN
app.get('/signin/', async function (req, res, next) {
  const accounts = await userTable.orderBy('Username').get();
  for (let doc of accounts.docs) {
    let user = doc.data();
    if (user.Username === userAttempt && passAttempt === passAttempt) {
      usr = user.Username;
      usrBalance = user.balance;
      //take the user's data from the tables (stocks, balances, etc)
      //and just display it for them
      //pass notes to frontend to render
    }
  }
  res.status(404).send("Incorrect username or password");
})

//consolidate into helper functions later
app.get('/allusers/', async function (req, res, next) {
  const accounts = await userTable.orderBy('Username').get();
  const arr = [];
  for (let doc of accounts.docs) {
    let post = doc.data();
    console.log(post.Password);
    arr.push(post);
  }
  res.send(arr);
})

app.get('/alltransactions/', async function (req, res, next) {
  const accounts = await transactionTable.orderBy('Username').get();
  const arr = [];
  for (let doc of accounts.docs) {
    let post = doc.data();
    console.log(post.Password);
    arr.push(post);
  }
  res.send(arr);
})

app.get('/allstocks/', async function (req, res, next) {
  const accounts = await stockTable.orderBy('Username').get();
  const arr = [];
  for (let doc of accounts.docs) {
    let post = doc.data();
    console.log(post.Password);
    arr.push(post);
  }
  res.send(arr);
})

app.listen(port, () => console.log(`Listening on port ${port}!`));