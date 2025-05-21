import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const filePath = process.argv[2];
    try {
      const studentsByField = await readDatabase(filePath);
      let response = 'This is the list of our students\n';

      const sortedFields = Object.keys(studentsByField).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      for (const field of sortedFields) {
        const list = studentsByField[field];
        response += `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}\n`;
      }

      res.status(200).send(response.trim());
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const filePath = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const studentsByField = await readDatabase(filePath);
      const list = studentsByField[major] || [];
      res.status(200).send(`List: ${list.join(', ')}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
