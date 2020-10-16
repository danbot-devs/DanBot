var path = require("path")
var fs = require("fs")
exports.run = (client, message, guild) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No permission!");
    var args = message.content.split(" ");

    if (args[1] == null) {
        return message.channel.send("Please specify the name for the command and also specify what would the command say!");

    }

    var data = {
        aliases: [],
        name: args[1]
    }
    var text = {
        aliases: [],
        name: args.slice(2).join(' ')
    }
    if (args[1].match(/[/\\<>:*|]/g)) {
        return message.channel.send("names of files can't include one of these characters:  ` / \\ < > : * | `")
    }
    if (args[2] != null) {
        args.forEach((i, index) => {
            if (index > 1) {
                data.aliases.push(i)
            }
        })
    }
//Gets current time and date
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//Writes file
    fs.access(path.resolve(path.dirname(require.main.filename), "guildcommands/" + message.guild.id + '/' + data.name.toLowerCase() + ".js"), fs.constants.R_OK, (err) => {
        if (!err) {
            return message.channel.send("Command already exists.")
        }

        fs.writeFile(path.resolve(path.dirname(require.main.filename), "guildcommands/" + message.guild.id + '/' + data.name.toLowerCase() + ".js"), `//COMMAND IS FROM DANBOT© \n//NOT TO BE USED WITH OTHER BOTS! \n \n//COMMAND INFO: \n//Made by: ` + message.author.username + `(` + message.author.id +`) \n//Created on: Date: ` + date + ` Time: ` + time +`\n//Guild: ` + message.guild.name + `\n \nconst Discord = require('discord.js'); \nexports.run = (client, message, guild) => {\nmessage.channel.send("` + text.name + `");\n}`, {options: "utf8"}, (err) => {
            if (err) {
                return message.channel.send("Failed! please contact someone from the dev team." + err)
            }
            
            return client.channels.get('588106425197264908').send('`' + message.author.username + '` **created** `' + data.name + '` in `' + message.guild.name + '`.' + 'Command does/says: ```' + text.name + '```'), message.channel.send('Command created...')
        })
    })
}
