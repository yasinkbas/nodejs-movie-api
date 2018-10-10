const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * this scheme is for Authentication 
 */

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        minlength: 5
    },

});

module.exports = mongoose.model('user',UserSchema);