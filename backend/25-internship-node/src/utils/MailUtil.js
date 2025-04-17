const mailer = require("nodemailer")

const sendingMail = async(to,subject,text) => {
   
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"your email id",
            pass:" password "
        }
    })

    const mailOptions = {
        from:"your email id",
        to:to,
        subject:subject,
        text:text
    }

    // const mailResponse = await transporter.sendMail(mailOptions);
    // console.log(mailResponse);
    // return mailResponse;

    try {
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log(mailResponse);
        return mailResponse;
    } catch (error) {
        console.error("Error sending mail:", error);
        throw error;
    }

    // const mailResponse = await transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    // })
}

module.exports = {
    sendingMail
}
