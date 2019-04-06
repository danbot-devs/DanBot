<<<<<<< HEAD
exports.run = (client, message, args, Discord) => {
=======
const Discord = require('discord.js');
exports.run = (client, message, args) => {
>>>>>>> b3212c029a79f0051cadf7273ab017022e882110
    let question = message.content.split(' ').slice(1).join(' ');
    const answers = [
        'As I See It Yes',
        'Ask Again Later',
        'Better Not Tell You Now',
        'Cannot Predict Now',
        'Concentrate and Ask Again',
        'Don\'t Count On It',
        'It Is Certain',
        'It Is Decidely So',
        'Most Likely',
        'My Reply Is No',
        'My Sources Say No',
        'Outlook Good',
        'Outlook Not So Good',
        'Signs Point to Yes',
        'Very Doubtful',
        'Without A Doubt',
        'Yes',
        'Yes - Definitely'
    ];
    if (!question) {
        return message.reply('What question should I answer?');
    }
    const embed = new Discord.RichEmbed()
  .setAuthor(`8ball`, 'http://8ballsportsbar.com/wp-content/uploads/2016/02/2000px-8_ball_icon.svg_.png')
<<<<<<< HEAD
  .addField('Info:', `**Your Question:** ${question}\n**My Prediction:** ${answers[~~(Math.random() * answers.length)]}`);
=======
  .addField('Info:', `**Your Question:** ${args}\n**My Prediction:** ${answers[~~(Math.random() * answers.length)]}`);
>>>>>>> b3212c029a79f0051cadf7273ab017022e882110
    message.channel.send({embed}).catch(e => logger.error(e))
};
