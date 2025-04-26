const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected!`);
      } catch (err) {
        console.error(`DB Error: ${err.message}`);
      }
}
module.exports=connectDb