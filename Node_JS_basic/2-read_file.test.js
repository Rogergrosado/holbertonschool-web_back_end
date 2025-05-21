// 2-read_file.test.js
const assert = require('assert');
const { execSync } = require('child_process');

describe('countStudents', () => {
  it('prints the correct output for database.csv', () => {
    const output = execSync('node 2-main_1.js').toString().trim();

    assert.ok(output.includes('Number of students: 10'));
    assert.ok(output.includes('Number of students in CS: 6'));
    assert.ok(output.includes('Number of students in SWE: 4'));
  });

  it('throws an error when file is missing', () => {
    try {
      execSync('node 2-main_0.js');
      throw new Error('Expected error was not thrown');
    } catch (error) {
      assert.ok(error.stderr.toString().includes('Cannot load the database'));
    }
  });
});

