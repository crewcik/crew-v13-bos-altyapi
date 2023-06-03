const { Collection, Client, Intents, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js")
const crew = require('./crew.json');
const fs = require('fs');
const moment = require("moment")
require("moment-duration-format")
const chalk = require("chalk")
const os = require("os")
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  presence: {
    activities: [{
      name: `Crewcik`,
      type: "WATCHING",
    }],
    status: "dnd",
  }
});
const { readdirSync } = require('fs'); 
const { join } = require('path');
const db = require("quick.db")

var prefix = crew.prefix

client.commands= new Discord.Collection(); 


const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); 

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`)); 
    client.commands.set(command.kod, command); 
}


client.on("messageCreate", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();
        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (e) {
            console.error(e);
        }
    }
})


client.on('ready', () => {
  console.log(`${client.user.tag} Aktif`)
})

/*
    Bu satıra botu sese sokma komutunu yazabilirsiniz.

*/
    
client.on('voiceStateUpdate', async (___, newState) => {
  if (
  newState.member.user.bot &&
  newState.channelID &&
  newState.member.user.id == client.user.id &&
  !newState.selfDeaf
  ) {
  newState.setSelfDeaf(true); 
  }
});


client.login(crew.token)
