const fs = require('fs');
exports.run = (client, message, guild) => {
    var args = message.content.split(" ");
    if (args[1] == null) {
        return message.channel.send("Please specify the command to **delete**");
    }
    var data = {
        aliases: [],
        name: args[1]
    }

    const path = "./guildcommands/" + message.guild.id + '/' + data.name.toLowerCase() + '.js'
    try {
        if (fs.existsSync(path)) {
            client.channels.get('588106425197264908').send('`' + message.author.username + '` **requested a download of** `' + data.name.toLowerCase() + '` in `' + message.guild.name + '```'), message.channel.send("Here you go!", { files: ["./guildcommands/" + message.guild.id + '/' + data.name + '.js'] });
        }
      } catch(err) {
        message.channel.send('Command does not exist...');
      }
}