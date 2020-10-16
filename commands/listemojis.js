const Discord = require('discord.js');
exports.run = async(client, message) => {
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    if (!emojiList) return message.reply("There are no emoji's in this server!")
    let searchMessage = await message.channel.send('Loading Emojis....');
    const embed = new Discord.RichEmbed()
    .setTitle('Server emoji list.')
    .setColor("RANDOM")
    .addField('__**Server Emoji List**__', emojiList)
    searchMessage.edit({embed});
    //message.channel.send(emojiList);
}