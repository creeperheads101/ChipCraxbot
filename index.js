// Call Packages
const Discord = require('discord.js');
const request = require('request');
const commando = require('discord.js-commando');
const http = require('http')
const prefix = ";";

var mysql = require('mysql');
const fs = require('fs');
const ms = require('ms');
// Define client for Discord
const client = new Discord.Client();


client.on('message', function(message) {
    if(message.content.startsWith(prefix)) {
        message.delete();
    };
});

client.on('message', function(message) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(!message.content.startsWith(prefix)) return;
    if(message.author.equals(client.user)) return;
    if(message.channel.type === "text") {
        if(message.content === prefix + "whitelist " + args.slice(1).join(" ")) {
            let member = message.mentions.members.first();
            let role = message.guild.roles.find("name", "Whitelisted");
            if(message.member.roles.some(r=>["Buyers", "Beta Testers"].includes(r.name)) ) {
                console.log(`${message.author.id}` + " " + "is a buyer and therefore can whitelist")
            } else {
                message.author.send("You are not a buyer, therefore you can not whitelist yourself!")
                console.log(`${message.author.id} has attempted to whitelist themselves, but it turns out that they aren't even a buyer. Poor them.`)
                return
            };
            if(message.webhookID) {
                return;
            };
            if(message.member.roles.some(r=>["Whitelisted"].includes(r.name)) ) {
                message.author.send("You are already whitelisted! If you want to change HWID's, message @Le Chippo#2663.")
                console.log(`${message.author.id} tried to whitelist but failed to due to him/her already have been whitelisted.`)
            } else {
                message.member.addRole(role).catch(console.error);
                console.log(`${message.author.id} has whitelisted!`);
                http.get('http://chippyex.heliohost.org/data/insert.php?hwid=' + message.content.substr(11) + '&did=' + `${message.author.id}`, function (res) {
                });
                console.log(message.content.substr(11) + "has whitelisted");
                message.author.send({embed: {
                    color: 3447003,
                    description: `You, ${message.author.id}, has been whitelisted. Have fun using CC V2!`
                }});
                };
        }  else {

        };
    } else {
        message.reply("DM the bot, don't send messages openly.")
        return;
    };
});

// This will run when a message is recieved...
client.on('message', message => {

    // Variables
    let premiumRole = message.guild.roles.get("458826121459400706");  
    let time = "3m";
    let msg = message.content.toUpperCase();
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    // Commands
    var usedkeys = JSON.parse(fs.readFileSync("usedKeys.json"));
    var keys = JSON.parse(fs.readFileSync("keys.json"));
    function isValid(key){
        var wrong = true;
        for (var i in keys) {

            if(keys[i]==key){
                wrong = false;
                yey();
            } else if(i == keys.length -1 && wrong == true){
                aw();
            }
        }
    }

    function yey(){
        message.channel.send({embed: {
            color: 3447003,
            description: "You are whitelisted! Thank you for buying! Enjoy!"
          }});
        message.member.addRole(premiumRole).catch(console.error);
        fs.readFile('usedKeys.json', function (err, data) {
            var json = JSON.parse(data);
            json.push(args[0]);
        
            fs.writeFile("usedKeys.json", JSON.stringify(json));
        })
    }
    
    function aw(){

        message.channel.send({embed: {
            color: 3447003,
            description: "Wtf u doin mate get a job, That's the wrong key!"
          }});
       

    }
    

    function isUsed(key){
        for (var i in usedkeys) {
            if(usedkeys[i]==key){
                return true;
            }
        }
        return false;
    }




    // Balance & Money
    if (msg.startsWith(prefix+'VERIFY') || msg.startsWith(prefix+'AUTH') || msg.startsWith(prefix+'CODE')) { 
        if(isUsed(args[0])){
            message.channel.send({embed: {
                color: 3447003,
                description: "Nice try Mr. but that key has already been used!"
              }});
        }else{ 
            usedkeys.push(args[0]);
            isValid(args[0]);
        }
    };


   
      if (msg.startsWith(prefix+'CHECK')) { 
        http.get('http://chippyex.heliohost.org/', function (res) {
            message.channel.send({embed: {
                color: 3447003,
                description: "Server is up"
              }});
      
      }).on('error', function(e) {
        message.channel.send({embed: {
            color: 3447003,
            description: "Server is down"
          }});
      
      });;

    };
    if (msg.startsWith('INGGER')) { 


        message.channel.send("Even know I look like a burnt chicken nucket... I still love myself :D");


    };

    if (msg.startsWith(prefix+'HELP')) { 
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Cookie Captain Commands",
            fields: [{
                name: "User Commands",
                value: ";code YOURKEY\n;help"
              },
              {
                name: "Client Commands",
                value: ";Whitelist HWIDHERE"
              },
              {
                name: "Admin Commands",
                value: ";removewhitelist HWID"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Cookie Captain"
            }
          }
        });
    }; 
});



client.on('ready', () => {
    console.log('Bot launched.');
})

// <token>

client.login(process.env.BOT_TOKEN);
