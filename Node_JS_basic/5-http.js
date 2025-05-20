const http = require('http');
const countStudents = require('./3-read_file_async');

const DATABASE = process.argv[2];
const port = 1245;

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');
    try {
      const lines = await countStudents(DATABASE); // assumed to return array of lines
      res.end(lines.join('\n'));
    } catch (err) {
      res.end(err.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

if (require.main === module) {
  app.listen(port);
}

module.exports = app;

