//COMMAND FROM https://github.com/MonsterMannen/DiscordBotNodeJs/blob/master/commands/russianroulette.js


exports.run = (client, message, args) => {
    var v = ~~(Math.random() * 3);  // 0 to 2
    console.log("--> Rolled " + v + " in russian roulette");
    var deathText = "<:dizzy_face:418874338138128395>    <:boom:418874561006927881> <:gun:418869220932190228> UNLUCKY";
    var aliveText = "<:sweat_smile:418874817719304215>           <:gun:418869220932190228> LUCKY";
    var defaultText = "<:smile:418868020623179797>            <:gun:418869220932190228>";

    message.channel.send(defaultText + "   3")
        .then(msg => {
            setTimeout(function() {
                msg.edit(defaultText + "   2")
                    .then(msg => {
                        setTimeout(function() {
                            msg.edit(defaultText + "   1")
                                .then(msg => {
                                    setTimeout(function() {
                                        if(v == 0){
                                            msg.edit(deathText);
                                        }else{
                                            msg.edit(aliveText);
                                        }
                                    }, 1000);
                                });
                        }, 1000);
                    });
            }, 1000);
        })
        .catch(console.error);
};