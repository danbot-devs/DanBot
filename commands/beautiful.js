const { Attachment } = require('discord.js');
const readFile = require('util').promisify(require('fs').readFile);
const { Canvas } = require('canvas-constructor');
const snekfetch = require('snekfetch');

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if(!user) user = msg.author;
	try{
		const paintMess = await msg.channel.send('Working on it... ');
		const plate = await readFile('./images/beautiful.png');
	//	const png = user.avatarURL.replace(/\.gif.+/g, '.png');
		const { body } = await snekfetch.get(user.displayAvatarURL);
		const getBeautiful = new Canvas(634, 675)
		.setColor('#000000')
		.addRect(0, 0, 634, 675)
		.addImage(body, 423, 45, 168, 168)
		.addImage(body, 426, 382, 168, 168)
		.addImage(plate, 0, 0, 634, 675)
		.toBuffer();
		await paintMess.delete();
        return msg.channel.send(new Attachment(getBeautiful, `beautiful-${user}.gif`));
	}catch(e){
		return msg.channel.send(`ERROR: Please try again later or alert my dev's support server can be found on https://danbot.xyz/ Error Message: ${e.message}`);
	}
}