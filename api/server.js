
const express = require('express');
const { db } = require('./config/api-config');
const app = express();
const port = 3000;

const drinkRoutes = require('./routes/drink.routes');
const userRoutes = require('./routes/user.routes');

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is working 🚀');
// });

// app.get('/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// app.post('/users', (req, res) => {
//   const { name } = req.body;
//   db.query('INSERT INTO users (name) VALUES (?)', [name], (err) => {
//     if (err) throw err;
//     res.status(201).send('User added');
//   });
// });

app.use('/drink', drinkRoutes);
app.use('/', userRoutes);

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
