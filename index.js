// Call Packages
const Discord = require('discord.js');
const request = require('request');
var mysql = require('mysql');
const fs = require('fs');
const ms = require('ms');
// Define client for Discord
const client = new Discord.Client();
const client1 = new Discord.Client();
const client2 = new Discord.Client();
const client3 = new Discord.Client();
const client4 = new Discord.Client();
const client5 = new Discord.Client();
const client6 = new Discord.Client();




//sql connecyiom 
var con = mysql.createConnection({
  host: "localhost",
  user: "chipset_main",
  password: "Pokemoncards1",
})



// This will run when a message is recieved...
client.on('message', message => {

    // Variables
    let whitelistedrole = message.guild.roles.get("409205489881317376");
    let premiumRole = message.guild.roles.get("391720017525211138");  
    let Muted = message.guild.roles.get("399356448578076683");   
    let notfication = message.guild.roles.get("403050305287356417");
    let prefix = ";";
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
            }else if(i == keys.length -1 && wrong == true){
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
    function whitelist(HWID){

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
    let numberofmessages = 2;
    if (msg.startsWith(prefix+'WHITELIST') || msg.startsWith(prefix+'Aservt79rvt8rvt79789t8679vtvb679rstb6789srtvUTH') || msg.startsWith(prefix+'CODe4vt6yh78se4vt6iny78t6h78sev45t6h78v68th7vsE')) { 
        if(message.member.roles.some(r=>["Buyer"].includes(r.name)) ) {
            if(!message.member.roles.some(r=>["Whitelisted"].includes(r.name)) ) {
            message.member.addRole(whitelistedrole).catch(console.error);
            whitelist(args[0]);
            message.channel.send("Filler");
            let messagecount = parseInt(numberofmessages);
             message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
            message.channel.send({embed: {
                color: 3447003,
                description: "hwid added to database"
              }});

          }
        
          else {
            message.channel.send("Already Whitelisted");
          }  
        }
        
    };
    if (msg.startsWith(prefix + 'INFO')) { 



    };
    if (msg.startsWith(prefix+'SQUAD')) { 

        message.member.addRole(notfication).catch(console.error);
        message.channel.send("Your now in the notification squad :D");


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


