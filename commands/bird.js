const superagent = require("snekfetch");
exports.run = async (client, message, args, level) => {
    superagent.get('http://shibe.online/api/birds?count=1&urls=true')
        .end((err, response) => {
          message.channel.send({ file: `${response.body}` });
        });
}