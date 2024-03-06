const router = require('express').Router();
const passport = require('passport');

// auth with google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// google auth callback
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard', // Redirect to dashboard upon successful authentication
    failureRedirect: '/login' // Redirect to login page if authentication fails
}));

module.exports = router;