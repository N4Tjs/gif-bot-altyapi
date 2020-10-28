const { Discord, MessageEmbed } = require('discord.js');
const { options } = global;

exports.run = async (client, message, args) => {
    const victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let embed = new MessageEmbed().setAuthor(`${victim.user.tag} • Adlı Üyenin Avatarı` , victim.user.avatarURL({ dynamic:true, size:2048})).setColor(options.bot.embedColor).setFooter(`${message.author.tag} tarafından istendi.`).setTimestamp();
    embed.setImage(victim.user.avatarURL({ dynamic: true, size: 2048 }))
    message.channel.send(embed)
};

exports.config = {
    commands: ["avatar"],
    usage: "[p]avatar < Kullanıcı ( opsiyonel ) >",
    enabled: true,
    guildOnly: true
}
