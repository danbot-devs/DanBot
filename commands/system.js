const Discord = require('discord.js');
var cpuStat = require('cpu-stat');
var memStat = require('mem-stat');
var netStat = require('net-stat');
var disk = require('diskusage');
const os = require('os')
const sql = require("sqlite");
const fs = require('fs')
sql.open("./SQL/settings/guildsettings.sqlite");

exports.run = (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const prefixtouse = row.prefix;
    const embed10 = new Discord.RichEmbed()
       .setColor(0x00A2E8)
       .setThumbnail(client.user.avatarURL)
       .setTitle("Command: " + prefixtouse + "system")
       .addField("Usage", prefixtouse + "system [number]")
       .addField("Options", "[1] - CPU Infomation. \n[2] - Ram Infomation. \n[3] - Disk Infomation. \n[4] - Network Infomation")
       .addField("Example", prefixtouse + "system 1")
       .setDescription("Description: " + "Show system infomation.");

       let imageapi = JSON.parse(fs.readFileSync("./datajsons/imageapi.json", "utf8"));
  const numberpicked = parseInt(args[0]);
  if (isNaN(numberpicked)) return message.channel.send(embed10);
  if (numberpicked === 1) {
    var cpu = os.loadavg();
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setThumbnail(client.user.avatarURL)
    .addField('__**VM**__:', 'DanBot (Updated When Command Is Ran)')
    .addField('**CPU Load**:', `${Math.ceil(cpu[1] * 100) / 10 + "%"}`, true)
    .addField('**CPU Cores**:', `${cpuStat.totalCores()}`, true)
    .addField('**CPU Type**:', `Intel Xeon CPU E5645`, true)
    .addBlankField()
    .addField('__**VM**__:', 'Image APIs (Updated Every 10seconds)')
    .addField('**CPU Load**:', `${imageapi.cpu + "%"}`, true)
    .addField('**CPU Cores**:', `${imageapi.cpucores}`, true)
    .addField('**CPU Type**:', `Intel Xeon CPU E5645`, true)
    .setDescription("Description: " + "CPU Infomation");

    message.channel.send(embed);
  }else if (numberpicked === 2) {
    const embed1 = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setThumbnail(client.user.avatarURL)
    .addField('__**VM**__:', 'DanBot (Updated When Command Is Ran)')
    .addField('**Used Mem**:', `${Math.round(memStat.total('MiB') - memStat.free('MiB')) + "MB"}`, true)
    .addField('**Total Mem**:', `${Math.round(memStat.total('GiB')) + "GB"}`, true)
    .addField('**Used Percent**:', `${Math.ceil(memStat.usedPercent() * 100) / 100 + "%"}`, true)
    .addBlankField()
    .addField('__**VM**__:', 'Image APIs (Updated Every 10seconds)')
    .addField('**Used Mem**:', `${imageapi.usedmem + "MB"}`, true)
    .addField('**Total Mem**:', `${imageapi.totalmem + "GB"}`, true)
    .addField('**Used Percent**:', `${imageapi.usedper + "%"}`, true)
    .setDescription("Description: " + "Ram Infomation");

    message.channel.send(embed1);
  }else if (numberpicked === 3) {
    disk.check('/', function(err, info) {

    const embed2 = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .addField('__**VM**__:', 'DanBot (Updated When Command Is Ran)')
    .addField('**Disk Used**:', `${Math.round(info.total / 1000000 / 1024) - Math.round(info.free / 1000000 / 1024) + "GB"}`, true)
    .addField('**Disk Total**:', `${Math.round(info.total / 1000000 / 1024) + "GB"}`, true)
    .addField('**Drive**:', `Main Drive - 40GB`, true)
    .addBlankField()
    .addField('__**VM**__:', 'Image APIs (Updated Every 10seconds)')
    .addField('**Disk Used**:', `${imageapi.diskused + "GB"}`, true)
    .addField('**Disk Total**:', `${imageapi.disktotal + "GB"}`, true)
    .addField('**Drive**:', `Main Drive - 40GB`, true)
    .setDescription("Description: " + "Disk Infomation");

    message.channel.send(embed2);
}); 

  }else if (numberpicked === 4) {
    const embed3 = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setThumbnail(client.user.avatarURL)
    .addField('__**VM**__:', 'DanBot (Updated When Command Is Ran)')
    .addField('**Received Net**:', `${Math.round(netStat.totalRx({ iface: 'enp0s3', units: 'GiB' })) + "GB"}`, true)
    .addField('**Transmitted Net**:', `${Math.round(netStat.totalTx({ iface: 'enp0s3', units: 'GiB' })) + "GB"}`, true)
    .addBlankField()
    .addField('__**VM**__:', 'Image APIs (Updated Every 10seconds)')
    .addField('**Received Net**:', `${imageapi.netrec + "GB"}`, true)
    .addField('**Transmitted Net**:', `${imageapi.netsent + "GB"}`, true)
    .setDescription("Description: " + "Network Infomation");

    message.channel.send(embed3);
  }
});
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "system",
    category: "Info Commands",
    description: "Shows CPU, Disk, Net, Mem.",
    usage: "system"
  };
