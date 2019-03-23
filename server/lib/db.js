const mongoose = require('mongoose')

module.exports = async (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true
    })
}