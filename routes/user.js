const express =require("express")
const router =express.Router()

const{ getUserById, getUser , updateUser}=require("../controllers/user")
// const{ isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")`


module.exports =router;