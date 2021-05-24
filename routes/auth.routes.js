
const express         = require('express');
const router          = express.Router();
const multer          = require('multer');
const asyncHandler    = require('../middlewares/async.middleware');
const { body }        = require('express-validator');

// includes
   const AuthController  = require('../controllers/auth.controller'); 
   const UserAuthGard    = require('../helpers/jwt.helpers');
// intilize multer
   const upload = multer();

// form-data and multipart data parsing
   router.use(upload.array());

// create user (signup)
   router.post('/user-signup',[ 
                                body('username').escape(),
                                body('email').escape(),
                                body('password').escape()
                              ] ,
   asyncHandler(AuthController.Signup)); 

// create user (login)
   router.post('/user-login',[ 
                                 body('username').escape(),
                                 body('password').escape()
                              ],
   asyncHandler(AuthController.login)); 

// create user (logout)
   router.post('/user-logout',asyncHandler(AuthController.logout)); 

// create refresh token 
   router.post('/user-refresh-token',asyncHandler(AuthController.refresh_token)); 

// change password
   router.post('/user-change-password',UserAuthGard.VerifyAccessToken,asyncHandler(AuthController.change_password)); 
   

// export routes
   module.exports = router;















