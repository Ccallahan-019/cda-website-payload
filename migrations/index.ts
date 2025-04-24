import * as migration_20250422_223825 from './20250422_223825';
import * as migration_20250424_013339 from './20250424_013339';
import * as migration_20250424_055906 from './20250424_055906';

export const migrations = [
  {
    up: migration_20250422_223825.up,
    down: migration_20250422_223825.down,
    name: '20250422_223825',
  },
  {
    up: migration_20250424_013339.up,
    down: migration_20250424_013339.down,
    name: '20250424_013339',
  },
  {
    up: migration_20250424_055906.up,
    down: migration_20250424_055906.down,
    name: '20250424_055906'
  },
];
