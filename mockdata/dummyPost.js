import config from '../services/config';

const insertDummies = async () => {
  const dummyStory = [
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout one.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      6)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout two.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      6)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout three.',
        'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
        6)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout four.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      4)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout five.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      6)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout five.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      6)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout five.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      6)`,
    `INSERT INTO stories(subject, content, auther) VALUES(
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout five.',
      'making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.', 
      6)`,
  ];

  for (const datas of dummyStory) {
    await config.pool.query(datas);
  }
};

insertDummies();
