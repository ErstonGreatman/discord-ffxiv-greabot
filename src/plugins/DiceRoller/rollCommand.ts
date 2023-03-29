import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { DiscordCommand } from '../../lib/types/DiscordCommand';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';


const rollCommand: DiscordCommand = {
  data: new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Rolls dice for you!')
  .addStringOption(option => option
    .setName('notation')
    .setDescription('The dice to roll. See https://dice-roller.github.io/documentation/guide/notation/ for more info.')
    .setRequired(true),
  ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const dice = interaction.options.getString('notation') ?? '';
    const results = new DiceRoll(dice);

    await interaction.reply(
      `${interaction.user.username} rolled **${dice}**:` +
      `\nResults: *${results.output}*`
    );
  }
};

export default rollCommand;