// server.js
// where your node app starts
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

/**
 * Main app setup
 */
const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

/**
 * Discord Bot Setup
 */
require("dotenv").config();
const TOKEN = process.env.TOKEN;
require("./DiscordBot/discordBot")(TOKEN);

/**
 * Middleware setup
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/discordBot/appData", (request, response) => {
  fs.readFile(__dirname + "/DiscordBot/applicationData.json", (data, error) => {
    if (error) {
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
