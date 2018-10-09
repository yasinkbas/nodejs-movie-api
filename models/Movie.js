const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MovieSchema = new schema({
    director_id: schema.Types.ObjectId,
    title : {
        type : String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
})

module.exports = mongoose.model('moview',MovieSchema);