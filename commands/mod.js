const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const { colorCodeError, colorCodeSuccess } = require('../config.json');

const getUser = async (client, id) => {
    return await client.users.fetch(id, { cache: false });
};

const checkPerms = (member, perms) => {
    return member.permissions.has(perms) || member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
};

const subCommands = {
    'kick': (interaction) => {
        const options = interaction.options;
        const author = interaction.member;
        const embed = new MessageEmbed();

        const member = options.getMember('user', true);
        const reason = options.getString('reason');

        // check their permission if they had ability to kick user
        if (!checkPerms(author, Permissions.FLAGS.KICK_MEMBERS)) {
            embed
                .setDescription(`I'm sorry, but you lack of permissions to do that.`)
                .setColor(colorCodeError);
            return interaction.reply({ embeds: [embed] });
        }

        if (!member.kickable) {
            embed
                .setDescription(`I'm sorry, but I can't kick <@${member.user.id}>.`)
                .setColor(colorCodeError);
            return interaction.reply({ embeds: [embed] });
        }
        
        member.kick(reason).then(member => {
            embed
                .setDescription(`Kicked @${member.user.tag}.`)
                .setColor(colorCodeSuccess);
            interaction.reply({ embeds: [embed] });
        })
    },
    'ban': (interaction) => {
        const options = interaction.options;
        const author = interaction.member;
        const embed = new MessageEmbed();
        
        const member = options.getMember('user', true);
        const reason = options.getString('reason');

        const banOption = {
            days: 7,
            reason: reason || ''
        };

        // check their permission if they had ability to kick user
        if (!checkPerms(author, Permissions.FLAGS.BAN_MEMBERS)) {
            embed
                .setDescription(`I'm sorry, but you lack of permissions to do that.`)
                .setColor(colorCodeError);
            return interaction.reply({ embeds: [embed] });
        }

        if (!member.bannable) {
            embed
                .setDescription(`I'm sorry, but I can't ban <@${member.user.id}>.`)
                .setColor(colorCodeError);
            return interaction.reply({ embeds: [embed] });
        }
        
        member.ban(banOption).then(member => {
            embed
                .setDescription(`Ban @${member.user.tag}.`)
                .setColor(colorCodeSuccess);
            interaction.reply({ embeds: [embed] });
        })
    },
    'unban': async (interaction) => {
        const options = interaction.options;
        const author = interaction.member;
        const embed = new MessageEmbed();
        const guild = interaction.guild;
        
        const id = options.getString('user', true);
        const reason = options.getString('reason');

        const user = await getUser(interaction.client, id);

        if (!user) {
            embed
                .setDescription(`User not found, maybe you input wrong user ID /shrug`)
                .setColor(colorCodeError);
            return interaction.reply({ embeds: [embed], ephermal: true });
        }

        // check their permission if they had ability to kick user
        if (!checkPerms(author, Permissions.FLAGS.BAN_MEMBERS)) {
            embed
                .setDescription(`I'm sorry, but you lack of permissions to do that.`)
                .setColor(colorCodeError);
            return interaction.reply({ embeds: [embed] });
        }

        if (guild.cache.get(user.id)) {
            embed
                .setDescription(`Why would you unban existing user on this server lol?`)
                .setColor(colorCodeError);
            return interaction.reply({ embeds: [embed], ephermal: true });
        }

        guild.unban(user, reason || '')
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mod')
        .setDescription('Executes moderation commands.')

        // mute
        .addSubcommand( subcommand => 
            subcommand
                .setName('mute')
                .setDescription('Temporarily mute user at certain amount of time.')
                .addUserOption(option => 
                    option
                        .setName('user')
                        .setDescription('The user you want to be muted.')
                        .setRequired(true)
                )
                .addStringOption(option => 
                    option
                        .setName('duration')
                        .setDescription('How long the mute will be? (e.g. 1d2h3m4s). The default duration is 30m.')
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason why this user has to be muted. (e.g. You are doing something sussy.)')
                        .setRequired(false)
                )
        )
        .addSubcommand( subcommand => 
            subcommand
                .setName('unmute')
                .setDescription('Unmute the user, a.k.a. give them mercy.')
                .addUserOption(option => 
                    option
                        .setName('user')
                        .setDescription('The user you want to be unmuted.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason why this user has to be unmuted. (e.g. Appeal accepted.)')
                        .setRequired(false)
                )
        )
        
        // kick
        .addSubcommand( subcommand => 
            subcommand
                .setName('kick')
                .setDescription('Kick user from this server.')
                .addUserOption(option => 
                    option
                        .setName('user')
                        .setDescription('The user you want to be kicked.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason why this user has to be kicked. (e.g. Get outta here!)')
                        .setRequired(false)
                )
        )

        // ban
        .addSubcommand( subcommand => 
            subcommand
                .setName('ban')
                .setDescription('Temporarily ban user at certain amount of time from this server.')
                .addUserOption(option => 
                    option
                        .setName('user')
                        .setDescription('The user you want to be banned.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason why this user has to be banned. (e.g. You are doing something sussy.)')
                        .setRequired(false)
                )
                .addStringOption(option => 
                    option
                        .setName('duration')
                        .setDescription('How long the ban will be? (e.g. 1d2h3m4s). Leave this empty if you want a permanent ban.')
                        .setRequired(false)
                )
        )
        .addSubcommand( subcommand => 
            subcommand
                .setName('unban')
                .setDescription('Unban the user.')
                .addStringOption(option => 
                    option
                        .setName('user')
                        .setDescription('The user you want to be unbanned (must be user ID, because the user isn\'t here, lol).')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason why this user has to be unbanned. (e.g. Appeal accepted.)')
                        .setRequired(false)
                )
        ),
    async execute(interaction) {
        const options = interaction.options;
        const subCommand = options.getSubcommand();
        try {
            if (subCommands[subCommand]) {
                subCommands[subCommand](interaction);
            } else {
                const embed = new MessageEmbed()
                    .setDescription('Hey, uh... My program is still under development, but my owner will tell me when he\'s done programming me!')
                    .setColor(colorCodeError);
                return interaction.reply({ embeds: [embed], ephermal: true });
            }
        } catch(err) {
            console.error(err);
            return interaction.reply({ content: 'Oops, there was an error while executing this command! If this error still presists, make an [Issue](<https://github.com/Loominagit/Neo/issues>) on my GitHub page.', ephemeral: true });
        }
    }
};