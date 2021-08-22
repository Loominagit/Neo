const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Checks bot\'s latency.'),

	async execute(interaction) {
		const client = interaction.client;
        return interaction.reply({ content: 'Pinging...', fetchReply: true }).then(reply => {
            const embed = new MessageEmbed()
                .setTitle('Pong!')
                .setDescription(`**Websocket Latency**: ${client.ws.ping}ms`);
            reply.edit({ embeds: [embed], content: '' });
        });
	},
};