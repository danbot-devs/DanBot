const fs = require("fs");
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./SQL/messageleaderboard/msg.sqlite');
  const top10 = sql.prepare(`SELECT * FROM scores WHERE id = "${message.guild.id}" AND user ="${message.author.id}"`).then(row => {
    const embed = new Discord.RichEmbed()
    .addField("Messages", `Here is how many messages you have sent! \n ${row.points}`)
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0x00AE86);
    return message.channel.send(embed);
})
}