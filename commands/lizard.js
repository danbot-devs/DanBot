exports.run = async (client, message, args, level) => {
    const { get } = require('superagent')
    get('https://nekos.life/api/v2/img/lizard')
        .end((err, response) => {
          message.channel.send( response.body.url );
        });
}