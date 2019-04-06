const Discord = require("discord.js");
exports.run = (client, message, args) => {
    const sexyrate = Math.floor(Math.random() * 100)
       const embed = new Discord.RichEmbed()
            .addField(":heart_decoration: Sexy Rate :heart_decoration: ", "I rate you a " + sexyrate + " out of 100!")
            .setThumbnail(message.author.displayAvatarURL)
       message.channel.send({embed})
}