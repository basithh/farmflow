var mongoose = require("mongoose");

var MyCrop = mongoose.Schema({
    user = {
        type = Schema.Types.ObjectId,
        ref = "User"
    },
    crop = {
        type = Schema.Types.ObjectId,
        ref = "Crop"
    },
    persCropName = {
        type: String,
        maxlength: 32,
    },
    location: {
        type: { type: String },
        coordinates: []
       },
},
{
    timestamps:true
})

module.exports = mongoose.model("MyCrop", MyCrop);