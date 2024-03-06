const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const { github } = require('./config');

passport.use(new GithubStrategy({
    clientID: github.clientID,
    clientSecret: github.clientSecret,
    callbackURL: '/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = new User({
                githubId: profile.id,
                username: profile.username // You can adjust this based on what information you want to store
            });
            await user.save();
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
}));
