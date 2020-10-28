const Discord = require("discord.js");
const { options } = global;

exports.execute = async (message) => {
    if(message.author.bot || !message.content.startsWith(options.bot.prefix) || message.channel.type == "dm") return;
    let args = message.content.split(" ");
    let commandName = args[0].substring(options.bot.prefix.length);
    args = args.splice(1);
    let command = global.commands.get(commandName);
    if(!command || (command.config && !command.config.enabled)) return;
    if(command) command.run(message.client, message, args);
};

exports.event = {
    name: "message"
}