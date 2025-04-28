
const express = require('express');
const app = express();
const port = 3000;

const drinkRoutes = require('./routes/drink.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());

app.use('/drink', drinkRoutes);
app.use('/', userRoutes);


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
