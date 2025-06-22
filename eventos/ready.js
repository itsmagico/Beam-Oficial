module.exports = (client) => {
  console.log(`✅ Irys está online como ${client.user.tag}`);
  client.user.setActivity("Quartinho da Irys💜", { type: 4 }); // Watching
};
