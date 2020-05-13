const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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

//returns array of documents (doc.data() returns json)
const getActionsHelper = (username, arr, lst) => {
  for (let doc of lst.docs) {
    let item = doc.data();
    if (username === item.username) arr.push(doc);
  }
  return arr;
};

//user inputs a new budget transaction
app.post('/maketransaction/:category', async (req, res, next) => {
  const category = req.params.category;
  const info = req.body;
  const username = info.username;
  const month = parseInt(req.query.month);
  const year = parseInt(req.query.year);
  const prev = await usersTable.where('username', '==', username).get();
  const d = new Date();
  let b = d.getMonth() + 1 === month && d.getFullYear() === year ? info.amount : 0;
  for (let doc of prev.docs) {
    b += doc.data().balance;
  }
  let tbl = null;
  if (category === "Bills") {
    tbl = billsTable.doc();
  } else if (category === "Entertainment") {
    tbl = entertainmentTable.doc();
  } else if (category === "Food") {
    tbl = foodTable.doc();
  } else if (category === "Home") {
    tbl = homeTable.doc();
  } else if (category === "Other") {
    tbl = otherTable.doc();
  } else if (category === "Shopping") {
    tbl = shoppingTable.doc();
  } else { //transport
    tbl = transportTable.doc();
  }
  await usersTable.doc(username).update({ balance: b });
  tbl.set(info);
  res.status(201).send(tbl.id);
})

//right after logging in, this post request creates 
//user, and if user is already created nothing happens
app.post('/action/:username', async (req, res, next) => {
  const username = req.params.username;
  const accounts = await usersTable.where('username', '==', username).get();
  if (!accounts.empty) res.send(username);
  else {
    const tbl = usersTable.doc(username);
    tbl.set({ username: username, balance: 0, limit: 0 });
    res.status(201).send(tbl.id);
  }
})

//user updates limit
app.post('/updatelimit/:username', async (req, res, next) => {
  const username = req.params.username;
  const l = req.body.lim;
  await usersTable.doc(username).update({ limit: l });
  res.status(201).send("Updated limit!");
})

//url: /whatever/myusername
app.get('/getbalance/:username', async (req, res, next) => {
  const username = req.params.username;
  const prev = await usersTable.where('username', '==', username).get();
  let b = null;
  for (let doc of prev.docs) {
    b = doc.data().balance;
  }
  res.status(200).json({ balance: b });
})

app.get('/getlimit/:username', async (req, res, next) => {
  const username = req.params.username;
  const prev = await usersTable.where('username', '==', username).get();
  let l = 0;
  for (let doc of prev.docs) {
    l = doc.data().limit;
  }
  res.status(200).json({ limit: l });
})

app.get('/month/', async (req, res, next) => {
  res.status(200).json({ month: new Date().getMonth() + 1 });
})

app.get('/year/', async (req, res, next) => {
  res.status(200).json({ year: new Date().getFullYear() });
})

//getallactions/:username/?month=enter&year=enter
//must have queries of year, month is OPTIONAL
app.get('/getallactions/:username', async (req, res, next) => {
  const username = req.params.username;
  const isMonth = Object.keys(req.query).length > 1 ? true : false;
  const month = parseInt(req.query.month);
  const year = parseInt(req.query.year);
  const bills = await billsTable.orderBy('username').get();
  const enter = await entertainmentTable.orderBy('username').get();
  const foods = await foodTable.orderBy('username').get();
  const homes = await homeTable.orderBy('username').get();
  const others = await otherTable.orderBy('username').get();
  const shopping = await shoppingTable.orderBy('username').get();
  const transport = await transportTable.orderBy('username').get();
  let arr = [bills, enter, foods, homes, others, shopping, transport];
  arr = arr.map((tbl) => getActionsHelper(username, [], tbl));
  const ret = [];
  //arr is 2d array holding docs, which is an arr of documents
  //doc.data() gives json
  for (let docs of arr) {
    for (let doc of docs) {
      const data = doc.data();
      if (data.year === year) {
        if (isMonth && data.month === month) ret.push(data);
        else if (!isMonth) ret.push(data);
      }
    }
  }
  res.status(200).json(ret);
})

app.get('/getbillsactions/:username', async (req, res, next) => {
  const username = req.params.username;
  const arr = [];
  const bills = await billsTable.orderBy('username').get();
  res.status(200).json(getActionsHelper(username, arr, bills).map(
    (item) => ({ ...item.data() })));
})

app.get('/getentertainmentactions/:username', async (req, res, next) => {
  const username = req.params.username;
  const arr = [];
  const enter = await entertainmentTable.orderBy('username').get();
  res.status(200).json(getActionsHelper(username, arr, enter).map(
    (item) => ({ ...item.data() })));
})

app.get('/getfoodactions/:username', async (req, res, next) => {
  const username = req.params.username;
  const arr = [];
  const foods = await foodTable.orderBy('username').get();
  res.status(200).json(getActionsHelper(username, arr, foods).map(
    (item) => ({ ...item.data() })));
})

app.get('/gethomeactions/:username', async (req, res, next) => {
  const username = req.params.username;
  const arr = [];
  const homes = await homeTable.orderBy('username').get();
  res.status(200).json(getActionsHelper(username, arr, homes).map(
    (item) => ({ ...item.data() })));
})

app.get('/getotheractions/:username', async (req, res, next) => {
  const username = req.params.username;
  const arr = [];
  const others = await otherTable.orderBy('username').get();
  res.status(200).json(getActionsHelper(username, arr, others).map(
    (item) => ({ ...item.data() })));
})

app.get('/getshoppingactions/:username', async (req, res, next) => {
  const username = req.params.username;
  const arr = [];
  const shopping = await shoppingTable.orderBy('username').get();
  res.status(200).json(getActionsHelper(username, arr, shopping).map(
    (item) => ({ ...item.data() })));
})

app.get('/gettransportactions/:username', async (req, res, next) => {
  const username = req.params.username;
  const arr = [];
  const transport = await transportTable.orderBy('username').get();
  res.status(200).json(getActionsHelper(username, arr, transport).map(
    (item) => ({ ...item.data() })));
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//process.env.PORT is heroku port
app.listen(port || process.env.PORT, () => console.log(`Listening on port ${port}!`));
