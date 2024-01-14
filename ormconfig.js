module.exports = {
  type: 'sqlite',
  database: './MovieDatabase.db',
  entities: ['dist/**/*.entity.js'],
  synchronize: true, // In production, set this to false and run migrations
};
