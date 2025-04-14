const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const storage = multer.diskStorage({
    filename: function (req,file,cb){
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage: storage,
}).single("image");

const loginUser = async(req,res)=>{

    //password -->plain -->db -->encrypted
    //bcrypt --> plain,enc -->match : true
    const email = req.body.email;
    const password = req.body.password;

    const foundUserFromEmail = await userModel.findOne({email: email}).populate("roleId")
    console.log(foundUserFromEmail);
    //check if email is exist or not
    if(foundUserFromEmail != null){
        //password check
        //normal plain req.body --database -->match -->true|false
        const isMatch = bcrypt.compareSync(password,foundUserFromEmail.password);
        //true | false
        if(isMatch == true){
            res.status(200).json({
                message: "login success",
                data: foundUserFromEmail,
            });
        }else{
            res.status(404).json({
                message: "Invalid credentials"
            });
        }
    }else{
        res.status(404).json({
            message: "Email not found.."
        });
    }
};

const signup = async(req,res) => {
    try{
       //password encryption
       const salt = bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(req.body.password,salt);
       req.body.password = hashedPassword;
       const createUser = await userModel.create(req.body);

       await mailUtil.sendingMail(createUser.email,"Welcome to foodieBuddy","Enjoy the food with our best offer price")
       res.status(201).json({
        message: "user created..",
        data:createUser
       });
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error",
            data:err
        });
    }
};

const addUser = async(req,res) => {
    const savedUser = await userModel.create(req.body);
    res.json({
        message:"user saved ",
        data:savedUser
    });
};

const getAllUsers = async (req,res) => {
    const users = await userModel.find().populate("roleId");
    res.json({
        message:"user fetched",
        data:users
    });
};

const getUserById = async(req,res) =>{
    const foundUser = await userModel.findById(req.params.id);
    res.json({
        message:"user fetched",
        data:foundUser
    });
};

const addUserWithFile = async (req,res) => {
    upload(req,res,async (err) => {
        if(err){
            console.log(err);
            res.status(500).json({
                message:err.message,
            });
        }else{
            // console.log("Uploaded File:", req.file);
            // console.log("Form Data:", req.body);

            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloudinaryResponse);
            console.log(req.body);

            req.body.profilePic = cloudinaryResponse.secure_url;
            const savedUser = await userModel.create(req.body);

            res.status(200).json({
                message:"user saved successfully",
                data:savedUser,
            });
        }
    });
};

const updateUser = async(req,res) => {
    try{
    upload(req,res,async (err) => {
        if(err){
            console.log(err);
            res.status(500).json({
                message:err.message,
            });
        }else{
            console.log("Uploaded File:", req.file);
            console.log("Form Data:", req.body);

            if(req.file){
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloudinaryResponse);
            req.body.profilePic = cloudinaryResponse.secure_url;
            }
            
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});

            res.status(200).json({
                message:"user updated successfully",
                data:updatedUser,
            });
        }
    });
    }catch(err){
        res.status(500).json({
            message:"error while updating",
            err:err
        });
    }

};

const updateRole = async(req,res) => {
    try{
        const updateRole = await userModel.findByIdAndUpdate(req.params.id,{roleId:"67e21a28b9f280496adbede1"},{new:true});
        res.status(200).json({
            message:"role updated",
            data:updateRole
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const deleteUserById = async(req,res)  =>{
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);
    res.json({
        message:"user deleted",
        data:deleteUser
    });
};

module.exports = {
    addUser,getAllUsers,getUserById,deleteUserById,loginUser,signup,addUserWithFile,updateUser,updateRole
};