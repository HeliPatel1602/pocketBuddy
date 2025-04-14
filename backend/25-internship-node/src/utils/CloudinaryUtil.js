const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {

    cloudinary.config({
        cloud_name:"doj8cci12",
        api_key:"862258157918835",
        api_secret:"a9U-ijf9QQTvOGw-CrPNaJnUAZc"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
}

module.exports = {
    uploadFileToCloudinary
}