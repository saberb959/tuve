const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
console.log("Bot is on By saber");

client.on('message' , message => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + "ping")) {
   message.channel.send('pong').then((msg) => {
  var PinG = `${Date.now() - msg.createdTimestamp}`
  var ApL = `${Math.round(client.ping)}`
        msg.edit(`\`\`\`javascript\nTime taken: ${PinG} ms.\nDiscord API: ${ApL} ms.\`\`\``);
   })
    }  
   });

   client.on("message", message => {

    if (message.content.startsWith(prefix + "bc")) {
                 if (-message.member.hasPermission("ADMINISTRATOR"))  return;
let args = message.content.split(" ").slice(1);
var argresult = args.join(' '); 
message.guild.members.filter(m => m.presence.status -= 'offline').forEach(m => {
m.send(`${argresult}\n ${m}`);
})
message.channel.send(`\`${message.guild.members.filter(m => m.presence.status -= 'online').size}\` : عدد الاعضاء المستلمين`); 
message.delete(); 
};     
});


client.on('ready', () => {
console.log(`----------------`);
console.log(`Desert Bot- Script By : Saber`);
console.log(`----------------`);
console.log(`ON ${client.guilds.size} Servers '     Script By : Saber ' `);
console.log(`----------------`);
console.log(`Logged in as ${client.user.tag}-`);
client.user.setGame('Tuve server',"http://twitch.tv/S-F")
client.user.setStatus("dnd")
});

client.on("message", (message) => {
    if (-message.content.startsWith(prefix) || message.author.bot) return;
  
    if (message.content.toLowerCase().startsWith(prefix + `tickethelp`)) {
      const embed = new Discord.RichEmbed()
      .setTitle(`:mailbox_with_mail: Tuve server teckithelp`)
      .setColor(0xCF40FA)
      .setDescription(`Hello- I'm Tuve bot, the Discord bot for super cool support ticket stuff and more- Here are my commands:`)
      .addField(`Tickets`, `[-new]() > Opens up a new ticket and tags the Support Team\n[-close]() > Closes a ticket that has been resolved or been opened by accident`)
      .addField(`Other`, `[-teckithelp]() > Shows you this tickethelp menu your reading\n[-ping]() > Pings the bot to see how long it takes to react\n[-about]() > Tells you all about Phantom`)
      message.channel.send({ embed: embed });
    }
  
    if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
      message.channel.send(`Hoold on-`).then(m => {
      m.edit(`:ping_pong: Wew, made it over the ~waves~ - **Pong-**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API heartbeat is ` + Math.round(client.ping) + `ms.`);
      });
  }
  
  if (message.content.toLowerCase().startsWith(prefix + `new`)) {
      const reason = message.content.split(" ").slice(1).join(" ");
      if (-message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
      if (message.guild.channels.exists("name", "ticket-" + message.author.username)) return message.channel.send(`You already have a ticket open.`);
      message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
          let role = message.guild.roles.find("name", "Support Team");
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
          const embed = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          .addField(`Hey ${message.author.username}-`, ` *** Support Team *** يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم  هنا قريباً لمساعدتك :)   -- لغلق التذكره اكتب .close.`)
          .setTimestamp();
          c.send({ embed: embed });
      }).catch(console.error);
  }
  if (message.content.toLowerCase().startsWith(prefix + `close`)) {
      if (-message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
  
      message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action-\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`)
      .then((m) => {
        message.channel.awaitMessages(response => response.content === '-confirm', {
          max: 1,
          time: 10000,
          errors: ['time'],
        })
        .then((collected) => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                m2.delete();
            }, 3000);
          });
      });
  }
  
  });

  client.on('message',async message => {
    var room;
    var title;
    var duration;
    var gMembers;
    var filter = m => m.author.id === message.author.id;
    if(message.content.startsWith(prefix + "giveaway")) {
  
      if(-message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **you should have "MANAGE GUILD" permission**');
      message.channel.send(`:eight_pointed_black_star:| **in wich channel you want to start the giveaway?**`).then(msgg => {
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ['time']
        }).then(collected => {
          let room = message.guild.channels.find('name', collected.first().content);
          if(-room) return message.channel.send(':heavy_multiplication_x:| **cannot find this channel**');
          room = collected.first().content;
          collected.first().delete();
          msgg.edit(':eight_pointed_black_star:| **write time of the giveaway**').then(msg => {
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 20000,
              errors: ['time']
            }).then(collected => {
              if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **you must rewrite the command``write a correct time``**');
              duration = collected.first().content * 60000;
              collected.first().delete();
              msgg.edit(':eight_pointed_black_star:| **whats the prize?**').then(msg => {
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 20000,
                  errors: ['time']
                }).then(collected => {
                  title = collected.first().content;
                  collected.first().delete();
                  try {
                    let giveEmbed = new Discord.RichEmbed()
                    .setAuthor(`Tuve giveaways`)
                    .setTitle(title)
                    .setDescription(`Time : ${duration / 60000} Minute`)
                    .setFooter(message.author.username, message.author.avatarURL);
                    message.guild.channels.find('name', room).send(giveEmbed).then(m => {
                       let re = m.react('🎉');
                       setTimeout(() => {
                         let users = m.reactions.get("🎉").users;
                         let list = users.array().filter(u => u.id -= m.author.id);
                         let gFilter = list[Math.floor(Math.random() * list.length) + 0];
                           if(users.size === 1) gFilter = '**Not specified**';
                         let endEmbed = new Discord.RichEmbed()
                         .setAuthor(message.author.username, message.author.avatarURL)
                         .setTitle(title)
                         .addField('The giveaway ended -',`the winner is : ${gFilter}`)
                         .setFooter(message.guild.name, message.guild.iconURL);
                         m.edit(endEmbed);
                       },duration);
                     });
                    msgg.edit(`:heavy_check_mark:| **the giveaway has been prepared**`);
                  } catch(e) {
                    msgg.edit(`:heavy_multiplication_x:| **I dont have permissions**`);
                    console.log(e);
                  }
                });
              });
            });
          });
        });
      });
    }
  });

client.on('message', message => {
    if(-message.channel.guild) return;
    if(message.content.startsWith('-ping')) { // حقوق مداكس
        if (message.author.bot) return;
        if(-message.channel.guild) return;
        var Bping =`${Math.round(client.ping)}` // Mdax77x CopyRight | Toxic Codes
                const E1ping = new Discord.RichEmbed()
        .setTitle('ــــــــــــــــــــــــــــــ')
        .addField(`**BOT Ping Is** :__${Bping}📶__`,"ــــــــــــــــــــــــــــــ")
        .setFooter(`Requested by | ${message.author.tag}`) // حقوق مداكس
        .setColor('RANDOM')
        message.channel.send(E1ping);
    }
});

client.on("message", message => {
  if (message.content === `${prefix}help`) {

  var saber = `
  __***:قائمةالمساعدة***__
  ***-ping*** = **معرفة سرعة البوت**
  ***-bc*** = **برودكاست لجيع اعضاء السيرفر**
  ***-tickethelp*** = **لمعرفة اوامر التيكت**
  ***-giveaway*** = **عشان تسوي قيف اواي** 
  ***-clear*** = **مسح الشات**
  ***-userinfo*** = **معلومات الشخص**
  ***-avatar*** = **تشوف صوره الشخص**
  ***-mutechannel*** = **نقفيل الشات**
  ***-ummutechannel*** = **فتح الشات**
  ***-mute*** = **ميوت شخص**
  ***-unmute*** = **تشيل المبوت عن شخص**
  ***-kick*** = **طرد شخص**
  ***-ban*** = **باند شخص**
  `
  message.channel.send(saber)
 
 }
 });

 client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);
 
    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("***```ضع عدد الرسائل التي تريد مسحها 👌```***").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
        }    
    }
}
});

client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = client.channels.find("name", "5bz-log");
 
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");
 
  message.guild.member(user).ban(7, user);
 
  const banembed = new Discord.RichEmbed()
  .setAuthor(`BANNED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : banembed
  })
}
});

client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = client.channels.find("name", "5bz-log");
 
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");
 
  message.guild.member(user).kick();
 
  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});

client.on('message', message => {
  if(message.content.split(' ')[0].toLowerCase() == prefix + 'avatar') {
      if(message.author.bot) return;
         if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
         var mentionned = message.mentions.users.first();
     var x5bzm;
       if(mentionned){
           var x5bzm = mentionned;
       
         const embed = new Discord.RichEmbed()
 .setColor('#218961')
         .setImage(`${x5bzm.avatarURL}`)
         .addField('Requested By:', message.author.tag)
       message.channel.sendEmbed(embed);
       }
     }
 });

 client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type  === "dm") return;
  let messagearray = message.content.split(" ");
  let command = messagearray[0];
  let args = messagearray.slice(1);
 if(!command.startsWith(prefix)) return;
 if(command ===`${prefix}userinfo`) {
   let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`)
      .setDescription("This user's cool")
      .setColor("#5bf85f")
      .addField("Full Username", `${message.author.username}#${message.author.discriminator} `)
      .addField("ID", message.author.id)
      .addField("Created at", message.author.createdAt);

      message.channel.send(embed);
      return;
    }
    if(command === `${prefix}mute`) {
      if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.sendMessage("you dont have manage messages");
      //get mentioned user return if mentioned
      let toMute = message.guild.member (message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!toMute) return message.channel.sendMessage("**منشن شخص مزعج**");
      let role = message.guild.roles.find(r => r.name === "silent")
      if(!role) {
        try{
        role = await message.guild.createRole({
          name: "silent",
          color: "#596f07",
          permissions: []
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
        }catch(e) {
          console.log(e.stack);
        }
      }
      if(toMute.roles.has(role.id)) return message.channel.sendMessage("هذا الشخص اصلا عنده ميوت");
      await toMute.addRole(role);
      message.channel.sendMessage("تم اعطاؤه ميوت :zipper_mouth:");

      return;
//This is the muted code

    }

    if(command === `${prefix}unmute`) {
      if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.sendMessage("you dont have manage messages");
      //get mentioned user return if mentioned
      let toMute = message.guild.member (message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!toMute) return message.channel.sendMessage("You did not mention a user kid");

      let role = message.guild.roles.find(r => r.name === "silent")

if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted");

      await toMute.removeRole(role);

      message.channel.sendMessage("I have unmuted him :ok_hand:");

      return;
//This is the unmuted code

    }
});

client.on('message', message => {
 
  if (message.content === "-mutechannel") {
                      if(!message.channel.guild) return message.reply(' This command only for servers');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
         message.channel.overwritePermissions(message.guild.id, {
       SEND_MESSAGES: false

         }).then(() => {
             message.reply("تم تقفيل الشات :white_check_mark: ")
         });
           }
//™¦༺♚ƙἶղց|MaS♚༺¦™#7105
if (message.content === "-unmutechannel") {
  if(!message.channel.guild) return message.reply(' This command only for servers');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
         message.channel.overwritePermissions(message.guild.id, {
       SEND_MESSAGES: true

         }).then(() => {
             message.reply("تم فتح الشات:white_check_mark:")
         });
           }



});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('gmail')){
      message.delete()
  return message.reply(`** لايمكنك نشر الجيمل  هنا **`)
  }
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('snapchat')){
      message.delete()
  return message.reply(`** لايمكنك نشر سناب شات  هنا **`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('instagram')){
      message.delete()
  return message.reply(`** لايمكنك نشر الانستقرام هنا **`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('twitter')){
      message.delete()
  return message.reply(`** لايمكنك  نشر التويتر هنا **`)
  }
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('facebook')){
      message.delete()
  return message.reply(`** لايمكنك نشر الفيس بوك هنا **`)
  }
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('youtube')){
      message.delete()
  return message.reply(`** لايمكنك نشر اروابط في هذا اسرفر **`)
  }

});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('https')){
      message.delete()
  return message.reply(`** لايمكنك نشر اروابط في هذا اسرفر **`)
  }

});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('امك')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('كس')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('fuck')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('قحبه')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('الشرموطه')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('شرموطه')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('الشرموطة')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('شرموطة')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('زبي')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('زب')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('نيك')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('انيك')){
      message.delete()
    message.channel.sendMessage("", {embed: {
      title: "لا تسب",
      color: 0x06DF00,
      description: "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
      footer: {
        
      }
    }}).then(msg => {msg.delete(4000)});
                        }

   
});

client.on('message', function(message) {
  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      var stewart = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setTimestamp()
          .setTitle('``رساله جديده في خاص البوت``')
          .setThumbnail(`${message.author.avatarURL}`)
          .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
          .setFooter(`من (@${message.author.tag})  |  (${message.author.id})`)
      client.channels.get("570320196171202603").send({ embed: stewart });
  }
});

client.login(process.env.BOT_TOKEN);