const offerModel = require("../models/offerModel")

const addOffer = async(req,res) => {
    try{
        const savedOffer = await offerModel.create(req.body);
        res.status(200).json({
            message:"offer saved successfully",
            data:savedOffer
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getAllOffers = async(req,res) => {
    try{
        const offers = await offerModel.find().populate("locationId");
        res.status(200).json({
            message:"offers fetched sucessfully",
            data:offers
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getOfferByLocationId = async (req,res) => {
    try{
        const offers = await offerModel.find({locationId:req.params.id}).lean().populate("userId locationId");
        res.status(200).json({
            message:"offers fetched",
            data:offers
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const deleteOfferById = async(req,res)=>{
    try{
        const deletedoffer = await offerModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"offer deleted",
            data:deletedoffer
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports = {
    addOffer,getAllOffers,getOfferByLocationId,deleteOfferById
}