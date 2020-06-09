const joke = require("./../../Jokes/jokes");
const stats = require("./../botStats");

module.exports = {
  name: "joke",
  description: "Tell a joke!",
  execute(msg, args) {
    joke.getJoke().then((jokeText) => {
      msg.reply(jokeText);
      stats.updateJokeStats(jokeText);
    });
  },
};
