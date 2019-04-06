const Discord = require("discord.js");
exports.run = async (client, message, args) => {
   if (message.author.id == "137624084572798976") {
    var gametoset = args.join(' ');
    if (!gametoset) gametoset = null;
    client.user.setActivity(gametoset);
    message.reply("The new game has been set!");
    } else {
      message.reply("Only my owner can use this command");
    }
}