const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

// load config !important
dotenv.config({ path: './config/config.env'});

// export port
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

// bodyparser to extra data from forms
app.use(express.urlencoded({ extended: false }));

// use public folder
app.use(express.static('public'));

// user morgan to log requests
app.use(morgan('dev'));

// routes
app.use('/', require('./routes/index'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));