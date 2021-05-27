
const mongoose  = require('mongoose');

const OtpSchema = mongoose.Schema({

   uid:{
       type:String,
       required:true,
       unique:true
   },
   otpcode:{
       type:String,
       required:true
   }

});

const Otp = mongoose.model('otp',OtpSchema);

module.exports = Otp;