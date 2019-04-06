const fs = require("fs");
exports.run = (client, message, args) => {
      if (message.author.id !== "137624084572798976") return message.channel.send("Only my owner can use this command");
      try {
    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        message.channel.send(`Refreshed \`${files.length}\` commands successfully!`)
        client.channels.get("544290801216126976").send(`Refreshed ${files.length} commands`)
        files.forEach(file => {
             delete require.cache[require.resolve(`./${file}`)];
        });
    });
  } catch (err) {
        return;
      }
};