import { Collection, REST, Routes } from 'discord.js';
import { Logger } from 'winston';
import { DiscordCommand } from '../lib/types/DiscordCommand';
import plugins from './plugins';


export const loadPlugins = (logger: Logger) => {
  const commandMap = plugins.reduce((commands: Iterable<[string, DiscordCommand]>, plugin) => 
    [...commands, ...plugin.commands.map(command => [command.data.name, command])] as Iterable<[string, DiscordCommand]>,
    [],
  );

  const commands = new Collection(commandMap);

  const commsToRegister = commands.map(command => command.data.toJSON());
  const rest = new REST().setToken(process.env.DISCORD_TOKEN ?? '');

  (async () => {
    try {
      logger.log('info', `Registering ${commands.size} /slash command(s)`);

      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID ?? '', process.env.DISCORD_GUILD_ID ?? ''),
        { body: commsToRegister },
      );

      logger.log('info', `Successfully reloaded ${(data as []).length} /slash command(s)`);
    } catch (error) {
      logger.log('error', error);
    }
  })();

  return commands;
};

export default loadPlugins;
