import { pool } from '../services/config';

const insertDummies = async () => {
  const dummyData = [
    `INSERT INTO users(first_name, last_name, email, password) VALUES('willy', 'tony', 'willy@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
    `INSERT INTO users(first_name, last_name, email, password) VALUES('bob', 'marley', 'bob@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
    `INSERT INTO users(first_name, last_name, email, password) VALUES('willo', 'titoo', 'willo@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
    `INSERT INTO users(first_name, last_name, email, password) VALUES('willo', 'titoo', 'user@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
    `INSERT INTO users(first_name, last_name, email, password) VALUES('willy', 'tony', 'wilp@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
    `INSERT INTO users(first_name, last_name, email, password) VALUES('wihhh', 'kevin', 'kev@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
  ];

  for (const datas of dummyData) {
    await pool.query(datas);
  }
};

insertDummies();
