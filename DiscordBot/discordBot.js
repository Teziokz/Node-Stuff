const fs = require("fs");
const client = require("./client");
const botStats = require("./botStats");

module.exports = function (TOKEN) {
  const bot = client.getInstance();
  bot.login(TOKEN);

  bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on("message", (msg) => {
    storeMessage(msg);
    if (msg.content[0] === "!") {
      handleCommand(msg);
    }
  });

  /**
   * Helper Functions
   */
  function handleCommand(msg) {
    msg.content = msg.content.substring(1);
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    storeCommand(msg.author.id, msg.content);
    storeStats(command);

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply("there was an error trying to execute that command!");
    }
  }

  function storeMessage(msg) {
    const message = {
      id: msg.id,
      content: msg.content,
      author: {
        username: msg.author.username,
        id: msg.author.id,
      },
      timeCreated: msg.createdAt,
      lastMessageId: msg.author.lastMessageID,
    };

    fs.readFile("DiscordBot/messageData.json", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        const jsonData = JSON.parse(data);
        jsonData.push(message);
        result = JSON.stringify(jsonData);
        fs.writeFile("DiscordBot/messageData.json", result, (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  }

  function storeCommand(userId, command) {
    fs.readFile("DiscordBot/commandHistory.json", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        const jsonData = JSON.parse(data);
        if (jsonData.hasOwnProperty(userId)) {
          jsonData[userId].push(command);
        } else {
          jsonData[userId] = [command];
        }

        result = JSON.stringify(jsonData);
        fs.writeFile("DiscordBot/commandHistory.json", result, (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  }

  function storeStats(command) {
    blacklist = ["sound", "poll", "joke"];

    if (!blacklist.includes(command)) {
      botStats.incrementCommandCount();
    }
  }
};
