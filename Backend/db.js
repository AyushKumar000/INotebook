const {connect} = require('mongoose');
require('dotenv').config();
const connectToDB = () => {
   connect(process.env.URL);
    console.log("connected to DB successfully");
}

module.exports = connectToDB