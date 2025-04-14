const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ratingSchema = new Schema({

    locationId:{
        type:Schema.Types.ObjectId,
        ref:"location"
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
})

module.exports = mongoose.model("rating",ratingSchema)