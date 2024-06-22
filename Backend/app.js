const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '853347678553-rmlo33lklui6050e525h0jldrk864jf9.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04hmaYEZGbFK2CgYIARAAGAQSNwF-L9Ir5Nw_8J6GwxnsTW5DFLVmyOkLZmM0MVIDTSySzaBgsHrOUWq4J8z-EMW8VrYimWtVh-g';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async () => {

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'jayeshargade07@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'SENDER NAME <jayeshargade07@gmail.com>',
            to: 'jayeshargade11@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}
module.exports = sendMail;
