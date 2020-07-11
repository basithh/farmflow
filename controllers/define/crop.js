const Crop = require('../../models/define/crop')
var fs = require('fs');
var https = require('https');
const crop = require('../../models/define/crop');


exports.getCropById =(req,res,next,id)=>{
    Crop.findById(id)
    .exec((err,crop)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.crop = crop;
    })
    next();
}


exports.createCrop = (req,res)=>{
    let crop = new Crop(req.body);
    crop.save((err,crop)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to create"
            })}
            res.json({
                message:"Sucess in creation of crop",
                crop
            })
    })

};



exports.getCrop=(req,res)=>{
    return res.json(req.product);
}



exports.getAllProduct=(req,res)=>{
    let limit =req.query.limit? parseInt( req.query.limit):8;
    let sortBy = req.query.sortBy ?req.query.sortBy:"_id";
    Crop.find()
    .limit(limit)
    .sort([[sortBy,"asc"]])
    .exec((err, crop)=>{
        if(err){
            return res.status(400).json({
                error:"No product Found"
            })
        }
        res.json(crop)
    })

}



exports.deleteCrop = (req,res)=>{
    let cropid = req.crop;
    Crop.remove(cropid,(err,deletedcrop)=>{
        if(err){
            return res.status(400).json({
                error:"Not deleted"
            })
        }
        res.json({
            message:"Sucess"
        })
    })
}

exports.updateCrop=(req,res)=>{
    let cropid = {_id:req.crop._id};
    Crop.updateOne(cropid, req.body,(err,crop)=>{
        if(err){
            return res.status(400).json({
                message:"error in updating"
            })
        }
        res.json({
        message:"sucessfully updated"
        })
        console.log(crop);
    });


}

