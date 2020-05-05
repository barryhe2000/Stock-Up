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

const billsTable = db.collection("Bills");
const entertainmentTable = db.collection("Entertainment");
const foodTable = db.collection("Food");
const homeTable = db.collection("Home");
const otherTable = db.collection("Other");
const shoppingTable = db.collection("Shopping");
const transportTable = db.collection("Transport");
const usersTable = db.collection("Users");

app.post('/maketransaction/', async (req, res, next) => {
  const category = req.query.category;
  const info = req.body;
  const username = info.username;
  const prev = await usersTable.get(username);
  const balance = prev.balance + info.amount;
  let tbl = null;
  if (category === "bills") {
    tbl = billsTable.doc();
  } else if (category === "entertainment") {
    tbl = entertainmentTable.doc();
  } else if (category === "food") {
    tbl = foodTable.doc();
  } else if (category === "home") {
    tbl = homeTable.doc();
  } else if (category === "other") {
    tbl = otherTable.doc();
  } else if (category === "shopping") {
    tbl = shoppingTable.doc();
  } else { //transport
    tbl = transportTable.doc();
  }
  await usersTable.doc(username).update({ balance });
  tbl.set(info);
  res.status(201).send(tbl.id);
})

app.post('/action/', async (req, res, next) => {
  //check if username already exists, if so then bye bye
  const username = req.body.username;
  const accounts = await usersTable.get();
  for (let doc of accounts.docs) {
    if (username === doc.data().username) {
      console.log("done");
      res.send("no need to update"); //update message later
    }
  }
  const tbl = usersTable.doc(username);
  tbl.set({ username: username, balance: 0, limit: 0 });
  res.status(201).send(tbl.id);
})







// //must be req.query.Username (take care frontend)
// //return balance 
// app.get('/maketransaction/', async (req, res, next) => {
//   const user = await userTable.get(req.query.Username);
//   res.json({ Balance: user.Balance });
// })


// //assuming JSON has fields of stock and quantity
// //username has to be saved and passed down
// //FILL IN THE STOCK PRICE
// //in the fron end - add the balance from the get req and pass in
// const stockPrice = 0;
// app.post('/maketransaction/', async (req, res, next) => {
//   const txnInfo = req.body;
//   const amnt = txnInfo.Quantity * stockPrice;
//   let Balance = txnInfo.Balance - amnt;
//   if (txnInfo.Bought) {
//     if (Balance < 0) {
//       res.status(404).send("Not enough money!");
//       return;
//     }
//   } else {
//     //assume you can't sell a stock you don't own 
//     //will fix later if needed
//     Balance += amnt + amnt;
//   }
//   await userTable.doc(txnInfo.Username).update({ Balance });
//   txn = serializeTransactions(usr, txnInfo.Buy, txnInfo.Quantity, txnInfo.Stock);
//   transactionTable.doc().set(txn);
//   updateExistingStock(txnInfo.Stock, usr, txnInfo.Quantity, txnInfo.Buy);
//   res.status(201).send(txnInfo.Stock);
// })



// //after buying a stock, find if stock already exists, add to it
// //if doesn't exist, add new stock to stock table for user
// //if buy is true, then buy, otherwise sell
// const updateExistingStock = async (stock, username, quantity, buy) => {
//   const stocks = await stockTable.orderBy("Username").get();
//   for (let doc of stocks.docs) {
//     let holding = doc.data();
//     if (holding.Username === username && holding.Stock === stock) {
//       if (buy) holding.Quantity += quantity;
//       else holding.Quantity -= quantity;
//       stockTable.doc(holding.id).update(holding);
//       return;
//     }
//   }
//   if (buy) {
//     const newStock = serializeStocks(username, quantity, stock);
//     stockTable.doc().set(newStock);
//   }
// }

// //consolidate into helper functions later
// app.get('/allusers/', async function (req, res, next) {
//   const accounts = await userTable.orderBy('Username').get();
//   const arr = [];
//   for (let doc of accounts.docs) {
//     let post = doc.data();
//     console.log(post.Password);
//     arr.push(post);
//   }
//   res.send(arr);
// })

// app.post('/maketransaction/', function (req, res, next) {
//   const d = transactionTable.doc();
//   d.set(req.body);
//   res.send(d.id);
// })





// //maketransaction
// //overview 
// //addfunds


// app.get('/alltransactions/', async function (req, res, next) {
//   const accounts = await transactionTable.orderBy('Username').get();
//   const arr = [];
//   for (let doc of accounts.docs) {
//     let post = doc.data();
//     console.log(post.Password);
//     arr.push(post);
//   }
//   res.send(arr);
// })

// app.get('/allstocks/', async function (req, res, next) {
//   const accounts = await stockTable.orderBy('Username').get();
//   const arr = [];
//   for (let doc of accounts.docs) {
//     let post = doc.data();
//     console.log(post.Password);
//     arr.push(post);
//   }
//   res.send(arr);
// })

app.listen(port, () => console.log(`Listening on port ${port}!`));

//GOODBYE JOJO

// const admin = require("firebase-admin");
// const serviceAccount = require("./service-account.json");
// const express = require('express');
// const bodyParser = require('body-parser');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://stock-up-31d01.firebaseio.com"
// });

// const db = admin.firestore();
// const app = express();
// const port = 8080;
// app.use(bodyParser.json());

// const userTable = db.collection("Users");
// const stockTable = db.collection("UserStocks");
// const transactionTable = db.collection("Transactions");

// const usr = null;



// //json fields are Username and Password
// //TODO: check for already existing Username
// //signing up for account
// // app.post('/signup/', function (req, res, next) {
// //   const loginInfo = req.body;
// //   loginInfo.balance = 0;
// //   if (loginInfo.Username.length < usernameLength) {
// //     res.status(404).send("Username length must be at least 4 characters");
// //     return;
// //   }
// //   if (loginInfo.Password.length < passwordLength) {
// //     res.status(404).send("Password length must be at least 8 characters");
// //     return;
// //   }
// //   const newDoc = userTable.doc(loginInfo.Username);
// //   newDoc.set(loginInfo);
// //   res.status(201).send(newDoc.id);
// // })


// //must be req.query.Username (take care frontend)
// //return balance 
// app.get('/maketransaction/', async (req, res, next) => {
//   const user = await userTable.get(req.query.Username);
//   res.json({ Balance: user.Balance });
// })


// //assuming JSON has fields of stock and quantity
// //username has to be saved and passed down
// //FILL IN THE STOCK PRICE
// //in the fron end - add the balance from the get req and pass in
// const stockPrice = 0;
// app.post('/maketransaction/', async (req, res, next) => {
//   const txnInfo = req.body;
//   const amnt = txnInfo.Quantity * stockPrice;
//   let Balance = txnInfo.Balance - amnt;
//   if (txnInfo.Bought) {
//     if (Balance < 0) {
//       res.status(404).send("Not enough money!");
//       return;
//     }
//   } else {
//     //assume you can't sell a stock you don't own 
//     //will fix later if needed
//     Balance += amnt + amnt;
//   }
//   await userTable.doc(txnInfo.Username).update({ Balance });
//   txn = serializeTransactions(usr, txnInfo.Buy, txnInfo.Quantity, txnInfo.Stock);
//   transactionTable.doc().set(txn);
//   updateExistingStock(txnInfo.Stock, usr, txnInfo.Quantity, txnInfo.Buy);
//   res.status(201).send(txnInfo.Stock);
// })



// //after buying a stock, find if stock already exists, add to it
// //if doesn't exist, add new stock to stock table for user
// //if buy is true, then buy, otherwise sell
// const updateExistingStock = async (stock, username, quantity, buy) => {
//   const stocks = await stockTable.orderBy("Username").get();
//   for (let doc of stocks.docs) {
//     let holding = doc.data();
//     if (holding.Username === username && holding.Stock === stock) {
//       if (buy) holding.Quantity += quantity;
//       else holding.Quantity -= quantity;
//       stockTable.doc(holding.id).update(holding);
//       return;
//     }
//   }
//   if (buy) {
//     const newStock = serializeStocks(username, quantity, stock);
//     stockTable.doc().set(newStock);
//   }
// }

// //consolidate into helper functions later
// app.get('/allusers/', async function (req, res, next) {
//   const accounts = await userTable.orderBy('Username').get();
//   const arr = [];
//   for (let doc of accounts.docs) {
//     let post = doc.data();
//     console.log(post.Password);
//     arr.push(post);
//   }
//   res.send(arr);
// })

// app.post('/maketransaction/', function (req, res, next) {
//   const d = transactionTable.doc();
//   d.set(req.body);
//   res.send(d.id);
// })





// //maketransaction
// //overview 
// //addfunds


// app.get('/alltransactions/', async function (req, res, next) {
//   const accounts = await transactionTable.orderBy('Username').get();
//   const arr = [];
//   for (let doc of accounts.docs) {
//     let post = doc.data();
//     console.log(post.Password);
//     arr.push(post);
//   }
//   res.send(arr);
// })

// app.get('/allstocks/', async function (req, res, next) {
//   const accounts = await stockTable.orderBy('Username').get();
//   const arr = [];
//   for (let doc of accounts.docs) {
//     let post = doc.data();
//     console.log(post.Password);
//     arr.push(post);
//   }
//   res.send(arr);
// })

// app.listen(port, () => console.log(`Listening on port ${port}!`));