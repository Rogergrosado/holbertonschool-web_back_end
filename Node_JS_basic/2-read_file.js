const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const headers = lines[0].split(',');
    const students = lines.slice(1);

    const fields = {};
    let total = 0;

    for (const line of students) {
      const parts = line.split(',');
      if (parts.length < headers.length) continue;

      const firstName = parts[0].trim();
      const field = parts[3].trim();

      if (!fields[field]) fields[field] = [];
      fields[field].push(firstName);
      total += 1;
    }

    console.log(`Number of students: ${total}`);
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

