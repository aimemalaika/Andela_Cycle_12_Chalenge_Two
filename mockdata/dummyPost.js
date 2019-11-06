import config from '../services/config';

const insertDummies = async () => {
  const dummyStory = [
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout one.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      1)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout two.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      2)`,
  ];

  for (const datas of dummyStory) {
    await config.pool.query(datas);
  }
};

insertDummies();
