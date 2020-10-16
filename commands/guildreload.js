const fs = require("fs");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No permission!");
      try {
    fs.readdir("./guildcommands/" + message.guild.id + "/", (err, files) => {
        if (err) return console.error(err);
        message.channel.send(`Reloaded \`${files.length}\` commands!`)
        files.forEach(file => {
             delete require.cache[require.resolve(`./${file}`)];
        });
    });
  } catch (err) {
        return;
      }
};