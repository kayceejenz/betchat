const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const feedSchema = new Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    body: {
        type: String,
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
},
{
    timestamps: true
});


module.exports = mongoose.model('post', feedSchema)