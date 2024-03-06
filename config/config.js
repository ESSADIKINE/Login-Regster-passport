require('dotenv').config();

module.exports = {
    port: 3000,
    database: {
        dbUri: process.env.DBURI
    },
    session: {
        cookieKey: process.env.COOKIEKEY
    },
    github: {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET
    },
    google: {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET
    },
    facebook: {
        appID: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET
    }
};
