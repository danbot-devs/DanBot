const Discord = require('discord.js');
exports.run = (client, message) => {
        const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setThumbnail(message.author.iconURL)
        .addField('**Donators**', `Danielpmc - 4.00$`, true)
        .setColor(6583245);
          message.channel.send({embed})
        .catch(console.error);
};