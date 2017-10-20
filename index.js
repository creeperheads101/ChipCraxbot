const Discord = require('discord.js');
const bot1 = new Discord.Client();

bot1.on('message', (message) => {
    if(message.content == '!whitelist testkey') {
        message.author.sendMessage("Whitelisted")
    }
});


bot1.login("MzY4OTU1MjUxMzY3MjE1MTA1.DMRg8Q.T2hb5jKhPt77_Dcy0BKss_9mnG8");


