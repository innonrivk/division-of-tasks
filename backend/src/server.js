const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT; //env variables, requires .env file

const apiRouter = require('./routes/api');

const cors = require('cors'); // Import the cors package
app.use(cors({
  origin: 'http://localhost:' + 3000, // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If you need to send cookies or authentication headers
}));

// middelware to parse json bodies
app.use(express.json());

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.status(200).json({connection: true});
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

