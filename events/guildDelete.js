const Discord = require('discord.js')
const sql = require("sqlite");
sql.open("./SQL/settings/guildsettings.sqlite");
module.exports = (client, guild) => {
    client.channels.get("544290801216126976").send(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);

    let Servericon = guild.iconURL;
    let guildEmbed = new Discord.RichEmbed()
    .setTitle("Server Leave :(")
    .setColor("#ff0000")
    .setThumbnail(Servericon)
    .addField("__**Name:**__", `${guild.name}`)
    .addField("__**Owner:**__", `${guild.owner}`)
    .addField("__**Members:**__", `${guild.memberCount}`)
    .addField("__**Total Members:**__", `${client.guilds.reduce((p, c) => p + c.memberCount, 0)}`)
    .addField("__**Total Guilds:**__", `${client.guilds.size}`)
    .setFooter(`The Guilds ID: ${guild.id}`)
    .setTimestamp();
    client.channels.get("536398920348073994").send(guildEmbed);

    sql.run(`DELETE FROM scores WHERE guildId = ${guild.id}`)
  };