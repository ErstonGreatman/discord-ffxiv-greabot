import axios from 'axios';
import { ChatInputCommandInteraction, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import logger from '../../lib/logger';
import { DiscordCommand } from '../../lib/types/DiscordCommand';
import { groupWorldStatusByDC } from './module';


const worldStatusCommand: DiscordCommand = {
  data: new SlashCommandBuilder()
  .setName('worldstatus')
  .setDescription('Checks FFXIV realm status for you.')
  .addStringOption(option => option
    .setName('realmname')
    .setDescription('The name of a specific realm to check.'),
  ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    axios.get('https://frontier.ffxiv.com/worldStatus/current_status.json')
        .then(async (status) => {
          const realmName = interaction.options.getString('realmname');

          if (realmName) {
            const realm = realmName.charAt(0).toUpperCase() + realmName.slice(1);

            if (status.data[realm] !== undefined) {
              const isOnline = status.data[realm] === 1;
              const embed = new EmbedBuilder()
                .setTitle(`${realm} Status`)
                .setColor(isOnline ? 'Green' : 'Red')
                .setThumbnail(isOnline
                          ? 'https://www.pngfind.com/pngs/m/269-2698936_green-dot-icon-png-green-online-icon-png.png'
                          : 'https://spng.pngfind.com/pngs/s/499-4998466_oxygen480-status-user-busy-status-offline-png-transparent.png'
                )
                .setDescription(isOnline ? 'ONLINE' : 'OFFLINE');
              await interaction.reply({ embeds: [embed] });
            } else {
              await interaction.reply(`Error: couldn't find status for a realm called ${realm}!`);
            }
          } else {
            const datacenters = await axios.get('https://xivapi.com/servers/dc');

            const dcFields = groupWorldStatusByDC(datacenters.data, status.data);

            // Probably need to make some kinda fancy display for this
            const embed = new EmbedBuilder()
              .setTitle(`All Worlds Status`);

              const fields = Object.entries(dcFields).map(([key, value]) => (
                {
                  name: key,
                  value: (value as []).map(world => `${world[0]}: ${world[1] === 1 ? 'ONLINE' : 'OFFLINE'}`).join('\n'),
                  inline: true,
                }
              ));

            embed.addFields(fields);

            await interaction.reply({ embeds: [embed] });
          }
        })
        .catch(async (err) => {
          logger.error(`Fetch failed to retrieve world status: ${err}`);
          await interaction.reply('Error retrieving world status.');
        });
  }
};

export default worldStatusCommand;