const mailer = require("nodemailer")

const sendingMail = async(to,subject,text) => {
   
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"foodiebuddy1611@gmail.com",
            pass:"atolssqjapjrwbwt"
        }
    })

    const mailOptions = {
        from:"foodiebuddy1611@gmail.com",
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