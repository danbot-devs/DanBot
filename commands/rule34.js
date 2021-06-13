
const Discord = require('discord.js');
const got = require('got');
module.exports = {
name: "rule34",
run: async (client, message, args) => {
	const embed = new Discord.MessageEmbed();
	got('https://www.reddit.com/r/rule34/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const rule34 = `https://reddit.com${permalink}`;
			const rule34Image = post.data.url;
			const rule34Title = post.data.title;
			const Rule34thumbs = post.data.ups;
			const Rule34Comments = post.data.num_comments;

			embed.setTitle(`**Rule 34:** ${rule34Title}`);
			embed.setURL(`${rule34}`);
			embed.setColor('RANDOM');
			embed.setImage(rule34Image);
			embed.setDescription(`**Upvotes and comments:** 👍 ${Rule34thumbs} 💬 ${Rule34Comments}`);

			message.channel.send(embed);
		})
		.catch(console.error);
}}


