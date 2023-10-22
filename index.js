const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require("cors");
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // store session to db
const methodOverride = require('method-override'); // for put and delete

const connectDB = require('./config/db');

const app = express();

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save if nothing is modified
  saveUninitialized: true, // don't create a session until something is stored
  cookie : {
    maxAge: 1000* 60 * 60 *24 * 7,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    client: mongoose.connection.getClient()
    })
}));

app.use(cors()); // use cors to allow our frontend to make requests to our backend from any origin

dotenv.config({ path: './config/config.env' }); // use this when the .env file is in the config folder to load environmental values
// use dotenv.config(); when the .env file is in the root directory

const PORT = process.env.PORT; // use the port defined in the .env file

app.set('view engine', 'ejs'); // use ejs as the view engine
app.use(express.urlencoded({ extended: false })); // bodyparser to extra data from forms
app.use(express.static('public')); // use public folder
app.use(morgan('dev')); // user morgan to log requests

// method override for PUT and DELETE
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// app.get("/", (req, res) => {
//   res.render("dashboard-guest.ejs");
// });

app.use('/', routes); // Use the routes defined in routes.js

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
})