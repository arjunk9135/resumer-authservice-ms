const express = require('express');
const passport = require('passport');
const {
  signup,
  signin,
  refreshToken,
  logout,
  requestPasswordReset,
  resetPassword,
  googleAuthCallback,
} = require('../controllers/authController');
const {
  signupValidator,
  loginValidator,
  resetPasswordRequestValidator,
  resetPasswordValidator,
} = require('../validators/authValidators');
const validateRequest = require('../utils/validateRequest');

const { authenticate } = require('../middlewares/authMiddleware');
const { changePassword } = require('../controllers/authController');
const { changePasswordValidator } = require('../validators/authValidators');

const router = express.Router();

router.post('/signup', signupValidator, validateRequest, signup);
router.post('/signin', loginValidator, validateRequest, signin);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.post('/request-password-reset', resetPasswordRequestValidator, validateRequest, requestPasswordReset);
router.post('/reset-password', resetPasswordValidator, validateRequest, resetPassword);
router.post('/change-password', authenticate, changePasswordValidator, validateRequest, changePassword);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/api/auth/google/failure' }), googleAuthCallback);
router.get('/google/failure', (req, res) => res.status(401).json({ message: 'Google authentication failed' }));

module.exports = router;