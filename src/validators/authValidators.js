const { body } = require('express-validator');

const signupValidator = [
  body('fullName')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Full Name must be between 3 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .exists()
    .withMessage('Password is required'),
];

const changePasswordValidator = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

const resetPasswordRequestValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
];

const resetPasswordValidator = [
  body('token')
    .exists()
    .withMessage('Token is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

module.exports = {
  signupValidator,
  loginValidator,
  resetPasswordRequestValidator,
  resetPasswordValidator,
  changePasswordValidator
};