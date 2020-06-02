const fs = require("fs");
const client = require("./client");

module.exports = function (TOKEN) {
  const bot = client.getInstance();
  bot.login(TOKEN);

  bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on("message", (msg) => {
    writeToFile(msg);
    if (msg.content[0] === "!") {
      handleCommand(msg);
    }
  });

  /**
   * Helper Functions
   */
  function handleCommand(msg) {
    msg.content = msg.content.substring(1);
    console.log(msg.content);
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply("there was an error trying to execute that command!");
    }
  }

  function writeToFile(msg) {
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
        console.log(jsonData);
        result = JSON.stringify(jsonData);
        fs.writeFile("DiscordBot/messageData.json", result, (error) => {
          console.log(error);
        });
      }
    });
  }
};
