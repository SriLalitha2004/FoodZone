//importing 
const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const bodyParser=require("body-parser")
const connectDb = require("./config/db");
const app=express()
app.use(express.json())


//import Routes
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const foodRoutes=require("./routes/foodRoutes")
const vendorRoutes = require("./routes/vendorRoutes");


//config
dotenv.config()

//db connection
connectDb()

//middlewares
app.use(cors())
app.use(bodyParser.json())


//routes 
app.use("/", userRoutes);
app.use("/api", restaurantRoutes)
app.use("/api", foodRoutes)
app.use("/vendor", vendorRoutes);

//server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));