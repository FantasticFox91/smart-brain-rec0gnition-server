const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require("./controlers/register.js");
const signin = require("./controlers/signin.js");
const profile = require("./controlers/profile.js");
const image = require("./controlers/image.js");


const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '15050904',
    database : 'smart-brain'
  }
});



const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send("This is working");
})

app.post('./controlers/signin', signin.handleSignin(db, bcrypt))
app.post('./controlers/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('./controlers/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('./controlers/image', (req, res) => { image.handleImage(req, res, db)})
app.post('./controlers/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})
