const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const signin = require("./controllers/signin");
const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const items = require("./controllers/items");
const newbid = require("./controllers/newbid");
const item = require("./controllers/item");
const getBids = require("./controllers/getBids");
const setBid = require("./controllers/bidForItem");
const approveItem = require("./controllers/approveItem");
const disapproveItem = require("./controllers/disapproveItem");
const getItemsYouBidded = require("./controllers/getItemsYouBidded");
const getItemsYouCreated = require("./controllers/getItemsYouCreated");
const updateItem = require("./controllers/updateItem");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgre",
    database: "smart-brain",
  },
});

console.log(
  knex
    .select()
    .from("users")
    .then((data) => {
      // console.log(data)
    })
);

app.get("/", (req, res) => {
  res.send("this is working");
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, knex, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.post("/newBid", (req, res) => {
  newbid.handleNewBid(req, res, knex);
});

app.get("/items", (req, res) => {
  items.handleItems(req, res, knex);
});

app.get("/items/:id", (req, res) => {
  item.handleItem(req, res, knex);
});

app.post("/addItem", (req, res) => {
  res.send("hello");
});

app.get("/getBids/:id", (req, res) => {
  getBids.handleGetBids(req, res, knex);
});

app.post("/setBid/:user&:item", (req, res) => {
  setBid.handleBidForItem(req, res, knex);
});

app.post("/approve/:id", (req, res) => {
  approveItem.handleApproveItem(req, res, knex);
});

app.post("/disapprove/:id", (req, res) => {
  disapproveItem.handleDisApproveItem(req, res, knex);
});

app.get("/getItemsYouBidded/:id", (req, res) => {
  getItemsYouBidded.handleGetItemsYouBidded(req, res, knex);
});

app.get("/getItemsYouCreated/:id", (req, res) => {
  getItemsYouCreated.handleGetItemsYouCreated(req, res, knex);
});

app.post("/updateItem/:id", (req, res) => {
  updateItem.handleUpdateItem(req, res, knex);
});

app.post("/upload", (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "No file was uploaded" });
  }
  const file = req.files.file;
  file.mv(`../smartbiddingapp/public/images/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: file.name,
      filePath: `/images/${file.name}`,
    });
  });
});

const func = () => {
  console.log("a");
  knex("product")
    .where("secondsleft", ">", 0)
    .decrement("secondsleft", 1)
    .returning("*")
    .catch((err) => {
      // res.status(400).json(err);
      console.log(err);
    });
};

// setInterval(func, 1000);

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
