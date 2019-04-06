const request = require('request');
const Discord = require('discord.js');
const snekfetch = require("snekfetch")
exports.run = (client, message, args) => {
    var r = snekfetch.get('http://danielpmc.ddns.net:3001', function(err, res, body) {
      if (err) {
       client.channels.get("544290801216126976").send(err)
       message.channel.send("DanBot's Cat API is down right now :(");
       client.channels.get("542288583642316800").setName(`Cat: Offline`)
       return;
      }
      client.channels.get("542288583642316800").setName(`Cat: Online`)
    var embed = new Discord.RichEmbed()
    .setAuthor(`Cat -- Hosted on DanBot's API`)
    .setImage(r)
    .setColor('RANDOM')
    .setDescription("Have animal images of your own? Join https://discord.gg/qSeWFtC for your images to be put on the API!");
message.channel.send(embed);
}
)};