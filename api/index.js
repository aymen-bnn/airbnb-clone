const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
const {register , login , getProfile , logout} = require("./controllers/userControllers")
const {uploadByLink, upload, addPlace, getPlaces, getAllPlaces} = require('./controllers/placeControllers')
const multer = require('multer')
//mongodb conection
mongoose.connect(process.env.MONGOURL).then((res)=>console.log('connected to the database'))
app.use(cors({
    credentials : true,
    origin : 'http://localhost:5173'
}))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//cookie parser to read cookies
app.use(cookieParser())
app.get('/test' , (req , res) => {
    res.json('test ok')
})
app.post('/register' , register)
app.post('/login' , login)
app.get('/profile' , getProfile)
app.post('/logout' , logout)
app.post('/places/upload-by-link' , uploadByLink)
const multerMiddleware = multer({dest : 'uploads'})

app.post('/places/upload' ,multerMiddleware.array('photos', 100) , upload)
app.post('/places' , addPlace)
app.get('/places' , getPlaces)
app.get('/getAllPlaces' , getAllPlaces)
const PORT = 4000
app.listen(PORT)