exports.run = async (client, message, args, level) => {
    const { get } = require('superagent')
        .get('https://api.bunnies.io/v2/loop/random/?media=gif,png')
        .end((err, response) => {
          message.channel.send(response.body.media.poster);
        });
}