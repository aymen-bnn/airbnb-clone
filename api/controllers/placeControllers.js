const path = require('path');
const downloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Place = require('../models/placeModel')
const uploadByLink = async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg';
    const destinationPath = path.join(__dirname, '..', 'uploads', newName);

    await downloader.image({
        url: link,
        dest: destinationPath,
    });

    res.status(200).json(newName);
};

const upload = async (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const extension = originalname.split('.')[1]
        const newPath = path + '.' + extension
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }

    res.status(200).json(uploadedFiles)
}

const addPlace = async (req, res) => {
    const { token } = req.cookies
    const { title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfos } = req.body
    jwt.verify(token, process.env.JWTSECRET, {}, async (err, user) => {

        if (err) throw err;
        const place = await Place.create({
            owner: user.id,
            title,
            address,
            photos:addedPhotos,
            description,
            perks,
            extraInfos
        })
        console.log({place})
        //res.status(200).json({place})
    })

}
const getPlaces = async (req , res) => {
    const {token} = req.cookies 
    jwt.verify(token , process.env.JWTSECRET , {} , async (err , user) => {

        const places = await Place.find({owner : user.id}) 
        res.status(200).json({places})
    })
}

const getAllPlaces = async (req , res) => {

    const places = await Place.find({});
    res.status(200).json({places})
}
module.exports = { uploadByLink, upload, addPlace , getPlaces , getAllPlaces};