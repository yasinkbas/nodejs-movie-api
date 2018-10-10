const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DirectorSchema = new schema({
    name: String,
    surname: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director',DirectorSchema);