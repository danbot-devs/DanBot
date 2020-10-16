const Discord = require("discord.js");
exports.run = (client, message, args) => {
    let roletocheck = args.join(" ")
    let role = client.guilds.get(message.guild.id).roles.find('name', roletocheck);
    if (!role) return message.channel.send("Role wasnt found in the guild.")
      const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .addField('Role name', `${role.name}`, true)
      .addField('Role ID', `${role.id}`, true)
      .addField('Created At', role.createdAt.toDateString())
      .addField("Mentionable: ", role.mentionable ? 'Yes' : 'No', true)
      .addField("Permissions: ", role.permissions)
      message.channel.send({embed}) 
}