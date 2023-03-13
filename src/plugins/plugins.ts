import { Collection } from 'discord.js';
import DiceRoller from './DiceRoller/DiceRoller';
import WorldStatus from './WorldStatus/WorldStatus';

const plugins = new Collection([
  [DiceRoller.name, DiceRoller],
  [WorldStatus.name, WorldStatus],
]);

export default plugins;
