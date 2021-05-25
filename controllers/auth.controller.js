
const httpErrors       = require('http-errors');
const nodemailer       = require('nodemailer');


// includes
const AuthValidations  = require('../validations/auth.validation');
const UserModel        = require('../models/user.model'); 
const AdminModel       = require('../models/admin.model');
const redisClient      = require('../config/init_redis');
const jwtToken         = require('../helpers/jwt.helpers'); 




module.exports = {

//  Login Middleware (Admin)   
    Admin_Login:async(req,res,next)=>
    {

    const result = await AuthValidations.Login.validateAsync(req.body).
                  catch((err)=>
                  {
                    throw new httpErrors.BadRequest('All fields are required');
                  });

    const uid          = await AdminModel.Authentication(result);    
    const AccessToken  = await jwtToken.SignAccessToken(uid); 
    const RefreshToken = await jwtToken.SignRefreshToken(uid); 

    res.send({ AccessToken , RefreshToken });

    return ;

    }
,

//  Reset Password Middleware (Admin) 
    Admin_Reset_Password:async(req,res,next)=>{
     
      
      const uid =req.payload.aud;

      const result = await AuthValidations.Change_Password.
                            validateAsync(req.body);

      const data = { 
                     id:uid,
                     password:result.OldPassword ,
                     newpassword:result.NewPassword 
                   };
      
      const HashPass = await AdminModel.OldPassWordCheck(data);
     
      if(HashPass)
      {
        const UpdatePass = await AdminModel.findOneAndUpdate({_id:data.id},{password:HashPass});
        res.json({status:'200',msg:'Password Updated Successfully'});
      }


      return;
    }  
,

//  Signup Middleware (User)   
    User_Signup:async(req,res,next)=>{

    const result = await AuthValidations.Signup.validateAsync(req.body);

    // duplicate email check
    const doesEmailExist = await UserModel.findOne({email:result.email});
                      
    if(doesEmailExist)
    {
      return next(new httpErrors.Conflict(`Email : ${result.email} is already exist .plz try another email`));
    }
   // duplicate username check 
   const doesUsernameExist = await UserModel.findOne({username:result.username});
                            
    if(doesUsernameExist)
    {
      return next(new httpErrors.Conflict(`Username : ${result.username} is already exist .plz try another username`));
    }    

    const user       = new   UserModel(result);
    const savedUser  = await user.save();                     
    
    const uid          = savedUser.id;    
    const AccessToken  = await jwtToken.SignAccessToken(uid); 
    const RefreshToken = await jwtToken.SignRefreshToken(uid); 
      
    res.send({ AccessToken , RefreshToken });
       
    return ;

    }
,

//  Login Middleware (User)  
    User_Login:async(req,res,next)=>
    {


    
   
  
    res.send(aa);
      // var message = {
      //   from: 'pamit8831@gmail.com',
      //   to: 'amitwebdev2019@gmail.com',
      //   subject: 'Confirm Email',
      //   text: 'Please confirm your email',
      //   html: '<p>Please confirm your email</p>'
      // };
    
      // transporter.sendMail(message, (error, info) => {
      //   if (error) {
      //       return console.log(error);
      //   }
      //   console.log('Message sent: %s', info.messageId);
      // });




    const result = await AuthValidations.Login.validateAsync(req.body).
                         catch((err)=>
                         {
                           throw new httpErrors.BadRequest('All fields are required');
                         });
   
    const uid          = await UserModel.Authentication(result);    
    const AccessToken  = await jwtToken.SignAccessToken(uid); 
    const RefreshToken = await jwtToken.SignRefreshToken(uid); 
      
    res.send({ AccessToken , RefreshToken });
    
    return ;
      
    }
,

//  Reset Password Middleware (User) 
    User_Reset_Password:async(req,res,next)=>{
     
      
      const uid =req.payload.aud;

      const result = await AuthValidations.Change_Password.
                            validateAsync(req.body);

      const data = { 
                     id:uid,
                     password:result.OldPassword ,
                     newpassword:result.NewPassword 
                   };
      
      const HashPass = await UserModel.OldPassWordCheck(data);
     
      if(HashPass)
      {
        const UpdatePass = await UserModel.findOneAndUpdate({_id:data.id},{password:HashPass});
        res.json({status:'200',msg:'Password Updated Successfully'});
      }
      return;
      
    }    
,

//  Delete Account Middleware (User) 
    User_Delete_Account:async(req,res,next)=>{
      
      const uid = req.payload.aud;
      const temp = await UserModel.findOneAndDelete({_id:uid});
      res.json({'status':'200','msg':'Account Deleted Successfully'});
      return;
    }
,
//  Logout Middleware (User/Admin) 
    Logout:async(req,res,next)=>
    {
        const result = await AuthValidations.Refresh_Token.validateAsync(req.body);

        const uid = await jwtToken.VerifyRefreshToken(result.RefreshToken);                     
        
        redisClient.del(uid,(err,replay)=>{
            if(err)
            {
              return next(new httpErrors.Unauthorized());
            }
        });
        
        res.json({
                  'status':200,
                  'msg':'user logged out successfully'
                });
        return;
    }
,

//  Refresh-Token Middleware (User/Admin) 
    Refresh_Token:async(req,res,next)=>
  {
    
    const result = await AuthValidations.Refresh_Token.validateAsync(req.body);
              
    const uid    = await jwtToken.VerifyRefreshToken(result.RefreshToken);                     

    const AccessToken  = await jwtToken.SignAccessToken(uid); 
    const RefreshToken = await jwtToken.SignRefreshToken(uid); 
      
    res.send({ AccessToken , RefreshToken });
    
    return ;

    }

}




















