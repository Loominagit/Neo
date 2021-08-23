const { SlashCommandBuilder } = require('@discordjs/builders');

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
                        .setDescription('The reason why this user has to be ban. (e.g. You are doing something sussy.)')
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
                .setDescription('Unban the user, a.k.a. lift the ban hammer.')
                .addStringOption(option => 
                    option
                        .setName('user')
                        .setDescription('The user you want to be unbanned (must be user ID, because the user isn\'t here, lol).')
                        .setRequired(true)
                )
        )
}