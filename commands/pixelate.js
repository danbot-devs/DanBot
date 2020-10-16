const request = require('node-superfetch');
const { createCanvas, loadImage } = require('canvas');
exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Sorry, i dont have the perms to do this cmd i need ATTACH_FILES. :x:')
  if (message.mentions.users.size < 1) {
    try {
      const { body } = await request.get(message.author.avatarURL);
      const data = await loadImage(body);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      const width = canvas.width * 0.15;
      const height = canvas.height * 0.15;
      ctx.drawImage(data, 0, 0, width, height);
      ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
      const attachment = canvas.toBuffer();
      if (Buffer.byteLength(attachment) > 8e+6) return message.channel.send('Image was above 8 MB.');
      return message.channel.send({ files: [{ attachment, name: 'pixelate.png' }] });
    } catch (err) {
      return message.channel.send(`An error occurred: \`${err.message}\`. Try again later!`);
    }
  }
  try {
    const { body } = await request.get(message.mentions.users.first().avatarURL);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const width = canvas.width * 0.15;
    const height = canvas.height * 0.15;
    ctx.drawImage(data, 0, 0, width, height);
    ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    const attachment = canvas.toBuffer();
    if (Buffer.byteLength(attachment) > 8e+6) return message.channel.send('Image was above 8 MB.');
    return message.channel.send({ files: [{ attachment, name: 'pixelate.png' }] });
  } catch (err) {
    return message.channel.send(`An error occurred: \`${err.message}\`. Try again later!`);
  }
}