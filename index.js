const Discord = require('discord.js');
const bot1 = new Discord.Client();

bot1.on('message', (message) => {
    if(message.content == '!whitelist testkey') {
        message.author.sendMessage("Whitelisted")
    }
});


bot1.login(process.env.BOT_TOKEN);


