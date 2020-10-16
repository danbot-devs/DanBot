const Discord = require("discord.js");
const fs = require("fs");
const superagent = require("superagent")
const SQLite = require("better-sqlite3");
const moment = require("moment");
const countFiles = require('count-files');
module.exports = async(guild, files) => {


client.appInfo = await client.fetchApplication();
    client.user.setActivity("LOADING STATUS.........")
//    client.user.setStatus('dnd')
//Ready Console Message
const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
let startEmbed = new Discord.RichEmbed()
.setTitle(`${client.user.username} has started!`)
.setColor("#53f23e")
.addField("__**Time:**__", `${timestamp}`, true)
.addField("__**Total Members:**__", `${client.guilds.reduce((p, c) => p + c.memberCount, 0)}`, true)
.addField("__**Total Guilds:**__", `${client.guilds.size}`, true)
.addField("__**Total Channels:**__", `${client.channels.size}`, true)
client.channels.get("588105811864059905").send(startEmbed);
client.users.get('137624084572798976').send(startEmbed)
console.log(client.appInfo.owner.id);

//Dashboard Owner Sync
client.appInfo = await client.fetchApplication();
setInterval( async () => {
client.appInfo = await client.fetchApplication();
}, 60000);
require("../modules/dashboard")(client); 


//Message Leaderboard SQL Tables
const sql = new SQLite('./SQL/messageleaderboard/msg.sqlite');
const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
if (!table['count(*)']) {
   sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER);").run();
   sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
   sql.pragma("synchronous = 1");
   sql.pragma("journal_mode = wal");
client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
}

//Auto Activities List
const activities = [
    {
        "text": "over " + (Math.ceil(client.guilds.size)) + " servers.",
        "type": "WATCHING"
    },
    {
        "text": "!help - In " + (Math.ceil(client.guilds.size)) + " servers.",
        "type": "PLAYING"
    },
    {
        "text": "new updates to my code.",
        "type": "WATCHING"
    },
    {
        "text": "Did you know my owner spends 15 (or more) hours a day coding me?",
        "type": "PLAYING"
    }
];
setInterval(() => {
    //client.user.setStatus('online')
    const activity = activities[Math.floor(Math.random() * activities.length)];
//    client.user.setActivity(activity.text, { type: activity.type }); 
    client.user.setActivity("Giant re-write happening. New changes + New prefix!");
}, 10000);   

//Set voice channel names in support server to display guilds, members, channels
//setInterval(() => {
//    client.channels.get("542078434361475083").setName(`Guilds: ${Math.ceil(client.guilds.size)}`)
//    client.channels.get("542078467420717071").setName(`Users: ${client.guilds.reduce((p, c) => p + c.memberCount, 0).toLocaleString()}`)
//    client.channels.get("542078526371659807").setName(`Channels: ${client.channels.size.toLocaleString()}`)
//  }, 10000);

//Bots API Posting Stats
//const apiKeys = require('../datajsons//API.json')
//const blapi = require('blapi')
//blapi.handle(client, apiKeys, 60);

setInterval(() => {
client.guilds.forEach((guild) => {
    if (!fs.existsSync("./guildcommands/" + guild.id)){
        fs.mkdirSync("./guildcommands/" + guild.id);
    }
});
}, 10000);

//Custom commands checking. 
const dir = ('./guildcommands/')
setInterval(() => {
var stats = countFiles(dir, function (err, results) {
    client.channels.get("588106425197264908").setTopic(`Custom command count: ${results.files - results.dirs}`);
  })
}, 10000);

}
