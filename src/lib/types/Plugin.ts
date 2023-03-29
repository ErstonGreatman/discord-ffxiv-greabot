import { DiscordCommand } from './DiscordCommand';

export type Plugin = {
  name: string;
  version: string;
  description: string;
  commands: DiscordCommand[];
};