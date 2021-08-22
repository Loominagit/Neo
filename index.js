const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { print } = require('./custom_log.js');

require('dotenv').config();

const token = process.env.TOKEN;

print('Creating new Client...');
const client = new Client(
    {intents: [
        Intents.FLAGS.GUILDS
    ]}
);

print('Preparing commands...')
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

print('Binding events...');
client.once('ready', () => {
    client.user.setActivity('Loominatrx making me!', { type: 'WATCHING' });
    print(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

print('Logging in...');
client.login(token);