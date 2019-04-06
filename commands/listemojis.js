exports.run = (client, message) => {
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    if (!emojiList) return message.reply("There are no emoji's in this server!")
    message.channel.send(emojiList);
}