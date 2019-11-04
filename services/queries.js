import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const users = {
  insertUser: `INSERT INTO users( first_name, last_name, email , password) VALUES($1 ,$2, $3, $4) RETURNING *`,
  isUserExist: `SELECT * FROM users WHERE email = $1`,
};
const entries = {
  isMentorshipExist: `SELECT * FROM stories WHERE auther= $1`,
};

export default { users, entries };
