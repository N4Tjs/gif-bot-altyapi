const { Discord, MessageEmbed } = require('discord.js');
const { options, db } = global;
const moment = require('moment');
moment.locale('tr');
require('moment-timezone');


exports.run = async (client, message, args) => {
    const victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let created = moment(victim.user.createdAt).format('MM/DD/YYYY [/] HH:MM')
    let joined = moment(victim.joinedTimestamp).format('MM/DD/YYYY [/] HH:MM')
    let embed = new MessageEmbed().setAuthor(`${victim.user.tag} • Adlı Üyenin Bilgileri` ,message.author.avatarURL({ dynamic:true, size:2048})).setColor(options.bot.embedColor).setFooter(options.bot.embedFooter).setTimestamp();
    db.getState()
    let pp = db.get(`users.${victim.id}.stats.pp`).value() || 0;
    let gif = db.get(`users.${victim.id}.stats.gif`).value() || 0;
    embed.addField(`__**Kullanıcı Bilgisi**__`, [
        `\`ID\` : ${victim.id}`,
        `\`Profil\` : ${victim}`,
        `\`Durum\` : ${victim.user.presence.status.replace('dnd', 'Rahatsız Etmeyin').replace('idle', 'Boşta').replace('online', 'Çevrimiçi').replace('offline', 'Çevrimdışı')}`,
        `\`Oluşturulma Tarihi\` : ${created}`
    ]);
    embed.addField(`__**Üyelik Bilgisi**__`, [
        `\`Takma Adı\` : ${victim.displayName}`,
        `\`Katılma Tarihi\` : ${joined}`,
        `\`Katılma Sırası\` : ${message.guild.members.cache.filter(a => a.joinedTimestamp <= victim.joinedTimestamp).size}/${message.guild.memberCount}`
    ]);
    let minRolePosition = message.guild.roles.cache.get(options.roles.sharerRole).position;
    if(victim.roles.highest.position >= minRolePosition) {
        embed.addField(`__**Paylaşım Bilgisi**__`, [
            `\`Atılan GIF Sayısı\` : ${gif}`,
            `\`Atılan PP Sayısı\` : ${pp}`,
            `\`Atılan Dosya Sayısı\` : ${gif+pp}`,
        ])
       return message.channel.send(embed);
    };
    message.channel.send(embed)

};


exports.config = {
    commands: ["i","istatistik"],
    usage: "[p]i < Kullanıcı ( opsiyonel ) >",
    enabled: true,
    guildOnly: true
}
