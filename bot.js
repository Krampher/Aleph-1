const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel]
});

// ↓↓↓ Cambia esto ↓↓↓
const CANAL_ID = '1560822216625627277';

client.on('ready', () => {
  console.log(`Bot listo como: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // Ignorar bots y otros canales
  if (message.author.bot) return;
  if (message.channel.id !== CANAL_ID) return;

  try {
    // Si tiene stickers, archivos, embeds o no tiene texto → solo borrar
    if (
      message.stickers.size > 0 ||
      message.attachments.size > 0 ||
      message.embeds.length > 0 ||
      !message.content.trim()
    ) {
      await message.delete();
      return;
    }

    // Es solo texto (con o sin emojis) → borrar y reenviar
    const contenido = message.content;
    await message.delete();
    await message.channel.send(contenido);

  } catch (error) {
    console.error('Error al procesar el mensaje:', error);
  }
});

client.login('MTU2MDgxODk5NzA0MDI1NTA1Nw.GPomms.iJYlwtQpqx5bUtu_SBLAgQbVEV32JdeuyAvgCk');