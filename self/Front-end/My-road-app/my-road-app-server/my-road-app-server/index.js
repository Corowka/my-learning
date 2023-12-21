require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const authRouter = require('./authRouter');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

const start = async () => {
    try {   
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

start();

