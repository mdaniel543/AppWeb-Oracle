var nodemailer = require('nodemailer');

async function sende(email, subject, text) {
        
    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: '', 
            pass: '', 
        },
    });
  
    let info = {
      from: '"Totonet S.A" ', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: `<body>${text}</body>`, // html body
    };

    transporter.sendMail(info, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
}

exports.sende = sende;
  
