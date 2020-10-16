const Discord = require("discord.js");
const request = require('request');

exports.run = async (client, message, args ) => {
    let cn = request("http://api.adviceslip.com/advice", function(err, res, body) {
        try {
            let cnj = JSON.parse(body)
            message.channel.send(cnj.slip.advice)
        } catch (err) {
            return message.channel.send("**Advice machine :b:roke**")
        }
        
    });
}