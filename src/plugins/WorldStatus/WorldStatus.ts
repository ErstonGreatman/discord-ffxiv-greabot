import { Plugin } from '../../lib/types/Plugin';
import worldStatusCommand from './worldStatusCommand';

const WorldStatus: Plugin = {
  name: 'FFXIV World Status',
  version: '1.0.0',
  description: 'Retrieves world status information for FFXIV servers.',
  commands: [worldStatusCommand],
};

export default WorldStatus;
