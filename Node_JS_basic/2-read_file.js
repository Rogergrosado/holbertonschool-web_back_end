const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const header = lines[0].split(',');
    const studentData = lines.slice(1);

    const fields = {};
    let totalStudents = 0;

    for (const line of studentData) {
      const values = line.split(',');

      // Skip incomplete lines by wrapping the logic in an if block
      if (values.length >= header.length) {
        const firstname = values[0].trim();
        const field = values[3].trim(); // 4th column = field

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstname);
        totalStudents += 1;
      }
    }

    console.log(`Number of students: ${totalStudents}`);
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
