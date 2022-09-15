module.exports = {
   kod: 'ping',
   async run (client, message, args) {
      message.reply(`Botun pingi: **${client.ws.ping}ms** 🤞`)
   } 
}
