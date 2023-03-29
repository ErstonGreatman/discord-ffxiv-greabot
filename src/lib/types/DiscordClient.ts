import { Client, Collection } from 'discord.js';
import { DiscordCommand } from './DiscordCommand';

interface DiscordClient extends Client {
  commands: Collection<string, DiscordCommand>,
}

export default DiscordClient;