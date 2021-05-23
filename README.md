Currently Working on this project


# Highly Secured Authentication System Using  MEAN STACK ( Rest Apis And JWT ).

I has developing a secured authentication and Authorization system using jwt . in this system i had generate two tokens first one is access token which has short period of time approximately 1 hour and another one is refresh token wich has 1 year of expiry date . basically what i do here , on the time of user signup or login i generate this to tokens and send back to client and then later on each request i send one additional header called authorization and in that header i pass this access token so then i can verify the token and extract the uid from it .




<h2>Features</h2>
<ul>
<li> 1. User can Sign Up</li>
<li> 2. User can Log In </li>
<li> 3. User can Log Out </li>
<li> 4. User can genrate Refresh and Access Token </li>
</ul>

<h2> Node Modules Used In this Project</h2>

<li> 1. express</li>
<li> 2. body-parser </li>
<li> 3. multer</li>
<li> 4. morgan</li>
<li> 5. express-validator</li>
<li> 6. @hapi/joi</li>
<li> 7. cors</li>
<li> 8. bcrypt </li>
<li> 9. path </li>
<li> 10. helmet</li>
<li> 11. http-errors</li>
