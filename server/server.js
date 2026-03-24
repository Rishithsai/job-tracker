const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://job-tracker-three-pi.vercel.app'
  ]
}));
app.use(express.json());

// Routes
app.use('/api/jobs', require('./routes/jobs'));

app.get('/', (req, res) => res.send('Job Tracker API running'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port 5000`)
    );
  })
  .catch((err) => console.error(err));