const express = require('express');
const cors = require('cors');
const app = express();
const carsRouter = require('./routes/cars');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/cars', carsRouter);

app.get('/', (req, res) => res.send('Car Record System API'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});