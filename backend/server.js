const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./database');
const reportRoutes = require('./routes/reportRoutes');


const app = express();
const port = 5000;


// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Existing API routes
app.use('/api', reportRoutes);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
