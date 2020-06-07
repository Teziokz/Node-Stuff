const fs = require("fs");

module.exports = {
  name: "history",
  description: "Display command history",
  execute(msg, args) {
    console.log(args);
    if (args.length < 1) {
      fs.readFile("DiscordBot/commandHistory.json", (error, data) => {
        if (error) {
          console.log(error);
          msg.reply("There was an error reading your history");
        } else {
          const jsonData = JSON.parse(data);
          const userId = msg.author.id;
          if (jsonData.hasOwnProperty(userId) && jsonData[userId].length > 0) {
            let output = "\nCommand History:";
            for (item of jsonData[userId]) {
              output += `\n\t!${item}`;
            }
            msg.reply(output);
          } else {
            msg.reply("No History Found");
          }
        }
      });
    } else if (args[0] == "clear") {
      fs.readFile("DiscordBot/commandHistory.json", (error, data) => {
        if (error) {
          console.log(error);
          msg.reply("There was an error reading your history");
        } else {
          const jsonData = JSON.parse(data);
          const userId = msg.author.id;
          if (jsonData.hasOwnProperty(userId)) {
            jsonData[userId] = [];

            result = JSON.stringify(jsonData);
            fs.writeFile("DiscordBot/commandHistory.json", result, (error) => {
              if (error) {
                console.log(error);
              } else {
                msg.reply("Command history removed succesfully");
              }
            });
          } else {
            msg.reply("No History to remove");
          }
        }
      });
    }
  },
};
