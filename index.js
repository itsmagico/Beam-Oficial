const fs = require("fs")
const path = require("path")
const { Client, GatewayIntentBits, Collection } = require("discord.js")
const config = require("./config.json")

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

client.commands = new Collection()
client.prefix = config.prefix

const comandosPath = path.join(__dirname, "comandos")
const comandosFiles = fs.readdirSync(comandosPath).filter(file => file.endsWith(".js"))

for (const file of comandosFiles) {
  const comando = require(`./comandos/${file}`)
  client.commands.set(comando.name, comando)
}

const eventsPath = path.join(__dirname, "events")
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"))

for (const file of eventsFiles) {
  const event = require(`./events/${file}`)
  client.on(event.name, (...args) => event.execute(...args, client))
}

client.once("ready", () => {
  console.log(`📥 | Logado = ${client.user.tag}`)
})

client.login(config.token)
