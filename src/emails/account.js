const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from:'tarininegi@gmail.com',
        subject:'welcome email!!',
        text: `Welcome to new app ${name}`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tarininegi@gmail.com',
        subject: 'Account cancellation',
        text: `goodbye ${name}, I hope to see you sometime soon! `
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
