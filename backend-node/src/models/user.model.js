const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastname: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }

})

const userModel = mongoose.model('user', UserSchema);

module.exports = {
    userModel
}