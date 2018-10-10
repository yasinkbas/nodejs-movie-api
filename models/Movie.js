const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MovieSchema = new schema({
    director_id: schema.Types.ObjectId,
    /**
     * {PATH} equals title in here
     * this second parameter is for edited error sentence
     */
    title : {
        type : String,
        required: [true,'`{PATH}` alani zorunludur'],
        maxlength: [15, '{PATH} alani (`{VALUE}`), ({MAXLENGTH}) karakterden kucuk olmalidir'],
        minlength: 1,
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    country: 
    {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    year: Number,
    imdb_score: {
        type: Number,
        max: 10,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
})

module.exports = mongoose.model('moview',MovieSchema);