const request = require('request');
const Discord = require('discord.js');
exports.run = (client, message, args) => {
    var r = request.get('http://imgapi.danbot.xyz:3000/', function(err, res, body) {
      if (err) {
       client.channels.get("544290801216126976").send(err)
       message.channel.send("DanBot's Dog API is down right now :(");
       client.channels.get("542288558095073280").setName(`Dog: Offline`)
       return;
      }
      client.channels.get("542288558095073280").setName(`Dog: Online`)
    var embed = new Discord.RichEmbed()
    .setAuthor(`Dog -- Hosted on DanBot's API`)
    .setImage(r.uri.href)
    .setColor('RANDOM')
    .setDescription("Have animal images of your own? Join https://discord.gg/qSeWFtC for your images to be put on the API!");
message.channel.send(embed);
}
)};