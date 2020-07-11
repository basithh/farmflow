require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cookieParser =require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const cropRouter = require("./routes/define/crop");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true},function(err){
    if(err){
        console.log("Connection Failed Due To",err)
    }
    else{
    console.log("Sucessfully Connected To DataBase")
    }
});




app.use('/feeder',userRouter);
app.use('/feeder',authRouter);
app.use('/feeder',cropRouter);



app.listen(port,function(req,res){
    console.log("Express Server Started on "+port)
})