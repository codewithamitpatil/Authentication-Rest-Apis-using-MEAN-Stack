Currently Working on this project


# Highly Secured Authentication System With User Profile Page
I have developed a secured authentication and Authorization system using jwt . in this system I had generated two tokens first one is an access token which has a short period of approximately 1 hour and another one is a refreshing token that has 1 year of the expiry date. basically, what I do here, on the time of user signup or login I generate this to tokens and send back to the client and then later on each request I send one additional header called authorization and in that header, I pass this access token so then I can verify the token and extract the userid from it.

## API Documentation


[Postman api documentation](https://documenter.getpostman.com/view/11617094/TzY4fv9o)


## Features


> Admin 

- Authentication with JWT 
  - Login 
  - Logout
  - Reset Password
  - Forgot Password 

> User

- Authentication with JWT 
  - Login 
  - Register ( Email Otp )
  - Logout
  - Reset Password
  - Forgot Password 
  - Delete Account


<h2> Node Modules Used In this Project</h2>


<table style="width:100%">

  <tr>
    <td>1</td>
    <td>express</td>
   
  </tr>
  <tr>
    <td>2</td>
    <td> body-parser </td>
  </tr>
 <tr>
    <td>3</td>
    <td> jsonwebtoken </td>
  </tr>
 <tr>
    <td>4</td>
    <td> multer </td>
  </tr><tr>
    <td>5</td>
    <td> morgan</td>
  </tr><tr>
    <td>6</td>
    <td> mongoose </td>
  </tr><tr>
    <td>7</td>
    <td> @hapi/joi </td>
  </tr><tr>
    <td>8</td>
    <td> path </td>
  </tr><tr>
    <td>9</td>
    <td> cors </td>
  </tr><tr>
    <td>10</td>
    <td> bcrypt </td>
  </tr><tr>
    <td>11</td>
    <td> helmet </td>
  </tr><tr>
    <td>12</td>
    <td> radis </td>
  </tr><tr>
    <td>13</td>
    <td> http-errors </td>
  </tr><tr>
    <td>14</td>
    <td> dotenv </td>
  </tr><tr>
    <td>15</td>
    <td> gitignore </td>
  </tr>
 <tr>
    <td>16</td>
    <td> express-validator </td>
  </tr>
  <tr>
    <td>17</td>
    <td> nodemailer</td>
  </tr>
 <tr>
    <td>18</td>
    <td> in-memory-otp</td>
  </tr>
 
</table>



![Screenshot from 2021-06-06 23-16-42](https://user-images.githubusercontent.com/62344675/120934803-68bb0c80-c71d-11eb-8321-5fa4b7fa3af5.png)

<br>

![Screenshot from 2021-06-06 23-16-55](https://user-images.githubusercontent.com/62344675/120934805-6b1d6680-c71d-11eb-9023-08881ef85c8b.png)

