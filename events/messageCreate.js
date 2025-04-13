module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot || !message.content.startsWith(client.prefix)) return

    const args = message.content.slice(client.prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName)

    if (!command) return

    try {
      await command.execute(message, args, client)
    } catch (err) {
      console.error(err)
      message.reply("❌️ | Ocorreu uma catástrofe aqui no meu sistema ):.")
    }
  }
}
