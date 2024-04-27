// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root200',
  database: 'learning_management'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle course selection for a user
app.post('/select-courses', (req, res) => {
  const { userId, courses } = req.body;

  // Delete existing course selections for this user
  db.query('DELETE FROM user_courses WHERE user_id = ?', userId, (err, result) => {
    if (err) {
      throw err;
    }

    // Insert new course selections for this user
    courses.forEach(courseId => {
      const data = { user_id: userId, course_id: courseId };
      db.query('INSERT INTO user_courses SET ?', data, (err, result) => {
        if (err) {
          throw err;
        }
      });
    });

    res.send('Courses selected successfully');
  });
});

// Route to get selected courses for a user
app.get('/selected-courses/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Fetch selected courses for this user
  db.query('SELECT courses.name FROM courses INNER JOIN user_courses ON courses.id = user_courses.course_id WHERE user_courses.user_id = ?', userId, (err, result) => {
    if (err) {
      throw err;
    }

    const selectedCourses = result.map(row => row.name);
    res.json(selectedCourses);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});