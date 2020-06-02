const discord = require("discord.js");

module.exports = (function () {
  var instance;

  function createInstance() {
    const bot = new discord.Client();
    bot.commands = new discord.Collection();
    const botCommands = require("./commands");
    Object.keys(botCommands).map((key) => {
      bot.commands.set(botCommands[key].name, botCommands[key]);
    });
    return bot;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
