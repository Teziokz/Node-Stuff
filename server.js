// server.js
// where your node app starts
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const discord = require("discord.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

/**
 * Discord Bot Setup
 */
const TOKEN = process.env.TOKEN;
const bot = new discord.Client();
bot.commands = new discord.Collection();
const botCommands = require("./DiscordBot/commands");
Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

require("./DiscordBot/discordBot")(bot, TOKEN);

/**
 * Main Web app setup
 */
app.use(function(req, res, next) {
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

app.get("/data", (request, response) => {
  response.send("Test Data");
});

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
