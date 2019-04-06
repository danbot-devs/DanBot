const request = require('request');
const Discord = require('discord.js');
exports.run = (client, message, args) => {
    var r = request.get('http://imgapi.danbot.xyz:3002/', function(err, res, body) {
      if (err) {
       client.channels.get("544290801216126976").send(err)
       message.channel.send("DanBot's Duck API is down right now :(")
       client.channels.get("542288615343128579").setName(`Duck: Offline`)
       return;
      }
      client.channels.get("542288615343128579").setName(`Duck: Online`)
    var embed = new Discord.RichEmbed()
    .setAuthor(`Duck -- Hosted on DanBot's API`)
    .setImage(r.uri.href)
    .setColor('RANDOM')
    .setDescription("Have animal images of your own? Join https://discord.gg/qSeWFtC for your images to be put on the API!");
message.channel.send(embed);
}
)};