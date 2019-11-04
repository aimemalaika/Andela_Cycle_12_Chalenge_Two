import pool from './config';

const makeTables = async () => {
  const createUsers = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`;

  const createStory = `CREATE TABLE IF NOT EXISTS stories(
        id SERIAL PRIMARY KEY UNIQUE,
        subject TEXT NOT NULL,
        content TEXT NOT NULL,
        auther INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );`;

  try {
    await pool.query(createUsers);
    await pool.query(createStory);
  } catch (error) {
    console.log(error.message);
  }
};

makeTables();
