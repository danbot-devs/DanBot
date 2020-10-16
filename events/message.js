const Discord = require("discord.js");
const fs = require("fs");
const sql = require("sqlite");
const sql2 = require("sqlite");
sql.open("./SQL/settings/guildsettings.sqlite");

const api = require("../API.js");

module.exports = async (client, message) => {
//    const SQLite = require("better-sqlite3");
//    const sql1 = new SQLite('./SQL/messageleaderboard/msg.sqlite');
//    client.getScore = sql1.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
//    client.setScore = sql1.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
//    if (message.author.bot) return;
//    let score;
//    if (message.guild) {
//      score = client.getScore.get(message.author.id, message.guild.id);
//      if (!score) {
//        score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0 }
//      }
//      score.points++;
//    }
//    client.setScore.run(score);
  
  


    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, "!", 1, "disabled", "none", "disabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS scores (guildId TEXT, prefix TEXT, casenumber INTEGER, autoroleenabled TEXT, roletogive TEXT, logsenabled TEXT, logschannel TEXT, automoderation TEXT, wlchannel TEXT, wlsystem TEXT, welcomemessage TEXT, leavemessage TEXT, dmmessage TEXT, slowmode TEXT, slowmodetime INTEGER, invitelinkprotection TEXT, websitelinkprotection TEXT, dupcharactersprotection TEXT, antijoin TEXT, modonlycommands TEXT, botlock TEXT, botlockchannel TEXT, levelsystem TEXT)").then(() => {
          sql.run("INSERT INTO scores (guildId, prefix, casenumber, autoroleenabled, roletogive, logsenabled, logschannel, automoderation, wlchannel, wlsystem, welcomemessage, leavemessage, dmmessage, slowmode, slowmodetime, invitelinkprotection, websitelinkprotection, dupcharactersprotection, antijoin, modonlycommands, botlock, botlockchannel, levelsystem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, "!", 1, "disabled", "none", "disabled", "logs", "disabled", "welcome", "disabled", "Hello %MENTION%, welcome to %GUILDNAME%.", "%NAME% has left the guild", "disabled", "disabled", 3, "disabled", "disabled", "disabled", "disabled", "disabled", "disabled", "bot-commands", "disabled"]);
      })
    })

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return message.channel.send('ERROR: THIS BOT DOES NOT WORK IN DIRECT MESSAGES. IF YOU THINK THIS IS A ERROR PLEASE CONTACT A DEV')
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        if (!row) return;
            if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
            if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;

             if (row.modonlycommands === "enabled") {
                if (!message.member.hasPermission("KICK_MEMBERS")) return;
                const prefix = row.prefix
                if (row.prefix === undefined) return prefix = "!"
                if (message.content.indexOf(prefix) !== 0) return;
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const commandargs = message.content.split(' ').slice(1).join(' ');
                const command = args.shift().toLowerCase();
                client.channels.get("588105811864059905").send(`[${message.guild.name}] [${message.guild.id}] [${message.author.username}] >> ${row.prefix}${command} ${commandargs}`);
    api.addLog({
        "log_type": "info",
        "log_message": "Command 8ball executed in " + message.guild.name + " by " + message.author.username,
        "log_date": Date.now(),
        "log_action": row.prefix + command + " Args: " + commandargs
    });
                    try {
                        let commandFile = require(`../commands/${command}.js`);
                        commandFile.run(client, message, args, Discord, fs, sql);
                    } catch (err) {
                        if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                            return;
                    }
                    }
              } else {
            const prefix = row.prefix
            if (row.prefix === undefined) return prefix = "!"
            if (message.content.indexOf(prefix) !== 0) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const commandargs = message.content.split(' ').slice(1).join(' ');
            const command = args.shift().toLowerCase();
            client.channels.get("588105811864059905").send(`[${message.guild.name}] [${message.guild.id}]  [${message.author.username}] >> ${row.prefix}${command} ${commandargs}`);
                try {
                    let commandFile = require(`../commands/${command}.js`);
                    commandFile.run(client, message, args, Discord, fs, sql);
                } catch (err) {
                        if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                            return;
                    }
                    }
            } 
          })
          
          if (message.author.bot) return;
          if (message.channel.type === 'dm') return message.channel.send('ERROR: THIS BOT DOES NOT WORK IN DIRECT MESSAGES. IF YOU THINK THIS IS A ERROR PLEASE CONTACT A DEV')
          sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
              if (!row) return;
                  if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
                  if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
      
                   if (row.modonlycommands === "enabled") {
                      if (!message.member.hasPermission("KICK_MEMBERS")) return;
                      const prefix = row.prefix
                      if (row.prefix === undefined) return prefix = "!"
                      if (message.content.indexOf(prefix) !== 0) return;
                      const args = message.content.slice(prefix.length).trim().split(/ +/g);
                      const commandargs = message.content.split(' ').slice(1).join(' ');
                      const command = args.shift().toLowerCase();
                      client.channels.get("588105811864059905").send(`[${message.guild.name}] [${message.author.username}] >> ${row.prefix}${command} ${commandargs}`);
                          try {
                              let commandFile = require(`../guildcommands/` + message.guild.id + `/${command}.js`);
                              commandFile.run(client, message, args);
                          } catch (err) {
                              if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                                  return;
                          }
                          }
                    } else {
                  const prefix = row.prefix
                  if (row.prefix === undefined) return prefix = "!"
                  if (message.content.indexOf(prefix) !== 0) return;
                  const args = message.content.slice(prefix.length).trim().split(/ +/g);
                  const commandargs = message.content.split(' ').slice(1).join(' ');
                  const command = args.shift().toLowerCase();
                  client.channels.get("588105811864059905").send(`[${message.guild.name}] [${message.author.username}] >> ${row.prefix}${command} ${commandargs}`);
                      try {
                          let commandFile = require(`../guildcommands/` + message.guild.id + `/${command}.js`);
                              commandFile.run(client, message, args);
                      } catch (err) {
                              if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                                  return;
                          }
                          }
                  } 
                })


                //MUSIC STUFF
                if (message.author.bot) return;
          if (message.channel.type === 'dm') return message.channel.send('ERROR: THIS BOT DOES NOT WORK IN DIRECT MESSAGES. IF YOU THINK THIS IS A ERROR PLEASE CONTACT A DEV')
          sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
              if (!row) return;
                  if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
                  if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
      
                   if (row.modonlycommands === "enabled") {
                      if (!message.member.hasPermission("KICK_MEMBERS")) return;
                      const prefix = row.prefix
                      if (row.prefix === undefined) return prefix = "!"
                      if (message.content.indexOf(prefix) !== 0) return;
                      const args = message.content.slice(prefix.length).trim().split(/ +/g);
                      const commandargs = message.content.split(' ').slice(1).join(' ');
                      const command = args.shift().toLowerCase();
                      client.channels.get("588105811864059905").send(`[${message.guild.name}] [${message.author.username}] >> ${row.prefix}${command} ${commandargs}`);
                          try {
                              let commandFile = require(`musiccommands/${command}.js`);
                              commandFile.run(client, message, args);
                          } catch (err) {
                              if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                                  return;
                          }
                          }
                    } else {
                  const prefix = row.prefix
                  if (row.prefix === undefined) return prefix = "!"
                  if (message.content.indexOf(prefix) !== 0) return;
                  const args = message.content.slice(prefix.length).trim().split(/ +/g);
                  const commandargs = message.content.split(' ').slice(1).join(' ');
                  const command = args.shift().toLowerCase();
                  client.channels.get("588105811864059905").send(`[${message.guild.name}] [${message.author.username}] >> ${row.prefix}${command} ${commandargs}`);
                      try {
                          let commandFile = require(`musiccommands/${command}.js`);
                              commandFile.run(client, message, args);
                      } catch (err) {
                              if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                                  return;
                          }
                          }
                  } 
                })
const fs = require('fs')
let nni = JSON.parse(fs.readFileSync("./datajsons/ctn.json"));
if(message.author.bot) return;
let cchannel = message.guild.channels.find(cc => cc.id === '533036066093924352')
if(message.channel !== cchannel) return;
if(message.content !== `${nni.nextnumber}`) {
    message.delete().catch();
    message.channel.send(`ERROR: Next number should be **${nni.nextnumber}**!`).then(x => x.delete(10000))
} else {
    nni.nextnumber ++;
    fs.writeFile(`./datajsons/ctn.json`, JSON.stringify(nni), (err) => {
        if(err) console.error(err)
    cchannel.setTopic(`This gives message points on DanBot | Next: **${nni.nextnumber}**`)
    })
    
}}