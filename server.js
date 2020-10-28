const { Discord, Client, Collection } = require('discord.js');
const client = global.client = new Client();
const options = global.options = require('./options.json');
const fs = require('fs');
const Commands = global.commands = new Collection();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = global.db = low(adapter);
 
fs.readdirSync("./src/commands", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let property = require(`./src/commands/${file}`);
    if (property.config.commands == undefined || property.run == undefined) return console.error(`${file} adlı komut yüklenirken hata oluştu.`);
    if (property.config.commands && property.config.commands.length > 0) property.config.commands.forEach(aliase => Commands.set(aliase, property));
    if (property.onLoad != undefined && typeof (property.onLoad) == "function") property.onLoad(client);
    console.log(`${file} adlı komut yüklendi.`);
});

fs.readdirSync("./src/events", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let property = require(`./src/events/${file}`);
    client.on(property.event.name, property.execute);
    console.log(`${file} adlı event yüklendi.`);
});

client.login(options.bot.token).then(x => console.log(`${client.user.tag} giriş yaptı.`)).catch(err => console.error(`Client giriş yapamadı.`));