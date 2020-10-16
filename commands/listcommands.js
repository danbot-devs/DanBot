const fs = require('fs');
exports.run = (client, message, guild) => {

    fs.readdir("./guildcommands/" + message.guild.id + '/', (err, files) => {
        if (err) return message.channel.send(err);

        message.channel.send(files)
    })

}