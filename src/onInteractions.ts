import { Interaction } from 'discord.js';
import logger from './lib/logger';
import DiscordClient from './lib/types/DiscordClient';


export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const client = interaction.client as DiscordClient;
  const command = client.commands.get(interaction.commandName);

  try {
    await command?.execute(interaction);
  }
  catch (error) {
    logger.error(error);

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
  }
};