const joke = require("./../../Jokes/jokes");

module.exports = {
  name: "joke",
  description: "Tell a joke!",
  execute(msg, args) {
    joke.getJoke().then(jokeText => {
      msg.reply(jokeText);
    });
  }
};
