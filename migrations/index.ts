import * as migration_20250422_210311 from './20250422_210311';

export const migrations = [
  {
    up: migration_20250422_210311.up,
    down: migration_20250422_210311.down,
    name: '20250422_210311'
  },
];
