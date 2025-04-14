const mongoose = require("mongoose")
const Schema = mongoose.Schema

const locationSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String 
    },
    timings:{
        type:String,
        required:true 
    },
    active:{
        type:Boolean,
    },
    address:{
        type:String,
        required:true
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"state"
    },
    cityId:{
        type:Schema.Types.ObjectId,
        ref:"city"
    },
    areaId:{
        type:Schema.Types.ObjectId,
        ref:"area"
    },
    foodType:{
        type:String,
    },
    latitude:{
        type:String,
        required:true 
    },
    longitude:{
        type:String,
        required:true
    },
    locationPic:{
        type:String,
        required:true
    },
    ownerId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
})

module.exports = mongoose.model("location",locationSchema)