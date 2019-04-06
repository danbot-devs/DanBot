const sa = require('superagent')
exports.run = async (client, message, args, level) => {
  let {body} = await sa
  .get(`https://icanhazdadjoke.com/slack`);
  message.channel.send(body.attachments.map(a => a.text))
};