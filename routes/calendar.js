const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

// Set up Google API credentials
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Google scopes
const scopes = ["https://www.googleapis.com/auth/calendar"];
const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// Define function for handling errors
function handleErrors(error, res, message) {
  console.error(error);
  res.status(500).send(message);
}

// Define the routes
router.get("/auth/google", (req, res) => {
  const client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI[0]
  );
  const googleAuthUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(googleAuthUrl);
});

router.get("/auth/google/callback", async (req, res) => {
  const client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI[0]
  );
  const { tokens } = await client.getToken(req.query.code);
  oAuth2Client.setCredentials(tokens);
  res.redirect("/events");
});

router.get("/events", async (req, res) => {
  try {
    // Retrieve the user's calendar events
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    // Render the events as a response
    res.render("events", { events: response.data.items });
  } catch (error) {
    // Handle errors
    handleErrors(error, res, "Error retrieving calendar events");
  }
});

router.post("/events", async (req, res) => {
  try {
    // Create a new event
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: req.body.summary,
        description: req.body.description,
        start: {
          dateTime: req.body.startDateTime,
          timeZone: req.body.timeZone,
        },
        end: {
          dateTime: req.body.endDateTime,
          timeZone: req.body.timeZone,
        },
      },
    });

    // Send the new event as a response
    res.redirect("/events");
  } catch (error) {
    // Handle errors
    handleErrors(error, res, "Error creating calendar event");
  }
});

module.exports = router;