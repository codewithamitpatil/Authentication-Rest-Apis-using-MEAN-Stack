
   const express         = require('express');
   const router          = express.Router();
   const multer          = require('multer');
   const asyncHandler    = require('../middlewares/async.middleware');


// includes
   const AuthController  = require('../controllers/auth.controller'); 
   const UserAuthGard    = require('../helpers/jwt.helpers');

// intilize multer
   const upload = multer();

// form-data and multipart data parsing
   router.use(upload.array());

// Admin (login)
   router.post('/admin-login',asyncHandler(AuthController.Admin_Login)); 

// Admin (logout)
   router.post('/admin-logout',asyncHandler(AuthController.Logout)); 

// Admin (Reset Password)
   router.post('/admin-reset-password',UserAuthGard.VerifyAccessToken,asyncHandler(AuthController.Admin_Reset_Password)); 
   

// User (signup)
   router.post('/user-signup',asyncHandler(AuthController.User_Signup)); 

// User (login)
   router.post('/user-login',asyncHandler(AuthController.User_Login)); 

// User (logout)
   router.post('/user-logout',asyncHandler(AuthController.Logout)); 

// User (Reset Password)
   router.post('/user-reset-password',UserAuthGard.VerifyAccessToken,asyncHandler(AuthController.User_Reset_Password)); 

// User (Delete Account)
   router.delete('/user-delete-account',UserAuthGard.VerifyAccessToken,asyncHandler(AuthController.User_Delete_Account)); 

// refresh token 
   router.post('/refresh-token',asyncHandler(AuthController.Refresh_Token)); 


// export routes
   module.exports = router;















