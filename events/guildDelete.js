const Discord = require('discord.js')
const sql = require("sqlite");
const fs = require("fs");
sql.open("./SQL/settings/guildsettings.sqlite");
module.exports = (client, guild) => {

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
    client.channels.get("595729615126003744").send(guildEmbed);

    sql.run(`DELETE FROM scores WHERE guildId = ${guild.id}`)

    if (!fs.existsSync("./guildcommands/" + guild.id)){
      fs.rmdirSync("./guildcommands/" + guild.id);
    }
  };