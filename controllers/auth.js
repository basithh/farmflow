const User = require("../models/user");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req,res)=>{
    let user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save user in DB"
            })
        }
        res.json({
            messsage:"Sucessfully saved the user",
            user
        });

    });
};

exports.signin = (req,res)=>{
    const {email,password} =req.body;
    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({
            error:"Email not or email entered incorrect"
           })
         } 

        if(!verifypassword(password,user.password)){
             return res.status(401).json({
             error:"Email and password do not match"
             });
         }
        const jsonstring = JSON.parse(JSON.stringify({ _id:user._id}));
        console.log(jsonstring)
        var accessToken = generateAccessToken(jsonstring);
        res.json({ 
            accessToken: accessToken,
        })
    });
}

function generateAccessToken(jsonstring){
 return jwt.sign(jsonstring, process.env.TOKEN); }

function verifypassword(password1,password2){
             return bcrypt.compareSync(password1, password2);
      }


exports.isAuthenticated = (req,res,next)=>{
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN, (err, user) => {
    console.log(err)
    if (err) {
    return res.status(403).json({
        error:"ACCESS DENIED"
    })}
    req.id= user._id;
  })
  next();
}



exports.isAdmin=(req,res,next)=>{
    if(!(req.profile.role ===1)){
        return res.status(403).json({
            error:"You are not Admin Access Denied "
        })}
    next();  
}


exports.isFarmer=(req,res,next)=>{
    if(!(req.profile.role ===2)){
        return res.status(403).json({
            error:"You are not Farmer Access Denied "
        })}
        res.json({
            message:"sucess"
        })
    next();  
}

exports.isStorage=(req,next)=>{
    if(!(req.profile.role ===2)){
        return res.status(403).json({
            error:"You are not Storage Access Denied "
        })}
        res.json({
            message:"sucess"
        })
    next();  
}

exports.isTrader=(req,res,next)=>{
    if(!(req.profile.role ===2)){
        return res.status(403).json({
            error:"You are not Trader Access Denied "
        })}
        res.json({
            message:"sucess"
        })
    next();  
}




