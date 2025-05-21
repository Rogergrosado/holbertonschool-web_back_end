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
});

