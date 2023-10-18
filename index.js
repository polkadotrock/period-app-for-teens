const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require("cors");
const routes = require('./routes');

const app = express();

app.use(cors()); // use cors to allow our frontend to make requests to our backend from any origin

dotenv.config({ path: './config/config.env' }); // use this when the .env file is in the config folder to load environmental values
// use dotenv.config(); when the .env file is in the root directory

const PORT = process.env.PORT; // use the port defined in the .env file

app.set('view engine', 'ejs'); // use ejs as the view engine
app.use(express.urlencoded({ extended: false })); // bodyparser to extra data from forms
app.use(express.static('public')); // use public folder
app.use(morgan('dev')); // user morgan to log requests

app.get("/", (req, res) => {
  res.render("dashboard.ejs");
}); // render the dashboard.ejs file when the user visits the root route

app.use('/', routes); // Use the routes defined in routes.js

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
