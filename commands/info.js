const Discord = require("discord.js");
const snekfetch = require('snekfetch')
const Canvas = require('canvas')
exports.run = async (client, message, args, color, member) => {
	const canvas = Canvas.createCanvas(900, 200);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('./images/background.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	const fonts = ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Library: discord.js v${Discord.version}`, canvas.width / 2.5, canvas.height / 3.5);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`DanBot was founded by danielpmc \n Updated by the DanBot Dev Team`, canvas.width / 2.5, canvas.height / 1.8);

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