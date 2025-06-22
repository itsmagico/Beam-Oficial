const config = require("../config.json");

module.exports = (client, message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const comandoNome = args.shift().toLowerCase();
  const comando = client.commands.get(comandoNome);

  if (!comando) return;

  try {
    comando.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Ocorreu um erro ao executar este comando.");
  }
};
