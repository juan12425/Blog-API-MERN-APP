const mongoose = require('mongoose')

const connectDB = (URI) => {
    console.log(URI)
    mongoose.createConnection(URI);
}

module.exports = connectDB