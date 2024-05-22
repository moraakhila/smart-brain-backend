const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  //res.send("this is working");
  res.send("Success");
});

// signin route
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// register route
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//profile/:userID route
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

//image route
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

// to listen at port 3000
app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
