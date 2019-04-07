const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./SQL/settings/guildsettings.sqlite");
var maincommands = [
    "__**Donate**__ | Donate to help the fees of bot hosting!",
    "__**Donators**__ | View the people who have donated!",
    "__**help**__ | Shows these commands",
    "__**info**__ | Shows some infomation on the discord.js version",
    "__**leaderboard**__ | Message leaderboard",
    "__**ping**__ | Check your ping!",
    "__**reload**__ | Reload all commands (Bot Staff Only)",
    "__**system**__ | View system infomation",
    "__**timer**__ | Set a timer.",
    "__**uptime**__ | Check the bots uptime!",
    "__**userinfo**__ | Check someones user infomation",
    "__**speedtest**__ | Internet speedtest for the bot!",
    "__**listemojis**__ | View the server emojis!"
]
var moderationcommands = [
    "__**antijoin**__ | Kick anyone who tries to join!",
    "__**antiraid**__ | People spamming in a channel? Lockdown!",
    "__**automod**__ | Anti-Link, Anti-Dup-Chars, Anti-Invite",
    "__**autorole**__ | Give users a role when they join!",
    "__**ban**__ | Ban someone because they have been bad!",
    "__**unban**__ | Give someone a unban!",
    "__**kick**__ | Kick someone from the server for being bad!",
    "__**logs**__ | Change Log settings",
    "__**modonly**__ | Allow only mods to use DanBot commands",
    "__**mute**__ | Mute a user for saying something bad!",
    "__**prefix**__ | Change the servers prefix",
    "__**purge**__ | Purge messages!",
    "__**settings**__ | View the current guild settings!",
    "__**slowmode**__ | Set the slowmode on a channel!",
    "__**welcome-and-leave**__ | Change welcome and leave messages and enable them!",
    "__**createrole**__ | Create a role!",
    "__**giverole**__ | Give someone a role",
    "__**roleall**__ | GIve a role to everyone",
    "__**remroleall**__ | Remove a role from everyone",
    "__**softban**__ | Softban a user!",
    "__**unmute**__ | Unmute a user",
    "__**warn**__ | Warns a user",
    "__**clearwarns**__ | Clears all warnings for a user",
    "__**warnings**__ | Checks for all the warnings for the mentioned user"
] 
var funcommands = [
    "__**8ball**__ | Got a question that you want to ask the 8ball?",
    "__**avatar**__ | Want to view your own avatar or someones?",
    "__**beautiful**__ | Yourself/Someone beautiful?",
    "__**bird**__ | Want to view bird images?",
    "__**bunny**__ | Want to view bunny images?",
    "__**cat**__ | Want to view cat images? MEOW",
    "__**cookie**__ | Give someone a cookie :)",
    "__**dadjoke**__ | Very good Dad Jokes!",
    "__**dog**__ | Want to view dog images? WOOF",
    "__**Duck**__ | Want to view duck images?",
    "__**Fox**__ | Want to view fox images?",
    "__**fullflip**__ | Full table flip",
    "__**lizard**__ | Lizard Images!",
    "__**memes**__ | Get some gud quality memes!",
    "__**tableflip**__ | Flip that table!",
    "__**triggered**__ | Generate a triggered image for a user!",
    "__**Unflip**__ | Unflip that table!",
    "__**wanted**__ | Make a user wanted!",
    "__**yomama**__ | Yomama jokes!",
    "__**achievement**__ | Make an achievement image!",
    "__**roleinfo**__ | Check any roles info!",
    "__**delete**__ | Delete a user!",
    "__**sexyrate**__ | Sexyness from 1 to 100",
    "__**shit**__ | Ew i stepped in shit!",
    "__**rip**__ | Pay respect to a user R.I.P",
    "__**jail**__ | Put a user in jail.",
    "__**thuglife**__ | THUG LIFE!",
    "__**wasted**__ | Put wasted on someones avatar :)",
]
var nsfwcommands = [
    "__**ass**__ | NSFW Image",
    "__**tits**__ | NSFW Image",
    "__**rule34**__ | NSFW image based on the [query]",
    "__**hentai**__ | Get your HENTAI here!"
]
var musiccommands = [
    "__**add**__ | Adds music to the queue.",
    "__**play**__ |Will play the music in the queue.",
    "__**skip**__ | Will skip the current song.",
    "__**queue**__ | Will say the current queue.",
    "__**clearqueue**__ | Will remove all the current songs in the queue",
    "__**pause**__ | Will pause the current music.",
    "__**resume**__ | Will resume the current music.",
    "__**earrape**__ | Will ear rape your ears. (R.I.P)!"
]
var admincommands = [
    "__**admin**__ | Give someone bot admin!",
    "__**setgame**__ | Set the bots game!"
]
exports.run = (client, message, args) => { 
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
     const prefixtouse = row.prefix
     const embed10 = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setThumbnail(client.user.avatarURL)
        .setTitle("Command: " + prefixtouse + "help")
	    .addField("Usage", prefixtouse + "help [number]")
        .addField("Options", "[1] - Main commands. \n[2] - Moderation commands.\n[3] - Fun commands. \n[4] - Nsfw commands. \n[5] - Music Commands.")
        .addField("Example", prefixtouse + "help 3")
        .setDescription("Description: " + "Used to get a list of commands.");

        const numberpicked = parseInt(args[0])
        if (isNaN(numberpicked)) return message.channel.send(embed10)
        if (numberpicked === 1) {

            const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Main commands")
            .setDescription(maincommands)
            message.channel.send(embed)
        } else if (numberpicked === 2) {
            const embed2 = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Moderation commands")
            .setDescription(moderationcommands)
            message.channel.send(embed2)
        } else if (numberpicked === 3) {
                const embed3 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Fun commands")
                .setDescription(funcommands)
                message.channel.send(embed3)
        } else if (numberpicked === 4) {
                const embed4 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("NSFW commands")
                .setDescription(nsfwcommands)
                message.channel.send(embed4)
        } else if (numberpicked === 5) {
                const embed5 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Music commands")
                .setDescription(musiccommands)
                message.channel.send(embed5)
        } else if (numberpicked === 6) {
            const embed6 = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Admin commands")
            .setDescription(admincommands)
            message.channel.send(embed6)
    } else if (numberpicked === 69) {
        const embed7 = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("PSST PSSSSSSST")
        .setDescription("GLobal advertiser is the best! join here")
        message.channel.send(embed7)
        message.channel.send('https://discord.gg/Ujrwcn3')
} else {
            message.channel.send("Did not select valid options")
        }
    })
}