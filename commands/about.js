const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const { name, description, colorCodeInfo } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About me!'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            //.setTitle(name)
            .setDescription(description)
            .setTimestamp(Date.now())
            .addField('Repository', 'https://github.com/Loominagit/Neo', true)
            .addField('discord.js v13', 'https://discord.js.org', true)
            .setAuthor('Project Neo', '', 'https://github.com/Loominagit/Neo')
            .setColor(colorCodeInfo);
        return interaction.reply({ embeds: [embed] });
    }
};