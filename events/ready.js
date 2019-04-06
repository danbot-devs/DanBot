const Discord = require("discord.js");
const fs = require("fs");
const superagent = require("superagent")
const SQLite = require("better-sqlite3");
const moment = require("moment");
module.exports = (client, guild, files) => {
    client.user.setActivity("LOADING STATUS.........")
//Ready Console Message
const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
let startEmbed = new Discord.RichEmbed()
.setTitle(`${client.user.username} Started!`)
.setColor("#53f23e")
.addField("__**Time:**__", `${timestamp}`, true)
.addField("__**Total Members:**__", `${client.guilds.reduce((p, c) => p + c.memberCount, 0)}`, true)
.addField("__**Total Guilds:**__", `${client.guilds.size}`, true)
.addField("__**Total Channels:**__", `${client.channels.size}`, true)
client.channels.get("544290801216126976").send(startEmbed);

//Command Handler
fs.readdir("./commands/", (err, files) => {
    if (err) return client.channels.get("544290801216126976").send(err);
         client.channels.get("544290801216126976").send(`Loaded ${files.length} commands successfully!`)
     })

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
    client.user.setStatus('online')
    const activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity.text, { type: activity.type }); 
}, 10000);   

//To grab infomation from the ImageAPI PI
var download = require('download-file')
var url = "http://192.168.0.70/imageapi.json"
var options = {
  directory: "./datajsons/",
  filename: "imageapi.json"
} 
//setInterval(() => {
//    download(url, options, function(errr){
//    if (errr) client.channels.get("544290801216126976").send(`The API PI seems to be offline <@137624084572798976>`)
//})}, 10000);

//Set voice channel names in support server to display guilds, members, channels
setInterval(() => {
    client.channels.get("542078434361475083").setName(`Guilds: ${Math.ceil(client.guilds.size)}`)
    client.channels.get("542078467420717071").setName(`Users: ${client.guilds.reduce((p, c) => p + c.memberCount, 0).toLocaleString()}`)
    client.channels.get("542078526371659807").setName(`Channels: ${client.channels.size.toLocaleString()}`)
  }, 10000);

//Bots API Posting Stats
const apiKeys = require('../datajsons//API.json')
const blapi = require('blapi')
blapi.handle(client, apiKeys, 60);

}
