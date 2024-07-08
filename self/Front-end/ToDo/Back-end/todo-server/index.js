const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const taskRouter = require('./taskRouter');
const PORT = process.env.PORT || config.get('serverPort');
const db = process.env.DB
const app = express();

app.use(express.json());
app.use(cors());
app.use('/task', taskRouter);

const start = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

(async() => await start())();


