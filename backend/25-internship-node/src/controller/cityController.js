const cityModel = require("../models/cityModel");

const addCity = async(req,res) => {
    try{
      const savedCity = await cityModel.create(req.body);
      res.status(201).json({
        message: "City saved successfully",
        data:savedCity
      });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const getAllCity = async(req,res) => {
    try{
      const cities = await cityModel.find().populate("stateId");
      res.status(200).json({
        message:"All Cities",
        data:cities
      });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const getCityByStateId = async(req,res) => {
  try{
    const cities = await cityModel.find({stateId:req.params.stateId});
     res.status(200).json({
      message:"city found",
      data:cities
     });
  }catch(err){
    res.status(500).json({
      message:"city not found"
    });
  }
};

const getCityIdByName = async(req,res) => {
  try{
     const cityId = await cityModel.findOne({name:req.params.cityName});
     res.status(200).json({
      message:"city Id fetched",
      data:cityId._id
     });
  }catch(err){
    res.status(500).json({
      message:err.message
    });
  }
}

module.exports = {
    addCity,getAllCity,getCityByStateId,getCityIdByName
}