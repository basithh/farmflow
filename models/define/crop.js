var mongoose = require("mongoose");


var CropSchema = mongoose.Schema({
    cropname : String,
    variety : String,
    description :String,
    climate:String,
    soil:String,
});

module.exports = mongoose.model("Crop", CropSchema);