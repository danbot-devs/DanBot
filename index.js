const Discord = require("discord.js");
const client = new Discord.Client()
const fs = require("fs");
const sql = require("sqlite");
sql.open("./SQL/settings/guildsettings.sqlite");
const config = require("../config.json");
//Website and Invite Checks
const invitecheck = ["discord.gg", "discord.me", "discord.io/", "discordapp.com/invite"]
const weblinkcheck = ["http", "www.", ".com", ".net", ".org", ".ca", ".co.uk", ".xyz", ".ga", ".tk"]
//warnings, errors, reconnecting stuffs
  client.on('warn', err => client.channels.get("544290801216126976").send('[WARNING]', err));
  client.on('error', err => client.channels.get("544290801216126976").send('[ERROR]', err));
  client.on('reconnecting', () => client.channels.get("544290801216126976").send('Got disconnected from discord : Reconnecting...'));
//Event Handler
  fs.readdir('./events/', (err, files) => {
    files = files.filter(f => f.endsWith('.js'));
    files.forEach(f => {
        const event = require(`./events/${f}`);
        client.on(f.split('.')[0], event.bind(null, client));
        delete require.cache[require.resolve(`./events/${f}`)];
    });
  });
  
  client.on("guildMemberAdd", (member) => {
    if (!member.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
      if (!member.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
      if (!member.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;
    sql.get(`SELECT * FROM scores WHERE guildId ="${member.guild.id}"`).then(row => {
      if (row.antijoin === "enabled") {
        member.user.send("Anti-join has been enabled in " + member.guild.name + " you have been kicked automatically.")
        member.guild.member(member.user.id).kick().catch(console.error);
      } else {
        if (!member.guild.member(client.user).hasPermission('MANAGE_ROLES')) return;
          let autoRole = client.guilds.get(member.guild.id).roles.find(r => r.name == row.roletogive);
          if (!autoRole) return
          member.guild.member(member.user.id).addRole(autoRole).catch(console.error);
      }
      })
  });
  
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
    if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
    if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
    if (!message.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;
  
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
      if (!row) return;
  
      const prefix = row.prefix
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    if (message.content.startsWith("<@" + client.user.id +">") || message.content.startsWith("<@!" + client.user.id +">")) {
      message.reply("Guild prefix is `" + row.prefix + "`.")
    }
  
    if (invitecheck.some(word => message.content.toLowerCase().includes(word))) {
    if (message.content.includes(row.prefix)) return
    if (row.automoderation === "disabled") return;
    if (row.invitelinkprotection === "disabled") return;
    if (message.member.hasPermission("KICK_MEMBERS")) return;
    message.delete()
    let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
    const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .setTitle("Action: Auto Moderation")
      .addField("Moderator", client.user.username + " (ID: " + client.user.id + ")")
      .addField("User", message.author.username + " (ID: " + message.author.id + ")")
      .addField("In channel", message.channel.name, true)
      .addField("Reason", "Invite Link", true)
      .addField("Invite link", message.cleanContent)
      .setFooter("Time used: " + message.createdAt.toDateString())
      if (!modlog) return;
      if (row.logsenabled === "disabled") return;
      client.channels.get(modlog.id).send({embed});
      message.reply(" not allowed to post invite links. This is not allowed here!").then((response) => {
        response.delete(6000);
        });
  }
  
    if (weblinkcheck.some(word2 => message.content.toLowerCase().includes(word2))) {
    if (message.content.includes(row.prefix)) return
    if (row.automoderation === "disabled") return;
    if (row.websitelinkprotection === "disabled") return;
    if (message.member.hasPermission("KICK_MEMBERS")) return;
    message.delete()
    let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
    const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .setTitle("Action: Auto Moderation")
      .addField("Moderator", client.user.username + " (ID: " + client.user.id + ")")
      .addField("User", message.author.username + " (ID: " + message.author.id + ")")
      .addField("In channel", message.channel.name, true)
      .addField("Reason", "Website Link", true)
      .addField("Website link", message.cleanContent)
      .setFooter("Time used: " + message.createdAt.toDateString())
      if (!modlog) return;
      if (row.logsenabled === "disabled") return;
      client.channels.get(modlog.id).send({embed});
      message.reply(" not allowed to post website links. This is not allowed here!").then((response) => {
        response.delete(6000);
        });
    }
  
     if (message.content.includes('')) {
      if (message.content.includes(row.prefix)) return
      if (row.automoderation === "disabled") return;
      if (row.dupcharactersprotection === "disabled") return;
        if (message.member.hasPermission("KICK_MEMBERS")) return;
        const check1 = args.join(" ")
        if (check1.includes('.')) return;
        var hasDuplicates = /([a-zA-Z])\1+$/;
        const result = hasDuplicates.test(check1)
        if (result === true) { 
          message.delete()
          let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
          const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Action: Auto Moderation")
            .addField("Moderator", client.user.username + " (ID: " + client.user.id + ")")
            .addField("User", message.author.username + " (ID: " + message.author.id + ")")
            .addField("In channel", message.channel.name, true)
            .addField("Reason", "Duplicated Characters", true)
            .addField("Message Content", message.cleanContent)
            .setFooter("Time used: " + message.createdAt.toDateString())
            if (!modlog) return;
            if (row.logsenabled === "disabled") return;
            client.channels.get(modlog.id).send({embed});
            let user = message.guild.member(message.mentions.users.first())
          message.reply(" message contains duplicated characters. This is not allowed here!").then((response) => {
            response.delete(6000);
            });
      } 
    }
  
    if (message.content.includes('')) {
        if (message.member.hasPermission("KICK_MEMBERS")) return;
        if (row.slowmode === "disabled") return;
        if (row.slowmode === "enabled") {
          if(checkCooldown(message.author.id)) {
            message.delete();
           }
        cooldownUsers.push(message.author.id);
        removeCooldown(message.author.id, row.slowmodetime);
        } 
       } 
      })
  });
client.login(config.token);

process.on('SIGINT', () => {
  client.channels.get("544290801216126976").send("<@137624084572798976> :sad: i guess you wanted me to SIGINT well here you go :sad:")
  client.destroy()
  process.exit(0)
})