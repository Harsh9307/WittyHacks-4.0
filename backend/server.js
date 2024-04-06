import dotenv from "dotenv"
import cloudinary from 'cloudinary';
import connectDB from "./database/dbConnection.js";
import {app} from './app.js'
import { errorMiddleware } from "./middlewares/error.js";
import multer from "multer";
import fs from 'fs'

dotenv.config({
    path: './.env'
})
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_KEY ,
    api_secret : process.env.CLOUDINARY_CLIENT_SECRET

});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
  


app.use(errorMiddleware);

