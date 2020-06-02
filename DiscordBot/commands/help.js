const bot = require("./../client");

module.exports = {
  name: "help",
  description: "Display commands",
  execute(msg, args) {
    const commands = bot.getInstance().commands;
    let output = "\n\nList of Commands\n\n";
    for (command of commands) {
      output +=
        "\t" + "!" + command[1].name + ": " + command[1].description + "\n";
    }
    output += "\n";
    msg.reply(output);
  },
};
