const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const BlogSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    shortname:{
        type:String,
        required:true
    },
    puplishedAt:{
        type:String,
        required:true
    },
    avatarUrl:{
        type:String,
        required:true,
    },
    describtion:{
        type:String,
        required:true
    }
})

module.exports = new mongoose.model('blog',BlogSchema)