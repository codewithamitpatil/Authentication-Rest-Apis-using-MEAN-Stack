
const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const HttpErrors  = require('http-errors');
const path        = require('path');
const multer      = require('multer');
const morgan      = require('morgan');
const helmet      = require('helmet');

// env file
require('dotenv').config();


// includes
const errorHandler = require('./error/errorHandler');
const mongodb      = require('./config/init_mongodb');
const AuthGard     = require('./helpers/jwt.helpers');
const asyncHandler = require('./middlewares/async.middleware');
const rateLimit    = require('./middlewares/ratelimiter.middleware');

// require routes 
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');



const PORT = process.env.PORT || 3000;

const app = express();

const upload = multer();

//  ratelimit to block ip
    app.use(rateLimit);

//  request  log (morgan)
    app.use(morgan('dev'));

//  cors mechanism
    app.use('*',cors());

//  helmet for protecting xss attack    
    app.use(helmet());    

//  json parsing
    app.use(bodyParser.json());

//  urlencoded data parsing
    app.use(bodyParser.urlencoded({extended:true}));

// formdata / multipart data parsing
//app.use(upload.array());

   
//  demo route
    app.get('',AuthGard.VerifyAccessToken,
               asyncHandler(async(req,res,next)=>{
 
       res.send('welcome home');
       return;
   



    }));

//  use routes
    app.use("/Auth",authRoutes);
    app.use("/User",userRoutes);

//  404 page handler
    app.all('*',async(req,res,next)=>{
        next(new HttpErrors.NotFound('Requested page was not found'));
    });


// global error handler
   app.use(errorHandler.ErrorResponse);

// listen server
   const server = app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
   });

// Handle unhandled promise rejections
   process.on('unhandledRejection', (err, promise) => {
        
        console.log(`unhandledRejection Error: ${err.message}`);
        // Close server & exit process
       // server.close(() => process.exit(1));

   });

