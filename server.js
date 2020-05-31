const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require("./config/db");

connectDB();
const app = express();

// Initialiase Middleware for body parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API RUNNING SMOOTHLY'));

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`.red.bold));
