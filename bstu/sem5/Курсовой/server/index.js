const express = require("express")
require('dotenv').config();
const router = require('./routers/Router')
const cors = require('cors');

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors());
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))