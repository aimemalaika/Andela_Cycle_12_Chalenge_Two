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

export default pool;
