var nodemailer = require('nodemailer');

async function send(email, subject, text) {
        
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rodriguezmarvindaniel@gmail.com', 
            pass: '4321710911', 
        },
    });
  
    let info = {
      from: 'rodriguezmarvindaniel@gmail.com', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: `<b>${text}</b>`, // html body
    };

    transporter.sendMail(info, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
}

exports.send = send;
  