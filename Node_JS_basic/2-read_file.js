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
      if (values.length < header.length) continue; // skip invalid/incomplete lines

      const firstname = values[0].trim();
      const field = values[3].trim(); // field is 4th column (index 3)

      if (!fields[field]) {
        fields[field] = [];
      }

      fields[field].push(firstname);
      totalStudents += 1;
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

