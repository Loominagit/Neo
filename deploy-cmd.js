require('dotenv').config();

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { print, warn, error } = require('./custom_log.js');

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

print('Preparing commands...');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

print('Preparing Discord.js REST...');
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	print('Attempting to register commands...');
	try {
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		print('Successfully registered application commands.');
	} catch (err) {
		error(err);
	}
})();