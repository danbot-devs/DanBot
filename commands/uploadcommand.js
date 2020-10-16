const fs = require('fs');
let request = require(`request`);
const Discord = require('discord.js');
exports.run = (client, message, guild) => {
    var args = message.content.split(" ");
    if (!message.attachments.size > 0) {
        message.channel.send("Please upload a command file. Example: uploadcommand commandname ");
    } else if (message.attachments.size > 0) {
        var data = {
            aliases: [],
            name: args[1]
        }
        if (args[1].match(/[/\\<>:*|]/g)) {
            return message.channel.send("names of files can't include one of these characters:  ` / \\ < > : * | `")
        }
    var Attachment = (message.attachments).array();
    message.channel.send('Uploaded... Please wait for staff to accept!')
    client.channels.get('588106425197264908').send(`@everyone | ${message.author.username} (ID: ${message.author.id}) wants to upload ${Attachment[0].url} to ${message.guild.name}... Should i add this command to that guild? Please download and check the command first...`).then((msg) => {
        msg.react("👍");
        msg.react("👎");
       const filter = (reaction, user) => {
           return ['👍', '👎'].includes(reaction.emoji.name) && user.id !== `${client.user.id}`;
       };
       setTimeout(function(){ 
        msg.awaitReactions(filter, { max: 1 })
        .then((collected) => {
            const reaction = collected.first();
               const users = reaction.users 
               if (reaction.emoji.name === "👍") {
                const A = users.array().filter(u => u.id !== client.user.id);
                message.author.send("", {
                    embed: new Discord.RichEmbed()
                    .setTimestamp()
                    .setDescription(`Hey there! Your command for ${message.guild.name} has been accepted. It will be added
                    in a few moments... `)
                })
                
                msg.attachments.forEach(a => {
                    fs.writeFileSync("guildcommands/" + message.guild.id + '/' + data.name.toLowerCase() + ".js", a.file); // Write the file to the system synchronously.
                });
                msg.clearReactions();
               }else {
                message.author.send("", {
                    embed: new Discord.RichEmbed()
                    .setTimestamp()
                    .setDescription(`Hey there! Your command for ${message.guild.name} was not accepted...`)
                })
                msg.clearReactions();
            }
        })
    });
}, 2000);
};
}