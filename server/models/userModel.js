const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {
    Schema
} = require('mongoose')
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        },
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
})

UserSchema.pre('save', async function (next) {

    // return bcrypt.hash(this.password, 10).then((hash) => {

    //     this.password = hash
    // }).catch((err) => {
    //     console.log(err)
    // });
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword
    } catch (err) {
        return next(err)
    }

});

UserSchema.methods.checkPassword = async function (password,next) {

    try {

        return await bcrypt.compare(password,this.password );

    } catch (err) {
      next(err)
    }
}

module.exports = mongoose.model('user', UserSchema)