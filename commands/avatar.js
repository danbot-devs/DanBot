const Discord = require("discord.js")
exports.run = (client, message, args, level) => {
  var sender = {
    user: message.author,
    member: message.member
}
var member = message.mentions.members.first() || message.guild.members.get(args[1]);
if (!member) {
    var embed = new Discord.RichEmbed()
        .setAuthor(`${sender.user.tag}'s avatar`)
        .setImage(message.author.displayAvatarURL)
        .setColor('GOLD')
    message.channel.send(embed);
} else {
    var embed = new Discord.RichEmbed()
        .setAuthor(`${member.user.tag}'s avatar`)
        .setImage(member.user.displayAvatarURL)
        .setColor('GOLD')
    message.channel.send(embed);
}
return;
};
