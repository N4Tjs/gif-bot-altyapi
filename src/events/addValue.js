const { Discord, MessageEmbed } = require("discord.js");
const { options, client,db } = global;


exports.execute = async (message) => {
  if (!message.attachments) return;
  if (options.channels.gifChannels.some(channel => message.channel.id === channel)) {
    let attachments = message.attachments.filter(att => att.url.endsWith('.gif'));
    if(message.attachments.some(att => !att.url.endsWith('.gif'))) return message.delete();
    attachments.forEach(att => {
      if (!db.get(`users.${message.author.id}.stats.gif`).value()) {
        db.set(`users.${message.author.id}.stats.gif`, 1).write();
      } else {
        db.update(`users.${message.author.id}.stats.gif`, n => n + 1).write()
      }
    });
    let log = client.channels.cache.get(options.channels.gifLog);
    if (log && attachments) {
      let embed = new MessageEmbed().setAuthor(`${message.author.tag} • Gif Paylaşıldı`, message.author.avatarURL({ dynamic: true, size: 2048 })).setColor(options.bot.embedColor).setFooter(options.bot.embedFooter).setTimestamp();
      embed.setDescription(`${message.member}, ${message.channel} kanalına **${attachments.size}** GIF gönderdi.`);
      let pp = db.get(`users.${message.author.id}.stats.pp`).value() || 0;
      let gif = db.get(`users.${message.author.id}.stats.gif`).value() || 0;
      embed.addField("__**Detaylı Bilgiler**__", [
        `Şu ana kadar **${gif}** tane GIF, **${pp}** tane fotoğraf, toplamda **${pp + gif}** dosya gönderdi`
      ])
      log.send(embed).catch()
    }
  }

  if (options.channels.photoChannels.some(channel => message.channel.id === channel)) {
    let attachments = message.attachments.filter(att => att.url.endsWith('.png') || att.url.endsWith('.jpg'));
    if(message.attachments.some(att => !att.url.endsWith('.png') && !att.url.endsWith('.jpg'))) return message.delete();
    attachments.forEach(att => {
      if (!db.get(`users.${message.author.id}.stats.pp`).value()) {
        db.set(`users.${message.author.id}.stats.pp`, 1).write();
      } else {
        db.update(`users.${message.author.id}.stats.pp`, n => n + 1).write()
      }
    });
    let log = client.channels.cache.get(options.channels.ppLog);
    if (log || !wrongAttachments) {
      let embed = new MessageEmbed().setAuthor(`${message.author.tag} • Fotoğraf Paylaşıldı`, message.author.avatarURL({ dynamic: true, size: 2048 })).setColor(options.bot.embedColor).setFooter(options.bot.embedFooter).setTimestamp();

      embed.setDescription(`${message.member}, ${message.channel} kanalına **${attachments.size}** PP gönderdi.`);
      let pp = db.get(`users.${message.author.id}.stats.pp`).value() || 0;
      let gif = db.get(`users.${message.author.id}.stats.gif`).value() || 0;
      embed.addField("__**Detaylı Bilgiler**__", [
        `Şu ana kadar **${pp}** tane fotoğraf, **${gif}** tane GIF, toplamda **${pp + gif}** dosya gönderdi`
      ])
      log.send(embed).catch()
    }
  }
};

exports.event = {
  name: "message"
}