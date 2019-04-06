const Discord = require("discord.js");
const fs = require('fs')
exports.run = (client, message, args) => {
    let imageapi = JSON.parse(fs.readFileSync("./datajsons/imageapi.json", "utf8"));
    const DogImages = imageapi.DogImages
    const CatImages = imageapi.CatImages
    const DuckImages = imageapi.DuckImages
    const FoxImages = imageapi.FoxImages
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setThumbnail(client.user.avatarURL)
    .setTitle("Urls to the API's")
    .addField("**Animal**:", "Dog", true)
    .addField("**URL**:", "http://danielpmc.ddns.net:3000", true)
    .addField("**Images**:", `${DogImages.toLocaleString()}`)
    .addBlankField()
    .addField("**Animal**:", "Cat", true)
    .addField("**URL**:", "http://danielpmc.ddns.net:3001", true)
    .addField("**Images**:", `${CatImages.toLocaleString()}`)
    .addBlankField()
    .addField("**Animal**:", "Duck", true)
    .addField("**URL**:", "http://danielpmc.ddns.net:3002", true)
    .addField("**Images**:", `${DuckImages.toLocaleString()}`)
    .addBlankField()
    .addField("**Animal**:", "Fox", true)
    .addField("**URL**:", "http://danielpmc.ddns.net:3003", true)
    .addField("**Images**:", `${FoxImages.toLocaleString()}`)
    .setDescription("Description: " + "Our API's");

    message.channel.send(embed)

}
