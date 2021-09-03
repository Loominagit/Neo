const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Checks bot\'s latency.'),

	async execute(interaction) {
		const client = interaction.client;
        const msg = await interaction.deferReply({ fetchReply: true });
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`Latency: ${msg.createdTimestamp - interaction.createdTimestamp}ms\nAPI Latency: ${client.ws.ping}ms`)
        await interaction.editReply({ embeds: [embed] })
	},
};