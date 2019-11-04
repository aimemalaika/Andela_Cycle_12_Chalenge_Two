import pool from './config';

const dropTable = [
  `DROP TABLE IF EXISTS stories CASCADE`,
  `DROP TABLE IF EXISTS users CASCADE`,
];

const dropTables = async () => {
  for (const i of dropTable) {
    await pool.query(i);
  }
};

dropTables();
