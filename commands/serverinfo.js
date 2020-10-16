const Discord = require("discord.js");
exports.run = (client, message, args) => {
   const role = message.guild.roles.size;
   const online = client.guilds.reduce(m => m.presence.status === 'online').size
   const idle = message.guild.members.filter(m => m.presence.status === `idle`).size
   const dnd = message.guild.members.filter(m => m.presence.status === 'dnd').size 
   const offline = message.guild.members.filter(m => m.presence.status === 'offline').size 
   
   const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
      const embed = new Discord.RichEmbed()
     .setAuthor(message.guild.name, message.guild.iconURL)
     .setColor(0x00A2E8)
      .setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
      .addField('Member Count', `${message.guild.memberCount}`, true)
      .addField('Online', `${online}`)
      .addField('Idle', `${idle}`)
      .addField('DND', `${dnd}`)
      .addField('Offline', `${offline}`)
      .addField('Server Region', message.guild.region)
      .addField('Created At', message.guild.createdAt.toLocaleString(), true)
      .addField("Verification Level: ", `${verificationLevels[message.guild.verificationLevel]}`)
      .addField('Voice Channels' , `${message.guild.channels.filter(chan => chan.type === 'voice').size}`)
      .addField('Text Channels' , `${message.guild.channels.filter(chan => chan.type === 'text').size}`, true)
      .addField('Roles', role, true)
      message.channel.send({embed}) 
}