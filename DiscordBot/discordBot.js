module.exports = function(bot, TOKEN) {
  bot.login(TOKEN);

  bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on("message", msg => {
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
};
