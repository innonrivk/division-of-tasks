const express = require('express');
const app = express();
const PORT = 3001;

const cors = require('cors'); // Import the cors package
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If you need to send cookies or authentication headers
}));

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.send('Express server is running.');
});

// middelware to parse json bodies
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.post('/api/upload-excel-names', (req, res) => {
  const jsonData = req.body
  console.log("recived json data", jsonData)
  res.status(200).json({ message: 'Excel data received successfully.' });

})
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
