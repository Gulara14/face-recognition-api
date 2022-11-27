const express = require ("express");
const bcrypt = require ("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
    host : 'containers-us-west-125.railway.app',
    port : 7234,
    user : 'postgres',
    password : '2hXJ2aVqJUrwr9a0jucx',
    database : 'railway'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> { res.send("it is working") })
app.post("/signin", signin.handleSignin(db, bcrypt))
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })
app.put("/image", (req, res) => { image.handleImage(req, res, db) })
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
