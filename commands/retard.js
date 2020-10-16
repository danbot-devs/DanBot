const Jimp = require('jimp');

exports.run = (client, message, args) => {
    message.channel.startTyping();
    var imgPath = "images/dog_template.png";
    var img;
    var text = "no text";

    if(args.length < 1){
        message.channel.send(":warning: No argument provided. \nex: `.retarded I like pubg`");
        message.channel.stopTyping();
        return;
    }

    args.shift();
    text = args.join(" ");

    Jimp.read(imgPath).then((image) => {
        img = image;
        return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    }).then((font) => {
        img.print(font, 350, 25, text, 280).write("images/img01.png", () => {
            message.channel.send({
                files: [{
                    attachment: "images/img01.png",
                    name: "images/retard_dog.png"
                }]
            });
            message.channel.stopTyping();
        });
    });
};