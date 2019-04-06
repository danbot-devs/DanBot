const fs = require("fs");
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./SQL/messageleaderboard/msg.sqlite');
  const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
  const embed = new Discord.RichEmbed()
    .addField("Message Leaderboard", "Top 10 Users")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0x00AE86);
 
  for(const data of top10) {
    embed.addField(client.users.get(data.user).tag, `${data.points} messages`);
  }
  return message.channel.send({embed});
  }