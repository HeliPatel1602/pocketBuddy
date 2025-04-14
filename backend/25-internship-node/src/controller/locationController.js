const locationModel = require("../models/locationModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const storage = multer.diskStorage({
    filename:function (req,file,cb){
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:storage,
}).single("image");

const addLocation = async (req,res) => {

    upload(req,res, async(err) => {
        if(err){
            console.log(err);
            res.status(500).json({
                message:err.message,
            });
        }else{
            console.log(req.file);
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloudinaryResponse)

            req.body.locationPic = cloudinaryResponse.secure_url;
            const savedLocation = await locationModel.create(req.body);

            res.status(200).json({
                message:"location saved sucessfully",
                data:savedLocation
            });
        }
    });
};

const getAllLocation = async (req,res) => {

    try{
       const locations = await locationModel.find().populate("stateId cityId areaId");
       res.status(200).json({
        message:"locations fetched",
        data:locations
       });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const updateLocation = async (req,res) => {
    try {
        upload(req,res,async(err) => {
            if(err){
                res.status(500).json({
                    message:err.message
                });
            }else{
                
                    const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
                    console.log(cloudinaryResponse);
                    req.body.locationPic = cloudinaryResponse.secure_url;
                

                const updatedLocation = await locationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});

                res.status(200).json({
                    message:"location updated sucessfully",
                    data:updatedLocation
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}

const getLocationByCityId = async(req,res) => {
    try{
      const locations = await locationModel.find({cityId:req.params.id}).populate("cityId stateId");
      res.status(200).json({
        message:"location fetched ",
        data:locations
      });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getLocationById = async(req,res) => {
    try{
        const location = await locationModel.find({_id:req.params.id}).populate("cityId stateId areaId");
        res.status(200).json({
            message:"location fetched",
            data:location
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getLocationByOwnerId = async(req,res) => {
    try{
        const locations = await locationModel.find({ownerId:req.params.id}).populate("cityId stateId");
        res.status(200).json({
            message:"location fetched by owner",
            data:locations
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports = {
    addLocation,getAllLocation,updateLocation,getLocationByCityId,getLocationById,getLocationByOwnerId
}