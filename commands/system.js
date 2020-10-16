const Discord = require("discord.js");
const os = require('os');
const si = require('systeminformation');
const pretty = require('prettysize');
exports.run = async (client, message, args) => {
    var cpu = os.loadavg();
    //OS UPTIME
    const uptime = os.uptime();
    var d = Math.floor(uptime / (3600*24));
    var h = Math.floor(uptime % (3600*24) / 3600);
    var m = Math.floor(uptime % 3600 / 60);
    var s = Math.floor(uptime % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    //System infomation stuffs
    const cpudata = await si.cpu();
    const memdata = await si.mem();
    let ramused = pretty(memdata.used);
    let ramtotal = pretty(memdata.total);
    const userdata = await si.users();
    const diskdata = await si.fsSize();
    let diskused = pretty(diskdata[0].used);
    let disktotal = pretty(diskdata[0].size);
    const netdata = await si.networkStats();
    let netrx = pretty(netdata[0].rx_bytes);
    let nettx = pretty(netdata[0].tx_bytes);
    const dockerdata = await si.dockerInfo();
    const osdata = await si.osInfo();

    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .addField("------------------------------------------------------------------------------------------------", "__**CPU INFO**__")
    .addField('**CPU**:', cpudata.manufacturer + ` ` + cpudata.brand, true)
    .addField('**CPU Cores**:', cpudata.cores, true)
    .addField('**CPU Load**:', `${Math.ceil(cpu[1] * 100) / 10 + "%"}`, true)
    .addField("------------------------------------------------------------------------------------------------", "__**RAM INFO**__")
    .addField('**RAM**:', `Used: ${ramused}, Total: ${ramtotal}`, true)
    .addField("------------------------------------------------------------------------------------------------", "__**STORAGE INFO**__")
    .addField('**SSD**:', `Used: ${diskused}, Total: ${disktotal}`, true)
    .addField("------------------------------------------------------------------------------------------------", "__**NETWORK INFO**__")
    .addField('**NET**:', `Recevied: ${netrx}, Sent: ${nettx}`, true)
    .addField("------------------------------------------------------------------------------------------------", "__**OS INFO**__")
    .addField("**OS**:", osdata.platform + " " + osdata.logofile + " " + osdata.release, true)
    .addField('**OS UPTIME**:', dDisplay + hDisplay + mDisplay + sDisplay, true)
    .addField('**CURRENT SSH USERS**:', userdata[0].user, true)
    .addField('**LAST COMMAND RAN**:', userdata[0].command, true)
    .addField("------------------------------------------------------------------------------------------------", "__**DOCKER INFO**__")
    .addField("**CONTAINERS**:", dockerdata.containers, true)
    .addField("**RUNNING**:", dockerdata.containersRunning, true)
    .addField("**STOPPED**:", dockerdata.containersStopped, true)
    message.channel.send(embed);
};