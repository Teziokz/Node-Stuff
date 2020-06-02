const fetch = require("node-fetch");

module.exports = {
  getJoke() {
    return fetch("https://icanhazdadjoke.com", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        return json.joke;
      });
  }
};
