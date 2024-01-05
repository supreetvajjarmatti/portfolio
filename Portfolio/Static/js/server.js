const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'error404',
  database: 'contact_form',
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Create the contact_form table
db.query(`
  CREATE TABLE IF NOT EXISTS contact_form (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  }
});

// Handle form submissions
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Insert data into the contact_form table
  const sql = 'INSERT INTO contact_form (name, email, project, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [formData.name, formData.email, formData.project, formData.message], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.json({ success: false });
    } else {
      console.log('Data inserted into MySQL:', result);
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
