<<<<<<< HEAD
exports.run = (client, message, args, Discord, fs, sql) => {
    sql.open("./SQL/settings/guildsettings.sqlite");
    sql1.open("./SQL/admins.sqlite");

=======
const fs = require("fs");
const sql = require("sqlite");
sql.open("./SQL/settings/guildsettings.sqlite");
sql1.open("./SQL/admins.sqlite");
exports.run = (client, message, args) => {
>>>>>>> b3212c029a79f0051cadf7273ab017022e882110
      if (message.author.id !== "137624084572798976") return message.channel.send("HAHA! Nice try :)");
      sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
            const prefixtouse = row.prefix
            const usage = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setThumbnail(client.user.avatarURL)
                .setTitle("Command: " + prefixtouse + "admin")
                .addField("Usage", prefixtouse + "admin @Someone")
                .setDescription("Description: " + "Make someone a bot admin.");

                let user2 = message.mentions.users.first();

      sql1.get(`SELECT * FROM admins WHERE userId ="${user2.id}"`).then(row => {
            if (!row1) {
                sql1.run("INSERT INTO warnings (userId) VALUES (?)", [user2.id]);
            }
        }).catch(() => {
            sql1.run("CREATE TABLE IF NOT EXISTS warnings (userId TEXT)").then(() => {
                sql1.run("INSERT INTO warnings (userId) VALUES (?)", [user2.id]);
            })
        })

        if (message.mentions.users.size < 1) return message.channel.send(usage)
        let user3 = message.mentions.users.first();
        sql1.get(`SELECT * FROM admins WHERE userId ="${user3.id}"`).then(row => {
            sql1.run(`UPDATE admins SET useradmins = ${row.admins}`);
        })
        message.channel.send('User set as admin!')
})};
