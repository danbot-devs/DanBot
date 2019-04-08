const Discord = require("discord.js");
const snekfetch = require('snekfetch')
const Canvas = require('canvas')
const fs = require('fs');
exports.run = async (client, message, args, color, member) => {

	const packages = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

	const canvas = Canvas.createCanvas(1500, 1500);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('./images/background.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '50px sans-serif';
	const fonts = ctx.font = '50px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Library: discord.js v${Discord.version}`, canvas.width / 7.0, canvas.height / 15.0);
	ctx.fillText(`Software: Node.js ${process.version}`, canvas.width / 7.0, canvas.height / 10.0);
	ctx.fillText(`DanBot was founded by danielpmc \nDeveloped by the DanBot Dev Team`, canvas.width / 250.0, canvas.height / 5.0);
	ctx.fillText(`Some other packages we use: \n${packages.dependencies}`, canvas.width / 250.0, canvas.height / 3.0);
	ctx.fillText(`All the source code can be found online at: \nhttps://github.com/danbot-devs`, canvas.width / 250.0, canvas.height / 1.05);

	ctx.beginPath();
	ctx.arc(125, 120, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get("https://cdn.danbot.xyz/DanBot.png");
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 170, 170);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'info.png');
	message.channel.send(attachment);
};