
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    owner :{ type :mongoose.Schema.Types.ObjectId ,ref:'User'},
    title : {
        type : String
    },
    address : String,
    photos : [String] ,
    description : String,
    perks : {String} ,
    extraInfo : {
        checkinTime : String ,
        checkoutTime : String
    },
    maxGuests : Number

})

const PlaceModel = mongoose.model('Place' , placeSchema)
module.exports = PlaceModel;
