const ms = require('ms');
module.exports.run = async (client, message, args) => {
  let Timer = args[0];
  if(!args[0]){
    return message.channel.send(":x: " + "| Please Enter a time followed by \"s or m or h\"");
  }
  if(args[0] <= 0){
    return message.channel.send(":x: " + "| Please Enter a time followed by \"s or m or h\"");
  }
  message.channel.send(":white_check_mark: " + "| Timer Started for: " + `${ms(ms(Timer), {long: true})}`)
  setTimeout(function(){
    message.channel.send(message.author.toString() + ` The Timer Has FINISHED!!! :bell:, it lasted: ${ms(ms(Timer), {long: true})}`)

  }, ms(Timer));
}