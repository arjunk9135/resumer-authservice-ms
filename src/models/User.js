const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  roles: {
    type: [String],
    enum: ['NORMAL_USER', 'ELITE_USER', 'ADMIN'],
    default: ['NORMAL_USER'],
  },
  lastLogin: {
    type: Date,
  },
  lastLoginLocation: {
    type: String,
  },
  deviceType: {
    type: String,
  },
  accountStatus: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);