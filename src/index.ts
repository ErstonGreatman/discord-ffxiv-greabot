import { Client, Collection } from 'discord.js';
import { INTENTS } from './constants';
import { validateEnv } from './lib/validateEnv';
import { onInteraction } from './onInteractions';
import { loadPlugins } from './plugins/pluginManager';
import logger from './lib/logger';
import DiscordClient from './lib/types/DiscordClient';

(async () => {
  if (!validateEnv()) {
    return;
  }
  
  const haurchebot = new Client({ intents: INTENTS }) as DiscordClient;

  haurchebot.on('ready', () => {
    logger.log('info', 'Haurchebot connected!');
    haurchebot.commands = loadPlugins();
  });

  haurchebot.on('interactionCreate', onInteraction);

  await haurchebot.login(process.env.DISCORD_TOKEN);
})();