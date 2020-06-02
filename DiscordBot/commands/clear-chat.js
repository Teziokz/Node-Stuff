module.exports = {
  name: "clearchat",
  description: "Clear all chat (CANNOT BE UNDONE!)",
  execute(msg, args) {
    async function clear() {
      msg.delete();
      await msg.channel.messages.fetch().then((messages) => {
        for (message of messages) {
          message[1].delete();
        }
      });
    }
    clear();
  },
};
