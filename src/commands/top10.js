const { Discord, MessageEmbed } = require('discord.js');
const { options,db } = global;

exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(`${message.guild.name} • Top 10` , message.guild.iconURL({ dynamic:true, size:2048})).setColor(options.bot.embedColor).setFooter(options.bot.embedFooter).setTimestamp();
    let data = db.get('users').value();
    if(!data) return message.channel.send(embed.setDescription(`${message.member}, sunucuda hiç gif veya fotoğraf atılmamış.`)).then(x => x.delete({timeout: 10000 }));
    if(!args[0] && args[0] !== "gif" && args[0] !== "pp") {
        let top10 = Object.keys(data).sort((uye1,uye2) => (db.get(`users.${uye2}.stats.gif`).value()+db.get(`users.${uye2}.stats.pp`).value()) - (db.get(`users.${uye1}.stats.pp`)+db.get(`users.${uye1}.stats.gif`).value())).slice(0, 10)
        let arr = [];
        for(let i in top10) {
            let stats = db.get(`users.${top10[i]}.stats`).value()
			let gif = stats.gif || 0;
			let pp = stats.pp || 0;
            arr.push(`\`${i * 1 + 1}.\` ${client.users.cache.get(top10[i]) ? client.users.cache.get(top10[i]).tag : `Bilinmeyen Kullanıcı (\`${top10[i]}\`)`} : ${gif+pp}`)
        }
        message.channel.send(embed.setDescription(arr.join('\n')));
    } else if(args[0] === "gif") {
    let top10 = Object.keys(data).sort((uye1,uye2) => db.get(`users.${uye2}.stats.gif`).value() - db.get(`users.${uye1}.stats.gif`).value()).slice(0, 10)
    let arr = [];
    for(let i in top10) {
        let stats = db.get(`users.${top10[i]}.stats`).value() || { pp: 0, gif: 0};
        arr.push(`\`${i * 1 + 1}.\` ${client.users.cache.get(top10[i]) ? client.users.cache.get(top10[i]).tag : `Bilinmeyen Kullanıcı (\`${top10[i]}\`)`} : ${gif}`)
    }
    message.channel.send(embed.setDescription(arr.join('\n')));
    } else if(args[0] === "pp") {
        let top10 = Object.keys(data).sort((uye1,uye2) => db.get(`users.${uye2}.stats.pp`).value() - db.get(`users.${uye1}.stats.pp`).value()).slice(0, 10)
        let arr = [];
        for(let i in top10) {
            let stats = db.get(`users.${top10[i]}.stats`).value() || { pp: 0, gif: 0};
            arr.push(`\`${i * 1 + 1}.\` ${client.users.cache.get(top10[i]) ? client.users.cache.get(top10[i]).tag : `Bilinmeyen Kullanıcı (\`${top10[i]}\`)`} : ${pp}`)
        }
        message.channel.send(embed.setDescription(arr.join('\n')));
    
    }
}

exports.config = {
    commands: ["lb","leaderboard","top10","top","top-10"],
    usage: "[p]top10",
    enabled: true,
    guildOnly: true
}
