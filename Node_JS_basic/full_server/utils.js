// utils.js
import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim());
      const header = lines.shift().split(',');

      const studentsByField = {};

      for (const line of lines) {
        const student = line.split(',');
        if (student.length === header.length) {
          const field = student[3];
          const name = student[0];
          if (!studentsByField[field]) studentsByField[field] = [];
          studentsByField[field].push(name);
        }
      }

      resolve(studentsByField);
    });
  });
};

export default readDatabase;
