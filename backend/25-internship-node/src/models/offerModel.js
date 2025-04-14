const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    locationId:{
        type:Schema.Types.ObjectId,
        ref:"location"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
})

module.exports = mongoose.model("offer",offerSchema)