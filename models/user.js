const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


function uuidv4() {
    return 'xxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    refreshtoken : String,
    role : Number
})

userSchema.pre('save', function(next) {
  if (this.isModified('password')) { //only if password is modified then hash
    return bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash; //save hash in UserSchema.password in database
      next();
    });
  }
  next();
});

userSchema.method({
    verifypassword : function(password){
        return bcrypt.compareSync(password, this.hash_password);
    },
    verifyrefresh : function(refreshtoken){
        return refreshtoken === this.refreshtoken;
    }
})




module.exports =  mongoose.model('User', userSchema)

