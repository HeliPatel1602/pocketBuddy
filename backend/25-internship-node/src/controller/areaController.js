const areaModel = require("../models/areaModel");


const addArea = async (req,res) => {
    try{
      const savedArea = await areaModel.create(req.body);
      res.status(200).json({
        message: "Area saved successfully",
        data:savedArea
      });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const getAllAreas = async(req,res) => {
    try{
       const areas = await areaModel.find().populate("cityId").populate("stateId");
       res.status(200).json({
        message: "Areas fetched successfully",
        data:areas
       });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const getAreaByCityId = async (req,res) => {
    try{
      const areas = await areaModel.find({cityId:req.params.cityId});
      res.status(200).json({
        message:"area found",
        data:areas 
      });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports = {
    addArea,getAllAreas,getAreaByCityId
}