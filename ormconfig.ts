import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { DataSource } from 'typeorm';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './MovieDatabase.db',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
};

export const connectionSource = new DataSource(config);
export default config;
