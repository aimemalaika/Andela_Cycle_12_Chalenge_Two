import config from './config';

const dropTable = [
  `DROP TABLE IF EXISTS stories CASCADE`,
  `DROP TABLE IF EXISTS users CASCADE`,
];

const dropTables = async () => {
  for (const i of dropTable) {
    await config.pool.query(i);
  }
};

dropTables();
