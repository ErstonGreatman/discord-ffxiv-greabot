import { Plugin } from '../../lib/types/Plugin';
import rollCommand from './rollCommand';

const DiceRoller: Plugin = {
  name: 'Dice Roller',
  version: '1.0.0',
  description: 'A dice roller using the https://dice-roller.github.io/ library',
  commands: [rollCommand],
};

export default DiceRoller;
