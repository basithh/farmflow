const express = require('express');
const router = express.Router();

const {isAuthenticated, isAdmin }= require("../../controllers/auth")
const { getUserById }= require("../../controllers/user")
const { getCropById, createCrop,getAllProduct, updateCrop, deleteCrop} = require("../../controllers/define/crop")

router.param("cropid",getCropById);

router.post("/crop/create",isAuthenticated,getUserById,isAdmin,createCrop);
router.get("/getallcrop",getAllProduct);
router.put("/crop/:cropid/update",isAuthenticated,getUserById,isAdmin,getCropById,updateCrop);
router.delete("/crop/:cropid/delete",getCropById,deleteCrop);



module.exports = router;