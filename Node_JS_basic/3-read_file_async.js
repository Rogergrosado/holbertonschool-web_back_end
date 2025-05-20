const fs = require('fs');

async function countStudents(filepath) {
  try {
    const csv = await fs.promises.readFile(filepath, { encoding: 'utf8' });
    const headerArray = csv.split(/\r?\n|\n/).filter((line) => line.trim() !== '');
    const headers = headerArray[0].split(',');

    const dictList = [];
    const noHeaderArray = headerArray.slice(1);
    for (const line of noHeaderArray) {
      const data = line.split(',');
      if (data.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j += 1) {
          row[headers[j].trim()] = data[j].trim();
        }
        dictList.push(row);
      }
    }

    let countCS = 0;
    let countSWE = 0;
    const studentsCS = [];
    const studentsSWE = [];

    dictList.forEach((student) => {
      if (student.field === 'CS') {
        countCS += 1;
        studentsCS.push(student.firstname);
      } else if (student.field === 'SWE') {
        countSWE += 1;
        studentsSWE.push(student.firstname);
      }
    });

    const total = countCS + countSWE;
    const output = [
      `Number of students: ${total}`,
      `Number of students in CS: ${countCS}. List: ${studentsCS.join(', ')}`,
      `Number of students in SWE: ${countSWE}. List: ${studentsSWE.join(', ')}`,
    ];

    return output;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

