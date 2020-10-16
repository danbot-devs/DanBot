const Discord = require("discord.js");
exports.run = async (client, message, args) => {
   if (message.author.id == "137624084572798976") {
    var embedmsg = args.join(' ');
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Announcement!")
    .addField("Message: \n", embedmsg)
    client.guilds.get("497812932705517588").roles.get("554415470707474442").setMentionable(true)
    client.channels.get('542761360275275816').send('<@&554415470707474442>')
    setTimeout(function(){ 
    client.channels.get('542761360275275816').send(embed)
}, 500);
    setTimeout(function(){ 
    client.guilds.get("497812932705517588").roles.get("554415470707474442").setMentionable(false);
}, 2000);
    }
}
