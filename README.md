Currently Working on this project

# Highly Secured Authentication System Rest Apis using JWT.

I has developing a secured authentication and Authorization system using jwt .
in this system i had genrate two tokens first one is access token wich has short period of time
approximately 1 hour and another one is refresh token wich has 1 year of expiary date .
basically what i do here ,
on the time of user signuo or login i genrate this to tokens and send back to client 
and then later on each request i send one additional header called authorization and in that header i pass this access token 
so then i can verify the token and extract the uid from it .


<h2>Features</h2>
<ul>
<li> 1. User can Signup </li>
<li> 2. User can Login </li>
<li> 3. User can Logout </li>
<li> 4. User can genrate Refresh and Access Token </li>
</ul>
