const router = require('express').Router();
const passport = require('passport');

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

module.exports = router;
