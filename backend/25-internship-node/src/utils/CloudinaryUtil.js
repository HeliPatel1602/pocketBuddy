const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {

    cloudinary.config({
        cloud_name:"your cloud name",
        api_key:"your api key",
        api_secret:"your api secret"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
}

module.exports = {
    uploadFileToCloudinary
}
