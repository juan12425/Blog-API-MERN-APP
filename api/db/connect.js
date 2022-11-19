const mongoose = require('mongoose')

const connectDB = (URL) => {
    mongoose.connect(URL,{
        useNewUrlParser: false,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB