require('dotenv').config();
require('./custom_log.js');

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

console.log('Preparing commands...');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

console.log('Preparing Discord.js REST...');
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    console.log('Attempting to register slash (/) commands...');
    try {
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully registered slash (/) commands!');
    } catch (err) {
        console.error(err);
    }
})();