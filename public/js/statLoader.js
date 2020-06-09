const commandCount = document.getElementById("app-stats-command-count");
const jokeCount = document.getElementById("app-stats-joke-count");
const musicTime = document.getElementById("app-stats-music-time");
// const lastJoke = document.getElementById("app-stats-last-joke");
// const lastSound = document.getElementById("app-stats-last-sound");
const pollCount = document.getElementById("app-stats-poll-count");
// const voteCount = document.getElementById("app-stats-vote-count");
// const lastPoll = document.getElementById("app-stats-last-poll");

fetch("/discordBot/appData")
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    const appData = json;
    console.log(json);

    commandCount.innerText = appData.commandCount;

    jokeCount.innerText = appData.jokeStats.jokesTold;
    // lastJoke.innerText = appData.jokeStats.lastJokeTold;

    musicTime.innerText =
      appData.soundStats.musicListenTime / 1000 + " seconds";
    // lastSound.innerText = appData.soundStats.lastSoundPlayed;

    pollCount.innerText = appData.pollStats.pollsTaken;
    // voteCount.innerText = appData.pollStats.pollVotes;
    // lastPoll.innerText = appData.pollStats.lastPollQuestion;
  });
