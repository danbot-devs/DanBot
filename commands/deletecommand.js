const fs = require('fs');
exports.run = (client, message, guild) => {
    var args = message.content.split(" ");
    if (args[1] == null) {
        return message.channel.send("Please specify the command to **delete**");
    }
    var data = {
        aliases: [],
        name: args[1].toLowerCase()
    }

    fs.unlink("./guildcommands/" + message.guild.id + '/' + data.name + '.js',function(err){
        if(err) return message.channel.send('Command does not exist...');
        client.channels.get('588106425197264908').send('`' + message.author.username + '` **deleted** `' + data.name + '` in `' + message.guild.name + '`.'), message.channel.send('Command deleted successfully!');
   });  
}