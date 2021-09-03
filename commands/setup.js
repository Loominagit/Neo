const { SlashCommandBuilder } = require('@discordjs/builders');
// eslint-disable-next-line no-unused-vars
const { MessageEmbed, Permissions, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { colorCodeError, colorCodeSuccess, colorCodeInfo } = require('../config.json');

const actions = {
    Q0: () => {
        return {
            embeds: [new MessageEmbed()
                .setDescription('Before setting up, make sure you drag my role on top of other roles to avoid any errors!')
                .setColor(colorCodeInfo)],
            components: [new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('setup.begin')
                        .setLabel('OK, I\'ve done it. Let\'s begin.')
                        .setStyle('PRIMARY'))],
        };
    },
    Q1: (guild) => {
        const embed = new MessageEmbed();
        if (!guild.available) {
            embed
                .setColor(colorCodeError)
                .setTitle('Oops!')
                .setDescription('Sorry, the server you\'re about to set up is not available at the moment, lol.');
            return {
                embeds: [embed],
            };
        }

        const component = new MessageActionRow();
        const options = [];
        for (const role in guild.roles.fetch()) {
            options.push({
                label: role.name,
                value: 'setup.part1.mod.' + role.position.toString(),
            });
        }

        component.addComponents(new MessageSelectMenu()
            .addOptions([
                ...options,
                {
                    label: 'Make me one, please!',
                    description: 'As the label says, create a new moderator role for you!',
                    value: 'setup.part1.mod.makeOne',
                },
                {
                    label: 'Nah, skip this step.',
                    description: 'Skips this step and move on to the next step.',
                    value: 'setup.part1.mod.skipThisStep',
                },
            ]));

        embed
            .setColor(colorCodeInfo)
            .setTitle('So uhh,... first question.')
            .setDescription('Who is moderating this server?\nIf you don\'t really mind about moderating your server, you can safely skip this step.\nYou can also skip this step if your server relies on administrator, since roles with admin perms will bypass the check.');
        return {
            embeds: [embed],
            components: [component],
        };
    },
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Begin the journey by setting up the bot!'),
    async execute(interaction) {
        await interaction.reply(actions.Q0());
    },
};