
const   httpErrors          = require('http-errors');
const { validationResult }  = require('express-validator');

// includes
const AuthValidations = require('../validations/auth.validation');
const UserModel       = require('../models/user.model'); 
const redisClient     = require('../config/init_redis');
const jwtToken        = require('../helpers/jwt.helpers'); 



module.exports = {

//  signup middleware    
    Signup:async(req,res,next)=>{

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

//  login middleware    
    login:async(req,res,next)=>
    {

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
//  logout middleware
    logout:async(req,res,next)=>
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

    }
,
//  refresh-token middleware
    refresh_token:async(req,res,next)=>
  {
   
    const result = await AuthValidations.Refresh_Token.validateAsync(req.body);
             
    const uid    = await jwtToken.VerifyRefreshToken(result.RefreshToken);                     
  
    const AccessToken  = await jwtToken.SignAccessToken(uid); 
    const RefreshToken = await jwtToken.SignRefreshToken(uid); 
      
    res.send({ AccessToken , RefreshToken });
    
    return ;
  
    }
,
//  change password middleware
    change_password:async(req,res,next)=>{
     
      
      const uid =req.payload.aud;

      const result = await AuthValidations.Change_Password.
                            validateAsync(req.body);

      const data = { 
                     id:uid,
                     password:result.OldPassword ,
                     newpassword:result.NewPassword 
                   };
      
      const PassMatch = await UserModel.OldPassWordCheck(data);
     
      if(PassMatch)
      {
        const UpdatePass = await UserModel.findOneAndUpdate({_id:data.id},{password:PassMatch});
        res.json({status:'200',msg:'Password Updated Successfully'});
      }


      return;
    }    


}




















