const moment = require("moment");
require("moment-duration-format");
const Discord = require('discord.js')
const speedTest = require('speedtest-net'); 
exports.run = async(client, message) => {
    let embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField(`__**Please wait...**__`, `This could take 20 - 40seconds \n __We are running a speedtest for you!__`, true);
    let msg = await message.channel.send(embed)
    const speed = speedTest({maxTime: 5000, serverId: "4848"});
    speed.on('data', async (data) => {
        embed.fields.pop()
            embed.addField('---------------------------------------------------------------------------------------', '__**Speedtest Data**__')
            embed.addField(`**Ping**`, `${data.server.ping}ms`, true)
            embed.addField('**Download Speed**', `${data.speeds.download} Mbps`, true)
            embed.addField('**Upload Speed**', `${data.speeds.upload} Mbps`, true)
            embed.addField('**ISP Rating**', `${data.client.isprating}`, true)
            embed.addField('**RAW Download Speed**', `${data.speeds.originalDownload}bytes`, true)
            embed.addField('**RAW Upload Speed**', `${data.speeds.originalUpload}bytes`, true)
            embed.addField('---------------------------------------------------------------------------------------', '__**Server Data**__')
            embed.addField('**Country**', `${data.server.country}`, true)
            embed.addField('**City**', `${data.server.location}`, true)
            embed.addField('**Distance**', `${data.server.distanceMi}Mi`, true)
        msg.edit(embed);
    });
};