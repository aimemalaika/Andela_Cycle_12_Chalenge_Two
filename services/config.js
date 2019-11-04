import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
  user: 'aime',
  password: 'aime1995',
  host: 'localhost',
  port: '5432',
  database: 'mydiarydb',
});

const executeQuery = async (myQuery, params = []) => {
  const result = await pool.query(myQuery, params);
  return result.rows || result;
};

module.exports = {
  pool,
  executeQuery,
};
