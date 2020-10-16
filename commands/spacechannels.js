
const Discord = require("discord.js")

exports.run = async(client, message, args) =>{
if (message.member.hasPermission("ADMINISTRATOR")) {
message.guild.channels.forEach(c =>{
 c.setName(c.name.replace(/-/g, " "))
})
};
};







