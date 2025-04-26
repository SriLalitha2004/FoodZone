const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

//Cloudary Configaration
cloudinary.config({
    cloud_name: process.env.CLOUDARY_NAME,
    api_key: process.env.CLOUDARY_APIKEY,
    api_secret: process.env.CLOUDARY_API_SECRET,
})

//Creating Storage 
const storage=new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "FoodZone_images",
        allowed_formats : ["jpg", "png", "jpeg", "avif"],
    }
})

//uploading 
const upload=multer({storage})

module.exports=upload