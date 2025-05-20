const fs = require('fs');

function countStudents(filepath) {
  try {
    const csv = fs.readFileSync(filepath, 'utf8');
    const lines = csv.split('\n').filter((line) => line.trim() !== '');
    const headers = lines[0].split(',');

    const students = lines.slice(1).map((line) => line.split(',')).filter((row) => row.length === headers.length);

    const fields = {};

    for (const row of students) {
      const student = {};
      headers.forEach((key, index) => {
        student[key.trim()] = row[index].trim();
      });

      const field = student.field;
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student.firstname);
    }

    const total = Object.values(fields).reduce((sum, arr) => sum + arr.length, 0);
    console.log(`Number of students: ${total}`);

    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

