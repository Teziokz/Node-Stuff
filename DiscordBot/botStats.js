const fs = require("fs").promises;

module.exports = {
  incrementCommandCount() {
    getFile().then((data) => {
      json = JSON.parse(data);
      json["commandCount"]++;
      writeToFile(json);
    });
  },

  updateJokeStats(lastJoke) {
    getFile().then((data) => {
      json = JSON.parse(data);
      json["commandCount"]++;
      json.jokeStats["jokesTold"]++;
      json.jokeStats["lastJokeTold"] = lastJoke;
      writeToFile(json);
    });
  },

  updatePollStats(votes, lastQuestion) {
    getFile().then((data) => {
      json = JSON.parse(data);
      json["commandCount"]++;
      json.pollStats["pollsTaken"]++;
      json.pollStats["pollVotes"] += pollVotes;
      json.pollStats["lastPollQuestion"] = lastQuestion;
      writeToFile(json);
    });
  },

  updateSoundStats(listenTime, lastSound) {
    getFile().then((data) => {
      json = JSON.parse(data);
      json["commandCount"]++;
      json.soundStats["musicListenTime"] += listenTime;
      json.soundStats["lastSoundPlayed"] = lastSound;
      writeToFile(json);
    });
  },

  get() {
    return getFile();
  },
};

async function getFile() {
  return await fs.readFile("DiscordBot/applicationData.json", (error, data) => {
    if (error) {
      console.log(error);
    }
  });
}

function writeToFile(data) {
  fs.writeFile(
    "DiscordBot/applicationData.json",
    JSON.stringify(data),
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
}

function increment(stat) {
  getFile().then((data) => {
    json = JSON.parse(data);
    json[stat] = json[stat] + 1;
    console.log("incrementing " + stat);
    console.log(json[stat]);
    writeToFile(json);
  });
}
function incrementByValue(stat, value) {
  getFile().then((data) => {
    json = JSON.parse(data);
    json[stat] = json[stat] + value;
    writeToFile(json);
  });
}

function setValue(stat, value) {
  getFile().then((data) => {
    json = JSON.parse(data);
    json[stat] = value;
    writeToFile(json);
  });
}
