const client = require("../client");
const pollData = {
  isInstantiated: false,
  initialUserId: "",
  channel: "",
  users: [],
  question: "",
  options: [],
  votes: {},
  usersVoted: [],
  time: 30000,
};
let pollTimer;

//TODO have multiple polls for each user??
module.exports = {
  name: "poll",
  description: "Create a poll",
  execute(msg, args) {
    if (pollData.initialUserId === "") {
      pollData.initialUserId = msg.author.id;
      pollData.channel = msg.channel;
    } else if (msg.author.id !== pollData.initialUserId) {
      msg.reply("A poll is already in progress");
      return;
    }

    bot = client.getInstance();
    if (args.length <= 0) {
      initialiseData(msg, bot);
    } else {
      /**
       * Deal with secondary argument
       */
      switch (args[0]) {
        case "start": // Start the Poll
          startPoll(msg);
          break;
        case "display": // Show current Poll data
          if (pollData.isInstantiated) {
            displayPollData(msg);
          } else {
            msg.reply("No poll detected");
          }
          break;
        case "clear": // Reset the poll
          resetPoll();
          break;
        case "edit": //Edit poll
          if (args.length <= 1) {
            pollData.isInstantiated = false;
            initialiseData(msg, bot);
          } else {
            editPoll(msg, args[1]);
          }
          break;
      }
    }
  },
};

function startPoll(msg) {
  // Add all users that can vote
  for (member of msg.channel.members) {
    if (member[1].user.username !== "Harry's-discord-bot") {
      pollData.users.push(member[1].user.id);
    }
  }

  bot = client.getInstance();
  bot.on("message", handleVote);
  pollData.channel.send(
    "Poll Started\n\nQuestion: " +
      pollData.question +
      "\nOptions: " +
      formatOptions()
  );

  pollTimer = setTimeout(() => {
    bot.off("message", handleVote);
    displayResults(msg);
  }, pollData.time);
}

function handleVote(msg) {
  //TODO get the bot name from bot.getInstance()
  if (msg.author.username !== "Harry's-discord-bot") {
    answer = msg.content.toLowerCase();
    if (pollData.options.includes(answer)) {
      if (pollData.users.includes(msg.author.id)) {
        let vote = {};

        pollData.votes[msg.author.id] = answer;
        msg.reply("Vote recieved");

        // update user status
        if (!pollData.usersVoted.includes(msg.author.id)) {
          pollData.usersVoted.push(msg.author.id);
        }

        // Check to see if all users have voted
        if (pollData.usersVoted.length === pollData.users.length) {
          clearTimeout(pollTimer);
          bot.off("message", handleVote);
          pollData.channel.send("All users voted");
          displayResults(msg);
        }
      } else {
        msg.reply("You are not part of this poll");
      }
    }
  }
}

function displayResults(msg) {
  // Set up for tally
  let results = "";
  let tally = {};
  for (option of pollData.options) {
    tally[option] = 0;
  }
  console.log(tally);

  // Count all votes
  Object.keys(pollData.votes).forEach((key, index) => {
    console.log(pollData.votes[key]);
    tally[pollData.votes[key]]++;
  });

  for (option of pollData.options) {
    results += "\t\t" + option + ":\t" + tally[option] + "\n";
  }
  pollData.channel.send("\nPoll Ended\n\nResults\n" + results);
  resetPoll();
}

function initialiseData(msg, bot) {
  if (!pollData.isInstantiated) {
    // Get Question
    msg.reply("Please type your poll question");
    bot.on("message", getQuestionFromUser);
  } else {
    msg.reply("Poll data is already instantiated");
  }
}

function getQuestionFromUser(msg) {
  console.log("Recieved question");
  if (msg.author.id === pollData.initialUserId) {
    pollData.question = msg.content;
    client.getInstance().removeListener("message", getQuestionFromUser);

    if (!pollData.isInstantiated) {
      client.getInstance().on("message", getOptionsFromUser);
      msg.reply("Please enter your options (Seperated by a comma)");
    } else {
      msg.reply("Question has been set to " + pollData.question);
    }
  }
}

function getOptionsFromUser(msg) {
  if (msg.author.id === pollData.initialUserId) {
    pollData.options = msg.content.split(/ *, */);
    client.getInstance().removeListener("message", getOptionsFromUser);

    if (!pollData.isInstantiated) {
      client.getInstance().on("message", getTimeFromUser);
      msg.reply(
        "Please enter the ammount of time in seconds the poll should be active\n\t Type 'none' for no time limit\n\t Type '0' for default time (30 seconds)"
      );
    } else {
      msg.reply("Options have been set to " + formatOptions());
    }
  }
}

function getTimeFromUser(msg) {
  if (msg.author.id === pollData.initialUserId) {
    switch (msg.content) {
      case "none":
        pollData.time = 0;
        break;
      case "0":
        break;
      default:
        if (!isNaN(msg.content)) {
          pollData.time = msg.content * 1000;
          break;
        }
    }
    client.getInstance().removeListener("message", getTimeFromUser);

    if (!pollData.isInstantiated) {
      displayPollData(msg);
      pollData.isInstantiated = true;
    } else {
      msg.reply("Time has been set to " + formatTime());
    }
  }
}

function resetPoll() {
  pollData.isInstantiated = false;
  pollData.initialUserId = "";
  pollData.question = "";
  pollData.options = [];
  pollData.votes = {};
  pollData.time = 30000;
}

function editPoll(msg, args) {
  switch (args.toLowerCase()) {
    case "question":
      msg.reply("Please type your poll question");
      bot.on("message", getQuestionFromUser);
      break;
    case "options":
      msg.reply("Please enter your options (Seperated by a comma)");
      bot.on("message", getOptionsFromUser);
      break;
    case "time":
      msg.reply(
        "Please enter the ammount of time in seconds the poll should be active\n\t Type 'none' for no time limit\n\t Type '0' for default time (30 seconds)"
      );
      bot.on("message", getTimeFromUser);
      break;
    default:
      msg.reply(
        "Please enter valie argument ['question' | 'options' | 'time']"
      );
  }
}

/**
 * Display Methods
 */
function formatOptions() {
  let options = "";
  for (option of pollData.options) {
    options += "\n\t\t" + option;
  }

  return options;
}

function formatTime() {
  if (pollData.time === 0) {
    return "No Limit";
  } else {
    return pollData.time / 1000;
  }
}

function displayPollData(msg) {
  msg.reply(
    `\nPollData: \n\tQuestion: ${
      pollData.question
    }\n\tOptions: ${formatOptions()}\n\t Time Limit: ${formatTime()}`
  );
}
