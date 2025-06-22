const os = require("os");
const process = require("process");
const { EmbedBuilder } = require("discord.js");

function formatUptime(ms) {
  const segundos = Math.floor((ms / 1000) % 60);
  const minutos = Math.floor((ms / (1000 * 60)) % 60);
  const horas = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const dias = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

module.exports = {
  name: "ping",
  execute(client, message, args) {
    const ping = client.ws.ping;
    const ramUso = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const ramTotal = (os.totalmem() / 1024 / 1024).toFixed(2);
    const cpuUso = os.loadavg()[0].toFixed(2);
    const uptime = formatUptime(client.uptime);

    const embed = new EmbedBuilder()
      .setTitle("📊 Status da Irys")
      .setColor("Purple")
      .addFields(
        { name: "🛰️ Ping", value: `${ping}ms`, inline: true },
        { name: "💾 RAM", value: `${ramUso}MB / ${ramTotal}MB`, inline: true },
        { name: "⚙️ CPU", value: `${cpuUso}%`, inline: true },
        { name: "⏱️ Uptime", value: uptime, inline: true },
        { name: "🤖 Bot", value: `Irys v1.0`, inline: true }
      )
      .setFooter({ text: `Executado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};
