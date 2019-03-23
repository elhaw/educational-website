const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const InstructorSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    },
    avatarUrl:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true
    }
})

module.exports = new mongoose.model('instructor',InstructorSchema)