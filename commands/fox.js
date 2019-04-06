exports.run = async (client, message, args, level) => {
    const { get } = require('superagent')
    .get('https://randomfox.ca/floof/')
        .end((err, response) => {
          message.channel.send(response.body.image);
        });
}