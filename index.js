const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");

const app = express();

app.use(cors());

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

// passage
// temp - will edit
const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post("/auth", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userID);
      const identifier = email ? email : phone;

      res.json({
        authStatus: "success",
        identifier,
      });
    }
  } catch (e) {
    // authentication failed
    console.log(e);
    res.json({
      authStatus: "failure",
    });
  }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));