
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'appdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO users (name) VALUES (?)', [name], (err) => {
    if (err) throw err;
    res.status(201).send('User added');
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
