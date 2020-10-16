const fs = require('fs');
var path = require("path");
exports.run = (client, message, guild) => {
//Gets current time and date
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

fs.writeFile(path.resolve(path.dirname(require.main.filename), "template.js"), `//COMMAND IS FROM DANBOT© \n//NOT TO BE USED WITH OTHER BOTS! \n \n//COMMAND INFO: \n//Made by: ` + message.author.username + `(` + message.author.id +`) \n//Created on: Date: ` + date + ` Time: ` + time +`\n//Guild: ` + message.guild.name + `\n \nconst Discord = require('discord.js'); \nexports.run = (client, message, guild) => {\n//Your stuff goes here... (DO NOT CHANGE ANY LINES ABOVE THIS OR THE BOT WILL NOT ACCEPT IT)\n}`, {options: "utf8"}, (err) => {
            if (err) {
                return message.channel.send("Failed! please contact someone from the dev team." + err)
            }
            
            return setTimeout(() => { message.channel.send("Here's the command template... Once you are done use the `uploadcommand` to upload it to the guild...", { files: ["./template.js"] }) }, 500);
        })
setTimeout(() => {
fs.unlink(path.resolve(path.dirname(require.main.filename), "template.js"),function(err){
    if(err) return message.channel.send('__**ERROR**__ ' + err);
});
}, 1000);
};