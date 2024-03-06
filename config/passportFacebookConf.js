const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const { facebook } = require('./config');

passport.use(new FacebookStrategy({
    clientID: facebook.appID,
    clientSecret: facebook.appSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName'] // Adjust this based on what information you want to retrieve
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            user = new User({
                facebookId: profile.id,
                username: profile.displayName, // Adjust this based on what information you want to store
            });
            await user.save();
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
}));
