const { Client, GatewayIntentBits, Partials, PermissionFlagsBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel]
});

// ↓↓↓ Cambia esto ↓↓↓
const CANAL_ID = '1561527642908270682';

// Contador global de mensajes borrados
let totalBorrados = 0;

client.on('ready', () => {
  console.log(`Bot listo como: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // Ignorar bots y otros canales
  if (message.author.bot) return;
  if (message.channel.id !== CANAL_ID) return;

  // Ignorar administradores
  if (message.member?.permissions.has(PermissionFlagsBits.Administrator)) {
    return;
  }

  try {
    const contenido = message.content.trim();

    // Si el mensaje empieza con / o $ → lo dejamos pasar
    if (contenido.startsWith('/') || contenido.startsWith('$')) {
      return;
    }

    // Aumentar el contador global
    totalBorrados++;

    // Enviar mensaje personalizado en el 1.er mensaje y cada 10 más (1, 11, 21...)
    if (totalBorrados === 1 || totalBorrados % 10 === 1) {
      await message.channel.send(
        `This channel only admits Mudae commands, any other message will be lost in the void.`
      );
    }

    // Borrar el mensaje no permitido
    await message.delete();

  } catch (error) {
    console.error('Error al procesar el mensaje:', error);
  }
});

client.login(process.env.TOKEN);
