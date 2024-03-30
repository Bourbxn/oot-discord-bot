const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channel")
    .setDescription("Channel Command!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add new channel!")
        .addStringOption((option) =>
          option
            .setName("channel-type")
            .setDescription("Select Channel Type!")
            .setRequired(true)
            .addChoices(
              {
                name: "Text",
                value: "text",
              },
              { name: "Voice", value: "voice" },
            ),
        )
        .addStringOption((option) =>
          option
            .setName("channel-name")
            .setDescription("New Channel Name")
            .setRequired(true),
        )
        .addChannelOption((option) =>
          option
            .setName("category-name")
            .setDescription("Exist Category Name")
            .addChannelTypes(ChannelType.GuildCategory)
            .setRequired(true),
        ),
    ),

  async execute(interaction) {
    const newChannel = interaction.options.getString("channel-name");
    const existCateogry = interaction.options.getChannel("category-name");
    const channelType = interaction.options.getString("channel-type");
    let channelTypeValue;
    switch (channelType) {
      case "text":
        channelTypeValue = ChannelType.GuildText;
        break;
      case "voice":
        channelTypeValue = ChannelType.GuildVoice;
        break;
      default:
        break;
    }

    await interaction.guild.channels
      .create({
        name: newChannel,
        type: channelTypeValue,
        parent: existCateogry,
      })
      .then(() => {
        interaction.reply({
          content: `${newChannel} ${channelType} channel has been added.`,
        });
      })
      .catch((err) => {
        console.log(err);
        interaction.reply({
          content: `error to added ${newChannel} channel!`,
        });
      });
  },
};
