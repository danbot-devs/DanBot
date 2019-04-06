const Discord = require('discord.js');
const sql = require("sqlite");
sql.open("./SQL/settings/guildsettings.sqlite");
module.exports = (client, guild) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [guild.id, "!", 1, "disabled", "none", "disabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (guildId TEXT, prefix TEXT, casenumber INTEGER, autoroleenabled TEXT, roletogive TEXT, logsenabled TEXT, logschannel TEXT, automoderation TEXT, wlchannel TEXT, wlsystem TEXT, welcomemessage TEXT, leavemessage TEXT, dmmessage TEXT, slowmode TEXT, slowmodetime INTEGER, invitelinkprotection TEXT, websitelinkprotection TEXT, dupcharactersprotection TEXT, antijoin TEXT, modonlycommands TEXT, botlock TEXT, botlockchannel TEXT, levelsystem TEXT)").then(() => {
          sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [guild.id, "!", 1, "disabled", "none", "disabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
      })
    })

    client.channels.get("544290801216126976").send(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
    
    let Servericon = guild.iconURL;
    let guildEmbed = new Discord.RichEmbed()
    .setTitle("New Server!")
    .setColor("#53f23e")
    .setThumbnail(Servericon)
    .addField("__**Name:**__", `${guild.name}`)
    .addField("__**Owner:**__", `${guild.owner}`)
    .addField("__**Members:**__", `${guild.memberCount}`)
    .addField("__**Total Members:**__", `${client.guilds.reduce((p, c) => p + c.memberCount, 0)}`)
    .addField("__**Total Guilds:**__", `${client.guilds.size}`)
    .setFooter(`The Guilds ID: ${guild.id}`)
    .setTimestamp();
    client.channels.get("536398920348073994").send(guildEmbed);

    
  };