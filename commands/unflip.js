exports.run = async (client, message) => {
    message.channel.send("(╯°□°)╯  ︵  ┻━┻").then(m => {
        setTimeout(() => {
            m.edit("(╯°□°)╯    ]").then(ms => {
                setTimeout(() => {
                    ms.edit("(°-°)\\ ┬─┬")
                }, 500);
            });
        }, 500);
})}