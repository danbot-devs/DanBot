exports.run = (client, message, args) => {
	function sendCookie(channel, sender, receiver) {
		if(receiver.bot === true) return message.channel.send(`:cookie: • **${sender.username}** gave a cookie to **<@${receiver.id}>**.. Oh... Thats sad.`);
		else if(receiver.id === sender.id) return message.channel.send(`:cookie: • Do you like your own cookies **<@${sender.id}>** ?`);
		else return message.channel.send(`:cookie: • **${sender.username}** gave a cookie to **<@${receiver.id}>**`);
	}

	if(message.mentions.users.first()) return sendCookie(message.channel, message.author, message.mentions.users.first());
    else if(args && system.getUser(message, args)) return sendCookie(message.channel, message.author, system.getUser(message, args).user);
    else return message.channel.send(`Try running the command with a user on the end!`);
};