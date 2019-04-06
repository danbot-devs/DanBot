const { Attachment } = require('discord.js');
const readFile = require('util').promisify(require('fs').readFile);
const { Canvas } = require('canvas-constructor');
const snekfetch = require('snekfetch')

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if(!user) user = msg.author;
	try{
		const paintMess = await msg.channel.send('Working on it...');
		const plate = await readFile('./images/wanted.jpg');
		const png = user.avatarURL.replace(/\.gif.+/g, '.png');
		const { body } = await snekfetch.get(png);
		const getWanted = new Canvas(400, 562)
		.setColor('#000000')
		.addRect(0, 0, 400, 562)
		.addImage(plate, 0, 0, 400, 562)
		.addImage(body, 86, 178, 227, 228)
		.toBuffer();
		await paintMess.delete();
		return msg.channel.send(new Attachment(getWanted, 'wanted.png'));
	}catch(e){
		return msg.channel.send(`ERROR: Please try again later or alert my dev's support server can be found on https://danbot.xyz/ Error Message: ${e.message}`);
	}
}