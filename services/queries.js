import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const users = {
  insertUser: `INSERT INTO users( first_name, last_name, email , password) VALUES($1 ,$2, $3, $4) RETURNING *`,
  isUserExist: `SELECT * FROM users WHERE email = $1`,
  updateUser: `UPDATE users SET first_name=$1, last_name=$2, email=$3 WHERE ID=$4`,
  updatePassword: `UPDATE users SET password=$1 WHERE ID=$2`,
};
const entries = {
  isMentorshipExist: `SELECT * FROM stories WHERE auther= $1`,
};

export default { users, entries };
