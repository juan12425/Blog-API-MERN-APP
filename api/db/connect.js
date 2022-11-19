const mongoose = require('mongoose')

const connectDB = (URI) => {
    console.log(URI)
    mongoose.createConnection('mongodb://localhost:27017/test');
}

module.exports = connectDB