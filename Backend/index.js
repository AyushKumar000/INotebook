const connectToDB =  require("./db");
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

connectToDB();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req, res)=>{
    res.send("Hello World");
})

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))

app.listen(port,()=>{
    console.log(`iNotebook backend is running on the port ${port}`);
})
