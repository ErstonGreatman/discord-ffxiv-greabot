import { Collection } from 'discord.js';
import { Plugin } from '../lib/types/Plugin';
import DiceRoller from './DiceRoller/DiceRoller';

const plugins = new Collection([
  [DiceRoller.name, DiceRoller],
]);

export default plugins;
