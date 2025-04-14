const ratingModel = require("../models/ratingModel")

const addRating = async(req,res) => {
    try{
       const savedRating = await ratingModel.create(req.body);
       res.status(200).json({
        message:"rating saved sucessfully",
        data:savedRating
       });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getAllRating = async(req,res) => {
    try{
       const ratings = await ratingModel.find().populate("locationId");
       res.status(200).json({
        message:"rating fetched sucessfully",
        data:ratings
       });
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const getRatingByLocationIdAndUserId = async(req,res) => {
    try{
        const rating = await ratingModel.find({locationId:req.params.id,userId:req.query.userId});
        res.status(200).json({
            message:"rating fetched",
            data:rating
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getRatingByLocationId = async(req,res) => {
    try{
        const ratings = await ratingModel.find({locationId:req.params.id});
        res.status(200).json({
            message:"ratings fetched",
            data:ratings
        });
    }catch{
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports = {
    addRating,getAllRating,getRatingByLocationIdAndUserId,getRatingByLocationId
}