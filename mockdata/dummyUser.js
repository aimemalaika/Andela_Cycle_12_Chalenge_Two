import config from '../services/config';

const insertDummies = async () => {
  const dummyUser = [
    `INSERT INTO users(first_name, last_name, email, password) VALUES('aime', 'tony', 'username199@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
    `INSERT INTO users(first_name, last_name, email, password) VALUES('bob', 'marley', 'username122@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG')`,
  ];

  for (const datas of dummyUser) {
    await config.pool.query(datas);
  }
};

insertDummies();
