const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();

// Carregar comandos
fs.readdirSync("./comandos").filter(file => file.endsWith(".js")).forEach(file => {
  const comando = require(`./comandos/${file}`);
  client.commands.set(comando.name, comando);
});

// Carregar eventos
fs.readdirSync("./eventos").filter(file => file.endsWith(".js")).forEach(file => {
  const evento = require(`./eventos/${file}`);
  const nomeEvento = file.split(".")[0];
  client.on(nomeEvento, (...args) => evento(client, ...args));
});

client.login(config.token);
