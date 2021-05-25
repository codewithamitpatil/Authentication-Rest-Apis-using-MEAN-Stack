
const nodemailer = require('nodemailer');


module.exports =
{

SendMail:async function (mail_to,mail_msg,mail_sub) {
  
return new Promise((resolve,reject)=>{

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "04f7055cf6f158",
            pass: "7f9459a7f99ce2"
        }
        });

  
    const response = await   transport.sendMail({
        from: 'elenor.bins@ethereal.email',
        to: mail_to,
        subject: mail_sub,
        html: mail_msg
    });
  
  return  resolve(response);

});

}




}