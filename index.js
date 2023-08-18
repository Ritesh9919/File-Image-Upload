require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 8000;
const connectDB = require('./db/mongoose');
require('express-async-errors');
const fileUpload = require('express-fileupload');


const app = express();
app.use(express.static('./images'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload({useTempFiles:true}));

// USE V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET

})

app.use('/', require('./routes/productRoutes'));



const start = async() => {
   await connectDB(process.env.MONGO_URI);
   app.listen(port, ()=> {
    console.log(`Server is running on port:${port}`);
})
}

start();

