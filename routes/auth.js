var express = require('express')
var router = express.Router()
const { signup,signin,  isAuthenticated, getProfile, isFarmer }= require("../controllers/auth")
const { getUserById}= require("../controllers/user")



router.post("/signup",signup)
router.post("/signin",signin)
router.get("/testroute",isAuthenticated,getUserById,isFarmer)

module.exports = router;
