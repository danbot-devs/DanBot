const Discord = require('discord.js'); 
const HypixelAPI = require('hypixel-api');
const hclient = new HypixelAPI("19703f10-533e-4e9b-875d-31c7f14219c4");
exports.run = (client, message, guild) => {
  if(!args[1]) return message.reply(`Please specify a minecraft username and a gamemode. E.g \`hypixel[playername] [gamemode]\`\nCurrently Supported Gamemodes:\nBedwars`);
  if(args[1].toLowerCase() === "bedwars") gamemode = "BedWars";
  if(!gamemode) return message.reply(`Please Specify A Valid Gamemode\n Currently Supported Gamemodes:\nBedwars`);

  hclient.getPlayer('name', args[0]).then((player) => {
    message.channel.send({
           embed: {
               color: parseInt(0x36dffe),
               author: {
                   name: client.user.username,
                   icon_url: client.user.avatarURL
               },
               description: `${player.player.playername}'s ${gamemode} Stats`,
               fields: [{
                   name: "?? Coins",
                   value: `**${player.player.stats.Bedwars.coins}**`,
                   inline: 'true'
               },
               {
                   name: "?? Winstreak",
                   value: `**${player.player.stats.Bedwars.winstreak}**`,
                   inline: 'true'
               },
               {
                   name: "** **",
                   value: `** **`
               },
               {
                   name: "** **",
                   value: `** **`
               },
               {
                   name: "?? Kills",
                   value: `**${player.player.stats.Bedwars.kills_bedwars}**`,
                   inline: 'true'
               },
               {
                   name: "?? Void Kills",
                   value: `**${player.player.stats.Bedwars.void_kills_bedwars}**`,
                   inline: 'true'
               },
               {
                   name: "** **",
                   value: `** **`
               },
               {
                   name: "? Final Void Kills",
                   value: `**${player.player.stats.Bedwars.void_final_deaths_bedwars}**`,
                   inline: 'true'
               },
               {
                   name: "? Final Kills",
                   value: `**${player.player.stats.Bedwars.final_kills_bedwars}**`,
                   inline: 'true'
               },
               {
                   name: "** **",
                   value: `** **`
               },
               {
                   name: "** **",
                   value: `** **`
               },
               {
                   name: "?? Deaths",
                   value: `**${player.player.stats.Bedwars.deaths_bedwars}**`,
                   inline: 'true'
               },
               {
                   name: "?? Void Deaths",
                   value: `**${player.player.stats.Bedwars.void_deaths_bedwars}**`,
                   inline: 'true'
               },
               {
                   name: "** **",
                   value: `** **`
               },
               {
                   name: "? Void Final Deaths",
                   value: `**${player.player.stats.Bedwars.void_final_kills_bedwars}**`,
                   inline: 'true'
               },
               {
                   name: "? Final Deaths",
                   value: `**${player.player.stats.Bedwars.final_deaths_bedwars}**`,
                   inline: 'true'
               }
          ]
        }
      })
  }).catch((err) => {
    console.log(err);
  	message.reply('Invalid User Specified Or User Hasnt Joined Hypixel')
  })
}