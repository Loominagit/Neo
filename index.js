process.title = 'Neo';
require('./custom_log.js');

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

require('dotenv').config();

const token = process.env.TOKEN;

console.log('Creating new Client...');
const client = new Client(
    {
        intents: [
            Intents.FLAGS.GUILDS
        ]
    }
);

console.log('Preparing commands...')
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

console.log('Binding events...');
client.once('ready', () => {
    client.user.setActivity('Loominatrx making me!', { type: 'WATCHING' });
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!interaction.inGuild()) return interaction.reply({ content: 'My commands are available on servers, lol. Sorry.', ephemeral: true });

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        return interaction.reply({ content: 'Oops, there was an error while executing this command! If this error still presists, make an [Issue](<https://github.com/Loominagit/Neo/issues>) on my GitHub page.', ephemeral: true });
    }
});

console.log('Logging in...');
client.login(token);