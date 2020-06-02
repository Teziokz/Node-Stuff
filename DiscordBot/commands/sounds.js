const ytdl = require("ytdl-core");

module.exports = {
  name: "sound",
  description: "Play audio from Youtube",
  data: {
    connection: null,
    queue: [],
  },
  execute(msg, args) {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      msg.reply(
        "Please enter a voice channel before issuing the 'sound' command"
      );
    } else if (!args[0]) {
      msg.reply(
        "Please enter arguments, type !help sound for more information"
      );
    } else {
      switch (args[0].toLowerCase()) {
        case "help":
          help(msg);
          break;
        case "play":
          play(msg, voiceChannel, args[1]).then((result) => {
            this.connection = result;
          });
          break;
        case "stop":
          stop(msg, this.connection);
          break;
        case "volume":
          if (args[1]) {
            volume(msg, this.connection, args[1].toLowerCase());
          } else {
            msg.reply("Please enter a volume type ('low', 'med', 'high')");
          }
          break;
        case "queue":
          if (args[1]) {
            if (args[1] === "view") {
              viewQueue(msg);
            } else {
              queue(this.data.queue, msg, args[1]);
            }
          } else {
            msg.reply("Please enter the url you want to queue");
          }
      }
    }
  },
};

async function play(msg, voiceChannel, url) {
  if (!url) {
    msg.reply("No address found");
  } else {
    let hasError = false;
    let voiceConnection;
    return voiceChannel
      .join()
      .then((connection) => {
        voiceConnection = connection;
        connection
          .play(
            ytdl(url, {
              filter: "audioonly",
            })
          )
          .on("error", (error) => {
            console.error(error);
            msg.reply(
              "There was an playback error, please make sure your Youtube url is correct"
            );
            hasError = true;
          });
      })
      .then(() => {
        if (!hasError) {
          ytdl.getBasicInfo(url).then((result) => {
            msg.reply('Playing "' + result.title + '"');
          });
        }
      })
      .then(() => {
        return voiceConnection;
      });
  }
}

function stop(msg, connection) {
  const dispatcher = getDispatcher(msg, connection);
  if (dispatcher) {
    dispatcher.end();
    msg.reply("Sound Stopped");
  }
}

function volume(msg, connection, args) {
  const dispatcher = getDispatcher(msg, connection);
  if (dispatcher) {
    switch (args) {
      case "low":
        dispatcher.setVolume(0.3);
        msg.reply("Setting volume to low");
        break;
      case "med":
        dispatcher.setVolume(0.6);
        msg.reply("Setting volume to medium");
        break;
      case "high":
        dispatcher.setVolume(1);
        msg.reply("Setting volume to high");
        break;
    }
  }
}

function help(msg) {
  msg.reply(
    "\nCommands:\n  play <url>\n  stop\n  volume <[high][meduim][low]>"
  );
}

function getDispatcher(msg, connection) {
  if (connection) {
    if (connection.dispatcher) {
      return connection.dispatcher;
    } else {
      msg.reply("No Sound Detected");
      return false;
    }
  } else {
    msg.reply("No voice connection detected");
    return false;
  }
}
